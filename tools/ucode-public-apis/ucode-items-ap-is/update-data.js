/**
 * Function to update data on the Ucode Items API.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.name - The new name to update in the data.
 * @param {number} args.id - The identifier of the entity to be updated.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ name, id }) => {
  const baseUrl = 'https://postman-rest-api-learner.glitch.me/';
  const token = process.env.UCODE_PUBLIC_APIS_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/info`);
    url.searchParams.append('id', id);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
    };

    // Prepare the body of the request
    const body = JSON.stringify({ name });

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers,
      body,
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
    console.error('Error updating data:', error);
    return { error: 'An error occurred while updating data.' };
  }
};

/**
 * Tool configuration for updating data on the Ucode Items API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_data',
      description: 'Update data on the Ucode Items API.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The new name to update in the data.'
          },
          id: {
            type: 'integer',
            description: 'The identifier of the entity to be updated.'
          }
        },
        required: ['name', 'id']
      }
    }
  }
};

export { apiTool };