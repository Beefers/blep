//? blep
//* Patcher

const fs = require('fs');
const path = require('path');

const clientsPath = path.join(__dirname, '../', 'clients')

console.log('Patching Powercord files')

fs.readFile(path.join(clientsPath, 'powercord', 'injectors', 'main.js'), function(err, data) {
    if(err) throw err;
    //data = data.toString();
    var array = data.toString().split("\n");
  
    array[31] =`
    writeFile(
        join(appDir, 'index.js'),
            require(${clientsPath, 'betterdiscord', 'betterdiscord.asar'})
    ),
    `;
    for(i=0;i<array.length;i++) {
      fs.appendFileSync(clientsPath, 'powercord', 'injectors', 'main.js', array[i]+'\n');
    }
});

console.log('Injecting Powercord')

// hacky method
const injectPowercord = require('child_process').spawnSync('node', [path.join(clientsPath, 'powercord', 'injectors', 'index.js'), 'inject'])

console.log('Done!')