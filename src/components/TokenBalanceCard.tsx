import { Card } from './ui/Card'
import { motion } from 'framer-motion'

interface TokenBalanceCardProps {
  token: 'RAWTENDY' | 'TENDY'
  balance: string
  isLoading: boolean
}

export function TokenBalanceCard({ token, balance, isLoading }: TokenBalanceCardProps) {
  const isRaw = token === 'RAWTENDY'
  
  return (
    <Card className="p-6" hover>
      <div className="text-center">
        <div className="text-4xl mb-2">
          {isRaw ? '🥩' : '🍗'}
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {isRaw ? 'Raw Tendies' : 'Cooked Tendies'}
        </h3>
        <div className="text-2xl font-bold">
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 h-8 rounded mx-auto w-20" />
          ) : (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={isRaw ? 'text-avalanche-600' : 'text-avalanche-500'}
            >
              {parseFloat(balance).toLocaleString()}
            </motion.span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">{token}</p>
      </div>
    </Card>
  )
}