import createError from 'http-errors';

export default ({ expressApp }) => {
    // catch 404 and forward to error handler
    expressApp.use(function (_req, _res, next) {
        next(createError(404));
    })

    // error handler
    expressApp.use(function (err, req, res, _next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    })
}