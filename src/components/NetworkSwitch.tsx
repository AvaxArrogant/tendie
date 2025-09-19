import { useNetwork } from '../hooks/useNetwork'
import { Wifi, WifiOff } from 'lucide-react'

export function NetworkSwitch() {
  const { isTestnet, isMainnet, isCorrectNetwork, switchToTestnet, switchToMainnet } = useNetwork()

  if (!isCorrectNetwork) {
    return (
      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
        <WifiOff className="text-red-500" size={20} />
        <span className="text-red-700 text-sm">Please connect to Avalanche network</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Wifi className="text-green-500" size={16} />
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={switchToTestnet}
          className={`px-3 py-1 rounded text-sm transition-all ${
            isTestnet
              ? 'bg-white shadow text-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Testnet
        </button>
        <button
          onClick={switchToMainnet}
          className={`px-3 py-1 rounded text-sm transition-all ${
            isMainnet
              ? 'bg-white shadow text-gray-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Mainnet
        </button>
      </div>
    </div>
  )
}