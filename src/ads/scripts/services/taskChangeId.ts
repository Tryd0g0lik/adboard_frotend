/**
 *  src\ads\scripts\services\taskChangeId.ts
 */

/**
 * Change the ID of DOM element to the ads page.
 * @returns void
 */
export const taskChangeIdDOM = () => {
  const sectionHtml =  document.getElementById("form-login");
  if (!sectionHtml) {
    return;
  };
  sectionHtml.id = "form-ads";
}
