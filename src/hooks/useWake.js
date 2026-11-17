import { useCallback, useEffect, useState } from 'react';
import { sendWake } from '../api/client';

// Envia o pedido de ligar o PC e controla a mensagem de retorno.
export function useWake(password, onDone) {
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message }

  const wake = useCallback(async () => {
    setSending(true);
    setFeedback(null);
    try {
      await sendWake(password);
      setFeedback({
        type: 'success',
        message: 'Pedido registrado. O ESP32 vai buscá-lo no próximo contato.',
      });
      onDone?.();
    } catch (err) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSending(false);
    }
  }, [password, onDone]);

  // Some com a mensagem de sucesso depois de alguns segundos
  useEffect(() => {
    if (feedback?.type !== 'success') return undefined;
    const timer = setTimeout(() => setFeedback(null), 8000);
    return () => clearTimeout(timer);
  }, [feedback]);

  return { sending, feedback, wake };
}
