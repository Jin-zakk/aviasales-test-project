import { Router } from 'express';
import { matchedData } from 'express-validator';
import { validationResult } from 'express-validator';
import { UserService } from './user.service';
import { IUserModel } from './user.model';
import userRules from './user.rules';

const userRouter = Router();
const userService = new UserService();

userRouter.post('/user', async (req, res) => {
  const user = await userService.create();
  return res.json({ payload: user });
});

userRouter.put('/user', userRules, async (req: any, res: any) => {
  const error = validationResult(req);

  if (!error.isEmpty()) return res.json({ error: error.array() });

  const payload = matchedData(req) as IUserModel;
  const user = await userService.change(payload);

  return res.json({ payload: user });
});

export default userRouter;
