export interface Nota {
  id: number
  contenuto: string
  dataCreazione: string
}

export interface RichiestaAppuntamento {
  id: number
  data: string
  ora: string
  messaggio: string
  stato: "IN_ATTESA" | "ACCETTATA" | "RIFIUTATA"
  nomeCliente: string
  cognomeCliente: string
}

export interface Cliente {
  id: number
  nome: string
  cognome: string
  email: string
  risposteQuestionario?: string
}

export interface Psicologo {
  id: number
  nome: string
  cognome: string
  email: string
  descrizione?: string
}
