
import { useState, useEffect, useCallback, useRef } from 'react';

function useFetch(url, skip = false) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);
  // Keeps track of whether the fetch should be cancelled
  const cancelledRef = useRef(false);

  const fetchData = useCallback(async (overrideUrl) => {
    const targetUrl = overrideUrl || url;
    cancelledRef.current = false;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(targetUrl);
      const result = await response.json();

      if (cancelledRef.current) return;

      if (result.Response === 'True') {
        setData(result);
      } else {
        setError(result.Error);
      }
    } catch (err) {
      if (!cancelledRef.current) {
        setError('Something went wrong. Please check your internet connection and try again.');
      }
    } finally {
      if (!cancelledRef.current) setLoading(false);
    }
  }, [url]);

  // Runs the fetch when the URL changes and cancels it when needed
  useEffect(() => {
    if (skip) return;

    fetchData();

    return () => {
      cancelledRef.current = true;
    };
  }, [fetchData, skip]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;