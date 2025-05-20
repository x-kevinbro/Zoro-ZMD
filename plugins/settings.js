const config = require('../config')
const { cmd, commands } = require('../command')
const os = require("os")

cmd({
    pattern: "settings",
    alias: ["setting"],
    desc: "settings the bot",
    category: "owner",
    react: "⚙",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        let desc = `* © 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃 ✾

╭══════════════════════○
┣━ *𝗪𝗢𝗥𝗞 𝗠𝗢𝗗𝗘 ✨*
> 1. Public Work
> 2. Private Work
> 3. Group Only
> 4. Inbox Only
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗩𝗢𝗜𝗖𝗘 ✨*
> 5. Auto Voice On
> 6. Auto Voice Off
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗦𝗧𝗔𝗧𝗨𝗦 𝗦𝗘𝗘𝗡 ✨*
> 7. Auto Read Status On
> 8. Auto Read Status Off
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 ✨*
> 9. Auto sticker On
> 10. Auto sticker Off
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗥𝗘𝗣𝗟𝗬✨*
> 11. Auto reply On
> 12. Auto reply Off
╭══════════════════════○
┣━ *𝗕𝗢𝗧 𝗢𝗡𝗟𝗜𝗡𝗘 𝗢𝗙𝗙𝗟𝗜𝗡𝗘 ✨*
> 13. Online On
> 14. Online Off
╭══════════════════════○
┣━ *𝗠𝗦𝗚 𝗥𝗘𝗔𝗗 ✨*
> 15. Read Msg On
> 16. Read Msg Off
╭══════════════════════○
┣━ *𝗠𝗦𝗚 𝗥𝗘𝗔𝗖𝗧 ✨*
> 17. Auto React On
> 18. Auto React Off
╭══════════════════════○
┣━ *𝗔𝗡𝗧𝗜 𝗟𝗜𝗡𝗞 ✨*
> 19. Anti Link On
> 20. Anti Link Off
> 21. Anti Link Remove
╰═══════════════════════○


> *© 𝚉𝙾𝚁𝙾 𝚉𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿-𝙱𝙾𝚃 ✾*`;

        const vv = await conn.sendMessage(from, { image: { url: "https://i.ibb.co/BsjkCDP/9555.jpg" }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selected = msg.message.extendedTextMessage.text.trim();
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId !== vv.key.id) return;

            switch (selected) {
                case '1': reply(".update MODE:public"); break;
                case '2': reply(".update MODE:private"); break;
                case '3': reply(".update MODE:group"); break;
                case '4': reply(".update MODE:inbox"); break;
                case '5': reply(".update AUTO_VOICE:true"); break;
                case '6': reply(".update AUTO_VOICE:false"); break;
                case '7': reply(".update AUTO_READ_STATUS:true"); break;
                case '8': reply(".update AUTO_READ_STATUS:false"); break;
                case '9': reply(".update AUTO_STICKER:true"); break;
                case '10': reply(".update AUTO_STICKER:false"); break;
                case '11': reply(".update AUTO_REPLY:true"); break;
                case '12': reply(".update AUTO_REPLY:false"); break;
                case '13': reply(".update ALLWAYS_OFFLINE:true"); break;
                case '14': reply(".update ALLWAYS_OFFLINE:false"); break;
                case '15': reply(".update READ_MESSAGE:true"); break;
                case '16': reply(".update READ_MESSAGE:false"); break;
                case '17': reply(".update config.AUTO_REACT:true"); break;
                case '18': reply(".update config.AUTO_REACT:false"); break;
                case '19':
                    reply(".update ANTI_LINK:true");
                    reply(".update ANTI_LINKK:false");
                    break;
                case '20':
                    reply(".update ANTI_LINKK:true");
                    reply(".update ANTI_LINK:false");
                    break;
                case '21':
                    reply(".update ANTI_LINK:false");
                    reply(".update ANTI_LINKK:false");
                    break;
                default:
                    reply("❌ Invalid option. Please reply with a correct number.");
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('❌ An error occurred while processing your request.');
    }
});
