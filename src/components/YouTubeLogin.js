import React, { useEffect } from 'react';

const YouTubeLogin = () => {
  const GOOGLE_CLIENT_ID = 'your_google_client_id';

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      console.log('Encoded JWT ID token: ' + response.credential);
      // Handle token exchange
    };

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-login-button'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  return (
    <div>
      <h1>Login to YouTube Music</h1>
      <div id="google-login-button"></div>
    </div>
  );
};

export default YouTubeLogin;
