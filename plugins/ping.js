const { cmd } = require('../command');

cmd({
    pattern: "ping",
    alias: ["p"],
    desc: "Check bot response time (ping)",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // React to the message
        await conn.sendMessage(from, {
            react: {
                text: "⚡",
                key: m.key
            }
        });

        const start = Date.now();

        const sentMsg = await conn.sendMessage(from, { text: "Calculating ping..." }, { quoted: mek });

        const end = Date.now();
        const pingMs = end - start;
        const pingSec = (pingMs / 1000).toFixed(2);

        const message = `🏓 *Ping Result*
🔁 Response: ${pingMs} ms (${pingSec} s)
🕒 Time: ${new Date().toLocaleString()}

> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃 ✾*`;

        await conn.editMessage(from, sentMsg.key, { text: message });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
