import { logMessage } from './util'
import { Game, makeGame } from './types'
import { stringify } from 'querystring'

const express = require('express')
const bp = require('body-parser')

const app = express()
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

let games: Game[] = []
const freeIndices = []

// Load Config File
const fs = require('fs')

let configData = fs.readFileSync('config.json')

const config = JSON.parse(configData)

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
    
    let game: Game = makeGame(games.length, config.maps);

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

app.get('/games/:gameId/start', (req, res) => {
    let index = req.params.gameId
    let playerName: string = String(req.query.playerName)
    console.log(games[index])
    logMessage(JSON.stringify(games[index]))

    if(verifyGameId(index)) {
        logMessage(`Invalid ID: ${index}`)
        res.send(`Invalid ID: ${index}`)
        return
    }

    if(!games[index].players.includes(playerName)) {
        logMessage(`Player "${playerName}" not in game`)
        res.send(`Player "${playerName}" not in game`)
        return
    }

    if(games[index].started) {
        res.redirect(`/games/${index}`)
        return
    }

    games[index].started = true

    // Assign Players

    for(let i = 0; i < games[index].players.length; i += 2) {
        let chance = Math.random()

        if(chance < 0.5) {
            games[index].team1.players.push(games[index].players[i])
            games[index].team2.players.push(games[index].players[i + 1])
        }
        else {
            games[index].team2.players.push(games[index].players[i])
            games[index].team1.players.push(games[index].players[i + 1])
        }
    }

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