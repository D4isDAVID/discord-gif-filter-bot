import { Component } from '../data.js';
import channelCreate from './events/channel-create.js';
import channelDelete from './events/channel-delete.js';
import channelUpdate from './events/channel-update.js';
import guildCreate from './events/guild-create.js';
import guildDelete from './events/guild-delete.js';
import guildMemberAdd from './events/guild-member-add.js';
import guildMemberRemove from './events/guild-member-remove.js';
import guildMemberUpdate from './events/guild-member-update.js';
import guildRoleCreate from './events/guild-role-create.js';
import guildRoleDelete from './events/guild-role-delete.js';
import guildRoleUpdate from './events/guild-role-update.js';

export default {
    gatewayEvents: [
        guildCreate,
        guildDelete,
        guildMemberAdd,
        guildMemberUpdate,
        guildMemberRemove,
        guildRoleCreate,
        guildRoleUpdate,
        guildRoleDelete,
        channelCreate,
        channelUpdate,
        channelDelete,
    ],
} satisfies Component;
