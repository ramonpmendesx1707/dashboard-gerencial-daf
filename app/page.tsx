import {cookies} from 'next/headers';
import {COOKIE,validSession} from '@/lib/demo-auth';
import Login from './login';
import Dashboard from './dashboard';
export const dynamic='force-dynamic';
export default async function Home(){const jar=await cookies();if(!await validSession(jar.get(COOKIE)?.value))return <Login/>;return <Dashboard/>}
