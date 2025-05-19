/**
 * src\scripts\handlers\handlerSingleAd\handleRequsetReceiveAd.ts
 */
import type { AdLine } from "src/interfaces";
import teskInsertOneAd from "src/scripts/services/taskCreateOneElement";
const URL_HOST_FOR_API = process.env.URL_HOST_FOR_API || "localhost";


async function asyncHandlerRequestGetOneAd(index: string): Promise<{ data: AdLine } | void> {
  try{
    const response = await fetch(`/api/ad/one/${index}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok){
      console.error(`The 'error' of GET: ${response.statusText}`);
      return;
    }
    const data = await response.json() as string;
    const dataJson = JSON.parse(data) as { data: AdLine };
    return dataJson;
  } catch (err){
    console.error(new Error("The 'index' ERROR: " + err));
  }
  return;
} 

function handlerSubmitGetIdFroHTML(event: MouseEvent): string|  void{
  if (!(event.target instanceof HTMLElement)) {
    return;
  }
  if ((event.target as HTMLElement).tagName.toLowerCase() !== "button") {
    return;
  }
  event.stopPropagation();
  event.preventDefault();
  const target = event.target as HTMLElement;
  const liParantHtml = target.parentElement?.parentElement?.parentElement as HTMLElement;
  if ((liParantHtml?.tagName as string).toLowerCase() !== "li") {
    console.error("The tag 'LI' is invalid!");
    return;
  }
  const getId = liParantHtml.hasAttribute('data-ad')? liParantHtml.getAttribute('data-ad'): undefined;
  if (!getId){
    console.error("The 'no id' is invalid!");
    return;
  }
  console.warn("THe ID of Ad is Ok.");
  return getId;
}

/**
 * This function is called when you click on the button 'submit' and get the index of the Ad.\
 * Then, relocation to the page of the public Ad (http://< HOST >/ad/id/) .
 * @param event of click.
 * @returns  Promise<void>
 */
export async function asyncHandlerOneAdPublic(event: MouseEvent): Promise<void>{
  // GET INDEX OF Ad FROM HTML-ELEMENT
  const data = handlerSubmitGetIdFroHTML(event);
  if (!data){
    console.warn("The index's data of Ad is invalid!");
    return;
  }
  window.location.href = `${URL_HOST_FOR_API}/ad/${data}/`;
  // GET DATA OF AD FROM THE SERVER
  // const response = await asyncHandlerRequestGetOneAd(data);
  // if (!response){
  //   console.error("The received data from server is invalid!");
  // }
  // const sectionHtml = document.getElementById("ad-page");
  // if (!sectionHtml){
  //   console.error("The section HTML is invalid!");
  // }
  // // PUBLIC AD ON AD PAGE
  // teskInsertOneAd((sectionHtml as HTMLElement), (response as { data: AdLine}).data);
}

/**
 * Here, to the entrypoint accepting the 'instance' and 'className' or 'idName' (only one) of HTML-element. \
 * It (html-element wich has the'className' or 'idName')\
 * will receive 'instance' (a callback function), this function will be handle the events. 
 * @param instanse: async callback c this a function that handle event 'click' by submit
 * @param className: string. Default value undefined. 
 * @param idName : string. Default value undefined.
 * @returns void.
 */
export async function asyncGetListenerEvent(instanse: CallableFunction, 
  className: undefined|string = undefined,
   idName: undefined |string = undefined): Promise<void>{
    if (!className && idName){
      document.getElementById(idName)?.removeEventListener("click", instanse as EventListener);
      document.getElementById(idName)?.addEventListener("click", instanse as EventListener);
      return;
    } else if (className && !idName){
      (document.getElementsByClassName(className)[0] as HTMLElement).removeEventListener("click", instanse as EventListener);
      (document.getElementsByClassName(className)[0] as HTMLElement).addEventListener("click", instanse as EventListener);
      return;
    }
    return;
}
