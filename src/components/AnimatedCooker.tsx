import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/Button'
import { Modal } from './ui/Modal'

interface AnimatedCookerProps {
  onCook: (amount: string) => Promise<void>
  rawTendyBalance: string
  isLoading: boolean
}

export function AnimatedCooker({ onCook, rawTendyBalance, isLoading }: AnimatedCookerProps) {
  const [cookAmount, setCookAmount] = useState('')
  const [isCooking, setIsCooking] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [cookingProgress, setCookingProgress] = useState(0)

  const handleCook = async () => {
    if (!cookAmount || parseFloat(cookAmount) <= 0) return
    
    setIsCooking(true)
    setCookingProgress(0)
    
    // Animate cooking progress
    const progressInterval = setInterval(() => {
      setCookingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    try {
      await onCook(cookAmount)
      setTimeout(() => {
        setIsCooking(false)
        setShowSuccess(true)
        setCookAmount('')
      }, 3000)
    } catch {
      setIsCooking(false)
      clearInterval(progressInterval)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <motion.div
          animate={isCooking ? { rotate: [0, -5, 5, -5, 0] } : {}}
          transition={{ duration: 0.5, repeat: isCooking ? Infinity : 0 }}
          className="text-8xl mb-4"
        >
          🍳
        </motion.div>
        
        <AnimatePresence>
          {isCooking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4"
            >
              <div className="bg-gray-200 rounded-full h-4 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cookingProgress}%` }}
                  className="bg-avalanche-gradient h-4 rounded-full"
                />
              </div>
              <p className="text-sm text-gray-600">Cooking your Tendies... {cookingProgress}%</p>
              
              {/* Sizzling animation */}
              <div className="flex justify-center mt-2 space-x-1">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-1 h-2 bg-white rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isCooking && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Cook
            </label>
            <div className="relative">
              <input
                type="number"
                value={cookAmount}
                onChange={(e) => setCookAmount(e.target.value)}
                placeholder="Enter amount..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-avalanche-500 focus:border-avalanche-500"
                max={rawTendyBalance}
              />
              <button
                onClick={() => setCookAmount(rawTendyBalance)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-avalanche-600 hover:text-avalanche-700"
              >
                MAX
              </button>
            </div>
          </div>

          <Button
            onClick={handleCook}
            disabled={!cookAmount || parseFloat(cookAmount) <= 0 || parseFloat(cookAmount) > parseFloat(rawTendyBalance)}
            isLoading={isLoading}
            className="w-full py-3 text-lg"
          >
            🔥 Cook Tendies
          </Button>
        </div>
      )}

      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Cooking Complete!"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🍗</div>
          <p className="text-lg mb-4">
            Successfully cooked <span className="font-bold text-avalanche-600">{cookAmount}</span> Tendies!
          </p>
          <Button onClick={() => setShowSuccess(false)} className="w-full">
            Delicious! 🤤
          </Button>
        </div>
      </Modal>
    </div>
  )
}