// sendNft.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Metaplex, keypairIdentity, bundlrStorage } from '@metaplex-foundation/js';
import dotenv from 'dotenv';
import bs58 from 'bs58';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// 🔑 지갑 키 로딩
const PRIVATE_KEY = process.env.SOLANA_PRIVATE_KEY;
const keypair = bs58.decode(PRIVATE_KEY);
const wallet = web3.Keypair.fromSecretKey(keypair);

// 🔌 Solana 연결
const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());

// 🎯 NFT 전송 함수
async function sendNft(recipientAddress, mintAddress) {
  const recipient = new PublicKey(recipientAddress);
  const mint = new PublicKey(mintAddress);

  const { response } = await metaplex.nfts().send({
    mintAddress: mint,
    toOwner: recipient,
  });

  return response.signature;
}

// 📡 API 라우터
app.post('/api/send-nft', async (req, res) => {
  const { recipient, mintAddress } = req.body;

  if (!recipient || !mintAddress) {
    return res.status(400).json({ message: 'recipient와 mintAddress는 필수입니다.' });
  }

  try {
    const tx = await sendNft(recipient, mintAddress);
    res.status(200).json({ message: 'NFT 전송 성공!', tx });
  } catch (err) {
    console.error('전송 실패:', err);
    res.status(500).json({ message: 'NFT 전송 실패', error: err.message });
  }
});

// 🧪 서버 확인 라우터
app.get('/', (req, res) => {
  res.send('OrcaX 실전 NFT API 서버 가동 중 🚀');
});

app.listen(PORT, () => {
  console.log(`🟢 NFT 서버 실행됨: http://localhost:${PORT}`);
});

