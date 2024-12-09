import { storeToRefs } from 'pinia';
import { apiUsaDsParams, apiUsaDsMethodParams } from '../api/index';
import { usaGetDsParams } from '@/api/params';
export const useDsItemDilaog = () => {
  const usaDsParams = new apiUsaDsParams();
  const usaDsMethodParams = new apiUsaDsMethodParams();
  const dsItemDialog = dsItemDialogStore();
  const {
    openDsItemDialo,
    previousVendor,
    previousItem,
    previousStore,
    isAddDs,
    dsItemLoading
  } = storeToRefs(dsItemDialog);
  const { apiUsaDs, apiMethodDs } = cpSqlStore();
  const { currentDsId } = useGetIndex();
  const { newVendorData } = useSettingData();

  // 取得新的配送站資料
  const getNewVendorData = async () => {
    usaDsParams.paramsInital();
    usaDsParams.LINE_ID = '';
    usaDsParams.ID = currentDsId.value;
    usaDsParams.LID = -1;
    const res = await apiUsaDs(usaDsParams);
    newVendorData.value.vendorId = res.data.data[0].SITE_ID;
    newVendorData.value.vendorName = res.data.data[0].SITE_NAME;
    newVendorData.value.bDate = res.data.data[0].D_DATE;
    newVendorData.value.memo = res.data.data[0].MEMO;
  };

  // 取得之前設定 配送站，商品，門市 資料
  const getPreviousSettings = async (page) => {
    usaDsParams.paramsInital();
    usaDsParams.ID = currentDsId.value;
    usaDsParams.PAGE = page;
    usaDsParams.MODE = 1;
    const res = await apiUsaDs(usaDsParams);
    switch (page) {
      case 0:
        previousVendor.value = res.data.data;
        break;
      case 1:
        previousItem.value = res.data.data;
        break;
      case 2:
        previousStore.value = res.data.data;
    }
    return res;
  };
  // 刪除先前設定的 供應商 商品 店鋪
  const deletePreviousSettings = async (deleID, type) => {
    usaDsMethodParams.paramsInital();
    usaDsMethodParams.LINE_ID = '';
    usaDsMethodParams.ID = currentDsId.value;
    usaDsMethodParams.ID_DELETE = deleID;
    usaDsMethodParams.ACT_TYPE = type;
    const res = await apiMethodDs(usaDsMethodParams);
    return res;
  };

  // 儲存新的供應商資料
  const saveNewVendorData = async (updStr) => {
    usaDsMethodParams.paramsInital();
    usaDsMethodParams.ID = currentDsId.value;
    usaDsMethodParams.UPD_STR = updStr;
    usaDsMethodParams.ACT_TYPE = 10;
    const res = await apiMethodDs(usaDsMethodParams);
    return res.data;
  };

  return {
    openDsItemDialo,
    previousVendor,
    previousItem,
    previousStore,
    isAddDs,
    getNewVendorData,
    getPreviousSettings,
    deletePreviousSettings,
    saveNewVendorData,
    dsItemLoading
  };
};
