import { ChannelType, ComponentType } from '@discordjs/core';
import { channelMention } from '@discordjs/formatters';
import { lazy } from '@discordjs/util';
import { ChannelSelect } from '../../../../../data.js';
import config, { ExceptionType } from '../../../../config.js';

const getCreateConfigMessage = lazy(
    async () => (await import('../../message.js')).createConfigMessage,
);

export default {
    data: {
        type: ComponentType.ChannelSelect,
        custom_id: 'add_exception_channel_select',
        min_values: 1,
        max_values: 1,
        channel_types: [
            ChannelType.GuildText,
            ChannelType.GuildVoice,
            ChannelType.GuildAnnouncement,
            ChannelType.AnnouncementThread,
            ChannelType.PublicThread,
            ChannelType.PrivateThread,
            ChannelType.GuildStageVoice,
            ChannelType.GuildDirectory,
            ChannelType.GuildForum,
        ],
    },
    async execute({ data: interaction, api }) {
        const channel = interaction.data.values[0]!;

        await api.interactions.deferMessageUpdate(
            interaction.id,
            interaction.token,
        );

        const guildConfig = config.get(interaction.guild_id!);
        if (!guildConfig.exceptions[channel]) {
            guildConfig.exceptions[channel] = {
                type: ExceptionType.Channel,
            };
            await config.write();
        }

        await api.interactions.editReply(
            interaction.application_id,
            interaction.token,
            (await getCreateConfigMessage())(guildConfig, {
                content: `Successfully added ${channelMention(
                    channel,
                )} as an exception.`,
            }),
        );
    },
} satisfies ChannelSelect;
