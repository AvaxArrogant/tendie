import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../components/ui/Card'
import { Trophy, Medal, Award, Flame } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  address: string
  totalCooked: number
  totalBurned: number
  cookingStreak: number
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch leaderboard data
    const fetchLeaderboard = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockData: LeaderboardEntry[] = [
        { rank: 1, address: '0x1234...5678', totalCooked: 50000, totalBurned: 52000, cookingStreak: 15 },
        { rank: 2, address: '0xabcd...efgh', totalCooked: 45000, totalBurned: 46500, cookingStreak: 12 },
        { rank: 3, address: '0x9876...5432', totalCooked: 38000, totalBurned: 39000, cookingStreak: 8 },
        { rank: 4, address: '0xdef0...1234', totalCooked: 32000, totalBurned: 33500, cookingStreak: 6 },
        { rank: 5, address: '0x5678...90ab', totalCooked: 28000, totalBurned: 29000, cookingStreak: 4 },
      ]
      
      setLeaderboard(mockData)
      setLoading(false)
    }

    fetchLeaderboard()
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={24} />
      case 2:
        return <Medal className="text-gray-400" size={24} />
      case 3:
        return <Award className="text-amber-600" size={24} />
      default:
        return <Flame className="text-orange-500" size={20} />
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-red-400 to-red-600 text-white'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
      case 3:
        return 'bg-gradient-to-r from-red-300 to-red-500 text-white'
      default:
        return 'bg-white border border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">🍗</div>
          <p className="text-gray-600">Loading Hall of Fryers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            🏆 Hall of Fryers
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The ultimate leaderboard of Tendies masters. See who's been cooking up the most delicious results!
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end mb-12 max-w-4xl mx-auto">
          {[2, 1, 3].map((rank, index) => {
            const entry = leaderboard.find(e => e.rank === rank)!
            const heights = { 1: 'h-40', 2: 'h-32', 3: 'h-28' }
            const orders = { 1: 'order-2', 2: 'order-1', 3: 'order-3' }
            
            return (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col items-center mx-4 ${orders[rank]}`}
              >
                <Card className={`p-4 ${heights[rank]} ${getRankStyle(entry.rank)} flex flex-col justify-end items-center min-w-[120px]`}>
                  <div className="text-center">
                    {getRankIcon(entry.rank)}
                    <div className="text-sm font-semibold mt-2">#{entry.rank}</div>
                    <div className="text-xs opacity-75">{entry.address.slice(0, 6)}...{entry.address.slice(-4)}</div>
                    <div className="text-lg font-bold">{entry.totalCooked.toLocaleString()}</div>
                    <div className="text-xs">Tendies Cooked</div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Full Leaderboard */}
        <Card className="max-w-4xl mx-auto">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Complete Rankings</h2>
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={entry.address}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg ${getRankStyle(entry.rank)} flex items-center justify-between`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(entry.rank)}
                      <span className="font-bold text-lg">#{entry.rank}</span>
                    </div>
                    <div>
                      <div className="font-semibold">{entry.address}</div>
                      <div className="text-sm opacity-75">🔥 {entry.cookingStreak} day streak</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-lg">{entry.totalCooked.toLocaleString()}</div>
                    <div className="text-sm opacity-75">Tendies Cooked</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
          <Card className="p-6 text-center" hover>
            <div className="text-3xl mb-2">👑</div>
            <h3 className="font-semibold mb-1">Top Fryer</h3>
            <p className="text-2xl font-bold text-red-600">{leaderboard[0]?.totalCooked.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Tendies Cooked</p>
          </Card>
          
          <Card className="p-6 text-center" hover>
            <div className="text-3xl mb-2">🔥</div>
            <h3 className="font-semibold mb-1">Longest Streak</h3>
            <p className="text-2xl font-bold text-red-500">15</p>
            <p className="text-sm text-gray-600">Days Cooking</p>
          </Card>
          
          <Card className="p-6 text-center" hover>
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-semibold mb-1">Active Fryers</h3>
            <p className="text-2xl font-bold text-red-600">{leaderboard.length}</p>
            <p className="text-sm text-gray-600">This Week</p>
          </Card>
        </div>
      </div>
    </div>
  )
}