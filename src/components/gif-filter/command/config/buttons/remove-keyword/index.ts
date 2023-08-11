import {
    APIStringSelectComponent,
    ButtonStyle,
    ComponentType,
} from '@discordjs/core';
import { lazy } from '@discordjs/util';
import { Button } from '../../../../../data.js';
import config from '../../../../config.js';
import stringSelect from './select.js';

const getCreateConfigMessage = lazy(
    async () => (await import('../../message.js')).createConfigMessage,
);
const getWithCancelButton = lazy(
    async () => (await import('../cancel.js')).withCancelButton,
);

export default {
    data: {
        type: ComponentType.Button,
        custom_id: 'remove_keyword_button',
        style: ButtonStyle.Primary,
        label: 'Remove Keyword',
    },
    async execute({ data: interaction, api }) {
        const guildConfig = config.get(interaction.guild_id!);

        if (guildConfig.keywords.length === 0) {
            await api.interactions.updateMessage(
                interaction.id,
                interaction.token,
                (await getCreateConfigMessage())(guildConfig, {
                    content: 'No keywords to remove.',
                }),
            );
            return;
        }

        const stringSelectData = stringSelect.data as APIStringSelectComponent;
        stringSelectData.options = [];

        for (const keyword of guildConfig.keywords)
            stringSelectData.options.push({ label: keyword, value: keyword });

        await api.interactions.updateMessage(
            interaction.id,
            interaction.token,
            (await getCreateConfigMessage())(guildConfig, {
                components: (await getWithCancelButton())([
                    {
                        type: ComponentType.ActionRow,
                        components: [stringSelectData],
                    },
                ]),
            }),
        );
    },
} satisfies Button;
