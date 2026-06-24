import { store } from "../../store/store"
import { addMessage } from "../../features/chat/chatSlice"

let ws: WebSocket | null = null
let isConnecting = false

export const connectWebSocket = () => {
    if (isConnecting) return
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return

    const token = localStorage.getItem("token")
    if (!token) return

    
    isConnecting = true
    ws = new WebSocket(`ws://localhost:8000/messages/ws?token=${token}`)

    ws.onopen = () => {
        isConnecting = false
    }

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data)

        if (data.type === "message") {
            store.dispatch(addMessage({
                message_id: data.id,
                sender_id: data.sender_id,
                receiver_id: data.receiver_id,
                message: data.message,
                created_at: data.created_at,
            }))
        }
    }

    ws.onerror = () => {
        isConnecting = false
        ws = null
    }

    ws.onclose = null
}

export const disconnectWebSocket = () => {
    if (ws) {
        ws.onclose = null
        ws.close()
        ws = null
    }
    isConnecting = false
}