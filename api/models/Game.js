/**
 * Product model
 */
'use strict';

const mongoose = require('mongoose');

const gameSchema = require('../schemas/gameSchema');


const Game = mongoose.model("Game", gameSchema);


module.exports = Game;
