/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import {logCommandExecutes} from "../utils/logCommandExecutes";

const config = require("../../config");

export default {
    name: "ticket",
    description: "Create a new ticket",
    aliases: ["new"],
    async execute(client:any, message:any, args:any) {
        try {
            let reason = args.slice(0).join(" ");
            if (!reason || reason === undefined || reason === null || reason === "") reason = "No Reason Specified";

            const ticket = await message.guild.channels.create(`ticket-${message.author.id}`, {
                parent: config.ticket_parent,
                type: "text",
                topic: `Reason: ${reason}`,
                permissionOverwrites: [{
                    id: message.guild.id,
                    deny: ["VIEW_CHANNEL"],
                }, {
                    id: message.author.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS"]
                }, {
                    id: config.support_role,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS"]
                }],
            });
            message.channel.send(`✅ Your ticket has been created at ${ticket}`);
            logCommandExecutes(message, `Ticket ${ticket} has been created by ${message.author.tag}`);
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
}