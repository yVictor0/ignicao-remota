// "há 12 s", "há 3 min"... a partir de uma diferença em milissegundos
export function formatAgo(diffMs) {
  if (diffMs == null) return '—';

  const seconds = Math.max(0, Math.round(diffMs / 1000));
  if (seconds < 5) return 'agora mesmo';
  if (seconds < 60) return `há ${seconds} s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `há ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours} h`;

  return `há ${Math.floor(hours / 24)} d`;
}

export function formatDateTime(timestamp) {
  return new Date(timestamp).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  });
}
