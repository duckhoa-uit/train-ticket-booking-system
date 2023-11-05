export type I18nRouteParam = {
  params: {
    lng: string;
  };
};

export interface User {
  id: number;
  mobile: string | null;
  primary_email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_alpha_user: boolean;
  free_project_limit: number;
}

export interface ResponseFailure {
  error: ResponseError;
}

export type ApiResponse<T> = T | ResponseFailure;

export interface ResponseError {
  code?: number;
  message: string;
  requestId?: string;
}
