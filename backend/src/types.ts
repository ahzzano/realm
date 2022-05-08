interface Game {
    gameId: number,
    maxPlayers: number,
    mapPool: any[],
    players: any[],
    started: boolean,
    team1: Team,
    team2: Team
}

interface Team {
    teamName: string,
    players: string[]
}

function makeTeam(teamname: string) {
    return {
        teamName: teamname,
        players: []
    }
}

function makeGame(gameId: number) {
    let game = {
        gameId: gameId,
        maxPlayers: 10,
        mapPool: [],
        players: [], 
        started: false,
        team1: makeTeam('team 1'),
        team2: makeTeam('team 2')
    }

    return game
}

export {
    Game,
    makeGame
}