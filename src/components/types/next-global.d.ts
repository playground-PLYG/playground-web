namespace GlobalTypes {
  /**
   * Api 호출 후 BaseResponse 구조
   * 
   * @typedef ApiResponse<Type>
   * 
   * @prop {string} result "SUCCESS"|"FAIL"
   * @prop {string} errorMessage 에러 발생 시 에러 메시지 (optional)
   * @prop {Type} data api 결과 데이터
   */
  export interface ApiResponse<Type> {
    result: string,
    errorMessage? : string,
    data: Type
  }

  /**
  * Api 호출 후 페이징 처리된 BaseResponse 구조
  * 
  * @typedef ApiResponse<Type>
  * 
  * @prop {string} result "SUCCESS"|"FAIL"
  * @prop {string} errorMessage 에러 발생 시 에러 메시지 (optional)
  * @prop {PageListInfo} data 페이징 처리 된 api 결과 데이터
  */
  export interface ApiPagingResponse<Type> {
    result: string,
    data: PageListInfo<Type>
  }

  /**
  * 페이징 처리 결과 구조
  * 
  * @typedef ApiResponse<Type>
  * 
  * @prop {Array<Type>} content 페이징 처리 된 데이터 목록
  * 
  * @prop {object} pageable 
  * @prop {object} pageable.sort 
  * @prop {boolean} pageable.sort.empty 
  * @prop {boolean} pageable.sort.unsorted 
  * @prop {boolean} pageable.sort.sorted 
  * @prop {number} pageable.offset 
  * @prop {number} pageable.pageNumber 
  * @prop {number} pageable.pageSize 
  * @prop {boolean} pageable.unpaged 
  * @prop {boolean} pageable.paged 
  * 
  * @prop {number} totalElements 
  * @prop {boolean} last 
  * @prop {number} totalPages 
  * @prop {number} size 
  * @prop {number} number 
  * @prop {object} sort 
  * @prop {boolean} empty 
  * @prop {boolean} unsorted 
  * @prop {boolean} sorted 
  * 
  * @prop {number} numberOfElements 
  * @prop {boolean} first 
  * @prop {boolean} empty 
  */
  export interface PageListInfo<Type> {
    content: Array<Type>;
    pageable: {
      sort: {
        empty: boolean,
        unsorted: boolean,
        sorted: boolean
      },
      offset: number,
      pageNumber: number,
      pageSize: number,
      unpaged: boolean,
      paged: boolean
    },
    totalElements: number,
    last: boolean,
    totalPages: number,
    size: number,
    number: number,
    sort: {
      empty: boolean,
      unsorted: boolean,
      sorted: boolean
    },
    numberOfElements: number,
    first: boolean,
    empty: boolean
  }
}

