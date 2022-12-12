const fs = require("fs");
const readline = require("readline");

const ACCESS_LOG = "./access.log";

const readStream = fs.createReadStream(ACCESS_LOG, {
  flags: "r",
  encoding: "utf-8",
  start: 0,
  end: 1048576,
  highWaterMark: 256,
});

const rl = readline.createInterface( { input: readStream, terminal: true });

let adresses = ['89.123.1.41','34.48.240.111'];

adresses.forEach((adress) => {
  const writeStream = fs.createWriteStream(`./${adress}_requests.log`, 'utf-8');
  rl.on('line', (line) =>{
    if (line.includes(adress)){
      writeStream.write(line + "\n")
    }
  })
})