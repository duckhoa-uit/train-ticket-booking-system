import type { ZodError } from "zod";

export type I18nRouteParam = {
  params: {
    lng: string;
  };
};

export interface ResponseFailure {
  error: ResponseError;
}

export type ApiResponse<T> = T | ResponseFailure;

export interface ResponseError {
  code?: number;
  message: string;
  errors?: ZodError;
  requestId?: string;
}
