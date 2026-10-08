/**
 * TRADUZIONI — testi dell'interfaccia e contenuti delle tappe.
 * --------------------------------------------------------------
 * Per aggiungere una lingua: duplica uno dei tre blocchi (it/en/fr),
 * traduci i valori e aggiungi il codice all'array LANGUAGES più sotto
 * e al bottone corrispondente in index.html (.lang-switch).
 *
 * speechLang: codice usato dalla sintesi vocale del browser (fallback
 * finché non carichi i file audio veri in js/stops.js -> audioUrl).
 */

const LANGUAGES = ["it", "en", "fr"];
const DEFAULT_LANGUAGE = "en"; // pubblico prevalentemente internazionale

const I18N = {
  it: {
    speechLang: "it-IT",
    ui: {
      brandName: "Malta Bus Tour",
      eyebrow: "Audioguida di bordo",
      heroTitleLine1: "Scopri Malta,",
      heroTitleLine2: "tappa dopo tappa",
      heroSub:
        "Segui il percorso del bus sulla mappa: ad ogni fermata parte in automatico il racconto della tappa. Basta un tocco per iniziare.",
      startBtn: "Avvia itinerario",
      heroHint: "Attiva la localizzazione quando richiesto per l'esperienza completa",
      previewHeading: "Le tappe del tour",
      footer: "Buon viaggio e buon divertimento a Malta! 🇲🇹",
      tourTitle: "Itinerario in corso",
      progress: (i, n) => `Tappa ${i} di ${n}`,
      demoBtn: "Simula arrivo",
      demoBtnTitle: "Strumento di test: simula l'arrivo alla prossima tappa senza aspettare il GPS reale",
      backAria: "Torna indietro",
      nowPlayingLabel: "In riproduzione ora",
      replayAria: "Riascolta",
      playPauseAria: "Play/Pausa",
      stopListHeading: "Tutte le tappe",
      statusWaiting: "In attesa",
      statusPlaying: "In riproduzione",
      statusVisited: "Ascoltata",
      playStopAria: (name) => `Ascolta ${name}`,
      langSwitchAria: "Cambia lingua"
    },
    stops: {
      valletta: {
        name: "La Valletta",
        subtitle: "Punto di partenza",
        narrationText:
          "Benvenuti a La Valletta, la capitale di Malta e Patrimonio dell'Umanità UNESCO. " +
          "Costruita dai Cavalieri di San Giovanni nel Cinquecento, questa città fortificata " +
          "custodisce palazzi, chiese barocche e una vista mozzafiato sul Grand Harbour. " +
          "Il nostro tour parte proprio da qui: buon viaggio!"
      },
      mosta: {
        name: "Mosta",
        subtitle: "La Rotonda di Mosta",
        narrationText:
          "Eccoci a Mosta, famosa in tutto il mondo per la sua imponente cupola, la Rotonda, " +
          "una delle più grandi cupole non sostenute d'Europa. Durante la Seconda Guerra Mondiale " +
          "una bomba perforò il tetto durante la messa senza esplodere: un evento considerato " +
          "un vero miracolo dagli abitanti del posto.",
      },
      mdina: {
        name: "Mdina",
        subtitle: "La Città Silenziosa",
        narrationText:
          "Stiamo arrivando a Mdina, l'antica capitale di Malta, conosciuta come la Città " +
          "Silenziosa per le sue stradine strette dove il traffico è vietato. Passeggiando tra " +
          "i suoi vicoli medievali potrete ammirare palazzi nobiliari e una vista che spazia " +
          "su tutta l'isola."
      },
      "golden-bay": {
        name: "Golden Bay",
        subtitle: "Spiaggia dorata",
        narrationText:
          "Siamo a Golden Bay, una delle spiagge sabbiose più belle di Malta, incorniciata da " +
          "scogliere dorate. Un luogo perfetto per rilassarsi e godersi il sole mediterraneo prima " +
          "di riprendere il nostro itinerario."
      },
      "blue-grotto": {
        name: "Blue Grotto",
        subtitle: "Grotta Azzurra",
        narrationText:
          "Ci troviamo alla Blue Grotto, un complesso di grotte marine scavate nella roccia " +
          "calcarea, famose per i riflessi di luce che colorano l'acqua di blu intenso e " +
          "turchese. Da qui è possibile anche prendere una barca per esplorare le grotte da vicino."
      },
      marsaxlokk: {
        name: "Marsaxlokk",
        subtitle: "Villaggio di pescatori",
        narrationText:
          "Ultima tappa del nostro tour: Marsaxlokk, un pittoresco villaggio di pescatori famoso " +
          "per le sue tradizionali barche colorate, i luzzu, e per il suo mercato del pesce. " +
          "Grazie per aver viaggiato con noi: speriamo che questo itinerario vi sia piaciuto!"
      }
    }
  },

  en: {
    speechLang: "en-GB",
    ui: {
      brandName: "Malta Bus Tour",
      eyebrow: "Onboard audio guide",
      heroTitleLine1: "Discover Malta,",
      heroTitleLine2: "one stop at a time",
      heroSub:
        "Follow the bus route on the map: at every stop, the story starts playing automatically. Just one tap to begin.",
      startBtn: "Start the tour",
      heroHint: "Allow location access when prompted for the full experience",
      previewHeading: "Tour stops",
      footer: "Have a great trip and enjoy Malta! 🇲🇹",
      tourTitle: "Tour in progress",
      progress: (i, n) => `Stop ${i} of ${n}`,
      demoBtn: "Simulate arrival",
      demoBtnTitle: "Test tool: simulates arriving at the next stop without waiting for real GPS",
      backAria: "Go back",
      nowPlayingLabel: "Now playing",
      replayAria: "Replay",
      playPauseAria: "Play/Pause",
      stopListHeading: "All stops",
      statusWaiting: "Upcoming",
      statusPlaying: "Now playing",
      statusVisited: "Listened",
      playStopAria: (name) => `Play ${name}`,
      langSwitchAria: "Change language"
    },
    stops: {
      valletta: {
        name: "Valletta",
        subtitle: "Starting point",
        narrationText:
          "Welcome to Valletta, the capital of Malta and a UNESCO World Heritage Site. " +
          "Built by the Knights of St John in the 16th century, this fortified city is home to " +
          "baroque churches, grand palaces, and breathtaking views over the Grand Harbour. " +
          "Our tour begins right here — enjoy the ride!"
      },
      mosta: {
        name: "Mosta",
        subtitle: "The Mosta Dome",
        narrationText:
          "Here we are in Mosta, world-famous for its impressive dome, the Rotunda — one of the " +
          "largest unsupported domes in Europe. During the Second World War, a bomb pierced the " +
          "roof during mass without exploding, an event still regarded locally as a true miracle."
      },
      mdina: {
        name: "Mdina",
        subtitle: "The Silent City",
        narrationText:
          "We're now arriving in Mdina, the former capital of Malta, known as the Silent City for " +
          "its narrow streets where traffic is banned. Strolling through its medieval alleys, " +
          "you'll admire noble palaces and sweeping views across the island."
      },
      "golden-bay": {
        name: "Golden Bay",
        subtitle: "Golden sand beach",
        narrationText:
          "We've reached Golden Bay, one of Malta's most beautiful sandy beaches, framed by " +
          "golden cliffs. A perfect spot to relax and soak up the Mediterranean sun before we " +
          "continue our journey."
      },
      "blue-grotto": {
        name: "Blue Grotto",
        subtitle: "Sea caves",
        narrationText:
          "We're at the Blue Grotto, a series of sea caves carved into limestone cliffs, famous " +
          "for the way light reflects off the water in shades of deep blue and turquoise. Boat " +
          "trips are available here to explore the caves up close."
      },
      marsaxlokk: {
        name: "Marsaxlokk",
        subtitle: "Fishing village",
        narrationText:
          "Our final stop: Marsaxlokk, a picturesque fishing village famous for its traditional " +
          "colourful boats, the luzzus, and its bustling fish market. Thank you for travelling " +
          "with us — we hope you enjoyed this tour!"
      }
    }
  },

  fr: {
    speechLang: "fr-FR",
    ui: {
      brandName: "Malta Bus Tour",
      eyebrow: "Guide audio embarqué",
      heroTitleLine1: "Découvrez Malte,",
      heroTitleLine2: "étape après étape",
      heroSub:
        "Suivez le trajet du bus sur la carte : à chaque arrêt, le récit démarre automatiquement. Un seul geste pour commencer.",
      startBtn: "Démarrer la visite",
      heroHint: "Autorisez la localisation lorsque demandé pour profiter de l'expérience complète",
      previewHeading: "Les étapes du circuit",
      footer: "Bon voyage et amusez-vous bien à Malte ! 🇲🇹",
      tourTitle: "Visite en cours",
      progress: (i, n) => `Étape ${i} sur ${n}`,
      demoBtn: "Simuler l'arrivée",
      demoBtnTitle: "Outil de test : simule l'arrivée à la prochaine étape sans attendre le GPS réel",
      backAria: "Retour",
      nowPlayingLabel: "Lecture en cours",
      replayAria: "Réécouter",
      playPauseAria: "Lecture/Pause",
      stopListHeading: "Toutes les étapes",
      statusWaiting: "À venir",
      statusPlaying: "En cours",
      statusVisited: "Écoutée",
      playStopAria: (name) => `Écouter ${name}`,
      langSwitchAria: "Changer de langue"
    },
    stops: {
      valletta: {
        name: "La Valette",
        subtitle: "Point de départ",
        narrationText:
          "Bienvenue à La Valette, la capitale de Malte, classée au patrimoine mondial de " +
          "l'UNESCO. Construite par les Chevaliers de Saint-Jean au XVIe siècle, cette cité " +
          "fortifiée abrite des églises baroques, de somptueux palais et une vue imprenable sur " +
          "le Grand Port. Notre circuit commence ici : bon voyage !"
      },
      mosta: {
        name: "Mosta",
        subtitle: "Le Dôme de Mosta",
        narrationText:
          "Nous voici à Mosta, célèbre dans le monde entier pour son impressionnante coupole, " +
          "la Rotonde, l'une des plus grandes coupoles non soutenues d'Europe. Pendant la " +
          "Seconde Guerre mondiale, une bombe transperça le toit en pleine messe sans exploser, " +
          "un événement encore considéré comme un véritable miracle par les habitants."
      },
      mdina: {
        name: "Mdina",
        subtitle: "La Cité du Silence",
        narrationText:
          "Nous arrivons à Mdina, l'ancienne capitale de Malte, surnommée la Cité du Silence en " +
          "raison de ses ruelles étroites où la circulation est interdite. En vous promenant dans " +
          "ses venelles médiévales, vous admirerez des palais nobles et une vue panoramique sur " +
          "toute l'île."
      },
      "golden-bay": {
        name: "Golden Bay",
        subtitle: "Plage de sable doré",
        narrationText:
          "Nous voici à Golden Bay, l'une des plus belles plages de sable de Malte, encadrée par " +
          "des falaises dorées. Un endroit parfait pour se détendre et profiter du soleil " +
          "méditerranéen avant de reprendre notre itinéraire."
      },
      "blue-grotto": {
        name: "Blue Grotto",
        subtitle: "Grottes marines",
        narrationText:
          "Nous sommes à la Blue Grotto, un ensemble de grottes marines creusées dans la roche " +
          "calcaire, célèbres pour les reflets de lumière qui colorent l'eau de bleu profond et " +
          "de turquoise. Des excursions en bateau permettent d'explorer les grottes de plus près."
      },
      marsaxlokk: {
        name: "Marsaxlokk",
        subtitle: "Village de pêcheurs",
        narrationText:
          "Dernière étape de notre circuit : Marsaxlokk, un pittoresque village de pêcheurs " +
          "réputé pour ses barques colorées traditionnelles, les luzzus, et son marché aux " +
          "poissons animé. Merci d'avoir voyagé avec nous : nous espérons que cet itinéraire " +
          "vous a plu !"
      }
    }
  }
};

function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem("mbt_lang");
    if (saved && LANGUAGES.includes(saved)) return saved;
  } catch (e) { /* storage non disponibile */ }

  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return LANGUAGES.includes(nav) ? nav : DEFAULT_LANGUAGE;
}
