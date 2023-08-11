import { ButtonStyle, ComponentType } from '@discordjs/core';
import { lazy } from '@discordjs/util';
import { Button } from '../../../../../data.js';
import config from '../../../../config.js';
import channelSelect from './channel-select.js';
import mentionableSelect from './mentionable-select.js';

const getCreateConfigMessage = lazy(
    async () => (await import('../../message.js')).createConfigMessage,
);
const getWithCancelButton = lazy(
    async () => (await import('../cancel.js')).withCancelButton,
);

export default {
    data: {
        type: ComponentType.Button,
        custom_id: 'add_exception_button',
        style: ButtonStyle.Primary,
        label: 'Add Exception',
    },
    async execute({ data: interaction, api }) {
        const guildConfig = config.get(interaction.guild_id!);

        await api.interactions.updateMessage(
            interaction.id,
            interaction.token,
            (await getCreateConfigMessage())(guildConfig, {
                components: (await getWithCancelButton())([
                    {
                        type: ComponentType.ActionRow,
                        components: [mentionableSelect.data],
                    },
                    {
                        type: ComponentType.ActionRow,
                        components: [channelSelect.data],
                    },
                ]),
            }),
        );
    },
} satisfies Button;
