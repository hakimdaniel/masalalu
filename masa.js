// Language MS-MY
// Author @hakimdaniel
// Baca untuk lebih memahami kode, kalu perempuan ya tak perlu baca untuk faham dia, redha jelah.

function masaLalu(datetime) {
  const time = new Date(datetime).getTime();
  const sekarang = new Date().getTime();
  const seconds = Math.floor((sekarang - time) / 1000);

  // Jika masa berlalu lebih dari satu tahun (365 hari), kembalikan tarikh asal dalam format DD/MM/YYYY
  const satuTahun = 365 * 24 * 60 * 60; // Detik dalam setahun
  if (seconds > satuTahun) {
    const tarikh = new Date(datetime);
    const hari = String(tarikh.getDate()).padStart(2, '0');
    const bulan = String(tarikh.getMonth() + 1).padStart(2, '0'); // Bulan dalam JavaScript bermula dari 0
    const tahun = tarikh.getFullYear();
    return `${hari}/${bulan}/${tahun}`; // Format DD/MM/YYYY
  }

  // Format masa untuk pelbagai julat masa
  const time_formats = [
    [60, 'saat', 1],
    [120, '1 minit lepas', 'dalam 1 minit'],
    [3600, 'minit', 60],
    [7200, '1 jam lepas', 'dalam 1 jam'],
    [86400, 'jam', 3600],
    [172800, 'Semalam', 'Esok'],
    [604800, 'hari', 86400],
    [1209600, 'Minggu lepas', 'Minggu depan'],
    [2419200, 'minggu', 604800],
    [4838400, 'Bulan lepas', 'Bulan depan'],
    [29030400, 'bulan', 2419200]
  ];

  let token = 'lepas';
  let list_choice = 1;

  if (seconds < 0) {
    token = 'lagi';
    list_choice = 2;
  }

  for (let format of time_formats) {
    if (seconds < format[0]) {
      if (typeof format[2] === 'string') {
        return format[list_choice];
      } else {
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    }
  }

  return 'Sebentar tadi';
}

// Fungsi untuk mengemas kini setiap elemen <time> dengan kelas `time-ago` bila cukup 1 minit
function startDynamicUpdate(element) {
  const datetime = element.getAttribute('datetime');

  function updateIfNeeded() {
    const newText = masaLalu(datetime);
    if (element.innerText !== newText) {
      element.innerText = newText;
    }
  }

  updateIfNeeded();
  setInterval(updateIfNeeded, 60000); // Ulang setiap 1 minit
}

// Mulakan fungsi `masaLalu` untuk semua elemen yang ada kelas `masa-lalu`
document.querySelectorAll('.masa-lalu').forEach(el => startDynamicUpdate(el));

console.log("Success running");
console.log("Fungsi masalalu : made with github @hakimdaniel");
