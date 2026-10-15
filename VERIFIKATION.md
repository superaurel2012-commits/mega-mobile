# Teststand – 15. Oktober 2026

Die Tests liefen auf Windows im Browser mit WebGPU, nicht auf einem echten iPhone. Der angefragte Safari-/iPhone-Test ist durch einen schmalen Browserausschnitt nicht ersetzt. Die bestehende Windows-Ausgabe wurde für diese mobile Erweiterung nicht verändert.

## Bestanden

- TypeScript-Typprüfung und Produktionsbuild mit Vite.
- 16 automatische Prüfungen: Pfadgrenzen/Windows-Sondernamen, Dateitypen, SHA256, Originalschutz, Rechte aller drei Agenten, gleichzeitige Schreibversuche, Versionskonflikte, Papierkorb/Wiederherstellung, ZIP-Export, feste Datei-/JSON-Prüfung, getrennte Kontexte/Einmalzustellung, Kennzeichnung von Werkzeugdaten, Kontextkürzung, Antwortnormalisierung/Abweisung unvollständiger Aktionen und RAM-Belohnungsfreigabe ohne Taskexport.
- Tatsächlicher Download und Betrieb des Qwen-Textmodells im Browser. Mega A merkte sich „Komet“, Mega B „Leuchtturm“; Mega A beantwortete die Rückfrage im eigenen Chat wieder mit „Komet“. Drei echte getrennte Aufrufe, keine simulierte Unterhaltung.
- Tatsächlicher Download/Laden des FP16-Bildmodells sowie Laden aus dem Cache bei gesperrten externen Worker-Anfragen.
- Tatsächliche Bildverarbeitung eines lokalen Testbilds mit Kreis und Quadrat. Beide Formen wurden erkannt. Die Modellaussage, beide hätten dieselbe Farbe, war falsch. Diese Qualitätsgrenze bleibt ausdrücklich bestehen.
- Tatsächliche Team-Modellaufrufe mit wechselseitiger Nachrichtenübergabe. Mega A erzeugte einen Schreibaufruf; die Steuerung erstellte Ergebnis.md mit „Guten Tag“ und protokollierte Werkzeug, Agent und SHA256-Version. Mega B erhielt das Werkzeugergebnis und antwortete in seinem eigenen Aufruf.
- Manuelles Übergeben eines laufenden eigenen Testauftrags an die unabhängige Prüfung, Beenden laufender Modellarbeit, Neustart ohne automatische Fortsetzung sowie Rückgabe mit Feedback über die Oberfläche.

## Qualität und offene Gerätetests

- Das kleine Textmodell plant Werkzeuge unzuverlässig. Es kann eine Aktion nur ankündigen oder fehlerhaft strukturieren. Eine Nachricht gilt deshalb nie als Werkzeugnachweis. Bei mehreren ausgegebenen Schritten wird höchstens der erste verarbeitet; weitere Agenten haben eigene Modellaufrufe. Ein gültiger strukturierter Einzelschritt beendet die zugehörige Generierung regulär.
- Ein zuverlässiger vollautomatischer Abschluss beliebiger Teamaufgaben ist nicht nachgewiesen. Menschliches Feedback und unabhängige Dateiprüfung bleiben nötig. Die vorhandenen Rückgabe-/Prüfbuttons sind echte Steuerungsaktionen.
- Bildausgaben können sachlich falsch sein, auch wenn das Modell technisch korrekt läuft. Das Modell ist hauptsächlich englischsprachig; die deutsche Antwort entsteht aus einer sichtbar gekennzeichneten lokalen Beschreibung.
- Transformers.js 4.3.1 lieferte im Test unbrauchbare Bildausgaben. Die Auslieferung verwendet 3.7.1 entsprechend dem offiziellen SmolVLM-WebGPU-Beispiel. Die getesteten FP16-Gewichte sind keine bloße Platzhalterdatei.
- Noch auf dem tatsächlichen iPhone zu prüfen: erfolgreicher Download beider Modelle in der installierten PWA, Flugmodus-Neustart, Text- und Bildantworten ohne Netz, Geschwindigkeit, Erwärmung, Speicherdruck und längere Teamdurchläufe.
- Keine umfassende Layoutprüfung komplexer DOCX/XLSX/PDF-Dateien. Unterstützte Bearbeitungsoperationen und Formatgrenzen stehen in der README. Kein OCR, keine lokale Codeausführungs-Sandbox, keine Webseitenrecherche und keine Sprachausgabe in dieser mobilen Ausgabe.
- Reale Netztrennung des gesamten iPhones ist vom PC aus nicht bestätigt. Cache-Nutzung und die Sperre externer Worker-Anfragen ersetzen diesen Gerätetest nicht. iOS kann lokale Daten entfernen; eine dauerhaft unveränderliche einmalige Installation wird nicht garantiert.

Die Quellcode- und App-Pakete enthalten keine Modelldateien, Chats, hochgeladenen Benutzerdateien, Bilder oder Belohnungen. Der Quellcode nutzt eine ausdrückliche Dateiliste für die Paketierung.
