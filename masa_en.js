

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
    [60, 'seconds', 1],
    [120, '1 minute ago', 'in 1 minute'],
    [3600, 'minutes', 60],
    [7200, '1 hour ago', 'in 1 hour'],
    [86400, 'hours', 3600],
    [172800, 'Yesterday', 'Tomorrow'],
    [604800, 'days', 86400],
    [1209600, 'Last week', 'Next week'],
    [2419200, 'weeks', 604800],
    [4838400, 'Last month', 'Next month'],
    [29030400, 'months', 2419200]
  ];

  let token = 'ago';
  let list_choice = 1;

  if (seconds < 0) {
    token = 'from now';
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

  return 'Just now';
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

// Mulakan fungsi `masaLalu` untuk semua elemen yang ada kelas `time-ago`
document.querySelectorAll('.time-ago').forEach(el => startDynamicUpdate(el));

console.log("Success running");
console.log("Fungsi masalalu : made with github @hakimdaniel");
