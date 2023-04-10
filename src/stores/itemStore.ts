import { ref } from 'vue';
import { defineStore } from 'pinia';

import {
    type Item,
    type ItemList,
    ItemStatus,
    type SelectedItemDict,
    stubSubTaskDict,
    stubTaskList,
    type SubItemDict,
} from '~/types/Item';

import { getRandomInt } from '~/utils/math';
import { StoreKey } from '~/types/StoreKey';

export const useTaskStore = defineStore('taskStore', () => {
    const itemList = ref<ItemList>([]);
    const childListDict = ref<SubItemDict>({});
    const selectedItemDict = ref<SelectedItemDict>({});

    function checkOnParent(item: Item) {
        return item.parentId === 0;
    }

    function findIndex(itemId: number, parentId = 0): number {
        const isParent = parentId === 0;
        let foundIndex = -1;

        if (!isParent) {
            const childrenList = childListDict.value[parentId];

            foundIndex = childrenList.findIndex(
                (children) => children.id === itemId
            );
        } else {
            foundIndex = itemList.value.findIndex(
                (children) => children.id === itemId
            );
        }

        if (foundIndex === -1) {
            console.error(
                `Not found child with id = ${itemId} for parent with id = ${parentId}`
            );
        }

        return foundIndex;
    }

    function findItem(itemId: number, parentId = 0): Item | undefined {
        const isParent = parentId === 0;
        let foundElem: Item | undefined;

        if (!isParent) {
            const childrenList = childListDict.value[parentId];

            foundElem = childrenList.find((children) => children.id === itemId);
        } else {
            foundElem = itemList.value.find(
                (children) => children.id === itemId
            );
        }

        if (foundElem === undefined) {
            console.error(
                `Not found child with id = ${itemId} for parent with id = ${parentId}`
            );
        }

        return foundElem;
    }

    function changeItemStatus(newStatus: ItemStatus, id: number, parentId = 0) {
        const isParent = parentId === 0;
        const foundItem = findItem(id, parentId);

        if (foundItem === undefined) {
            return;
        }

        foundItem.status = newStatus;

        if (isParent) {
            childListDict.value[id].forEach(
                (child) => (child.status = newStatus)
            );

            return;
        }

        // Is children task with parent, check parent status
        const isAllChildrenInStatus = childListDict.value[parentId].every(
            (children) => children.status === newStatus
        );

        // If all task in the same status
        const parent = findItem(parentId);
        const newParentStatus =
            isAllChildrenInStatus && ItemStatus.Complete
                ? ItemStatus.Complete
                : ItemStatus.Active;

        if (parent) {
            parent.status = newParentStatus;
        }
    }

    function toggleSelectedItem(value: boolean, item: Item) {
        const isParent = checkOnParent(item);
        const childrenList = childListDict.value[item.id] || [];

        if (isParent) {
            // Select all children
            this.selectedItemDict[item.id] = item;

            childrenList?.forEach((el) => toggleSelectedItem(value, el));

            return;
        }

        if (!value && selectedItemDict.value[item.id]) {
            delete selectedItemDict.value[item.id];

            // Drop selected from parent, if parent checked
            selectedItemDict.value[item.parentId] &&
                delete selectedItemDict.value[item.parentId];
        } else {
            selectedItemDict.value[item.id] = item;

            const childrenIdList = (
                childListDict.value[item.parentId] ?? []
            ).map((el) => el.id);
            const isAllChildrenSelected = childrenIdList.every(
                (id) => !!selectedItemDict.value[id]
            );

            const parent = findItem(item.parentId, 0);

            isAllChildrenSelected && parent
                ? (selectedItemDict.value[item.parentId] = parent)
                : '';
        }
    }

    function deleteItemByIdList(deleteItemList: ItemList) {
        deleteItemList.forEach((deleteItem) => {
            const isParent = checkOnParent(deleteItem);

            if (!isParent) {
                const newChildrenList = (
                    childListDict.value[deleteItem.parentId] ?? []
                ).filter((el) => el.id !== deleteItem.id);

                childListDict.value[deleteItem.parentId] = newChildrenList;

                if (newChildrenList?.length === 0) {
                    delete childListDict.value[deleteItem.id];
                }
                return;
            }

            const childrenList = childListDict.value[deleteItem.id] || [];

            if (childrenList?.length > 0) {
                delete childListDict[deleteItem.id];
            }

            itemList.value = itemList.value.filter(
                (el) => el.id !== deleteItem.id
            );

            selectedItemDict.value = {};
        });
    }

    function createItem(newItem: Item) {
        const isParent = checkOnParent(newItem);

        newItem.id = getRandomInt(10000, 3000000);

        if (isParent) {
            itemList.value.unshift(newItem);

            return;
        }

        if (childListDict.value[newItem.parentId] === undefined) {
            childListDict.value[newItem.parentId] = [];
        }

        childListDict.value[newItem.parentId].unshift(newItem);
    }

    function patchItem(editedItem: Item, currentItem: Item): void {
        const editedIsParent = checkOnParent(editedItem);
        const currentIsParent = checkOnParent(currentItem);

        if (currentItem.parentId !== editedItem.parentId) {
            if (currentIsParent) {
                // Delete old item
                itemList.value = itemList.value.filter(
                    ({ id }) => id !== currentItem.id
                );
            } else {
                const newChildListDict = childListDict.value[
                    currentItem.parentId
                ].filter(({ id }) => id !== currentItem.id);

                childListDict.value[currentItem.parentId] = [
                    ...newChildListDict,
                ];
            }

            if (editedIsParent) {
                itemList.value.unshift(editedItem);
            } else {
                (childListDict.value[editedItem.parentId] ?? []).unshift(
                    editedItem
                );
            }
        } else {
            const foundIndex = findIndex(editedItem.id, editedItem.parentId);

            if (editedIsParent) {
                itemList.value[foundIndex] = editedItem;

                return;
            }

            childListDict.value[editedItem.parentId][foundIndex] = editedItem;
        }
    }

    function saveState(itemList, childListDict) {
        try {
            window.localStorage.setItem(
                StoreKey.ItemList,
                JSON.stringify(itemList)
            );
            window.localStorage.setItem(
                StoreKey.ChildList,
                JSON.stringify(childListDict)
            );

            return true;
        } catch (error) {
            return false;
        }
    }

    function loadState() {
        try {
            const savedItemListStr = window.localStorage.getItem(
                StoreKey.ItemList
            );
            const savedChildDictStr = window.localStorage.getItem(
                StoreKey.ChildList
            );
            let savedItemList = [];
            let savedChildDict = {};

            if (savedItemListStr === null || savedChildDictStr === null) {
                itemList.value = [...stubTaskList];
                childListDict.value = { ...stubSubTaskDict };

                return;
            }

            if (savedItemListStr) {
                const parseSavedItemList = JSON.parse(savedItemListStr);

                savedItemList = parseSavedItemList
                    ? parseSavedItemList
                    : savedItemList;
            }

            if (savedChildDictStr) {
                const parseSavedChildDict = JSON.parse(savedChildDictStr);

                savedChildDict = parseSavedChildDict
                    ? parseSavedChildDict
                    : savedChildDict;
            }

            itemList.value = [...savedItemList];
            childListDict.value = { ...savedChildDict };
        } catch (error) {
            return null;
        }
    }

    return {
        itemList: itemList,
        childListDict: childListDict,
        selectedItemDict: selectedItemDict,
        changeItemStatus,
        toggleSelectedItem,
        deleteItemByIdList,
        patchItem,
        createItem,
        saveState,
        loadState,
    };
});
