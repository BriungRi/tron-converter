# Tron Converter

A web application for converting between TRON and Ethereum address formats.

🌐 **Live Site**: [tron-converter.com](https://tron-converter.com)

## Features

- **TRON to Ethereum**: Convert TRON addresses (Base58) to Ethereum hex format
- **Ethereum to TRON**: Convert Ethereum hex addresses to TRON format
- **Address Validation**: Built-in validation for both address formats
- **Tronscan Integration**: Direct links to view converted TRON addresses on Tronscan
- **Clean UI**: Modern, responsive interface
- **Error Handling**: Clear error messages for invalid addresses

## How It Works

The converter transforms addresses between formats while maintaining the same underlying public key:

- **TRON addresses** use Base58 encoding with a checksum
- **Ethereum addresses** use hexadecimal format with checksums

## Usage

### Web Application

1. Visit [tron-converter.com](https://tron-converter.com)
2. Choose your conversion type:
   - **TRON → Hex**: Enter a TRON address (e.g., `TRX9Pjwn...`)
   - **Hex → TRON**: Enter an Ethereum hex address (e.g., `0x742d35Cc6Bf...`)
3. Click "Convert" to see the result
4. For TRON addresses, click "View on Tronscan" to explore on the blockchain

## Local Development

### Requirements

- Node.js 20+ (see `.node-version`)
- pnpm package manager

### Getting Started

```bash
# Clone the repository
git clone https://github.com/BriungRi/tron-converter.git
cd tron-converter

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Links

- **Live Site**: [tron-converter.com](https://tron-converter.com)
- **GitHub**: [BriungRi/tron-converter](https://github.com/BriungRi/tron-converter)
- **TRON Network**: [tron.network](https://tron.network)
- **Tronscan**: [tronscan.org](https://tronscan.org)

---

Made with ❤️ for the TRON and Ethereum communities
