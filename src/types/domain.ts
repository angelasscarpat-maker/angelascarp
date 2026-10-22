export type LeadStage = 'novo' | 'proposta' | 'negociacao' | 'fechado' | 'perdido';
export type ProductionStage = 'contratacao' | 'agendado' | 'selecao' | 'edicao' | 'entregue';
export interface Client {id:string;owner_id:string;name:string;phone:string|null;instagram:string|null;email:string|null;notes:string|null;created_at:string}
export interface Project {id:string;client_id:string;service:string;stage:ProductionStage;delivery_date:string|null}
export interface Lead {id:string;client_id:string;stage:LeadStage;value:number}
export interface Transaction {id:string;client_id:string|null;kind:'income'|'expense';amount:number;due_date:string;paid_at:string|null;service:string;installment:number;installments:number}
