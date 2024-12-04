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

export { getTheme };
