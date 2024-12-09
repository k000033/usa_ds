<script setup>
const {
  openNewVendorDialog,
  newVendorData,
  getVendorListdata,
  openAddSettingDialog,
  addTabActive
} = useSettingData();
const { previousItem, previousStore, previousVendor, isAddDs } =
  useDsItemDilaog();
const tableHeight = ref('calc(100dvh - 100px - 145px)');
// 先前設定的供應商資料
const mapPreviousVendor = computed(() => {
  return previousVendor.value.map((x) => {
    return { ID: x.SITE_ID, NAME: x.SITE_NAME };
  });
});

const isHavePreviousVendor = computed(() => {
  return mapPreviousVendor.value.length == 0;
});

// 先前設定的商品資料
const mapPreviousItem = computed(() => {
  // 如果沒有選商品的話，代表被替代的供應商的所有商品
  if (previousItem.value.length == 0) {
    return previousVendor.value.map((x) => {
      return { ID: x.SITE_ID, NAME: `全部商品` };
    });
  }

  return previousItem.value.map((x) => {
    return { ID: x.ITEM_ID, NAME: x.ITEM_NAME };
  });
});

// 先前設定的門市資料
const mapPreviousStore = computed(() => {
  // 如果沒選的話門市的話，代表所有門市
  if (previousStore.value.length == 0) {
    return [{ ID: '全部', NAME: '全部門市' }];
  }
  return previousStore.value.map((x) => {
    return { ID: x.SITE_ID, NAME: x.SITE_NAME };
  });
});

const openDialog = async () => {
  await getVendorListdata();
  openNewVendorDialog.value = true;
};

const openAddDialog = async (tabId) => {
  openAddSettingDialog.value = true;
  addTabActive.value = tabId;
};

const vendorName = computed(() => {
  return `${newVendorData.value.vendorId} ${newVendorData.value.vendorName}`;
});
</script>

<template>
  <div class="tw-flex tw-h-full tw-relative">
    <!-- 店鋪 -->
    <div
      class="tw-px-4 tw-pt-6 tw-flex-1 tw-h-full tw-flex tw-flex-col tw-border tw-border-dashed tw-relative"
    >
      <!-- 標題 -->
      <div class="tw-absolute tw-left-0 tw-top-[-10px] tw-bg-white tw-px-4">
        供應商
      </div>
      <!-- 指標 -->
      <div
        class="tw-py-2 tw-bg-white tw-text-[#0089A7] tw-absolute tw-right-[-16px] tw-top-[60px] tw-flex tw-flex-col tw-justify-center tw-z-10"
      >
        <span>配送</span>
        <span class="material-symbols-outlined tw-animate-icon1"> stat_3 </span>
      </div>
      <!-- 內容 -->
      <!-- 新的配送站 -->
      <div
        :class="[
          'tw-border',
          'tw-px-2',
          'tw-py-4',
          'tw-rounded-lg',
          'tw-relative',
          'tw-shadow-md',
          'tw-relative'
        ]"
      >
        <div
          v-show="!isAddDs"
          class="tw-absolute tw-top-0 tw-left-0 tw-h-[40px] tw-right-0 tw-bg-slate-300/20 tw-z-30"
        ></div>
        <div class="tw-flex tw-items-center tw-gap-2 tw-mb-4">
          <div>新的供應商</div>
          <div class="tw-flex tw-items-center tw-gap-2">
            <div
              class="tw-border-b tw-w-[250px] tw-h-[21px] tw-pl-2 tw-overflow-hidden tw-cursor-pointer hover:tw-bg-slate-100"
              :title="vendorName"
              @click="openDialog"
            >
              {{ vendorName }}
            </div>
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-gap-2 tw-mb-4">
          <div class="tw-w-[70px] tw-text-right">生效日</div>
          <div class="bDate">
            <el-date-picker
              v-model="newVendorData.bDate"
              type="date"
              placeholder="生效日"
              size="small"
              style="width: 250px"
              value-format="YYYY-MM-DD"
            />
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-gap-2">
          <div class="tw-w-[70px] tw-text-right">備註</div>
          <div class="memo">
            <el-input
              v-model="newVendorData.memo"
              style="width: 250px"
              placeholder="填寫備註"
            />
          </div>
        </div>
      </div>

      <div
        :class="[
          'tw-pt-1',
          'tw-bg-white',
          'tw-text-[#A36336]',
          'tw-flex',
          'tw-justify-center',
          'tw-items-center',
          'tw-z-10',
          { ' tw-text-slate-400': isHavePreviousVendor }
        ]"
      >
        <span
          :class="[
            'material-symbols-outlined',
            { 'tw-animate-icon2': !isHavePreviousVendor }
          ]"
        >
          stat_3
        </span>
        <span style="writing-mode: vertical-rl">改由</span>
      </div>

      <!-- 被取代的配送站 -->
      <div
        class="tw-border tw-mt-3 tw-px-2 tw-pt-6 tw-pb-2 tw-rounded-lg tw-relative tw-h-full"
      >
        <!-- 標題 -->
        <div class="tw-absolute tw-left-0 tw-top-[-10px] tw-bg-white tw-px-4">
          <el-button
            v-show="!isAddDs"
            size="small"
            color="#A36336"
            @click="openAddDialog(`11`)"
            >選擇供應商</el-button
          >
        </div>
        <!-- 內容 -->
        <div
          class="tw-h-full tw-rounded-lg tw-shadow tw-shadow-[#A36336] tw-relative"
        >
          <PreviousSettings
            v-show="!isAddDs"
            :tableData="mapPreviousVendor"
            :type="20"
            :heighta="'200px'"
          />
        </div>
      </div>
    </div>
    <!-- 商品 -->
    <div
      class="tw-px-4 tw-pt-6 tw-pb-2 tw-flex-1 tw-h-full tw-flex tw-flex-col tw-border tw-border-dashed tw-relative"
    >
      <!-- 標題 -->
      <div class="tw-absolute tw-left-0 tw-top-[-10px] tw-bg-white tw-px-4">
        <el-button
          v-show="!isAddDs"
          size="small"
          color="#0089A7"
          @click="openAddDialog(`12`)"
          >選擇商品</el-button
        >
      </div>
      <!-- 指標 -->
      <div
        class="tw-py-2 tw-bg-white tw-text-[#1B813E] tw-absolute tw-right-[-16px] tw-top-[60px] tw-flex tw-flex-col tw-justify-center tw-z-10"
      >
        <span>送到</span>
        <span class="material-symbols-outlined tw-animate-icon1"> stat_3 </span>
      </div>
      <div
        class="tw-h-full tw-rounded-lg tw-shadow tw-shadow-[#0089A7] tw-relative"
      >
        <PreviousSettings
          v-show="!isAddDs"
          :tableData="mapPreviousItem"
          :type="21"
          :heighta="tableHeight"
        />
      </div>
      <!-- 內容 -->
    </div>
    <!-- 門市 -->
    <div
      class="tw-px-4 tw-pt-6 tw-pb-2 tw-flex-1 tw-h-full tw-flex tw-flex-col tw-border tw-border-dashed tw-relative"
    >
      <div class="tw-absolute tw-left-0 tw-top-[-10px] tw-bg-white tw-px-4">
        <el-button
          v-show="!isAddDs"
          size="small"
          color="#1B813E"
          @click="openAddDialog(`13`)"
          >選擇門市</el-button
        >
      </div>
      <div class="tw-h-full tw-rounded-lg tw-shadow tw-shadow-[#1B813E]">
        <!-- 內容 -->
        <PreviousSettings
          v-show="!isAddDs"
          :tableData="mapPreviousStore"
          :type="22"
          :heighta="tableHeight"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.memo :deep(.el-input__wrapper),
.bDate :deep(.el-input__wrapper) {
  box-shadow: none;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0;
}
</style>
