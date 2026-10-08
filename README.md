# Malta Bus Tour — Audioguida (MVP)

Sito statico (HTML/CSS/JS puro, nessun framework) pensato per essere aperto
via QR code dai turisti a bordo del bus. Landing page con mappa animata →
tasto "Avvia itinerario" → mappa live con GPS → audio automatico ad ogni
tappa.

## Come funziona

1. **Landing page** (`index.html`, vista `#view-landing`): presentazione,
   mappa SVG animata decorativa, anteprima delle tappe, tasto **Avvia
   itinerario**.
2. **Vista tour** (`#view-tour`): mappa reale (Leaflet + OpenStreetMap,
   nessuna API key richiesta) con:
   - il percorso disegnato tra le tappe;
   - un marker 🚌 che segue la posizione GPS del telefono;
   - quando il telefono entra nel raggio impostato per una tappa
     (`radius` in metri, in `js/stops.js`), parte automaticamente l'audio;
   - ogni tappa è comunque cliccabile/riascoltabile manualmente (utile
     come fallback se il GPS non è preciso, o per chi vuole riascoltare).
3. **Audio placeholder**: finché non carichi i file mp3 reali, il sito usa
   la sintesi vocale del browser (`speechSynthesis`), nella lingua
   selezionata dall'utente, per leggere il testo di ogni tappa. Vedi
   `audio/README.md` per collegare i file veri.
4. **Lingue**: selettore IT / EN / FR in alto a destra (landing e vista
   tour). La scelta viene ricordata nel browser del visitatore. Di default
   il sito si apre nella lingua del telefono se è una delle tre supportate,
   altrimenti in inglese (`DEFAULT_LANGUAGE` in `js/i18n.js`).

## Cosa devi personalizzare

**`js/stops.js`** — dati "strutturali", uguali per tutte le lingue:

- coordinate GPS reali di ogni fermata (`lat`, `lng`)
- raggio di attivazione dell'audio (`radius`, in metri)
- percorso del file audio reale per lingua (`audioUrl.it`, `.en`, `.fr`)
  quando sarà pronto

**`js/i18n.js`** — tutti i testi, per lingua:

- `ui`: le scritte dell'interfaccia (bottoni, titoli, etichette di stato)
- `stops`: per ogni tappa, `name`, `subtitle` e `narrationText` in
  italiano/inglese/francese

Per aggiungere una quarta lingua: duplica uno dei tre blocchi in
`js/i18n.js`, traducilo, aggiungi il codice a `LANGUAGES` in cima al file e
un bottone `<button class="lang-btn" data-lang="xx">XX</button>` accanto
agli altri in `index.html` (ce ne sono due: uno nella landing, uno nella
vista tour).

Il logo/nome "Malta Bus Tour" (`ui.brandName` in `js/i18n.js`) è un
placeholder: sostituiscilo con il nome del cliente in tutte e tre le
lingue.

## Nota importante su iOS/Safari

I browser mobili bloccano la riproduzione audio automatica se non parte da
un'azione diretta dell'utente. Per questo, al tap su **"Avvia itinerario"**
il sito "sblocca" subito l'audio (riproduzione muta di un istante). Questo
rende molto più affidabile la riproduzione automatica successiva quando il
bus arriva a una tappa, ma **testalo sempre su un iPhone reale** prima di
andare in produzione: se il traffico QR arriva da Safari con restrizioni
molto aggressive, valuta di mostrare un tasto "🔊 Attiva audio" ben visibile
subito dopo l'avvio.

## Pulsante "Simula arrivo" (in alto a destra nella vista tour)

È uno strumento di test: fa avanzare l'itinerario tappa per tappa senza
bisogno di essere fisicamente a Malta con il GPS attivo. Utile ora, in fase
di sviluppo. Quando l'itinerario sarà stato validato con un test reale sul
bus, puoi tranquillamente rimuoverlo da `index.html` (`#btn-demo`) e da
`js/app.js` (funzione `simulateNextArrival`) — oppure lasciarlo, può
tornare comodo anche in futuro per verifiche rapide.

## Deploy su Vercel

Nessuna build necessaria, è tutto statico.

```bash
npm install -g vercel   # solo la prima volta
vercel                  # dalla cartella del progetto, segui le istruzioni
vercel --prod           # per pubblicare in produzione
```

In alternativa: crea una repo GitHub con questi file e collegala da
[vercel.com](https://vercel.com) → "Add New Project" → import repo →
deploy (framework preset: "Other", nessuna build command necessaria).

## QR code

Una volta pubblicato (es. `https://malta-bus-tour.vercel.app`), genera il
QR code con qualsiasi generatore online o libreria che preferisci puntando
a quell'URL, e stampalo/applicalo sul bus.

## Struttura file

```
index.html          landing + vista tour (stessa pagina, due sezioni)
css/style.css        tutti gli stili e le animazioni
js/stops.js          ⚠️ dati geografici delle tappe (lat/lng/raggio/audio)
js/i18n.js           ⚠️ tutti i testi IT/EN/FR (interfaccia + narrazioni)
js/app.js            logica: mappa, GPS, audio, lingua, stato del tour
audio/               dove mettere i file mp3 reali
vercel.json          config minima per il deploy
```
