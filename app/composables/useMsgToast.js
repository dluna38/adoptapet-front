export const useMsgToast = () =>
    useState('toastMsg', () => null);

export const setMsgToast = (severity,title,message)=>{
    let msg = useMsgToast()
    msg.value = { severity:  severity || 'success', summary: title,detail:  message || '', group: 'msgToast', life: 5000 }  
}

export const getMsgToast = ()=>{
    let msg = useMsgToast()
    let msgReturn = msg.value
    msg.value = null
    return msgReturn
}

export const Severities = Object.freeze({
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warn',
    INFO: 'info',
    SECONDARY: 'secondary',
    CONTRAST:'contrast'
  });

//toast.add({ severity:  props.severity || 'success', summary: props.title,detail:  props.message || '', group: 'my', life: 5000 });