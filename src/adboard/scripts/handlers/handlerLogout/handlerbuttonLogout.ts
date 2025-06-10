/**
 * src\adboard\scripts\handlers\handlerLogout\handlerbuttonLogout.ts
 */

/**
 * 
 * @param e keydown event
 * @returns 
 */
export function handlerButtonUserLogout(e: MouseEvent): boolean  {
  
  if ((e.target as HTMLElement).tagName.toLowerCase() !== 'a' || 
    (((e.target as HTMLElement).textContent as string).toLowerCase() !== 'logout')){
    return false;
  }
  return true;
}
