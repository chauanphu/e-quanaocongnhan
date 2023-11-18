import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CTO from "./CTO";
import Footer from "./Footer";
import Category from '../interfaces/category'


export default function Layout({ children }) {
  const [open_sidebar, setOpenSidebar] = useState(false);
  // Fetch categories from /api/categories
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch('/api/san-pham/')
      .then(res => res.json())
      .then(data => setCategories(data['categories']));
  }, []);

  const handleSidebarSelection = () => {
    setOpenSidebar(false);
  }
  return (
    // Set container width to 80% of the screen
    <>
      <Navbar 
        openSidebar={() => setOpenSidebar(true)} categories={categories}/>
      <Sidebar
        open={open_sidebar}
        handleClose={()=>setOpenSidebar(false)}
        onSelection={(page)=>handleSidebarSelection()}
      />
      <CTO />
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}