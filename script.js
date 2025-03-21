// Varsayılan olarak Kullanıcı ID'sini Kullanıcı 1 ID'si olarak ayarlıyoruz
const userId = document.getElementById('user-id').textContent;
document.querySelector('.user-profile:first-child span').textContent = userId;

let timeLeft = 30 * 60; // 30 dakika
const countdownEl = document.getElementById('countdown');
const startButton = document.getElementById('start-button');
let countdownInterval; // Interval değişkenini tanımlıyoruz
const checkButtons = document.querySelectorAll('.check-button'); // Kontrol Et butonlarını seçiyoruz
const balanceEl = document.getElementById('balance');
let balance = parseInt(balanceEl.textContent.split(':')[1].trim()); // Bakiyeyi al
const betAmountSelect = document.getElementById('bet-amount');

function updateCountdown() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    countdownEl.innerHTML = `${minutes}:${seconds}`;
    timeLeft--;

    if (timeLeft === 20 * 60) { // 10 dakika sonra
        enableCheckButtons(); // Kontrol Et butonlarını aktif hale getir
    }

    if (timeLeft < 0) {
        clearInterval(countdownInterval);
        countdownEl.innerHTML = 'Mücadele Süresi Doldu!';
        startButton.disabled = false; // Butonu tekrar aktif hale getir
        disableCheckButtons(); // Kontrol Et butonlarını pasifleştir
    }
}

function disableCheckButtons() {
    checkButtons.forEach(button => {
        button.disabled = true; // Her Kontrol Et butonunu pasifleştir
    });
}

function enableCheckButtons() {
    checkButtons.forEach(button => {
        button.disabled = false; // Her Kontrol Et butonunu aktif hale getir
    });
}

startButton.addEventListener('click', () => {
    // Mücadele başlatma işlemleri
    const betAmount = parseInt(betAmountSelect.value);
    if (balance >= betAmount) {
        balance -= betAmount;
        balanceEl.textContent = `Bakiye: ${balance} TL`;
        const winAmount = (betAmount * 2) * 0.85; // %15 kesinti
        document.getElementById('win-amount').textContent = `Kazanılacak Tutar: ${winAmount} TL`;
        countdownInterval = setInterval(updateCountdown, 1000); // Interval'ı başlatıyoruz
        startButton.disabled = true; // Butonu pasif hale getir
        disableCheckButtons(); // Geri sayım başladığında butonlar pasif
        betAmountSelect.disabled = true; // Bahis seçimi pasif
    } else {
        alert('Yetersiz Bakiye!');
    }
});

checkButtons.forEach(button => {
    button.addEventListener('click', () => {
        const link = button.dataset.link; // Butonun data-link özelliğini al
        if (link) {
            window.open(link, '_blank'); // Linki yeni sekmede aç
        }
    });
});
