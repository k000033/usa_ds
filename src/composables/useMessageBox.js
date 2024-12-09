import { ElMessageBox, ElMessage } from 'element-plus';
import { h } from 'vue';
export const useMessageBox = (text) => {
  const confimMessageBox = (text1, text2, text3, confirmText, cancelText) => {
    return ElMessageBox.confirm(
      h('p', null, [
        h('span', null, text1),
        h('span', { style: 'color: red' }, text2),
        h('span', null, text3)
      ]),
      '請確認',
      {
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        distinguishCancelAndClose: true,
        confirmButtonClass: 'el-button--primary',
        type: 'warning',
        autofocus: false
      }
    );
  };

  const alertMessageBox = (text1, text2, text3, confirmText) => {
    return ElMessageBox.alert(
      h('p', null, [
        h('span', null, text1),
        h('span', { style: 'color: red' }, text2),
        h('span', null, text3)
      ]),
      '請確認',
      {
        confirmButtonText: confirmText,
        confirmButtonClass: 'el-button--primary',
        type: 'warning',
        autofocus: false
      }
    );
  };

  const showMessage = (msg, type) => {
    return ElMessage({
      message: msg,
      grouping: true,
      type: type
    });
  };

  return { confimMessageBox, alertMessageBox, showMessage };
};
