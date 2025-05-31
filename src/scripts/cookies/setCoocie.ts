function setSessionIdInCookie(sessionId: string): void {
  const cookieName = 'sessionId';
  const cookieValue = sessionId;
  const maxAge = 60 * 60 * 24; // Время жизни cookie в секундах (например, 1 день)

  document.cookie = `${cookieName}=${cookieValue}; max-age=${maxAge}; path=/; secure; samesite=strict`;
}