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

export { getTheme, formatNumberToCommaSeparated};
