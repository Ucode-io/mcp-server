/**
 * Function to get data from the Ucode Items API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {number} args.id - The ID of the resource to retrieve.
 * @returns {Promise<Object>} - The response data from the API.
 */
const executeFunction = async ({ id }) => {
  const baseUrl = 'https://postman-rest-api-learner.glitch.me/';
  const token = process.env.UCODE_PUBLIC_APIS_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/info`);
    url.searchParams.append('id', id);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting data:', error);
    return { error: 'An error occurred while getting data.' };
  }
};

/**
 * Tool configuration for getting data from the Ucode Items API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_data',
      description: 'Get data from the Ucode Items API.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'The ID of the resource to retrieve.'
          }
        },
        required: ['id']
      }
    }
  }
};

export { apiTool };