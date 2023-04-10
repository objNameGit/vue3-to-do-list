<template>
    <div class="item-list-container">
        <div class="item-list-action" v-if="isRoot">
            <button class="custom-button" @click="whenCreateItemClick">
                Создать задачу
            </button>
            <button
                :disabled="!havingSelectedItem"
                class="custom-button"
                @click="onDeleteClick"
            >
                Удалить выбранное
            </button>
        </div>
        <div class="item-list" v-if="!!itemList?.length">
            <TheItem
                v-for="(item, i) in itemList"
                :key="`item-${i}`"
                :item="item"
                :childListDict="childListDict"
                :selectedItemDict="selectedItemDict"
                :whenChangeItemStatus="whenChangeItemStatus"
                :whenEditItemClick="whenEditItemClick"
                :whenCreateItemClick="whenCreateItemClick"
                :whenDeleteItemListClick="whenDeleteItemListClick"
                :toggleSelectedItem="toggleSelectedItem"
            />
        </div>
        <div class="empty-list" v-else>List is empty</div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TheItem from '@/components/TheItem.vue';

import type {
    ItemList,
    ItemStatus,
    Item,
    SubItemDict,
    SelectedItemDict,
} from '~/types/Item';

export interface TheItemProps {
    isRoot?: boolean;
    itemList: ItemList;
    childListDict: SubItemDict;
    selectedItemDict: SelectedItemDict;
    whenCreateItemClick: () => void;
    whenEditItemClick: (item: Item) => void;
    whenChangeItemStatus: (
        newStatus: ItemStatus,
        id: number,
        parentId?: number
    ) => void;
    whenDeleteItemListClick: (params?: any) => void;
    toggleSelectedItem: (value: boolean, item: Item) => void;
}

const props = defineProps<TheItemProps>();

const havingSelectedItem = computed(
    () => Object.keys(props.selectedItemDict).length > 0
);

function onDeleteClick() {
    const keyList = Object.keys(props.selectedItemDict);
    const params = [] as ItemList;

    keyList.forEach((key: string) =>
        params.push(props.selectedItemDict[Number(key)])
    );

    props.whenDeleteItemListClick(params);
}
</script>

<style lang="css" scoped>
.empty-list {
    margin-top: 20px;
    min-height: 98px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e2e2e2;
    border-radius: 6px;
    font-weight: 200;
}

.item-list-action {
    display: flex;
    justify-content: space-between;
    gap: 12px;
}

h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}

button.custom-button {
    padding: 0;
    background: none;
    border: none;

    cursor: pointer;
    color: rgb(34, 104, 255);
}

button.custom-button[disabled] {
    color: rgb(176, 176, 176);
    cursor: not-allowed;
}
</style>
