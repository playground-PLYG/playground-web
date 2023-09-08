'use client'
import * as React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import axios from "axios"

export default function KakaoLogin() {
  const [userInfo, setUserInfo] = React.useState({
    nickname: ""
  })
  React.useEffect(() => {
        
      const params= new URL(document.location.toString()).searchParams
      const code = params.get('code')

      const param: any = {
          grant_type: 'authorization_code',
          client_id: '7e7b63658cacaa73e2a412dcd713bb8a',
          redirect_uri: 'http://localhost:3000/kakaoRedirect',
          code: code,
      }
      const data ={
        grant_type: 'authorization_code',
        client_id: '7e7b63658cacaa73e2a412dcd713bb8a',
        redirect_uri: 'http://localhost:3000/kakaoRedirect',
        code: code,
      }
      // console.log('param ::', param)
      const config = {
        headers: {
            'Authorization': 'Bearer ',
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }
      
      axios.post('https://kauth.kakao.com/oauth/token', data, config) 
      .then((response : any) => {
        console.log(response.data)
        config.headers.Authorization += response.data.access_token
        console.log('config :: ',config)

        axios.post('https://kapi.kakao.com/v2/user/me', {}, config)
          .then((res) => {
            console.log('개인 정보 확인 ', res.data.properties.nickname)
            const nickname = res.data.properties.nickname
            setUserInfo({nickname})
            window.alert('로그인 햇습니다')
            // console.log('userinfo ::', userInfo)
          })
          .catch(error => {
            console.error(error)   
            window.alert('로그인을 실패했습니다.')
          })
      })
      console.log()
        
    }, [])
  
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
          로그인 되었습니다. {userInfo.nickname} 님
        </Typography>
      </Box>
    </Container>
  )
}
