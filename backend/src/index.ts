import { logMessage } from './util'
import { Game, makeGame } from './types'

const express = require('express')
const bp = require('body-parser')

const app = express()
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

let games: Game[] = []
const freeIndices = []

function verifyGameId(gameId: number) {
    return gameId >= games.length || gameId < 0
}

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

    if(verifyGameId(index)) {
        logMessage(`Invalid ID: ${index}`)

        res.send(`Invalid ID: ${index}`)
        return
    }

    res.json(games[index])
})

app.get('/games/:gameid/start', (req, res) => {
    let index = req.params.gameId
    let playerName: string = String(req.query.playerName)

    if(verifyGameId(index)) {
        logMessage(`Invalid ID: ${index}`)
        res.send(`Invalid ID: ${index}`)
        return
    }

    if(!games[index].players.includes(playerName)) {
        logMessage(`Player "${playerName}" not included in that game`)
        res.send(`Player "${playerName}" not included in that game`)
        return
    }

    games[index].started = true
    logMessage('Starting game')
    res.redirect(`/games/${index}`)
})

app.post('/games/:gameId/add_player', (req, res) => {
    let index = req.params.gameId

    let playerName: string = String(req.body.playerName)

    if(verifyGameId(index)) {
        logMessage(`Invalid ID: ${index}`)

        res.send(`Invalid ID: ${index}`)
        return
    }

    if(games[index].players.includes(playerName)) {
        logMessage(`Player "${playerName}" already in the game`)
        res.send(`Player "${playerName}" already in the game`)
        return
    }

    games[index].players.push(playerName)
    res.redirect(`/games/${index}`)
})

let server = app.listen(port, () => {
    logMessage(`Starting Server on Port ${port}`)
})

export {
    app,
    port,
    server
}