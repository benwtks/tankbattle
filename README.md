# tankbattle
Multiplayer tank trouble game in Node.js

## Development

To install dependencies
`npm install`

To start the server
`npm start`

## WebSocket API Messages

Messages between the client and server.

### Messages to server

```
start_game
join_game <id>
shoot <timestamp>
client_update <x> <y> <speed> <theta>
```

### Messages to client

```
game_over
server_update [(<bullet x>,<bullet y>,<vx>,<vy>)] [(<player id>,<x>,<y>, <speed>, <theta>)]
```
