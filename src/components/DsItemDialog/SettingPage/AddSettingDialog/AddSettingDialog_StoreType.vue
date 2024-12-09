<script setup>
import { ElRadioGroup, ElRadioButton } from 'element-plus';

const radio = ref('');
const { storeBreadCrump, getStoreListByLevel } = useSettingData();
// params 是從 suitableTransfer 左邊的AgGrid 傳進來
const props = defineProps({
  params: {
    type: Object,
    default: () => {
      {
      }
    }
  }
});
const { OPT1, OPT2, OPT3, OPT4, OPT5, OPT6, ID } = props.params.data;
/**
 * 切換 OPTION
 */
const optionChange = () => {
  const parameter = `${ID}^${radio.value}`;
  // // 要顯示在 suitableTransfer 上面的 breadCrump資料
  storeBreadCrump.value.push({
    ID: ID,
    NAME: `${ID}( ${radio.value} )`,
    PARAMETER: parameter
  });
  // // 撈 suitableTransfer 左邊的AgGrid 資料
  getStoreListByLevel(parameter);
};
</script>
<template>
  <div class="tw-flex">
    <el-radio-group
      class="render"
      v-model="radio"
      size="small"
      fill="#262d32"
      @change="optionChange()"
    >
      <el-radio-button v-show="OPT1 != ''" :label="OPT1" :value="OPT1" />
      <el-radio-button v-show="OPT2 != ''" :label="OPT2" :value="OPT2" />
      <el-radio-button v-show="OPT3 != ''" :label="OPT3" :value="OPT3" />
      <el-radio-button v-show="OPT4 != ''" :label="OPT4" :value="OPT4" />
      <el-radio-button v-show="OPT5 != ''" :label="OPT5" :value="OPT5" />
      <el-radio-button v-show="OPT6 != ''" :label="OPT6" :value="OPT6" />
    </el-radio-group>
  </div>
</template>
