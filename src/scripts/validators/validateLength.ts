/**
 * src\scripts\validators\validateLength.ts
 */

/**
 * 
 * @param value : strin - The string to validate
 * @param maxLength : number - The maximum length of the string
 */
export async function validateMinLength(value: string, minLength: number): Promise<string|void> {
  if (!value || value.length < minLength) {
    throw new Error('validateMinLength: Invalid value');
  }
  
}

/**
 * 
 * @param value : strin - The string to validate
 * @param maxLength : number - The maximum length of the string
 */
export async function validateMaxLength(value: string, maxLength: number): Promise<string | void> {
  if (!value || value.length > maxLength) {
    throw new Error('validateMinLength: Invalid value');
  }
}
