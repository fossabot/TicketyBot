export default {
    name: "ping",
    description: "Get bot & api latency",
    async execute(client:any, message:any) {
        const msg = await message.channel.send("Pinging... 🏓");
        msg.edit(`Bot Latency: ${msg.createdAt - message.createdTimestamp}ms \nGateway Latency: ${client.ws.ping}ms`);
    }
}