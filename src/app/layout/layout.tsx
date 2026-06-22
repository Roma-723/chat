import { Outlet } from "react-router-dom"
import Leftbar from "../../widget/components/leftbar"
const Layout = () => {
  return (
    <div className="flex h-screen bg-[#212121]">
      <Leftbar />
      <Outlet />
    </div>
  )
}

export default Layout