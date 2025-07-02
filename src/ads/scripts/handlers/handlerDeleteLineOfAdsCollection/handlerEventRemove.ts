/**
 * src\ads\scripts\handlers\handlerDeleteLineOfAdsCollection\handlerEventRemove.ts
 */


/**
 * This  function is called when the user clicks on the button to remove the Ad of the collection
 * 
 * @param item HTMLElement
 */
export function handlerButtonClickEventRemove(item: HTMLButtonElement) {
  try{
    const arrayOfIndexes = [];
    item.onclick = () =>{
      const arrayInputs = Array.from(document.querySelectorAll("#ads-collections input"));
      arrayInputs.forEach((item) => {
        if ((item as  HTMLInputElement).checked) {
          
          arrayOfIndexes.push(item.getAttribute("data-ad") as string);
          // item.remove();
        }
        // arrayOfIndexes
        /// WILL SEND THE REQUEST (protokol DELETE) TO REMOVE THE ADS
        // fetch("/ads", {}
      });
      if (arrayOfIndexes.length === 0) {
        return;
      }
      // fetch("/ads", {}
    }
  } catch (event){

  }

}

