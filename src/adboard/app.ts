	/**
 * src\scripts\index.ts
 */
import { asyncGetListenerEvent } from "src/scripts/handleRequsetReceiveAd";
import { handlerUserForm } from "@ADBoards-handlers/handlerFormUsers/handlerRegisterForm";

function handlerCommmon(): void {
  if (window.location.pathname.includes("login") ||
    window.location.pathname.includes('register')) {
    console.log("START REGISTER");
    asyncGetListenerEvent("keydown", handlerUserForm, undefined, "form-login");
  };
};

document.removeEventListener("DOMContentLoaded", () => handlerCommmon);
document.addEventListener("DOMContentLoaded", () => {
  console.log("START APP");
  handlerCommmon();
});
