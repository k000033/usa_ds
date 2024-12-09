<script setup>
const { getInitialRow, getInitialTabList, getDsListData } = useGetIndex();

onMounted(async () => {
  await getInitialRow();
  await getInitialTabList();
  await getDsListData();
});
</script>

<template>
  <div class="tw-px-4 tw-py-2">
    <IndexHeader_FilterBar />
    <IndexHeader_Tabs />

    <IndexBody_DsListAgGrid />
  </div>
</template>
