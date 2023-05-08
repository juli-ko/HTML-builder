const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {
    stdin: input,
    stdout: output,
} = require('process');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'),{ encoding: 'utf-8' });

//invite user to write something, save input into the text file
console.log ('What is your favorite food? ')

//save input into the text file
const rl = readline.createInterface ({input, output})
rl.on('line', (answer) => {
    if (answer === 'exit') {
        rl.close();
        process.exit(0);
    }
    writeStream.write( answer + '\n', (err) => {
        if (err) throw err;
        console.log('Yummy! What else?');
    })
});

//goodbuy phrase
process.on('exit', () => {
  console.log('Bye bye!');
});

