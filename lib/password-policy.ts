export const passwordRules=[
 {label:'Pelo menos 12 caracteres',test:(v:string)=>v.length>=12},
 {label:'Uma letra maiúscula e uma minúscula',test:(v:string)=>/[A-Z]/.test(v)&&/[a-z]/.test(v)},
 {label:'Um número',test:(v:string)=>/\d/.test(v)},
 {label:'Um símbolo ou sinal de pontuação',test:(v:string)=>/[^a-zA-Z0-9\s]/.test(v)},
];
export function passwordError(value:string){if(value.length>128)return 'Use no máximo 128 caracteres.';if(passwordRules.some(r=>!r.test(value)))return 'A nova senha precisa atender a todos os critérios.';if(/^(password|senha|123456|qwerty)/i.test(value))return 'Evite senhas comuns ou sequências previsíveis.';return '';}
