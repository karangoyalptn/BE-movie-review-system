const axios = require('axios');

// Function to handle incoming requests
const handleRequest = async (req) => {
    const { query, body, headers, method, url : apiUrl } = req;

    try {
        let response;
        switch (method) {
        case 'GET':
            response = await axios.get(apiUrl, { params: query, headers });
            break;
        case 'POST':
            response = await axios.post(apiUrl, body, { params: query, headers });
            break;
        case 'PUT':
            response = await axios.put(apiUrl, body, { params: query, headers });
            break;
        case 'DELETE':
            response = await axios.delete(apiUrl, { params: query, headers });
            break;
        default:
            throw new Error('Method Not Allowed');
        }

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export default handleRequest;
