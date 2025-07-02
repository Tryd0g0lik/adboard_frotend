
/**
 * src\ads\scripts\services\taskAddButton.ts
 */

import { isArray } from "lodash";


/**
 * This task add the button (the delete) when the user has choices checkbox selected.
 * @returns 
 */
const taskAddButton = () => {
  const buttonHtmlItem = document.createElement('button');
  buttonHtmlItem.innerHTML = 'Удалить';
  buttonHtmlItem.className = 'delete-button';
  const idAdsCollection = document.getElementById('ads-collections');
  if (!idAdsCollection) {
    return;
  }
  try{
    // Checking, would be the button is inserted earlier or not
    const ArrayButtonHtmlElement = idAdsCollection.getElementsByClassName("delete-button");
    
  // CHECK THE LINE OF AD, we have a select checkbox or not
  const choiseCheckbox: HTMLInputElement[] = [];
  const arrayLiHtml = document.querySelectorAll("#ads-collections li input");
  
  arrayLiHtml.forEach((item) => {
    if ((item as HTMLInputElement).checked) {
      choiseCheckbox.push((item as HTMLInputElement));
    }
  });
  if (choiseCheckbox.length === 0){
      // const buttonHtmlElement = idAdsCollection.getElementsByClassName("delete-button");
      if (ArrayButtonHtmlElement.length > 0) {
        ArrayButtonHtmlElement[0].remove();
      }
    return;
  }
    if (ArrayButtonHtmlElement.length ===  0 ) {
      idAdsCollection.appendChild(buttonHtmlItem);
    }
  
} catch (event){
  throw new Error(`[Error in taskAddButton]: ${event}`);
}
}

export default taskAddButton;

