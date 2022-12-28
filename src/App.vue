<template>
    <header>
        <div class="wrapper">TO DO LIST</div>
    </header>

    <main>
        <ItemList
            :isRoot="true"
            :itemList="itemStore.itemList"
            :childListDict="itemStore.childListDict"
            :selectedItemDict="itemStore.selectedItemDict"
            :toggleSelectedItem="itemStore.toggleSelectedItem"
            :whenChangeItemStatus="itemStore.changeItemStatus"
            :whenEditItemClick="modalStore.setEditPreset"
            :whenCreateItemClick="modalStore.setCreatePreset"
            :whenDeleteItemListClick="modalStore.setDeletePreset"
        />

        <TheModal
            v-if="modalStore.modal.isVisible && modalStore.modal.action === ModalAction.Delete"
            :title="modalStore.modal.title"
            :message="modalStore.modal.message"
            :whenAcceptClick="modalStore.modal.onAcceptClick"
            :whenCancelClick="modalStore.modal.onCancelClick"
        />

        <ActionForm
            v-if="modalStore.modal.isVisible && (modalStore.modal.action === ModalAction.Edit || modalStore.modal.action === ModalAction.Create)"
        />
    </main>
</template>

<script setup lang="ts">
import ItemList from '@/components/ItemList.vue';
import TheModal from '@/components/TheModal.vue';
import { onMounted, onBeforeUnmount } from 'vue';
import ActionForm from '~/src/components/ActionForm.vue';

import { useTaskStore } from '~/src/stores/itemStore';
import { useModalStore } from '~/src/stores/modal';
import { ModalAction } from '~/types/modal';

const itemStore = useTaskStore();
const modalStore = useModalStore();

function saveStateWrapper() {
    itemStore.saveState(itemStore.itemList, itemStore.childListDict)
}

onMounted(() => {
    itemStore.loadState();

    window.addEventListener('beforeunload', saveStateWrapper);
});

onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', saveStateWrapper);
});
</script>

<style scoped>
header {
    line-height: 1.5;
}

.wrapper {
    margin-bottom: 2rem;
    font-size: 4em;
    font-weight: 200;
}

@media (min-width: 1024px) {
    header {
        padding-right: calc(var(--section-gap) / 2);
        display: contents;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
