
import { put } from '@vercel/blob';

export type HdStatus = {
  orderId: string;
  status: 'idle' | 'working' | 'done' | 'error';
  total: number;
  completed: number;
  message: string;
  zipUrl?: string;
  error?: string;
  updatedAt: string;
};

const memory = new Map<string, HdStatus>();

export function setLocalStatus(status: HdStatus) {
  memory.set(status.orderId, status);
  return status;
}

export function getLocalStatus(orderId: string): HdStatus | null {
  return memory.get(orderId) || null;
}

export async function saveStatus(status: HdStatus) {
  setLocalStatus(status);
  try {
    await put(`status/${status.orderId}.json`, JSON.stringify(status, null, 2), {
      access: 'public',
      contentType: 'application/json',
      allowOverwrite: true
    });
  } catch {
    // Blob status is best effort. Local status still works during the active request.
  }
  return status;
}

export async function readStatus(orderId: string): Promise<HdStatus | null> {
  const local = getLocalStatus(orderId);
  if (local) return local;

  // Optional fallback if NEXT_PUBLIC_BLOB_BASE_URL is configured.
  try {
    const base = process.env.NEXT_PUBLIC_BLOB_BASE_URL;
    if (!base) return null;
    const res = await fetch(`${base}/status/${orderId}.json`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
