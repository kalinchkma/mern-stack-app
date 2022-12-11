/**
 * User delete id validator
 */
// external imports
const { param } = require('express-validator');
const createError = require('http-errors');

// internal imports
const Game = require('../../models/Game');

// validate user params id
const gameParamIdValidor = [
    param('id')
    .isString()
    .withMessage("Game Id must be a string")
    .escape()
    .custom( async (value) => {
        try {
            const game = await Game.findById({_id: value});
            if(game) {
                return true;
            }
            throw createError("System busy!");
        } catch(err) {
            throw  createError('System busy!');
        }
    })
]

module.exports = gameParamIdValidor;










