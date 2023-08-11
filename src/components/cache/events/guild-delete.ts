import { GatewayDispatchEvents } from '@discordjs/core';
import { GatewayEvent } from '../../data.js';
import { guildMemberCache, guildRoleCache } from '../objects.js';

export default {
    name: GatewayDispatchEvents.GuildDelete,
    type: 'on',
    async execute({ data: guild }) {
        delete guildMemberCache[guild.id];
        delete guildRoleCache[guild.id];
    },
} satisfies GatewayEvent<GatewayDispatchEvents.GuildDelete>;
