import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useTaskStore } from '@/stores/itemStore';

import { defaultModalState, ModalAction, titleActionDict } from '~/types/modal';
import type { Item, ItemList } from '~/types/Item';
import { defaultItem } from '~/types/Item';

export const useModalStore = defineStore('modal', () => {
    const modal = ref({ ...defaultModalState });

    const itemStore = useTaskStore();

    function resetState() {
        modal.value = { ...defaultModalState };
    }

    function setDeletePreset(deleteItemList: ItemList): void {
        const message =
            deleteItemList.length === 1
                ? 'Вы действительно хотите удалить задачу?'
                : 'Вы действительно хотите удалить все задачи?';

        modal.value.action = ModalAction.Delete;
        modal.value.title = titleActionDict[ModalAction.Delete];
        modal.value.message = message;
        modal.value.isVisible = true;

        modal.value.onAcceptClick = () => {
            itemStore.deleteItemByIdList(deleteItemList);

            resetState();
        };

        modal.value.onCancelClick = () => {
            resetState();
        };
    }

    function setEditPreset(item: Item): void {
        modal.value.action = ModalAction.Edit;
        modal.value.title = titleActionDict[ModalAction.Edit];
        modal.value.message = '';
        modal.value.params.actionItem = { ...item };
        modal.value.isVisible = true;

        modal.value.onAcceptClick = (editedItem: Item) => {
            itemStore.patchItem(editedItem, item);

            resetState();
        };

        modal.value.onCancelClick = () => {
            resetState();
        };
    }

    function setCreatePreset(): void {
        modal.value.action = ModalAction.Create;
        modal.value.title = titleActionDict[ModalAction.Create];
        modal.value.message = '';
        modal.value.params.actionItem = { ...defaultItem };
        modal.value.isVisible = true;

        modal.value.onAcceptClick = (item: Item) => {
            itemStore.createItem(item);

            resetState();
        };

        modal.value.onCancelClick = () => {
            resetState();
        };
    }

    return {
        modal,
        setDeletePreset,
        setEditPreset,
        setCreatePreset,
    };
});
