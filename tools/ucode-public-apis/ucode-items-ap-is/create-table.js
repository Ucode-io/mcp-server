/**
 * Function to create a table in the Ucode API.
 *
 * @param {Object} args - Arguments for creating the table.
 * @param {boolean} args.show_in_menu - Indicates if the table should be shown in the menu.
 * @param {string} args.app_id - The application ID associated with the table.
 * @param {string} args.label - The label for the table.
 * @param {string} [args.description] - A description for the table.
 * @param {string} args.slug - The slug for the table.
 * @param {string} [args.icon] - An icon for the table.
 * @param {Object} args.attributes - Attributes for the table.
 * @param {boolean} args.is_login_table - Indicates if this is a login table.
 * @param {boolean} args.is_cached - Indicates if the table is cached.
 * @param {boolean} args.soft_delete - Indicates if soft delete is enabled.
 * @param {boolean} args.order_by - Indicates if ordering is enabled.
 * @returns {Promise<Object>} - The result of the table creation.
 */
const executeFunction = async ({ show_in_menu, app_id, label, description = '', slug, icon = '', attributes, is_login_table = false, is_cached = false, soft_delete = false, order_by = false }) => {
  const baseUrl = 'https://admin-api.ucode.run';
  const apiKey = process.env.UCODE_PUBLIC_APIS_API_KEY;
  const authMethod = 'API-KEY'; // static value as per the collection
  const url = `${baseUrl}/v1/table`;

  const headers = {
    'Authorization': authMethod,
    'Content-Type': 'application/json',
    'X-API-KEY': apiKey
  };

  const body = JSON.stringify({
    show_in_menu,
    app_id,
    label,
    description,
    slug,
    icon,
    attributes,
    is_login_table,
    is_cached,
    soft_delete,
    order_by
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating table:', error);
    return { error: 'An error occurred while creating the table.' };
  }
};

/**
 * Tool configuration for creating a table in the Ucode API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_table',
      description: 'Create a new table in the Ucode API.',
      parameters: {
        type: 'object',
        properties: {
          show_in_menu: {
            type: 'boolean',
            description: 'Indicates if the table should be shown in the menu.'
          },
          app_id: {
            type: 'string',
            description: 'The application ID associated with the table.'
          },
          label: {
            type: 'string',
            description: 'The label for the table.'
          },
          description: {
            type: 'string',
            description: 'A description for the table.'
          },
          slug: {
            type: 'string',
            description: 'The slug for the table.'
          },
          icon: {
            type: 'string',
            description: 'An icon for the table.'
          },
          attributes: {
            type: 'object',
            description: 'Attributes for the table.'
          },
          is_login_table: {
            type: 'boolean',
            description: 'Indicates if this is a login table.'
          },
          is_cached: {
            type: 'boolean',
            description: 'Indicates if the table is cached.'
          },
          soft_delete: {
            type: 'boolean',
            description: 'Indicates if soft delete is enabled.'
          },
          order_by: {
            type: 'boolean',
            description: 'Indicates if ordering is enabled.'
          }
        },
        required: ['show_in_menu', 'app_id', 'label', 'slug', 'attributes']
      }
    }
  }
};

export { apiTool };