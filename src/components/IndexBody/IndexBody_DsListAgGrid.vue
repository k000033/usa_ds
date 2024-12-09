<script setup>
import { AgGridVue } from 'ag-grid-vue3';
const {
  dsList,
  currentDsId,
  deleteDsItem,
  getDsListData,
  openIndexDrawer,
  selectIDs
} = useGetIndex();
const { openDsItemDialo } = useDsItemDilaog();
const { confimMessageBox, showMessage } = useMessageBox();
const rowSelection = ref(null);
const rowClassRules = ref(null);
const columnDefs = ref([
  {
    headerName: '單號',
    field: 'ID',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '100px'
  },
  {
    headerName: '類別名稱',
    field: 'LINE_NAME',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '100px'
  },
  {
    headerName: '生效日',
    field: 'D_DATE',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '100px'
  },
  {
    headerName: '品項數',
    field: 'ITEMS',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '85px',
    cellClass: ['txt-right']
  },
  {
    headerName: '強度',
    field: 'PRIORITY',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '70px',
    cellClass: ['txt-right']
  },
  {
    headerName: '促銷屬性',
    field: 'PROPERTY_NAME',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '120px'
  },
  {
    headerName: '促銷模式',
    field: 'PROMOTION_NAME',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '120px'
  },
  {
    headerName: '狀態',
    field: 'STATUS_NAME',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '75px'
  },
  {
    headerName: '備註',
    field: 'MEMO',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '370px',
    flex: 1
  },
  {
    headerName: '異動者',
    field: 'UPD_BY',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '80px'
  },
  {
    headerName: '異動時間',
    field: 'UPD_TIME',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '140px'
  },
  {
    headerName: '建立者',
    field: 'CRT_BY',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '80px'
  },
  {
    headerName: '建立時間',
    field: 'CRT_TIME',
    filter: 'agTextColumnFilter',
    sortable: true,
    width: '140px'
  },
  {
    headerName: '',
    field: 'Delete',
    width: '60px',
    pinned: 'right',
    lockPinned: true,
    cellClass: ['agGrid-deleteIcon'],
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
  window.indexGridApi = params.api;
  window.indexGridColumnApi = params.columnApi;
};
// 回傳字串
const getRowId = (x) => {
  return `${x.data.ID}`;
};

const selectionChanged = () => {
  selectIDs.value = window.indexGridApi.getSelectedRows();
  // 如果都沒勾，關掉Drawer
  openIndexDrawer.value = selectIDs.value.length > 0;
  // 清空錯誤訊息
  if (openIndexDrawer.value == false) {
    checkUpResult.value = [];
  }
};

const cellDbClicked = (row) => {
  openDsItemDialo.value = true;
  console.log(row.data.ID);
  currentDsId.value = row.data.ID;
  window.indexGridApi.redrawRows();
};

const cellMouseDown = async (cell) => {
  // 點擊 刪除
  if (['Delete'].includes(cell.colDef.field)) {
    console.log(cell);
    confimMessageBox('確定將 ', cell.data.ID, ' 刪除嗎?', '確定', '取消').then(
      async () => {
        const id = cell.data.ID;
        const res = await deleteDsItem(id);
        const msg =
          res.data[0].RTN_CODE == 0 ? '刪除成功' : res.data[0].RTN_MSG;
        const type = res.data[0].RTN_CODE == 0 ? 'success' : 'error';
        showMessage(msg, type);
        getDsListData();
      }
    );
  }
};

onBeforeMount(() => {
  rowSelection.value = {
    mode: 'multiRow',
    checkboxes: true,
    headerCheckbox: true
  };

  rowClassRules.value = {
    // 已選擇或者已被設定
    sltRowStyle: function (params) {
      return params.data.ID == currentDsId.value;
    }
  };
});
</script>
<template>
  <div id="dsListAgGrid" class="tw-h-[calc(100dvh-90px)]">
    <ag-grid-vue
      style="height: 100%"
      class="ag-theme-balham"
      :rowData="dsList.data"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      :getRowId="getRowId"
      animateRows="true"
      :rowSelection="rowSelection"
      @grid-ready="onGridReady"
      @selectionChanged="selectionChanged"
      @cell-DoubleClicked="cellDbClicked"
      @cellMouseDown="cellMouseDown"
      :rowClassRules="rowClassRules"
    >
    </ag-grid-vue>
  </div>
</template>

<style scoped>
#dsListAgGrid :deep(.ag-header) {
  background-color: #3b4547;
}

#dsListAgGrid :deep(.ag-header-cell) {
  color: #fff;
}

#dsListAgGrid :deep(.icon-delete) {
  color: #f56c6c;
}

#dsListAgGrid :deep(.ag-input-field-input) {
  color: black;
}

#dsListAgGrid :deep(.ag-icon) {
  color: #fff;
}
#dsListAgGrid :deep(.ag-floating-filter-button) {
  display: none;
}

#dsListAgGrid :deep(.sltRowStyle) {
  font-weight: bold !important;
}
</style>
