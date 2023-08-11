import { Component } from '../data.js';
import addExceptionChannelSelect from './command/config/buttons/add-exception/channel-select.js';
import addException from './command/config/buttons/add-exception/index.js';
import addExceptionMentionableSelect from './command/config/buttons/add-exception/mentionable-select.js';
import addKeyword from './command/config/buttons/add-keyword/index.js';
import addKeywordModal from './command/config/buttons/add-keyword/modal.js';
import cancel from './command/config/buttons/cancel.js';
import removeException from './command/config/buttons/remove-exception/index.js';
import removeExceptionSelect from './command/config/buttons/remove-exception/select.js';
import removeKeyword from './command/config/buttons/remove-keyword/index.js';
import removeKeywordSelect from './command/config/buttons/remove-keyword/select.js';
import setMaxSize from './command/config/buttons/set-max-size/index.js';
import setMaxSizeModal from './command/config/buttons/set-max-size/modal.js';
import command from './command/index.js';
import messageCreate from './message-create.js';

export default {
    gatewayEvents: [messageCreate],
    commands: [command],
    messageComponents: [
        setMaxSize,
        addKeyword,
        removeKeyword,
        removeKeywordSelect,
        addException,
        addExceptionMentionableSelect,
        addExceptionChannelSelect,
        removeException,
        removeExceptionSelect,
        cancel,
    ],
    modals: [setMaxSizeModal, addKeywordModal],
} satisfies Component;
