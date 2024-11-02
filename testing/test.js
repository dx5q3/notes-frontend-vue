
import axios from "axios";

const login = async (username, password) => {
    try {
        const res = await axios.post(`https://cognito-idp.us-east-1.amazonaws.com/`, {
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
            },
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: '60pda9dskbkn42rmt5ifup9o16',
        }, {
            headers: {
                'Content-Type': 'application/x-amz-json-1.1',
                'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
            }
        });

        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
};

async function loginUser(username, password) {
    const userPoolId = 'YOUR_USER_POOL_ID'; // Replace with your User Pool ID
    const clientId = 'YOUR_CLIENT_ID'; // Replace with your App Client ID
    const region = 'YOUR_REGION'; // Replace with your region (e.g., 'us-east-1')

    const url = `https://cognito-idp.${region}.amazonaws.com/`;

    const body = {
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Login failed:', errorResponse);
        return;
    }

    const data = await response.json();
    console.log('Login successful! Access token:', data.AuthenticationResult.AccessToken);
}

// Example usage
const username = 'test5'; // replace with actual username
const password = 'Passwd1!'; // replace with actual password
login(username, password);
