/**
 * src\sripts\handlers\handlersAdsCollection\handlerReceiveNewAd.ts
 */
import type { AdLine, AdLinesCollection } from "src/interfaces";
/**
 * 
 * @param instance HTMLElement This is main BOX for inserting by one line of ads
 * @param content AdLine's type. It is object (or json data) from server/api
  */

function insertOneAd(instance: HTMLElement, content: AdLine): void {
  // CREATE THE PARENT CONTEXT's BOX 
  const newLineHtml = document.createElement('li');
  newLineHtml.className = 'ad-view';
  newLineHtml.dataset.ad = `${(content as AdLine).id}`;

  // CREATE CONTENT CONTAINER
  const viewContentHTml = document.createElement('div');
  viewContentHTml.className = 'ad-view-content';

  // CREATE TITLE
  const titleAdHtml = document.createElement('div');
  titleAdHtml.className = 'ad-view-title';
  const titleHeading = document.createElement('h2');
  titleHeading.textContent = (content as AdLine).title;
  titleAdHtml.append(titleHeading);

  // CREATE DESCRIPTION
  const contextAdHtml = document.createElement('div');
  contextAdHtml.className = 'ad-view-context';
  contextAdHtml.textContent = (content as AdLine).description;

  // CREATE FOOTER
  const viewFooterHtml = document.createElement('div');
  viewFooterHtml.className = 'ad-view-footer';
  const button = document.createElement('button');
  button.type = 'submit';
  button.className = 'ad-moving btn btn-primary';
  button.textContent = 'Перейти';
  viewFooterHtml.append(button);

  // ASSEMBLE ALL PARTS
  viewContentHTml.append(titleAdHtml);
  viewContentHTml.append(contextAdHtml);
  viewContentHTml.append(viewFooterHtml);

  newLineHtml.append(viewContentHTml);

  // PUBLICATION TO WEB PAGE
  instance.append(newLineHtml);
}

/**
 * This handler for publicate the one new ad or list of ads's collection in web-page.
 * @param content Adline's or AdLinesCollection data type. Default value is undefined.
 * @returns Promise boolean
 */
export async function handlerReceivesData(content: AdLine | AdLinesCollection | undefined = undefined): Promise<boolean> {
  if (!content) {
    /**
     * Дополнителььная функция request для запроса get получить  список ads
     */
    null;
    return true;
  }
  const collectionsHTML = document.querySelector("#ads-collections ul.ads-views") as HTMLElement;

  if (!collectionsHTML) {
    console.log("INVALID 'ads-collections'");
    false;
  } else {
    // RECEIVING HTML CONTENT FROM SERVER's/API's DATA
    insertOneAd(collectionsHTML, content as AdLine);
  }
  // ulHtml
  return true;
};

