/**
 * src\sripts\handlers\handlersAdsCollection\handlerReceiveNewAd.ts
 */
import type { AdLine, AdLinesCollection } from "src/interfaces";



/**
 * This handler for publicate the one new ad or list of ads's collection in web-page.
 * @param content Adline's or AdLinesCollection data type. Default value is undefined.
 * @returns Promise boolean
 */
export async function handlerReceivesData(content: AdLine | AdLinesCollection | undefined  = undefined): Promise<boolean>{
  if (!content) {
    /**
     * Дополнителььная функция request для запроса get получить  список ads
     */
    null
    return true
  }
  const collectionsHTML = document.querySelector("#ads-collections ul.ads-views") as HTMLElement;
  
  if (!collectionsHTML) {
    console.log("INVALID 'ads-collections'");
    false;
  } else{
    // RECEIVING HTML CONTENT FROM SERVER's/API's DATA
    insertOneAd(collectionsHTML, content as AdLine);
  }
  
  
  
  // ulHtml
  return true
};

/**
 * 
 * @param instance HTMLElement This is main BOX for inserting by one line of ads
 * @param content AdLine's type. It is object (or json data) from server/api
  */
function insertOneAd(instance: HTMLElement, content: AdLine): void{
  // CREATE THE PARANT CONTEXT's BOX 
  const newLineHtml = document.createElement('li');
  (newLineHtml as HTMLElement).setAttribute('class', 'ad-view');
  (newLineHtml as HTMLElement).setAttribute('data-ad', `${(content as AdLine).id}`);
  // SET CLASS NAME FOR TITLE AD
  const titleAdHtml = document.createElement('div');
  (titleAdHtml as HTMLElement).setAttribute('class', 'ad-view-title');
  (titleAdHtml as HTMLElement).innerHTML = `<h2>${(content as AdLine).title}</h2>`;
  // SET CLASS NAME FOR CONTEXT AD
  const contextAdHtml = titleAdHtml.cloneNode();
  (contextAdHtml as HTMLElement).setAttribute('class', 'ad-view-context');
  (contextAdHtml as HTMLElement).innerText = `${(content as AdLine).description}`;
  // CREATE THE FOOTER BOX FOR INSERTING BUTTON 
  const viewFooterHTml = titleAdHtml.cloneNode();
  // (viewFooterHTml as HTMLElement).setAttribute('class', 'ad-view-footer');
  (viewFooterHTml as HTMLElement).innerHTML = '<div class="ad-view-footer"><button type="submit" class= "ad-moving" > Перейти < /button></div >';

  // CREATE THE BOX FOR INSERTING THE 'titleAdHtml','contextAdHtml' and 'fotter Button'
  const viewContentHTml = titleAdHtml.cloneNode();
  (viewContentHTml as HTMLElement).setAttribute('class', 'ad-view-content');


  // CREATE HTML CONTENT FOR PUBLICATIO
  (viewContentHTml as HTMLElement).insertAdjacentHTML('beforeend', (titleAdHtml as HTMLElement).innerHTML);
  (viewContentHTml as HTMLElement).insertAdjacentHTML('beforeend', (contextAdHtml as HTMLElement).innerHTML);
  (viewContentHTml as HTMLElement).insertAdjacentHTML('beforeend', (viewFooterHTml as HTMLElement).innerHTML);

  (newLineHtml as HTMLElement).insertAdjacentHTML('beforeend', (viewContentHTml as HTMLElement).innerHTML);
  // PUBLICATION TO WEB PAGE 
  instance.insertAdjacentHTML('beforeend', (newLineHtml as HTMLElement).innerHTML);
}