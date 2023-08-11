import { createSubcommandsCommand } from '../../subcommands.js';
import config from './config/index.js';

export default createSubcommandsCommand(
    {
        data: {
            name: 'gif-filter',
            description: 'Manage the gif filter component.',
            default_member_permissions: '0',
            dm_permission: false,
        },
    },
    [config],
);
