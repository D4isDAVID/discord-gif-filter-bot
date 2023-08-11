import { ComponentType } from '@discordjs/core';
import { roleMention, userMention } from '@discordjs/formatters';
import { lazy } from '@discordjs/util';
import { MentionableSelect } from '../../../../../data.js';
import config, { ExceptionType } from '../../../../config.js';

const getCreateConfigMessage = lazy(
    async () => (await import('../../message.js')).createConfigMessage,
);

export default {
    data: {
        type: ComponentType.MentionableSelect,
        custom_id: 'add_exception_mentionable_select',
        min_values: 1,
        max_values: 1,
    },
    async execute({ data: interaction, api }) {
        const mentionable = interaction.data.values[0]!;
        const isRole = !!interaction.data.resolved.roles;

        await api.interactions.deferMessageUpdate(
            interaction.id,
            interaction.token,
        );

        const guildConfig = config.get(interaction.guild_id!);
        if (!guildConfig.exceptions[mentionable]) {
            guildConfig.exceptions[mentionable] = {
                type: isRole ? ExceptionType.Role : ExceptionType.User,
            };
            await config.write();
        }

        const mention = isRole ? roleMention : userMention;
        await api.interactions.editReply(
            interaction.application_id,
            interaction.token,
            (await getCreateConfigMessage())(guildConfig, {
                content: `Successfully added ${mention(
                    mentionable,
                )} as an exception.`,
            }),
        );
    },
} satisfies MentionableSelect;
