import { Outlet } from "react-router-dom"
import Leftbar from "../../widget/components/leftbar"
const Layout = () => {
  return (
    <div className="flex h-screen">
      <Leftbar />
      <Outlet />
    </div>
  )
}

export default Layout