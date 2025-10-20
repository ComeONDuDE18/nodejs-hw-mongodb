const parseContactType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isType = (type) => ['work', 'home', 'personal'].includes(type);
    if (isType(type)) return type;
};

const parseIsFavourite = (value) => {
    const isBoolean = typeof value === 'boolean';
    if (!isBoolean) return undefined;
    

    if (value === "true") {
        return { isFavourite: true };
    } else {
        return { isFavourite: false };
    }
};


export const parseFilterParams = (query) => {
    const { type, value } = query;

    const parsedContactType = parseContactType(type);
    const parsedIsFavourite = parseIsFavourite(value);

    return {
        type: parsedContactType,
        value: parsedIsFavourite,
    };
};