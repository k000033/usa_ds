<script setup>
import { AgGridVue } from 'ag-grid-vue3';
const { newVendorList, newVendorData, openNewVendorDialog } = useSettingData();
const rowSelection = ref(null);
const columnDefs = ref([
  {
    headerName: '單號',
    field: 'ID',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '100px'
  },
  {
    headerName: '單號',
    field: 'NAME',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '100px',
    flex: 1
  }
]);
const defaultColDef = ref({
  floatingFilter: true,
  resizable: true
});
const onGridReady = (params) => {
  window.newVendorGridApi = params.api;
  window.newVendorGridColumnApi = params.columnApi;
};

// 回傳字串
const getRowId = (x) => {
  return `${x.data.ID}`;
};

const sltNewVendor = () => {
  const sltVendor = window.newVendorGridApi.getSelectedRows();
  if (sltVendor.length > 0) {
    newVendorData.value.vendorId = sltVendor[0].ID;
    newVendorData.value.vendorName = sltVendor[0].NAME;
    openNewVendorDialog.value = false;
  }
};

onBeforeMount(() => {
  rowSelection.value = {
    mode: 'singleRow',
    checkboxes: false,
    headerCheckbox: false,
    enableClickSelection: true
  };
});
</script>
<template>
  <div id="newVendorAgGrid" class="tw-px-4 tw-pt-2 tw-pb-4">
    <ag-grid-vue
      style="height: 500px"
      class="ag-theme-balham"
      :rowData="newVendorList.data"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      :getRowId="getRowId"
      animateRows="true"
      :rowSelection="rowSelection"
      @grid-ready="onGridReady"
      @cell-DoubleClicked="sltNewVendor"
    >
    </ag-grid-vue>
    <div class="tw-flex tw-justify-center tw-mt-4">
      <el-button size="small" color="#262d32" @click="sltNewVendor"
        >確定</el-button
      >
    </div>
  </div>
</template>
<style scoped>
#newVendorAgGrid :deep(.ag-header) {
  background-color: #3b4547;
}
#newVendorAgGrid :deep(.ag-header-cell) {
  color: #fff;
}
</style>
