/**
 * src\adboard\scripts\handlers\handlerFormUsers\handlerRegisterForm.ts
 */
import getErrorContent from "src/adboard/scripts/services/taskGetErrorContent";
import { validateMaxLength, validateMinLength } from "src/scripts/validators/validateLength";
import { validateRegex } from "src/scripts/validators/validateRegex";
import { URL_HOST_FOR_API } from "@ENV";
import { setSessionIdInCookie } from "src/scripts/cookies/setCookies";


/***
 * Function that handle user's forms. It is the registration form and login form.
 * @param: event: KeyboardEvent ('to the 'Enter'keydown')
 */
export async function handlerUserForm(event:KeyboardEvent): Promise<void> {
  console.log('REGISTER FORM');
  if (!event.key  || (event.key && event.key.toLowerCase() !== "enter")){
    return;
  };
  const pathname = location.pathname;
  // GET DATA FROM FORM
  const body_ = {} as {[key: string]: string| FormData};
  // body_.method = "GET";
  const currentTarget = event.currentTarget as HTMLElement;
  const formHtml = currentTarget.querySelector("form") as HTMLElement;
  const form = new FormData(formHtml as HTMLFormElement);
  
  // PREVENT DEFAULT
  event.preventDefault();
  event.stopPropagation();

  // SEND DATA TO API
  body_.method = "POST";
  body_.body = form as FormData;
  // CHECK VALIDITY USERNAME
  const title = (form.get('username') as string).trim();
  const regexUsername = /(^[a-zA-Z][a-zA-Z_0-9]{2,29}$|^$)/;
  const regexEmail = /(^[a-zA-Z0-9]{3,50}@{1}[a-zA-Z]{2,30}\.[a-zA-Z]{2,5}$|^$)/;
  (currentTarget as HTMLElement).querySelector(".invalid")?.remove();
  try {
    // VALIDATE TITLE AD
    await Promise.all([
      validateMinLength(title as string, 3),
      validateMaxLength(title as string, 30),
      validateRegex(title as string, regexUsername),
    ]);

  } catch (err: unknown | Error) {
    const fieldHTML = ((currentTarget as HTMLElement).querySelector('input[name="username"]')) as HTMLElement;
    getErrorContent(fieldHTML as HTMLElement, err as Error);
    return;
  };
  const email = form.get('email');
  if (email && (email as string).includes("@") || (typeof form.get('email')).includes("string") && (form.get('email') as string).length == 0) {
    try {
      // VALIDATE EMAIL
      const email = (form.get('email') as string).trim();
      await Promise.all([
        validateMinLength(email as string, 3),
        validateMaxLength(email as string, 50),
        validateRegex(email as string, regexEmail),
      ]);

    } catch (err: unknown | Error) {
      const fieldHTML = ((currentTarget as HTMLElement).querySelector('input[name="email"]')) as HTMLElement;
      getErrorContent(fieldHTML as HTMLElement, err as Error);
      return;
    }
  };

  // CHECK VALIDITY PASSWORD
  const password = ((form.get('password') as string) as string);
  const regexPassword = /(^[a-zA-Z%0-9{_%]{2,29}$|^$)/;
  const confirmPassword = ((form.get('confirm_password') as string) as string);

  try {
    // VALIDATE TITLE AD
    await Promise.all([
      validateMinLength(title as string, 3),
      validateMaxLength(title as string, 30),
      validateRegex(password as string, regexPassword),
    ]);

  } catch (err: unknown | Error) {
    const fieldHTML = ((currentTarget as HTMLElement).querySelector('input[name="password"]')) as HTMLElement;
    getErrorContent(fieldHTML as HTMLElement, err as Error);
    return;
  }
  if (confirmPassword || (typeof form.get('confirm_password')).includes("string") && (form.get('confirm_password') as string).length == 0) {
    // CHECK VALIDITY CONFIRM PASSWORD ;
    if (confirmPassword.trim() !== password.trim()) {
      const fieldHTML = ((currentTarget as HTMLElement).querySelector('input[name="confirm_password"]')) as HTMLElement;
      const err = new Error("err: Check the passwords.");
      getErrorContent(fieldHTML as HTMLElement, err as Error);
      return;
    }
  }

  // REGISTER USER
  const templeteApi = (pathname.includes("login")) ? "/api/v1/users/index/0/login_user/" : '/api/v1/users/index/';
  // REGISTER USER
  const url = new URL(templeteApi, URL_HOST_FOR_API);
  try {
    const response = await fetch(url, body_);
    if (!response.ok || response.status > 201) {
      console.warn(`User form invalid: ${response.statusText}`);
      return;
    }
    const data = await response.json(); 
    // CHANGE LOCATION
    if (pathname.includes("register")) {
      setTimeout(() => window.location.pathname = "/users/login/", 200);
    } else {
      type Data = { string: string | number }[];
      Array.from(
        data["data"] as Data
      ).forEach(elementtoken => {
        // console.log(`data ${elementtoken}: `, data[elementtoken]);
        if (Object.keys(elementtoken).includes("token_access")) {
          const k = "token_access";
          const v = Object(elementtoken)[k] as string;
          const keyLifeTime = Object.keys(elementtoken)[1];
          const liveTime = Math.round(
            parseFloat(Object(elementtoken)[keyLifeTime])
          );
          setSessionIdInCookie(k, v, String(liveTime));
        } else {
          const k = "token_refresh";
          const v: string = Object(elementtoken)[k] as string;
          const keyLifeTime = Object.keys(elementtoken)[1];
          const liveTime = Math.round(
            Object(elementtoken)[keyLifeTime]
          );
          setSessionIdInCookie(k, v, String(liveTime));
          window.location.pathname = "/";
        }
      });
    }
  } 
  catch (error: unknown | Error) {
    console.error("USER FORM ERROR: ", (error as Error).message);
    throw new Error(`USER FORM ERROR: ${error}`);
  }
};
