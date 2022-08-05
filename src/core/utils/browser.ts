export const isMac =
  typeof navigator != "undefined"
    ? /Mac|iP(hone|[oa]d)/.test(navigator.platform)
    : // @ts-ignore
    typeof os != "undefined" && os.platform
    ? // @ts-ignore
      os.platform() == "darwin"
    : false;
