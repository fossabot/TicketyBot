import { Client, Collection } from "discord.js";

type TicketyConfig = {
    token: string,
    prefix: string,
};

export class TicketyClient extends Client {
    commands = new Collection<never, never>();
    config: TicketyConfig;

    constructor(config: TicketyConfig) {
        super({
            disableMentions: "everyone",
        });
        this.config = config;
    }
}