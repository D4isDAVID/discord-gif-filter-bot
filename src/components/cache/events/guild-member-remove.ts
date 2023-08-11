import { GatewayDispatchEvents } from '@discordjs/core';
import { GatewayEvent } from '../../data.js';
import { guildMemberCache } from '../objects.js';

export default {
    name: GatewayDispatchEvents.GuildMemberRemove,
    type: 'on',
    async execute({ data: member }) {
        delete guildMemberCache[member.guild_id]![member.user!.id];
    },
} satisfies GatewayEvent<GatewayDispatchEvents.GuildMemberRemove>;
