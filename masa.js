// Fungsi untuk mengira masa berlalu dalam bahasa Melayu
function masaLalu(datetime) {
  // Tukarkan nilai tarikh ke dalam format timestamp
  const time = new Date(datetime).getTime();
  const sekarang = new Date().getTime(); // Masa sekarang
  const seconds = Math.floor((sekarang - time) / 1000); // Masa berlalu dalam saat

  // Format masa yang digunakan untuk pelbagai julat masa
  const time_formats = [
    [60, 'saat', 1],                  // Dalam masa 60 saat, paparkan 'saat'
    [120, '1 minit lepas', 'dalam 1 minit'], // Lebih dari 1 minit tetapi kurang dari 2 minit
    [3600, 'minit', 60],              // Dalam masa 1 jam, paparkan dalam 'minit'
    [7200, '1 jam lepas', 'dalam 1 jam'],   // Sekitar 1 hingga 2 jam
    [86400, 'jam', 3600],             // Dalam masa 1 hari, paparkan dalam 'jam'
    [172800, 'Semalam', 'Esok'],      // Untuk sehari yang lepas atau hari esok
    [604800, 'hari', 86400],          // Dalam masa seminggu, paparkan dalam 'hari'
    [1209600, 'Minggu lepas', 'Minggu depan'], // Minggu lepas atau minggu depan
    [2419200, 'minggu', 604800],      // Dalam masa sebulan, paparkan dalam 'minggu'
    [4838400, 'Bulan lepas', 'Bulan depan'], // Bulan lepas atau bulan depan
    [29030400, 'bulan', 2419200],     // Dalam masa setahun, paparkan dalam 'bulan'
    [58060800, 'Tahun lepas', 'Tahun depan'], // Tahun lepas atau tahun depan
    [2903040000, 'tahun', 29030400]   // Untuk beberapa tahun yang lepas
  ];

  let token = 'lepas';       // Digunakan untuk masa yang sudah berlalu
  let list_choice = 1;       // Pilihan untuk masa yang sudah berlalu

  // Jika masa yang diberikan di masa depan, tukar token ke 'lagi'
  if (seconds < 0) {
    token = 'lagi';
    list_choice = 2;
  }

  // Lakukan perbandingan dengan format masa dan kembalikan teks masa berlalu
  for (let format of time_formats) {
    if (seconds < format[0]) { // Jika masa berlalu kurang dari julat masa format
      if (typeof format[2] === 'string') { // Jika format kedua adalah string (teks penuh)
        return format[list_choice]; 
      } else {
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    }
  }

  return 'Sebentar tadi'; // Jika tiada format yang sesuai, paparkan 'Sebentar tadi'
}

// Fungsi untuk memulakan kemas kini teks masa setiap elemen <time> dengan kelas `time-ago`
function startDynamicUpdate(element) {
  const datetime = element.getAttribute('datetime'); // Dapatkan tarikh dari atribut datetime

  // Fungsi untuk kemas kini teks masa jika diperlukan
  function updateIfNeeded() {
    const newText = masaLalu(datetime); // Kira masa berlalu
    if (element.innerText !== newText) { // Jika teks telah berubah
      element.innerText = newText; // Kemas kini teks dalam elemen
    }
  }

  // Kemas kini teks masa sekarang, dan setkan interval untuk mengemas kini setiap 1 minit
  updateIfNeeded();
  setInterval(updateIfNeeded, 60000); // Ulangi setiap 1 minit (60000 milisaat)
}

// Memulakan fungsi `timeAgo` untuk semua elemen dengan kelas `time-ago`
document.querySelectorAll('.masa-lalu').forEach(el => startDynamicUpdate(el));

console.log("Fungsi masalalu : made with github @hakimdaniel");
