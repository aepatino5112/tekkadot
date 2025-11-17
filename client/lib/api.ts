const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export async function issueNonce(wallet_address: string, wallet_type: string) {
  const res = await fetch(`${API_BASE}/api/auth/nonce`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet_address, wallet_type }),
    credentials: 'include'
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to issue nonce");
  }

  return res.json() as Promise<{ nonce: string }>;
}

export async function connectWallet(wallet_address: string, wallet_type: string, signature: string) {
  const res = await fetch(`${API_BASE}/api/auth/connect`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet_address, wallet_type, signature }),
    credentials: 'include'
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to connect wallet");
  }

  return res.json() as Promise<{
    user_id: string;
    wallet_id: string;
  }>;
}


export async function fetchSession() {
  const res = await fetch(`${API_BASE}/api/auth/session`, { method: "GET", credentials: 'include' });
  if (!res.ok) throw new Error("Failed to fetch session");
  return res.json() as Promise<{ user: {
    user_id: string;
    wallet_id: string;
    wallet_address: string;
    wallet_type: string;
  }}>;
}
