import { GatewayDispatchEvents } from '@discordjs/core';
import { userMention } from '@discordjs/formatters';
import { GatewayEvent } from '../data.js';
import config from './config.js';

export default {
    name: GatewayDispatchEvents.MessageCreate,
    type: 'on',
    async execute({ data: message, api }) {
        if (
            message.author.bot ||
            message.embeds.length === 0 ||
            !message.member
        )
            return;

        const guildConfig = config.get(message.guild_id!);

        if (
            guildConfig.exceptions[message.author.id] ||
            guildConfig.exceptions[message.channel_id]
        )
            return;

        for (const role of message.member.roles)
            if (guildConfig.exceptions[role]) return;

        for (const { thumbnail, video } of message.embeds) {
            const width = thumbnail?.width || video?.width || -1;
            const height = thumbnail?.height || video?.height || -1;

            if (width > guildConfig.maxSize || height > guildConfig.maxSize) {
                await api.channels.deleteMessage(
                    message.channel_id,
                    message.id,
                    { reason: 'Embed is too big' },
                );
                await api.channels.createMessage(message.channel_id, {
                    content: `${userMention(
                        message.author.id,
                    )}, please don't send embeds too big in pixel size.`,
                });
                return;
            }

            for (const keyword of guildConfig.keywords)
                if (
                    thumbnail?.url.includes(keyword) ||
                    video?.url?.includes(keyword)
                ) {
                    await api.channels.deleteMessage(
                        message.channel_id,
                        message.id,
                        { reason: 'Contains blacklisted keyword' },
                    );
                    await api.channels.createMessage(message.channel_id, {
                        content: `${userMention(
                            message.author.id,
                        )}, your embed contains blacklisted keywords.`,
                    });
                    return;
                }
        }
    },
} satisfies GatewayEvent<GatewayDispatchEvents.MessageCreate>;
