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

---

### Modalità test: accedere come psicologo

Per scopi dimostrativi, è possibile testare anche l’esperienza lato **psicologo**, normalmente riservata solo ai profili professionali. Questo permette di simulare l’interazione completa tra cliente e terapeuta, inclusa la gestione delle richieste di appuntamento.

#### Procedura passo-passo

1. **Accedi come utente** dal form di login.
2. Vai nella sezione **"Calendario"** e invia una richiesta di appuntamento al tuo psicologo.
3. Apri la sezione **"Il mio Psicologo"** dal menu laterale.
4. **Copia nome, cognome ed email** dello psicologo assegnato.
5. Effettua il **logout**.
6. Accedi come psicologo, inserendo:

   - **Username:** `nome.cognome` (es. `luca.ferrari`)
   - **Email:** l’email ottenuta al punto 4 (es. `luca.ferrari@mindly.it`)
   - **Password:** `password`

   > La password `password` Funziona solo per gli psicologi pre-caricati nel database, con email che termina in `@mindly.it`.

7. Verrai reindirizzato alla **dashboard dello psicologo**.
8. Accedi alla sezione **"Calendario"** per visualizzare le richieste dei clienti e decidere se **accettarle o rifiutarle**.

> Questa modalità è utile per esplorare tutte le funzionalità dell’app, inclusa la gestione dei clienti dal punto di vista del professionista.
