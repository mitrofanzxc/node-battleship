import type { TableRow, EntityID } from '../services/db';
import { randomEntityID } from '../services/db';

export type ModelId = EntityID;
export const randomModelId = randomEntityID;

export interface DatabaseModel extends TableRow {}

export class ModelErrorFields extends Error {
    constructor(message: string = 'Does not contain mandatory fields or has an invalid type') {
        super(message);
    }
}
