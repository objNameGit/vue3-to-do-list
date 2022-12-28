export type ItemList = Array<Item>;
export type SubItemDict = Record<number, ItemList>;
export type SelectedItemDict = Record<number, Item>;

export interface Item {
    id: number;
    parentId: number;
    title: string;
    data: Date;
    description: string;
    status: ItemStatus;
}

export enum ItemStatus {
    Complited = 'Complited',
    Active = 'Active',
}

export const stubTaskList: ItemList = [] as ItemList;
export const stubSubTaskDict: SubItemDict = {} as SubItemDict;

export const defaultItem = {
    id: 0,
    parentId: 0,
    title: '',
    data: new Date(0),
    description: '',
    status: ItemStatus.Active,
}

const taskCounter = 20;
const subTaskCounter = 10;

for (let i = 1; i <= taskCounter; i++) {
    const newItem = {
        id: i,
        parentId: 0,
        title: i === 1 ? 'Task_1Task_1Task_k_1Task_1T asask_1Task_1Task_1Task_1' : `Task_${i}`,
        data: new Date(),
        description:  i === 1 ? (`do something ${i}`).repeat(20) : `do something ${i}`,
        status: ItemStatus.Active,
    };

    stubTaskList.push(newItem);
}

for (let i = 1; i <= taskCounter; i++) {
    for (let m = 1; m <= subTaskCounter; m++) {
        const sutTaskId = i * 100 + m;

        const newItem = {
            id: sutTaskId,
            parentId: i,
            title: `Sub-task_${i}-${m}`,
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
