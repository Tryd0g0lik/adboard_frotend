/**
 * src\scripts\handlers\handlerFormUsers\handlerRegisterForm.ts
 */
const URL_HOST_FOR_API = process.env.URL_HOST_FOR_API || "localhost";

/***
 * Function that handle user's forms. It is the registration form and login form.
 * @param: event: KeyboardEvent ('to the 'Enter'keydown')
 */
export async function handlerUserForm(event:KeyboardEvent): Promise<void> {
  if (!event.key  || (event.key && event.key.toLowerCase() !== "enter")){
    return;
  };
  const pathname = location.pathname;
  // GET DATA FROM FORM
  const body_ = {} as {[key: string]: string| FormData};
  body_.method = "GET";
  const currentTarget = event.currentTarget as HTMLElement;
  const formHtml = currentTarget.querySelector("form") as HTMLElement;
  const form = new FormData(formHtml as HTMLFormElement);
  
  // PREVENT DEFAULT
  event.preventDefault();
  event.stopPropagation();

  // SEND DATA TO API
  if (pathname.includes("register")) {
    body_.method = "POST";
    body_.body = form as FormData;
  }
  // REGISTER USER
  const url = new URL('/api/v2/users/', URL_HOST_FOR_API);
  try {
    const response = await fetch(url, body_);
    if (!response.ok || response.status > 201) {
      console.warn(`User form invalid: ${response.statusText}`);
      return;
    }
    // CHANGE LOCATION
    if (pathname.includes("register")) {
      setTimeout(() => window.location.pathname = "/users/login/", 200);
    };
  } 
  catch (error: unknown | Error) {
    console.error("USER FORM ERROR: ", (error as Error).message);
    throw new Error(`USER FORM ERROR: ${error}`);
  }
};
