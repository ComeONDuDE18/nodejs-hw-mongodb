const parseNumber = (value, defaultValue) => {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : defaultValue;
};


export const parsePaginationParams = (query) => {
    const { page, perPage } = query;

    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 10);

    return {
        page: parsedPage,
        perPage: parsedPerPage,
    };
};