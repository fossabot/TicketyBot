// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../../config");

export default {
    name: "ticket",
    description: "Create a new ticket",
    aliases: ["new"],
    async execute(client:any, message:any, args:any) {
        try {
            const ticket = await message.guild.channels.create(`ticket-${message.author.id}`, {
                parent: config.ticket_parent,
                type: "text",
                permissionOverwrites: [{
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                }, {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }],
            });
            message.channel.send(`Your ticket has been created at ${ticket}`);
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
}