import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../components/ui/Card'
import { Calendar, User, ExternalLink } from 'lucide-react'

interface NewsItem {
  id: number
  title: string
  content: string
  author: string
  date: string
  category: 'announcement' | 'update' | 'community'
  featured: boolean
}

export function News() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    const fetchNews = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockNews: NewsItem[] = [
        {
          id: 1,
          title: "Tendies V2.0 Launch Announcement 🚀",
          content: "We're excited to announce the launch of Tendies V2.0 with enhanced cooking mechanics, improved rewards, and new community features. The upgrade includes optimized smart contracts, reduced gas fees, and a completely redesigned user interface for the ultimate cooking experience.",
          author: "Tendies Team",
          date: "2024-01-15",
          category: "announcement",
          featured: true
        },
        {
          id: 2,
          title: "New Cooking Animations Released 🍳",
          content: "Experience cooking like never before! Our latest update introduces spectacular cooking animations with realistic sizzling sounds, improved visual effects, and smoother transitions. Watch your Raw Tendies transform into golden perfection with our new animation system.",
          author: "Dev Team",
          date: "2024-01-12",
          category: "update",
          featured: false
        },
        {
          id: 3,
          title: "Community Cooking Contest Winners 🏆",
          content: "Congratulations to our top fryers in the January cooking contest! Over 1,000 community members participated, cooking more than 500,000 Tendies. Winners will receive exclusive NFT rewards and special recognition in our Hall of Fame.",
          author: "Community Manager",
          date: "2024-01-10",
          category: "community",
          featured: true
        },
        {
          id: 4,
          title: "Smart Contract Audit Complete ✅",
          content: "Our smart contracts have successfully passed a comprehensive security audit by CertiK. The audit confirms the safety and reliability of our burn-and-mint mechanisms, with zero critical vulnerabilities found. Full report available in our documentation.",
          author: "Security Team",
          date: "2024-01-08",
          category: "announcement",
          featured: false
        },
        {
          id: 5,
          title: "Mobile App Coming Soon 📱",
          content: "Get ready to cook on the go! Our mobile application is in final development stages and will launch next month. The app will feature all web functionality plus exclusive mobile-only features like push notifications for cooking reminders and augmented reality cooking experience.",
          author: "Product Team",
          date: "2024-01-05",
          category: "update",
          featured: false
        }
      ]
      
      setNews(mockNews)
      setLoading(false)
    }

    fetchNews()
  }, [])

  const filteredNews = filter === 'all' 
    ? news 
    : news.filter(item => item.category === filter)

  const getCategoryBadge = (category: string) => {
    const styles = {
      announcement: 'bg-blue-100 text-blue-800',
      update: 'bg-green-100 text-green-800',
      community: 'bg-purple-100 text-purple-800'
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[category as keyof typeof styles]}`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-avalanche-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">📰</div>
          <p className="text-gray-600">Loading latest news...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-avalanche-light">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-avalanche-gradient bg-clip-text text-transparent">
            📰 Tendies News & Updates
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay up to date with the latest announcements, updates, and community highlights from the Tendies ecosystem.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg p-1 shadow-md">
            {['all', 'announcement', 'update', 'community'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === category
                    ? 'bg-avalanche-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Featured News */}
        {filter === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {news.filter(item => item.featured).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full" hover>
                    <div className="flex justify-between items-start mb-4">
                      {getCategoryBadge(item.category)}
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.content}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <User size={14} className="mr-1" />
                        {item.author}
                      </div>
                      <button className="text-avalanche-500 hover:text-avalanche-600 text-sm font-medium flex items-center">
                        Read More <ExternalLink size={14} className="ml-1" />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All News */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {filter === 'all' ? 'All News' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} News`}
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6" hover>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div className="flex items-center space-x-3 mb-2 md:mb-0">
                      {getCategoryBadge(item.category)}
                      {item.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.content}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <User size={14} className="mr-1" />
                      {item.author}
                    </div>
                    <button className="text-avalanche-500 hover:text-avalanche-600 text-sm font-medium flex items-center">
                      Read Full Article <ExternalLink size={14} className="ml-1" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="max-w-2xl mx-auto mt-12 p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay in the Loop! 📧</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and never miss important Tendies updates, announcements, and community events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-avalanche-500 focus:border-avalanche-500"
            />
            <button className="bg-avalanche-gradient text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
              Subscribe
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}