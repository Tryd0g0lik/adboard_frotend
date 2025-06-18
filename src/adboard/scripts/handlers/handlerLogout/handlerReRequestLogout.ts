/**
 * src/adboard/scripts/handlers/handlerLogout/handlerReRequestLogout.ts
 */
import { URL_HOST_FOR_API } from "@ENV";

export async function handlerRequestLogout() {
  const response = await fetch(URL_HOST_FOR_API + "/api/v1/users/index/0/logout_user",
    {
      "method": "GET",
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  };
  window.location.href = "/users/login/";
}
