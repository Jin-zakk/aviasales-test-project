import { check } from 'express-validator';

export default [
  check('email').isEmail().optional({ nullable: true }),
  check('shared').isBoolean(),
  check('id').isNumeric(),
];
