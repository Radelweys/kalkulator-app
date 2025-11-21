// Ambil elemen display
const display = document.getElementById('display');

// Fungsi untuk menambahkan nilai ke display
function appendToDisplay(value) {
  // Fungsi ini menangani input angka dan operator
  if (['+', '-', '*', '/'].includes(value)) {
    if (display.value === '' && value !== '-') return; // Tidak boleh operator kecuali '-' di awal

    // Cek jika karakter terakhir adalah operator, ganti operatornya
    const lastChar = display.value.slice(-1);
    if (['+', '-', '×', '/'].includes(lastChar)) {
      // Mengganti operator yang ditampilkan
      const operatorToDisplay = (value === '*') ? '×' : value;
      display.value = display.value.slice(0, -1) + operatorToDisplay;
      return;
    }

    // Ganti '*' dari keyboard menjadi '×' untuk tampilan
    if (value === '*') {
      value = '×';
    }
  }

  // Batasi panjang input
  if (display.value.length > 20) return;

  // Tambahkan nilai ke display
  display.value += value;
}

// Fungsi untuk menghitung hasil
function calculateResult() {
  let expression = display.value;
  try {
    // Ganti simbol '×' (dari tombol) menjadi '*' agar bisa dievaluasi oleh eval
    expression = expression.replace(/×/g, '*');

    // Gunakan fungsi eval untuk menghitung ekspresi (hati-hati, ini untuk demo sederhana)
    const result = eval(expression);

    if (isNaN(result) || !isFinite(result)) {
      display.value = 'Error';
    } else {
      // Batasi panjang hasil
      display.value = result.toString().substring(0, 16);
    }
  } catch (e) {
    display.value = 'Error';
  }
}

// Fungsi untuk mengosongkan display
function clearDisplay() {
  display.value = '';
}

// --- Fungsi untuk menangani input Keyboard (Penambahan terbaru) ---
function handleKeyPress(event) {
  const key = event.key;

  // Angka (0-9) dan Titik Desimal
  if (/[0-9.]/.test(key)) {
    appendToDisplay(key);
  }
  // Operator: * (keyboard) akan dikirim sebagai '×' ke appendToDisplay
  else if (key === '+') {
    appendToDisplay('+');
  } else if (key === '-') {
    appendToDisplay('-');
  } else if (key === '/') {
    appendToDisplay('/');
  } else if (key === '*') {
    appendToDisplay('×'); // Gunakan '×' untuk tampilan operator perkalian
  }

  // Tombol Enter atau Sama Dengan
  else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculateResult();
  }
  // Tombol Escape (Clear)
  else if (key === 'Escape') {
    clearDisplay();
  }
  // Tombol Backspace (Hapus satu karakter)
  else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  }
}

// --- Pasang Event Listener ---
document.addEventListener('keydown', handleKeyPress);

