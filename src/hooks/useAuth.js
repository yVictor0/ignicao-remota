import { useCallback, useState } from 'react';
import { getStatus } from '../api/client';

const STORAGE_KEY = 'wol:password';

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStored(value) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // armazenamento indisponível: segue só em memória
  }
}

export function useAuth() {
  const [password, setPassword] = useState(readStored);

  // Valida a senha no servidor antes de guardar. Lança erro se for inválida.
  const login = useCallback(async (candidate) => {
    await getStatus(candidate);
    writeStored(candidate);
    setPassword(candidate);
  }, []);

  const logout = useCallback(() => {
    writeStored(null);
    setPassword(null);
  }, []);

  return { password, login, logout };
}
