const handlerForm = async (event: MouseEvent): Promise<boolean>   => {
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
  type DataForm = { [key: string]: string };
  const dataObj = new FormData();
  dataObj.append('title', dataF0rm.get('title')?.toString() as string);
  dataObj.append("description", dataF0rm.get('description')?.toString() as string);
  dataObj.append("category", dataF0rm.get('category')?.toString() as string);
  dataObj.append("files", dataF0rm.get('files')?.toString() as string);
  dataObj.append("path", dataF0rm.get('path')?.toString() as string);

  try{
    const response = await fetch("http://127.0.0.1:8000/api/v1/ads/",
      {
        method: "POST",
        body: dataF0rm
      }
    );
    if (!response.ok){
      return false;
    }
    const body = await response.json();
    console.log(`SERVER: ${body}`);
    
  } catch (error : ErrorEvent| unknown){
    console.log(`Request to server Error => ${error}`);
    return false;
  }
    return true;
};

function formPage(): boolean{
  const formHTML = document.querySelector(".form form") as HTMLFormElement;
  if (!formHTML) {
    console.log("Somewing that frong! Invalid form.")
    return false;
  }
  const formHTMLCopy = (formHTML as HTMLFormElement);
  formHTMLCopy.onclick = handlerForm
  return true;
}
// LISTENER CLICK BY FORM's SUBMIT BUTTOM
document.removeEventListener("DOMContentLoaded", () => { formPage(); });
document.addEventListener("DOMContentLoaded", () => { formPage(); });
