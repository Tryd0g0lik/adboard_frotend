/**
 * src\ads\scripts\handlers\handlerDeleteLineOfAdsCollection\handlerEventRemove.ts
 */

import taskGetFlagId from "@ADS/scripts/services/tasksRemoveAds/getFlagId";
import { URL_HOST_FOR_API } from "@ENV";
import { CookieUser } from "src/scripts/cookies/getCookie";


/**
 * This  function is called when the user clicks on the button to remove the Ad of the collection
 * 
 * @param item HTMLElement
 */
export function handlerButtonClickEventRemove(item: HTMLButtonElement) {
  try{
    const arrayOfIndexes = [];
    item.onclick = async () => {
      const arrayChoiseCheckbox = taskGetFlagId();
      // REQUEST GET COLLECTION ADS
      const url = new URL(`${URL_HOST_FOR_API}/api/v1/ads/remove/0/`);
      url.searchParams.set('data', JSON.stringify(arrayChoiseCheckbox));

      // GET CSRF TOKEN FROM THE COOKIE - CACHE
      let csrftoken = "";
      try {
        const cookie = new CookieUser();
        const cookieCSRF = cookie.getOneCookie("csrftoken");
        if (cookieCSRF) {
          csrftoken += cookieCSRF;
        }

      } catch (error) {
        // IF TH CSRF TOKEN  IS NOT FOUNT IN THE COOKIE
        if (error instanceof DOMException) {
          console.error("[handlerButtonClickEventRemove]: The CSRF token is not found!");
          return;
        }
      }
      // REQUEST TO THE SERVER
      const response = await fetch(url,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken
          }
        }
      );
      if (!response.ok) {
        console.error("The Ads downloads data invalid!");
        return;
      }
      // RESEIVING RESPONS
      // fetch("/ads", {}
    };
  } catch (event){
    null;
  }

}

