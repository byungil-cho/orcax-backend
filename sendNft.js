// sendNft.js
import { Connection, PublicKey, Keypair, clusterApiUrl } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import bs58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = bs58.decode(process.env.SOLANA_PRIVATE_KEY);
const wallet = Keypair.fromSecretKey(PRIVATE_KEY);

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(wallet))
  .use(bundlrStorage());

export async function sendNft(recipientAddress, mintAddress) {
  const recipient = new PublicKey(recipientAddress);
  const mint = new PublicKey(mintAddress);

  const { response } = await metaplex.nfts().send({
    mintAddress: mint,
    toOwner: recipient,
  });

  return response.signature;
}

app.listen(PORT, () => {
  console.log(`🟢 NFT 서버 실행됨: http://localhost:${PORT}`);
});

