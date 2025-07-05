/**
 * src\ads\scripts\services\taskAddButton.ts
 */
import { handlerButtonClickEventRemove } from '@ADS/scripts/handlers/handlerDeleteLineOfAdsCollection/handlerEventRemove';
import taskGetFlagId from './getFlagId';

/**
 * This task add the button (the delete) when the user has choices checkbox selected.
 * @param {HTMLButtonElement} buttonHtmlItem. We created the button html elementand and give to the entry-point. It's 'buttonHtmlItem' variable.
 * @returns void
 */
const taskAddButton = (buttonHtmlItem: HTMLElement): void => {
  buttonHtmlItem.innerHTML = 'Удалить';
  buttonHtmlItem.className = 'delete-button';
  const idAdsCollection = document.getElementById('ads-collections');
  if (!idAdsCollection) {
    return;
  }
  try{
    // Checking, would be the button is inserted earlier or not
    const arrayButtonHtmlElement = idAdsCollection.getElementsByClassName("delete-button");
    // Getitng the highlighted checkboxes 
    const arrayChoiseCheckbox = taskGetFlagId();
  
  if (arrayChoiseCheckbox.length === 0){
      // const buttonHtmlElement = idAdsCollection.getElementsByClassName("delete-button");
    if (arrayButtonHtmlElement.length > 0) {
      arrayButtonHtmlElement[0].remove();
      }
    return;
  }
    if (arrayButtonHtmlElement.length === 0) {
      handlerButtonClickEventRemove(buttonHtmlItem as HTMLButtonElement);
      idAdsCollection.appendChild(buttonHtmlItem);
    }
  
} catch (event){
  throw new Error(`[Error in taskAddButton]: ${event}`);
}
};

export default taskAddButton;

