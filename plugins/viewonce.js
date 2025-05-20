/*
Dont Remove Credit;
        CREDIT BY 𝐒𝐔𝐋𝐀-𝐌𝐃 OWNER SULAKSHA MADARA
        SUPPORT - https://whatsapp.com/channel/0029Vb65iOZKwqSNKecV8V07

Credit Remove කරන්න තරම් තිරිසනෙක් වෙන්න එපා ඕයි ☹
*/

const fs = require("fs"); // Explicitly import the fs module
const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "vv",
    react: "🥱",
    alias: ["retrive", "viewonce"],
    desc: "Fetch and resend a ViewOnce message content (image/video/voice).",
    category: "misc",
    use: "<reply to viewonce>",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        if (!m.quoted) return reply("Please reply to a ViewOnce message.");

        const mime = m.quoted.type;
        let ext, mediaType;

        if (mime === "imageMessage") {
            ext = "jpg";
            mediaType = "image";
        } else if (mime === "videoMessage") {
            ext = "mp4";
            mediaType = "video";
        } else if (mime === "audioMessage") {
            ext = "mp3";
            mediaType = "audio";
        } else {
            return reply("Please reply to an image, video, or audio message 🔥.");
        }

        const buffer = await m.quoted.download();
        const filePath = Date.now() + "." + ext; // Corrected filePath generation

        fs.writeFileSync(filePath, buffer);

        const mediaObj = {};
        mediaObj[mediaType] = fs.readFileSync(filePath);

        await conn.sendMessage(m.chat, mediaObj);

        fs.unlinkSync(filePath);

    } catch (e) {
        console.error("Error fetching ViewOnce:", e); // Use console.error for errors
        reply("An error occurred while fetching the ViewOnce message.", e.message || e); // Include error message if available
    }
});

//Plugin වටේ යවන්න එපා ඈ/     any issue have this plugin
