<script setup>
import { AgGridVue } from 'ag-grid-vue3';
import { DArrowRight, DArrowLeft } from '@element-plus/icons-vue';
import AddSettingDialog_StoreType from '../AddSettingDialog/AddSettingDialog_StoreType.vue';
const { addTabActive, settingLeftTransferData, settingRightTransferData } =
  useSettingData();
const rowSelection = ref(null);
const rowClassRules = ref(null);
const columnDefs_1 = ref([
  {
    headerName: '單號',
    field: 'ID',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '100px',
    hide: true
  },
  {
    headerName: '名稱',
    field: 'NAME',
    filter: 'agTextColumnFilter',
    sortable: true,
    sort: 'asc',
    width: '100px',
    flex: 1
  }
]);

const columnDefs_2 = ref([
  {
    headerName: '店名',
    field: 'NAME',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '220px'
  },
  {
    headerName: 'ENABLED',
    field: 'ENABLED',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '220px',
    hide: true
  },
  {
    headerName: '選擇類別',
    field: 'OPTION',
    flex: 1,
    cellRenderer: AddSettingDialog_StoreType
  }
]);

const defaultColDef = ref({
  floatingFilter: true,
  resizable: true
});
const onGridLeftReady = (params) => {
  window.leftTransferGridApi = params.api;
  window.leftTransferGridColumnApi = params.columnApi;
};
const onGridRightReady = (params) => {
  window.rightTransferGridApi = params.api;
  window.rightTransferridColumnApi = params.columnApi;
};

// 回傳字串
const getRowId = (x) => {
  return `${x.data.ID}`;
};

// 判斷 要用哪個一個欄位定義
const columnDefs = computed(() => {
  return addTabActive.value == '13' ? columnDefs_2.value : columnDefs_1.value;
});

const add = () => {
  // 在左邊的AgGrid，取得被選取的rowData，返回一個陣列
  let sltLeftData = window.leftTransferGridApi.getSelectedRows();

  // 供應商，商品 加入
  if (addTabActive.value != '13') {
    const map = new Map(sltLeftData.map((x) => [x.ID, x]));
    // 將左邊Grid選擇的資料，從左邊Grid移除
    settingLeftTransferData.value.data =
      settingLeftTransferData.value.data.filter(function (val) {
        return map.has(val.ID) ? false : true;
      });
    // 加入到右邊的AgGrid
    settingRightTransferData.value = [
      ...settingRightTransferData.value,
      ...sltLeftData
    ];
  }
  // 門市加入
  if (addTabActive.value == '13') {
    const filterData = sltLeftData.filter((x) => x.ENABLED != 0);
    const map = new Map(filterData.map((x) => [x.ID, x]));
    // 將左邊選擇的資料，修改欄位 ENABLED 成 0
    settingLeftTransferData.value.data.forEach((val) => {
      val.ENABLED = map.has(val.ID) ? 0 : val.ENABLED;
      // 要透過AgGrid的方式，才會重新 rowClassRules
      window.leftTransferGridApi.forEachNode((rowNode) => {
        if (map.has(rowNode.data.ID)) {
          rowNode.setDataValue('ENABLED', 0);
        }
      });
    });
    // 將左邊已選擇的標誌，移除
    window.leftTransferGridApi.deselectAll();
    // 加入到右邊的AgGrid
    settingRightTransferData.value = [
      ...settingRightTransferData.value,
      ...filterData
    ];
  }
};

// 移除
const remove = () => {
  // 供應商，商品 移除
  if (addTabActive.value != '13') {
    // 取得 右邊grid選擇項目，回傳陣列
    const rightGridData = window.rightTransferGridApi.getSelectedRows();
    // 將陣列，只取得 ID 陣列
    const map = new Map(rightGridData.map((x) => [x.ID, x]));

    // 加入到左邊陣列
    settingLeftTransferData.value.data = [
      ...settingLeftTransferData.value.data,
      ...rightGridData
    ];

    // 移除右邊已選擇的
    settingRightTransferData.value = settingRightTransferData.value.filter(
      function (val) {
        return map.has(val.ID) ? false : true;
      }
    );
  }
  // 門市 移除
  if (addTabActive.value == '13') {
    // 取得 右邊grid選擇項目，回傳陣列
    const rightGridData = window.rightTransferGridApi.getSelectedRows();
    // 將陣列，只取得 ID 陣列
    const map = new Map(rightGridData.map((x) => [x.ID, x]));
    // 將右邊已選擇的項目，將左邊的grid 修改欄位 ENABLED 成 1
    settingLeftTransferData.value.data.forEach((val) => {
      val.ENABLED = map.has(val.ID) ? 1 : val.ENABLED;
      // 要透過AgGrid的方式，才會重新 rowClassRules
      window.leftTransferGridApi.forEachNode((rowNode) => {
        if (map.has(rowNode.data.ID)) {
          rowNode.setDataValue('ENABLED', 1);
        }
      });
    });
    // 將右邊已選擇的標誌，移除
    window.rightTransferGridApi.deselectAll();
    // 已選AgGrid 剔除
    settingRightTransferData.value = settingRightTransferData.value.filter(
      (val) => {
        return rightGridData.map((e) => e.ID).indexOf(val.ID) == -1;
      }
    );
  }
};

onMounted(async () => {});

onBeforeMount(() => {
  rowSelection.value = {
    mode: 'multiRow',
    checkboxes: false,
    headerCheckbox: false,
    enableClickSelection: true
  };

  rowClassRules.value = {
    // 已選擇或者已被設定
    notSelectFlag: function (params) {
      if (addTabActive.value == '13') {
        return params.data.ENABLED == 0;
      }
    }
  };
});
</script>
<template>
  <div class="tw-flex tw-px-4 tw-pt-2 tw-pb-4">
    <div id="leftTransferAgGrid" class="tw-w-[450px]">
      <ag-grid-vue
        style="height: 500px"
        class="ag-theme-balham"
        :rowData="settingLeftTransferData.data"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :getRowId="getRowId"
        animateRows="true"
        :rowSelection="rowSelection"
        deltaRowDataMode="true"
        @grid-ready="onGridLeftReady"
        :rowClassRules="rowClassRules"
        @cell-DoubleClicked="add"
      >
      </ag-grid-vue>
    </div>
    <div
      id="btnGround"
      class="tw-flex tw-flex-col tw-justify-center tw-gap-4 tw-mx-2"
    >
      <el-button type="primary" size="small" :icon="DArrowRight" @click="add" />
      <el-button
        type="primary"
        size="small"
        :icon="DArrowLeft"
        @click="remove"
      />
    </div>
    <div id="rightTransferAgGrid" class="tw-w-[250px]">
      <ag-grid-vue
        style="height: 500px"
        class="ag-theme-balham"
        :rowData="settingRightTransferData"
        :columnDefs="columnDefs_1"
        :defaultColDef="defaultColDef"
        :getRowId="getRowId"
        animateRows="true"
        deltaRowDataMode="true"
        :rowSelection="rowSelection"
        :rowClassRules="rowClassRules"
        @grid-ready="onGridRightReady"
        @cell-DoubleClicked="remove"
      >
      </ag-grid-vue>
    </div>
  </div>
</template>
<style scoped>
#leftTransferAgGrid :deep(.ag-header),
#rightTransferAgGrid :deep(.ag-header) {
  background-color: #3b4547;
}

#leftTransferAgGrid :deep(.ag-header-cell),
#rightTransferAgGrid :deep(.ag-header-cell) {
  color: #fff;
}
#leftTransferAgGrid:deep(.ag-floating-filter-button),
#rightTransferAgGrid :deep(.ag-floating-filter-button) {
  display: none;
}

#btnGround :deep(.el-button) {
  margin: 0;
}

#leftTransferAgGrid:deep(.notSelectFlag) {
  color: #aaa;
}

#leftTransferAgGrid :deep(.ag-input-field-input),
#rightTransferAgGrid :deep(.ag-input-field-input) {
  color: black;
}

#leftTransferAgGrid :deep(.ag-icon),
#rightTransferAgGrid :deep(.ag-icon) {
  color: #fff;
}
</style>
