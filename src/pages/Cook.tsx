import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { AnimatedCooker } from '../components/AnimatedCooker'
import { TokenBalanceCard } from '../components/TokenBalanceCard'
import { Card } from '../components/ui/Card'
import { useTokenBalances } from '../hooks/useTokenBalances'
import { useNetwork } from '../hooks/useNetwork'
import { CONTRACT_ADDRESSES, ERC20_ABI } from '../config/contracts'
import { toast } from 'react-hot-toast'

export function Cook() {
  const { rawTendyBalance, tendyBalance, isLoading: balancesLoading } = useTokenBalances()
  const { isTestnet } = useNetwork()
  const [lastTxHash, setLastTxHash] = useState<string>()

  const contracts = isTestnet ? CONTRACT_ADDRESSES.TESTNET : CONTRACT_ADDRESSES.MAINNET

  const { writeContract, isPending, error } = useWriteContract()
  
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: lastTxHash as `0x${string}`,
  })

  const handleCook = async (amount: string) => {
    try {
      const amountInWei = parseUnits(amount, 18)
      
      const result = await writeContract({
        address: contracts.RAWTENDY as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'burn',
        args: [amountInWei],
      })

      setLastTxHash(result)
      toast.success('Cooking started! 🔥')
      
    } catch (err) {
      console.error('Cooking failed:', err)
      toast.error('Failed to start cooking')
      throw err
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            🔥 Cook Your Tendies
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your Raw Tendies into delicious, golden cooked Tendies! 
            Each Raw Tendy burns to create one perfectly cooked Tendy.
          </p>
        </div>

        {/* Token Balances */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
          <TokenBalanceCard token="RAWTENDY" balance={rawTendyBalance} isLoading={balancesLoading} />
          <TokenBalanceCard token="TENDY" balance={tendyBalance} isLoading={balancesLoading} />
        </div>

        {/* Cooking Interface */}
        <Card className="p-8 max-w-2xl mx-auto mb-8">
          <AnimatedCooker
            onCook={handleCook}
            rawTendyBalance={rawTendyBalance}
            isLoading={isPending || isConfirming}
          />
        </Card>

        {/* Cooking Instructions */}
        <Card className="p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center">How to Cook 📖</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">1</span>
              <div>
                <h3 className="font-semibold">Enter Amount</h3>
                <p className="text-gray-600">Choose how many Raw Tendies you want to cook</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">2</span>
              <div>
                <h3 className="font-semibold">Start Cooking</h3>
                <p className="text-gray-600">Click the cook button and confirm the transaction</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">3</span>
              <div>
                <h3 className="font-semibold">Enjoy Your Tendies!</h3>
                <p className="text-gray-600">Watch the cooking animation and receive your cooked Tendies</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}