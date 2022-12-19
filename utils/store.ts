import type { Item } from '~/types/Item';

export interface ItemListStoreInterface {
    _key: string;
}

export class ItemListStore<T extends Item> implements ItemListStoreInterface {
    _key: string;

    constructor(key: string) {
        this._key = key;
    }

    protected static createStore(key = '', force = false): boolean {
        const defaultResult = false;

        try {
            if (!key) {
                return defaultResult;
            }

            const temp = window.localStorage.getItem(key);

            if (temp !== null && force === false) {
                throw new Error(`Store with "${key}" is exists. Use "force" flag to create store`);
            }

            if (temp === null || force) {
                window.localStorage.setItem(key, JSON.stringify([]));
            }

            return true;
        } catch (error) {
            console.error(error);

            return false;
        }
    }

    protected getItemList(): Array<T> | null {
        try {
            let result = [] as Array<T>;
            const listStr = window.localStorage.getItem(this._key);

            if (listStr) {
                result = JSON.parse(listStr);
            }

            return result;
        } catch (error) {
            return null;
        }
    }

    protected setItemList(itemList = [] as Array<T>): boolean {
        try {
            const itemListStr = JSON.stringify(itemList);

            window.localStorage.setItem(this._key, itemListStr);

            return true;
        } catch (error) {
            return false;
        }
    }

    protected deleteItem(id = 0): boolean {
        try {
            let result = false;

            if (id === 0) {
                return result;
            }

            const itemList = this.getItemList();

            if (itemList === null) {
                return result;
            }

            const filteredList = itemList.filter((item) => item.id !== id);

            this.setItemList(filteredList);

            result = true;

            return result;
        } catch (error) {
            return false;
        }
    }

    protected clearList(): boolean {
        try {
            let result = false;

            const itemList = this.getItemList();

            if (itemList === null) {
                throw new Error(`List of elements with key "${this._key}" was not created. Please create a list first`);
            }

            this.setItemList([]);

            result = true;

            return result;
        } catch (error) {
            console.error(error);

            return false;
        }
    }

    protected getItemIndex(id = 0): number {
        const defaultValue = -1;

        try {
            const itemList = this.getItemList();

            if (itemList === null) {
                return defaultValue;
            }

            const foundItem = itemList.findIndex((item) => item.id === id);

            return foundItem;
        } catch (error) {
            console.error(error);

            return defaultValue;
        }
    }

    protected getItem(id = 0): T | null {
        const defaultValue = null;

        try {
            if (id === 0) {
                return defaultValue;
            }

            const itemList = this.getItemList();

            if (itemList === null) {
                return defaultValue;
            }

            const itemIndex = this.getItemIndex(id);
            const foundItem = itemList[itemIndex];

            if (~itemIndex) {
                return defaultValue;
            }

            return foundItem;
        } catch (error) {
            return defaultValue;
        }
    }

    protected setItem(item: T): boolean {
        try {
            const itemList = this.getItemList();
            let result = false;

            if (!item || !itemList) {
                return result;
            }

            const itemIndex = this.getItemIndex(item.id);
            const isItemExists = new Boolean(~itemIndex);

            if (isItemExists) {
                itemList[itemIndex] = item;

                result = this.setItemList(itemList);

                return result;
            }

            itemList.push(item);

            const itemListStr = JSON.stringify(itemList);

            window.localStorage.setItem(this._key, itemListStr);

            result = true;

            return result;
        } catch (error) {
            return false;
        }
    }
}
