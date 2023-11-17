import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

 
export default function Layout({ children }) {
  const [open_sidebar, setOpenSidebar] = useState(false);
  const handleSidebarSelection = () => {
    setOpenSidebar(false);
  }
  return (
    // Set container width to 80% of the screen
    <>
      <Navbar 
        openSidebar={()=>setOpenSidebar(true)}
      />
      <Sidebar
        open={open_sidebar}
        handleClose={()=>setOpenSidebar(false)}
        onSelection={(page)=>handleSidebarSelection()}
      />
      <main>
        {children}
      </main>
    </>
  )
}