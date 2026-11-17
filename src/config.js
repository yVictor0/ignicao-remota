// URL do backend, definida em frontend/.env (VITE_API_URL)
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

// Frequência de atualização do status (ms)
export const IDLE_POLL_MS = 10_000; // normal
export const FAST_POLL_MS = 3_000; // enquanto há um pedido aguardando o ESP32
