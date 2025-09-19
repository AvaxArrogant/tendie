export const CONTRACT_ADDRESSES = {
  MAINNET: {
    RAWTENDY: import.meta.env.VITE_RAWTENDY_CONTRACT_MAINNET || '0x0000000000000000000000000000000000000000',
    TENDY: import.meta.env.VITE_TENDY_CONTRACT_MAINNET || '0x0000000000000000000000000000000000000000',
  },
  TESTNET: {
    RAWTENDY: import.meta.env.VITE_RAWTENDY_CONTRACT_TESTNET || '0x0000000000000000000000000000000000000000',
    TENDY: import.meta.env.VITE_TENDY_CONTRACT_TESTNET || '0x0000000000000000000000000000000000000000',
  },
} as const

export const ADMIN_ADDRESSES = (import.meta.env.VITE_ADMIN_ADDRESSES || '').split(',')

// ERC20 ABI for token interactions
export const ERC20_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const