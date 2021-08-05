//? blep
//* BetterDiscord Downloader
// This method is heavily inspired by https://github.com/Goose-Nest/GooseUpdate/blob/main/branchSetups/betterDiscord.sh, but adapted into JS.

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch')

const downloadPath = path.join(__dirname, '../../', 'clients', 'betterdiscord/'); 

console.log('Making BD folder')
try {
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath)
    }
  } catch (err) {
    console.error('oh no', err)
}

console.log('Downloading BD')

fetch('https://api.github.com/repos/BetterDiscord/BetterDiscord/releases/latest')
    .then(res => res.json())
    .then(json => {
        const options = {
            headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 6P Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36' }
        };

        fetch(json.assets[0].browser_download_url)
        .then(res => {
            const dest = fs.createWriteStream(downloadPath + 'betterdiscord.asar');
            res.body.pipe(dest);
            dest.on('finish',() => {
                dest.close();
                console.log('BD download complete'); 
        })
    });
});