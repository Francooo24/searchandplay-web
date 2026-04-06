const words = [
  // Mythology
  { greek: "χάος", transliteration: "chaos", english: "the void, primordial emptiness", category: "Mythology" },
  { greek: "ἔρως", transliteration: "eros", english: "romantic love, desire", category: "Mythology" },
  { greek: "νέμεσις", transliteration: "nemesis", english: "retribution, divine vengeance", category: "Mythology" },
  { greek: "μοῖρα", transliteration: "moira", english: "fate, destiny, one's share", category: "Mythology" },
  { greek: "ψυχή", transliteration: "psyche", english: "soul, mind, spirit", category: "Mythology" },
  { greek: "ἄτλας", transliteration: "atlas", english: "one who carries, endures", category: "Mythology" },
  { greek: "φοῖνιξ", transliteration: "phoenix", english: "a bird reborn from ashes", category: "Mythology" },

  // Philosophy
  { greek: "λόγος", transliteration: "logos", english: "word, reason, discourse", category: "Philosophy" },
  { greek: "ἀρετή", transliteration: "arete", english: "virtue, excellence, moral goodness", category: "Philosophy" },
  { greek: "σοφία", transliteration: "sophia", english: "wisdom, knowledge", category: "Philosophy" },
  { greek: "ἀλήθεια", transliteration: "aletheia", english: "truth, disclosure, unconcealedness", category: "Philosophy" },
  { greek: "εἰρήνη", transliteration: "eirene", english: "peace, tranquility", category: "Philosophy" },
  { greek: "δικαιοσύνη", transliteration: "dikaiosyne", english: "justice, righteousness", category: "Philosophy" },
  { greek: "ἐλευθερία", transliteration: "eleutheria", english: "freedom, liberty", category: "Philosophy" },
  { greek: "κόσμος", transliteration: "kosmos", english: "order, universe, world", category: "Philosophy" },
  { greek: "φιλοσοφία", transliteration: "philosophia", english: "love of wisdom", category: "Philosophy" },

  // Emotions
  { greek: "ἀγάπη", transliteration: "agape", english: "unconditional love, divine love", category: "Emotions" },
  { greek: "φιλία", transliteration: "philia", english: "friendship, affectionate love", category: "Emotions" },
  { greek: "λύπη", transliteration: "lype", english: "grief, sorrow, sadness", category: "Emotions" },
  { greek: "χαρά", transliteration: "chara", english: "joy, delight, happiness", category: "Emotions" },
  { greek: "θυμός", transliteration: "thymos", english: "anger, spirit, passion", category: "Emotions" },
  { greek: "φόβος", transliteration: "phobos", english: "fear, panic, dread", category: "Emotions" },
  { greek: "ἐλπίς", transliteration: "elpis", english: "hope, expectation", category: "Emotions" },
  { greek: "ζῆλος", transliteration: "zelos", english: "zeal, jealousy, rivalry", category: "Emotions" },

  // Nature
  { greek: "γῆ", transliteration: "ge", english: "earth, land, soil", category: "Nature" },
  { greek: "ὕδωρ", transliteration: "hydor", english: "water", category: "Nature" },
  { greek: "πῦρ", transliteration: "pyr", english: "fire", category: "Nature" },
  { greek: "ἄνεμος", transliteration: "anemos", english: "wind", category: "Nature" },
  { greek: "ἥλιος", transliteration: "helios", english: "sun", category: "Nature" },
  { greek: "σελήνη", transliteration: "selene", english: "moon", category: "Nature" },
  { greek: "ἄστρον", transliteration: "astron", english: "star, constellation", category: "Nature" },
  { greek: "θάλασσα", transliteration: "thalassa", english: "sea, ocean", category: "Nature" },

  // Medical
  { greek: "καρδία", transliteration: "kardia", english: "heart", category: "Medical" },
  { greek: "ψυχιατρική", transliteration: "psychiatrike", english: "psychiatry, healing of the mind", category: "Medical" },
  { greek: "βιολογία", transliteration: "biologia", english: "biology, study of life", category: "Medical" },
  { greek: "νευρολογία", transliteration: "neurologia", english: "neurology, study of nerves", category: "Medical" },
  { greek: "φαρμακολογία", transliteration: "pharmakologia", english: "pharmacology, study of drugs", category: "Medical" },
  { greek: "ἀνατομία", transliteration: "anatomia", english: "anatomy, cutting up the body", category: "Medical" },

  // Common Words
  { greek: "ἄνθρωπος", transliteration: "anthropos", english: "human being, person", category: "Common" },
  { greek: "οἶκος", transliteration: "oikos", english: "house, home, household", category: "Common" },
  { greek: "χρόνος", transliteration: "chronos", english: "time", category: "Common" },
  { greek: "τόπος", transliteration: "topos", english: "place, location", category: "Common" },
  { greek: "φῶς", transliteration: "phos", english: "light", category: "Common" },
  { greek: "σκότος", transliteration: "skotos", english: "darkness, shadow", category: "Common" },
  { greek: "ζωή", transliteration: "zoe", english: "life", category: "Common" },
  { greek: "θάνατος", transliteration: "thanatos", english: "death", category: "Common" },
  { greek: "δύναμις", transliteration: "dynamis", english: "power, force, ability", category: "Common" },
  { greek: "γνῶσις", transliteration: "gnosis", english: "knowledge, insight", category: "Common" },
];

function normalize(str) {
  return str.toLowerCase().trim();
}

function search() {
  const query = normalize(document.getElementById("searchInput").value);
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "";
    return;
  }

  const filtered = words.filter(w =>
    w.greek.includes(query) ||
    normalize(w.transliteration).includes(query) ||
    normalize(w.english).includes(query) ||
    normalize(w.category).includes(query)
  );

  if (filtered.length === 0) {
    resultsDiv.innerHTML = `<p class="no-results">No results found for "<strong>${query}</strong>"</p>`;
    return;
  }

  resultsDiv.innerHTML = filtered.map(w => `
    <div class="card">
      <div class="greek">${w.greek}</div>
      <div class="transliteration">${w.transliteration}</div>
      <div class="english">${w.english}</div>
      <span class="category">${w.category}</span>
    </div>
  `).join("");
}

document.getElementById("searchInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") search();
});
