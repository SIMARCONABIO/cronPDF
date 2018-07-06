const fetch = require('node-fetch');
const fs = require('fs');
const moment = require('moment');

const urlbase = require('./.config.url')

function mkdirSyncRecursive(directory) {
    return new Promise((resolve, reject) => {
        var path = directory.replace(/\/$/, '').split('/');
        for (var i = 1; i <= path.length; i++) {
            var segment = path.slice(0, i).join('/');
            !fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
        }
        resolve()
    })
}
function getPDF(param) {
    return new Promise((resolve, reject) => {
        let region = param['region'];
        let fecha = param['fecha']
        let annio = moment(moment(param['fecha'], "DD/MM/YYYY").format()).year()
        let url = urlbase + '/1/' + fecha
        let name = annio + '/' + region + '/SATCORAL_' + fecha.replace(/\//g, '_') + '.pdf';
        let dir = `./pdf/${annio}/${region}`
        mkdirSyncRecursive(dir)
        .then(ref=>{
            fetch(url)
            .then(res => {
                return new Promise((resolve, reject) => {
                        const dest = fs.createWriteStream(`./pdf/${name}`);
                        res.body.pipe(dest);
                        res.body.on('error', err => {
                            reject(err);
                        });
                        dest.on('finish', () => {
                            resolve(`termino: ${name}`);
                        });
                        dest.on('error', err => {
                            reject(err);
                        });
                });
            })
            .then(dato => {
                //console.log(dato)
                resolve();
            })
        })

    })
}

async function download(fecha) {
    await getPDF({ region: 1, fecha: fecha })
    await getPDF({ region: 2, fecha: fecha })
    await getPDF({region:3,fecha:fecha})
    await getPDF({region:4,fecha:fecha})
    await getPDF({region:5,fecha:fecha})
    await getPDF({region:6,fecha:fecha})
    await getPDF({region:7,fecha:fecha})
    await getPDF({region:8,fecha:fecha})
    await getPDF({region:9,fecha:fecha})
    await getPDF({region:10,fecha:fecha})
    await getPDF({region:11,fecha:fecha})
    await getPDF({region:12,fecha:fecha})
    await getPDF({region:13,fecha:fecha})
    await getPDF({region:14,fecha:fecha})
    await getPDF({region:15,fecha:fecha})
    return fecha
}

module.exports={
    download
}