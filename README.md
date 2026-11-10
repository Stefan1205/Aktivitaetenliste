# Aktivitätenliste

Aktivitätenliste der Konstruktion als eine einzige HTML-Datei – Ersatz für das Word-Dokument mit Makros.
Läuft ohne Installation im Edge/Chrome; die Einträge stehen in der Datei selbst (eine Datei je Teil).

- Kopf als Schriftfeld: Kunde, Teilename, OF-Nr., Bemerkung, Anfragenummer, Blatt, Datum; Logo per Klick oder Ziehen.
- Zeitleiste nach Monaten, je Eintrag Datum, Art (Konstruktion, Änderung, Kunde, Abstimmung, Freigabe, Info),
  Aktivität, beliebig viele Links (SAP, Pfade, Web) und Bearbeiter.
- Offene Punkte mit Wiedervorlage (TT.MM.JJJJ oder +7); überfällige werden rot markiert, „erledigt“ per Klick.
- Lagezeile: Anzahl Einträge, offene und überfällige Punkte, letzte Aktivität.
- Filter: Suche, Art, nur offene, Reihenfolge; Bearbeiten, Kopieren, Löschen mit Rückgängig.
- Bilder und Screenshots je Eintrag: im Dialog „+ Bild hinzufügen“, Strg+V (Screenshot) oder Bild hineinziehen,
  in der Liste auch direkt auf einen Eintrag ziehen. Bilder werden auf höchstens 1600 px verkleinert und als JPEG in
  der Datei gespeichert; Klick zeigt sie groß (Pfeiltasten blättern), beim Drucken kommen sie mit.
- Speichern (Strg+S) überschreibt die Datei direkt (Edge/Chrome), sonst Download; Entwurf im Browser.
- Aus Word übernehmen: Word-Datei (.docx/.docm) wählen oder hineinziehen – oder Strg+A/Strg+C im Dokument und
  Strg+V im Dialog. Das alte .doc-Format kann der Browser nicht lesen (in Word als .docx speichern).
  Die Spalten werden an der Kopfzeile erkannt (Datum, Aktivität/Text, Link, Bearbeiter) – auch Tabellen mit nur drei
  Spalten; Links im Aktivitätstext kommen unter „Links“, Zeilen ohne Datum (z. B. „war …“) werden Info-Einträge
  zum vorigen Datum (ab 1.2.1).
- Weitere: Speichern unter, neue leere Liste, aus Word übernehmen, aus Liste übernehmen (ältere Version),
  Einträge als Text kopieren (für Mail/Teams), CSV für Excel, Drucken/PDF.
- Tastatur: N neuer Eintrag, / Suche, Strg+Enter im Dialog = Eintragen.

Version: `<meta name="version" content="…">` in `Aktivitaetenliste.html`.

Test des Word-Imports (erfundene Daten): `python3 tests/word_beispiel.py /tmp/b.docx && node tests/import_test.js /tmp/b.docx`
