/**
 * Function to create a menu in the Ucode API.
 *
 * @param {Object} menuData - The data for the menu to be created.
 * @param {string} menuData.icon - The icon for the menu.
 * @param {Object} menuData.attributes - The attributes for the menu.
 * @param {string} menuData.attributes.label - The label for the menu.
 * @param {string} menuData.attributes.label_en - The English label for the menu.
 * @param {string} menuData.parent_id - The ID of the parent menu.
 * @param {string} menuData.type - The type of the menu (e.g., FOLDER).
 * @returns {Promise<Object>} - The result of the menu creation.
 */
const executeFunction = async (menuData) => {
  const baseUrl = 'https://admin-api.ucode.run';
  const apiKey = process.env.UCODE_PUBLIC_APIS_API_KEY;
  const authMethod = process.env.UCODE_PUBLIC_APIS_AUTH_METHOD;; // will be provided by the user

  try {
    const url = `${baseUrl}/v2/menus`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': authMethod,
      'X-API-KEY': apiKey,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(menuData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating menu:', error);
    return { error: 'An error occurred while creating the menu.' };
  }
};

/**
 * Tool configuration for creating a menu in the Ucode API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_menu',
      description: 'Create a menu in the Ucode API.',
      parameters: {
        type: 'object',
        properties: {
          icon: {
            type: 'string',
            description: 'The icon for the menu.'
          },
          attributes: {
            type: 'object',
            properties: {
              label: {
                type: 'string',
                description: 'The label for the menu.'
              },
              label_en: {
                type: 'string',
                description: 'The English label for the menu.'
              }
            },
            required: ['label', 'label_en']
          },
          parent_id: {
            type: 'string',
            description: 'The ID of the parent menu.'
          },
          type: {
            type: 'string',
            description: 'The type of the menu (e.g., FOLDER).'
          }
        },
        required: ['icon', 'attributes', 'parent_id', 'type']
      }
    }
  }
};

export { apiTool };