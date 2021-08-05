//? blep
//* Main File

// Import process
const process = require('process');

// Import fs
const fs = require('fs')

// Import path
const path = require('path');

// Slice node paths from process.argv for convenience
const args = process.argv.slice(2);

(async () => {
    if (args[0] === '--inject' || args[0] === '-i') {
        await fs.mkdirSync(path.join(__dirname, '../', 'clients'))

        async function inject() {
            await require('./downloaders/powercord')
            await require('./downloaders/betterdiscord')

            if (fs.existsSync(path.join(__dirname, '../', 'clients', 'powercord'))) require('./patcher'); else inject();
        }
        
    } else if (args[0] === '--uninject' || args[0] === '-u') {
        let dir = path.join(__dirname, '../', 'clients')

        require('child_process').spawnSync('node', [path.join(dir, 'powercord', 'injectors', 'index.js'), 'uninject'])

        fs.rmdirSync(dir, { recursive: true , force: true })
    } else if (args[0] === '--debug' || args[0] === '-d') {
        switch(args[1]) {
            case 'powercord':
                await require('./downloaders/powercord')
            break
            case 'betterdiscord':
                await require('./downloaders/betterdiscord')
            break
            default:
                console.error(`Unrecognised debugging option ${args[1]}`)
        }
    } else {
        console.log(`Unrecognised option ${args[0]}`)
    }
})().catch(err => {
    console.error('uh oh\n', err)
});