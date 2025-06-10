	/**
 * src\adboard\scripts\services\taskGetErrorContent.ts
 */
import { asyncGetListenerEvent } from "src/scripts/handleRequsetReceiveAd";
import { handlerUserForm } from "@ADBoards-handlers/handlerFormUsers/handlerRegisterForm";
import { taskLogoutUser } from "@ADBoards/scripts/services/taskLogoutUser";
export function handlerLoginLogout(): void {
  if (window.location.pathname.includes("login") ||
  // LOGIN INTERFECE ADDING TO THE NAVBAR.
    window.location.pathname.includes('register')) {
    console.log("START REGISTER");
    asyncGetListenerEvent("keydown", handlerUserForm, undefined, "form-login");
  };
  // LOGOUT INTERFECE ADDEING TO THE NAVBAR.
  asyncGetListenerEvent("click", taskLogoutUser, undefined, "logout");
};

document.removeEventListener("DOMContentLoaded", () => handlerLoginLogout);
document.addEventListener("DOMContentLoaded", () => {
  console.log("START APP");
  handlerLoginLogout();
});
