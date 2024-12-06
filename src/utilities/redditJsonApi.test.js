import { fetchJson } from "./redditJsonApi";

global.fetch = jest.fn();

describe('fetchJson', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render data when the fetch is successful', async () => {
    const mockData = { data: 'test' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchJson('https://example.com');

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch json!'));

    const result = await fetchJson('https://example.com');

    expect(result).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should have an unsuccessful response (non-OK status)', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error' }),
    });

    const result = await fetchJson('https://example.com');

    expect(result).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
