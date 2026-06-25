import { store } from "../../store/store"
import { addMessage } from "../../features/chat/chatSlice"

let ws: WebSocket | null = null
let isConnecting = false

export const connectWebSocket = () => {
    if (ws?.readyState === WebSocket.OPEN) {
        console.log("✅ WS already open, skip")
        return
    }
    if (ws?.readyState === WebSocket.CONNECTING) {
        console.log("⏳ WS already connecting, skip")
        return
    }
    if (isConnecting) return

    const token = localStorage.getItem("token")
    if (!token) {
        console.warn("⚠️ No token found")
        return
    }

    isConnecting = true
    console.log("🔌 Connecting WebSocket...")
    
    ws = new WebSocket(`ws://localhost:8000/messages/ws?token=${token}`)

    ws.onopen = () => {
        isConnecting = false
    }

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log("📨 WS message:", data)

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
    ws.onerror = (err) => {
        console.error("❌ WS error:", err)
        isConnecting = false
        ws = null
    }
    ws.onclose = (event) => {
        console.log("🔌 WS closed:", event.code, event.reason)
        isConnecting = false
        ws = null
    }
}

export const sendMessageWebSocket = (data: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(data)
        console.log("📤 Sent:", data)
    } else {
        console.warn("⚠️ WS not open, readyState:", ws?.readyState)
    }
}
export const disconnectWebSocket = () => {
    if (ws) {
        ws.onclose = null
        ws.onerror = null
        ws.close()
        ws = null
    }
    isConnecting = false
}

export const getWsState = () => ws?.readyState