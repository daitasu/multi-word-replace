import { QVueGlobals } from 'quasar';

export const notifySuccess = ($q: QVueGlobals,value: string): void => {
  $q.notify({
      type: 'positive',
      message: `${value}しました`,
      icon: 'done',
      timeout: 1000
  })
};

export const notifyError = ($q: QVueGlobals): void => {
  $q.notify({
    type: 'negative',
    message: 'エラーが発生しました',
    icon: 'warning',
    timeout: 1000
  })
};