# Mega auf dem iPhone

Installierbare Web-App mit tatsächlicher lokaler KI-Berechnung per WebGPU. Eigene Gespräche mit Mega A und Mega B, gemeinsamer Teamkanal und optionale Dorian-Rolle. Der Windows-PC muss bei der Nutzung nicht laufen. Keine Cloud-Inferenz, kein Ollama auf dem iPhone, keine kostenpflichtige API.

## Installation auf dem iPhone 16 Pro

1. Die veröffentlichte HTTPS-Seite in **Safari** öffnen.
2. **Teilen → Zum Home-Bildschirm → Hinzufügen**. Mega danach über dieses Symbol starten.
3. Unter **Modell** das **Textmodell jetzt herunterladen / ergänzen** wählen. WLAN verwenden und die App im Vordergrund lassen. Download ungefähr 1–1,5 GB.
4. Für Bilder zusätzlich **Bildmodell jetzt herunterladen / ergänzen** wählen (ungefähr 500–550 MB).
5. Unter **Chat** Mega A oder Mega B wählen und schreiben. Über **＋** ein PNG/JPEG hinzufügen.
6. Für den Offline-Nachweis: Flugmodus einschalten, WLAN ausschalten, App neu öffnen, Texttest unter **Modell** ausführen und einen neuen Bildauftrag senden.

Die erste Installation und Modelleinrichtung brauchen Internet. Danach werden Berechnungen lokal ausgeführt. Browserdaten können durch iOS bei Speichermangel oder durch Löschen der Website-Daten entfernt werden. Deshalb ist eine dauerhaft erhaltene einmalige Installation nicht garantiert. Sicherungen regelmäßig über **Modell → Chats, Dateien und Aufgaben exportieren** speichern. Privates Surfen vermeiden. Dieses Paket ist eine PWA, keine native IPA-Datei und keine App-Store-Veröffentlichung. Die konkrete iPhone-Ausführung muss am tatsächlichen Gerät bestätigt werden.

## Teamaufgabe

Unter **Team** Aufgabe und Erfolgskriterien eintragen, Dateien auswählen und **Team starten**. Für Zusammenarbeit ohne Störrolle Dorian ausschalten. Die Bots verwenden dasselbe Textmodell und dieselben Parameter, haben getrennte Kontexte und werden nacheinander aufgerufen. Eindeutige Nachrichten werden jedem anderen Agenten einmal zugestellt. Kurze Nachrichten und echte Werkzeugergebnisse sind sichtbar.

Beispielauftrag ohne Upload:

> Erstellt gemeinsam die Datei Ergebnis.md mit dem Text „Guten Tag“. Mega A soll die Datei mit write erstellen. Mega B soll sie mit read öffnen und den Inhalt prüfen. Tauscht dazu Nachrichten aus. Reicht danach beide mit submit=true ein.

Erfolgskriterium: Ergebnis.md existiert, enthält „Guten Tag“, und Mega B hat ein echtes read-Ergebnis gesehen. Standardmäßig bestätigt der Nutzer das Ergebnis. Alternativ vorab **Feste Dateiprüfungen** auswählen und beispielsweise eintragen:

```json
[{"kind":"contains","path":"Ergebnis.md","expected":"Guten Tag"}]
```

Agenten besitzen kein Werkzeug für Erfolg, Belohnungen oder Änderungen der Kriterien. Prüfungen sind ausschließlich deklarative Datei-/Text-/JSON-Vergleiche; kein hochgeladener Testcode wird ausgeführt. Die RAM-Belohnung wird nach bestätigtem Erfolg gleichzeitig in Kopien aller Agentenkontexte eingefügt. Keine Speicherung/Exports des Inhalts, keine Werkzeugaktionen daraus. Das ist eine Ablaufmechanik, kein Training der Modellgewichte. Optionale Reaktionsaufrufe sind nicht implementiert.

Es gibt auf Nutzerwunsch keine automatischen Runden-, Fehler- oder Zeitbudget-Abbrüche. **Pause**, **Fortsetzen** und **Abbruch** bleiben verfügbar. Einzelne Modellantworten haben ein technisches Zeitlimit von 180 Sekunden, Downloads von 15 Minuten. Ein Fehler gibt keine zusätzlichen Rechte. App-Wechsel pausiert Teamarbeit; iOS-Hintergrundausführung wird nicht garantiert. Nach Neustart keine automatische Fortsetzung.

## Dateien und Grenzen

Alle Arbeitskopien und Originaldaten liegen in IndexedDB auf dem Gerät. Agenten können nur den virtuellen Aufgabenordner bearbeiten. Schreiboperationen sind serialisiert und prüfen SHA256-Versionen. Versionen, Papierkorb, Wiederherstellung sowie Einzel-/ZIP-Download sind vorhanden. Kein Zugriff auf Hostordner, keine Host-Shell, keine Code-/Makroausführung, keine Webseitenrecherche.

- TXT, Markdown, CSV, JSON und Quellcode: abschnittsweise lesen, suchen und schreiben.
- DOCX: Text lesen und eindeutige Stellen innerhalb eines Text-Runs ersetzen. Andere ZIP-Teile bleiben erhalten; komplexe Änderungen über mehrere Runs werden mit Fehler abgelehnt. Einfache neue DOCX möglich.
- XLSX: vorhandene Zellen lesen/bearbeiten. Formeln bleiben geschützt, Änderungen benötigen ein explizites Werkzeugargument. Keine Formelneuberechnung, keine neue komplexe Tabellenstruktur.
- PDF: Textextraktion bis 50 Seiten; einfache neue PDFs. Kein layouttreues PDF-Editing, keine OCR. Fehlender Text wird gemeldet.
- PNG/JPEG: lokale Vorschau und Bildmodell. Keine Skripte, aktiven HTML-Vorschauen oder Bildübermittlung.

8 MB je Datei, Bildkopie höchstens 512 Pixel. Office-ZIPs werden beim Entpacken begrenzt. Das Bildmodell liefert eine kurze englische Beschreibung; das Textmodell antwortet auf Deutsch anhand dieser ausdrücklich gekennzeichneten, möglicherweise fehlerhaften Beschreibung. Kleine Schrift und komplexe Diagramme sind nicht zuverlässig. Das ist kein Ersatz für ein größeres multimodales Modell. Kontextkürzung nutzt gekennzeichnete Auszüge, keine garantierte vollständige Erinnerung.

Die Dorian-Anweisung erhält nur Dorian. Gleiche Werkzeuge und Dateirechte wie A/B. Dass die Rolle geheim bleibt oder sabotiert wird, lässt sich nicht garantieren. Inhaltliche Regeln sind im Prompt und durch eine begrenzte lokale Musterprüfung hinterlegt; eine vollständige zuverlässige Inhaltsmoderation wird damit nicht garantiert.

## Architektur

`main.tsx` Oberfläche → `runtime.ts` Teamsteuerung → `broker.mjs` Einmalzustellung/getrennte Kontexte → `engine.ts` Modellwechsel, Streaming und Abbruch → Text-/Vision-WebWorker. Werkzeuge und Versionsprüfung in `core.mjs`, Dokumentoperationen in `documents.ts`. `storage.ts` serialisiert IndexedDB-Speicherung. `reward.mjs` erzeugt ausschließlich RAM-Kontextkopien nach bestätigtem Erfolg.

Ein Textmodell liegt zur Zeit im Speicher; Bildanalyse und Textantwort laufen nacheinander. Qwen2.5-1.5B-Instruct q4f16, Kontext 4096, temperature 0.3, top_p 0.9, identisch für alle Bots. SmolVLM-256M FP16 über Transformers.js. Download-Freigabe im Worker beschränkt externe Zugriffe auf feste Modellanbieter; sonst werden externe Worker-Anfragen technisch abgelehnt. Kein Analytics, keine Kontoanmeldung und keine API-Schlüssel. GitHub Pages liefert statische App-Dateien; Modelle kommen bei ausdrücklich gestartetem Download von Hugging Face/MLC. Gespräche und Bilder werden nicht als Netzwerkanfragen versendet.

## Auf Windows bauen

Node.js 22 oder neuer und pnpm verwenden:

```powershell
pnpm install --frozen-lockfile
pnpm test
pnpm build
```

Falls pnpm ausschließlich ignorierte Buildskripte meldet: keine ONNX-Node-Binaries installieren; dieses Projekt verwendet ausschließlich Browserinferenz. Die Paketinstallation kann trotzdem bereits abgeschlossen sein. Vite benötigt das normale offizielle esbuild-Paket des jeweiligen Systems.

`dist` enthält die fertige statische Seite. Für die PC-Vorschau:

```powershell
python -m http.server 8770 --bind 127.0.0.1 --directory dist
```

Dann http://127.0.0.1:8770 öffnen. Diese Adresse ist nur auf dem PC erreichbar. Für iPhone-Installation ist HTTPS nötig, z. B. GitHub Pages. `dist` ohne private Daten veröffentlichen, `.nojekyll` beibehalten. Keine Modelle oder Chats in das Repository hochladen. Das Quellpaket enthält keine Geheimnisse und keine Modelldateien.

## Lizenzen und offizielle Grundlagen

Eigener App-Code MIT, Modelle und Bibliotheken nach ihren jeweiligen Lizenzen. Vollständige Paketlizenztexte in `public/THIRD_PARTY_NOTICES.txt` bzw. auf der veröffentlichten Seite. Transformers.js 3.7.1 entspricht dem offiziellen SmolVLM-WebGPU-Beispiel; ein Test mit 4.3.1 lieferte fehlerhafte Bildausgaben.

- [WebKit: Safari 26 / WebGPU](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)
- [WebLLM](https://github.com/mlc-ai/web-llm)
- [Offizielles SmolVLM-WebGPU-Beispiel](https://github.com/huggingface/transformers.js-examples/tree/main/smolvlm-webgpu)
- [SmolVLM-Modell und Apache-2.0-Lizenz](https://huggingface.co/HuggingFaceTB/SmolVLM-256M-Instruct)
- [Qwen2.5-1.5B](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct)

Die mobile App ergänzt die bestehende Windows-Ausgabe. Sie übernimmt weder deren Ollama-Modell noch alte SQLite-Aufgaben automatisch und unterstützt keine Container-Codeausführung auf iOS.

