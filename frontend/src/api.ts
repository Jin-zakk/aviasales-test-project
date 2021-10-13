import { IUserState } from './user-form/store/slice';

type ResponsePayload<T> = {
  payload: T;
  error?: string;
};

/**
 * Common функция, отправляющая запросы на бекенд с обработкой ошибок
 */
const send = async <T>(
  url: string,
  method: string,
  body?: unknown
): Promise<T | undefined> => {
  try {
    const response = await fetch(`http://localhost:9000/api/${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result: ResponsePayload<T> = await response.json();

    if (result.error) {
      /** абстрактная обработка ОШИБОК бекенда */
      console.error(result.error);
    } else {
      return result.payload;
    }
  } catch (error) {
    /** абстрактная обработка ИСКЛЮЧЕНИЙ бекенда */
    console.error(error);
  }
};

const createUser = async (): Promise<IUserState | undefined> => {
  return await send<IUserState>('user', 'post');
};

const changeUser = async (
  data: IUserState
): Promise<IUserState | undefined> => {
  return await send<IUserState>('user', 'put', data);
};

export default {
  createUser,
  changeUser,
};
