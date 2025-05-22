const modal = document.getElementById("orderModal");
const form = document.getElementById("orderForm");

function openModal(title, price) {
  modal.style.display = "flex";
  document.getElementById("unitPrice").value = price;
  updateSummary();
}

function closeModal() {
  modal.style.display = "none";
}

function openDesc(title, text) {
  document.getElementById("descModal").style.display = 'flex';
  document.getElementById("descTitle").innerText = title;
  document.getElementById("descText").innerText = text;
}

function closeDesc() {
  document.getElementById("descModal").style.display = 'none';
}

form.quantity.addEventListener("input", updateSummary);

function updateSummary() {
  const qty = parseInt(form.quantity.value);
  const unit = parseInt(document.getElementById("unitPrice").value);
  const total = qty * unit;
  const bonus = Math.floor(qty / 10);
  const nftTotal = qty + bonus;
  document.getElementById("orderSummary").innerHTML =
    `총액: ${total.toLocaleString()} ORCX<br>보너스: ${bonus}장<br>총 NFT 수령 수량: ${nftTotal}장`;
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  closeModal();

  const name = form.name.value;
  const phone = form.phone.value;
  const wallet = form.wallet.value;
  const quantity = parseInt(form.quantity.value);
  const unitPrice = parseInt(document.getElementById("unitPrice").value);
  const nft = `${quantity} x ${unitPrice.toLocaleString()} ORCX`;

  try {
    const res = await fetch("/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        wallet,
        quantity,
        nft
      })
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ 주문 접수 완료! 알림 전송 성공!");
    } else {
      alert("❌ 알림 전송 실패: " + result.error);
    }
  } catch (err) {
    console.error("알림 전송 에러:", err);
    alert("⚠️ 네트워크 오류 또는 서버 문제!");
  }
});

function copyWallet() {
  const addr = document.getElementById("walletAddress");
  addr.select();
  addr.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("지갑 주소가 복사되었습니다!");
}
