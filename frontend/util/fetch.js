export const fetchAPI = async (url, method, headers, body) => {
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
      });
  
      if (response.ok) {
        const data = await response.json();
        return { data };
      } else {
        const error = await response.json();
        return { error };
      }
    } catch (error) {
      return { error };
    }
  };
  