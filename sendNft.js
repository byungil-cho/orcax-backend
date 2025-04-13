// sendNft.js

const { ethers } = require("ethers");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC = process.env.POLYGON_RPC;
const CONTRACT_ADDRESS = process.env.NFT_CONTRACT;

const abi = [
  "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) external",
  "function balanceOf(address account, uint256 id) view returns (uint256)"
];

const provider = new ethers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const nftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

async function sendNFT({ to, tokenId, amount = 1 }) {
  try {
    if (!to || !tokenId) throw new Error("to 주소와 tokenId는 필수입니다");

    const from = await wallet.getAddress();
    console.log(`🚚 NFT 전송 시도: From ${from} → To ${to} (ID: ${tokenId}, 수량: ${amount})`);

    const balance = await nftContract.balanceOf(from, tokenId);
    if (balance < amount) {
      throw new Error(`보유 수량 부족: 보유 ${balance}, 요청 ${amount}`);
    }

    const tx = await nftContract.safeTransferFrom(
      from,
      to,
      tokenId,
      amount,
      "0x"
    );

    console.log(`📦 트랜잭션 전송 중... TX: ${tx.hash}`);
    await tx.wait();
    console.log("✅ 전송 성공!");

    return {
      success: true,
      message: "NFT 전송 완료",
      txHash: tx.hash,
    };
  } catch (err) {
    console.error("❌ 전송 실패:", err.message);
    return {
      success: false,
      message: err.message,
    };
  }
}

// 직접 실행할 때만 테스트 실행
if (require.main === module) {
  sendNFT({
    to: "0xDc579E3d2aA71Ce354719f45A3910b7b7B899B8B",
    tokenId: 2,
    amount: 1,
  }).then(console.log);
}

module.exports = sendNFT;
