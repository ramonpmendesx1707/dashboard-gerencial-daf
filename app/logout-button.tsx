'use client';
import {useState} from 'react';import {LogOut} from 'lucide-react';import {Button} from '@/components/ui/button';import {toast} from 'sonner';
export default function LogoutButton(){const [busy,setBusy]=useState(false);return <Button variant="ghost" disabled={busy} onClick={async()=>{setBusy(true);try{const r=await fetch('/api/session',{method:'DELETE'});if(!r.ok)throw Error();window.location.assign('/')}catch{setBusy(false);toast.error('Não foi possível sair. Tente novamente.')}}}><LogOut size={15}/>{busy?'Saindo…':'Fazer logoff'}</Button>}
