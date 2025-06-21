/**
 * src/adboard/scripts/handlers/handlerLogout/handlerReRequestLogout.ts
 */
import { URL_HOST_FOR_API } from "@ENV";

export async function handlerRequestLogout() {
  await fetch(URL_HOST_FOR_API + "/api/v1/users/index/0/logout_user",
    {
      "method": "GET",
    }
  );

  window.location.href = "/users/login/";
}
