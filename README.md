# Aktivitätenliste

Aktivitätenliste der Konstruktion als eine einzige HTML-Datei – Ersatz für das Word-Dokument mit Makros.
Läuft ohne Installation im Edge/Chrome; die Einträge stehen in der Datei selbst (eine Datei je Teil).

- Kopf: Kunde, Teilename, OF-Nr., Bemerkung, Anfragenummer, Blatt, Datum; Logo per Klick ladbar.
- Einträge: Datum, Aktivität, beliebig viele SAP-Links (URL + Anzeigetext), Bearbeiter. Neuer Eintrag per
  Doppelklick auf den Hinweis oder „+ Neuer Eintrag“; Doppelklick auf eine Zeile = bearbeiten/löschen.
- Links: `sapplm://…` unverändert, `\\server\…` und `C:\…` als Datei-Link, `www.…` als https.
- Speichern (Strg+S): überschreibt die Datei direkt (Edge/Chrome), sonst Download. Nicht gespeicherte Änderungen
  werden im Browser zwischengespeichert und beim nächsten Öffnen angeboten.
- Aus Word übernehmen: im alten Dokument Strg+A, Strg+C, im Dialog Strg+V – Kopf, Einträge und Links.
- Aus Liste übernehmen: Daten einer gespeicherten Liste (z. B. einer älteren Version) in diese Version holen.
- Suche, Drucken/PDF (A4), neue leere Liste für ein anderes Teil.

Version: `<meta name="version" content="…">` in `Aktivitaetenliste.html`.
