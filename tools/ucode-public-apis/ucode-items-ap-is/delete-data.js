/**
 * Function to delete data from the Ucode Items API.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.id - The identifier of the entity to be deleted.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ id }) => {
  const baseUrl = 'https://postman-rest-api-learner.glitch.me/';
  const token = process.env.UCODE_PUBLIC_APIS_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/info`);
    url.searchParams.append('id', id);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Return success message or response
    return { message: 'Data deleted successfully', status: response.status };
  } catch (error) {
    console.error('Error deleting data:', error);
    return { error: 'An error occurred while deleting data.' };
  }
};

/**
 * Tool configuration for deleting data from the Ucode Items API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_data',
      description: 'Delete data from the Ucode Items API.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The identifier of the entity to be deleted.'
          }
        },
        required: ['id']
      }
    }
  }
};

export { apiTool };