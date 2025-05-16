const handlerForm = async (event: MouseEvent): Promise<boolean>   => {
  event.stopPropagation();
  
  // GET SUBMIT HTML
  if (event.type.toLowerCase() !== "submit") {
    return false;
  }
  event.preventDefault();
  // GET FORM HTML
  const currenttarget = event.currentTarget;
  if (currenttarget && (currenttarget as HTMLFormElement).tagName.toLowerCase() !== "form") {
    return false;
  }
  try{
    const response = await fetch("api/v1/ads/",
      {
        method: "POST",
        body: new FormData(currenttarget as HTMLFormElement),
      }
    );
    if (!response.ok){
      return false;
    }
    // const body = await response.json();
    
  } catch (error : ErrorEvent| unknown){
    console.log(`Request to server Error => ${error}`);
    return false;
  }
    return true;
};

function formPage(): boolean{
  const formHTMLArr = document.getElementsByClassName("form") as HTMLCollectionOf<HTMLFormElement>;
  if (formHTMLArr.length === 0){
    console.log("Somewing that frong! Invalid form.")
    return false;
  }
  const formHTML = (formHTMLArr as HTMLCollectionOf<HTMLFormElement>)[0] ;
  formHTML.onclick = handlerForm
  return true;
}
// LISTENER CLICK BY FORM's SUBMIT BUTTOM
document.removeEventListener("DOMContentLoaded", () => { formPage(); });
document.addEventListener("DOMContentLoaded", () => { formPage(); });
