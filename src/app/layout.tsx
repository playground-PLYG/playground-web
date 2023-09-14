

import * as React from 'react'
import { Suspense } from 'react'
import Loading from './loading'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeIcon from '@mui/icons-material/Home'
import StarIcon from '@mui/icons-material/Star'
import ChecklistIcon from '@mui/icons-material/Checklist'
import SettingsIcon from '@mui/icons-material/Settings'
import SupportIcon from '@mui/icons-material/Support'
import LogoutIcon from '@mui/icons-material/Logout'
import Login from '@mui/icons-material/Login'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'

import axios from '@/lib/axios'
import { Metadata, ResolvingMetadata } from 'next'
import { headers } from 'next/headers'

import { useRouter } from 'next/router'


declare const process : {
  env: {
    VERCEL_URL: string
  }
}

export async function generateMetadata(
  //{ params, searchParams }: Props,
  props: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const headersList = headers()
  const url = headersList.get('x-pathname')

  if (!url) {
    return {
      title: 'playground',
    }
  }

  const { data } = await axios.get<
    GlobalTypes.ApiResponse<GlobalTypes.Metadata>
  >('/playground/public/metadata?url=' + url)

  if (data?.data) {
    return {
      title: data.data.title,
      description: data.data.description,
      category: data.data.category,
      keywords: data.data.keywords,
      openGraph: {
        title: data.data.ogTitle,
        description: data.data.ogDescription,
        images: data.data.ogImages,
        url: data.data.ogUrl,
        siteName: data.data.ogSiteName,
      },
      metadataBase: new URL(process.env.VERCEL_URL.includes("http") ? process.env.VERCEL_URL : 'https://' + process.env.VERCEL_URL),
      icons: {
        icon: data.data.icon,
        apple: data.data.apple,
      },
    }
  } else {
    return {
      title: 'playground',
    }
  }
}

const DRAWER_WIDTH = 240

const LINKS = [
  { text: 'Home', href: '/', icon: HomeIcon },
  { text: 'Starred', href: '/starred', icon: StarIcon },
  { text: 'Tasks', href: '/tasks', icon: ChecklistIcon },
  { text: 'TableSample', href: '/table-sample', icon: ChecklistIcon },
]

const PLACEHOLDER_LINKS = [
  { text: 'Settings', icon: SettingsIcon },
  { text: 'Support', icon: SupportIcon },
  { text: 'Login',  href: '/kakao-login', icon: Login },
  { text: 'Logout', href: '/kakao-logout', icon: LogoutIcon }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  
}) {
  return (
    <html lang="ko">
      <body>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: 'background.paper' }}>
              <DashboardIcon
                sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }}
              />
              <Typography variant="h6" noWrap component="div" color="black">
                Playground
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: DRAWER_WIDTH,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: DRAWER_WIDTH,
                boxSizing: 'border-box',
                top: ['48px', '56px', '64px'],
                height: 'auto',
                bottom: 0,
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Divider />
            <List>
              {LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={href} disablePadding>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ mt: 'auto' }} />
            <List>
              {PLACEHOLDER_LINKS.map(({ text, href, icon: Icon }) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton component='a' href={href} >
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `${DRAWER_WIDTH}px`,
              mt: ['48px', '56px', '64px'],
              p: 3,
            }}
          >
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  )
}
