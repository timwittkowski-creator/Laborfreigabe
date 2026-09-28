# Mission Laborfreigabe

Browserbasiertes Chemie-Lernspiel mit zehn Stationen zu Sicherheitsregeln, Sicherheitseinrichtungen, GHS, Gefahrstoffkennzeichnung und Quellenprüfung.

[Spiel öffnen](https://timwittkowski-creator.github.io/Laborfreigabe/)

## Start und Voraussetzungen

Online den Link oben öffnen. Offline das **gesamte Repository** über „Code → Download ZIP“ herunterladen, entpacken und `index.html` öffnen. HTML, CSS, JavaScript und der Ordner `assets/` müssen zusammenbleiben. Es handelt sich nicht um eine Einzeldatei mit eingebetteten Bildern. JavaScript muss aktiviert sein.

Benötigt werden die zur Aufgabenfassung passenden Buchseiten 12–15, Papier und Stift. **Buchtitel, Verlag, Ausgabe und ISBN sind noch nicht dokumentiert.** Die Lehrkraft muss die passende Ausgabe und alle Seitenbezüge vor dem Einsatz prüfen. Ohne dieses Buch ist das Spiel derzeit nicht vollständig eigenständig nutzbar.

Die Recherche auf der Herstellerseite benötigt Internet; Station 7 bietet eine vollständige Ersatzkarte. Bei ihrer Verwendung entfällt die eigenständige Prüfung des aktuellen Herstellerdokuments. Dokumentdatum und Abrufdatum dürfen dann nicht erfunden werden.

## Unterricht

Gedacht für Lerngruppen beim Einstieg in die Sicherheit im Chemieunterricht; Klassenstufe und sprachliche Anforderungen sind von der Lehrkraft festzulegen. Zeitansatz: 60–80 Minuten einschließlich Besprechung, gegebenenfalls auf zwei Stunden verteilen.

Lernziele: Regeln begründen, Sicherheitseinrichtungen im eigenen Raum finden, Piktogramme unterscheiden, H- und P-Hinweise zuordnen und Herstellerquellen prüfen. In Teams die Rollen Suchen/Notieren/Prüfen nach jeder Station wechseln. Zwei gestufte Hinweise unterstützen ohne Zeitstrafe.

- [Begleitblatt zum Ausdrucken](begleitblatt.html): Antwort, Fundstelle und Begründung je Station.
- [Hinweise und Erwartungshorizont für Lehrkräfte](LEHRKRAFT.md).
- Gelöste Stationen können auf dem Codezettel aufgeklappt und nachgelesen werden.

Das Spiel prüft Begriffe und Codes, **nicht** die Qualität der Begründungen oder praktische Handlungskompetenz. Die Codeziffern sind kein benotbarer Kompetenznachweis. Es ersetzt keine Sicherheitsunterweisung und keine Freigabe für echte Versuche.

## Fortsetzen

„Schon angefangen? Mit eurem Code weiterspielen“ öffnen und die gesammelten Ziffern in Stationsreihenfolge eingeben. Leerzeichen und Bindestriche sind sowohl beim Wiedereinstieg als auch beim Abschluss erlaubt. Ein kürzerer Code verlangt vor dem Zurücksetzen eine Bestätigung.

Es gibt kein Konto und keine dauerhafte Speicherung. Vor dem Schließen die Ziffern notieren. Der Wiedereinstieg funktioniert auf anderen Geräten mit derselben Spielversion. Alle Antworten und Ziffern sind im Quelltext einsehbar: Der Code ist eine Lernhilfe, kein Zugangsschutz.

## Quellen und Nutzungsrechte

Siehe [QUELLEN.md](QUELLEN.md) für alle Assets, externe Quellen und offene Herkunftsnachweise. Es werden keine externen Schriftarten, Bibliotheken, Analysewerkzeuge oder Bilder geladen. Die Illustrationen sind als KI-generiert gekennzeichnet und dienen nicht als fachliche Sicherheitsdarstellungen.

**Eine allgemeine Lizenz zur Weiterverwendung ist noch nicht festgelegt.** Öffentliche Sichtbarkeit auf GitHub ist keine pauschale Nutzungserlaubnis. Vor einer Lizenzvergabe sind Herkunft und Rechte an Texten und Bildern zu klären. Schulbuchseiten sind nicht Bestandteil dieses Repositorys.

## Pflege und Prüfung

Änderungen an `inhalte.js` betreffen Aufgaben und Lösungen; `antworten.js` enthält die Eingabeprüfung, `spiel.js` die Darstellung. Das Spiel ist bereits über GitHub Pages veröffentlicht. Änderungen erst nach Prüfung in den veröffentlichten Branch übernehmen. Bei einem Update den gesamten zusammengehörenden Dateisatz verwenden.

Mit Node.js: `node --test tests/antworten.test.cjs`. Die Tests prüfen Antwortvarianten, Codepräfixe, Trennzeichen, ungültige Codes und die Vollständigkeit der Ersatzkarte. Zusätzlich vor Unterrichtseinsatz Tastaturbedienung, das Schulgerät und Herstellerlink prüfen.
