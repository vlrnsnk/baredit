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

const extractComments = (json) => {
  const comments = [];

  const traverse = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        obj.forEach(traverse);
      } else {
        Object.keys(obj).forEach(key => {
          if (key === 'body') {
            comments.push(obj[key]);
          }

          traverse(obj[key]);
        });
      }
    }
  };

  traverse(json);

  return comments;
};

const generatePictureTag = (jsonData) => {
  const image = jsonData?.preview?.images?.[0] || jsonData.thumbnail;

  if (image === 'default' || image === 'nsfw') {
    return '';
  }

  const allResolutions = image.resolutions || [];
  const resolutions = allResolutions.filter(res => res.width >= 320);

  // If no valid resolutions, return the img tag directly
  if (resolutions.length === 0) {
    return <img className="rounded-xl border border-orange-400" src={jsonData.thumbnail} alt={jsonData.title} loading="lazy" />;
  }

  // Render the picture tag with JSX
  return (
    <picture>
      {/* Large screens and desktops (min-width: 992px) */}
      <source
        media="(min-width: 992px)"
        type="image/jpeg"
        srcSet={resolutions.filter(res => res.width >= 992)
          .map(res => `${res.url.replace(/&amp;/g, '&')} ${res.width}w`)
          .join(', ')}
      />

      {/* Medium screens, like tablets and smaller desktops (min-width: 768px) */}
      <source
        media="(min-width: 768px)"
        type="image/jpeg"
        srcSet={resolutions.filter(res => res.width >= 768 && res.width < 992)
          .map(res => `${res.url.replace(/&amp;/g, '&')} ${res.width}w`)
          .join(', ')}
      />

      {/* Default srcset for smaller devices (less than 768px) */}
      <source
        type="image/jpeg"
        srcSet={resolutions.filter(res => res.width < 768)
          .map(res => `${res.url.replace(/&amp;/g, '&')} ${res.width}w`)
          .join(', ')}
      />

      {/* Fallback img tag if no srcset matches */}
      <img className="rounded-xl border border-orange-400" src={image.source?.url.replace(/&amp;/g, '&')} alt={jsonData.title} loading="lazy" />
    </picture>
  );
};

export {
  getTheme,
  formatNumberToCommaSeparated,
  timeAgo,
  extractComments,
  generatePictureTag,
};
