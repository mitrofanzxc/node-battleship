export type EntityID = number;

let lastIncrement = Date.now();

export const randomEntityID = (): EntityID => {
    return lastIncrement++;
};

export interface TableRow {
    readonly id: EntityID;
}

export class Table<Type extends TableRow> {
    private items: { [key: EntityID]: Type } = {};

    add(data: object): Type {
        const id = randomEntityID();
        const row = { ...data, id } as Type;
        return (this.items[id] = row);
    }

    delete(id: EntityID): boolean {
        return delete this.items[id];
    }

    update(id: EntityID, data: Type): Type {
        const item = this.get(id);
        data = { ...(item ?? {}), ...data } as Type;
        return (this.items[id] = data);
    }

    get(id: EntityID): Type | null {
        return this.items[id] ?? null;
    }

    all(): Type[] {
        return Object.values(this.items);
    }
}

export class Database {
    private tables: { [key: string]: Table<TableRow> } = {};
    getTable<Type>(name: string): Table<Type & TableRow> {
        return (
            (this.tables[name] as Table<Type & TableRow>) ??
            (this.tables[name] = new Table<Type & TableRow>())
        );
    }
}
