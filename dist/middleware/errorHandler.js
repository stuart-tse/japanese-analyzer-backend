export function errorHandler(err, _req, res, _next) {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: { message: err.message || '服务器错误' },
    });
}
//# sourceMappingURL=errorHandler.js.map