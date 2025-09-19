import { useReadContract, useAccount } from 'wagmi'
import { formatUnits } from 'viem'
import { CONTRACT_ADDRESSES, ERC20_ABI } from '../config/contracts'
import { useNetwork } from './useNetwork'

export function useTokenBalances() {
  const { address } = useAccount()
  const { isTestnet } = useNetwork()

  const contracts = isTestnet ? CONTRACT_ADDRESSES.TESTNET : CONTRACT_ADDRESSES.MAINNET

  const { data: rawTendyBalance, isLoading: rawTendyLoading } = useReadContract({
    address: contracts.RAWTENDY as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const { data: tendyBalance, isLoading: tendyLoading } = useReadContract({
    address: contracts.TENDY as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  return {
    rawTendyBalance: rawTendyBalance ? formatUnits(rawTendyBalance, 18) : '0',
    tendyBalance: tendyBalance ? formatUnits(tendyBalance, 18) : '0',
    isLoading: rawTendyLoading || tendyLoading,
  }
}