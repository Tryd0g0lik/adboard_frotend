import { AdLine } from "src/interfaces";

/**
 * This make the post-request to server, it adds the one a new Ad.
 * @param event Mouse click.
 * @returns boolean or AdLine
 */
export const handlerRequestAddAd = async (event: MouseEvent): Promise<boolean | { data: AdLine }> => {
  const URL_HOST_FOR_API = process.env.URL_HOST_FOR_API || "localhost";
  event.stopPropagation();

  // GET SUBMIT HTML
  if (event.target && (event.target as HTMLElement).tagName.toLowerCase() !== "button") {
    return false;
  }
  console.log("START FORM's HANDLER OF AD");
  event.preventDefault();
  // GET FORM HTML FOR AD
  const currenttarget = event.currentTarget;
  if (currenttarget && (currenttarget as HTMLFormElement).tagName.toLowerCase() !== "form") {
    return false;
  }
  // GET DATA OF FORM
  const dataF0rm = new FormData(currenttarget as HTMLFormElement);

  try {
    // REQUEST TO SERVER AND SEND AD's DATA OF FORM
    console.log(" REQUEST TO SERVER AND SEND AD's DATA OF FORM;")
    const response = await fetch(`${URL_HOST_FOR_API}/api/v1/ads/`,
      {
        method: "POST",
        body: dataF0rm
      }
    );
    if (!response.ok) {
      console.log("RESPONSE OF AD NOT Ok");
      return false;
    }
    const body = await response.json();
    // RESPONCE OF AD IS OK
    console.log(`RESPONCE OF AD IS OK: ${body}`);
    return body;
  } catch (error: ErrorEvent | unknown) {
    console.log(`AD REQUEST ERROR => ${error}`);
    return false;
  }

};