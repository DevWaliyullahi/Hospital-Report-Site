import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sequelize from "./config/database.config";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import DoctorsRouter from "./routes/Doctors";
import ReportsRouter from "./routes/Reports";
 import indexRouter from "./routes/index";

const app = express();

sequelize.sync().then(() => {
  console.log("Database is connected");
}).catch((err: any) => {
  console.log("Error connecting to database", err);
});



// view engine setup
app.set("views", path.join(__dirname, '..', 'views'));
app.set("view engine", "ejs");

// app.set("views", path.join(__dirname, "..", "views"));

// app.set("view engine", "ejs");

// app.use('/register', registerRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/doctors', DoctorsRouter);
 app.use('/reports', ReportsRouter);
   app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // Log the error to the console for debugging
  console.error(err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


export default app;


