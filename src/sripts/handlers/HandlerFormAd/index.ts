import { handlerSendImage } from "src/sripts/handlers/HandlerFormImg";

const handlerForm = async (event: MouseEvent): Promise<boolean> => {
  const URL_HOST_FOR_API = process.env.URL_HOST_FOR_API || "localhost";
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
 
  try {
    const response = await fetch(`${URL_HOST_FOR_API}/api/v1/ads/`,
      {
        method: "POST",
        body: dataF0rm
      }
    );
    if (!response.ok) {
      return false;
    }
    const body = await response.json();
    console.log(`SERVER: ${body}`);

  } catch (error: ErrorEvent | unknown) {
    console.log(`Request to server Error => ${error}`);
    return false;
  }
  return true;
};

export function formPage(): boolean {
  const formHTML = document.querySelector(".form form") as HTMLFormElement;
  const formImageFileHTML = document.querySelector(".form form.ads-form__full-image-file") as HTMLFormElement;
  if (!formHTML) {
    console.log("Somewing that frong! Invalid form.")
    return false;
  } else{
    const formHTMLCopy = (formHTML as HTMLFormElement);
    formHTMLCopy.onclick = handlerForm
  }
  if (!formImageFileHTML) {
    console.log("Somewing that frong! Invalid form.")
    return false;
  } else{
    const formHTMLCopy = (formImageFileHTML as HTMLFormElement);
    formHTMLCopy.onclick = handlerSendImage
  }
  
  return true;
}
