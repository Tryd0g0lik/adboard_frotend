/**
 * src\sripts\handlers\HandlerFormAd\index.ts
 */
import { asyncHandlerRequestAddImage } from "src/ads/scripts/handlers/HandlerFormImg";
import type { AdLine } from "src/ads/interfaces";
import { asyncHandlerReceivesData } from "../handlersAdsCollection/handlerReceiveNewAd";
import { asyncHandlerRequestAddAd } from "./hendlerRequst";
import { validateMinLength, validateMaxLength } from "src/scripts/validators/validateLength";
import { validateRegex } from "src/scripts/validators/validateRegex";
import getErrorContent from "src/adboard/scripts/services/taskGetErrorContent";

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

      // GET SUBMIT HTML
      if (e.target && (e.target as HTMLElement).tagName.toLowerCase() !== "button") {
        return false;
      }
      console.log("START FORM's HANDLER OF AD");
      e.preventDefault();
      // GET FORM HTML FOR AD
      const currenttarget = e.currentTarget;
      if (currenttarget && (currenttarget as HTMLFormElement).tagName.toLowerCase() !== "form") {
        return false;
      }
      (currenttarget as HTMLElement).querySelector(".invalid")?.remove();
      // GET DATA OF FORM
      const dataF0rm = new FormData(currenttarget as HTMLFormElement);
      // CHECK TITLE OF AD FORM
      const title = dataF0rm.get('title');
      const regexTitle = /^(?!.*  )[a-zA-Zа-яА-ЯёЁ][\w \-_\dа-яА-ЯёЁ]{1,48}[a-zA-Zа-яА-ЯёЁ]$[^\S\W \\]?/;

      try {        
        // VALIDATE TITLE AD
        await Promise.all([
          validateMinLength(title as string, 3),
          validateMaxLength(title as string, 100),
          validateRegex(title as string, regexTitle),
        ]);

      } catch (err: unknown | Error) {
        const titleHTML = ((currenttarget as HTMLElement).querySelector('input[name="title"]')) as HTMLElement;
        getErrorContent(titleHTML as HTMLElement, err as Error);
        return false;
      }
      // CHECK DESCRIPTION AD FORM
      try {
        const description = dataF0rm.get('description');
        await Promise.all([
          validateMinLength(description as string, 10),
          validateMaxLength(description as string, 500),
        ]);
      } catch (err: unknown | Error) {
        const titleHTML = ((currenttarget as HTMLElement).querySelector('textarea[name="description"]')) as HTMLElement;
        getErrorContent(titleHTML as HTMLElement, err as Error);
        return false;
      }

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
