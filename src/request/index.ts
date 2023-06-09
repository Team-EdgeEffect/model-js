import * as AxiosExports from "axios";
import { defaultAxios } from "../index";

export type AxiosCore = AxiosExports.AxiosStatic;

export type AxiosCoreDefaults = Omit<AxiosExports.AxiosDefaults<any>, "headers"> & {
    headers: AxiosExports.HeadersDefaults & {
        [key: string]: string | string[] | number | boolean | null;
    };
};

export type AxiosInstance = AxiosExports.AxiosInstance;

export const setRequestConfig = (initial: (core: AxiosInstance) => void) => {
    initial(defaultAxios);
};

export const setRequestDefaultsConfig = (initial: (coreDefaults: AxiosCoreDefaults) => void) => {
    initial(defaultAxios.defaults);
};

export const setRequestConfigs = (initial: (core: AxiosInstance, coreDefaults: AxiosCoreDefaults) => void) => {
    initial(defaultAxios, defaultAxios.defaults);
};

let enableRequestLogging = false;
export const isEnableRequestLogging = () => {
    return enableRequestLogging;
};
export const setRequestLogging = (isEnable: boolean) => {
    enableRequestLogging = isEnable;
};

// @TODO refresh token etc...

// type OnRequestRequireLogin = () => boolean;
// const requestRequireLoginListeners: Array<OnRequestRequireLogin> = new Array<OnRequestRequireLogin>();
// export const addOnRequestRequireLoginListener = (onRequestRequireLogin: OnRequestRequireLogin) => {
//     requestRequireLoginListeners.push(onRequestRequireLogin);
// };
// export const removeOnRequestRequireLoginListener = (onRequestRequireLogin: OnRequestRequireLogin) => {
//     requestRequireLoginListeners.filter((l) => {
//         return l !== onRequestRequireLogin;
//     });
// };

// type OnTokenRefresh = () => boolean;
// const tokenRefreshListeners: Array<OnTokenRefresh> = new Array<OnTokenRefresh>();
// export const addOnTokenRefreshListener = (onTokenRefresh: OnTokenRefresh) => {
//     tokenRefreshListeners.push(onTokenRefresh);
// };
// export const removeOnTokenRefreshListener = (onTokenRefresh: OnTokenRefresh) => {
//     tokenRefreshListeners.filter((l) => {
//         return l !== onTokenRefresh;
//     });
// };

// type OnRequestPermissionDenied = () => boolean;
// const requestPermissionDeniedListeners: Array<OnRequestPermissionDenied> = new Array<OnRequestPermissionDenied>();
// export const addOnRequestPermissionDeniedListener = (onRequestPermissionDenied: OnRequestPermissionDenied) => {
//     requestPermissionDeniedListeners.push(onRequestPermissionDenied);
// };
// export const removeOnRequestPermissionDeniedListener = (onRequestPermissionDenied: OnRequestPermissionDenied) => {
//     requestPermissionDeniedListeners.filter((l) => {
//         return l !== onRequestPermissionDenied;
//     });
// };
