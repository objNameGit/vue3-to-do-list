import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

import { StoreKey } from '~/types/Store-key';
import { ItemListStore } from '~/utils/store';
import { stubSubTaskDict, stubTaskList } from '~/types/Item';

export const useTaskStore = defineStore('taskStore', () => {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);

    const taskList = reactive(stubTaskList);
    const subTaskDict = reactive(stubSubTaskDict);

    function increment() {
        count.value++;
    }

    return { count, doubleCount, increment, taskList, subTaskDict };
});
