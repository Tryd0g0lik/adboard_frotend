/***
 * src\adboard\scripts\services\taskLogoutUser.ts
 */

import {handlerRequestLogout} from "@ADBoards-handlers/handlerLogout/handlerReRequestLogout";
import {handlerButtonUserLogout} from "@ADBoards-handlers/handlerLogout/handlerbuttonLogout";

export const taskLogoutUser = async (event: MouseEvent): Promise<void> => {
  const resultBoolean = handlerButtonUserLogout(event);
  if (!resultBoolean) {
    return;
  }
  await handlerRequestLogout();
}; 
