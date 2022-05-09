interface Game {
    gameId: number,
    maxPlayers: number,
    pickedMaps: any[],
    mapPool: any[],
    players: any[],
    started: boolean,
    team1: Team,
    team2: Team,
    team1Pick: boolean 
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

function makeGame(gameId: number, maps: string[] = []) {
    let game = {
        gameId: gameId,
        maxPlayers: 10,
        mapPool: maps,
        players: [],
        pickedMaps: [], 
        started: false,
        team1: makeTeam('team 1'),
        team2: makeTeam('team 2'),
        team1Pick: true
    }

    return game
}

export {
    Game,
    makeGame
}