# Mindly – Take Care of You | Frontend

Questo è il frontend del progetto **Mindly**, una piattaforma fullstack ispirata a servizi come [unoBravo](https://www.unobravo.com/) e [Serenis](https://www.serenis.it/), pensata per mettere in contatto utenti e psicologi.

**Link repository frontend**: [https://github.com/chiarasanasi/FE](https://github.com/chiarasanasi/FE)  
**Link repository backend**: [https://github.com/chiarasanasi/BE](https://github.com/chiarasanasi/BE)

## Presentazione del progetto

Mindly permette agli utenti di registrarsi, compilare un questionario e ricevere uno psicologo compatibile. Dopo il login, gli utenti possono:

- inviare richieste di colloquio;
- gestire il proprio diario personale (note aggiungibili, modificabili e cancellabili);
- visualizzare gli appuntamenti confermati e lo storico.

Gli psicologi, invece, hanno accesso a un’area riservata in cui possono:

- consultare il proprio calendario;
- accettare o rifiutare richieste;
- visualizzare i profili dei clienti assegnati e le loro risposte al questionario;
- aggiungere note per ogni cliente, come osservazioni sul percorso terapeutico.

### Tecnologie utilizzate - Frontend

- React
- TypeScript
- React Router DOM
- Redux Toolkit
- Fetch API
- Bootstrap
- Vite
- AuthContext per la gestione del token JWT e la modale globale

## Deploy

- Vercel
- GitHub per il versionamento del codice
- Collegamento al backend hostato su Koyeb

## Funzionalità in sviluppo

Queste funzionalità non sono ancora implementate, ma sono state previste per versioni future:

- **Pagamento alla richiesta di appuntamento**: integrazione con un sistema di pagamento (Stripe) per confermare la prenotazione solo dopo il versamento di una quota.
- **Chat in tempo reale** tra utente e psicologo, per permettere comunicazioni rapide e dirette, basata su WebSocket.

---

## Autrice

**Chiara Sanasi**  
chiarasanasi.work@gmail.com  
[LinkedIn](https://www.linkedin.com/in/chiarasanasi/)
