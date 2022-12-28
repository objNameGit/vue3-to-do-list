<template>
    <div class="item-list-container">

        <div 
            class="item-list-action"
            v-if="isRoot
        ">
            <button 
                class="custom-button"
                @click="whenCreateItem"
            >
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
        <div 
            class="item-list"
            v-if="!!itemList?.length"
        >
            <TheItem
                v-for="(item, i) in itemList"
                :key="`item-${i}`"
                :item="item"
                :childListDict="childListDict"
                :selectedItemDict="selectedItemDict"
                :whenEditItem="whenEditItem"
                :whenChangeItemStatus="whenChangeItemStatus"
                :whenDeleteItemList="whenDeleteItemList"
                :toggleSelectedItem="toggleSelectedItem"
            />
        </div>
        <div v-else>
            List is empty
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TheItem from '@/components/TheItem.vue';

import type { ItemList, SubItemDict, SelectedItemDict } from '~/types/Item';

export interface TheItemProps {
    isRoot: boolean;
    itemList: ItemList;
    childListDict: SubItemDict;
    selectedItemDict: SelectedItemDict;
    whenEditItem: (item: Item) => void;
    whenCreateItem: (item: Item) => void;
    whenChangeItemStatus: (params?: any) => void;
    whenDeleteItemList: (params?: any) => void;
    toggleSelectedItem: (params?: any) => void;
}

const props = defineProps<TheItemProps>();

const havingSelectedItem = computed(() => Object.keys(props.selectedItemDict).length > 0);

function createTask() {}

function onDeleteClick() {
    const keyList = Object.keys(props.selectedItemDict);
    const params = []

    keyList.forEach((key) => params.push(props.selectedItemDict[key]))

    props.whenDeleteItemList(params) 
}
</script>

<style lang="css" scoped>
.item-list-action {
    display: flex;
    justify-content: space-between;
    gap: 12px;
}

.item {
    margin-top: 2rem;
    display: flex;
}

h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}

button.custom-button {
    padding: 0px;
    background: none;
    border: none;

    cursor: pointer;
    color: rgb(34, 104, 255);
}

button.custom-button[disabled] {
    color:rgb(176, 176, 176);
    cursor: not-allowed;
}
</style>
