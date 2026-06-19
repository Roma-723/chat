import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getChats } from "../../api/chat/chat"

const Home = () => {
  const dispatch = useDispatch<any>()
  const { chats, loading } = useSelector((state: any) => state.chat)

  useEffect(() => {
    dispatch(getChats())
  }, [])

  return (
    <div>
      {loading && <p>Loading...</p>}
      <div>
        {chats?.map((e: any) => (
          <div key={e.id}>
            <p className="bg-amber-950">{e.username}</p>
            <p>{e.last_message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home