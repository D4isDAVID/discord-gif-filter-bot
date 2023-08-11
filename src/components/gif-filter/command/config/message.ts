import { APIInteractionResponseCallbackData } from '@discordjs/core';
import { ConfigData } from '../../config.js';
import buttons from './buttons/index.js';
import { createConfigEmbed } from './embed.js';

export const createConfigMessage = (
    guildConfig: ConfigData,
    additionalData: APIInteractionResponseCallbackData = {},
): APIInteractionResponseCallbackData => ({
    content: '',
    embeds: [createConfigEmbed(guildConfig)],
    components: buttons,
    ...additionalData,
});
