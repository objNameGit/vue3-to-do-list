<template>
    <div class="action-form-wrapper">
        <TheModal
            :title="modalStore.modal.title"
            :isAcceptButtonDisabled="tempItem?.title === ''"
            :whenAcceptClick="() => modalStore.modal.onAcceptClick(tempItem)"
            :whenCancelClick="modalStore.modal.onCancelClick"
        >
            <template #modal-body>
                <div class="form-field">
                    <label for="title">Введите название</label>
                    <input
                        v-model="tempItem.title"
                        id="title"
                        name="title"
                        placeholder=""
                        required="true"
                    />
                </div>

                <div class="form-field">
                    <label for="parent-name">Выберите родительскую задачу</label>
                    <select
                        v-model="tempItem.parentId"
                        id="parent-name"
                        name="parent-name"
                    >
                        <option :value="0">Не выбрано</option>
                        <option
                            v-for="item in itemStore.itemList"
                            :value="item.id"
                            :key="`select-item-${item.id}`"
                            :id="`${item.id}`"
                        >
                            {{ item.title }}
                        </option>
                    </select>
                </div>

                <div class="form-field">
                    <label for="description">Описание</label>
                    <textarea
                        v-model="tempItem.description"
                        id="description"
                        name="description"
                        rows="4"
                    />
                </div>
            </template>
        </TheModal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '~/src/stores/itemStore';
import { useModalStore } from '~/src/stores/modal';

import { defaultItem, type Item } from '~/types/Item';

import TheModal from '@/components/TheModal.vue';

export interface ActionFormProps {
    title?: string;
    message?: string;
    whenAcceptClick?: (params?: any) => void;
    whenCancelClick?: (params?: any) => void;
}

const itemStore = useTaskStore();
const modalStore = useModalStore();

const tempItem = ref({ ...defaultItem });

onMounted(() => { tempItem.value = modalStore.modal.params.actionItem });
// defineProps<ActionFormProps>();
</script>

<style lang="css" scoped>
.action-form-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.form-field {
    display: flex;
    flex-direction: column;
}

label {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}

input,
select {
    height: 36px;
}

input,
select,
textarea {
    padding: 6px;
    border-radius: 6px;
    border: 1px solid var(--vt-c-divider-dark-2);
}

textarea {
    resize: none;
    word-break: normal;

    font-family: Arial;
}

select,
.form-field {
    margin-bottom: 12px;
}
</style>
