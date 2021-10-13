require('dotenv').config();
import express from 'express';
import cors from 'cors';
import sequelize from './database';
import userRouter from './user/user.router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend/build'));
app.use('/api', userRouter);
sequelize.sync();

app.listen(process.env.PORT || 5000);
