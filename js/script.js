// Fungsi untuk menghitung BMI
function hitungcalcbmi(event) {
  event.preventDefault(); // Fungsi untuk mencegah user melakukan submit sebelum isi data

  // Mengambil data input dari form
  const jenisKelamin = document.querySelector(
    'input[name="jenis-kelamin-input"]:checked'
  );
  const beratBadan = parseFloat(
    document.getElementById("berat-badan-input").value
  );
  const tinggiBadan =
    parseFloat(document.getElementById("tinggi-badan-input").value) / 100; // untuk mengonversi dari cm ke m
  const usia = parseInt(document.getElementById("usia-input").value);

  // Validasi input
  if (
    !jenisKelamin ||
    isNaN(beratBadan) ||
    isNaN(tinggiBadan) ||
    isNaN(usia) ||
    beratBadan <= 0 ||
    tinggiBadan <= 0 ||
    usia <= 0
  ) {
    alert("Data yang Anda Masukkan Kosong, Silakan Lengkapi Pengisian!");
    return;
  }

  // Perhitungan BMI
  const bmi = (beratBadan / (tinggiBadan * tinggiBadan)).toFixed(2);

  // Kategori BMI
  let kategori = "";
  let infoPenjelasan = ""; // Informasi tambahan
  if (bmi < 18.5) {
    kategori = "Kekurangan berat badan";
    infoPenjelasan = `
          Anda berada dalam kategori kekurangan berat badan. 
          Penting untuk meningkatkan asupan nutrisi Anda.
          Pastikan untuk makan dengan pola yang sehat dan berkonsultasi dengan ahli gizi.
      `;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    kategori = "Normal (ideal)";
    infoPenjelasan = `
          Selamat! Anda berada dalam kategori berat badan ideal. 
          Pertahankan gaya hidup sehat Anda dengan pola makan seimbang dan rutin berolahraga.
      `;
  } else if (bmi >= 25 && bmi <= 29.9) {
    kategori = "Kelebihan berat badan";
    infoPenjelasan = `
          Anda berada dalam kategori kelebihan berat badan. 
          Pertimbangkan pola makan sehat, kurangi makanan berkalori tinggi, dan lakukan olahraga secara teratur.
      `;
  } else {
    kategori = "Kegemukan (Obesitas)";
    infoPenjelasan = `
          Anda berada dalam kategori obesitas. 
          Sebaiknya konsultasikan dengan ahli gizi untuk mendapatkan panduan yang sesuai guna menurunkan berat badan.
      `;
  }

  // Update hasil BMI
  document.getElementById("result-calculation").innerText = `${bmi}`;
  document.querySelector(
    ".form-result p:nth-child(3)"
  ).innerText = `${kategori}`;

  // Update info-penjelasan sebagai informasi tambahan
  const infoPenjelasanElement = document.querySelector(".info-penjelasan p");
  infoPenjelasanElement.innerHTML = infoPenjelasan;

  // Mengaktifkan tombol Download setelah hasil perhitungan muncul
  document.getElementById("download-bmi-pdf").disabled = false;
}

// Fungsi untuk mereset input dan hasil
function resetcalcbmi(event) {
  event.preventDefault(); // Melakukan Pencegahan pada saat user menekan tombol submit

  // Mereset inputan
  document.getElementById("berat-badan-input").value = "";
  document.getElementById("tinggi-badan-input").value = "";
  document.getElementById("usia-input").value = "";
  document
    .querySelectorAll('input[name="jenis-kelamin-input"]')
    .forEach((input) => (input.checked = false));

  // Reset hasil
  document.getElementById("result-calculation").innerText = "0";
  document.querySelector(".form-result p:nth-child(3)").innerText =
    "Anda Belum Melakukan Input Pada Form Perhitungan";

  // Reset info-penjelasan
  const infoPenjelasanElement = document.querySelector(".info-penjelasan p");
  infoPenjelasanElement.innerHTML = `
      Berikut ini penjelasan singkat mengenai hasil perhitungan Anda!
  `;

  // Menonaktifkan tombol Download
  document.getElementById("download-bmi-pdf").disabled = true;
}

// Menambahkan JavaScript untuk Mengonversi dan Mengunduh ke file PDF
document
  .getElementById("download-bmi-pdf")
  .addEventListener("click", function () {
    // Mengambil hasil BMI dan kategori
    var resultElement = document.getElementById("result-calculation"); // Hasil BMI
    var kategoriElement = document.querySelector(".form-result p:nth-child(3)"); // Kategori BMI

    // Menggunakan jsPDF untuk membuat file PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Menambahkan teks ke dalam PDF
    doc.text("Hasil Perhitungan BMI", 20, 20); // Judul
    doc.text("Hasil BMI: " + resultElement.innerText, 20, 30); // Hasil BMI

    // Menyisipkan teks dengan line wrapping
    doc.text(doc.splitTextToSize(penjelasan, maxWidth), marginLeft, startY + lineHeight);

    // Mengunduh file PDF
    doc.save("hasil_bmi.pdf");
  });


// Menambahkan event listener
document
  .getElementById("hitung-hasil")
  .addEventListener("click", hitungcalcbmi);
document.getElementById("reset-hasil").addEventListener("click", resetcalcbmi);

// Menonaktifkan tombol Download pada awal
document.getElementById("download-bmi-pdf").disabled = true;
