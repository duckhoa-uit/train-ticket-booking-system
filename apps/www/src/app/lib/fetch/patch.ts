/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiResponse } from "@/types/base";

import { uuidv4 } from "../helpers";
import {
  constructHeaders,
  handleError,
  handleResponse,
  handleResponseError,
} from "./base";

export async function patch<T = any>(
  url: string,
  data: { [prop: string]: any },
  options?: { [prop: string]: any },
): Promise<ApiResponse<T>> {
  const requestId = uuidv4();
  try {
    const { headers: optionHeaders, ...otherOptions } = options ?? {};
    const headers = await constructHeaders(requestId, optionHeaders);
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
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
