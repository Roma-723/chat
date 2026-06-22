import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getByIdChats } from "../../api/chat/chat"
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

  if (isToday) {
    return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
  }

  if (isYesterday) {
    return "Yesterday"
  }

  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" })
}

const Chats = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<any>()
  const { currentChat = [] } = useSelector((state: any) => state.chat)

  useEffect(() => {
    if (id) {
      dispatch(getByIdChats(Number(id)))
    }
  }, [id])

  return (
    <div className="w-full bg-[#212121] text-white">
      {currentChat.map((e: Messanges) => (
        <div key={e.message_id}>
          <p>{e.message}</p>
          <p>{formatTime(e.created_at)}</p>  
        </div>
      ))}
    </div>
  )
}

export default Chats