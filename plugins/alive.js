const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🪐",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `╭━━━━━━〔 *𝚭𝚯𝚪𝚯 𝚭𝚳𝐃* 〕━━━━━━┈⊷
    •••Ｈｅｌｌｏ ${pushname}👊,•••
       🎐 Ｉ ａｍ Ａｌｉｖｅ Ｎｏｗ！ 🎐
┃◈╭─────────────·๏
┃◈┃• *⏳Uptime*:  ${runtime(process.uptime())} 
┃◈┃• *📈 Ram usage*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• *🔑 HostName*: ${os.hostname()}
┃◈┃• *👨‍💻 Owner*: ZORO-ZMD
┃◈┃• *✅ Version*: ᴠ.1.0 (BETA)
┃◈└───────────┈⊷
╰────────────────────────┈⊷
> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃 ✾*`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/6iq7w6.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363285813931317@newsletter',
                    newsletterName: 'ZORO ZMD-UPDATES',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
