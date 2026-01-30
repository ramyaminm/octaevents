import localFont from 'next/font/local'
import { Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

// export const monument = localFont({
//   src: [
//     {
//       path: './fonts/MonumentExtended-Regular.otf',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: './fonts/MonumentExtended-UltraBold.otf',
//       weight: '800',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-monument',
//   display: 'swap',
// })
