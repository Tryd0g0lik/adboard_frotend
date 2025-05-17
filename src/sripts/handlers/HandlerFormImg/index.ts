const URL_HOST_FOR_API = process.env.URL_HOST_FOR_API || "localhost";
export const handlerSendImage = async (event: MouseEvent): Promise<boolean> =>{
  
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
    const response = await fetch(`${URL_HOST_FOR_API}/api/v1/image/`,
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
    console.log(`Request of FIleImage to server Error => ${error}`);
    return false;
  }
  return true;
}
