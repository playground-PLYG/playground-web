const commUtils = {
  getQueryString: (obj: Record<string, string>) => {
    return "?" + new URLSearchParams(obj).toString()
  },
  getPageQueryString: (page: number, size: number): string => {
    const pageObj: GlobalTypes.RequestPage = {
      page: page.toString(),
      size: size.toString()
    }
  
    return commUtils.getQueryString(pageObj)
  }
};

export default commUtils
