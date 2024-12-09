<script setup>
const {
  openDsItemDialo,
  getNewVendorData,
  getPreviousSettings,
  isAddDs,
  saveNewVendorData,
  dsItemLoading,
  previousItem,
  previousStore,
  previousVendor
} = useDsItemDilaog();
const { newVendorData, initialNewVendorData } = useSettingData();
const { currentDsId, getDsListData } = useGetIndex();
const { showMessage } = useMessageBox();
const currentTab = ref('0');

const title = computed(() => {
  return currentDsId.value == '' ? '新單' : `${currentDsId.value}`;
});
// 打開Dialog 會做的事
const open = async () => {
  // 如果是新增不用撈
  if (isAddDs.value) {
    return;
  }
  dsItemLoading.value = true;
  // 取得之前設定的新配送站
  await getNewVendorData();
  // 取得之前設定的配送站
  await getPreviousSettings(0);
  // 取得之前設定的商品
  await getPreviousSettings(1);
  // 取得之前設定的門市
  await getPreviousSettings(2);
  dsItemLoading.value = false;
};

// 關閉 Dilaog
const close = () => {
  isAddDs.value = false;
  currentDsId.value = '';
  initialNewVendorData();
  previousItem.value = [];
  previousStore.value = [];
  previousVendor.value = [];
};

// 儲存新供應商資料
const saveNewVendor = async () => {
  const { vendorId, bDate, memo } = newVendorData.value;
  const updStr = `SITE_ID=${vendorId}^D_DATE=${bDate}^MEMO=${memo}^`;
  const res = await saveNewVendorData(updStr);
  if (res?.data[0].RTN_CODE != 0) {
    return;
  }
  // 如果是新單，會回傳單號
  if (isAddDs.value) {
    isAddDs.value = false;
    currentDsId.value = res.data[0].ID;
  }
  getNewVendorData();
  getDsListData();
};

// 上一筆
const previousRow = async () => {
  // 取得目前 idexGrid 目前顯示的所有單號
  let idList = window.indexGridApi.getRenderedNodes().map((x) => x.data.ID);
  const idx = idList.indexOf(currentDsId.value);

  if (idx <= 0) {
    showMessage('已經是第一筆', 'warning');
    return;
  }

  currentDsId.value = idList[idx - 1];
  dsItemLoading.value = true;
  // 取得之前設定的新配送站
  await getNewVendorData();
  // 取得之前設定的配送站
  await getPreviousSettings(0);
  // 取得之前設定的商品
  await getPreviousSettings(1);
  // 取得之前設定的門市
  await getPreviousSettings(2);
  dsItemLoading.value = false;
  window.indexGridApi.redrawRows();
};
// 下一筆
const nextRow = async () => {
  let idList = window.indexGridApi.getRenderedNodes().map((x) => x.data.ID);
  const idx = idList.indexOf(currentDsId.value);
  console.log(idList);
  if (idList.length == idx + 1) {
    showMessage('已經是最後一筆', 'warning');
    return;
  }

  currentDsId.value = idList[idx + 1];
  dsItemLoading.value = true;
  // 取得之前設定的新配送站
  await getNewVendorData();
  // 取得之前設定的配送站
  await getPreviousSettings(0);
  // 取得之前設定的商品
  await getPreviousSettings(1);
  // 取得之前設定的門市
  await getPreviousSettings(2);
  dsItemLoading.value = false;
  window.indexGridApi.redrawRows();
};
</script>
<template>
  <el-dialog
    id="dsItemDilaog"
    v-model="openDsItemDialo"
    :title="title"
    width="1150px"
    :draggable="true"
    :align-center="true"
    @open="open"
    @close="close"
  >
    <!-- <div

      class="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-bg-black tw-z-50"
    ></div> -->
    <el-container
      v-loading="dsItemLoading"
      element-loading-text="讀取中..."
      element-loading-background="rgba(122, 122, 122, 0.2)"
      id="test"
      class="tw-h-[calc(100dvh-120px)]"
    >
      <el-header>
        <div class="tw-h-full tw-flex tw-items-center">
          <el-button size="small" color="#262d32" @click="previousRow"
            >上一筆</el-button
          >
          <el-button size="small" color="#262d32" @click="nextRow"
            >下一筆</el-button
          >
          <el-button size="small" color="#262d32" @click="saveNewVendor"
            >儲存</el-button
          >
        </div>
      </el-header>
      <el-main>
        <DsItemDialog_Setting />
      </el-main>
      <el-footer>
        <el-tabs type="border-card" v-model="currentTab">
          <el-tab-pane name="0" label="設定"></el-tab-pane>
        </el-tabs>
      </el-footer>
    </el-container>
  </el-dialog>

  <NewVendorDialog />
</template>
<style scoped>
#test :deep(.el-header) {
  height: 36px;

  background-color: #3b4547;
}

#test :deep(.el-footer) {
  height: 27px !important;
  padding: 0;
}
#test :deep(.el-tabs) {
  border: none;
}

#test :deep(.el-tabs__content) {
  display: none;
  background-color: #3b4547;
}

#test :deep(.el-tabs__header) {
  background-color: #3b4547;
  border: none;
}

#test :deep(.el-tabs__item) {
  height: 29px;
}
</style>
