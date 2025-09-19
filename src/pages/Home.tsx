import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../components/ui/Card'
import { TokenBalanceCard } from '../components/TokenBalanceCard'
import { useTokenBalances } from '../hooks/useTokenBalances'
import { TrendingUp, Users, Flame, Zap } from 'lucide-react'

export function Home() {
  const { rawTendyBalance, tendyBalance, isLoading } = useTokenBalances()
  const [clickCount, setClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1)
    if (clickCount + 1 === 5) {
      setShowEasterEgg(true)
      setTimeout(() => {
        setShowEasterEgg(false)
        setClickCount(0)
      }, 3000)
    }
  }

  const stats = [
    { icon: TrendingUp, label: 'Total Cooked', value: '1,234,567', color: 'text-green-500' },
    { icon: Users, label: 'Active Fryers', value: '8,921', color: 'text-blue-500' },
    { icon: Flame, label: 'Total Burned', value: '987,654', color: 'text-red-500' },
    { icon: Zap, label: 'Cook Rate', value: '98.5%', color: 'text-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-avalanche-light">
      {/* Easter Egg Animation */}
      {showEasterEgg && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth, rotate: 0 }}
              animate={{ y: window.innerHeight + 100, rotate: 360 }}
              transition={{ duration: 3, delay: i * 0.1 }}
              className="absolute text-4xl"
            >
              🍗
            </motion.div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            onClick={handleLogoClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-8xl mb-4 cursor-pointer inline-block"
          >
            🍗
          </motion.div>
          <h1 className="text-6xl font-bold mb-4 bg-avalanche-gradient bg-clip-text text-transparent">
            Welcome to Tendies
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            The ultimate meme token ecosystem on Avalanche. Cook your Raw Tendies into delicious, 
            crispy Tendies and join the most entertaining DeFi experience!
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/cook"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-avalanche-gradient text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              🔥 Start Cooking
            </motion.a>
            <motion.a
              href="/leaderboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all border border-gray-200"
            >
              🏆 View Leaderboard
            </motion.a>
          </div>
        </div>

        {/* Token Balances */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
          <TokenBalanceCard token="RAWTENDY" balance={rawTendyBalance} isLoading={isLoading} />
          <TokenBalanceCard token="TENDY" balance={tendyBalance} isLoading={isLoading} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map(({ icon: Icon, label, value, color }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center" hover>
                <Icon className={`${color} mb-3 mx-auto`} size={32} />
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
                <p className="text-gray-600">{label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Why Tendies?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center" hover>
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-xl font-semibold mb-2">Cook & Earn</h3>
              <p className="text-gray-600">
                Transform your Raw Tendies into delicious cooked Tendies through our interactive cooking system.
              </p>
            </Card>
            
            <Card className="p-6 text-center" hover>
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Compete</h3>
              <p className="text-gray-600">
                Climb the leaderboard and become the ultimate Tendies chef in our community.
              </p>
            </Card>
            
            <Card className="p-6 text-center" hover>
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-2">Avalanche Powered</h3>
              <p className="text-gray-600">
                Built on Avalanche for fast, low-cost transactions and seamless user experience.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}