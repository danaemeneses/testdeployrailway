const socket = io()

const authorSchema = new normalizr.schema.Entity("author",{},{idAttribute: "email"});
const messageSchema = new normalizr.schema.Entity("message", {author: authorSchema
});
const messagesSchema = new normalizr.schema.Entity("messages", {messages: [messageSchema]
});

socket.on('compres', data => {
    const html = `<strong>${"Porcentaje de compresion: " + data}</strong>`
    document.getElementById("compresion").innerHTML = html
})

socket.on('messages', data => {
    const dataDesnor = normalizr.denormalize(data.result, messagesSchema, data.entities)
    const html = dataDesnor.messages.map(msj => {
        return `<div>
        <strong>${msj.author.nombre}</strong>
        <strong>${msj.fyh}</strong>
        <em>${msj.text}</em>
        </div>`
    })
    .join(" ")

    document.getElementById("messages").innerHTML = html
})

function addMessage() {
    const message = {
        author: {
            email: document.getElementById("email").value,
            nombre: document.getElementById("nombreChat").value,
            apellido: document.getElementById("apellido").value,
            edad: document.getElementById("edad").value,
            alias: document.getElementById("alias").value,
            avatar: document.getElementById("avatar").value,
        },
        text: document.getElementById("text").value
    }

    socket.emit('new-message', message)
}