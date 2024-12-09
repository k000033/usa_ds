import { storeToRefs } from 'pinia';
import {
  apiUsaGetDsParams,
  apiUsaDsMethodParams,
  apiUsaDsParams
} from '../api/index';
export const useSettingData = () => {
  const usaGetDsParams = new apiUsaGetDsParams();
  const usaDsMethodParams = new apiUsaDsMethodParams();

  const { apiGetDs, apiMethodDs } = cpSqlStore();

  const settingData = settingDataStore();
  const {
    openNewVendorDialog,
    newVendorData,
    newVendorList,
    openAddSettingDialog,
    addTabActive,
    sltItemListData,
    settingLeftTransferData,
    settingRightTransferData,
    sltAddItemData,
    storeBreadCrump
  } = storeToRefs(settingData);

  const { currentDsId } = useGetIndex();

  // 取得新配送站
  const getVendorListdata = async () => {
    usaGetDsParams.paramsInital();
    usaGetDsParams.GET_WHAT = 11;
    const res = await apiGetDs(usaGetDsParams);
    newVendorList.value = res.data;
    return res;
  };

  // 取得商品清單
  const getAddListdata = async (tabId) => {
    usaGetDsParams.paramsInital();
    usaGetDsParams.GET_WHAT = parseInt(tabId);
    usaGetDsParams.ID = currentDsId.value;
    const res = await apiGetDs(usaGetDsParams);
    settingLeftTransferData.value = res.data;
    console.log(res);
    return res;
  };

  // 儲存設定
  const saveSettingAction = async (insert, type) => {
    usaDsMethodParams.paramsInital();
    usaDsMethodParams.ID = currentDsId.value;
    usaDsMethodParams.LINE_ID = '';
    usaDsMethodParams.ID_INSERT = insert;
    usaDsMethodParams.ACT_TYPE = type;
    const res = await apiMethodDs(usaDsMethodParams);
    console.log(res);
    return res;
  };

  // 取得 門市階層清單
  const getStoreListByLevel = async (parameter) => {
    // window.leftTransferGridApi.showLoadingOverlay();
    usaGetDsParams.paramsInital();
    usaGetDsParams.ID = currentDsId.value;
    usaGetDsParams.GET_WHAT = 13;
    usaGetDsParams.PARAMETER = parameter;
    const res = await apiGetDs(usaGetDsParams);
    settingLeftTransferData.value = res.data;
    return res;
  };

  const initialNewVendorData = () => {
    newVendorData.value.vendorId = '';
    newVendorData.value.vendorName = '';
    newVendorData.value.bDate = '';
    newVendorData.value.memo = '';
  };

  return {
    openNewVendorDialog,
    newVendorData,
    newVendorList,
    openAddSettingDialog,
    addTabActive,
    sltItemListData,
    getVendorListdata,
    getAddListdata,
    settingLeftTransferData,

    settingRightTransferData,
    saveSettingAction,
    sltAddItemData,
    getStoreListByLevel,
    storeBreadCrump,
    initialNewVendorData
  };
};
