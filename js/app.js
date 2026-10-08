/**
 * Logica dell'app: lingua -> landing -> avvio itinerario -> mappa live + audio.
 * Nessuna build/framework richiesto: file statici pronti per Vercel.
 */
(function () {
  "use strict";

  const state = {
    lang: detectInitialLanguage(),
    map: null,
    busMarker: null,
    stopMarkers: {},
    watchId: null,
    currentIndex: -1,
    visited: new Set(),
    speaking: false,
    demoIndex: 0,
    audioUnlocked: false
  };

  const audioEl = document.getElementById("audio-player");

  // ---------- I18N HELPERS ----------
  function t(key) {
    return I18N[state.lang].ui[key];
  }
  function stopText(stop) {
    return I18N[state.lang].stops[stop.id];
  }

  function setLanguage(lang) {
    if (!LANGUAGES.includes(lang)) return;
    state.lang = lang;
    try { localStorage.setItem("mbt_lang", lang); } catch (e) { /* no-op */ }
    document.documentElement.lang = lang;
    applyTranslations();
    renderPreviewStops();
    if (!document.getElementById("view-tour").classList.contains("hidden")) {
      renderStopList();
      updateProgress();
      refreshMapPopups();
      if (state.currentIndex >= 0) {
        document.getElementById("np-title").textContent = stopText(STOPS[state.currentIndex]).name;
        document.getElementById("np-caption").textContent = stopText(STOPS[state.currentIndex]).narrationText;
      }
    }
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const val = t(key);
      if (typeof val === "string") el.textContent = val;
    });
    document.title = state.lang === "it"
      ? "Malta Bus Tour — Audioguida"
      : state.lang === "fr"
      ? "Malta Bus Tour — Guide audio"
      : "Malta Bus Tour — Audio Guide";
    const demoBtn = document.getElementById("btn-demo");
    if (demoBtn) demoBtn.title = t("demoBtnTitle");
    const backBtn = document.getElementById("btn-back");
    if (backBtn) backBtn.setAttribute("aria-label", t("backAria"));
    const replayBtn = document.getElementById("np-replay");
    if (replayBtn) replayBtn.setAttribute("aria-label", t("replayAria"));
    const toggleBtn = document.getElementById("np-toggle");
    if (toggleBtn) toggleBtn.setAttribute("aria-label", t("playPauseAria"));
  }

  // ---------- UTILS ----------
  function distMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  function unlockAudioForMobile() {
    if (state.audioUnlocked) return;
    state.audioUnlocked = true;
    try {
      audioEl.muted = true;
      audioEl
        .play()
        .then(() => {
          audioEl.pause();
          audioEl.currentTime = 0;
          audioEl.muted = false;
        })
        .catch(() => { audioEl.muted = false; });

      if ("speechSynthesis" in window) {
        const warm = new SpeechSynthesisUtterance(" ");
        warm.volume = 0;
        window.speechSynthesis.speak(warm);
      }
    } catch (e) { /* no-op */ }
  }

  // ---------- LANDING: elenco tappe in anteprima ----------
  function renderPreviewStops() {
    const ul = document.getElementById("preview-stops");
    ul.innerHTML = STOPS.map((s) => {
      const txt = stopText(s);
      return `
      <li>
        <span class="emoji">${s.image}</span>
        <span class="order-badge">${state.lang === "en" ? "Stop" : state.lang === "fr" ? "Étape" : "Tappa"} ${s.order}</span>
        <span class="name">${txt.name}</span>
        <span class="sub">${txt.subtitle}</span>
      </li>`;
    }).join("");
  }

  // ---------- AUDIO / NARRAZIONE ----------
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = I18N[state.lang].speechLang;
    utter.rate = 1;
    utter.onstart = () => setPlayingUI(true);
    utter.onend = () => setPlayingUI(false);
    utter.onerror = () => setPlayingUI(false);
    window.speechSynthesis.speak(utter);
    state.speaking = true;
  }

  function playStopAudio(stop) {
    const txt = stopText(stop);
    const url = stop.audioUrl && stop.audioUrl[state.lang];
    if (url) {
      audioEl.src = url;
      audioEl.play().catch(() => speak(txt.narrationText));
      audioEl.onplay = () => setPlayingUI(true);
      audioEl.onpause = () => setPlayingUI(false);
      audioEl.onended = () => setPlayingUI(false);
    } else {
      speak(txt.narrationText);
    }
    showNowPlaying(stop);
  }

  function stopAllAudio() {
    audioEl.pause();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    state.speaking = false;
  }

  // ---------- NOW PLAYING BAR ----------
  function showNowPlaying(stop) {
    const txt = stopText(stop);
    const bar = document.getElementById("now-playing");
    bar.classList.remove("hidden");
    document.getElementById("np-icon").textContent = stop.image;
    document.getElementById("np-title").textContent = txt.name;
    document.getElementById("np-caption").textContent = txt.narrationText;
    setPlayingUI(true);
  }

  function setPlayingUI(isPlaying) {
    const toggle = document.getElementById("np-toggle");
    if (toggle) toggle.textContent = isPlaying ? "⏸" : "▶";
  }

  // ---------- MAPPA ----------
  function initMap() {
    state.map = L.map("map", { zoomControl: false }).setView(
      [TOUR_START.lat, TOUR_START.lng],
      12
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(state.map);

    L.control.zoom({ position: "bottomright" }).addTo(state.map);

    // percorso statico tra le tappe (nessuna animazione continua: più
    // professionale e più leggero per la batteria durante un tour reale)
    const latlngs = STOPS.map((s) => [s.lat, s.lng]);
    const routeLine = L.polyline(latlngs, {
      color: "#e2555f",
      weight: 4,
      opacity: 0.85,
      dashArray: "1, 10",
      lineCap: "round"
    }).addTo(state.map);

    STOPS.forEach((stop, i) => {
      const icon = L.divIcon({
        className: "",
        html: `<div class="stop-icon" id="pin-${stop.id}">${stop.image}</div>`,
        iconSize: [34, 34]
      });
      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(state.map);
      marker.on("click", () => onManualPlay(i));
      state.stopMarkers[stop.id] = marker;
    });
    refreshMapPopups();

    const busIcon = L.divIcon({
      className: "",
      html: `<div class="bus-icon">🚌</div>`,
      iconSize: [30, 30]
    });
    state.busMarker = L.marker([TOUR_START.lat, TOUR_START.lng], {
      icon: busIcon,
      zIndexOffset: 1000
    }).addTo(state.map);

    state.map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });
  }

  function refreshMapPopups() {
    STOPS.forEach((stop) => {
      const marker = state.stopMarkers[stop.id];
      if (!marker) return;
      const txt = stopText(stop);
      marker.bindPopup(`<strong>${txt.name}</strong><br/>${txt.subtitle}`);
    });
  }

  // ---------- GEOLOCALIZZAZIONE ----------
  function startGeolocation() {
    if (!("geolocation" in navigator)) return;
    state.watchId = navigator.geolocation.watchPosition(
      onPosition,
      (err) => console.warn("Geolocation unavailable:", err.message),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
  }

  function onPosition(pos) {
    const { latitude, longitude } = pos.coords;
    if (state.busMarker) state.busMarker.setLatLng([latitude, longitude]);

    STOPS.forEach((stop, i) => {
      if (state.visited.has(stop.id)) return;
      const d = distMeters(latitude, longitude, stop.lat, stop.lng);
      if (d <= stop.radius) {
        arriveAtStop(i);
      }
    });
  }

  // ---------- LOGICA TAPPE ----------
  function arriveAtStop(index) {
    const stop = STOPS[index];
    if (state.visited.has(stop.id)) return;
    state.visited.add(stop.id);
    state.currentIndex = index;

    updateMarkerState(stop.id, "active");
    playStopAudio(stop);
    renderStopList();
    updateProgress();
  }

  function onManualPlay(index) {
    const stop = STOPS[index];
    state.visited.add(stop.id);
    state.currentIndex = index;
    updateMarkerState(stop.id, "active");
    playStopAudio(stop);
    renderStopList();
    updateProgress();
  }

  function updateMarkerState(stopId, cls) {
    Object.keys(state.stopMarkers).forEach((id) => {
      const el = document.getElementById(`pin-${id}`);
      if (!el) return;
      el.classList.remove("active", "visited");
      if (id === stopId) {
        el.classList.add(cls);
      } else if (state.visited.has(id)) {
        el.classList.add("visited");
      }
    });
  }

  function updateProgress() {
    document.getElementById("tour-progress").textContent =
      t("progress")(state.visited.size, STOPS.length);
  }

  function renderStopList() {
    const ul = document.getElementById("stop-list");
    ul.innerHTML = STOPS.map((stop, i) => {
      const txt = stopText(stop);
      const isVisited = state.visited.has(stop.id);
      const isActive = i === state.currentIndex;
      const statusText = isActive
        ? t("statusPlaying")
        : isVisited
        ? t("statusVisited")
        : t("statusWaiting");
      const rowClass = isActive ? "active" : isVisited ? "visited" : "";
      return `
        <li class="stop-row ${rowClass}" data-index="${i}">
          <span class="num">${stop.order}</span>
          <span class="emoji">${stop.image}</span>
          <span class="info">
            <div class="name">${txt.name}</div>
            <div class="status">${statusText} · ${stop.durationLabel}</div>
          </span>
          <button class="play-btn" aria-label="${t("playStopAria")(txt.name)}">▶</button>
        </li>`;
    }).join("");

    ul.querySelectorAll(".stop-row").forEach((row) => {
      row.querySelector(".play-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        onManualPlay(Number(row.dataset.index));
      });
    });
  }

  // ---------- NAVIGAZIONE TRA VISTE ----------
  function goToTourView() {
    unlockAudioForMobile();
    document.getElementById("view-landing").classList.add("hidden");
    document.getElementById("view-tour").classList.remove("hidden");

    if (!state.map) initMap();
    renderStopList();
    updateProgress();
    startGeolocation();

    setTimeout(() => state.map.invalidateSize(), 150);
  }

  function goToLandingView() {
    if (state.watchId !== null) {
      navigator.geolocation.clearWatch(state.watchId);
      state.watchId = null;
    }
    stopAllAudio();
    document.getElementById("view-tour").classList.add("hidden");
    document.getElementById("view-landing").classList.remove("hidden");
  }

  // ---------- STRUMENTO DI TEST: simula arrivo alla prossima tappa ----------
  function simulateNextArrival() {
    if (state.demoIndex >= STOPS.length) {
      state.demoIndex = 0;
      state.visited.clear();
      renderStopList();
      updateProgress();
      Object.keys(state.stopMarkers).forEach((id) => {
        const el = document.getElementById(`pin-${id}`);
        if (el) el.classList.remove("active", "visited");
      });
      return;
    }
    const stop = STOPS[state.demoIndex];
    if (state.busMarker) state.busMarker.setLatLng([stop.lat, stop.lng]);
    if (state.map) state.map.panTo([stop.lat, stop.lng]);
    arriveAtStop(state.demoIndex);
    state.demoIndex++;
  }

  // ---------- CONTROLLI PLAYER ----------
  function togglePlayback() {
    const current = STOPS[state.currentIndex];
    const usingFile = current && current.audioUrl && current.audioUrl[state.lang];
    if (!usingFile) {
      if (state.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setPlayingUI(false);
      } else {
        window.speechSynthesis.resume();
        setPlayingUI(true);
      }
    } else {
      if (audioEl.paused) { audioEl.play(); } else { audioEl.pause(); }
    }
  }

  function replayCurrent() {
    if (state.currentIndex < 0) return;
    playStopAudio(STOPS[state.currentIndex]);
  }

  // ---------- INIT ----------
  document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.lang = state.lang;
    applyTranslations();
    renderPreviewStops();

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === state.lang);
      btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });

    document.getElementById("btn-start").addEventListener("click", goToTourView);
    document.getElementById("btn-back").addEventListener("click", goToLandingView);
    document.getElementById("btn-demo").addEventListener("click", simulateNextArrival);
    document.getElementById("np-toggle").addEventListener("click", togglePlayback);
    document.getElementById("np-replay").addEventListener("click", replayCurrent);
  });
})();
