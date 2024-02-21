type ServiceResponseErrorType = 
'BAD_REQUEST' | 
'UNAUTHORIZED' | 
'NOT_FOUND' | 
'UNPROCESSABLE_CONTENT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType, 
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'CREATED', 
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;