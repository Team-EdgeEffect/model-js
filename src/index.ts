import _axios from "axios";

export * from "./request/Model";
export * from "./request/ModelUtils";
export * from "./request/Interfaces";
export * from "./request";
export * from "./system/Types";
export * from "./system/ModelJsConfig";
export * from "./utils/Utils";
export * from "./utils/MimeTypes";

export const axios = _axios;
export const defaultAxios = axios.create();
