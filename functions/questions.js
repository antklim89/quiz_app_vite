const axios = require('axios');


const QUIZ_API_KEY = process.env.VITE_QUIZ_API_KEY;
const QUIZ_URL = process.env.VITE_QUIZ_URL;

const url = `${QUIZ_URL}?apiKey=${QUIZ_API_KEY}`;

exports.handler = async (event) => {
    try {
        const { category } = event.queryStringParameters;
        const response = await axios.get(url, {
            params: {
                category,
                limit: 10,
            },
        });

        return { statusCode: 200, body: JSON.stringify(response.data) };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed fetching data' }),
        };
    }
};

