/**
 * Function to post data to the Ucode Items API.
 *
 * @param {Object} args - Arguments for the POST request.
 * @param {string} args.name - The name to be added in the request body.
 * @returns {Promise<Object>} - The response from the API after posting the data.
 */
const executeFunction = async ({ name }) => {
  const baseUrl = 'https://postman-rest-api-learner.glitch.me/';
  const token = process.env.UCODE_PUBLIC_APIS_API_KEY;
  const data = { name };

  try {
    // Perform the fetch request
    const response = await fetch(`${baseUrl}/info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error posting data:', error);
    return { error: 'An error occurred while posting data.' };
  }
};

/**
 * Tool configuration for posting data to the Ucode Items API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'post_data',
      description: 'Post data to the Ucode Items API.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name to be added in the request body.'
          }
        },
        required: ['name']
      }
    }
  }
};

export { apiTool };