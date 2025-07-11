const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 3, // limit each user to 3 requests per minute
    keyGenerator: (req) => req.user?.id || req.ip,
    message: 'Too many requests. Please try again later.',
});

module.exports = limiter;