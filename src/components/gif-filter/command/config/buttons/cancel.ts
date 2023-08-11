import {
    APIActionRowComponent,
    APIMessageActionRowComponent,
    ButtonStyle,
    ComponentType,
} from '@discordjs/core';
import { Button } from '../../../../data.js';
import config from '../../../config.js';
import { createConfigMessage } from '../message.js';

const cancel = {
    data: {
        type: ComponentType.Button,
        custom_id: 'config_cancel_button',
        style: ButtonStyle.Primary,
        label: 'Cancel',
    },
    async execute({ data: interaction, api }) {
        await api.interactions.deferMessageUpdate(
            interaction.id,
            interaction.token,
        );

        const guildConfig = config.get(interaction.guild_id!);

        await api.interactions.editReply(
            interaction.application_id,
            interaction.token,
            createConfigMessage(guildConfig, {
                content: `Action was cancelled.`,
            }),
        );
    },
} satisfies Button;
export default cancel;

export const withCancelButton = (
    components: APIActionRowComponent<APIMessageActionRowComponent>[],
) => {
    components.push({
        type: ComponentType.ActionRow,
        components: [cancel.data],
    });
    return components;
};
