import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Ateliê | Angela Scarpati Fotografia',description:'Um espaço para cuidar de cada história. Gestão Angela Scarpati Fotografia.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
