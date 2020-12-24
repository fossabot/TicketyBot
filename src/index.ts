// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../config");
import { readdirSync } from "fs";
import { join } from "path";
import { TicketyClient } from "./struct/Client";
import { checkConfigTypes } from "./utils/checkConfigTypes";
const client = new TicketyClient({
    token: config.token,
    prefix: config.prefix,
});

// Command Handler
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(`./commands/${file}`);
    client.commands.set(command.default.name, command.default);
    console.log(`${file} loaded`);
}

// Verify NodeJS Version
const REQUIRED_NODE_VERSION = "15.0.0";
const requiredParts = REQUIRED_NODE_VERSION.split(".").map(v => parseInt(v, 10));
const actualVersionParts = process.versions.node.split(".").map(v => parseInt(v, 10));
for (const [i, part] of actualVersionParts.entries()) {
    if (part > requiredParts[i]) break;
    if (part === requiredParts[i]) break;
    throw new Error(`Error: Unsupported Node.js version! Must be at least ${REQUIRED_NODE_VERSION}`);
}

// Ready Event
client.once("ready", () => {
   console.log(`Logged in as ${client.user?.tag ?? ""}`);

   try {
       void client.user?.setPresence({
           status: "dnd",
           activity: {
               name: config.presence_message,
               type: config.presence_type
           },
       });
   }
   catch (err) {
       console.error(`Could not set startup presence: ${err}`);
       process.exit(1);
   }
});

// Message Event
client.on("message", message => {
   if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;
   const args = message.content.slice(client.config.prefix.length).split(/ +/);
   const commandName = args.shift()!.toLowerCase();
   const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases && cmd.aliases.includes(commandName));
   if (!command) return;
   if (message.channel.type !== "text") return;

   try {
       command.execute(client, message, args);
   }
   catch (err) {
       console.error(`Could not load ${commandName} command: ${err}`);
       process.exit(1);
   }
});

// Check Config Value Types
checkConfigTypes(config);

// Login
client.login(client.config.token);