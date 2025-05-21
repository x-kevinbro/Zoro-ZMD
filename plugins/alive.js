const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');
const path = require('path');

cmd({
  pattern: "tiktokstalk",
  alias: ["tiktokinfo", "ttstalk"],
  desc: "Fetch and display TikTok profile information.",
  react: "👀",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    // Check if the username is provided
    const username = args.join(' ');
    if (!username) {
      return reply("❌ Please provide a TikTok username. Example: `.tiktokstalk @x_vishwa_22`");
    }

    const apiUrl = `https://bk9.fun/stalk/tiktok?q=${username}`;

    // Fetch data from the TikTok profile API
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data || !data.BK9) {
      return reply("❌ No TikTok profile data found.");
    }

    const profile = data.BK9;

    // Construct the message with the profile data
    const resultMessage = `🔍 *TikTok Profile Information*\n
- 📸 *Name:* ${profile.name}
- 🏷️ *Username:* ${profile.username}
- 👥 *Followers:* ${profile.followers}
- ➡️ *Following:* ${profile.following}
- ❤️ *Likes:* ${profile.likes}
- 📝 *Description:* ${profile.desc}
- 🖊️ *Bio:* ${profile.bio}
    `;

    // Send the result as a message
    await conn.sendMessage(from, {
      image: { url: profile.profile },
      caption: resultMessage,
      contextInfo: {
        externalAdReply: {
          title: 'Bhashi - MD Version 2.0.0 🧚🏻‍♀️',
          body: '© Presented By Bhashi Coders. Powered By Dark Hackers Zone Team. Enjoy Now Bhashi Project.',
          sourceUrl: 'https://bhashi-md-ofc.netlify.app/',
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("Error fetching TikTok profile:", error);
    reply("🚫 An error occurred while fetching the TikTok profile data.");
  }
});

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
        const fs = require('fs').promises; // Using promises for cleaner async code
        const path = require('path');

      // Generate system status message
        const status = ` ╔═══〔 𝐐𝐔𝐄𝐄𝐍 𝐓𝐇𝐀𝐀𝐑𝐔𝐊𝐈 〕═══╗
     ✨ Hello, 𝙭-𝗞𝗲𝘃𝗶𝗻! I'm here. ✨
╚═══════════════════════╝
  ┃*🕰 Uptime:* 3 minutes, 31 seconds
  ┃*💾 RAM Usage:* 50.87MB
               / 63783.96MB
  ┃*💻 Host:* d35b2c31-28bd-4539-b008-05eba0be0cfc
  ┃*👑 Owner:* 𝙭-𝗞𝗲𝘃𝗶𝗻
  ┃*⚙ Version:* 1.0 (Beta)
╰────────────────────────┈⊷
> ©𝚀𝚄𝙴𝙴𝙽 𝚃𝙷𝙰𝙰𝚁𝚄𝙺𝙸 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙱𝙾𝚃✾`;

// ... your status message code ...

        // Send the status message with a video file
        const videoPath = path.join(__dirname, '../themes/Alive.mp4');
        const videoBuffer = await fs.readFile(videoPath);

        await conn.sendMessage(from, { 
            video: videoBuffer,
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

        // Send an mp3 file after the alive message
        const mp3Path = path.join(__dirname, '../themes/Alive.mp3'); // Change filename as needed
        const mp3Buffer = await fs.readFile(mp3Path);

        await conn.sendMessage(from, {
            audio: mp3Buffer,
            mimetype: 'audio/mp3',
            ptt: true // set to true if you want to send as voice note
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
