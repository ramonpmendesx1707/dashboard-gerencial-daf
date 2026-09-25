import {getAccount,setting,type Account} from './account-store';
export {setting} from './account-store';
const encoder=new TextEncoder();
export const COOKIE='mesa_session';
const hex=(bytes:ArrayBuffer)=>Array.from(new Uint8Array(bytes)).map(b=>b.toString(16).padStart(2,'0')).join('');
export async function hash(value:string){return hex(await crypto.subtle.digest('SHA-256',encoder.encode(value)));}
export async function passwordHash(password:string,salt:string){const key=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);return hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt:encoder.encode(salt),iterations:100000,hash:'SHA-256'},key,256));}
async function signature(value:string){const secret=setting('SESSION_SECRET');if(!secret)throw new Error('Session not configured');const key=await crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);return hex(await crypto.subtle.sign('HMAC',key,encoder.encode(value)));}
function equal(a:string,b:string){if(a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0;}
export async function createSession(version?:number){const v=version??(await getAccount()).session_version;const value=`${Date.now()+8*3600*1000}.${crypto.randomUUID()}.${v}`;return value+'.'+await signature(value);}
export async function validSession(token:string|undefined){if(!token)return false;try{const parts=token.split('.');if(parts.length!==3&&parts.length!==4)return false;const [expires,nonce]=parts;if(!expires||!nonce||!Number.isFinite(+expires)||+expires<Date.now())return false;const sig=parts.pop()!;if(!equal(sig,await signature(parts.join('.'))))return false;return (parts.length===3?Number(parts[2]):0)===(await getAccount()).session_version;}catch{return false}}
export async function verifyPassword(account:Account,password:string){return equal(account.algorithm==='pbkdf2-sha256-100000'?await passwordHash(password,account.salt):await hash(account.salt+password),account.password_hash);}
export async function checkCredentials(username:string,password:string){const account=await getAccount();return username===account.username&&await verifyPassword(account,password);}
export function sessionCookie(req:Request,token:string){return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${new URL(req.url).protocol==='https:'?'; Secure':''}`;}
export function tokenFrom(req:Request){return req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);}
