import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Dashboard Gerencial | Inteligência Comercial',description:'Painéis de mercado, carteira e atuação comercial. Inteligência comercial.',robots:{index:false,follow:false},manifest:'/manifest.webmanifest',appleWebApp:{capable:true,title:'Dashboard Gerencial',statusBarStyle:'default'},icons:{icon:[{url:'/brand-mark.svg',type:'image/svg+xml'},{url:'/icons/portal-192.png',sizes:'192x192',type:'image/png'}],apple:[{url:'/apple-touch-icon.png',sizes:'180x180',type:'image/png'}]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
