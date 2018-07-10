const CronJobManager = require('cron-job-manager');
let manager = new CronJobManager();

const pdf= require('./controller/lib.js')
//https://www.npmjs.com/package/cron-job-manager
//https://github.com/kelektiv/node-cron/blob/master/README.md
/*
cronTime:'0-59 0-59 0-23 1-31 0-11 0-6'
Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11 (Jan-Dec)
Day of Week: 0-6 (Sun-Sat)(Domingo-Sábado)
 ejemplo
	* Runs every weekday (Monday through Friday)
	* at 11:30:00 AM. It does not run on Saturday
	* or Sunday.
  cronTime: '00 30 11 * * 1-5',
*/
//************************************************************** */
//hora para generar el pdf para todos los domingos a las 11:59:00
//             'second minutes hours Day Months Week'
//             '00 59 11 * * 0'
manager.add('simar', '0 0 12 * * 0', function () {
    console.log('job simar generate pdf')
    let fecha = moment().format("DD/MM/YYYY")
    pdf.download(fecha)
        .then(ref => {
            console.log('PDF para las 15 regiones de la fecha:' + ref)
        })
});
manager.start('simar');