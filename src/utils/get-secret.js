const getSecretValue = (key) => {
  if (process.env.NODE_ENV === 'development') {
    // Use local environment variables from .env file
    const localKey = `REACT_APP_${key}`;
    if (!process.env[localKey]) {
      console.error(
        `Missing secret for ${localKey} in development environment.`
      );
    }
    return process.env[localKey];
  } else {
    // Use GitHub Actions secrets (assuming they are injected as environment variables)
    if (!process.env[key]) {
      console.error(`Missing secret for ${key} in production environment.`);
    }
    return process.env[key];
  }
};

module.exports = {
  getSecretValue,
};
