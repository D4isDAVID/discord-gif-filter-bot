import {
    APIActionRowComponent,
    APIMessageActionRowComponent,
    ComponentType,
} from '@discordjs/core';
import addException from './add-exception/index.js';
import addKeyword from './add-keyword/index.js';
import removeException from './remove-exception/index.js';
import removeKeyword from './remove-keyword/index.js';
import setMaxSize from './set-max-size/index.js';

export default [
    {
        type: ComponentType.ActionRow,
        components: [setMaxSize.data],
    },
    {
        type: ComponentType.ActionRow,
        components: [addKeyword.data, removeKeyword.data],
    },
    {
        type: ComponentType.ActionRow,
        components: [addException.data, removeException.data],
    },
] satisfies APIActionRowComponent<APIMessageActionRowComponent>[];
