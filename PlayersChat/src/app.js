const express = require('express')
const {Server} = require('socket.io')
const playerManager = require('./manager/PlayerManager')

const app = express()
const server = app.listen(8080, () => console.log('Listening server'))
const io = new Server(server)
app.use(express.json())
app.use(express.static(__dirname + '/public'))


io.on('connection', socket => {
    socket.on('sendPlayer', async data =>{
        await playerManager.postPlayer(data)
        socket.emit('player', data)
    } )
})

app.get('/',  (req, res) => {
  
    const showPlayers = document.getElementById('showPlayers')
    showPlayers.addEventListener('click',async () =>{
        let players1 = await playerManager.getAll().then(resp => console.log(resp))
        players1.forEach(player => {
            const cardsContainer = document.getElementById('cardsBox')
            const div1 = document.createElement("div") //creamos primer div para contener cards
            div1.className = "card m-3"
            div1.style.width = "18rem"
            div1.innerHTML = `
            <img src=${player.img} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${player.player}</h5>
                <p class="card-text"><strong>Posición:</strong> ${player.position}</p>
                <p class="card-text"><strong>Calificación:</strong> ${player.calification}</p>
                <a href="#" class="btn btn-primary">Más info</a>
            </div>
            `   
            cardsContainer.appendChild(div1)
        });
    } )

})
