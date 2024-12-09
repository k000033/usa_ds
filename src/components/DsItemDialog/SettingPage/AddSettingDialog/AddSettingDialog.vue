<script setup>
import { ArrowRight } from '@element-plus/icons-vue';
const { addTabActive } = useSettingData();
const { getPreviousSettings, dsItemLoading } = useDsItemDilaog();
const {
  openAddSettingDialog,
  getAddListdata,
  settingLeftTransferData,
  settingRightTransferData,
  saveSettingAction,
  storeBreadCrump,
  getStoreListByLevel
} = useSettingData();

const dialogTitle = computed(() => {
  let title = '';
  switch (addTabActive.value) {
    case '11':
      title = '選擇供應商';
      break;
    case '12':
      title = '選擇商品';
      break;
    case '13':
      title = '選擇門市';
      break;
  }
  return title;
});

// 開啟Dialog 要做的事
const open = async () => {
  await getAddListdata(addTabActive.value);
};

// 關閉 Dialog 要做的事
const close = async () => {
  dsItemLoading.value = true;
  await saveSetting();
  // 清空 AgGrid 資料
  window.leftTransferGridApi.setGridOption('rowData', []);
  window.rightTransferGridApi.setGridOption('rowData', []);
  settingLeftTransferData.value = [];
  settingRightTransferData.value = [];

  // 判斷要重新撈取哪一個( 供應商，商品，門市 )設定的資料
  switch (addTabActive.value) {
    case '11':
      await getPreviousSettings(0);
      dsItemLoading.value = false;
      break;
    case '12':
      await getPreviousSettings(1);
      dsItemLoading.value = false;
      break;
    case '13':
      await getPreviousSettings(2);
      dsItemLoading.value = false;
      break;
  }

  storeBreadCrump.value.splice(1, storeBreadCrump.value.length - 1);
};

// 儲存新的供應商資料
const saveSetting = async () => {
  const map = new Map(settingRightTransferData.value.map((x) => [x.ID, x]));
  const insert = Array.from(map.keys()).join(';');
  let type = 0;
  switch (addTabActive.value) {
    case '11':
      type = '20';
      break;
    case '12':
      type = '21';
      break;
    case '13':
      type = '22';
      break;
  }
  await saveSettingAction(insert, type);
};

// 新增店鋪的時候，點擊麵包屑
const returnLeavel = async (item) => {
  const idx = storeBreadCrump.value.findIndex((x) => x.NAME == item.NAME);
  storeBreadCrump.value.splice(idx + 1, storeBreadCrump.value.length - idx);
  await getStoreListByLevel(item.PARAMETER);
};
</script>
<template>
  <el-dialog
    id="addSettingDialog"
    v-model="openAddSettingDialog"
    :title="dialogTitle"
    width="800px"
    :draggable="true"
    :align-center="true"
    :show-close="true"
    @close="close"
    @open="open"
  >
    <div v-if="addTabActive == '13'" class="tw-px-4 tw-pt-2">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in storeBreadCrump" :key="item.ID">
          <a href="javascript:;" @click="returnLeavel(item)">{{
            item.NAME
          }}</a></el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <AddSettingDialog_Content />
  </el-dialog>
</template>
<style scoped></style>
