/**
 * src\scripts\handlers\handlerWeatherform\taskCreateOneElement.ts
 */

import { AdLine } from "src/interfaces";

/**
 * 
 * @param instance HTMLElement This is main BOX for inserting by one line of ads
 * @param content AdLine's type. It is object (or json data) from server/api
 * @returns void
  */
export const teskInsertOneAd = (instance: HTMLElement, content: string): void => {
  // CREATE THE PARENT CONTEXT's BOX 
  const newLineHtml = document.createElement('li');
  newLineHtml.className = 'ad-view';
  newLineHtml.dataset.ad = `${(content as unknown as AdLine).id}`;

  // CREATE CONTENT CONTAINER
  const viewContentHTml = document.createElement('div');
  viewContentHTml.className = 'ad-view-container';
  // CREATE TITLE
  const titleAdHtml = document.createElement('div');
  titleAdHtml.className = 'ad-view-title';
  const titleHeading = document.createElement('h2');
  titleHeading.textContent = content;
  titleAdHtml.append(titleHeading);

  // CREATE DESCRIPTION
  const contextAdHtml = document.createElement('div');
  contextAdHtml.className = 'ad-view-content';
  newLineHtml.textContent = content;

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
};

export default teskInsertOneAd;
