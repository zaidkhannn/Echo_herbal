const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  'tulsi.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Ocimum_tenuiflorum_2.jpg/800px-Ocimum_tenuiflorum_2.jpg',
  'ashwagandha.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Withania_somnifera_L._Dunal.jpg/800px-Withania_somnifera_L._Dunal.jpg',
  'turmeric.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Curcuma_longa_roots.jpg/800px-Curcuma_longa_roots.jpg',
  'neem.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Azadirachta_indica_%28Neem%29_in_Hyderabad_W_IMG_6881.jpg/800px-Azadirachta_indica_%28Neem%29_in_Hyderabad_W_IMG_6881.jpg',
  'brahmi.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Bacopa_monnieri_in_Jardin_des_Plantes_de_Paris.jpg/800px-Bacopa_monnieri_in_Jardin_des_Plantes_de_Paris.jpg',
  'amla.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Phyllanthus_emblica.jpg/800px-Phyllanthus_emblica.jpg',
  'giloy.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Tinospora_cordifolia_in_KBR_Park%2C_Hyderabad_W_IMG_4761.jpg/800px-Tinospora_cordifolia_in_KBR_Park%2C_Hyderabad_W_IMG_4761.jpg',
  'shatavari.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Asparagus_racemosus_%28Shatavari%29_in_Talakona_forest_AP_W_IMG_8225.jpg/800px-Asparagus_racemosus_%28Shatavari%29_in_Talakona_forest_AP_W_IMG_8225.jpg'
};

const targetDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

Object.entries(images).forEach(([filename, url]) => {
  const filePath = path.join(targetDir, filename);
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      // Handle redirect
      https.get(res.headers.location, (redirectRes) => {
        const fileStream = fs.createWriteStream(filePath);
        redirectRes.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded ${filename}`);
        });
      });
    } else {
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${filename}`);
      });
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
});
