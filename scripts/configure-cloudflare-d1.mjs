// Configure a standalone Cloudflare deployment after each build.
import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const [databaseId,databaseName='dashboard-gerencial']=process.argv.slice(2);
if(!databaseId||!/^[0-9a-f-]{36}$/i.test(databaseId)){console.error('Usage: node scripts/configure-cloudflare-d1.mjs DATABASE_ID [DATABASE_NAME]');process.exit(1)}
const path=resolve('dist/server/wrangler.json');const config=JSON.parse(readFileSync(path,'utf8'));
config.d1_databases=[{binding:'DB',database_name:databaseName,database_id:databaseId,migrations_dir:'../../drizzle'}];
writeFileSync(path,JSON.stringify(config,null,2)+'\n');console.log('D1 binding configured in compiled Worker. Apply remote migrations before deploying.');
