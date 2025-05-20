const {
    default: makeWASocket,
    getAggregateVotesInPollMessage,
    getDevice,
    delay,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto,
    useMultiFileAuthState,
    DisconnectReason,
    jidNormalizedUser,
    getContentType,
    fetchLatestBaileysVersion,
    Browsers
} = require('@whiskeysockets/baileys');

const prefix = '.';
const l = console.log;
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions');
const fs = require('fs');
const P = require('pino');
const config = require('./config');
const qrcode = require('qrcode-terminal');
const util = require('util');
const { sms, downloadMediaMessage } = require('./lib/msg');
const axios = require('axios');
const { File } = require('megajs');
const path = require('path');

const ownerNumber = ['94756539252'];

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
    if (!config.SESSION_ID) {
        console.log('Please add your session to SESSION_ID env !!');
        process.exit(1);
    }
    const sessdata = config.SESSION_ID;
    const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
    filer.download((err, data) => {
        if (err) {
            console.error('Error downloading session data:', err);
            process.exit(1);
        }
        fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
            console.log("Session downloaded ✅");
        });
    });
}

// <<==========PORTS============>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
//====================================

async function connectToWA() {
    //===========connect mongodb===================
    const connectDB = require('./lib/mongodb');
    await connectDB();
    //==============================================
    const { readEnv } = require('./lib/database');
    const config = await readEnv();
    //==============================================

    console.log("Connecting Queen Rashu Md bot 🧬...");
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');
    const { version } = await fetchLatestBaileysVersion();

    const conn = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.macOS("Firefox"),
        syncFullHistory: true,
        auth: state,
        version
    });

    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                console.log('Reconnecting...');
                connectToWA();
            }
        } else if (connection === 'open') {
            console.log('😼 Installing...');
            console.log('Plugins installed successfully ✅');
            console.log('Queen Thaaruki connected to WhatsApp ✅');

            // Get the current date and time
            const now = new Date();
            const formattedDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

// Dynamically load all plugins
function loadPlugins(conn) {
    const pluginFiles = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'));

    pluginFiles.forEach(file => {
        try {
            const plugin = require(path.join(pluginsPath, file));
            if (typeof plugin === 'function') {
                plugin(conn); // Pass the connection object if needed
            }
            console.log(`Loaded plugin: ${file}`);
        } catch (err) {
            console.error(`Failed to load plugin: ${file}`, err);
        }
    });
}


            let up = `*𝐐𝐔𝚵𝚵𝚴 𝚻𝚮𝚫𝚫𝚪𝐔𝐊𝚰 HAS BEEN CONNECTED⚡*
    
    *🌻 𝙲𝙾𝙽𝙽𝙴𝙲𝚃𝙴𝙳 𝙾𝙽:* ${formattedDate} at ${formattedTime}
    ╭────────────────────────┈⊷
    ┃ *♾️ REPO:* https://github.com/x-kevinbro/Queen-Thaaruki
    ┃ *♾️ GET SESSION:* 
    ┃ *♾️ SUPPORT GROUP:*
    ┃ *♾️ FOLLOW US:*
    ╰────────────────────────┈⊷
    •••THANKS FOR USING OUR BOT•••
    *•────────────╴╴╴•⟢*
    > *©𝚀𝚄𝙴𝙴𝙽 𝚃𝙷𝙰𝙰𝚁𝚄𝙺𝙸 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙱𝙾𝚃 ✾*
    *•────────────╴╴╴•⟢*`;

            // Construct the full path to your video file
            const videoPath = path.join(__dirname, 'themes', '0520.mp4');

            fs.readFile(videoPath, (err, videoData) => {
                if (err) {
                    console.error('Error reading video file:', err);
                    return;
                }

                conn.sendMessage(ownerNumber[0] + "@s.whatsapp.net", { video: videoData, caption: up });
            });
        }
    });

    conn.ev.on('creds.update', saveCreds);

    conn.ev.on('messages.upsert', async (mek) => {
        try {
            mek = mek.messages[0];
            if (!mek.message) return;

            mek.message = (getContentType(mek.message) === 'ephemeralMessage')
                ? mek.message.ephemeralMessage.message
                : mek.message;

            if (config.READ_MESSAGE === 'true') {
                await conn.readMessages([mek.key]);
                console.log(`Marked message from ${mek.key.remoteJid} as read.`);
            }

            // Continue with your existing message processing logic here...
        } catch (err) {
            console.error('Error in message handler:', err);
        }
    });
}

app.get("/", (req, res) => {
    res.send("Queen Thaaruki Bot, bot started✅");
});

app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));

setTimeout(() => {
    connectToWA();
}, 4000);
