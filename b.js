const readline = require('readline');
const fetch = require('node-fetch');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Masukkan kata kunci pencarian: ', function(searchInput) {
  // Menggunakan GitHub API
  fetch(`https://api.github.com/search/repositories?q=user:rezapace ${searchInput}`)
    .then(response => response.json())
    .then(githubData => {
      // Mendapatkan nama repositori dari hasil GitHub API
      const repositoryNames = githubData.items.map(repo => repo.name);

      // Format output sesuai kebutuhan
      const output = {
        "google:suggestsubtypes": Array.from({ length: repositoryNames.length }, () => [512, 433, 131]),
        "data": {
          "google:suggestrelevance": 10,
          "google:suggesttype": "QUERY",
          "google:suggestsession": "c",
          "google:verbatimrelevance": 10,
          "google:searchfieldtrialparameter": "b",
          "google:suggestqueries": {
            "tracking": "g",
            "url": `https://api.github.com/search/repositories?q=user:rezapace ${searchInput}`
          }
        },
        "reza": repositoryNames
      };

      console.log(JSON.stringify(output, null, 2));
    })
    .catch(error => console.error("Error:", error))
    .finally(() => rl.close());
});
