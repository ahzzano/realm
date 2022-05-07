import { logMessage } from './util'
import { Game, makeGame } from './types'

const express = require('express')

const app = express()
const port = 3000

const games = []
const freeIndices = []

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

app.get('/games/:gameId', (req, res) => {
    let index = req.params.gameId

    if(index >= games.length || index < 0) {
        logMessage(`Invalid ID: ${index}`)

        res.send(`Invalid ID: ${index}`)
        return
    }

    res.json(games[index])
})

app.listen(port, () => {
    logMessage(`Starting Server on Port ${port}`)
})