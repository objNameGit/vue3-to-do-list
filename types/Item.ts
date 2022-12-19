export type ItemList = Array<Item>;
export type SubItemDict = Record<string, ItemList>;

export interface Item {
    id: number;
    title: string;
    data: Date;
    description: string;
    status: ItemStatus;
}

export enum ItemStatus {
    Complited = 'Compited',
    Active = 'Active',
}

export const stubTaskList: ItemList = [] as ItemList;
export const stubSubTaskDict: SubItemDict = {} as SubItemDict;

const taskCounter = 20;
const subTaskCounter = 10;

for (let i = 1; i <= taskCounter; i++) {
    const newItem = {
        id: i,
        title: `Task_${i}`,
        data: new Date(),
        description: `do something ${i}`,
        status: ItemStatus.Active,
    };

    stubTaskList.push(newItem);
}

for (let i = 1; i <= taskCounter; i++) {
    for (let m = 1; m <= subTaskCounter; m++) {
        const sutTaskId = i * 100 + 1;

        const newItem = {
            id: sutTaskId,
            title: `Sub-task_${m}`,
            data: new Date(),
            description: `do something ${m}`,
            status: ItemStatus.Active,
        };

        if (stubSubTaskDict[i] === undefined) {
            stubSubTaskDict[i] = [] as ItemList;
        }

        stubSubTaskDict[i].push(newItem);
    }
}
