const getTheme = () => {
  if ('theme' in localStorage) {
    return localStorage.theme;
  }

  if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    localStorage.theme = 'dark';
  } else {
    localStorage.theme = 'light';
  }

  return localStorage.theme;
};

const formatNumberToCommaSeparated = (number) => {
  return `${number}`
    .split('')
    .reverse()
    .map((digit, index) => index % 3 === 2 && index !== `${number}`.length - 1 ? `,${digit}` : digit)
    .reverse()
    .join('');
}

const timeAgo = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp * 1000);
  const diff = now - then;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};

export { getTheme, formatNumberToCommaSeparated, timeAgo };
