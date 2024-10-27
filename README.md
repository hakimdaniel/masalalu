# masalalu
Ini lah script javascript menetapkan masa lalu seperti timeago.js, tetapi ini rekaan sendiri dalam bahasa melayu.

# penggunaan
Link-kan source code script javascript masa.js ke source code website anda.

letakkan di akhir sebelum penutup body
```html
<script src="https://hakimdaniel.github.io/masalalu/masa.js"></script>
```

dan seterusnya anda boleh terus menggunakannya.

# cara
guna salah satu ini sebagai contoh saja.

letakkan di konten anda dan ubah pada tarikh masa itu.
```html
<time class="masa-lalu" datetime="2024-10-25T14:30:00">Sekarang</time>


<time class="masa-lalu" datetime="2024-10-26T10:20:00">Sekarang</time>
```
class `masa-lalu` ialah untuk update display setiap satu minit

Attribute `datetime` declare masa yang ditetapkan dan compare dengan masa sekarang pada masa itu.

Format ``2024-09-20T12:00:00``

dikiri/sebelum `T` ialah tarikh `<tahun><bulan><hari>`

dikanan/selepas `T` ialah masa `<jam><minit><saat>`

digabungkan
```
<tahun><bulan><hari>T<jam><minit><saat>
```
