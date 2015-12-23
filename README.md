# myD3js-pelabuhanIndonesia

Data Transportasi Laut Indonesia Perprovinsi

-- Saya memilih data dengan judul : Data Bongkar dan muat barang melalui jalur transportasi laut
 
Alamat : http://data.go.id/dataset/data-bongkar-dan-muat-barang-melalui-jalur-transportasi-laut

Alamat data :

http://data.go.id/dataset/63db3064-1183-4afc-980f-b5089685095e/resource/c0de5494-44ba-4da3-843e-484a4da067f7/download/transportasilautperprovinsi2009.csv

Alasan saya memilih data tersebut :

Seperti yang kita ketahui bersama, pelabuhan memiliki peran penting dalam distribusi barang dan jasa. Walaupun tergolong memakan waktu yang cukup lama, namun untuk mendistribusikan barang dan jasa di wilayah Nusantara yang di dominasi oleh banyak pulau dan dipisahkan oleh lautan, transportasi laut masih merupakan sarana terbaik yang kita andalkan.

Berdasarkan data dari data.go.id, kami mencoba lebih menjabarkan data tersebut dengan 2 tipe visualisi data, yaitu peta untuk menunjukan lokasi dan barchart yang lebih menampilkan perbandingan ekspor, import dan selisih ekpor impor dari tiap pelabuhan yang kita miliki.

Melalui data ini diharapkan kita dapat mengetahui pelabuhan yang manakah yang paling banyak memuat barang untuk di kirim, membongkar barang yang diterima, juga selisihnya. Dengan semakin banyak/sibuknya pelabuhan tersebut, tentu akan berdampak besar terhadap perkembangan dan pembangunan di wilayah tersebut.

Analisa yang digunakan dalam merancang web-nya.

Cara yang cukup memudahkan viewer dalam memahami data tersebut adalah dengan memberikan perbandingan yang jelas dari setiap pelabuhan berdasarkan data yang kami terima, dengan bar-chart maka dapat dengan mudah terlihat mana pelabuhan yang paling besar selisih ekspor impornya, muat dan bongkar. Selain itu, untuk menambah bayangan yang lebih mudah dicerna mengenai dimana sajakah pelabuhan tersebut berada, maka kami menambahkan juga peta Indonesia yang dilengkapi juga dengan tanda/letak pelabuhan sesuai dengan koordinat yang terdapat pada file csv dari data.go.id. 

Adapun langkah-langkah yang saya lakukan dalam membuat data visualisasi ini adalah :

1. Membuat dan setting peta antara data geojson dengan koordinat pada data data.go.di yg terdapat di file csv.

2. Menambahkan animasi zoom map sebagai nilai tambah.

3. Saya membuat bar-chart-nya.

4. Menambahkan animasi sorting barchart sebagai nilai tambah.

5. Saya mendesain layout sederhana sebagai tempat peta, juga bar-chartnya, layout simple tapi diharapkan dapat menunjukan hal tersebut.

6. Menambahkan artikel sebagai pendahuluan dan isi yang lebih kurang mencoba membantu viewer dalam memahami data visualnya.

7. Menambahkan link-link yang berhubungan dan fitur share.


credits lainnya :

1. contoh sorting barchart dari http://bl.ocks.org/slnader/9452976

2. d3js example n community (map dsb).

3. peta Indonesia geojson dari : https://bitbucket.org/rifani/geojson-political-indonesia/src

Link-link profile untuk lebih mengenal developer :

1. Link terdapat di website.

2. atau dapat mengunjungi http://fantaseen7.blogspot.co.id

3. Fantaseen fb di : https://www.facebook.com/fantaseen

ps. view websitenya dapat di lihat/di akses melalui link : http://abdulmuhit.github.io/myD3js-pelabuhanIndonesia/index.html

Terimakasih
