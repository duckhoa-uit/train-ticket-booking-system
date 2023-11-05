import { uuidv4 } from "@/lib/helpers";
import type { ApiResponse } from "@/types/base";

import { constructHeaders, handleError, handleResponse, handleResponseError } from "./base";

export async function put<T = any>(
  url: string,
  data: { [prop: string]: any },
  options?: { [prop: string]: any }
): Promise<ApiResponse<T>> {
  const requestId = uuidv4();
  try {
    const { headers: optionHeaders, ...otherOptions } = options ?? {};
    const headers = await constructHeaders(requestId, optionHeaders);
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      credentials: "include",
      referrerPolicy: "no-referrer-when-downgrade",
      headers,
      ...otherOptions,
    });

    if (!response.ok) return handleResponseError(response, requestId);
    return handleResponse(response, requestId);
  } catch (error) {
    return handleError(error, requestId);
  }
}
