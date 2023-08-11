import { GatewayDispatchEvents } from '@discordjs/core';
import { GatewayEvent } from '../../data.js';
import { guildRoleCache } from '../objects.js';

export default {
    name: GatewayDispatchEvents.GuildRoleCreate,
    type: 'on',
    async execute({ data: { guild_id, role } }) {
        guildRoleCache[guild_id]![role.id] = role;
    },
} satisfies GatewayEvent<GatewayDispatchEvents.GuildRoleCreate>;
