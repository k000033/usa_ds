import { defineStore } from 'pinia';

export const settingDataStore = defineStore('settingData', () => {
  const openNewVendorDialog = ref(false);
  const openAddSettingDialog = ref(false);
  const addTabActive = ref('');
  const newVendorList = ref([]);
  const newVendorData = ref({
    vendorId: '',
    vendorName: '',
    bDate: '',
    memo: ''
  });
  const settingLeftTransferData = ref([]);

  const settingRightTransferData = ref([]);
  const sltAddItemData = ref([]);
  const storeBreadCrump = ref([
    {
      ID: '',
      NAME: '最上層',
      PARAMETER: ''
    }
  ]);
  return {
    openNewVendorDialog,
    newVendorData,
    newVendorList,
    openAddSettingDialog,
    addTabActive,
    settingLeftTransferData,
    settingRightTransferData,
    sltAddItemData,
    storeBreadCrump
  };
});
