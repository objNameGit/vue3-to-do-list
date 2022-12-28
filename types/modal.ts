import { defaultItem, type Item } from "~/types/Item";

export enum ModalAction {
    Create = 'create',
    Edit = 'edit',
    Delete = 'delete',
    Default = '',
}

export interface ModalActionParams {
    actionItem: Item
}

export interface ModalState {
    action: ModalAction;
    isVisible: boolean;
    title: string;
    message: string;
    params: ModalActionParams
    onAcceptClick: (params?: any) => void;
    onCancelClick: (params?: any) => void;
}

export const titleActionDict: Record<ModalAction, string> = {
    [ModalAction.Create]: 'Создание задачи',
    [ModalAction.Edit]: 'Редактирование задачи',
    [ModalAction.Delete]: 'Удаление',
    [ModalAction.Default]: '',
}

export const defaultModalState: ModalState = {
    action: ModalAction.Default,
    title: '',
    message: '',
    isVisible: false,
    params: {
        actionItem: {...defaultItem}
    },
    onAcceptClick: (params?: any) => {},
    onCancelClick: (params?: any) => {},
};
