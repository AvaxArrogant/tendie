import { useChainId, useSwitchChain } from 'wagmi'
import { avalanche, avalancheFuji } from '../config/chains'

export function useNetwork() {
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const isTestnet = chainId === avalancheFuji.id
  const isMainnet = chainId === avalanche.id
  const isCorrectNetwork = isTestnet || isMainnet

  const switchToTestnet = () => switchChain({ chainId: avalancheFuji.id })
  const switchToMainnet = () => switchChain({ chainId: avalanche.id })

  return {
    chainId,
    isTestnet,
    isMainnet,
    isCorrectNetwork,
    switchToTestnet,
    switchToMainnet,
    currentNetwork: isTestnet ? 'testnet' : isMainnet ? 'mainnet' : 'unknown'
  }
}