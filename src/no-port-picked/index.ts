import "./no-port-picked-dialog";

export const openNãoPortPickedDialog = async (
  doTryAgain?: () => void,
): Promise<boolean> => {
  const dialog = document.createElement("ewt-no-port-picked-dialog");
  dialog.doTryAgain = doTryAgain;
  document.body.append(dialog);
  return true;
};
