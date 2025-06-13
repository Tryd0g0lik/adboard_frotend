/**
 * src\sripts\handlers\HandlerFormImg\index.ts
 */
import { URL_HOST_FOR_API } from "@ENV";
import type { AdLine } from "src/ads/interfaces";
/**
 * This handler of post request for add only one an image to server.
 * @param event handler of clik by button of form. This form load the image to server.
 * @returns  AdLine or boolean
 */
export const asyncHandlerRequestAddImage = async (event: MouseEvent): Promise<boolean | { data: AdLine }> => {
  
  event.stopPropagation();

  // GET SUBMIT HTML
  if (event.target && (event.target as HTMLElement).tagName.toLowerCase() !== "button") {
    return false;
  }
  event.preventDefault();
  // GET FORM HTML
  const currenttarget = event.currentTarget;
  if (currenttarget && (currenttarget as HTMLFormElement).tagName.toLowerCase() !== "form") {
    return false;
  }
  const dataF0rm = new FormData(currenttarget as HTMLFormElement);
  // REQUEST TO SERVER AND SEND FILE IMAGE
  try {
    const response = await fetch(`${URL_HOST_FOR_API}/api/v1/image/`,
      {
        method: "POST",
        body: dataF0rm
      }
    );
    if (!response.ok) {
      return false;
    }
    // RESPONCE IS OK
    const body = await response.json() as { data: AdLine };
    console.log(`SERVER: ${body}`);
    return body;

  } catch (error: ErrorEvent | unknown) {
    console.log(`Request of FIleImage to server Error => ${error}`);
    return false;
  }
};
