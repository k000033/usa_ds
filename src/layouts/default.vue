<script setup></script>

<template>
  <RouterView />
  <DsItemDilaog />
  <AddSettingDialog />
  <indexBody_Drawer />
</template>

<style>
#addSettingDialog,
#dsItemDilaog,
#newVendorDilaog {
  padding: 0 !important;
}

.el-dialog__header {
  padding: 0 !important;
  padding: 4px 8px !important;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0px 1px 0px #e5e7eb;
}
.el-dialog__title {
  font-size: 16px !important;
}
.el-dialog__headerbtn {
  height: 35px !important;
}

.el-breadcrumb__ite:last-child .el-breadcrumb__inner {
  font-size: 12px !important;
  color: #67c23a !important;
}

.el-drawer__body {
  padding: 0 !important;
}

#test .drawerModel {
  width: 300px !important;
  margin-left: auto;
  z-index: 2012;
  inset: 0px;
  position: fixed;
}
</style>
