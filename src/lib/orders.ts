import fs from 'fs/promises';
import path from 'path';

export type OrderStatus = 'preview' | 'generating' | 'paid';

export type OrderRecord = {
  id: string;
  styleId: string;
  createdAt: string;
  status: OrderStatus;
  paymentId?: string;
  inputFile: string;
  inputMimeType?: string;
  previewFiles: string[];
  hdFiles: string[];
};

const baseDir = path.join(process.cwd(), 'storage', 'orders');

export async function ensureOrderDir(orderId: string) {
  const dir = path.join(baseDir, orderId);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export async function saveOrder(order: OrderRecord) {
  const dir = await ensureOrderDir(order.id);
  await fs.writeFile(path.join(dir, 'order.json'), JSON.stringify(order, null, 2), 'utf-8');
}

export async function readOrder(orderId: string): Promise<OrderRecord> {
  const raw = await fs.readFile(path.join(baseDir, orderId, 'order.json'), 'utf-8');
  return JSON.parse(raw) as OrderRecord;
}

export async function updateOrder(orderId: string, patch: Partial<OrderRecord>) {
  const current = await readOrder(orderId);
  const next = { ...current, ...patch };
  await saveOrder(next);
  return next;
}

export function orderPath(orderId: string, fileName: string) {
  return path.join(baseDir, orderId, fileName);
}
