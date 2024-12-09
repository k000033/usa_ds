import axios from 'axios';
const defAxios = axios.create({
  baseURL: 'http://localhost/work/carryProject.ashx' //測試
  //baseURL: `${location.origin}/dcs/carryProject.ashx` //正式
});


export const usaDsAxios = (params) => {
  console.log('-- _NAME === ' + 'usa.DS');
  console.log('-- _TYPE === ' + '');
  console.log('-- COM_ID === ' + params.COM_ID);
  console.log('-- LINE_ID === ' + params.LINE_ID);
  console.log('-- ID === ' + params.ID);
  console.log('-- LID === ' + params.LID);
  console.log('-- ITEM === ' + params.ITEM);
  console.log('-- B_DATE === ' + params.B_DATE);
  console.log('-- E_DATE === ' + params.E_DATE);
  console.log('-- ROWS === ' + params.ROWS);
  console.log('-- STATUS === ' + params.STATUS);
  console.log('-- MODE === ' + params.MODE);
  console.log('-- PAGE === ' + params.PAGE);
  console.log('-- USER_ID === ' + params.USER_ID);
  console.log('-- STEP === ' + params.STEP);
  return defAxios.get('', {
    params: {
      _NAME: 'usa.DS',
      _TYPE: '',
      COM_ID: params.COM_ID,
      LINE_ID: params.LINE_ID,
      ID: params.ID,
      LID: params.LID,
      ITEM: params.ITEM,
      B_DATE: params.B_DATE,
      E_DATE: params.E_DATE,
      ROWS: params.ROWS,
      STATUS: params.STATUS,
      MODE: params.MODE,
      PAGE: params.PAGE,
      USER_ID: params.USER_ID
    }
  });
};

export const usaDsMethodAxios = (params) => {
  console.log('-- _NAME === ' + 'usa.DS');
  console.log('-- _TYPE === ' + 'INSERT');
  console.log('-- COM_ID === ' + params.COM_ID);
  console.log('-- LINE_ID === ' + params.LINE_ID);
  console.log('-- ID === ' + params.ID);
  console.log('-- CODE === ' + params.CODE);
  console.log('-- TYPE === ' + params.TYPE);
  console.log('-- UPD_STR === ' + params.UPD_STR);
  console.log('-- IDS === ' + params.IDS);
  console.log('-- ID_INSERT === ' + params.ID_INSERT);
  console.log('-- ID_DELETE === ' + params.ID_DELETE);
  console.log('-- STATUS === ' + params.STATUS);
  console.log('-- ACT_TYPE === ' + params.ACT_TYPE);
  console.log('-- USER_ID === ' + params.USER_ID);
  return defAxios.get('', {
    params: {
      _NAME: 'usa.DS',
      _TYPE: 'INSERT',
      COM_ID: params.COM_ID,
      LINE_ID: params.LINE_ID,
      ID: params.ID,
      CODE: params.CODE,
      TYPE: params.TYPE,
      UPD_STR: params.UPD_STR.trim(),
      IDS: params.IDS,
      ID_INSERT: params.ID_INSERT,
      ID_DELETE: params.ID_DELETE,
      STATUS: params.STATUS,
      ACT_TYPE: params.ACT_TYPE,
      USER_ID: params.USER_ID
    }
  });
};
export const usaGetDsAxios = (params) => {
  console.log('-- _NAME === ' + 'usa.DS');
  console.log('-- _TYPE === ' + 'UPDATE');
  console.log('-- COM_ID === ' + params.COM_ID);
  console.log('-- LINE_ID === ' + params.LINE_ID);
  console.log('-- ID === ' + params.ID);
  console.log('-- ITEM_ID === ' + params.ITEM_ID);
  console.log('-- GET_WHAT === ' + params.GET_WHAT);
  console.log('-- PARAMETER === ' + params.PARAMETER);
  console.log('-- USER_ID === ' + params.USER_ID);
  return defAxios.get('', {
    params: {
      _NAME: 'usa.DS',
      _TYPE: 'UPDATE',
      COM_ID: params.COM_ID,
      LINE_ID: params.LINE_ID,
      ID: params.ID,
      ITEM_ID: params.ITEM_ID,
      GET_WHAT: params.GET_WHAT,
      PARAMETER: params.PARAMETER,
      USER_ID: params.USER_ID
    }
  });
};
