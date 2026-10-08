# Cartella audio

Metti qui i file audio reali quando li avrai registrati, ad esempio:

```
audio/01-valletta.mp3
audio/02-mosta.mp3
audio/03-mdina.mp3
audio/04-golden-bay.mp3
audio/05-blue-grotto.mp3
audio/06-marsaxlokk.mp3
```

Poi apri `js/stops.js` e per ogni tappa imposta:

```js
audioUrl: "audio/01-valletta.mp3",
```

Finché `audioUrl` resta `null`, il sito legge automaticamente il testo di
`narrationText` con la sintesi vocale del browser (utile per fare demo e
test prima di avere le registrazioni definitive).

Formato consigliato: MP3, mono, 64–128 kbps (file più leggeri = caricamento
più veloce su rete mobile del bus).
