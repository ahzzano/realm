import * as index from '../src/index'
import { makeGame } from '../src/types';
import fetch from 'node-fetch';

const url = `https://localhost:${index.port}`



describe('API Server', () => {
    let game

    function noConnection() {
        fail('No Connection Found')
    }

    beforeEach(() => {
        game = makeGame(0)
        jest.spyOn(console, 'warn').mockImplementation(() => {})
    })

    test('can actually make calls to the server', () => {
        
        fetch(url + '/').then((response) => {
            console.log(response)

            expect(response).toBe({'hello': 'world'})
        }).catch(noConnection)
    })

    test('can create the game', () => {
       fetch(url + '/create_game'). then((response) => {
           expect(response).toBe({'gameId': 0})
       })

       fetch(url + '/create_game').then((response) => {
           expect(response).toBe({'gameId': 1})
       })

       fetch(url + '/games/0').then((response) => {
           expect(response).toBe(game)
       })
    })

    test('can add players', () => {
        let player1 = 'Madoka'
        let player2 = 'Homura'

        fetch(url + '/games/0/add_player', {
            method: 'post',
            body: JSON.stringify({
                'playerName': 'Madoka'
            })
        }).then((response) => {
            game.players.push('Madoka')

            expect(response).toBe(game)
        })

        fetch(url + '/games/0/add_player', {
            method: 'post',
            body: JSON.stringify({
                'playerName': 'Madoka'
            })
        }).then((response) => {
            game.players.push('Madoka')

            expect(response).not.toBe(game)
        })

        game.players.pop()

        fetch(url + '/games/0/add_player', {
            method: 'post',
            body: JSON.stringify({
                'playerName': 'Homura'
            })
        }).then((response) => {
            game.players.push('Homura')

            expect(response).toBe(game)
        })               
    })
   
    test('can start game', (done) => {
        fetch(url + '/games/0/start').then((response) => {
            game.started = true
            expect(response.started).toBe(true)
        })

    })

    afterAll(() => {
        index.server.close()
    })
})


