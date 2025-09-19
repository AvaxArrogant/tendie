import { useAccount } from 'wagmi'
import { ADMIN_ADDRESSES } from '../config/contracts'

export function useAdmin() {
  const { address } = useAccount()

  const isAdmin = address ? ADMIN_ADDRESSES.includes(address.toLowerCase()) : false

  return { isAdmin }
}