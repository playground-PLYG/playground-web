const commUtils = {
  /**
   * 쿼리 스트링 문자열을 반환한다.
   * 
   * @param {Record<string, string>} obj
   * 
   * @returns {string} 쿼리 스트링 문자열
   */
  getQueryString: (obj: Record<string, string>): string => {
    return '?' + new URLSearchParams(obj).toString()
  },
  /**
   * 페이징 처리를 위한 페이지 쿼리 스트링 문자열을 반환한다.
   * 
   * @param {number} page 페이지 번호
   * @param {number} size 페이지당 row 수
   * 
   * @returns {string} 쿼리 스트링 문자열
   */
  getPageQueryString: (page: number, size: number): string => {
    const pageObj: GlobalTypes.RequestPage = {
      page: page.toString(),
      size: size.toString(),
    }

    return commUtils.getQueryString(pageObj)
  },
}

export default commUtils
