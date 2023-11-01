interface ObjectKeysArgs {
    data: Record<string, any>;
    onFoundKey: (key: string, data: any) => void;
    onCreateKey?: (key: string, parentKey?: string) => string;
    checkIteratable?: (data: any) => boolean;
    parentKey?: string; // 재귀시에 사용됨
}

export const objectKeys = ({ data, onFoundKey, onCreateKey, checkIteratable, parentKey }: ObjectKeysArgs): void => {
    const canIteratable: boolean = checkIteratable ? checkIteratable(data) : typeof data === "object";
    if (canIteratable) {
        Object.keys(data).forEach((key) => {
            const createdKey = onCreateKey ? onCreateKey(key, parentKey) : parentKey ? `${parentKey}.${key}` : key;
            objectKeys({
                data: data[key],
                onFoundKey,
                onCreateKey,
                checkIteratable,
                parentKey: createdKey,
            });
        });
    } else {
        onFoundKey && onFoundKey(parentKey!, data);
    }
};
