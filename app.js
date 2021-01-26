const http = require("http");

process.on("message", (data) => {
  //console.log(`Mensajito PID ${process.pid} - datos ${JSON.stringify(data)}`)

  procesa(data.data);
});

function procesa(data) {
  console.log(data, `PID ${process.pid}`);
}

/* process.send({ msg: 'lo mando yo '+ process.pid});*/

/* 
  console.log(process.pid)
*/

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Hello World ${process.pid}`);
    process.send({ cmd: `LO envia WORKER ${process.pid}` });
  })
  .listen(3000);
