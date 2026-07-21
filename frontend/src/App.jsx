import Navbar from './components/layout/Navbar.jsx'
import Background from './components/layout/Background.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  )
}
