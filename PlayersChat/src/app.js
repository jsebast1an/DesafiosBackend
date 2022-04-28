const express = require('express')
const {Server} = require('socket.io')
const playerManager = require('./manager/PlayerManager')

const app = express()
const server = app.listen(8080, () => console.log('Listening server'))
const io = new Server(server)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.get('/players', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
    playerManager.getAll().then(result => {
        io.on('connection', socket => {
            const data = result.payload
            socket.emit('sendPlayers', data)
        })
    })
})

io.on('connection', socket => {
    socket.on('sendPlayer', async data =>{
        await playerManager.postPlayer(data)
        socket.emit('player', data)
    } )
})




