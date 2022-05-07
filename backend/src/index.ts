import { logMessage } from './util'
import { Game, makeGame } from './types'

const express = require('express')

const app = express()
const port = 3000

const games = []
const freeIndices = []

// default
app.get('/', (req, res) => {
    logMessage(`GET request at /`)
    res.json({
        'hello': 'world'
    })
})

app.get('/create_game', (req, res) => {
    logMessage(`Creating game`)
    
    let game: Game = makeGame(games.length);

    games.push(game)

    res.json({
        gameId: game.gameId
    })
})

app.listen(port, () => {
    logMessage(`Starting Server on Port ${port}`)
})