const { validationResult, body, query } = require('express-validator');

// Validation error handler
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Score submission validation rules
const submitScoreRules = [
    body('userId').notEmpty().isString(),
    body('gameId').notEmpty().isString(),
    body('score').notEmpty().isNumeric(),
    handleValidation
];

// Leaderboard retrieval validation rules
const getLeaderboardRules = [
    query('gameId').notEmpty().isString(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    handleValidation
];

// Individual rank validation rules
const getRankRules = [
    query('userId').notEmpty().isString(),
    query('gameId').notEmpty().isString(),
    handleValidation
];

module.exports = {
    submitScoreRules,
    getLeaderboardRules,
    getRankRules
}; 