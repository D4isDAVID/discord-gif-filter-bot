import { ButtonStyle, ComponentType } from '@discordjs/core';
import { Button } from '../../../../../data.js';
import modal from './modal.js';

export default {
    data: {
        type: ComponentType.Button,
        custom_id: 'add_keyword_button',
        style: ButtonStyle.Primary,
        label: 'Add Keyword',
    },
    async execute({ data: interaction, api }) {
        await api.interactions.createModal(
            interaction.id,
            interaction.token,
            modal.data,
        );
    },
} satisfies Button;
