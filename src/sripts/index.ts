import { formPage } from "./handlers/HandlerFormAd";
// LISTENER CLICK BY FORM's SUBMIT BUTTOM
document.removeEventListener("DOMContentLoaded", () => { formPage(); });
document.addEventListener("DOMContentLoaded", () => { formPage(); });
