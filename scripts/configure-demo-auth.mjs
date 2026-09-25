import {createHash,randomBytes} from 'node:crypto';
import {writeFileSync,existsSync} from 'node:fs';
import readline from 'node:readline/promises';
import {stdin,stdout} from 'node:process';
if(!stdin.isTTY)throw new Error('Execute em um terminal interativo para informar a senha com segurança.');
if(existsSync('.env.local')||existsSync('.dev.vars'))throw new Error('Já existe configuração local. Faça um backup e remova .env.local e .dev.vars antes de gerar uma nova.');
const rl=readline.createInterface({input:stdin,output:stdout});
const username=(await rl.question('Usuário [diretoria.teste]: ')).trim()||'diretoria.teste';rl.close();
function password(prompt){return new Promise(resolve=>{let value='';stdout.write(prompt);stdin.setRawMode(true);stdin.resume();stdin.setEncoding('utf8');const handler=chunk=>{for(const c of chunk){if(c==='\u0003'){stdin.setRawMode(false);process.exit(1)}if(c==='\r'||c==='\n'){stdin.off('data',handler);stdin.setRawMode(false);stdin.pause();stdout.write('\n');resolve(value);return;}if(c==='\u007f'||c==='\b'){if(value.length){value=value.slice(0,-1);stdout.write('\b \b')}continue;}if(c>=' '){value+=c;stdout.write('*')}}};stdin.on('data',handler)})}
const secret=await password('Senha (mínimo 8 caracteres): ');if(secret.length<8)throw new Error('Use uma senha com pelo menos 8 caracteres.');const confirm=await password('Confirme a senha: ');if(secret!==confirm)throw new Error('As senhas não conferem.');
const salt=randomBytes(24).toString('hex');const values={DEMO_USERNAME:username,DEMO_SALT:salt,DEMO_PASSWORD_HASH:createHash('sha256').update(salt+secret).digest('hex'),SESSION_SECRET:randomBytes(48).toString('hex')};
const content=Object.entries(values).map(([k,v])=>k+'='+JSON.stringify(v)).join('\n')+'\n';for(const name of ['.env.local','.dev.vars'])writeFileSync(name,content,{mode:0o600});console.log('Configuração criada. A senha em texto não foi gravada. Não compartilhe os arquivos de ambiente.');
