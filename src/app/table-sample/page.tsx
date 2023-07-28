"use client"

import * as React from 'react'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

import axios from '@/lib/axios';

// api로 조회할 데이터 구조
interface Data {
  userId: string;
  name: string;
  email: string;
}


// 테이블 header 영역 구조
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
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
  }
];

// 데이터 loading 시 skeleton 표시
const TableRowsLoader: React.FC<{ rowsNum: number }> = ({ rowsNum }) => {
  return [...Array<number>(rowsNum)].map((row, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
    </TableRow>
  ));
};

// api 호출 후 MUI table로 데이터 표시
const TableSample = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setData] = React.useState<Array<Data>>([]);

  React.useEffect(() => {
    // TODO 검색영역 만들고 검색어 payload처리 및 화면 페이징 로직 수정
    axios.post<GlobalTypes.ApiPagingResponse<Data>>("/playground/public/sample/users", { userId: 'test' })
      .then(({ data: { data: { content } } }) => {
        setData(content);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // TODO 페이징 처리 시 각 페이지에 표시 할 데이터만 조회하도록 변경 (현재 전체 data조회 후 화면에서 표시 할 데이터만 잘라쓰고있음)
  // 화면에 표출 할 row 계산
  const visibleRows = React.useMemo(
    () => 
    rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    ),
    [rows, page, rowsPerPage],
  );

  // Table row 클릭 시 이벤트
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    console.log('>>> handleClidk', name)
  };

  // TablePagination의 page 변경 시 이벤트
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // TablePagination의 rowPerPage 변경 시 이벤트
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 조회 결과 수가 rowsPerPage보다 작을 때(ex) 마지막 페이지) ui 일관성 유지를 위해 비어있는 row 추가
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 }
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
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <TableHead>
              <TableRow>
                {
                  headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align='center'
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>
              <TableBody>
                {
                  // 로딩중인 경우 skelton표시, 데이터 조회 되면 row 표시
                  isLoading ? (<TableRowsLoader rowsNum={rowsPerPage} />) : (visibleRows.map((row, index) => {
                    const labelId = `table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        tabIndex={-1}
                        key={row.userId+'_'+row.email}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          {row.userId}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                      </TableRow>
                    );
                  }))
                }

                {
                  emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 33 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={3} />
                    </TableRow>
                  )
                }
              </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default TableSample