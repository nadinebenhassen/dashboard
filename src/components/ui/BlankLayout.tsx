// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { ReactNode } from 'react'

// Déclaration du type des props du composant
interface BlankLayoutProps {
  children: ReactNode
}

// Composant stylisé pour le layout
const BlankLayoutWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',

  // Pour les pages du layout V1
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // Pour les pages du layout V2
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
