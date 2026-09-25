// Short, sourced passages. English originals use our own Portuguese translation.
export type ManagementQuote={text:string;author:string;detail:string;source:string};
const ford='https://www.gutenberg.org/ebooks/7213',taylor='https://www.gutenberg.org/ebooks/6435',falconi='https://veja.abril.com.br/economia/as-licoes-de-gestao-do-consultor-vicente-falconi/';
const f=(text:string):ManagementQuote=>({text,author:'Henry Ford',detail:'Fundador da Ford Motor Company · tradução livre',source:ford});
const t=(text:string):ManagementQuote=>({text,author:'Frederick W. Taylor',detail:'Pioneiro da administração científica · tradução livre',source:taylor});
export const quotes:ManagementQuote[]=[
{text:'Problema é a diferença entre a situação atual e a meta.',author:'Vicente Falconi',detail:'Consultor brasileiro e fundador da Falconi',source:falconi},
f('Sem lucro, os negócios não podem se expandir.'),
t('O mecanismo da administração não deve ser confundido com sua essência ou filosofia fundamental.'),
{text:'Um sistema ruim vencerá uma boa pessoa todas as vezes.',author:'W. Edwards Deming',detail:'Referência mundial em gestão da qualidade · tradução livre',source:'https://deming.org/reconsidering-the-impact-of-systems/'},
f('O dinheiro vem naturalmente como resultado do serviço.'),
t('No passado, o homem esteve em primeiro lugar; no futuro, o sistema deve vir primeiro.'),
{text:'Nós acreditamos nas organizações e no seu poder de transformação do mundo.',author:'Viviane Martins',detail:'Executiva brasileira que presidiu a Falconi',source:'https://falconi.com/wp-content/uploads/2022/08/Relatorio_de_Posicionamento_ESG.pdf'},
f('A verdadeira simplicidade oferece o melhor serviço e é a mais conveniente de usar.'),
t('A máxima prosperidade só pode existir como resultado da máxima produtividade.'),
{text:'Não há nada tão inútil quanto fazer com eficiência aquilo que nem deveria ser feito.',author:'Peter Drucker',detail:'Um dos principais pensadores da administração moderna · tradução livre',source:'https://hbr.org/1963/05/managing-for-business-effectiveness'},
f('A essência da minha ideia é que o desperdício e a ganância impedem a prestação de um verdadeiro serviço.'),
t('Há uma divisão quase igual do trabalho e da responsabilidade entre a administração e os trabalhadores.'),
{text:'Sem medição, não há gestão.',author:'Vicente Falconi',detail:'Consultor brasileiro e fundador da Falconi',source:falconi},
f('O desperdício se deve, em grande parte, a não compreender o que se faz ou a fazê-lo sem cuidado.'),
t('A administração científica consiste, em grande parte, em preparar e executar essas tarefas.'),
f('A falta de necessidade de se empenhar é ruim para os negócios.'),
t('O problema diante da administração é obter a melhor iniciativa de cada trabalhador.'),
f('Apressar-se a fabricar sem ter certeza do produto é a causa não reconhecida de muitos fracassos empresariais.'),
t('Nenhum sistema de administração pode assegurar prosperidade contínua a trabalhadores ou empregadores.'),
f('É o esforço desperdiçado que torna os preços agrícolas altos e os lucros baixos.'),
t('O desenvolvimento de cada pessoa até sua maior eficiência e prosperidade.'),
f('Não se busca nos negócios um brilho sensacional, mas uma confiabilidade sólida e substancial.'),
t('O sistema de remuneração adotado é apenas um dos elementos subordinados.'),
f('Um fabricante que não soubesse produzir nem comercializar não permaneceria muito tempo nos negócios.'),
t('A administração científica não envolve necessariamente uma grande invenção ou a descoberta de fatos surpreendentes.'),
];
