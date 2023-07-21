import { useState } from "react";
import Navbar from "../common/navbar";
import Sidebar from "../common/sidebar";

export default function InsideLayout({ children }) {

  const [showDrawer,setShowDrawer] = useState(false)

  return (
    <>
      <div className="drawer" data-theme="light">
        <input id="dsp-drawer" type="checkbox" checked={showDrawer} onChange={() => setShowDrawer(!showDrawer)}  className="drawer-toggle" />
        <div className="drawer-content bg-d-white h-screen" >
          <Navbar toggle={ () => setShowDrawer(!showDrawer)} />
          {children}
          {/* <label htmlFor="my-drawer" class="btn btn-primary drawer-button">Open drawer</label> */}
        </div>

        <div className="drawer-side">
          <label htmlFor="dsp-drawer" className="drawer-overlay"></label>

          <Sidebar />

        </div>

      </div>

    </>
  )
}