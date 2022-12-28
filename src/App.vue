
<template>
    <header>
        <div class="wrapper">
            TO DO LIST
        </div>
    </header>

    <main>
        <ItemList
            :isRoot="true"
            :itemList="itemStore.itemList"
            :childListDict="itemStore.childListDict"
            :selectedItemDict="itemStore.selectedItemDict"
            :toggleSelectedItem="itemStore.toggleSelectedItem"
            :whenChangeItemStatus="itemStore.changeItemStatus"
            :whenEditItem="modalStore.setEditPreset"
            :whenCreateItem="modalStore.setCreatePreset"
            :whenDeleteItemList="modalStore.setDeletePreset"
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
            :whenAcceptClick="modalStore.modal.onAccept"
            :whenCancelClick="modalStore.modal.onDecline"
        />
    </main>
</template>

<script setup lang="ts">
import ItemList from "@/components/ItemList.vue";
import TheModal from '@/components/TheModal.vue';
import ActionForm from '~/src/components/ActionForm.vue';

import { useTaskStore } from '~/src/stores/itemStore';
import { useModalStore } from '~/src/stores/modal';
import { ModalAction } from '~/types/modal';

import { storeToRefs } from "pinia";
import { ref } from "vue";

import { defaultModalState } from '~/types/modal'


const itemStore = new useTaskStore();
const modalStore = new useModalStore();
</script>

<style scoped>
header {
    line-height: 1.5;
}

.wrapper {
    margin-bottom: 50px;
    font-size: 4em;
    font-weight: 200;
}

@media (min-width: 1024px) {
    header {
        padding-right: calc(var(--section-gap) / 2);
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
