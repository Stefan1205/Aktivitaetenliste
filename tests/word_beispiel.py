# -*- coding: utf-8 -*-
"""Erfundene Word-Aktivitätenliste wie die Vorlage aus der Firma (ab 1.2.1):
Kopftabelle (Datum, Kunde, Teilename, OTTO FUCHS-Nr in zwei Absätzen), Aktivitäten-Tabelle mit DREI Spalten
(Datum | Aktivitäten | Bearbeiter), Datum zweistellig (TT.MM.JJ), Links als Hyperlinks im Text, Leerzeilen und
fett gesetzte Zeilen ohne Datum („war …“).  python3 tests/word_beispiel.py <ziel.docx>"""
import sys
import docx
from docx.oxml import OxmlElement
from docx.oxml.ns import qn


def link(par, url, text):
    rid = par.part.relate_to(url, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
                             is_external=True)
    h = OxmlElement("w:hyperlink")
    h.set(qn("r:id"), rid)
    r = OxmlElement("w:r")
    t = OxmlElement("w:t")
    t.text = text
    r.append(t)
    h.append(r)
    par._p.append(h)


def main(ziel):
    d = docx.Document()
    k = d.add_table(rows=2, cols=3)
    k.cell(0, 1).text = "Aktivitätenliste"
    k.cell(0, 2).text = "Seite 1 von 1\nDatum:  03.02.2025"
    k.cell(1, 0).text = "Kunde: Musterbau"
    k.cell(1, 1).text = "Teilename: Halter vorn links"
    c = k.cell(1, 2)
    c.text = "OTTO FUCHS-Nr:"
    c.add_paragraph("123456-01")
    d.add_paragraph()
    t = d.add_table(rows=1, cols=3)
    for i, h in enumerate(("Datum", "Aktivitäten", "Bearbeiter")):
        t.cell(0, i).text = h

    def zeile(datum, teile, wer, fett=False):
        r = t.add_row().cells
        r[0].text = datum
        p = r[1].paragraphs[0]
        for x in teile:
            if x == "\n":
                p = r[1].add_paragraph()
            elif isinstance(x, tuple):
                link(p, *x)
            else:
                run = p.add_run(x)
                run.bold = fett
        r[2].text = wer
    zeile("12.03.24", ["Daten erhalten, abgelegt ", ("sapplm://ectr?id=A1", "hier"), "."], "Meier")
    zeile("15.03.24", ["Angebot erstellt", "\n", "Rückfrage zum Werkstoff"], "Schulz")
    zeile("02.04.24", ["Zeichnung geändert", "\n", ("sapplm://ectr?id=B2", "Link")], "Meier")
    zeile("", [], "")
    zeile("", ["war 654321-02"], "", fett=True)
    zeile("", [], "")
    zeile("05.05.24", ["Freigabe Kunde, Ablage ", ("sapplm://ectr?id=C3", "hier")], "Schulz")
    zeile("", [], "")
    d.save(ziel)


if __name__ == "__main__":
    main(sys.argv[1])
