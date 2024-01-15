async function customFetch(url, options) {
  const response = await fetch(url, options);
  return handleResponse(response);
}

async function handleResponse(response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `API request failed with status ${response.status}: ${errorMessage}`
    );
  }
  return response.json();
}

export async function get(apiBaseUrl, endpoint) {
  try {
    const response = await customFetch(`${apiBaseUrl}/${endpoint}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}