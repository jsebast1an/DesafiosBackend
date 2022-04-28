const socket = io()

let form = document.getElementById('playerForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(form)
    let obj = {}
    data.forEach((val, key) => obj[key] = val)
    socket.emit('sendPlayer', obj)
    form.reset()
})

/* SHOW PLAYER */
socket.on('player', data => {
    console.log('logrado: ' + JSON.stringify(data))
    const cardsContainer = document.getElementById('cardsBox')
            const div1 = document.createElement("div") //creamos primer div para contener cards
            div1.className = "card m-3"
            div1.style.width = "18rem"
            div1.innerHTML = `
            <img src=${data.img} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.player}</h5>
                <p class="card-text"><strong>Posición:</strong> ${data.position}</p>
                <p class="card-text"><strong>Calificación:</strong> ${data.calification}</p>
                <a href="#" class="btn btn-primary">Más info</a>
            </div>
            `   
            cardsContainer.appendChild(div1)

})

/* SHOW ALL PLAYERS */
const showPlayers = document.getElementById('showPlayers')

socket.on('sendPlayers', data => {
    const cardsContainer = document.getElementById('cardsBox')
    cardsContainer.innerHTML = ''
    data.forEach(player => {
    const div1 = document.createElement("div") //creamos primer div para contener cards
    div1.className = "card m-3"
    div1.style.width = "18rem"
    div1.innerHTML = `
    <img src=${player.img} class="card-img-top" alt="..." max-width=300px max-height=280px >
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




