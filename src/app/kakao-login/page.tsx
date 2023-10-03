'use client'
import * as React from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'


export default function KakaoLogin() {
  const router = useRouter()
  const CLIENT_ID = '7e7b63658cacaa73e2a412dcd713bb8a'
  const REDIRECT_URI = new URL(document.location.origin ) +'/kakaoRedirect'
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&prompt=login`
  


  console.log('grantType ::', CLIENT_ID)
  console.log('REST_API_KEY ::', kakaoURL)
  router.push(kakaoURL)
  
  
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
