import { HttpStatusCode } from "axios";
import { BaseResponse, ErrorResponse, SuccessResponse } from "./Interfaces";

export const isResponseSuccess = (object: any, exclusiveList?: Array<HttpStatusCode> | HttpStatusCode): object is SuccessResponse => {
    if (object instanceof SuccessResponse) {
        if (exclusiveList) {
            if (Array.isArray(exclusiveList)) {
                return exclusiveList.some((httpStatusCode) => {
                    return object.native.status !== httpStatusCode;
                });
            } else {
                return object.native.status !== exclusiveList;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
};

export const isResponseError = (object: any, exclusiveList?: Array<HttpStatusCode> | HttpStatusCode): object is ErrorResponse => {
    if (object instanceof ErrorResponse) {
        if (exclusiveList) {
            if (Array.isArray(exclusiveList)) {
                return exclusiveList.some((httpStatusCode) => {
                    return object.native?.status !== httpStatusCode;
                });
            } else {
                return object.native?.status !== exclusiveList;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
};

export const isResponse = (object: any, httpStatusCodeList: Array<HttpStatusCode> | HttpStatusCode): object is BaseResponse => {
    if (object instanceof BaseResponse) {
        if (Array.isArray(httpStatusCodeList)) {
            return (
                httpStatusCodeList.findIndex((httpStatusCode) => {
                    return object.native?.status === httpStatusCode;
                }) >= 0
            );
        } else {
            return object.native?.status === httpStatusCodeList;
        }
    } else {
        return false;
    }
};

export const isResponseExclusive = (object: any, httpStatusCodeList: Array<HttpStatusCode> | HttpStatusCode): object is BaseResponse => {
    if (object instanceof BaseResponse) {
        if (Array.isArray(httpStatusCodeList)) {
            return httpStatusCodeList.some((httpStatusCode) => {
                return object.native?.status !== httpStatusCode;
            });
        } else {
            return object.native?.status !== httpStatusCodeList;
        }
    } else {
        return false;
    }
};
