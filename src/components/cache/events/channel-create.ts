import { GatewayDispatchEvents } from '@discordjs/core';
import { GatewayEvent } from '../../data.js';
import { channelCache } from '../objects.js';

export default {
    name: GatewayDispatchEvents.ChannelCreate,
    type: 'on',
    async execute({ data: channel }) {
        channelCache[channel.id] = channel;
    },
} satisfies GatewayEvent<GatewayDispatchEvents.ChannelCreate>;
