import { ComponentType } from '@discordjs/core';
import { lazy } from '@discordjs/util';
import { StringSelect } from '../../../../../data.js';
import config from '../../../../config.js';

const getCreateConfigMessage = lazy(
    async () => (await import('../../message.js')).createConfigMessage,
);

export default {
    data: {
        type: ComponentType.StringSelect,
        custom_id: 'remove_exception_select',
        options: [],
        min_values: 1,
        max_values: 1,
    },
    async execute({ data: interaction, api }) {
        const exception = interaction.data.values[0]!;

        await api.interactions.deferMessageUpdate(
            interaction.id,
            interaction.token,
        );

        const guildConfig = config.get(interaction.guild_id!);
        if (guildConfig.exceptions[exception]) {
            delete guildConfig.exceptions[exception];
            await config.write();
        }

        await api.interactions.editReply(
            interaction.application_id,
            interaction.token,
            (await getCreateConfigMessage())(guildConfig),
        );
    },
} satisfies StringSelect;
