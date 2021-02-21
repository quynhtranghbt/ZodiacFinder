// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: false,
 
    intentMap: {
       'AMAZON.StopIntent': 'END',
       'Default Fallback Intent' : 'Help',
    },
 
    db: {
         FileDb: {
             pathToFile: '../db/db.json',
         }
     },
 };
 