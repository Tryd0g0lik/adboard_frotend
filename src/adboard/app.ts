	/**
 * src\adboard\scripts\services\taskGetErrorContent.ts
 */
import { handlerLoginLogout } from "@ADBoards-handlers/loginLogout";

document.removeEventListener("DOMContentLoaded", () => handlerLoginLogout);
document.addEventListener("DOMContentLoaded", () => {
  console.log("START APP");
  handlerLoginLogout();
});
