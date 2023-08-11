import {
    APIChannel,
    APIGuildMember,
    APIRole,
    Snowflake,
} from '@discordjs/core';

export const guildMemberCache: Record<
    Snowflake,
    Record<Snowflake, APIGuildMember>
> = {};

export const guildRoleCache: Record<Snowflake, Record<Snowflake, APIRole>> = {};

export const channelCache: Record<Snowflake, APIChannel> = {};
