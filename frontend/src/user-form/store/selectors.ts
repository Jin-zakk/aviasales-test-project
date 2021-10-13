import { IState } from '../../store';
import { IUserState } from './slice';

const shared = (state: IState): boolean => state.user.shared;

const email = (state: IState): string => state.user.email || '';

const isEmailed = (state: IState): boolean => !!email(state);

const user = (state: IState): IUserState => state.user;

const isShowFinal = (state: IState): boolean =>
  shared(state) && isEmailed(state);

export default {
  shared,
  email,
  user,
  isEmailed,
  isShowFinal,
};
