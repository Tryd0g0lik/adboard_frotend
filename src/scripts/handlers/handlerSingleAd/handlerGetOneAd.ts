/**
 * src\scripts\handlers\handlerSingleAd\handlerGetOneAd.ts
 */
import type { AdLine } from "src/interfaces";

/**
 * @param: pathname string. This is the path of api.  Exemple - '/api/ad/one/'.
 * @param index type stryng. This is the indes of the ad. It is an one data line from server.
 * @returns json data (`{ data: AdLine[] `)
 */
export async function asyncHandlerRequestGetOneAd(pathname: string, index: string): Promise<{ data: AdLine[] } | void> {
  try {
    const response = await fetch(`${pathname}${index}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      console.error(`The 'error' of GET: ${response.statusText}`);
      return;
    }
    const data = await response.json() as string;
    const dataJson = JSON.parse(data) as { data: AdLine[] };
    return dataJson;
  } catch (err) {
    console.error(new Error("The 'index' ERROR: " + err));
  }
  return;
} 
