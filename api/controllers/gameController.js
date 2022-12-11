/**
 * Product controller
 */

const  Game = require('../models/Game');
const { unlink } = require('fs');
const path = require('path');

// create product
exports.createGame = async (req, res, next) => {
   
    try {
        let videoLink = req.body.videoLink.replace('youtu.be', 'www.youtube.com/embed');
        videoLink = videoLink.replace(/\?(.)*/i,"");
       
        const newGameOnject = {
            name: req.body.name,
            image: req.files.length > 0 ? process.env.STATIC_FILE_PATH + req.files[0].filename : "none",
            videoLink: videoLink,
            description: JSON.parse(req.body.description),
            gener: req.body.gener
        };
            
        const newGame = new Game(newGameOnject);

        const result = await newGame.save();
        return res.status(200).json({
            success: {
                game: result,
                msg: "New game created successfully"
            }
        });
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            } 
        });
    }
}

// update product by id
exports.updateGameById = async (req, res, next) => {
    try {
       
        const findGame = await Game.findById({_id: req.body.id});
    
        await Game.findByIdAndUpdate({_id: req.body.id}, {
            name: req.body.name,
            gener: findGame.gener,
            image: req.files.length !== 0 ? process.env.STATIC_FILE_PATH + req.files[0].filename : findGame.image,
            description: JSON.parse(req.body.description),
            videoLink: req.body.videoLink
        });
        const updatedGame = await Game.findById({_id: req.body.id});
        return res.status(200).json({
            success: {
                game: updatedGame,
                msg: "Game updated successfully!"
            }
        });
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg:  err.message
            }
        });
    }

}

// delete product by id
exports.deleteGameById = async (req, res, next) => {
    try {
        const game = await Game.findByIdAndDelete({_id: req.params.id});
        const gameImage = game.image.replace(process.env.STATIC_FILE_PATH, "");
        
        if(gameImage !== "none") {
            unlink(
                path.join(__dirname,`/../public/uploads/${gameImage}`),
                (err) => {
                    if(err) console.log(err);
                }
            );
        }

        return res.status(200).json({
            success: {
                msg: "Product deleted successfully!",
            }
        })
    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            },
        });
    }
   
};

// get all product
exports.getAllGame = async (req, res, next) => {
    try {
        const games = await Game.find();
        return res.status(200).json({
            success: {
                games: games,
                msg: "Game fetch successfully"
            }
        })
    } catch (err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            } 
        });
    }
}

// get product by Id 
exports.getGameById = async (req, res, next) => {
    try {
        const game = await Game.findById({_id: req.params.id});
        return res.status(200).json({
            success: {
                game: game,
                msg: "Game fetch successfully"
            }
        })

    } catch(err) {
        return res.status(500).json({
            errors: {
                msg: err.message
            }
        })
    }
}

