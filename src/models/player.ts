import type { WebSocketPlayer } from '../services/messenger';
import { Messenger, ResponceTypes } from '../services/messenger';

import { User } from './user';

export class Player {
    readonly ws: WebSocketPlayer;
    readonly user: User;

    wins: number = 0;

    constructor(user: User, ws: WebSocketPlayer) {
        this.user = user;
        this.ws = ws;
    }

    message(type: ResponceTypes, data: object) {
        Messenger.sendResponce(type, this.ws, data);
    }
}
