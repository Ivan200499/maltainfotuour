/**
 * CONFIGURAZIONE TAPPE ITINERARIO — dati "strutturali" (non testuali).
 * -------------------------------------------------------------------
 * I testi (nome, sottotitolo, narrazione) sono in js/i18n.js, per lingua.
 * Qui trovi solo ciò che NON cambia in base alla lingua:
 * - lat / lng: coordinate GPS reali della fermata (da sostituire)
 * - radius: raggio in metri entro cui l'audio parte in automatico
 * - audioUrl: percorso del file audio per ogni lingua, es. "audio/it/01-valletta.mp3"
 *   finché resta null, si usa la sintesi vocale del browser nella lingua attiva
 * - image: icona mostrata su mappa e nell'elenco tappe
 */

const STOPS = [
  {
    id: "valletta",
    order: 1,
    lat: 35.8989,
    lng: 14.5146,
    radius: 150,
    durationLabel: "~3 min",
    audioUrl: { it: null, en: null, fr: null },
    image: "🏰"
  },
  {
    id: "mosta",
    order: 2,
    lat: 35.9095,
    lng: 14.4258,
    radius: 150,
    durationLabel: "~2 min",
    audioUrl: { it: null, en: null, fr: null },
    image: "⛪"
  },
  {
    id: "mdina",
    order: 3,
    lat: 35.8867,
    lng: 14.4033,
    radius: 150,
    durationLabel: "~4 min",
    audioUrl: { it: null, en: null, fr: null },
    image: "🏛️"
  },
  {
    id: "golden-bay",
    order: 4,
    lat: 35.9297,
    lng: 14.3399,
    radius: 150,
    durationLabel: "~2 min",
    audioUrl: { it: null, en: null, fr: null },
    image: "🏖️"
  },
  {
    id: "blue-grotto",
    order: 5,
    lat: 35.8256,
    lng: 14.4547,
    radius: 150,
    durationLabel: "~3 min",
    audioUrl: { it: null, en: null, fr: null },
    image: "🌊"
  },
  {
    id: "marsaxlokk",
    order: 6,
    lat: 35.8419,
    lng: 14.5433,
    radius: 150,
    durationLabel: "~3 min",
    audioUrl: { it: null, en: null, fr: null },
    image: "⛵"
  }
];

// Punto di partenza del bus mostrato sulla mappa prima di avviare il tour
const TOUR_START = { lat: 35.8989, lng: 14.5146 };
