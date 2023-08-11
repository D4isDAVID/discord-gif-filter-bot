import { ApplicationCommandOptionType, MessageFlags } from '@discordjs/core';
import { Subcommand } from '../../../subcommands.js';
import config from '../../config.js';
import { createConfigMessage } from './message.js';

export default {
    data: {
        type: ApplicationCommandOptionType.Subcommand,
        name: 'config',
        description: 'Manage the gif filter config.',
    },
    async execute({ data: interaction, api }) {
        await api.interactions.defer(interaction.id, interaction.token, {
            flags: MessageFlags.Ephemeral,
        });

        const guildConfig = config.get(interaction.guild_id!);

        await api.interactions.editReply(
            interaction.application_id,
            interaction.token,
            createConfigMessage(guildConfig),
        );
    },
} satisfies Subcommand;
