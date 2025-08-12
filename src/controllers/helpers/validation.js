import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfIdIsValid = (id) => {
    return validator.isUUID(id);
};

export const invalidIdResponse = () => {
    return badRequest({ message: 'The provided id is not valid.' });
};

export const requiredFieldIsMissingResponse = (fieldName) => {
    return badRequest({
        message: `Missing param: ${fieldName}`,
    });
};

export const checkIfisString = (value) => typeof value === 'string';

export const validateRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldIsMissing = !params[field];
        const fieldIsEmpty =
            checkIfisString(params[field]) &&
            validator.isEmpty(params[field], { ignore_whitespace: false });

        if (fieldIsMissing || fieldIsEmpty) {
            return {
                missingField: field,
                ok: false,
            };
        }
    }

    return {
        missingField: undefined,
        ok: true,
    };
};
