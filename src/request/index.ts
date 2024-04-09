import { AxiosDefaults, AxiosHeaderValue, AxiosInstance, AxiosStatic, HeadersDefaults } from "axios";

import { defaultAxios } from "../index";

export type AxiosCore = AxiosStatic;

export type AxiosCoreDefaults = Omit<AxiosDefaults, "headers"> & {
    headers: HeadersDefaults & {
        [key: string]: AxiosHeaderValue;
    };
};

export const setRequestConfig = (initial: (core: AxiosInstance) => void) => {
    initial(defaultAxios);
};

export const setRequestDefaultsConfig = (initial: (coreDefaults: AxiosCoreDefaults) => void) => {
    initial(defaultAxios.defaults);
};

export const setRequestConfigs = (initial: (core: AxiosInstance, coreDefaults: AxiosCoreDefaults) => void) => {
    initial(defaultAxios, defaultAxios.defaults);
};
