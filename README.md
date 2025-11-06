<div align="center">
  <h1 align="center">TekkaDot</h1>
  <div>
    <img alt="Static Badge" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=%23000000&labelColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwind%20css&logoColor=%2306B6D4&labelColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=%23000000&labelColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=%234169E1&labelColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/IPFS-65C2CB?style=for-the-badge&logo=ipfs&logoColor=%2365C2CB&labelColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/Polkadot-E6007A?style=for-the-badge&logo=polkadot&logoColor=%23E6007A&labelColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=%23363636&labelColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=%232496ED&labelColor=white">
  </div>
   <div align="center">
     Official GitHub repository for TekkaDot, providing client & server source code.
   </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. 🔋 [Features](#features)
3. ⚙️ [Tech Stack](#tech-stack)
4. 🔗 [License](#license)


## <a name="introduction">🤖 Introduction</a>
TekkaDot is a Web3-powered e-commerce platform where users can buy, sell, and trade technology products and NFTs in a decentralized environment. Our goal is to make digital and physical tech assets accessible through a secure, transparent, and community-driven marketplace.


## <a name="features">🔋 Features</a>

👉 **Wallet-based authentication**: Log in securely with your SubWallet - no usernames, no passwords, just your Web3 identity.

👉 **Decentralized marketplace**: Buy, sell, and trade both **tech products** (consoles, phones, components, etc.) and **NFTs** in a decentralized environment.

👉 **P2P messaging**: Chat directly with other users to coordinate deliveries, ask questions, or negotiate trades through a messaging system.

👉 **DOT payments**: All transactions are handled in Polkadot's native token (**DOT**), ensuring fast, secure, and non-custodial payments.

👉 **Dual storefronts**: Browse **separate storefronts** for physical tech and NFTs, while enjoying a **unified checkout cart** that supports both.

👉 **Proof-of-purchase NFTs**: Every purchase mints a **digital receipt NFT,** giving you verifiable ownership and product history.

👉 **Community-verifiable history**: Track each product's lifecycle - from listing, price changes, and discounts to final purchase - all transparently recorded.

👉 **Counterfeit detection AI**: An assistive AI agent analyzes product images and metadata, providing **confidence scores** for authenticity, complemented by community verification.

👉 **Loyalty tokens**: Earn tokens for regular activity (buying, selling, trading) and redeem them for **discounts, perks, or exclusive access**.

👉 **Wallet-based notifications**: Get order updates, promotions, and newsletters directly in your SubWallet.

👉 **Privacy-first storage**: Product identifiers are stored off-chain with verifiable hashes, while images and media are hosted in **decentralized storage**.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Next.js 16](https://nextjs.org/)** is a React-based framework maintained by Vercel. It provides server-side rendering, static site generation, and API routes out of the box, making it ideal for building performant, SEO-friendly e-commerce storefronts. Combined with TypeScript, it ensures scalability and maintainability for complex applications.

- **[Tailwind CSS v4.1](https://tailwindcss.com/)** is a utility-first CSS framework that enables rapid UI development with pre-defined utility classes. It ensures a consistent design system across the platform while allowing developers to customize components without writing large amounts of custom CSS.

- **[Express.js](https://expressjs.com/)** is a minimal, unopinionated backend web application framework for Node.js, maintained by the OpenJS Foundation. It simplifies server-side development by providing robust routing, middleware support, and HTTP utility methods, allowing developers to build APIs and web servers efficiently.

- **[PostgreSQL](https://www.postgresql.org/)** is a powerful open-source relational database. It is used to manage off-chain data such as product metadata, user activity logs, and cached AI results, ensuring reliability and strong data integrity.

- **[IPFS](https://ipfs.tech/)** (InterPlanetary File System) is a peer-to-peer protocol for storing and sharing files in a distributed way. It ensures product images and metadata are content-addressed and immutable, with only their hashes anchored on-chain.
  
- **[Filecoin](https://filecoin.io/)** is a decentralized storage network built on top of IPFS. It provides long-term, verifiable storage with economic incentives, ensuring that product media and metadata remain reliably available over time.

- **[Polkadot Asset Hub](https://wiki.polkadot.network/docs/learn-assets)** is the parachain used to issue warranty NFTs, proof-of-purchase tokens, and loyalty tokens. It ensures interoperability across the Polkadot ecosystem and provides a secure, decentralized settlement layer.

- **[Solidity](https://soliditylang.org/)** is the smart contract programming language used within Asset Hub’s EVM environment. It powers the escrow logic for DOT payments, marketplace registry, and loyalty token mechanics.

- **[SubWallet](https://subwallet.app/)** is the Web3 wallet used for authentication, transaction signing, and asset management. It allows users to log in, pay with DOT, and receive NFTs directly in their wallet.

- **[Subscan](https://subscan.io/)** is a blockchain explorer for Substrate-based chains. It allows users to verify transactions, NFT minting events, and escrow settlements directly on-chain, with “View on Subscan” links integrated into the UI.

- **[Phala Network](https://phala.network/)** provides a confidential AI environment running inside secure enclaves. It powers counterfeit detection by analyzing product images and serials, producing verifiable attestations anchored on-chain.

- **[Polkadot.js](https://polkadot.js.org/)** is the official JavaScript API library for interacting with Polkadot and Substrate-based chains. It complements SubWallet integration and enables seamless blockchain interactions from the client.

- **[Push Protocol](https://push.org/)** integrates decentralized notifications and newsletters. Users receive promotions, order updates, and alerts directly in their SubWallet, ensuring wallet-native communication consistent with Web3 principles.

- **[Docker](https://www.docker.com/)** is used for DevOps, ensuring consistent development and deployment environments across the team. It packages the application and dependencies into portable containers, simplifying testing and scaling.

## <a name="license">🔗 License</a>
This project is licensed under the MIT License.
