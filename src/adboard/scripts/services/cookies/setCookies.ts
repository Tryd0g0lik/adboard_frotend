/***
 * src\adboard\scripts\services\cookies\setCookies.ts
 */

/**
 * Cookies set up
 * @param key 
 * @param value 
 * @param lifeTime 
 */
export function setSessionIdInCookie(key: string, value: string, lifeTime: string): void {

  const cookieName = key;
  const cookieValue = value;
  // const maxAge = 60 * 60 * 24; // Время жизни cookie в секундах (например, 1 день)

  document.cookie = `${cookieName}=${cookieValue}; max-age=${lifeTime}; path=/; secure; samesite=strict`;
}
