/**
 * src\sripts\handlers\HandlerFormAd\index.ts
 */
import { asyncHandlerRequestAddImage } from "src/scripts/handlers/HandlerFormImg";
import type { AdLine } from "src/interfaces";
import { asyncHandlerReceivesData } from "../handlersAdsCollection/handlerReceiveNewAd";
import { asyncHandlerRequestAddAd } from "./hendlerRequst";

/**
 * This function for add the two listens to the form, the first is for send ads to server, and the second is for send image file to server.
 * @returns boolean.
 */
export function formPage(): boolean {
  // ADS FORM
  const formHTML = document.querySelector(".form form") as HTMLFormElement;
  // IMAGE FILE FORM
  const formImageFileHTML = document.querySelector(".form form.ads-form__full-image-file") as HTMLFormElement;
  if (!formHTML) {
    console.log("Somewing that frong! Invalid form.");
    return false;
  } else{

    const formHTMLCopy = (formHTML as HTMLFormElement);
    // ----- EVENT ONCLICK FOR ADS -----
    formHTMLCopy.onclick = async (e: MouseEvent): Promise<boolean> => {
      const dataBoolJson = await asyncHandlerRequestAddAd(e);
      if ((typeof (dataBoolJson)).toLowerCase() === 'boolean') {
        return false;
      }
      const dataJson = dataBoolJson as { "data": AdLine };
      // ONE AD  SEND TO PUBLIC IN WEB-PAGE
      asyncHandlerReceivesData(dataJson.data as unknown as AdLine);
      return true;
    };
  }
  if (!formImageFileHTML) {
    console.log("Somewing that frong! Invalid form.");
    return false;
  } else{
    const formHTMLCopy = (formImageFileHTML as HTMLFormElement);
    //----- EVENT ONCLICK FOR IMAGE -----
    formHTMLCopy.onclick = async (e: MouseEvent): Promise<boolean> => {
      const responce = await asyncHandlerRequestAddImage(e);
      if (!responce) {
        console.log("RESPONSE OF SEND IMAGE IS NOT OK");
        return false;
      }
      return true;
    };
  }
  
  return true;
}
