/*
 DONT COPY
*/

const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "menu the bot",
    react: "⚡",
    category: "main"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let desc = `*@${pushname}🧭 HERE's THE BOT COMMANDS CATEGORY*
  *🚀𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈🚀*
*❖╭─────────────···▸*
> *ɴᴀᴍᴇ ʙᴏᴛ* : *𝚭𝚯𝚪𝚯 𝚭𝚳𝐃*
> *ғᴏᴜɴᴅᴇʀ* : *X-KEVIN  (Damiru Sanhitha)*
> *ʀᴜɴᴛɪᴍᴇ* : ${runtime(process.uptime())}
> *ᴍᴏᴅᴇ* : *ᴘʀɪᴠᴀᴛᴇ*
> *ᴘʀᴇғɪx* : *.*
> *ʀᴀᴍ ᴜsᴇ* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
> *ᴠᴇʀsɪᴏɴs* : *ᴠ.1.0 (BETA)*
*❖╰────────────···▸▸*
*♡︎•━━━━━━☻︎━━━━━━•♡︎*
*╭╼╼╼╼╼╼╼╼╼╼*
*├ 1 ᴏᴡɴᴇʀ ᴍᴇɴᴜ* 🚀
*├ 2 ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ* ♾️
*├ 3 ᴀɪ ᴍᴇɴᴜ* ✨
*├ 4 ꜱᴇᴀʀᴄʜ ᴍᴇɴᴜ* 🔎
*├ 5 ᴅᴀᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ* 📥
*├ 6 ᴍᴀɪɴ ᴍᴇɴᴜ* 🏠
*├ 7 ɢʀᴏᴜᴘ ᴍᴇɴᴜ* 👥
*├ 8 ꜰᴜɴ ᴍᴇɴᴜ* 🎉
*├ 9 ᴛᴏᴏʟꜱ ᴍᴇɴᴜ* ⚙️
*├ 10 ᴏᴛʜᴇʀ ᴍᴇɴᴜ* ➕
*╰╼╼╼╼╼╼╼╼╼╼*

*ׂ╰┈ ✈️ Pick an option by replying its Number


> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃 ✾*`;

        const vv = await conn.sendMessage(from, { image: { url: "https://files.catbox.moe/6iq7w6.jpg"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        reply(`*✧- - -🏵️ 𝙾𝚆𝙽𝙴𝚁 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈 🏵️- - -✧*

╭───────────<0xE2><0x97><0x87>✧►
│ - *setting*
> ʙᴏᴛ ꜱᴇᴛᴛɪɴɢ  ᴄʜᴀɴɢᴇ
│ - *block*
> ᴜꜱᴇʀ ʙʟᴏᴄᴋ
│ - *unblock*
> ʙʟᴏᴄᴋ ᴜꜱᴇʀ  ᴜɴʙʟᴏᴄᴋ
│ - *shutdown*
> ʙᴏᴛ ꜱᴛᴏᴘ
│ - *broadcast*
> ᴀʟʟ ɢʀᴏᴜᴘ ꜱᴇɴᴅ ᴍꜱɢ
│ - *setpp*
> ᴘʀᴏꜰɪʟᴇ ᴘɪᴄ ᴄʜᴀɴɢᴇ
│ - *clearchats*
> ᴀʟʟ ᴄʜᴀᴛ ᴄʟᴇᴀʀ
│ - *jid*
> ᴄʜᴀᴛ ᴊɪᴅ
│ - *gjid*
> ɢʀᴏᴜᴘ ᴊɪᴅ
│ - *update*
> ʙᴏᴛ ᴜᴘᴅᴀᴛᴇ
│ - *updatecmd*
> ᴜᴘᴅᴀᴛᴇ ʙᴏᴛ ᴄᴏᴍᴍᴀɴᴅ
│ - *xvdl*
> 18+ ᴠɪᴅᴇᴏ ᴅᴀᴡɴʟᴏᴀᴅ
│ - *movie*
> ᴍᴏᴠɪᴇ ᴅᴀᴡɴʟᴏᴀᴅ
╰───────────<0xE2><0x97><0x87>✧►

> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃� ✾*`);
                        break;
                    case '2':               
                        repl (`*✧- - -🏵️ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈 🏵️- - -✧*

╭────────<0xE2><0x97><0x87>✧►
│ - *sticker*
> ᴘʜᴏᴛᴏ ᴄᴏɴᴠᴇʀᴛ ꜱᴛɪᴄᴋᴇʀ
│ - *trt*
> ᴛʀᴀɴꜱʟᴀᴛᴇ ᴛᴇxᴛ ʙᴇᴛᴡᴇᴇɴ  ʟᴀɴɢᴜᴀɢᴇꜱ
│ - *tts*
> ᴅᴀᴡɴʟᴏᴀᴅ ᴛʏᴘᴇ ᴛᴇxᴛ ᴛᴏ ᴠᴏɪᴄᴇ
│ - *vv*
> ᴠɪᴇᴡᴏɴᴄᴇ ᴍᴇꜱꜱᴀɢᴇ ᴀɢɪɴ ᴠɪᴇᴡ
│ - *fancy*
> ᴄᴏɴᴠᴇʀᴛ ᴛᴏ ᴛᴇxᴛ ɪɴᴛᴏ ᴠᴀʀɪᴏᴜꜱ ꜰᴏɴᴛ
│ - *pickupline*
> ɢᴇᴛ ᴀ ʀᴀɴᴅᴏᴍ ᴘɪᴄᴜᴘ ʟɪɴᴇ ᴛʜᴇ ᴀᴘɪ
╰────────────────────<0xE2><0x97><0x87>✧►


> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃� ✾*`);
                        break;
                    case '3':               
                        reply(`*✧- - -🏵️ 𝙰𝙸 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈 🏵️- - -✧*

╭────────<0xE2><0x97><0x87>✧►
│ - *ai*
> ᴄʜᴀᴛ ᴀɪ
╰────────────────────<0xE2><0x97><0x87>✧►


> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃� ✾*`);
                        break;
                    case '4':               
                        reply(`*✧- - -🏵️ 𝚂𝙴𝙰𝚁𝙲𝙷 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈 🏵️- - -✧*

╭────────<0xE2><0x97><0x87>✧►
│ - *movie*
> ᴍᴏᴠɪᴇ ꜱᴇᴀʀᴄʜ
│ - *yts*
> ꜱᴇᴀʀᴄʜ ꜰᴏʀ ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏꜱ ᴜꜱɪɴɢ ᴀ Qᴜᴇʀʏ
│ - *save*
> ꜱᴀᴠᴇ ᴀɴᴅ ꜱᴇɴᴅ ʙᴀᴄᴋ ᴀ ᴍᴇᴅɪᴀ ꜰɪʟᴇ ( ɪᴍᴀɢᴇꜱ / ᴠɪᴅᴇᴏ ᴏʀ ᴀᴜᴅɪᴏ )
│ - *news*
> ɢᴇᴛ ᴀ ʟᴀꜱᴛᴇꜱᴛ ɴᴇᴡꜱ ʜᴇᴅʟɪɴᴇꜱ
╰────────────────────<0xE2><0x97><0x87>✧►


> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃� ✾*`);
                        break;
                    case '5':               
                        reply(`*✧- - -🏵️ 𝙳𝙾𝚆𝙰𝙽𝙻𝙾𝙰𝙳 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈 🏵️- - -✧*

╭────────<0xE2><0x97><0x87>✧►
│ - *song*
> ʏᴏᴜᴛᴜʙᴇ ꜱᴏɴɢ  ᴅᴀᴡɴʟᴏᴀᴅ
│ - *play3*
> ʏᴏᴜᴛᴜʙᴇ ꜱᴏɴɢ ᴅᴀᴡɴʟᴏᴀᴅ  
│ - *play2*
> ʏᴏᴜᴛᴜʙᴇ ꜱᴏɴɢ ᴅᴀᴡɴʟᴏᴀᴅ
│ - *mp3*
> ʏᴏᴜᴛᴜʙᴇ ꜱᴏɴɢ ᴅᴀᴡɴʟᴏᴀᴅ 
│ - *mp4*
> ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ ᴅᴀᴡɴʟᴏᴀᴅ
│ - *darama*
> ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ ᴅᴀᴡɴʟᴏᴀᴅ
│ - *video*
> ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅᴇᴏ ᴅᴀᴡɴʟᴏᴀᴅ
│ - *apk*
> ᴘʟᴀʏꜱᴛᴏʀʏ ᴀᴘᴘ ᴅᴀᴡɴʟᴏᴀᴅ
│ - *tiktok*
> ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏ ᴅᴀᴡɴʟᴏᴀᴅ
│ - *tt*
> ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏ ᴅᴀᴡɴʟᴏᴀᴅ
│ - *fb*
> ꜰᴀᴄᴇʙᴏᴏᴄᴋ ᴠɪᴅᴇᴏ ᴅᴀᴡɴʟᴏᴀᴅ
│ - *mf*
> ᴍᴇᴅɪᴀꜰɪʀᴇ ʟɪɴᴋ ᴅᴀᴡɴʟᴏᴀᴅ
│ - *ig*
> ɪɴꜱᴛᴀɢʀᴀᴍ ᴠɪᴅᴇᴏ ᴅᴀᴡɴʟᴏᴀᴅ
╰────────────────────<0xE2><0x97><0x87>✧►


> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃� ✾*`);
                        break;
                    case '6':               
                        reply(`*✧- - -🏵️ 𝙼𝙰𝙸𝙽 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈 🏵️- - -✧*

╭────────<0xE2><0x97><0x87>✧►
│ - *wiki*
> ꜱᴇᴀʀᴄʜ ᴡɪᴋɪᴘᴇᴅɪᴀ ꜰᴏʀ ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ
│ - *env*
> ɢᴇᴛ ʙᴏᴛ ꜱᴇᴛᴛɪɴɢ ʟɪꜱᴛ
│ - *system*
> ᴄʜᴇᴄᴋ ᴜᴘᴛɪᴍᴇ
│ - *ping2 / ping*
> ᴄʜᴇᴄᴋ ʙᴏᴛ ꜱᴘᴇᴇᴅ
│ - *owner*
> ɢᴇᴛ ᴏᴡɴᴇʀ ɴᴜᴍʙᴇʀ
│ - *alive*
> ʙᴏᴛ ᴏɴʟɪɴᴇ ᴄʜᴇᴄᴋ
│ - *list*
> ᴀʟʟ ᴄᴏᴍᴍᴀɴᴅ ᴛᴡᴏ ʟɪꜱᴛ
╰────────────────────<0xE2><0x97><0x87>✧►


> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃� ✾*`);
                        break;
                    case '7':               
                        reply(`*✧- - -🏵️ 𝙶𝚁𝙾𝚄𝙿 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈 🏵️- - -✧*

╭────────<0xE2><0x97><0x87>✧►
│ - *closetime*
> ᴍᴜᴛᴇ ᴛʜɪꜱ ɢʀᴏᴜᴘ
│ - *opentime*
> ᴜɴᴍᴜᴛᴇ ᴛʜɪꜱ ɢʀᴏᴜᴘ
│ - *kick*
> ʀᴇᴍᴏᴠᴇ ᴏɴᴇ ᴍᴇᴍʙᴇʀꜱ
│ - *kickall*
> ʀᴇᴍᴏᴠᴇ ᴀʟʟ ᴍᴇᴍʙᴇʀꜱ 
│ - *promote*
> ꜱᴇᴛ ᴀᴅᴍɪɴɢ
│ - *demote*
> ᴜɴꜱᴇᴛ ᴀᴅᴍɪɴɢ
│ - *add*
> ᴀᴅᴅ ᴏɴᴇ  ᴍᴇᴍʙᴇʀꜱ
│ - *delete*
> ᴅᴇʟᴇᴛᴇ ᴛʜɪꜱ ᴍᴇꜱꜱᴀɢᴇ
│ - *setname*
> ɢʀᴏᴜᴘ ɴᴀᴍᴇ ᴄʜᴀɴɢᴇ
│ - *tagall*
> ᴛᴀɢ ᴀʟʟ ᴍᴇᴍʙᴀʀꜱ
│ - *tagadmin*
> ᴛᴀɢ ᴀʟʟ  ᴀᴅᴍɪɴɢ
│ - *invite*
> ɢʀᴏᴜᴘ ʟɪɴᴋ ɢᴇɴᴇʀᴀᴛᴛᴇ
│ - *join*
> ᴊᴏɪɴ ᴀ ɢʀᴏᴜᴘ ᴜꜱɪɴɢ ᴏɴ ɪɴᴠɪᴛᴇ ʟɪɴᴋ
│ - *leave*
> ᴍᴀᴋᴇ ᴛʜᴇ ʙᴏᴛ ʟᴇꜰᴛ ᴛʜᴇ ᴄᴜʀʀᴇɴᴛ ɢʀᴏᴜᴘ
│ - *setdesc*
> ᴄʜᴀɴɢᴇ ɢʀᴏᴜᴘ ᴅᴇꜱᴄᴛʀɪᴘᴛɪᴏɴ
│ - *setwelcome*
> ꜱᴇᴛ ᴛʜᴇ ᴡᴇʟᴄᴏᴍᴇ ᴍᴇꜱꜱᴀɢᴇ ꜰᴏʀ ᴛʜᴇ ɢʀᴏᴜᴘ
│ - *setgoodbye*
> ꜱᴇᴛ ᴛʜᴇ ɢᴏᴏᴅ ʙʏᴇ  ᴍᴇꜱꜱᴀɢᴇ ꜰᴏʀ ᴛʜᴇ ɢʀᴏᴜᴘ
╰────────────────────<0xE2><0x97><0x87>✧►


> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃� ✾*`);
                       break;
                    case '8':               
                        reply(`*✧- - -🏵️ 𝙵𝚄𝙽 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈 🏵️- - -✧*

╭────────<0xE2><0x97><0x87>✧►
│ - *ship*
│ - *dare*
│ - *character*
│ - *fact*
│ - *insult*
│ - *truth*
│ - *pickupline*
│ - *joke*
│ - *dog*
│ - *hack*
│ - *animegirl*
│ - *animegirl1*
│ - *animegirl2*
│ - *animegirl3*
│ - *animegirl4*
│ - *animegirl5*
╰────────────────────<0xE2><0x97><0x87>✧►


> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃� ✾*`);

                        break;
                    case '10':               
                        reply(`*✧- - -🏵️ 𝙾𝚃𝙷𝙴𝚁 𝙲𝙰𝚃𝙴𝙶𝙾𝚁𝚈 🏵️- - -✧*

╭────────<0xE2><0x97><0x87>✧►
│ - *anime*
│ - *anime1*
│ - *anime2*
│ - *anime3*
│ - *anime4*
│ - *anime5*
│ - *githubstalk*
│ - *weather*
│ - *fancy*
╰────────────────────<0xE2><0x97><0x87>✧►


> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃� ✾*`);


                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
