import { storeToRefs } from 'pinia';
import { apiUsaDsParams, apiUsaDsMethodParams } from '../api/index';

export const useGetIndex = () => {
  const usaDsParams = new apiUsaDsParams();
  const usaDsMethodParams = new apiUsaDsMethodParams();
  const { apiUsaDs, apiMethodDs } = cpSqlStore();
  const indexData = indexDataStore();
  const {
    tabList,
    dsList,
    filterData,
    currentDsId,
    openIndexDrawer,
    selectIDs,
    checkUpResult
  } = storeToRefs(indexData);

  // 取得預設資料
  const getInitialRow = async () => {
    usaDsParams.paramsInital();
    usaDsParams.LINE_ID = '';
    const res = await apiUsaDs(usaDsParams);
    filterData.value.row = res.data.dataSet.Table[0].DEF_ROWS;
    filterData.value.status = res.data.dataSet.Table[0].DEF_STATUS;
    console.log(res);
  };

  // 取得頁籤清單
  const getInitialTabList = async () => {
    usaDsParams.paramsInital();
    usaDsParams.LINE_ID = '';
    const res = await apiUsaDs(usaDsParams);
    tabList.value = res.data.dataSet.Table1;
  };

  // 取得 DS 清單
  const getDsListData = async () => {
    usaDsParams.paramsInital();
    usaDsParams.ROWS = filterData.value.row;
    usaDsParams.B_DATE = filterData.value.bDate;
    usaDsParams.E_DATE = filterData.value.dDate;
    usaDsParams.ITEM = filterData.value.keyWord;
    usaDsParams.STATUS = filterData.value.status;
    const res = await apiUsaDs(usaDsParams);
    dsList.value = res.data;
  };

  // 刪除 DS 單
  const deleteDsItem = async (id) => {
    usaDsMethodParams.paramsInital();
    usaDsMethodParams.ID = id;
    usaDsMethodParams.ACT_TYPE = 18;
    const res = await apiMethodDs(usaDsMethodParams);
    return res.data;
  };

  return {
    tabList,
    dsList,
    filterData,
    currentDsId,
    openIndexDrawer,
    selectIDs,
    checkUpResult,
    getInitialRow,
    getInitialTabList,
    getDsListData,
    deleteDsItem
  };
};
