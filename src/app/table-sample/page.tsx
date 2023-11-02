'use client'

import * as React from 'react'
import {
  Box,
  Paper,
  Divider,
  Toolbar,
  Typography,
  Skeleton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
  InputLabel,
  Button,
} from '@mui/material'

import axios from '@/lib/axios'
import commUtils from '@/utils/common'

// api로 조회할 검색 조건 데이터 구조
interface Search {
  userId: string
  name: string
  email: string
}

// api로 조회할 데이터 구조
interface Data {
  userId: string
  name: string
  email: string
}

// 테이블 header 영역 구조
interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

// 테이블 header 영역 데이터
const headCells: readonly HeadCell[] = [
  {
    id: 'userId',
    numeric: false,
    disablePadding: false,
    label: '사용자ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: '사용자명',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: '이메일',
  },
]

// 데이터 loading 시 skeleton 표시
const TableRowsLoader: React.FC<{ rowsNum: number }> = ({ rowsNum }) => {
  return [...Array<number>(rowsNum)].map((row, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
    </TableRow>
  ))
}

// api 호출 후 MUI table로 데이터 표시
const TableSample = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [page, setPage] = React.useState(0)
  const [totalCount, setTotalCount] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rows, setData] = React.useState<Array<Data>>([])
  const [search, setSearch] = React.useState<Search>({
    userId: '',
    name: '',
    email: '',
  })

  const { userId, name, email } = search

  // 검색조건 input 변경사항 search에 반영 이벤트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target // 우선 e.target 에서 name 과 value 를 추출

    setSearch({
      ...search,
      [name]: value,
    })
  }

  // 검색조건 초기화 이벤트
  const onReset = () => {
    setSearch({
      userId: '',
      name: '',
      email: '',
    })
  }

  // 검색버튼 클릭 이벤트
  const onSearch = () => {
    getUesrList(page, rowsPerPage)
  }

  // 데이터 조회 함수
  const getUesrList = (pageNumber: number, pageSize: number) => {
    setIsLoading(true)

    axios
      .post<GlobalTypes.ApiPagingResponse<Data>>(
        '/playground/public/sample/users' +
          commUtils.getPageQueryString(pageNumber, pageSize),
        search,
      )
      .then(
        ({
          data: {  
            data: { content, totalElements, empty },
          },
        }) => {
          // 검색 결과가 있는대 현재 페이지가 조회된 목록의 totlaPage를 넘어갈 때 1페이지로 보냄
          // ex) 10페이지에서 검색조건으로 검색 후 검색 결과가 총 10페이지 미만인 경우
          if (totalElements > 0 && empty) {
            setPage(0)
            getUesrList(0, pageSize)
          } else {
            setData(content)
            setTotalCount(totalElements)
            setIsLoading(false)
          }
        },
      )
      .catch((error) => {
        console.log(error)
      })
  }

  React.useEffect(() => {
    getUesrList(page, rowsPerPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Table row 클릭 시 이벤트
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    console.log('>>> handleClick', name)
  }

  // TablePagination의 page 변경 시 이벤트
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    getUesrList(newPage, rowsPerPage)
  }

  // TablePagination의 rowPerPage 변경 시 이벤트
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    getUesrList(page, rowsPerPage)
  }

  // 조회 결과 수가 rowsPerPage보다 작을 때(ex) 마지막 페이지) ui 일관성 유지를 위해 비어있는 row 영역 추가
  const emptyRows = page > 0 ? Math.max(0, rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            사용자 목록
          </Typography>
        </Toolbar>

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableBody>
              <TableRow tabIndex={-1}>
                <TableCell component="th">
                  <InputLabel htmlFor="search-user-id">사용자ID</InputLabel>
                </TableCell>
                <TableCell align="left">
                  <TextField
                    id="search-user-id"
                    label="사용자ID"
                    name="userId"
                    value={userId}
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </TableCell>

                <TableCell component="th">
                  <InputLabel htmlFor="search-name">사용자명</InputLabel>
                </TableCell>
                <TableCell align="left">
                  <TextField
                    id="search-name"
                    label="사용자명"
                    name="name"
                    value={name}
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </TableCell>

                <TableCell component="th">
                  <InputLabel htmlFor="search-email">이메일</InputLabel>
                </TableCell>
                <TableCell align="left">
                  <TextField
                    id="search-email"
                    label="이메일"
                    name="email"
                    value={email}
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            '& > *': {
              m: 1,
            },
            marginTop: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              marginRight: 1,
            }}
          >
            <Button
              size="medium"
              color="secondary"
              variant="contained"
              onClick={onReset}
            >
              초기화
            </Button>
            <Button
              size="medium"
              color="primary"
              variant="contained"
              sx={{ marginLeft: 1 }}
              onClick={onSearch}
            >
              조회
            </Button>
          </Box>
        </Box>

        <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align="center"
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                // 로딩중인 경우 skelton표시, 데이터 조회 되면 row 표시
                isLoading ? (
                  <TableRowsLoader rowsNum={rowsPerPage} />
                ) : (
                  rows.map((row, index) => {
                    const labelId = `table-${index}`

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        tabIndex={-1}
                        key={row.userId + '_' + row.email}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell id={labelId}>{row.userId}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                      </TableRow>
                    )
                  })
                )
              }

              {!isLoading && emptyRows > 0 ? (
                <TableRow
                  style={{
                    height: 52.8 * emptyRows,
                  }}
                >
                  <TableCell colSpan={3} />
                </TableRow>
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          showFirstButton={true}
          showLastButton={true}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default TableSample
