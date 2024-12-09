<script setup>
import { Search, Plus } from '@element-plus/icons-vue';
const rowList = [100, 200, 300, 400, 500];
const { filterData, getDsListData } = useGetIndex();
const { openDsItemDialo, isAddDs } = useDsItemDilaog();
watch(filterData.value, (newvale) => {
  console.log(newvale);
});

const addDs = () => {
  openDsItemDialo.value = true;
  isAddDs.value = true;
};

const search = () => {
  getDsListData();
};
</script>
<template>
  <div class="tw-flex">
    <div>
      <el-select
        v-model="filterData.row"
        placeholder="Select"
        size="small"
        style="width: 70px"
      >
        <el-option
          v-for="item in rowList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <div>
      <el-date-picker
        v-model="filterData.bDate"
        type="date"
        placeholder="起日"
        size="small"
        style="width: 120px"
      />
    </div>
    <div>
      <el-date-picker
        v-model="filterData.dDate"
        type="date"
        placeholder="迄日"
        size="small"
        style="width: 120px"
      />
    </div>
    <div>
      <el-input
        v-model="filterData.keyWord"
        placeholder="關鍵字"
        size="small"
        style="width: 150px"
      />
    </div>
    <div>
      <el-button size="small" :icon="Search" color="#303133" @click="search"
        >搜尋</el-button
      >
      <el-button size="small" :icon="Plus" color="#303133" @click="addDs"
        >新增</el-button
      >
    </div>
  </div>
</template>
