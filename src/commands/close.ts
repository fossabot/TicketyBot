// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../../config");

export default {
    name: "close",
    description: "Closes an existing ticket",
    async execute(client:any, message:any, args:any) {
        if (message.channel.parentID !== config.ticket_parent) return message.channel.send("❌ This command can only be executed inside a ticket!");

        if (config.confirm_ticket_close === true && !message.member.roles.cache.get(config.support_role)) {
            message.channel.send("⚠ Are you sure you want to close this ticket?").then(async (msg: { react: (arg0: string) => any; }) => {
                await msg.react("✅");
                await msg.react("❌");

                client.once("messageReactionAdd", async (reaction: any, user: any) => {
                    if (user.bot) return;
                    if (message.author.id !== user.id) return;
                    if (reaction.emoji.name === "✅") return await message.channel.delete();
                    if (reaction.emoji.name === "❌") return message.channel.send("✅ Aborted closing ticket!");
                    if (reaction.count > 2) return;
                });
            });
        } else {
            await message.channel.delete();
        }
    }
}