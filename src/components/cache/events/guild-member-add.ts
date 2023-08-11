import { GatewayDispatchEvents } from '@discordjs/core';
import { GatewayEvent } from '../../data.js';
import { guildMemberCache } from '../objects.js';

export default {
    name: GatewayDispatchEvents.GuildMemberAdd,
    type: 'on',
    async execute({ data: member }) {
        guildMemberCache[member.guild_id]![member.user!.id] = member;
    },
} satisfies GatewayEvent<GatewayDispatchEvents.GuildMemberAdd>;
