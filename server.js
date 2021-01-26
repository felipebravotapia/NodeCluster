const cluster = require('cluster')
const os = require('os')

const arreglito = ['a','b','c','d','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z',]


const workers = os.cpus().length;

cluster.setupMaster({ exec: "app.js" });

function log(msg) {
  console.log(
    `[SERVER] ${new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "")} ${msg}`
  );
}

log(`Master with pid ${process.pid} starting...`);

for (let i = 0; i < workers; i++) {
  const worker = cluster.fork();

  console.log(worker.process.pid);


  if(arreglito.length > 4){
    if(worker.id == 1){
      worker.on("listening",  (msg) =>{
        worker.send({data:arreglito.slice(0, 4), id: worker.process.pid});
      });
    }
  }

  if(arreglito.length > 4){
    if(worker.id == 2){
      worker.on("listening",  (msg) =>{
        worker.send({data:arreglito.slice(4, 8), id: worker.process.pid});
      });
    }
  }

  if(arreglito.length > 4){
    if(worker.id == 3){
      worker.on("listening",  (msg) =>{
        worker.send({data:arreglito.slice(8, 12), id: worker.process.pid});
      });
    }
  }






/*   if(worker.id == 10){
    worker.on("listening",  (msg) =>{
      worker.send("HOLAAAAA " + worker.id);
    });
  }
    */

    worker.on("message",  (msg) => {
      console.log("LO RECIBIO MASTER", msg);
    });
  
}

cluster.on("exit", (worker, code, signal) => {
  log(`worker with pid ${worker.process.pid} died. Restarting...`);
  cluster.fork();
});

cluster.on("online", (worker) => {
  log(`Worker with pid ${worker.process.pid} started`);
});
