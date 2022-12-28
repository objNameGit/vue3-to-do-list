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
                    >Ок</button>
                    <button class="cancel-button action-button" @click.prevent="whenCancelClick">Отмена</button>
                </slot>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

export interface TheModal {
    title?: string,
    message?: string,
    isAcceptButtonDisabled?: boolean
    whenAcceptClick: () => {}
    whenCancelClick: () => {}
}

onMounted(() => document.body.style.overflow = 'hidden')
onUnmounted(() => document.body.style.overflow = '')

const props = defineProps<TheModal>();
</script>

<style lang="css" scoped>
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

form {
    margin: auto;
    max-width: 500px;
    min-width: 345px;
    max-height: 500px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 5px 6px 14px 0px #606060;
}

.title,
.action-wrapper {
    margin: var(--modal-horizontal-margin);
}

.title {
    font-weight: 700;
}

.body-wrapper {
    margin-top: 0;
    margin-right: var(--modal-horizontal-margin);
    margin-bottom: var(--modal-horizontal-margin);
    margin-left: var(--modal-horizontal-margin);
}


.action-wrapper {
    display: flex;
    gap: 12px;
}

.cancel-button:hover {
    background-color: var(--vt-c-white-soft);
}

.accept-button:hover {
    background-color: #0945d3;
}

.action-button:action {
    margin-right: 1px;
    background-color: #1552e0;
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
    background-color: #0953ff;
    color: white;
}

.accept-button[disabled] {
    background-color: #dfdfdf;
    color: white;
}

.cancel-button {
    background-color: white;
    border: 1px solid #c7c7c7;
    cursor: poinnter

}
</style>
