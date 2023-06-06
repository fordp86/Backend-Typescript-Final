import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { db } from './models';
import rantRoutes from './routes/rantRoutes';
import userRoutes from './routes/userRoutes';

require("dotenv").config();

const { Sequelize } = require("sequelize");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/api/rants', rantRoutes);
app.use('/api/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("This is not the URL you are looking for!");
});

// Syncing our database
db.sync().then(() => {
    console.info("connected to the database!")
});

const PORT = process.env.PORT || 3001;

app.listen(PORT);