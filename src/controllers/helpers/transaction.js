export const invalidAmountResponse = () => {};

export const invalidTypeResponse = () => {};

export const checkTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(type);
};
