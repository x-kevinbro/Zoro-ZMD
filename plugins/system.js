const os = require("os");
const { cmd } = require('../command');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "system",
    alias: ["sysinfo", "sys"],
    desc: "Show system information",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const cpus = os.cpus();
        const cpuModel = cpus[0].model;
        const cpuCores = cpus.length;
        const platform = os.platform();
        const arch = os.arch();
        const hostname = os.hostname();
        const uptime = runtime(os.uptime());  // make sure runtime() is defined correctly
        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const ramTotal = (os.totalmem() / 1024 / 1024).toFixed(2);

        const message = `╭━━━〔 *🖥️ 𝚂𝚈𝚂𝚃𝙴𝙼 𝙸𝙽𝙵𝙾* 〕━━━┈⊷
┃ ✦ *👨‍💻 𝙷𝚘𝚜𝚝𝚗𝚊𝚖𝚎:* ${hostname}
┃ ✦ *💻 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖:* ${platform} (${arch})
┃ ✦ *🧠 𝙲𝙿𝚄:* ${cpuModel}
┃ ✦ *⚙️ 𝙲𝙿𝚄 𝙲𝚘𝚛𝚎𝚜:* ${cpuCores}
┃ ✦ *📈 𝚁𝙰𝙼 𝚄𝚜𝚎𝚍:* ${ramUsed} MB / ${ramTotal} MB
┃ ✦ *⏳ 𝚄𝚙𝚝𝚒𝚖𝚎:* ${uptime}
┃ ✦ *🕒 𝚃𝚒𝚖𝚎:* ${new Date().toLocaleString()}
╰━━━━━━━━━━━━━━━━━━━⊷
> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃 ✾*`;

        await conn.sendMessage(from, { text: message }, { quoted: mek });

    } catch (e) {
        console.error("Error in system command:", e);
        reply(`⚠️ Error: ${e.message}`);
    }
});
