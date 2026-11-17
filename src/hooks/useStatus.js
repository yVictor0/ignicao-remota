import { useCallback, useEffect, useRef, useState } from 'react';
import { getStatus } from '../api/client';
import { FAST_POLL_MS, IDLE_POLL_MS } from '../config';

// Busca o status do servidor e atualiza sozinho.
// Fica mais rápido enquanto existe um pedido aguardando o ESP32.
export function useStatus(password, onUnauthorized) {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const unauthorizedRef = useRef(onUnauthorized);
  useEffect(() => {
    unauthorizedRef.current = onUnauthorized;
  }, [onUnauthorized]);

  const refresh = useCallback(async () => {
    try {
      const data = await getStatus(password);
      setStatus(data);
      setError(null);
    } catch (err) {
      if (err.status === 401) unauthorizedRef.current?.();
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [password]);

  const pollMs = status?.pending ? FAST_POLL_MS : IDLE_POLL_MS;

  useEffect(() => {
    refresh();
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') refresh();
    }, pollMs);
    return () => clearInterval(id);
  }, [refresh, pollMs]);

  return { status, error, loading, refresh };
}
