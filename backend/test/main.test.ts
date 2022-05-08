import * as index from '../src/index'
import fetch from 'node-fetch';

const url = `localhost:${index.port}`

describe('API Server', () => {
    test('can actually make calls to the server', () => {
        
        fetch(url + '/').then((response) => {
            console.log(response)

            expect(response).toBe({'hello': 'world'})
        })
    })

    test('can create the game', () => {
       fetch(url + '/create_game'). then((response) => {
           expect(response).toBe({'gameId': 0})
       })

       fetch(url + '/create_game').then((response) => {
           expect(response).toBe({'gameId': 1})
       })
    })

    test('can add players', () => {
        fetch(url + '/games/0/add_player').then((response) => {

        })
    })

    afterAll(() => {
        index.server.close()
    })
})


