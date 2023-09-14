'use client'
import * as React from 'react'

import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function KakaoLogout() {
    
    const ACCES_TOKEN =  localStorage.getItem('TOKEN')
    if (ACCES_TOKEN === null) {
        window.alert('로그인을 먼저 해주세요')
        window.location.replace('/') 
    } else {
        // 로그인 토큰이 없는 경우에 대한 처리
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${ACCES_TOKEN}`
            }
          }
    
          axios.post('https://kapi.kakao.com/v1/user/logout', {}, config)
            .then((res) => {
              console.log('res ::', res);
              localStorage.removeItem('TOKEN')
            })
            .catch((error) => {
              console.error('로그아웃 실패: ', error)
            })
      }
    

    

  // axios.post('https://kapi.kakao.com/v1/user/logout', config) 
  
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" gutterBottom>
          test
        </Typography>
      </Box>
    </Container>
  )
}
export default KakaoLogout