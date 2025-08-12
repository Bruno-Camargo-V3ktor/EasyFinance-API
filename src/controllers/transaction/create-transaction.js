import {
    checkIfIdIsValid,
    checkTypeIsValid,
    created,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    requiredFieldIsMissingResponse,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js';

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                'user_id',
                'name',
                'date',
                'amount',
                'type',
            ];

            const requiredFieldsValidate = validateRequiredFields(
                params,
                requiredFields,
            );
            if (!requiredFieldsValidate.ok) {
                return requiredFieldIsMissingResponse(
                    requiredFieldsValidate.missingField,
                );
            }

            const userIdIsValid = checkIfIdIsValid(params.user_id);
            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            if (params.amount <= 0) {
                return invalidAmountResponse();
            }

            const type = params.type.trim().toUpperCase();
            const typeIsValid = checkTypeIsValid(type);
            if (!typeIsValid) {
                return invalidTypeResponse();
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            });

            return created(transaction);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
