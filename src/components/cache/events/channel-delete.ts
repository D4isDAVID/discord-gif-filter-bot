import { GatewayDispatchEvents } from '@discordjs/core';
import { GatewayEvent } from '../../data.js';
import { channelCache } from '../objects.js';

export default {
    name: GatewayDispatchEvents.ChannelDelete,
    type: 'on',
    async execute({ data: channel }) {
        delete channelCache[channel.id];
    },
} satisfies GatewayEvent<GatewayDispatchEvents.ChannelDelete>;
