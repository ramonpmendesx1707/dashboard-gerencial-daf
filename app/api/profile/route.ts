import {getAccount,saveEmail,savePassword} from '@/lib/account-store';
import {validSession,tokenFrom,verifyPassword,passwordHash,createSession,sessionCookie} from '@/lib/demo-auth';
import {passwordError} from '@/lib/password-policy';
export const dynamic='force-dynamic';
const attempts=new Map<string,{count:number;until:number}>();
const reply=(body:object,status=200,headers:Record<string,string>={})=>Response.json(body,{status,headers:{'Cache-Control':'no-store',...headers}});
export async function GET(req:Request){try{if(!await validSession(tokenFrom(req)))return reply({error:'Sua sessão expirou. Entre novamente.'},401);const a=await getAccount();return reply({username:a.username,email:a.email});}catch{return reply({error:'Não foi possível carregar seu perfil. Tente novamente.'},503);}}
export async function PATCH(req:Request){
 if(req.headers.get('origin')!==new URL(req.url).origin)return reply({error:'Solicitação inválida.'},403);
 try{
 if(!await validSession(tokenFrom(req)))return reply({error:'Sua sessão expirou. Entre novamente.'},401);
 const data=await req.json() as Record<string,unknown>;if(!data||typeof data!=='object')return reply({error:'Solicitação inválida.'},400);const account=await getAccount();
 if(data.action==='email'){
  if(typeof data.email!=='string'||data.email.length>254||data.email.trim()&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))return reply({error:'Informe um e-mail válido.'},400);
  await saveEmail(account,data.email.trim());return reply({message:'E-mail salvo. A recuperação por e-mail ainda não está disponível.'});
 }
 if(data.action!=='password')return reply({error:'Solicitação inválida.'},400);
 const key=account.username;const now=Date.now();const state=attempts.get(key);if(state&&state.until>now&&state.count>=5)return reply({error:'Muitas tentativas. Aguarde cinco minutos.'},429);
 if(typeof data.currentPassword!=='string'||data.currentPassword.length>256||typeof data.newPassword!=='string'||typeof data.confirmPassword!=='string')return reply({error:'Preencha os três campos de senha.'},400);
 const error=passwordError(data.newPassword);if(error)return reply({error},400);
 if(data.newPassword!==data.confirmPassword)return reply({error:'A confirmação não coincide com a nova senha.'},400);
 if(data.currentPassword===data.newPassword)return reply({error:'Escolha uma senha diferente da atual.'},400);
 attempts.set(key,{count:state&&state.until>now?state.count+1:1,until:state&&state.until>now?state.until:now+300000});
 if(!await verifyPassword(account,data.currentPassword))return reply({error:'A senha atual não confere.'},400);
 const salt=crypto.randomUUID()+crypto.randomUUID();const hashed=await passwordHash(data.newPassword,salt);
 if(!await savePassword(account,salt,hashed))return reply({error:'O perfil mudou em outra sessão. Reabra esta tela e tente novamente.'},409);
 attempts.delete(key);return reply({message:'Senha alterada. As outras sessões foram encerradas.'},200,{'Set-Cookie':sessionCookie(req,await createSession(account.session_version+1))});
 }catch{return reply({error:'Não foi possível salvar. Seus dados foram mantidos no formulário; tente novamente.'},503);}
}
