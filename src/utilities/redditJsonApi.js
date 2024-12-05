const fetchJson = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch json!');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching from Reddit:', error);

    return [];
  }
};

export { fetchJson };
