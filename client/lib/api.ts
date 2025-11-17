import { NFTProps, ProductProps } from "@/types/cards";

const API_BASE = typeof window === 'undefined'
  ? 'http://server:3000' // For server-side rendering (inside Docker)
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // For client-side rendering (in browser)

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

export async function logout() {
  const res = await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to log out");
  }
}

export async function fetchSession() {
  const res = await fetch(`${API_BASE}/api/auth/session`, { method: "GET", credentials: 'include' });
  if (!res.ok) throw new Error("Failed to fetch session");
  return res.json() as Promise<{ user: {
    user_id: string;
    wallet_id: string;
    wallet_address: string;
    wallet_type: string;
  }; }>;};
  
// Assuming you have an axios instance or fetch wrapper
export async function getCurrentUser() {
  const res = await fetch(`${API_BASE}/api/auth/me`, { method: "GET", credentials: 'include' });
  if (!res.ok) throw new Error("Failed to fetch current user");
  return res.json() as Promise<{ user: any }>;
}

// Products API functions
export async function searchProducts(params: { page?: number; sort?: 'h-price' | 'l-price' | 'newest' | 'oldest'; collection?: 'gaming' | 'laptop' | 'mobile' | 'wearable' } = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.sort) query.append('sort', params.sort);
  if (params.collection) query.append('collection', params.collection);
  const res = await fetch(`${API_BASE}/api/products?${query}`, { credentials: 'include' });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json() as Promise<{ items: ProductProps[]; meta: { page: number; pageSize: number; total: number; totalPages: number; sort: string; collection?: string | null } }>;
}

export async function getUserProducts() {
  const session = await fetchSession(); // Get wallet details
  const query = new URLSearchParams({ walletId: session.user.wallet_id }); // Use wallet_id for consistency
  const res = await fetch(`${API_BASE}/api/products/user?${query}`, { credentials: 'include' });
  if (!res.ok) throw new Error("Failed to fetch user products");
  return res.json() as Promise<{ items: ProductProps[] }>;
}

export async function createProduct(data: { title: string; description: string; collection: 'gaming' | 'laptop' | 'mobile' | 'wearable'; price: number; ipfs_hash?: string; status?: 'listed' | 'sold'; image?: File }) {
  const session = await fetchSession();
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('collection', data.collection);
  formData.append('price', data.price.toString());
  if (data.ipfs_hash) formData.append('ipfs_hash', data.ipfs_hash);
  if (data.status) formData.append('status', data.status);
  if (data.image) formData.append('image', data.image);
  formData.append('walletId', session.user.wallet_id); // Server expects walletId or walletAddress
  const res = await fetch(`${API_BASE}/api/products`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

export async function updateProduct(id: string, data: Partial<{ title: string; description: string; collection: 'gaming' | 'laptop' | 'mobile' | 'wearable'; price: number; ipfs_hash?: string; status?: 'listed' | 'sold'; image?: File }>) {
  const session = await fetchSession();
  const formData = new FormData();
  if (data.title) formData.append('title', data.title);
  if (data.description) formData.append('description', data.description);
  if (data.collection) formData.append('collection', data.collection);
  if (data.price !== undefined) formData.append('price', data.price.toString());
  if (data.ipfs_hash) formData.append('ipfs_hash', data.ipfs_hash);
  if (data.status) formData.append('status', data.status);
  if (data.image) formData.append('image', data.image);
  formData.append('walletId', session.user.wallet_id);
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProduct(id: string) {
  const session = await fetchSession();
  const query = new URLSearchParams({ walletId: session.user.wallet_id });
  const res = await fetch(`${API_BASE}/api/products/${id}?${query}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

// NFTs API functions (similar structure)
export async function searchNFTs(params: { page?: number; sort?: 'h-price' | 'l-price' | 'newest' | 'oldest' } = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.sort) query.append('sort', params.sort);
  const res = await fetch(`${API_BASE}/api/nfts?${query}`, { credentials: 'include' });
  if (!res.ok) throw new Error("Failed to fetch NFTs");
  return res.json() as Promise<{ items: NFTProps[]; meta: { page: number; pageSize: number; total: number; totalPages: number; sort: string } }>;
}

export async function getUserNFTs() {
  const session = await fetchSession();
  const query = new URLSearchParams({ walletId: session.user.wallet_id });
  const res = await fetch(`${API_BASE}/api/nfts/user?${query}`, { credentials: 'include' });
  if (!res.ok) throw new Error("Failed to fetch user NFTs");
  return res.json() as Promise<{ items: NFTProps[] }>;
}

export async function createNFT(data: { title: string; description: string; category: 'art' | 'collectible' | 'music' | 'fresh' | 'cyberpunk'; rareness: 'common' | 'rare' | 'epic' | 'legendary'; price: number; ipfs_hash?: string; status?: 'listed' | 'sold'; image?: File }) {
  const session = await fetchSession();
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('category', data.category);
  formData.append('rareness', data.rareness);
  formData.append('price', data.price.toString());
  if (data.ipfs_hash) formData.append('ipfs_hash', data.ipfs_hash);
  if (data.status) formData.append('status', data.status);
  if (data.image) formData.append('image', data.image);
  formData.append('walletId', session.user.wallet_id);
  const res = await fetch(`${API_BASE}/api/nfts`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to create NFT");
  return res.json();
}

export async function updateNFT(id: string, data: Partial<{ title: string; description: string; category: 'art' | 'collectible' | 'music' | 'fresh' | 'cyberpunk'; rareness: 'common' | 'rare' | 'epic' | 'legendary'; price: number; ipfs_hash?: string; status?: 'listed' | 'sold'; image?: File }>) {
  const session = await fetchSession();
  const formData = new FormData();
  if (data.title) formData.append('title', data.title);
  if (data.description) formData.append('description', data.description);
  if (data.category) formData.append('category', data.category);
  if (data.rareness) formData.append('rareness', data.rareness);
  if (data.price !== undefined) formData.append('price', data.price.toString());
  if (data.ipfs_hash) formData.append('ipfs_hash', data.ipfs_hash);
  if (data.status) formData.append('status', data.status);
  if (data.image) formData.append('image', data.image);
  formData.append('walletId', session.user.wallet_id);
  const res = await fetch(`${API_BASE}/api/nfts/${id}`, {
    method: 'PUT',
    body: formData,
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to update NFT");
  return res.json();
}

export async function deleteNFT(id: string) {
  const session = await fetchSession();
  const query = new URLSearchParams({ walletId: session.user.wallet_id });
  const res = await fetch(`${API_BASE}/api/nfts/${id}?${query}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error("Failed to delete NFT");
  return res.json();
}
