import { APIEmbed } from '@discordjs/core';
import {
    channelMention,
    roleMention,
    userMention,
} from '@discordjs/formatters';
import { ConfigData, ExceptionType } from '../../config.js';

const exceptionFormatterMap = {
    [ExceptionType.User]: userMention,
    [ExceptionType.Role]: roleMention,
    [ExceptionType.Channel]: channelMention,
};

export const createConfigEmbed = (guildConfig: ConfigData): APIEmbed => ({
    title: 'GIF Filter Config',
    color: 0x2b2d31,
    fields: [
        {
            name: 'Max Size',
            value: [
                'The max size allowed for gifs.',
                `Value: \`${guildConfig.maxSize}\``,
            ].join('\n'),
        },
        {
            name: 'Keywords',
            value: [
                'Blacklisted keywords.',
                `Value: ${guildConfig.keywords
                    .map((keyword) => `\`${keyword}\``)
                    .join(', ')}`,
            ].join('\n'),
        },
        {
            name: 'Exceptions',
            value: [
                'Excepted users, roles, and channels.',
                `Value: ${Object.entries(guildConfig.exceptions)
                    .map(([id, { type }]) => exceptionFormatterMap[type](id))
                    .join(', ')}`,
            ].join('\n'),
        },
    ],
});
