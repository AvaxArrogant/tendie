import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAdmin } from '../hooks/useAdmin'
import { useNetwork } from '../hooks/useNetwork'
import { Settings, Users, BarChart3, AlertTriangle, Plus, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

export function Admin() {
  const { isAdmin } = useAdmin()
  const { isTestnet, switchToTestnet, switchToMainnet } = useNetwork()
  const [adminAddresses, setAdminAddresses] = useState(['0x85E6cC88F3055b589eb1d4030863be2CFcc0763E'])
  const [newAdminAddress, setNewAdminAddress] = useState('')

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access the admin panel.</p>
        </Card>
      </div>
    )
  }

  const handleAddAdmin = () => {
    if (newAdminAddress && !adminAddresses.includes(newAdminAddress)) {
      setAdminAddresses([...adminAddresses, newAdminAddress])
      setNewAdminAddress('')
    }
  }

  const handleRemoveAdmin = (address: string) => {
    setAdminAddresses(adminAddresses.filter(addr => addr !== address))
  }

  const stats = [
    { label: 'Total Tendies Cooked', value: '1,234,567', icon: BarChart3, color: 'text-green-500' },
    { label: 'Total Raw Tendies Burned', value: '987,654', icon: BarChart3, color: 'text-red-500' },
    { label: 'Active Users (24h)', value: '2,345', icon: Users, color: 'text-blue-500' },
    { label: 'Total Transactions', value: '45,678', icon: BarChart3, color: 'text-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            🛠️ Admin Control Panel
          </h1>
          <p className="text-gray-600">
            Manage your Tendies ecosystem with powerful administrative tools.
          </p>
        </div>

        {/* Network Controls */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Settings className="mr-2" size={24} />
            Network Configuration
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-2">Current Network:</p>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                isTestnet ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {isTestnet ? 'Avalanche Fuji (Testnet)' : 'Avalanche Mainnet'}
              </span>
            </div>
            <div className="space-x-4">
              <Button
                onClick={switchToTestnet}
                variant={isTestnet ? 'primary' : 'secondary'}
                size="sm"
              >
                Switch to Testnet
              </Button>
              <Button
                onClick={switchToMainnet}
                variant={!isTestnet ? 'primary' : 'secondary'}
                size="sm"
              >
                Switch to Mainnet
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(({ label, value, icon: Icon, color }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6" hover>
                <div className="flex items-center justify-between mb-2">
                  <Icon className={color} size={24} />
                  <span className="text-2xl font-bold">{value}</span>
                </div>
                <p className="text-gray-600 text-sm">{label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Admin Management */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Users className="mr-2" size={24} />
            Admin Whitelist Management
          </h2>
          
          {/* Add Admin */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add New Admin Address
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={newAdminAddress}
                onChange={(e) => setNewAdminAddress(e.target.value)}
                placeholder="0x..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <Button onClick={handleAddAdmin} disabled={!newAdminAddress}>
                <Plus size={16} className="mr-1" />
                Add Admin
              </Button>
            </div>
          </div>

          {/* Admin List */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Current Admins ({adminAddresses.length})</h3>
            <div className="space-y-3">
              {adminAddresses.map((address, index) => (
                <motion.div
                  key={address}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <code className="bg-white px-2 py-1 rounded text-sm">{address}</code>
                  </div>
                  {adminAddresses.length > 1 && (
                    <Button
                      onClick={() => handleRemoveAdmin(address)}
                      variant="danger"
                      size="sm"
                    >
                      <Trash2 size={14} />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* Contract Configuration */}
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Settings className="mr-2" size={24} />
            Contract Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Testnet Contracts</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Raw Tendies Contract
                  </label>
                  <input
                    type="text"
                    defaultValue="0x..."
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tendies Contract
                  </label>
                  <input
                    type="text"
                    defaultValue="0x..."
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Mainnet Contracts</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Raw Tendies Contract
                  </label>
                  <input
                    type="text"
                    defaultValue="0x..."
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tendies Contract
                  </label>
                  <input
                    type="text"
                    defaultValue="0x..."
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button>Save Configuration</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}