<script setup>
const { openIndexDrawer, selectIDs, checkUpResult } = useGetIndex();

const closeDrawer = () => {
  openIndexDrawer.value = false;
  window.indexGridApi.deselectAll();
};
</script>
<template>
  <div id="test">
    <el-drawer
      v-model="openIndexDrawer"
      title="I have a nested table inside!"
      direction="rtl"
      size="300"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal="false"
      :show-close="false"
      modal-class="drawerModel"
      :with-header="false"
    >
      <div class="tw-flex tw-py-1 tw-px-2 tw-bg-slate-300">
        <div>
          <span class="font-bold text-base">功能</span>
        </div>

        <span
          class="material-symbols-outlined tw-ml-auto tw-mr-2 tw-cursor-pointer hover:tw-text-orange-500"
          @click="closeDrawer"
        >
          close
        </span>
      </div>
      <div class="tw-px-2 tw-py-2">
        <!-- 按鈕清單 -->
        <div class="tw-border-b tw-pb-2 tw-mb-2">
          <button
            aria-disabled="false"
            type="button"
            class="el-button el-button--primary el-button--small"
          >
            <!--v-if--><span class="">檢核</span>
          </button>
        </div>
        <!-- 錯誤訊息 -->
        <div
          v-if="checkUpResult.length > 0"
          class="tw-text-sm tw-mb-6 tw-shadow-lg tw-rounded-md tw-overflow-hidden"
        >
          <div class="tw-py-1 tw-px-2 tw-bg-slate-300 tw-flex tw-items-center">
            <span class="tw-text-red-600">錯誤訊息 </span>
            <span class="tw-ml-auto">{{ checkUpResult.length }} 筆</span>
          </div>
          <ul class="tw-py-1 tw-px-2 tw-max-h-72 tw-overflow-auto tw-bg-white">
            <li
              class="tw-text-sm tw-relative tw-mt-1 tw-pl-3 before:tw-absolute before:tw-left-0 before:tw-top-[7px] before:tw-w-[6px] before:tw-h-[6px] before:tw-bg-slate-400 before:tw-rounded-full"
              v-for="item in checkUpResult"
              :key="item.ID"
            >
              <div>
                <div>
                  <span>{{ item.ITEM_ID }}</span>
                </div>
                <div>
                  <span class="tw-text-red-500">{{ item.MSG }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 已選表單 -->
        <div
          class="tw-text-sm tw-mb-1 tw-border tw-shadow-lg tw-rounded-md tw-overflow-hidden"
        >
          <div class="tw-py-1 tw-px-2 tw-bg-slate-300 tw-flex tw-items-center">
            <span>已選表單</span>
            <span class="tw-ml-auto">{{ selectIDs.length }} 筆</span>
          </div>

          <ul class="tw-py-1 tw-px-2 tw-max-h-72 tw-overflow-auto tw-bg-white">
            <li
              class="tw-text-sm tw-relative tw-mt-1 tw-pl-3 before:tw-absolute before:tw-left-0 before:tw-top-[7px] before:tw-w-[6px] before:tw-h-[6px] before:tw-bg-slate-400 before:tw-rounded-full"
              v-for="item in selectIDs"
              :key="item.ID"
            >
              <div>
                <div>
                  <span>{{ item.ID }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<style scoped>
#test .drawerModel {
  width: 300px !important;
  margin-left: auto;
}
</style>
