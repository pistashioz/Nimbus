export async function get(apiBaseUrl, endpoint) {
  try {
    const response = await customFetch(`${apiBaseUrl}/${endpoint}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = '';
    try {
      errorMessage = await response.text();
    } catch (textError) {
      console.error('Error reading response text:', textError);
    }
    
    throw new Error(
      `API request failed with status ${response.status}: ${errorMessage}`
    );
  }
  return response.json();
}