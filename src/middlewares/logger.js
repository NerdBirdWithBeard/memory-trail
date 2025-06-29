module.exports = (req, res, next) => {
    console.log(`${req.method.toUpperCase()} ${req.host}${req.url}`);
    next();
};
