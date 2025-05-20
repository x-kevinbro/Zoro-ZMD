const axios = require('axios')
const { cmd } = require('../command')

cmd({
  pattern: 'tiktok',
  desc: 'Download TikTok video without watermark',
  category: 'downloader',
  react: '🎬',
  filename: __filename
},
async (conn, mek, m, { text, reply }) => {
  if (!text) return reply('❌ Please provide a TikTok video URL.')

  try {
    const apiUrl = `https://bk9.fun/download/tiktok2?url=${encodeURIComponent(text)}`
    const { data } = await axios.get(apiUrl)

    if (!data.status) return reply('❌ Failed to fetch video. Check your URL.')

    const videoData = data.BK9

    // Styled caption with new numbering format and monospace-ish font using Unicode block characters
    const caption = `
╭━━━〔 🎬 𝚃𝙸𝙺𝚃𝙾𝙺 𝚅𝙸𝙳𝙴𝙾 〕━━━┈⊷
┃ ✦ 🧑‍💻 Owner: ${data.owner || 'Unknown'}
┃
┃ 1.1 - No Watermark
┃ 1.2 - With Watermark
┃ 2   - Audio
┃
┃ Reply with the number (e.g. 1.1) to get the link.
╰━━━━━━━━━━━━━━━━━━━⊷
`.trim()

    await conn.sendMessage(m.from, {
      image: { url: videoData.thumbnail },
      caption
    }, { quoted: mek })

    // Listen for user reply with number options
    conn.ev.on('messages.upsert', async (msgUpdate) => {
      const msg = msgUpdate.messages[0]
      if (!msg.message || !msg.message.extendedTextMessage) return
      if (msg.key.fromMe || msg.key.remoteJid !== m.from) return
      if (!msg.message.extendedTextMessage.contextInfo?.stanzaId) return

      // Make sure reply is to our original message
      if (msg.message.extendedTextMessage.contextInfo.stanzaId !== mek.key.id) return

      const selected = msg.message.extendedTextMessage.text.trim()

      if (selected === '1.1') {
        return await conn.sendMessage(m.from, { text: `🔗 No Watermark Video:\n${videoData.video.noWatermark}` }, { quoted: mek })
      }
      if (selected === '1.2') {
        return await conn.sendMessage(m.from, { text: `🔗 With Watermark Video:\n${videoData.video.withWatermark}` }, { quoted: mek })
      }
      if (selected === '2') {
        return await conn.sendMessage(m.from, { text: `🔊 Audio URL:\n${videoData.audio}` }, { quoted: mek })
      }

      // Invalid option
      await conn.sendMessage(m.from, { text: '❌ Invalid option. Please reply with 1.1, 1.2, or 2.' }, { quoted: mek })
    })

  } catch (error) {
    console.error(error)
    reply('❌ An error occurred while fetching the TikTok video.')
  }
})
