import { GatewayDispatchEvents } from '@discordjs/core';
import { GatewayEvent } from '../../data.js';
import { guildMemberCache } from '../objects.js';

export default {
    name: GatewayDispatchEvents.GuildMemberUpdate,
    type: 'on',
    async execute({ data: member }) {
        const originalMember =
            guildMemberCache[member.guild_id]![member.user!.id]!;

        originalMember.user = member.user;
    },
} satisfies GatewayEvent<GatewayDispatchEvents.GuildMemberUpdate>;
