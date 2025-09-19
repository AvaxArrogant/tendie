# Tendies Web3 dApp 🍗

A production-ready Web3 dApp for the Tendies meme token ecosystem on Avalanche, featuring interactive cooking mechanics, community leaderboards, and comprehensive admin management.

## Features

### 🔥 Core Functionality
- **Token Cooking System**: Burn Raw Tendies (RAWTENDY) to mint Tendies (TENDY) with animated cooking interface
- **Web3 Integration**: Connect wallet using RainbowKit with full Avalanche support
- **Network Switching**: Seamless toggle between Avalanche Fuji testnet and mainnet
- **Real-time Balances**: Live token balance updates and transaction tracking

### 🎮 Interactive Features
- **Animated Cooking**: Sizzling frying pan animations with progress tracking
- **Easter Egg**: Click the Tendies logo 5 times for a surprise animation
- **Success Modals**: Satisfying completion confirmations with balance updates
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### 🏆 Community Features
- **Hall of Fryers**: Leaderboard showcasing top Tendies chefs
- **News & Updates**: Announcements system for team communications
- **Tendies Tracker**: Real-time statistics and ecosystem metrics
- **Community Stats**: Active user counts and cooking streaks

### 🛠️ Admin Panel (Role-Restricted)
- **Whitelist Management**: Add/remove admin addresses
- **Network Configuration**: Switch between testnet/mainnet environments
- **Contract Management**: Update token contract addresses
- **Analytics Dashboard**: View ecosystem statistics and metrics

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS with custom gradients and animations
- **Web3**: Wagmi v2 + RainbowKit for wallet connections
- **Blockchain**: Avalanche (C-Chain) with Fuji testnet support
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography

## Environment Setup

Create a `.env` file in the root directory:

```env
# Network RPCs
VITE_AVALANCHE_MAINNET_RPC=https://api.avax.network/ext/bc/C/rpc
VITE_AVALANCHE_TESTNET_RPC=https://api.avax-test.network/ext/bc/C/rpc

# Contract Addresses
VITE_RAWTENDY_CONTRACT_MAINNET=0x...
VITE_TENDY_CONTRACT_MAINNET=0x...
VITE_RAWTENDY_CONTRACT_TESTNET=0x...
VITE_TENDY_CONTRACT_TESTNET=0x...

# Admin Configuration
VITE_ADMIN_ADDRESSES=0x85E6cC88F3055b589eb1d4030863be2CFcc0763E
```

## Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, Modal)
│   ├── ConnectWallet.tsx
│   ├── TokenBalanceCard.tsx
│   ├── AnimatedCooker.tsx
│   └── Navigation.tsx
├── pages/              # Application pages
│   ├── Home.tsx
│   ├── Cook.tsx
│   ├── Leaderboard.tsx
│   ├── News.tsx
│   └── Admin.tsx
├── hooks/              # Custom React hooks
│   ├── useNetwork.ts
│   ├── useTokenBalances.ts
│   └── useAdmin.ts
├── config/             # Configuration files
│   ├── chains.ts
│   └── contracts.ts
├── providers/          # React context providers
│   └── Web3Provider.tsx
└── App.tsx
```

## Smart Contract Integration

The dApp expects ERC-20 compliant contracts with the following functions:

```solidity
// Required for Raw Tendies contract
function burn(uint256 amount) external;
function balanceOf(address account) external view returns (uint256);

// Required for Tendies contract
function mint(address to, uint256 amount) external;
function balanceOf(address account) external view returns (uint256);
```

## Security Features

- **Role-based Access**: Admin panel restricted to whitelisted addresses
- **Input Sanitization**: All user inputs validated and sanitized
- **Transaction Confirmations**: Proper wallet popups and status indicators
- **Network Validation**: Automatic network switching prompts
- **Error Handling**: Comprehensive error catching and user feedback

## Deployment

The application is ready for deployment on:
- **Netlify**: Automatic builds with environment variable support
- **Vercel**: Edge deployment with optimized performance
- **IPFS**: Decentralized hosting for true Web3 deployment

### Build Configuration
```bash
npm run build
# Output: dist/ directory ready for static hosting
```

## Admin Features

Default admin address: `0x85E6cC88F3055b589eb1d4030863be2CFcc0763E`

Admin panel includes:
- Network environment switching
- Admin whitelist management
- Contract address configuration
- Ecosystem analytics dashboard
- User management tools

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, please join our community Discord or create an issue on GitHub.

---

Built with ❤️ for the Tendies community 🍗