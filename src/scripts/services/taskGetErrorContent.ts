/**
 * src\scripts\services\taskGetErrorContent.ts
 */

/**
 * For a chacker of validate from from conten.    
 * @param field HTML element.
 * @param err 
 * @returns void
 */
const getErrorContent = (field: HTMLElement, err: Error) => {
  const pHtml = document.createElement('p');
  pHtml.className = "invalid";
  const fieldHtml = (field as HTMLInputElement);
  const textInput = fieldHtml.value ? fieldHtml.value : "";
  pHtml.textContent = `${((err as Error).message).split(": ")[1]}`;
  field.after(pHtml);
  (field as HTMLInputElement).value = textInput;
  return false;
};
export default getErrorContent;
