<script setup>
const { openNewVendorDialog } = useSettingData();
</script>
<template>
  <el-dialog
    id="newVendorDilaog"
    v-model="openNewVendorDialog"
    title="新的配送站"
    width="400px"
    :draggable="true"
    :align-center="true"
    :show-close="true"
  >
    <NewVendorDialog_agGrid />
  </el-dialog>
</template>
<style scoped>
#newVendorDilaog :deep(.el-dialog__title) {
  font-size: 16px !important;
}

.el-dialog__header {
  padding: 0 !important;
  padding: 4px 8px !important;
}
</style>
