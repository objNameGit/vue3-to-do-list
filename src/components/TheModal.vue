<template>
    <div class="modal-background-container">
        <form autocomplete="off">
            <div class="title-wrapper">
                <h3 class="title">{{ title }}</h3>
            </div>
            <div class="body-wrapper">
                <slot name="modal-body">
                    {{ message }}
                </slot>
            </div>

            <div class="action-wrapper">
                <slot name="action-wrapper">
                    <button
                        class="accept-button action-button"
                        :disabled="isAcceptButtonDisabled"
                        @click.prevent="whenAcceptClick"
                    >
                        Ок
                    </button>
                    <button
                        class="cancel-button action-button"
                        @click.prevent="whenCancelClick"
                    >
                        Отмена
                    </button>
                </slot>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

export interface TheModal {
    title?: string;
    message?: string;
    isAcceptButtonDisabled?: boolean;
    whenAcceptClick: () => void;
    whenCancelClick: () => void;
}

defineProps<TheModal>();

onMounted(() => (document.body.style.overflow = 'hidden'));
onUnmounted(() => (document.body.style.overflow = ''));
</script>

<style lang="css" scoped>
form {
    margin: auto;
    max-width: 500px;
    min-width: 390px;
    max-height: 500px;
    border-radius: 8px;
    background-color: var(--color-background);
    box-shadow: 2px 2px 10px 2px var(--color-shadow);
}

textarea {
    background-color: red;
}

.modal-background-container {
    --modal-horizontal-margin: 20px;

    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100vh;

    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
}

.title,
.action-wrapper {
    margin: var(--modal-horizontal-margin);
}

.title {
    font-weight: 700;
}

.body-wrapper {
    margin: 0 var(--modal-horizontal-margin) var(--modal-horizontal-margin);
}

.action-wrapper {
    display: flex;
    gap: 12px;
}

.cancel-button:hover {
    background-color: var(--color-secondary-modal-button-hover);
}

.accept-button:hover {
    background-color: var(--color-primary-modal-button-hover);
}

.action-button:active:not(.accept-button[disabled]) {
    margin-right: 1px;
    background-color: var(--color-primary-modal-button-active);
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.action-button {
    min-width: 100px;
    background-color: #ffffff94;
    padding: 12px 18px;
    border-radius: 6px;
    border: none;
    font-size: 1em;

    cursor: pointer;
}

.accept-button {
    background-color: var(--color-primary-modal-button);
    color: white;
}

.accept-button[disabled] {
    background-color: var(--color-primary-modal-button-disabled);
    color: white;
}

.cancel-button {
    background-color: var(--color-secondary-modal-button);
    border: 1px solid var(--color-secondary-modal-button-border);
    cursor: pointer;
}
</style>
