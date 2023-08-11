import { GatewayDispatchEvents } from '@discordjs/core';
import { client } from '../../../env.js';
import { GatewayEvent } from '../../data.js';
import { channelCache, guildMemberCache, guildRoleCache } from '../objects.js';

export default {
    name: GatewayDispatchEvents.GuildCreate,
    type: 'on',
    async execute({ data: guild }) {
        guildMemberCache[guild.id] = {};
        const { members } = await client.requestGuildMembers({
            guild_id: guild.id,
            limit: 0,
            query: '',
        });
        for (const member of members)
            guildMemberCache[guild.id]![member.user!.id] = member;

        guildRoleCache[guild.id] = {};
        for (const role of guild.roles)
            guildRoleCache[guild.id]![role.id] = role;

        for (const channel of guild.channels)
            channelCache[channel.id] = channel;
    },
} satisfies GatewayEvent<GatewayDispatchEvents.GuildCreate>;
