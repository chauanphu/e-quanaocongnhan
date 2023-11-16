import Navbar from "./Navbar";

 
export default function Layout({ children }) {
  return (
    // Set container width to 80% of the screen
    <>
      <Navbar />
      <main className='container'>
        {children}
      </main>
    </>
  )
}