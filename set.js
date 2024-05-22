const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0RZNGRpTHhDWW9oQ2hsQi9ibGU2dWsyQVA3UFJ4d2oxamxRYXM2SGduST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib3NxbEJhditnRllEY1NIaUkxZTh1N05RUXlwS3IzUjV0aFludU5ZYSsyZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrQVl3Z1pUMWJ4TEtINllMd3Fwb3pudWZqTjNYMnpDYlJFM0t3Ti9JSEdJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKUlNCZFAwWk1KYS9QbHhzNUw5dUtYVFlVaGgxVHdma0c4M3lvdXRKMEc4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlKU0JaWlhsUDhSSUdUUjFrajVqR0JIQTByamZoZlNoWURMUHlZN0dlMVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktQN3JUajVxZUZQYkgrWnd2K0UwTGx0OGhjeDlDVWxNQy8wOUMxNUFxaEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkl3L0hBYisxVFRQR1hXRm1EbUJTaUwzOG9vbFJyRW8zaXVEUC9xcWRrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZEUrZjNLZGZvY3lyTTdSTE5TbUFWaS9uZTRCeGRtMlY2Sm5Gb09LdkFtWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhCbkZCZmhsUU90eUNjUzl3dXVsUVVRK1JhekJKbllMbVJhOXk3ZU5sZTBvZVFFYllIS1MzbHczaFlHWDZTUnJHMGx5eWlFNEV2ZExqMHpaMW5ZMWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY1LCJhZHZTZWNyZXRLZXkiOiIzbXpZRDhEVk1xVUo3YlpiaHBTV282S25XS0IwckN5TnErNlBHOS9nU3RNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXbm1xUkdmTVE4R0doVk9OVGlzSktBIiwicGhvbmVJZCI6IjIwYzk1ZGM3LWViZjItNDAwZS04M2ExLWQ0NjgyN2NhZTE5ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyL0hNSzF2RXV4ekcrN1pGSlFoNk0xNm9SWXM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDZjNXFCblFTS3JHNUZmc0s1eUZVN2NaMGNnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVLVjZZWEdOIiwibWUiOnsiaWQiOiIyMzQ4MTQ5OTUzNzg4OjM1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQU0t3T0lFRUlMZHViSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJKaFZ4RGpONktnVHQ2QWVpK21QS2l3UEt6L29oYzN2K0NxMEhDMUM0b2dVPSIsImFjY291bnRTaWduYXR1cmUiOiIxeVRVUlJWcGQ2YzVjaFpPciswQjhkR1FJVXk1d0k2R2Y2Y3BvaXA4K0NMc0ZUZGNKeTU0TlFxMnY3akMrMTM2TUdDWlNhNDZTUFJiWU9nYVRuRCtBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMloxK2NzNVZlMHZpSjNPY1AycC9jTHFFZzhqQWxmQkwyUUZ4TG94UXViUFdEMXpjVWowb0IyYzB1OVZCRVEzRk1JMVdqKzFxRTdpU0doditNY1YzaFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTQ5OTUzNzg4OjM1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNZVmNRNHplaW9FN2VnSG92cGp5b3NEeXMvNklYTjcvZ3F0Qnd0UXVLSUYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTY0MTYxNDQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQXh1In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Henry",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2348149953788",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Henry Md',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

