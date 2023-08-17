import { AxiosResponse } from "axios";
import { checkType } from "../system/Types";
import { AxiosInstance } from ".";

export type DefaultResponseDataType = Record<string, any>;

export interface RequestActions<T = DefaultResponseDataType> {
    overrideAxios?: AxiosInstance;
    onPreIntercept?: (config: CoreRequest) => CoreRequest;
    onPostIntercept?: (response: BaseResponse<T>) => BaseResponse<T>;
}

// request
export interface BaseRequest<T = DefaultResponseDataType> {
    path: string;
    headers?: Record<string, any>;
    datas?: Record<string, any>; // body
    params?: Record<string, any>; // get parameter
    actions?: RequestActions<T>;
}

export interface CoreRequest extends Partial<BaseRequest> {
    url: string;
    method: Method;
}
// end of request

// response
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export class BaseResponse<T = DefaultResponseDataType> {
    constructor(public native?: AxiosResponse, public content?: T) {}
}
export class SuccessResponse<T = DefaultResponseDataType> extends BaseResponse<T> {
    constructor(public native: AxiosResponse, public content: T) {
        super(native, content);
    }
}
export class ErrorResponse<T = DefaultResponseDataType> extends BaseResponse<T> {
    constructor(public detail: Error, public native?: AxiosResponse, public content?: T) {
        super(native, content);
    }
}
export class InterceptResponse<T = DefaultResponseDataType> extends BaseResponse<T> {
    constructor(public baseResponse: BaseResponse<T>) {
        super(baseResponse.native, baseResponse.content);
    }
}
// end of response

// method
export const METHOD_GET = "GET";
export const METHOD_POST = "POST";
export const METHOD_PUT = "PUT";
export const METHOD_PATCH = "PATCH";
export const METHOD_DELETE = "DELETE";
export const METHOD_CONNECT = "CONNECT";
export const METHOD_HEAD = "HEAD";
export const METHOD_OPTIONS = "OPTIONS";
export const METHOD_TRACE = "TRACE";

// export declare const MethodTypes: ReadonlyArray<METHOD_GET | METHOD_POST>;
export declare const MethodTypes: ReadonlyArray<
    | typeof METHOD_GET
    | typeof METHOD_POST
    | typeof METHOD_PUT
    | typeof METHOD_PATCH
    | typeof METHOD_DELETE
    | typeof METHOD_CONNECT
    | typeof METHOD_HEAD
    | typeof METHOD_OPTIONS
    | typeof METHOD_TRACE
>;
export type Method = (typeof MethodTypes)[number];
export declare function isMethod(): typeof checkType<Method>;
// end of method
