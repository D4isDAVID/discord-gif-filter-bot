import { ButtonStyle, ComponentType } from '@discordjs/core';
import { Button } from '../../../../../data.js';
import modal from './modal.js';

export default {
    data: {
        type: ComponentType.Button,
        custom_id: 'set_max_size_button',
        style: ButtonStyle.Primary,
        label: 'Set Max Size',
    },
    async execute({ data: interaction, api }) {
        await api.interactions.createModal(
            interaction.id,
            interaction.token,
            modal.data,
        );
    },
} satisfies Button;
