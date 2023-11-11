const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Masukkan kata kunci pencarian: ', function(searchInput) {
  // Menggunakan GitHub API
  fetch(`https://api.github.com/search/repositories?q=user:rezapace ${searchInput}`)
    .then(response => response.json())
    .then(githubData => {
      // Mendapatkan URL dari hasil GitHub API
      if (githubData.items && githubData.items.length > 0) {
        const firstRepo = githubData.items[0];
        const githubUrl = firstRepo.html_url;
        console.log("GitHub API Result URL:", githubUrl);
      } else {
        console.log("Tidak ditemukan repositori untuk kata kunci:", searchInput);
      }

      // Di sini, Anda dapat menggabungkan atau menampilkan hasilnya sesuai kebutuhan
    })
    .catch(error => console.error("Error:", error));

  rl.close();
});
