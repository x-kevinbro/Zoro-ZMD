const config = require('../config');
const { cmd } = require('../command');
const fs = require('fs');
const { sleep } = require('../lib/functions')


//======================================================================================================================
cmd({
    pattern: "join",
    fromMe: true,  // Only bot owner can use this command
    desc: "Make the bot join a group using an invite link.",
    category: "admin",
    react: "🌀",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, args, q, reply }) => {
    try {
        // Check if invite link is provided
        if (!q || !q.includes("chat.whatsapp.com")) {
            return await reply("Please provide a valid WhatsApp group invite link.");
        }
        // Extract the group code from the invite link
        const inviteCode = q.split("chat.whatsapp.com/")[1];
        // Make the bot join the group using the invite code
        const response = await conn.groupAcceptInvite(inviteCode);
        // Send confirmation message if successfully joined
        if (response) {
            await reply("✅ Successfully joined the group!");
        } else {
            await reply("❌ Failed to join the group. Please check the invite link.");
        }
    } catch (e) {
        console.error("Error while joining group:", e);
        await reply("❗ An error occurred while trying to join the group.");
    }
});
//============================================================================================================================
// Leave Command
cmd({
    pattern: "left",
    fromMe: true,  // Only bot owner can use this command
    desc: "Make the bot leave the group.",
    category: "admin",
    react: "👋",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return await reply("❌ This command can only be used in a group.");
        }
        // Make the bot leave the group
        await conn.groupLeave(from);
        // Send confirmation message after leaving the group
        console.log(`Bot left the group: ${from}`);
    } catch (e) {
        console.error("Error while leaving group:", e);
        await reply("❗ An error occurred while trying to leave the group.");
    }
});
//============================================================================================================================
// Hidetag Command
cmd({
    pattern: "hidetag",
    fromMe: true,  // Only bot owner can use this command
    desc: "Send a message with hidden tags to all group members.",
    category: "group",
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, args, q, participants, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return await reply("❌ This command can only be used in a group.");
        }
        // Check if a message is provided
        if (!q) {
            return await reply("❗ Please provide a message to send.");
        }
        // Extract group participants' contact IDs
        const participantIds = participants.map((participant) => participant.id);
        // Send the message with hidden tags
        await conn.sendMessage(from, { 
            text: q, 
            mentions: participantIds 
        });
        console.log("Hidetag message sent to all group members.");
    } catch (e) {
        console.error("Error while sending hidetag message:", e);
        await reply("❗ An error occurred while trying to send the hidetag message.");
    }
});
//======================================================================================================================
cmd({
    pattern: "restart",
    fromMe: true,
    desc: "restart the bot",
    category: "owner",
    react: "🔄",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!isOwner)return
const {exec} = require("child_process")
reply("𝗕𝗵𝗮𝘀𝗵𝗶 𝗠𝗗 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴...")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}
})
//======================================================================================================================
cmd({
    pattern: "upgrade",
    fromMe: true,
    desc: "Redeploy the bot.",
    category: "owner",
    react: "🔄",
    filename: __filename
},
async (conn, mek, m, { from, isGroup, isOwner, reply }) => {
    try {
        if (!isOwner) return reply('This command can only be used by the bot owner.');

        // Inform the owner that the upgrade process is starting
        await reply('🔄 Redeploying the bot...');

        // Execute the redeploy command
        // The actual command will depend on your deployment process
        exec('bash redeploy.sh', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                return reply(`❌ Error occurred during redeployment.`);
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return reply(`❌ Error: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
            reply(`✅ Bot redeployment successful.`);
        });
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e}`);
    }
});
//======================================================================================================================

//======================================================================================================================

//======================================================================================================================
cmd({
    pattern: "broadcast",
    fromMe: true,
    desc: "📢 Broadcast a message to all chats",
    react: "📢",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { args, reply }) => {
    const message = args.join(" ");
    if (!message) return reply("❗ Please provide a message to broadcast.");
    
    const chats = await conn.getAllChats();
    let successCount = 0;
    
    for (let chat of chats) {
        try {
            await conn.sendMessage(chat.id, { text: `📢 *BROADCAST MESSAGE*\n\n${message}` });
            successCount++;
        } catch (error) {
            console.error(`Failed to send broadcast to ${chat.id}:`, error);
        }
    }
    
    reply(`✅ Broadcast sent to ${successCount} chats successfully!`);
});

//======================================================================================================================
cmd({
    pattern: "ban",
    fromMe: true,
    desc: "🚫 Ban a user from using the bot or quoted user",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    const userToBan = (m.quoted ? m.quoted.sender : args[0])?.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

    if (!userToBan) return reply("❗ Please provide a valid user number to ban or quote a user.");

    const blacklistPath = path.join(__dirname, '../DATABASE/blacklist.json');
    let blacklistData;

    try {
        blacklistData = JSON.parse(fs.readFileSync(blacklistPath, 'utf8'));
    } catch (err) {
        console.error("Error reading blacklist:", err);
        return reply("❗ Unable to read the blacklist data. Please try again later.");
    }

    if (!blacklistData.jids.includes(userToBan)) {
        blacklistData.jids.push(userToBan);
        fs.writeFileSync(blacklistPath, JSON.stringify(blacklistData, null, 2), 'utf8');
        reply(`🚫 User ${userToBan} has been banned from using the bot.`);
    } else {
        reply("❗ User is already banned.");
    }
});
//======================================================================================================================
// Unban Command
cmd({
    pattern: "unban",
    desc: "✅ Unban a user or quoted user",
    fromMe: true,
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    // Determine if the command is for a quoted user or by a number
    const userToUnban = (m.quoted ? m.quoted.sender : args[0])?.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

    if (!userToUnban) return reply("❗ Please provide a user's number to unban or quote a user.");

    // Read the existing blacklist from the JSON file
    const blacklistPath = path.join(__dirname, '../DATABASE/blacklist.json');
    let blacklistData;

    try {
        blacklistData = JSON.parse(fs.readFileSync(blacklistPath, 'utf8'));
    } catch (err) {
        console.error("Error reading blacklist:", err);
        return reply("❗ An error occurred while reading the blacklist.");
    }

    // Remove the user from the blacklist and update the file
    if (blacklistData.jids.includes(userToUnban)) {
        blacklistData.jids = blacklistData.jids.filter(user => user !== userToUnban);
        fs.writeFileSync(blacklistPath, JSON.stringify(blacklistData, null, 2), 'utf8');
        reply(`✅ User ${userToUnban} has been unbanned.`);
    } else {
        reply("❗ User is not in the blacklist.");
    }
});

//======================================================================================================================
cmd({
    pattern: "setbotname",
    desc: "✏️ Change the bot's name",
    fromMe: true,
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    
    const newName = args.join(" ");
    if (!newName) return reply("❗ Please provide a new name for the bot.");
    
    await conn.updateProfileName(newName);
    reply(`✅ Bot's name has been changed to: *${newName}*`);
});

//======================================================================================================================
cmd({
    pattern: "setbotbio",
    desc: "✏️ Change the bot's bio",
    fromMe: true,
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    
    const newBio = args.join(" ");
    if (!newBio) return reply("❗ Please provide a new bio for the bot.");
    
    await conn.updateProfileStatus(newBio);
    reply(`✅ Bot's bio has been changed to: *${newBio}*`);
});

//======================================================================================================================
cmd({
    pattern: "block",
    desc: "🚫 Block a user or quoted user",
    fromMe: true,
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    // Determine if the command is for a quoted user or by a number
    const userToBlock = (m.quoted ? m.quoted.sender : args[0])?.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

    if (!userToBlock) return reply("❗ Please provide a user's number to block or quote a user.");

    try {
        await conn.updateBlockStatus(userToBlock, "block");
        reply(`🚫 User ${userToBlock} has been blocked.`);
    } catch (error) {
        console.error("Error blocking user:", error);
        reply("❗ An error occurred while blocking the user.");
    }
});

//======================================================================================================================
cmd({
    pattern: "unblock",
    desc: "✅ Unblock a user or quoted user",
    fromMe: true,
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    // Determine if the command is for a quoted user or by a number
    const userToUnblock = (m.quoted ? m.quoted.sender : args[0])?.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

    if (!userToUnblock) return reply("❗ Please provide a user's number to unblock or quote a user.");

    try {
        await conn.updateBlockStatus(userToUnblock, "unblock");
        reply(`✅ User ${userToUnblock} has been unblocked.`);
    } catch (error) {
        console.error("Error unblocking user:", error);
        reply("❗ An error occurred while unblocking the user.");
    }
});
//======================================================================================================================
cmd({
    pattern: "setpp",
    desc: "🖼️ Set bot's profile picture",
    fromMe: true,
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { reply, isOwner }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    
    const media = m.message?.imageMessage || m.message?.videoMessage;
    if (!media || !media.url) return reply("❗ No image or video found.");
    
    try {
        const buffer = await conn.downloadMediaMessage(m);
        await conn.updateProfilePicture(buffer);
        reply("✅ Profile picture has been updated.");
    } catch (error) {
        console.error("Failed to update profile picture:", error);
        reply("❗ Failed to update profile picture.");
    }
});

let autoBioInterval;

//======================================================================================================================
cmd({
    pattern: "setautobio",
    alias: ["autobio"],
    fromMe: true,
    desc: "Enable or disable the AutoBIO feature.",
    category: "owner",
    react: "🛠️",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    config.autoBioEnabled = !config.autoBioEnabled;

    if (config.autoBioEnabled) {
        reply("🛠️ AutoBIO feature has been *enabled*! 🔄");
        startAutoBio(conn);
    } else {
        reply("🛠️ AutoBIO feature has been *disabled*! 🚫");
        stopAutoBio();
    }
});

// 2. Start AutoBIO
function startAutoBio(conn) {
    // Clear any existing interval to avoid duplicates
    if (autoBioInterval) clearInterval(autoBioInterval);

    // Set a new interval to update the bio every minute (or any preferred time)
    autoBioInterval = setInterval(async () => {
        const time = new Date().toLocaleTimeString();  // Get the current time
        const bioText = `🌟 BHASHI-MD [${time}] 🌟`;  // Set the bio text with time
        await conn.updateProfileStatus(bioText);  // Update the bot's bio
    }, 60 * 1000);  // 1 minute interval
}

// 3. Stop AutoBIO
function stopAutoBio() {
    if (autoBioInterval) {
        clearInterval(autoBioInterval);  // Stop the interval
        autoBioInterval = null;
        console.log("🛠️ AutoBIO feature stopped.");  // Log the stopping of the feature
    }
}
