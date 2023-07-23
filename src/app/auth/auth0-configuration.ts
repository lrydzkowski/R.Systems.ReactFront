export function getAuth0Domain(): string {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN ?? "";
  if (domain.length === 0) {
    throw new Error("Environment variable VITE_AUTH0_DOMAIN doesn't exist.");
  }

  return domain;
}

export function getAuth0ClientId(): string {
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID ?? "";
  if (clientId.length === 0) {
    throw new Error("Environment variable VITE_AUTH0_CLIENT_ID doesn't exist.");
  }

  return clientId;
}

export function getAuth0Audience(): string {
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE ?? "";
  if (audience.length === 0) {
    throw new Error("Environment variable VITE_AUTH0_AUDIENCE doesn't exist.");
  }

  return audience;
}

export function getAuth0Scope(): string {
  const scope = import.meta.env.VITE_AUTH0_SCOPE ?? "";
  if (scope.length === 0) {
    throw new Error("Environment variable VITE_AUTH0_SCOPE doesn't exist.");
  }

  return scope;
}

export function getAuthorizationParams() {
  return {
    audience: getAuth0Audience(),
    scope: getAuth0Scope(),
  };
}
