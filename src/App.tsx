import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Web3Provider } from './providers/Web3Provider'
import { Navigation } from './components/Navigation'
import { Home } from './pages/Home'
import { Cook } from './pages/Cook'
import { Leaderboard } from './pages/Leaderboard'
import { News } from './pages/News'
import { Admin } from './pages/Admin'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cook" element={<Cook />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/news" element={<News />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'bg-white shadow-lg',
              duration: 4000,
            }}
          />
        </div>
      </Router>
    </Web3Provider>
  )
}

export default App