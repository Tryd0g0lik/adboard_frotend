/**
 * src\scripts\services\createOneElement.ts
 */
import type { AdLine } from "src/ads/interfaces";
/**
 * 
 * @param instance HTMLElement This is main BOX for inserting by one line of ads
 * @param content AdLine's type. It is object (or json data) from server/api
 * @returns void
  */
const teskInsertOneAd = (instance: HTMLElement, content: AdLine): void => {
  // CREATE THE PARENT CONTEXT's BOX 
  const newLineHtml = document.createElement('li');
  newLineHtml.className = 'ad-view';
  newLineHtml.dataset.ad = `${(content as AdLine).id}`;

  // CREATE CONTENT CONTAINER
  const viewContentHTml = document.createElement('div');
  viewContentHTml.className = 'ad-view-container';
  // CREATE CHECKBOX
  const checkBoxContainerHTML = viewContentHTml.cloneNode(true);
  (checkBoxContainerHTML as HTMLElement).className = 'ad-view-container-checkbox';
  const checkBox = document.createElement('input');
  checkBox.setAttribute('data-ad', `${(content as AdLine).id}`)
  checkBox.type = 'checkbox';
  checkBox.name = 'remove';
  (checkBoxContainerHTML as HTMLElement).append(checkBox);

  // CREATE TITLE
  const titleAdHtml = document.createElement('div');
  titleAdHtml.className = 'ad-view-title';
  const titleHeading = document.createElement('h2');
  titleHeading.textContent = (content as AdLine).title;
  titleAdHtml.append(titleHeading);

  // CREATE DESCRIPTION
  const contextAdHtml = document.createElement('div');
  contextAdHtml.className = 'ad-view-content';
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
  viewContentHTml.append(checkBoxContainerHTML);
  viewContentHTml.append(titleAdHtml);
  viewContentHTml.append(contextAdHtml);
  viewContentHTml.append(viewFooterHtml);

  newLineHtml.append(viewContentHTml);

  // PUBLICATION TO WEB PAGE
  instance.append(newLineHtml);
};

export default teskInsertOneAd;
