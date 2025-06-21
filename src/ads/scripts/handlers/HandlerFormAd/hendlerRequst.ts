/**
 * src\sripts\handlers\HandlerFormAd\hendlerRequst.ts
 */
import { AdLine } from "src/ads/interfaces";
import { URL_HOST_FOR_API } from "@ENV";
/**
 * This make the post-request to server, it adds the one a new Ad.
 * @param event Mouse click.
 * @returns boolean or AdLine
 */
export const asyncHandlerRequestAddAd = async (event: MouseEvent): Promise<boolean | { data: AdLine }> => {

  event.stopPropagation();
  // GET FORM HTML FOR AD
  const currenttarget = event.currentTarget; 
  // GET DATA OF FORM
  const dataF0rm = new FormData(currenttarget as HTMLFormElement);

  try {
    // REQUEST TO SERVER AND SEND AD's DATA OF FORM
    console.log(" REQUEST TO SERVER AND SEND AD's DATA OF FORM;");
    const response = await fetch(`${URL_HOST_FOR_API}/api/v1/ads/index/`,
      {
        method: "POST",
        body: dataF0rm
      }
    );
    if (!response.ok) {
      const body = await response.json() as { "detail": string[] };

      console.log("RESPONSE OF AD NOT Ok", body["detail"][0]);
      return false;
    } 
    // CLEANING THE BODY OF FORM HTML
    (currenttarget as HTMLElement).querySelectorAll("input").forEach((input: HTMLElement) => {
      (input as HTMLInputElement).value = "";
    });
    (currenttarget as HTMLElement).querySelectorAll("textarea").forEach((textarea: HTMLElement) => {
      (textarea as HTMLInputElement).value = "";
    });
    //  GET JSON DATA
    const body = await response.json() as string;
    // RESPONCE OF AD IS OK
    console.log(`RESPONCE OF AD IS OK: ${body}`);
    const data = JSON.parse(body) as { data: AdLine };
    return data;
  } catch (error: ErrorEvent | unknown) {
    console.log(`AD REQUEST ERROR => ${error}`);
    return false;
  }

};
