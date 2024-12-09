<script setup>
import { AgGridVue } from 'ag-grid-vue3';
const { deletePreviousSettings, getPreviousSettings, dsItemLoading } =
  useDsItemDilaog();
const rowSelection = ref(null);
const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  type: {
    type: Number,
    default: 0
  },
  heighta: {
    type: String,
    default: ''
  }
});

const columnDefs = ref([
  {
    headerName: 'ID',
    field: 'ID',
    filter: 'agTextColumnFilter',
    sortable: true,
    sort: 'asc',
    width: '85px'
  },
  {
    headerName: 'NAME',
    field: 'NAME',
    filter: 'agTextColumnFilter',
    sortable: true,
    flex: 1
  },
  {
    headerName: '刪除',
    field: 'Delete',
    width: '50px',
    pinned: 'right',
    lockPinned: true,
    cellRenderer: function (params) {
      return `<div><a href="javascript:;" ><span class="icon-delete material-symbols-outlined">
              delete
              </span></a></div>`;
    }
  }
]);

const defaultColDef = ref({
  floatingFilter: true,
  resizable: true
});

const onGridReady = (params) => {
  window.previousSettingGridApi = params.api;
  window.previousSettingGridColumnApi = params.columnApi;
};

// 回傳字串
const getRowId = (x) => {
  return `${x.data.ID}`;
};

const CellMouseDown = async (cell) => {
  dsItemLoading.value = true;
  // 點擊 刪除
  if (['Delete'].includes(cell.colDef.field)) {
    console.log(cell);
    console.log(props.type);
    await deletePreviousSettings(cell.data.ID, props.type);
  }

  switch (props.type) {
    case 20:
      await getPreviousSettings(0);
      break;
    case 21:
      await getPreviousSettings(1);
      break;
    case 22:
      await getPreviousSettings(2);
      break;
  }
  dsItemLoading.value = false;
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
  <div
    id="previousSetting"
    class="tw-w-[330px] tw-h-full tw-rounded-lg tw-overflow-hidden tw-border"
  >
    <ag-grid-vue
      style="width: 100%; height: 100%"
      class="ag-theme-balham"
      :rowData="props.tableData"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      :getRowId="getRowId"
      animateRows="true"
      :rowSelection="rowSelection"
      deltaRowDataMode="true"
      @grid-ready="onGridReady"
      @CellMouseDown="CellMouseDown"
    >
    </ag-grid-vue>
  </div>
</template>

<style scoped>
#previousSetting :deep(.icon-delete) {
  color: #f56c6c;
}

#previousSetting :deep(.ag-root-wrapper) {
  border: none !important;
}
</style>
