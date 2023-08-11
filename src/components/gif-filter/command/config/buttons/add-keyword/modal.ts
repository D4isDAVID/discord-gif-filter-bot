import { ComponentType, TextInputStyle } from '@discordjs/core';
import { lazy } from '@discordjs/util';
import { Modal } from '../../../../../data.js';
import { mapModalTextInputValues } from '../../../../../interactions.js';
import config from '../../../../config.js';

const getCreateConfigMessage = lazy(
    async () => (await import('../../message.js')).createConfigMessage,
);

export default {
    data: {
        custom_id: 'add_keyword_modal',
        title: 'Add Blacklisted Keyword',
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.TextInput,
                        custom_id: 'keyword',
                        label: 'Keyword',
                        style: TextInputStyle.Short,
                        required: true,
                    },
                ],
            },
        ],
    },
    async execute({ data: interaction, api }) {
        const { keyword } = mapModalTextInputValues(interaction.data);
        await api.interactions.deferMessageUpdate(
            interaction.id,
            interaction.token,
        );

        const guildConfig = config.get(interaction.guild_id!);
        if (!guildConfig.keywords.includes(keyword!)) {
            guildConfig.keywords.push(keyword!);
            await config.write();
        }

        await api.interactions.editReply(
            interaction.application_id,
            interaction.token,
            (await getCreateConfigMessage())(guildConfig, {
                content: `Successfully added \`${keyword}\` as a blacklisted keyword.`,
            }),
        );
    },
} satisfies Modal;
