// Chats.tsx
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { getByIdChats } from "../../api/chat/chat"
import { connectWebSocket, sendMessageWebSocket } from "../../api/websocket/websocket"
import type { Messanges } from "../../shared/types/chatType"

const formatTime = (created_at: string) => {
  const date = new Date(created_at)
  const now = new Date()
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  if (isToday) return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
  if (isYesterday) return "Yesterday"
  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" })
}

const Chats = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<any>()
  const { currentChat = [] } = useSelector((state: any) => state.chat)
  const token = useSelector((state: any) => state.auth.token)
  const myId = token ? Number((jwtDecode(token) as any).sub) : null
  const [text, setText] = useState("")

  useEffect(() => {
    if (id) dispatch(getByIdChats(Number(id)))
    connectWebSocket()
  }, [id])

  const handleSend = () => {
    if (!text.trim()) return
    const tempId = Date.now() + Math.random()
    sendMessageWebSocket(JSON.stringify({
      type: "message",
      sender_id: myId,
      receiver_id: Number(id),
      tempId: tempId,
      message: text
    }))
    setText("")
  }

  return (
    <div className="flex flex-col w-full h-full bg-[#212121]">
      {/* Header */}
      <div className="w-full h-15 bg-neutral-800" />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col-reverse gap-1">
        {currentChat.map((e: Messanges) => {
          const isMe = e.sender_id === myId
          return (
            <div key={e.message_id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[65%] px-4 py-2 rounded-2xl text-sm shadow-md ${
                isMe
                  ? "bg-[#2b5278] text-white rounded-br-none"
                  : "bg-[#2d2d2d] text-white rounded-bl-none"
              }`}>
                <p className="leading-snug">{e.message}</p>
                <p className="text-[11px] text-gray-400 text-right mt-1">
                  {formatTime(e.created_at)}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center gap-2 bg-[#212121]">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Write a message..."
          className="flex-1 min-w-0 bg-[#2d2d2d] text-white text-sm placeholder-gray-500 rounded-2xl px-4 py-2.5 outline-none"
        />
        <button
          onClick={handleSend}
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[#2b5278] hover:bg-[#3a6a9a] transition-colors"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Chats