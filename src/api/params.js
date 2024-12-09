const getHubUrl = new URL(window.location.href);
let username = new URL(
  `https://1.com?${new URL(window.location.href).href.split("?")[1]}`
).searchParams.get("username");


const getUrl_query = () => {
  let comId = new URL(
    `https://1.com?${new URL(window.location.href).href.split("?")[1]}`
  ).searchParams.get("comId");
  let lineId = new URL(
    `https://1.com?${new URL(window.location.href).href.split("?")[1]}`
  ).searchParams.get("lineId");
  let mode = new URL(
    `https://1.com?${new URL(window.location.href).href.split("?")[1]}`
  ).searchParams.get("mode");

  return { comId, lineId, mode };
};

export class usaDsParams {
  constructor() {
    this.COM_ID = "";
    this.LINE_ID = "";
    this.ID = "";
    this.LID = "";
    this.ITEM = "";
    this.B_DATE = "";
    this.E_DATE = "";
    this.ROWS = "";
    this.STATUS = "";
    this.STEP = "";
    this.MODE = "";
    this.PAGE = "";
    this.USER_ID = `${username}`;
  }
  paramsInital() {
    const { comId, lineId, mode } = getUrl_query();
    this.COM_ID = comId;
    this.LINE_ID = lineId;
    this.ID = "";
    this.ITEM = "";
    this.B_DATE = "";
    this.E_DATE = "";
    this.ROWS = "";
    this.STEP = "";
    this.MODE = mode;
    this.LID = "";
    this.PAGE = "";
    this.STATUS = "";
  }
}


export class usaDsMethodParams {
  constructor() {
    this.COM_ID = "";
    this.LINE_ID = "";
    this.ID = "";
    this.CODE ="";
    this.TYPE ="";
    this.UPD_STR = "";
    this.IDS="";
    this.ID_INSERT = "";
    this.ID_DELETE = "";
    this.STATUS = "";
    this.ACT_TYPE = "";
    this.USER_ID = `${username}`;
  }

  paramsInital() {
    const { comId, lineId } = getUrl_query();
    this.COM_ID = comId;
    this.LINE_ID = lineId;
    this.ID = "";
    this.CODE="";
    this.TYPE ="";
    this.UPD_STR = "";
    this.IDS="";
    this.ID_INSERT = "";
    this.ID_DELETE = "";
    this.STATUS = "";
    this.ACT_TYPE = "";
  }
}

export class usaGetDsParams{
  constructor(){
    this.COM_ID ='';
    this.LINE_ID  ='';
    this.ID  ='';
    this.ITEM_ID  ='';
    this.GET_WHAT  ='';
    this.PARAMETER  ='';
    this.USER_ID  =`${username}`;
  }
  paramsInital() {
    const { comId ,lineId} = getUrl_query();
    this.COM_ID = comId;
    this.LINE_ID  =lineId;
    this.ID  ='';
    this.ITEM_ID  ='';
    this.GET_WHAT  ='';
    this.PARAMETER  ='';
  }

}