// Test „Aus Word übernehmen“ (ab 1.2.1, Bilder ab 1.2.2) mit der erfundenen Word-Datei aus tests/word_beispiel.py
//   python3 tests/word_beispiel.py /tmp/beispiel.docx && node tests/import_test.js /tmp/beispiel.docx [bild.png]
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1300, height:900}});
  const fehler = []; p.on('pageerror', e => fehler.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '..', 'Aktivitaetenliste.html')); await p.waitForTimeout(400);
  await p.evaluate(() => { const m = document.querySelector('[data-m="word"]'); m.click(); });
  await p.setInputFiles('#wordDatei', process.argv[2]); await p.waitForTimeout(800);
  const vorschau = await p.textContent('#iVorschau');
  if(!/5<\/b>|5 Einträge/.test(await p.innerHTML('#iVorschau'))) throw new Error('Vorschau: ' + vorschau);
  await p.click('#iOk'); await p.waitForTimeout(400);
  const D = await p.evaluate(() => JSON.parse(JSON.stringify(window.__aktliste.daten)));
  const e = D.eintraege, pr = (c, t) => { if(!c) throw new Error(t + ': ' + JSON.stringify(e, null, 1)); };
  pr(e.length === 5, 'Anzahl');
  pr(e[1].bilder.length === 1 && e[2].bilder.length === 1 && e.reduce((a, x) => a + x.bilder.length, 0) === 2, 'Bilder');
  pr(/^data:image\/jpeg/.test(e[1].bilder[0].data) && e[1].bilder[0].b === 320, 'Bild verkleinert/JPEG');
  pr(e[0].datum === '12.03.2024' && e[0].links[0].url === 'sapplm://ectr?id=A1' && /abgelegt hier/.test(e[0].text), 'Link im Satz');
  pr(e[1].text === 'Angebot erstellt\nRückfrage zum Werkstoff' && e[1].bearbeiter === 'Schulz', 'zwei Absätze');
  pr(e[2].text === 'Zeichnung geändert' && e[2].links.length === 1 && e[2].links[0].text === 'Link', 'Link-Absatz nur unter Links');
  pr(e[3].kat === 'Info' && e[3].datum === '02.04.2024' && e[3].text === 'war 654321-02', 'Zeile ohne Datum');
  pr(e[4].datum === '05.05.2024', 'letzter Eintrag');
  pr(D.kopf.ofnr === '123456-01' && D.kopf.kunde === 'Musterbau' && D.kopf.teilename === 'Halter vorn links', 'Kopf');
  if(process.argv[3]) await p.screenshot({path: process.argv[3], fullPage: true});
  // nochmals übernehmen: vorhandene Einträge ohne Bilder bekommen die Bilder nachgetragen
  await p.evaluate(() => window.__aktliste.daten.eintraege.forEach(x => x.bilder = []));
  await p.evaluate(() => document.querySelector('[data-m="word"]').click());
  await p.setInputFiles('#wordDatei', process.argv[2]); await p.waitForTimeout(800);
  const v2 = await p.textContent('#iVorschau');
  if(!/davon 0 neu\. Dazu 2 Bilder \(auch für 2 vorhandene/.test(v2)) throw new Error('Vorschau 2: ' + v2);
  await p.click('#iOk'); await p.waitForTimeout(400);
  const n2 = await p.evaluate(() => window.__aktliste.daten.eintraege.reduce((a, x) => a + x.bilder.length, 0));
  pr(n2 === 2, 'Bilder nachgetragen');
  if(fehler.length) throw new Error(fehler.join('\n'));
  console.log('import_test: OK –', vorschau);
  await b.close();
})().catch(e => { console.error(e.message); process.exit(1); });
