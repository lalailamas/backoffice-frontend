export async function refreshAccessToken (token) {
  try {
    const refreshedTokensResponse = await fetch('https://cognito-idp.us-east-1.amazonaws.com', {
      headers: {
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
        'Content-Type': 'application/x-amz-json-1.1'
      },
      method: 'POST',
      body: JSON.stringify({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
          REFRESH_TOKEN: token
        }
      })
    })

    const refreshedTokens = await refreshedTokensResponse.json()

    if (!refreshedTokensResponse.ok) {
      throw refreshedTokens
    }

    return {
      accessToken: refreshedTokens.AuthenticationResult.AccessToken,
      accessTokenExpires: Date.now() + refreshedTokens.AuthenticationResult.ExpiresIn * 1000,
      refreshToken: refreshedTokens.AuthenticationResult.RefreshToken ?? token
    }
  } catch (error) {
    console.error('Error refreshing access token: ', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}
