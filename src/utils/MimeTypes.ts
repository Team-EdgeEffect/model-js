// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
export interface MimeType {
    type: string;
    subType: string;
}

export const MimeTypeApplicationJson: MimeType = { type: "application", subType: "json" };
export const MimeTypeImage: MimeType = { type: "image", subType: "*" };
export const MimeTypeImagePng: MimeType = { type: "image", subType: "png" };
export const MimeTypeImageJpeg: MimeType = { type: "image", subType: "png" };
// @TODO anothers

export const getMimeType = (file: File) => {
    const mimeTypeInfo: Array<string> = file.type.split("/");
    const mimeType: MimeType = {
        type: mimeTypeInfo[0],
        subType: mimeTypeInfo[1],
    };
    return mimeType;
};

export const mimeTypeToString = (mimeType: MimeType): string => {
    return `${mimeType.type}/${mimeType.subType}`;
};
