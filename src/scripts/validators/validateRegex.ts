/**
 * src\scripts\validators\validateRegex.ts
 */
export async function validateRegex(value: string, regex: RegExp):Promise<void> {

  const bool = regex.test(value);
  if (!bool) {
    throw new Error(' validateRegex: Value is not valid');
  }
}
