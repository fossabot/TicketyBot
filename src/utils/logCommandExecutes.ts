// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../../config");

export function logCommandExecutes(message:any, data:string) {
    if (config.log_command_executes === true) {
        message.guild.channels.cache.get(config.ticket_log_channel).send(data);
    }
    else {
        return;
    }
}