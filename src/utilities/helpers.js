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
  // Helper function to clean URLs (replace &amp; with &)
  const cleanUrl = (url) => url?.replace(/&amp;/g, '&');

  // Function to get the first valid image with all sizes (from preview or media_metadata)
  const getImageWithAllSizes = (jsonData) => {
    // Check if preview exists and apply cleanUrl to the preview image URLs
    const previewImage = jsonData?.preview?.images?.[0];

    if (previewImage) {
      // If preview exists, return the imageUrl and resolutions with cleaned URLs
      const imageUrl = cleanUrl(previewImage.source?.url);
      const resolutions = previewImage.resolutions?.map(res => ({
        url: cleanUrl(res.url), // Clean each resolution URL
        width: res.width
      })) || [];

      // If resolutions exist in preview, return them, otherwise fallback
      if (resolutions.length > 0) {
        return { imageUrl, resolutions };
      }
    }

    // If no valid preview, check media_metadata
    const mediaMetadata = jsonData?.media_metadata;

    if (mediaMetadata) {
      // Iterate through media_metadata and find the first valid image with sizes
      for (let key of Object.keys(mediaMetadata)) {
        const metadata = mediaMetadata[key];
        if (metadata.status === 'valid' && metadata.p && metadata.p.length > 0) {
          const imageUrl = cleanUrl(metadata.p[0]?.u); // Use the first URL from the p array
          const resolutions = metadata.p.map((img) => ({
            url: cleanUrl(img.u), // Clean each resolution URL
            width: img.x
          }));
          return { imageUrl, resolutions };
        }
      }
    }

    // Return empty if no valid image found in either preview or media_metadata
    return { imageUrl: '', resolutions: [] };
  };

  // Get the image with all sizes, either from preview or media_metadata
  const { imageUrl, resolutions } = getImageWithAllSizes(jsonData);

  // If no valid image or resolutions found, return empty
  if (!imageUrl || imageUrl === 'default' || imageUrl === 'nsfw') {
    return '';
  }

  // If there are no resolutions (either from preview or media_metadata), just return a regular <img> tag
  if (resolutions.length === 0) {
    return <img className="rounded-xl border border-orange-400" src={imageUrl} alt={jsonData.title} loading="lazy" />;
  }

  return (
    <picture>
      {/* Large screens and desktops (min-width: 992px) */}
      <source
        media="(min-width: 992px)"
        type="image/jpeg"
        srcSet={resolutions.filter(res => res.width >= 992)
          .map(res => `${res.url} ${res.width}w`)
          .join(', ')}
      />

      {/* Medium screens, like tablets and smaller desktops (min-width: 768px) */}
      <source
        media="(min-width: 768px)"
        type="image/jpeg"
        srcSet={resolutions.filter(res => res.width >= 768 && res.width < 992)
          .map(res => `${res.url} ${res.width}w`)
          .join(', ')}
      />

      {/* Default srcset for smaller devices (less than 768px) */}
      <source
        type="image/jpeg"
        srcSet={resolutions.filter(res => res.width < 768)
          .map(res => `${res.url} ${res.width}w`)
          .join(', ')}
      />

      {/* Fallback img tag if no srcset matches */}
      <img className="rounded-xl border border-orange-400" src={imageUrl} alt={jsonData.title} loading="lazy" />
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
