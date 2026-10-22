export const projects=[{name:'Mariana & Pedro',service:'Casamento',date:'24 out, 2026',stage:'Seleção',progress:40,initials:'MP'},{name:'À espera de Helena',service:'Ensaio gestante',date:'26 out, 2026',stage:'Edição',progress:65,initials:'AH'},{name:'Família Oliveira',service:'Ensaio família',date:'28 out, 2026',stage:'Entrega',progress:90,initials:'FO'}];
export const initialTasks=[{id:1,title:'Enviar proposta para Camila & Rafael',detail:'Casamento · Novo contato',done:false},{id:2,title:'Finalizar edição do ensaio da Helena',detail:'Produção · Entrega em 3 dias',done:false},{id:3,title:'Confirmar ensaio com a família Oliveira',detail:'Agenda · 28 de outubro',done:false}];
export const months=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
export const revenue=[8500,12000,10500,15600,13000,18000,14500,19500,16800,24500,0,0];
export const money=(n:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0}).format(n);
