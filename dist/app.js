"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const database_config_1 = __importDefault(require("./config/database.config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Doctors_1 = __importDefault(require("./routes/Doctors"));
const Reports_1 = __importDefault(require("./routes/Reports"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
database_config_1.default.sync().then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log("Error connecting to database", err);
});
// view engine setup
app.set("views", path_1.default.join(__dirname, '..', 'views'));
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "..", "views"));
// app.set("view engine", "ejs");
// app.use('/register', registerRouter);
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/doctors', Doctors_1.default);
app.use('/reports', Reports_1.default);
app.use('/', index_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // Log the error to the console for debugging
    console.error(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
