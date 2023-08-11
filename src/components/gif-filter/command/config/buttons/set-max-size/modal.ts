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
        custom_id: 'set_max_size_modal',
        title: 'Set Max Size',
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        type: ComponentType.TextInput,
                        custom_id: 'max_size',
                        label: 'Max Size',
                        style: TextInputStyle.Short,
                        required: true,
                    },
                ],
            },
        ],
    },
    async execute({ data: interaction, api }) {
        const { max_size } = mapModalTextInputValues(interaction.data);
        const maxSize = parseInt(max_size!);
        const guildConfig = config.get(interaction.guild_id!);

        if (isNaN(maxSize)) {
            await api.interactions.updateMessage(
                interaction.id,
                interaction.token,
                (await getCreateConfigMessage())(guildConfig, {
                    content: 'Please provide a valid number.',
                }),
            );
            return;
        }

        await api.interactions.deferMessageUpdate(
            interaction.id,
            interaction.token,
        );

        guildConfig.maxSize = maxSize;
        await config.write();

        await api.interactions.editReply(
            interaction.application_id,
            interaction.token,
            (await getCreateConfigMessage())(guildConfig, {
                content: `Successfully set the max size to ${maxSize}.`,
            }),
        );
    },
} satisfies Modal;
