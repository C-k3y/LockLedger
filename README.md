# LockLedger - Decentralized Smart Escrow for Freelancers

## 🚀 Overview
LockLedger is a decentralized smart escrow platform that ensures **secure, trustless payments** between freelancers and clients.  
It eliminates middlemen, reduces platform fees, and introduces advanced features like milestone-based payments, automatic release timers, and on-chain reputation tracking.

Freelancers often face **payment delays, disputes, and scams**, while clients risk paying upfront without assurance.  
LockLedger solves this by leveraging blockchain smart contracts to guarantee fair, transparent, and global payments.

---

## ✨ Key Features
- **Milestone-Based Payments** – Split projects into multiple milestones, each with its own escrow release.
- **Automatic Release Timer** – Funds auto-release if a client fails to respond within a set time (e.g., 72 hours).
- **On-Chain Reputation System** – Freelancers build a portable trust score tied to their wallet.
- **Proof of Work Submission** – Upload evidence (GitHub repo, deployed site, files) stored on IPFS.
- **Optional Dispute Voting** – Neutral community reviewers vote to resolve disputes.
- **Global Cross-Border Payments** – Instant crypto payments without banks or PayPal restrictions.

---

## 🛠 Tech Stack
- **Frontend:** React / Next.js, TailwindCSS, ethers.js  
- **Smart Contracts:** Solidity (Hardhat / Foundry)  
- **Blockchain:** Ethereum Sepolia Testnet  
- **Wallet Integration:** MetaMask  
- **Storage:** IPFS for proof-of-work uploads

---

## 📂 Project Structure

lockledger/

│── contracts/        # Solidity smart contracts

│── frontend/         # React/Next.js UI

│── scripts/          # Deployment & testing scripts

│── test/             # Smart contract tests

│── README.md         # Project documentation

---

## ⚡ Demo Flow
1. **Connect Wallet** – User connects via MetaMask.  
2. **Create Job** – Client creates job contract and deposits funds.  
3. **Milestone Completion** – Freelancer marks milestone as complete.  
4. **Approval or Auto-Release** – Client approves OR timer auto-releases funds.  
5. **Reputation Update** – Freelancer’s wallet reputation score increases.  

---

## 🎯 Impact
- Protects freelancers from scams & payment delays  
- Provides clients with secure, transparent payment assurance  
- Builds a **portable reputation system** controlled by users  
- Enables **global freelancing without borders**  

---

## 📜 License
MIT License – Free to use, modify, and distribute.

---

## 🔖 Tagline
**"LockLedger – Trustless payments for freelancers."**  


