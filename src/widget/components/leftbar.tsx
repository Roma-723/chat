import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getByIdChats, getChats } from "../../api/chat/chat"
import { useNavigate } from "react-router-dom"

const COLORS = [
  "#c03d33", "#4fad2d", "#d09306",
  "#168acd", "#8544d6", "#cd4073",
  "#2996ad", "#ce671b",
]

const Avatar = ({ url, username, index }: { url: string | null; username: string; index: number }) => {
  const [error, setError] = useState(false)

  if (url && !error) {
    return (
      <img
        src={url}
        alt={username}
        className="w-11 h-11 rounded-full object-cover"
        onError={() => setError(true)}
      />
    )
  }

  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center text-base font-semibold text-white"
      style={{ background: COLORS[index % COLORS.length] }}
    >
      {username?.[0]?.toUpperCase()}
    </div>
  )
}

const Leftbar = () => {
  const dispatch = useDispatch<any>()
  const navigate = useNavigate()
  const { chats, loading } = useSelector((state: any) => state.chat)
  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(getChats())
  }, [])

  const filtered = chats?.filter((c: any) =>
    c.username?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex w-70 h-full bg-[#212121] text-white">
      <div className="w-70 h-full shrink-0 flex flex-col bg-[#212121] border-r border-white/5">

        <div className="px-3 py-3">
          <div className="flex items-center gap-2 bg-[#2d2d2d] rounded-xl px-3 py-2">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto h-full">
          {loading ? (
            <div className="flex justify-center items-center h-20">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered?.length === 0 ? (
            <p className="text-center text-gray-500 mt-10 text-sm">no message</p>
          ) : (
            filtered?.map((chat: any, i: number) => (
              <div
                key={chat.id}
                onClick={() => {
                  dispatch(getByIdChats(chat.id))
                  navigate(`/chat/${chat.id}`)
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 cursor-pointer transition-colors rounded-xl mx-1"
              >
                <Avatar url={chat.avatar_url} username={chat.username} index={i} />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{chat.username}</p>
                  <p className="text-[13px] text-gray-400 truncate mt-0.5">
                    {chat.last_message || "no message"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Leftbar