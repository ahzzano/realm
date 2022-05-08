interface Game {
    gameId: number,
    maxPlayers: number,
    mapPool: any[],
    players: any[],
    started: boolean
}

interface Team {
    teamName: string,
    players: string[]
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