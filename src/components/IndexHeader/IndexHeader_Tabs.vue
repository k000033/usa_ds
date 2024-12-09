<script setup>
const { tabList, filterData, getDsListData } = useGetIndex();
const switchTab = () => {
  getDsListData();
};
</script>
<template>
  <div id="tabList">
    <el-tabs
      type="border-card"
      v-model="filterData.status"
      @tab-change="switchTab"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.STATUS"
        :name="item.STATUS"
        :label="item.CAPTION"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
#tabList :deep(.el-tabs__content) {
  display: none;
}

#tabList :deep(.el-tabs__item) {
  height: 29px;
}
</style>
