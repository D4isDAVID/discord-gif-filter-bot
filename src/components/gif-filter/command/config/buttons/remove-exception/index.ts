import {
    APIStringSelectComponent,
    ButtonStyle,
    ComponentType,
} from '@discordjs/core';
import { lazy } from '@discordjs/util';
import {
    channelCache,
    guildMemberCache,
    guildRoleCache,
} from '../../../../../cache/objects.js';
import { Button } from '../../../../../data.js';
import config, { ExceptionType } from '../../../../config.js';
import stringSelect from './select.js';

const getCreateConfigMessage = lazy(
    async () => (await import('../../message.js')).createConfigMessage,
);
const getWithCancelButton = lazy(
    async () => (await import('../cancel.js')).withCancelButton,
);

const exceptionNameMap = {
    [ExceptionType.User]: 'User',
    [ExceptionType.Role]: 'Role',
    [ExceptionType.Channel]: 'Channel',
};

export default {
    data: {
        type: ComponentType.Button,
        custom_id: 'remove_exception_button',
        style: ButtonStyle.Primary,
        label: 'Remove Exception',
    },
    async execute({ data: interaction, api }) {
        const guildConfig = config.get(interaction.guild_id!);
        const exceptions = Object.entries(guildConfig.exceptions);

        if (exceptions.length === 0) {
            await api.interactions.updateMessage(
                interaction.id,
                interaction.token,
                (await getCreateConfigMessage())(guildConfig, {
                    content: 'No exceptions to remove.',
                }),
            );
            return;
        }

        const stringSelectData = stringSelect.data as APIStringSelectComponent;
        stringSelectData.options = [];

        for (const [id, { type }] of exceptions) {
            let name: string;
            switch (type) {
                case ExceptionType.User:
                    const user =
                        guildMemberCache[interaction.guild_id!]?.[id]?.user;
                    name = user
                        ? `${user.username}${
                              user.discriminator === '0'
                                  ? ''
                                  : user.discriminator
                          }`
                        : 'Not in server';
                    break;

                case ExceptionType.Role:
                    const role = guildRoleCache[interaction.guild_id!]?.[id];
                    name = role ? role.name : 'Not in server';
                    break;

                case ExceptionType.Channel:
                    const channel = channelCache[id];
                    name = channel ? channel.name! : 'Not in server';
                    break;
            }

            stringSelectData.options.push({
                label: `${id} (${exceptionNameMap[type]}: ${name})`,
                value: id,
            });
        }

        await api.interactions.updateMessage(
            interaction.id,
            interaction.token,
            (await getCreateConfigMessage())(guildConfig, {
                components: (await getWithCancelButton())([
                    {
                        type: ComponentType.ActionRow,
                        components: [stringSelectData],
                    },
                ]),
            }),
        );
    },
} satisfies Button;
