import { Typography } from '@mui/material'
import { useUser } from '../context/AuthContext'


export default function Home() {

  const { user } = useUser();

  return (
    < Typography variant="h1" > "Hello World!"</Typography >
  )
}

