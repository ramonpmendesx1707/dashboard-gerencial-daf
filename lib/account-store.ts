import {env} from 'cloudflare:workers';
export type Account={username:string;email:string;password_hash:string;salt:string;algorithm:string;session_version:number;updated_at:string};
function database(){if(!env.DB)throw new Error('Profile database unavailable');return env.DB;}
export function setting(name:string){return (env as unknown as Record<string,string>)[name]||process.env[name]||'';}
export async function getAccount():Promise<Account>{
 const username=setting('DEMO_USERNAME');if(!username||!setting('DEMO_PASSWORD_HASH')||!setting('SESSION_SECRET'))throw new Error('Account not configured');
 const db=database();let row=await db.prepare('SELECT * FROM account_profile WHERE username = ?').bind(username).first<Account>();
 if(!row){await db.prepare('INSERT OR IGNORE INTO account_profile (username,email,password_hash,salt,algorithm,session_version,updated_at) VALUES (?,?,?,?,?,0,?)').bind(username,'',setting('DEMO_PASSWORD_HASH'),setting('DEMO_SALT'),'sha256-legacy',new Date().toISOString()).run();row=await db.prepare('SELECT * FROM account_profile WHERE username = ?').bind(username).first<Account>();}
 if(!row)throw new Error('Account unavailable');return row;
}
export async function saveEmail(account:Account,email:string){await database().prepare('UPDATE account_profile SET email = ?, updated_at = ? WHERE username = ?').bind(email,new Date().toISOString(),account.username).run();}
export async function savePassword(account:Account,salt:string,passwordHash:string){const result=await database().prepare('UPDATE account_profile SET salt = ?, password_hash = ?, algorithm = ?, session_version = session_version + 1, updated_at = ? WHERE username = ? AND session_version = ?').bind(salt,passwordHash,'pbkdf2-sha256-100000',new Date().toISOString(),account.username,account.session_version).run();return result.meta.changes===1;}
