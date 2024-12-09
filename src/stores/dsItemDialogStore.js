import { defineStore } from 'pinia';

export const dsItemDialogStore = defineStore('dsItemDialog', () => {
  const openDsItemDialo = ref(false);
  const dsItemLoading = ref(false);
  const previousVendor = ref([]);
  const previousItem = ref([]);
  const previousStore = ref([]);
  const isAddDs = ref(false);
  return {
    openDsItemDialo,
    previousVendor,
    previousItem,
    previousStore,
    isAddDs,
    dsItemLoading
  };
});
