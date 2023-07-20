import { ListaDestinos } from '@/components/ListaDestinos'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return(
    <ListaDestinos/>   
    )
}
