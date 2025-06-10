/**
 * Function to create a field in the Ucode API.
 *
 * @param {Object} args - The field data to be created.
 * @param {string} args.label - The label for the field.
 * @param {string} args.defaultValue - The default value for the field.
 * @param {string} args.label_en - The English label for the field.
 * @param {boolean} args.enable_multilanguage - Whether to enable multilanguage support.
 * @param {string} args.table_id - The ID of the table to which the field belongs.
 * @param {string} args.slug - The slug for the field.
 * @param {string} args.type - The type of the field.
 * @param {boolean} args.required - Whether the field is required.
 * @returns {Promise<Object>} - The result of the field creation.
 */
const executeFunction = async ({ label, defaultValue, label_en, enable_multilanguage, table_id, slug, type, required }) => {
  const baseUrl = 'https://admin-api.ucode.run';
  const apiKey = process.env.UCODE_PUBLIC_APIS_API_KEY;
  const xApiKey = ''; // will be provided by the user

  try {
    const url = `${baseUrl}/v2/fields/relaunch`;
    const headers = {
      'Authorization': 'API-KEY',
      'Content-Type': 'application/json',
      'X-API-KEY': xApiKey
    };

    const body = JSON.stringify({
      attributes: {
        label: label || '',
        defaultValue: defaultValue || '',
        label_en: label_en || '',
        enable_multilanguage: enable_multilanguage || false,
        number_of_rounds: null
      },
      default: '',
      label: label || '',
      required: required || false,
      slug: slug || '',
      table_id: table_id || '',
      type: type || 'SINGLE_LINE',
      enable_multilanguage: enable_multilanguage || false,
      id: '0e88c54f-d23e-44a8-8c50-3b8bfc8f3df5',
      show_label: true
    });

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
    console.error('Error creating field:', error);
    return { error: 'An error occurred while creating the field.' };
  }
};

/**
 * Tool configuration for creating a field in the Ucode API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_field',
      description: 'Create a field in the Ucode API.',
      parameters: {
        type: 'object',
        properties: {
          label: {
            type: 'string',
            description: 'The label for the field.'
          },
          defaultValue: {
            type: 'string',
            description: 'The default value for the field.'
          },
          label_en: {
            type: 'string',
            description: 'The English label for the field.'
          },
          enable_multilanguage: {
            type: 'boolean',
            description: 'Whether to enable multilanguage support.'
          },
          table_id: {
            type: 'string',
            description: 'The ID of the table to which the field belongs.'
          },
          slug: {
            type: 'string',
            description: 'The slug for the field.'
          },
          type: {
            type: 'string',
            description: 'The type of the field.'
          },
          required: {
            type: 'boolean',
            description: 'Whether the field is required.'
          }
        },
        required: ['label', 'table_id', 'slug', 'type']
      }
    }
  }
};

export { apiTool };