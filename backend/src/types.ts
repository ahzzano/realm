interface Game {
    gameId: number,
    maxPlayers: number,
    mapPool: string[],
    players: string[]
}

function makeGame(gameId: number) {
    let game = {
        gameId: gameId,
        maxPlayers: 10,
        mapPool: [],
        players: [] 
    }

    return game
}

export {
    Game,
    makeGame
}