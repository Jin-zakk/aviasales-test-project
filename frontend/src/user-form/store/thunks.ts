import { batch } from 'react-redux';
import api from '../../api';
import { Dispatch, GetState } from '../../store';
import selectors from './selectors';
import { actions, IUserState } from './slice';

const LOCALSTORAGE_USER = 'user';

function setLocalStorage(user: IUserState) {
  localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(user));
}

/**
 * Загружает данные (из localStorage или из базы данных)
 * На основе этих данных создается юзер.
 */
function loadData() {
  return async (dispatch: Dispatch): Promise<void> => {
    const jsonUser = localStorage.getItem(LOCALSTORAGE_USER);

    if (jsonUser) {
      dispatch(actions.createUser(JSON.parse(jsonUser)));
    } else {
      const user = await api.createUser();
      if (user) {
        dispatch(actions.createUser(user));
        setLocalStorage(user);
      }
    }
  };
}

function setUser() {
  return async (dispatch: Dispatch, getState: GetState): Promise<void> => {
    const user = selectors.user(getState());
    setLocalStorage(user);
    await api.changeUser(user);
  };
}

function changeShared(value: boolean) {
  return async (dispatch: Dispatch): Promise<void> => {
    batch(() => {
      dispatch(actions.changeShared(value));
      dispatch(setUser());
    });
  };
}

function changeEmail(value: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    const isValid = /^\S+@\S+\.\S+$/.test(value);

    if (isValid) {
      batch(() => {
        dispatch(actions.changeEmail(value));
        dispatch(setUser());
      });
    }
  };
}

export default {
  loadData,
  changeShared,
  changeEmail,
};
