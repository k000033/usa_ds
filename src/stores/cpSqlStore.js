import { defineStore } from 'pinia';
import {
  apiUsaDsAxios,
  apiUsaGetDsAxios,
  apiUsaDsMethodAxios
} from '../api/index';

export const cpSqlStore = defineStore('cpsql', () => {
  const { showMessage } = useMessageBox();
  const apiUsaDs = async (params) => {
    try {
      console.log('------------------------------------------------');
      console.log('-- store ::: cpSqlStore');
      console.log('-- apiUsaDs() start ::: ' + useGetNowDate());
      const res = await apiUsaDsAxios(params);
      console.log('-- Table length ::: ' + res.data.data.length);
      console.log('-- data error ::: ' + res.data.msg);
      console.log('-- apiUsaDs() end ::: ' + useGetNowDate());
      console.log('------------------------------------------------');
      return res;
    } catch (error) {
      console.log(error);
      showMessage(error, 'error');
    }
  };

  const apiGetDs = async (params) => {
    try {
      console.log('------------------------------------------------');
      console.log('-- store ::: cpSqlStore');
      console.log('-- apiGetDs() start ::: ' + useGetNowDate());
      const res = await apiUsaGetDsAxios(params);
      console.log('-- Table length ::: ' + res.data.data.length);
      console.log('-- data error ::: ' + res.data.msg);
      console.log('-- apiGetDs() end ::: ' + useGetNowDate());
      console.log('------------------------------------------------');
      return res;
    } catch (error) {
      showMessage(error, 'error');
    }
  };

  const apiMethodDs = async (params) => {
    try {
      console.log('------------------------------------------------');
      console.log('-- store ::: cpSqlStore');
      console.log('-- apiMethodDs() start ::: ' + useGetNowDate());
      const res = await apiUsaDsMethodAxios(params);
      console.log('-- Table length ::: ' + res.data.data.length);
      console.log('-- data error ::: ' + res.data.msg);
      console.log('-- apiMethodDs() end ::: ' + useGetNowDate());
      console.log('------------------------------------------------');
      return res;
    } catch (error) {
      showMessage(error, 'error');
    }
  };

  return { apiUsaDs, apiGetDs, apiMethodDs };
});
