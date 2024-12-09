import { defineStore } from 'pinia';

export const indexDataStore = defineStore('index', () => {
  const filterData = ref({
    row: '',
    bDate: '',
    dDate: '',
    keyWord: '',
    status: ''
  });
  const currentDsId = ref('');
  const tabList = ref('');
  const dsList = ref([]);
  const openIndexDrawer = ref(false);
  const selectIDs = ref([]);
  const checkUpResult = ref([]);
  return {
    filterData,
    tabList,
    dsList,
    currentDsId,
    openIndexDrawer,
    selectIDs,
    checkUpResult
  };
});
