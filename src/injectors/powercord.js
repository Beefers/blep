//? blep
//* Powercord Injector

const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const path = require('path')
const fs = require('fs');

const sleep = require('util').promisify(setTimeout)

console.log('Cloning Powercord')
try {
    const dir = path.join(__dirname, '../../', 'clients', 'powercord')
    git.clone({ fs, http, dir, url: 'https://github.com/powercord-org/powercord' }) 
} catch(err) {
    console.error('whoops\n', err)
}

const powercordPath = path.join(__dirname, '../../', 'clients', 'powercord')

console.log('Injecting Powercord')

// hacky method
const injectPowercord = require('child_process').spawnSync('node', [path.join(powercordPath, 'injectors', 'index.js'), 'inject'])