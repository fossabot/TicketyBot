// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../config");
import { readdirSync } from "fs";
import { join } from "path";
import { TicketyClient } from "./struct/Client";
const client = new TicketyClient({
    token: config.token,
    prefix: config.prefix,
});

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

// Login
client.login(client.config.token);