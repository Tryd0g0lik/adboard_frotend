import taskAddButton from "../../services/tasksRemoveAds/taskAddButton";

let ButtonTimeOut: NodeJS.Timeout;

/**
 * When user clicks by checkbox, the button for removing an would be published
 * @param event 
 */
function handlerAddButtonRemoveAds(event: MouseEvent) {
  if (event.target instanceof HTMLInputElement && (event.target as HTMLInputElement).name === "remove") {
    if (ButtonTimeOut) {
      clearTimeout(ButtonTimeOut);
    }
    const buttonHtmlItem = document.createElement('button');
    ButtonTimeOut = setTimeout(() => taskAddButton(buttonHtmlItem), 500);
  };
};

export function handlerPressCheckboxRemoveAds() {
  try{
    const adsCollections = document.querySelector("#ads-collections");
    if (!adsCollections) {
      return;
    }
    // publish button after click by a checkbox/flag (button for the removing an one ad)
    adsCollections.removeEventListener("mousedown", (event) => handlerAddButtonRemoveAds(event as MouseEvent));
    adsCollections.addEventListener("mousedown", (event) => handlerAddButtonRemoveAds(event as MouseEvent));
  }catch (error) {
    throw new Error(`Error on the handlerPressCheckboxRemoveAds: ${error}`);
  } 
  
}

