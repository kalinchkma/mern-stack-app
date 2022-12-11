/**
 * Validate product info
 */

// external import
 const createError = require('http-errors');
 const { check } = require('express-validator');
 
 // internal imports
 const Game = require('../../models/Game');
 
 // check product info
 
 const gameUpdateInfoVaildator = [
      // product id validate
      check('id')
      .isString()
      .withMessage("Game id must be a string")
      .trim()
      .custom( async (value) => {
            try {
                const game = await Game.findById({_id: value});
                if(game) {
                    return true;
                }
                throw createError("System busy!");
            } catch(err) {
                throw createError("System busy!");
            }
      }),
     // validate title
     check('name')
     .isString()
     .withMessage("Game name must be a string")
     .trim().escape(),
     // validate description
     check('description')
     .isString()
     .withMessage("Game Description must a string "),
     
     // check video link
     check('videoLink')
     .isURL()
     .withMessage("Invalid video link")
 ];
 
 
 module.exports = gameUpdateInfoVaildator;
 
 
 
 