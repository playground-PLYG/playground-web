'use client'
import * as React from 'react'
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
export default function KakaoLogout() {
  const router = useRouter()
 
    const CLIENT_ID = '7e7b63658cacaa73e2a412dcd713bb8a';
    const LOGOUT_REDIRECT_URI = new URL(document.location.origin) + '/kakaoLogout';
    const kakaoURL = `https://kauth.kakao.com/oauth/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
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
  );
}
