const { igstalker } = require('../lib/stalker');
const { tikstalk } = require('../lib/stalker');  // Make sure you have tikstalk imported too
const { cmd } = require('../command');

cmd({
  pattern: 'igstalk',  // removed aliases, just one pattern
  desc: "Instagram Profile Stalker",
  category: "stalker",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  if (!args[0]) return reply("❌ Please enter a valid IG username.\nEx: .igstalk instagram");

  try {
    const res = await igstalker(args[0]);

    const caption = `
╭━━━〔 *📸 INSTAGRAM STALKER* 〕━━━┈⊷
┃ 👤 Username: ${res.username}
┃ 📛 Full Name: ${res.fullname}
┃ 📊 Posts: ${res.post}
┃ 👥 Followers: ${res.followers}
┃ ➡️ Following: ${res.following}
┃ 📝 Bio: ${res.bio || "N/A"}
╰━━━━━━━━━━━━━━━━━━━⊷

*© ZORO ZMD WHATSAPP-BOT ✾*
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: res.profile },
      caption
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to get IG data.");
  }
});

cmd({
  pattern: 'tikstalk',  // removed aliases, just one pattern
  desc: "TikTok Profile Stalker",
  category: "stalker",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  if (!args[0]) return reply("❌ Please enter a valid TikTok username.\nEx: .tikstalk tiktokuser");

  try {
    const res = await tikstalk(args[0]);

    const caption = `
╭━━━〔 *🎶 TIKTOK STALKER* 〕━━━┈⊷
┃ 👤 Username: ${res.username}
┃ 📛 Name: ${res.name}
┃ 👥 Followers: ${res.followers}
┃ ➡️ Following: ${res.following}
┃ ❤️ Likes: ${res.likes}
┃ 📝 Bio: ${res.bio || res.desc || "N/A"}
╰━━━━━━━━━━━━━━━━━━━⊷

*© ZORO ZMD WHATSAPP-BOT ✾*
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: res.profile },
      caption
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    reply("❌ Failed to get TikTok data.");
  }
});
