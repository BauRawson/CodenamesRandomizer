import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import GamesPage from './pages/GamesPage.jsx'
import GameDetailPage from './pages/GameDetailPage.jsx'
import GamePlayPage from './pages/GamePlayPage.jsx'
import FamiliaPage from './pages/FamiliaPage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-brand-cream font-display flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Play page — no nav/footer, fullscreen */}
        <Route path="/play/:slug" element={<GamePlayPage />} />

        {/* Portal pages with nav */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/games" element={<Layout><GamesPage /></Layout>} />
        <Route path="/games/:slug" element={<Layout><GameDetailPage /></Layout>} />
        <Route path="/familia" element={<Layout><FamiliaPage /></Layout>} />
        <Route path="/categories" element={<Layout><CategoriesPage /></Layout>} />
        <Route path="/categories/:slug" element={<Layout><CategoriesPage /></Layout>} />

        {/* Catch-all → home */}
        <Route path="*" element={<Layout><HomePage /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
