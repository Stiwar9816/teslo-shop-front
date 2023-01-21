import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h1>WebSocket - Client</h1>

   <input id="jwt-token" placheholder= "Json Web Token" />
   <button id="btn-connect">Connect</button>

   <br/>
   <span id="server-status">Offline</span>
   <ul id="clients-ul"> </ul>

   <form id="message-form">
     <input placheholder="Message" id="message-input" />
   </form>

   <h3>Messages</h3>
   <ul id="message-ul"></ul>
  </div>
`
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!

btnConnect.addEventListener('click', () => {

  if (jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT!')
  connectToServer(jwtToken.value.trim())
})
