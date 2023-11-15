import Navbar from "./Navbar";

 
export default function Layout({ children }) {
  return (
    // Set container width to 80% of the screen
    <div className='container mx-auto'>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  )
}