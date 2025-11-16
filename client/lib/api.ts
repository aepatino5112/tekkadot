'use client';

const API = process.env.NEXT_PUBLIC_API_URL as string;

async function json<T extends Record<string, unknown>>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({} as T));
  if (!res.ok) {
    const errorMessage = (data as Record<string, unknown>)?.error;
    throw new Error(typeof errorMessage === 'string' ? errorMessage : `HTTP ${res.status}`);
  }
  return data;
}

export async function issueNonce(wallet_address: string) {
  const res = await fetch(`${API}/auth/nonce`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ wallet_address })
  });
  return json<{ nonce: string }>(res);
}

export async function verifySignature(wallet_address: string, wallet_type: string, signature: string) {
  const res = await fetch(`${API}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ wallet_address, wallet_type, signature })
  });
  return json<{ user_id: string; wallet_id: string }>(res);
}

export async function fetchSession() {
  const res = await fetch(`${API}/auth/session`, { credentials: 'include' });
  return json<{ user: { user_id: string; wallet_id: string; wallet_address: string; wallet_type: string } }>(res);
}
