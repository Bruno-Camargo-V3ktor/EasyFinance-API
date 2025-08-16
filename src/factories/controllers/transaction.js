import {
    CreateTransactionController,
    DeleteTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransactionController,
} from '../../controllers/index.js';

import {
    PostgresCreateTransactionRepository,
    PostgresDeleteTransaction,
    PostgresGetTransactionsByUserIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepositoy,
} from '../../repositories/postgres/index.js';
import {
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase,
} from '../../use-cases/index.js';

export const makeCreateTransactionController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const createTransactionRepository =
        new PostgresCreateTransactionRepository();
    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    );
    return createTransactionController;
};

export const makeGetTransactionsByUserIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const getTransactionsByUserIdRepository =
        new PostgresGetTransactionsByUserIdRepository();

    const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        getTransactionsByUserIdRepository,
        getUserByIdRepository,
    );

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);
    return getTransactionsByUserIdController;
};

export const makeUpdateTransactionController = () => {
    const updateTransactionRepositoy = new PostgresUpdateTransactionRepositoy();

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTransactionRepositoy,
    );

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    );

    return updateTransactionController;
};

export const makeDeleteTransactionController = () => {
    const deleteTransactionRepositoy = new PostgresDeleteTransaction();

    const deleteTransactionUseCase = new DeleteTransactionUseCase(
        deleteTransactionRepositoy,
    );

    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactionUseCase,
    );

    return deleteTransactionController;
};
