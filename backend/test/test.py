import requests

print(requests.post('http://localhost:3000/games/0/add_player', data={
    'playerName': 'Madoka'
}).text)