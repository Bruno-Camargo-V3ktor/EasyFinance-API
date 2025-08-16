import { badRequest, notFound } from './http.js';

export const invalidAmountResponse = () => {
    return badRequest({
        message: 'The amount must be greater than 0.',
    });
};

export const invalidTypeResponse = () => {
    return badRequest({
        message: 'The type must be EARNING, EXPENSE or INVESTIMENT.',
    });
};

export const checkTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(type);
};

export const transactionNotFound = () => {
    return notFound({ message: 'Transaction not found' });
};
