import { put, list } from '@vercel/blob';

export type OrderStatus = 'preview' | 'generating' | 'paid';
export type PackageType = 'basic' | 'premium';

export type OrderRecord = {
  id: string;
  styleId: string;
  createdAt: string;
  status: OrderStatus;
  paymentId?: string;
  packageType?: PackageType;
  packageImageCount?: number;
  inputFile: string;
  inputMimeType?: string;
  previewFiles: string[];
  hdFiles: string[];
};

function orderPrefix(orderId: string) {
  return `orders/${orderId}`;
}

function filePath(orderId: string, fileName: string) {
  return `${orderPrefix(orderId)}/${fileName}`;
}

async function findBlobUrl(pathname: string) {
  const result = await list({ prefix: pathname, limit: 1 });
  const blob = result.blobs.find((b) => b.pathname === pathname) ?? result.blobs[0];
  if (!blob?.url) throw new Error(`Blob not found: ${pathname}`);
  return blob.url;
}

export async function ensureOrderDir(orderId: string) {
  return orderPrefix(orderId);
}

export async function saveOrderFile(orderId: string, fileName: string, data: Buffer, contentType = 'application/octet-stream') {
  await put(filePath(orderId, fileName), data, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType
  });
  return fileName;
}

export async function readOrderFile(orderId: string, fileName: string) {
  const url = await findBlobUrl(filePath(orderId, fileName));
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Could not read file ${fileName}: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

export async function getOrderFileUrl(orderId: string, fileName: string) {
  return findBlobUrl(filePath(orderId, fileName));
}

export async function saveOrder(order: OrderRecord) {
  await put(filePath(order.id, 'order.json'), JSON.stringify(order, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json'
  });
}

export async function readOrder(orderId: string): Promise<OrderRecord> {
  const url = await findBlobUrl(filePath(orderId, 'order.json'));
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Order not found: ${orderId}`);
  return (await response.json()) as OrderRecord;
}

export async function updateOrder(orderId: string, patch: Partial<OrderRecord>) {
  const current = await readOrder(orderId);
  const next = { ...current, ...patch };
  await saveOrder(next);
  return next;
}
