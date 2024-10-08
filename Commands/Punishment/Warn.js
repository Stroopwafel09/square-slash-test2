// Commands/Punishments/Warn.js

const Command = require("../../Utils/Command.js");
const warningSystem = require("../../WarningSystem.js"); // Import the singleton instance

class Warn extends Command {
    constructor(Bot) {
        super(Bot, {
            enabled: true,
            required_perm: "MANAGE_MESSAGES",
            usages: ["warn"],
            description: "Warn a member in the guild.",
            category: "Moderation",
            options: [{
                name: "user",
                description: "Enter target user.",
                type: 6, // USER type
                required: true
            },
            {
                name: "reason",
                description: "Reason for the warning.",
                type: 3, // STRING type
                required: true
            }]
        });
    }

    load() {
        return;
    }

    async run(interaction, guild, member, args) {
        const Target = guild.members.cache.get(args[0].value);
        const reason = args[1].value;

        if (!Target) {
            return await this.Bot.send(interaction, `❌ User not found in this guild!`);
        }

        warningSystem.addWarning(Target.id, reason); // Use the shared instance
        return await this.Bot.send(interaction, `✅ ${Target} has been warned for: ${reason}`);
    }
}

module.exports = Warn;
