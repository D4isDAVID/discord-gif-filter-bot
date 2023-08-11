import { GatewayDispatchEvents } from '@discordjs/core';
import { GatewayEvent } from '../../data.js';
import { guildRoleCache } from '../objects.js';

export default {
    name: GatewayDispatchEvents.GuildRoleDelete,
    type: 'on',
    async execute({ data: { guild_id, role_id } }) {
        delete guildRoleCache[guild_id]![role_id];
    },
} satisfies GatewayEvent<GatewayDispatchEvents.GuildRoleDelete>;
