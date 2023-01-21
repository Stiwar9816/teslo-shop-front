
import { Manager, Socket } from 'socket.io-client'

let socket: Socket

export const connectToServer = (token: string) => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: token
        }
    })

    socket?.removeAllListeners()
    socket = manager.socket('/')

    addListerners()
}

const addListerners = () => {
    const serverStatusLabel = document.getElementById('server-status')!;
    const clientsUl = document.getElementById('clients-ul')!
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!
    const messageUl = document.querySelector<HTMLUListElement>('#message-ul')!

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Connected'
    })

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Disconnected'
    })

    socket.on('clients-updated', (clients: string[]) => {
        console.log({ clients })
        let clientsList = ''
        clients.forEach(clientId => {
            clientsList += `
            <li>${clientId}</li>
            `
        })

        clientsUl.innerHTML = clientsList
    })

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault()
        if (messageInput.value.trim().length <= 0) return

        socket.emit('message-form-clients', {
            id: 'Yo!!',
            message: messageInput.value
        })

        messageInput.value = ''
    })

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        const newMessage = `
        <li>
            <strong>${payload.fullName}</strong>
            <span>${payload.message}</span>
        </li>
       `
        const li = document.createElement('li')
        li.innerHTML = newMessage
        messageUl.append(li)
    })
}