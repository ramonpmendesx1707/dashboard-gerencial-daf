import {COOKIE,createSession,checkCredentials,sessionCookie} from '@/lib/demo-auth';
export const dynamic='force-dynamic';
const attempts=new Map<string,{n:number;until:number}>();
export async function POST(req:Request){
 if(req.headers.get('origin')!==new URL(req.url).origin)return new Response('Forbidden',{status:403});
 const ip=req.headers.get('cf-connecting-ip')||'local';const now=Date.now();for(const[k,v]of attempts)if(v.until<now)attempts.delete(k);
 const state=attempts.get(ip)||{n:0,until:now+60000};if(state.n>=12)return new Response('Too many attempts',{status:429});state.n++;attempts.set(ip,state);
 let data;try{data=await req.json() as {username:string;password:string}}catch{return new Response('Invalid request',{status:400})}
 if(!data||typeof data.username!=='string'||typeof data.password!=='string'||data.password.length>256)return new Response('Unauthorized',{status:401});
 try{if(!await checkCredentials(data.username,data.password))return new Response('Unauthorized',{status:401});attempts.delete(ip);return new Response(null,{status:204,headers:{'Set-Cookie':sessionCookie(req,await createSession()),'Cache-Control':'no-store'}})}catch{return new Response('Access temporarily unavailable',{status:503,headers:{'Cache-Control':'no-store'}})}
}
export async function DELETE(req:Request){if(req.headers.get('origin')!==new URL(req.url).origin)return new Response('Forbidden',{status:403});return new Response(null,{status:204,headers:{'Set-Cookie':`${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,'Cache-Control':'no-store'}})}
