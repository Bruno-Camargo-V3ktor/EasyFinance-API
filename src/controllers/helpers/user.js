import { badRequest, notFound } from './http.js';
import validator from 'validator';

export const userNotFound = () => {
    return notFound({ message: 'User not found' });
};

export const invalidUserIdResponse = () => {
    return badRequest({ message: 'The provided id is not valid.' });
};

export const invalidPasswordResponse = () => {
    return badRequest({
        message: 'Password must be at least 6 characters',
    });
};

export const invalidEmailResponse = () => {
    return badRequest({
        message: 'Invalid e-mail. Please provide a valid one.',
    });
};

export const emailAlreadyInUseResponse = (msg) => {
    return badRequest({
        message: msg,
    });
};

export const checkIfPasswordIsValid = (password) => {
    return password.length >= 6;
};

export const checkIfEmailIsValid = (email) => {
    return validator.isEmail(email);
};

export const checkIfIdIsValid = (id) => {
    return validator.isUUID(id);
};
