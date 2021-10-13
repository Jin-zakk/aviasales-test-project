import User, { IUserModel } from './user.model';

export class UserService {
  create() {
    return User.create({ email: null, shared: false });
  }

  change({ email, shared, id }: IUserModel) {
    return User.update({ email, shared }, { where: { id } });
  }
}
