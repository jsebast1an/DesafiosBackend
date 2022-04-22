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

socket.on('player',async data => {
    console.log('logrado: ' + data)
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

