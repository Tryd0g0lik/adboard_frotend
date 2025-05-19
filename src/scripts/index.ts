import { formPage } from "./handlers/HandlerFormAd";
import publicAllAd from "src/scripts/services/taskPublicAllAd";
// LISTENER CLICK BY FORM's SUBMIT BUTTOM
document.removeEventListener("DOMContentLoaded", () => {
   formPage();
  // publicAllAd - public all ads in HTML
  Promise.allSettled([publicAllAd()]);
   });
document.addEventListener("DOMContentLoaded", () => {
   formPage();
  // publicAllAd - public all ads in HTML
  Promise.allSettled([publicAllAd()]);
   });
