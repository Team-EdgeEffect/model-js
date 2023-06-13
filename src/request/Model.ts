import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { defaultAxios } from "../index";
import { isEnableRequestLogging } from ".";
import {
    BaseRequest,
    BaseResponse,
    CoreRequest,
    DefaultResponseDataType,
    ErrorResponse,
    METHOD_DELETE,
    METHOD_GET,
    METHOD_POST,
    METHOD_PUT,
    RequestActions,
    SuccessResponse,
} from "./Interfaces";
import { objectKeys } from "../utils/Utils";

// base model types
export interface ModelConstructor {
    new (): Model;
}

// export type Response<T = DefaultResponseDataType> = SuccessResponse<T> | ErrorResponse<T>;
export type Response<T = DefaultResponseDataType> = BaseResponse<T>;
// end of base model types

export abstract class Model {
    protected abstract getDomain(): string;

    protected createRequestHeaders(): Record<string, string> {
        return {};
    }

    protected createRequestConfig(): AxiosRequestConfig {
        return {};
    }

    protected onBuildKeyFormat(parent_key: string, key: string): string {
        return `${parent_key}.${key}`;
    }

    protected get<T = DefaultResponseDataType>(request: BaseRequest, actions?: RequestActions<T>): Promise<Response<T>> {
        return this.request(
            {
                url: `${this.getDomain()}/${request.path}`,
                ...request,
                method: METHOD_GET,
            },
            actions
        );
    }

    protected post<T = DefaultResponseDataType>(request: BaseRequest, actions?: RequestActions<T>): Promise<Response<T>> {
        return this.request(
            {
                url: `${this.getDomain()}/${request.path}`,
                ...request,
                method: METHOD_POST,
            },
            actions
        );
    }

    protected delete<T = DefaultResponseDataType>(request: BaseRequest, actions?: RequestActions<T>): Promise<Response<T>> {
        return this.request(
            {
                url: `${this.getDomain()}/${request.path}`,
                ...request,
                method: METHOD_DELETE,
            },
            actions
        );
    }

    protected put<T = DefaultResponseDataType>(request: BaseRequest, actions?: RequestActions<T>): Promise<Response<T>> {
        return this.request(
            {
                url: `${this.getDomain()}/${request.path}`,
                ...request,
                method: METHOD_PUT,
            },
            actions
        );
    }

    protected custom<T = DefaultResponseDataType>(request: CoreRequest, actions?: RequestActions<T>): Promise<Response<T>> {
        return this.request(request, actions);
    }

    private async request<T = DefaultResponseDataType>(request: CoreRequest, actions?: RequestActions<T>): Promise<Response<T>> {
        request = actions?.onPreIntercept ? actions.onPreIntercept(request) : request;

        const headers = {
            ...this.createRequestHeaders(),
            ...request.headers,
        };

        let response: BaseResponse<T> | null = null;
        try {
            const requestConfig: AxiosRequestConfig = {
                url: request.url,
                method: request.method,
                headers: headers,
                data: this.buildData(headers["Content-Type"], request.datas),
                params: request.params,
                ...this.createRequestConfig(),
            };

            let axiosResponse: AxiosResponse | null = null;
            if (actions?.overrideAxios) {
                axiosResponse = await actions.overrideAxios.request(requestConfig);
            } else {
                axiosResponse = await defaultAxios(requestConfig);
            }

            if (!axiosResponse) {
                throw "exception raised during request.";
            } else {
                response = new SuccessResponse(axiosResponse, axiosResponse.data);
            }
        } catch (error) {
            isEnableRequestLogging() && console.error(error);
            if (axios.isAxiosError(error)) {
                response = new ErrorResponse(error, error?.response, error?.response?.data);
            } else {
                response = new ErrorResponse(error, null, null);
            }
        }

        if (actions?.onPostIntercept) {
            response = actions.onPostIntercept(response);
        } else {
            response = this.onResponse<T>(response);
        }

        return response;
    }

    protected onResponse<T = DefaultResponseDataType>(response: BaseResponse<T>) {
        return response;
    }

    protected buildData(contentType: string, data?: Record<string, any>): Record<string, any> | FormData | string | null {
        if (!data) return null;

        if (contentType === "multipart/form-data") {
            const formData = new FormData();
            objectKeys({
                data,
                checkIteratable: (data) => {
                    return data.constructor === Object;
                },
                onFoundKey: (key, data) => {
                    formData.append(key, data);
                },
            });
            return formData;
        } else if (contentType === "application/x-www-form-urlencoded") {
            const tempObject: Record<string, string> = {};
            objectKeys({
                data,
                onFoundKey: (key, data) => {
                    if (typeof data === "string") {
                        tempObject[key] = data;
                    }
                },
            });
            return new URLSearchParams(tempObject).toString();
        } else if (contentType === "application/json") {
            return data;
        } else {
            // @TODO not implemented yet another contentType
            return data;
        }
    }
}

export default Model;
