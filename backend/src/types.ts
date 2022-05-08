interface Game {
    gameId: number,
    maxPlayers: number,
    mapPool: any[],
    players: any[],
    started: boolean
}

function makeGame(gameId: number) {
    let game = {
        gameId: gameId,
        maxPlayers: 10,
        mapPool: [],
        players: [], 
        started: false
    }

    return game
}

export {
    Game,
    makeGame
}