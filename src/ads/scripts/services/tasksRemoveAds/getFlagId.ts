/**
 * src\ads\scripts\services\tasksRemoveAds\getFlagId.ts
 */

/***
 * This function gather all the flag/checkboxes.
 * After this, we have array of the highlighted flage.
 * @return {string[]} - array of ctrings
 */
function taskGetFlagId(): string[] {
  // CHECK THE LINE OF AD, we have a select checkbox or not
  const choiseCheckbox: string[] = [];
  try {
  
  const arrayLiHtml = document.querySelectorAll("#ads-collections li input");
  // FILTER OF CHECKBOX
  arrayLiHtml.forEach((item) => {
    if ((item as HTMLInputElement).checked) {
      choiseCheckbox.push((item as HTMLInputElement).getAttribute('data-ad') as string);
    }
  });
  
} catch (error){
  if(error){
    throw new Error(`[Error in getFlagId]: ${error}`);
  }
}
  return choiseCheckbox;
}

export default taskGetFlagId;
