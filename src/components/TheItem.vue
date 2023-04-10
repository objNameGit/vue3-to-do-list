<template>
    <div
        :id="`${item.id}`"
        draggable="true"
        class="item"
        @click="isOpen = !isOpen"
    >
        <div class="input-wrapper">
            <input
                class="item-checkbox"
                type="checkbox"
                :name="`item-${item.id}-checkbox`"
                :checked="isSelectedItem"
                :value="isSelectedItem"
                @click.stop="onToggle"
            />
        </div>
        <div class="item-content">
            <h3 class="title">
                <slot name="title">{{ item.title }}</slot>
            </h3>
            <div class="description">
                <slot name="description">{{ item.description }}</slot>
            </div>
        </div>
        <div class="action-block">
            <!-- TODO: make button component -->
            <button class="custom-button">
                <img
                    :src="editImg"
                    class="edit-icon action-icon"
                    alt="edit icon"
                    @click.stop="whenEditItemClick(item)"
                />
            </button>
            <button class="custom-button">
                <img
                    :src="deleteImg"
                    class="delete-icon action-icon"
                    alt="delete icon"
                    @click.stop="whenDeleteItemListClick([item])"
                />
            </button>
            <button class="custom-button">
                <img
                    :src="`${getStatusIcon}`"
                    class="img-status action-icon"
                    alt="status icon"
                    @click.stop="changeStatus()"
                />
            </button>
        </div>
        <div class="counter">{{ childCount }}</div>
    </div>
    <div v-if="isOpen && isParent" class="child-list">
        <ItemList
            :itemList="childListDict[item.id]"
            :childListDict="[]"
            :selectedItemDict="selectedItemDict"
            :whenEditItemClick="whenEditItemClick"
            :whenCreateItemClick="whenCreateItemClick"
            :whenChangeItemStatus="whenChangeItemStatus"
            :whenDeleteItemListClick="whenDeleteItemListClick"
            :toggleSelectedItem="toggleSelectedItem"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ItemList from '@/components/ItemList.vue';

import type { Item, SubItemDict, SelectedItemDict } from '~/types/Item';
import { ItemStatus } from '~/types/Item';

import deleteImg from '@/assets/icon/delete.png';
import editImg from '@/assets/icon/edit.png';
import doneStatusImg from '@/assets/icon/done-status.png';
import waitStatusImg from '@/assets/icon/wait-status.png';

export interface TheItemProps {
    item: Item;
    childListDict: SubItemDict;
    selectedItemDict: SelectedItemDict;
    whenEditItemClick: (item: Item) => void;
    whenCreateItemClick: () => void;
    whenChangeItemStatus: <T extends Array<unknown>>(...params: T) => void;
    whenDeleteItemListClick: <T extends Array<unknown>>(...params: T) => void;
    toggleSelectedItem: <T extends Array<unknown>>(...params: T) => void;
}

const props = defineProps<TheItemProps>();
const isOpen = ref(false);

const getStatusIcon = computed((): string => {
    let result;

    switch (props.item.status) {
        case ItemStatus.Complete:
            result = doneStatusImg;
            break;

        case ItemStatus.Active:
            result = waitStatusImg;
            break;

        default:
            result = '';
            break;
    }

    return result;
});

const isSelectedItem = computed((): boolean => {
    return !!props.selectedItemDict[props.item.id] || false;
});

const childCount = computed((): number => {
    return props.childListDict[props.item.id]?.length ?? 0;
});

const isParent = computed(() => {
    return props.item.parentId === 0;
});

function changeStatus() {
    const newStatus =
        props.item.status === ItemStatus.Complete
            ? ItemStatus.Active
            : ItemStatus.Complete;

    props.whenChangeItemStatus<[ItemStatus, Item['id'], Item['parentId']]>(
        newStatus,
        props.item.id,
        props.item.parentId
    );
}

function onToggle(event) {
    const value = event.target.checked;

    props.toggleSelectedItem(value, props.item);
}
</script>

<style lang="postcss" scoped>
.item {
    --width-checkbox-block: 30px;
    --width-action-block: 50px;
    --horizotal-padding-item: 16px;

    margin-top: 1rem;
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 8px;
    align-items: center;
    position: relative;

    min-height: 46px;
    border: 1px solid var(--vt-c-divider-light-2);
    border-radius: 8px;
    box-shadow: 0 5px 10px var(--color-shadow-soft);
    background-color: var(--color-background-soft);
}

.input-wrapper {
    margin: auto calc(var(--horizotal-padding-item) / 2) auto
        var(--horizotal-padding-item);
}

.item-checkbox {
    height: 16px;
    width: 16px;
    outline-color: var(--vt-c-divider-light-2) !important;
    border-color: var(--vt-c-divider-light-2) !important;
}

.item-content {
    padding: 6px 0;
    overflow: hidden;
}

.title,
.description {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.description {
    font-weight: 200;
    -webkit-line-clamp: 1;
}

.action-block {
    margin: 0 var(--horizotal-padding-item);
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 12px;
}

.item:hover {
    background-color: var(--color-hover-background);
}

.child-list {
    margin-left: 32px;
}

button.custom-button {
    padding: 0;
    background: none;
    border: none;

    cursor: pointer;
}

.action-icon {
    width: 20px;
}

h3 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}

.counter {
    position: absolute;
    top: -1px;
    right: -1px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;

    width: 17px;
    height: 17px;
    border-radius: 50%;
    background-color: #c2f2f7;
    color: #686868;
}

@media (min-width: 1024px) {
    .item:before {
        content: ' ';
        border-left: 1px solid var(--color-border);
        position: absolute;
        left: 0;
        bottom: calc(50% + 25px);
        height: calc(50% - 25px);
    }

    .item:after {
        content: ' ';
        border-left: 1px solid var(--color-border);
        position: absolute;
        left: 0;
        top: calc(50% + 25px);
        height: calc(50% - 25px);
    }

    .item:first-of-type:before {
        display: none;
    }

    .item:last-of-type:after {
        display: none;
    }
}
</style>
