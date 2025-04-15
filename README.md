# Historische Koch- und Esswerkzeuge

Eine interaktive Webanwendung zur Erkundung historischer Küchen- und Essutensilien, basierend auf Daten aus der [Europeana](https://www.europeana.eu/de) API.

## 🔍 Funktionen

- Durchsuchbare Sammlung historischer Küchenobjekte
- Filterung nach Objekttypen wie Löffel, Gabel, Messer etc.
- Detailansicht mit Bild, Beschreibung, Zeitangabe und Quelle

- Durchsuchbare Sammlung historischer Küchenobjekte
- Filterbare Ergebnisse nach:
  - Zeitperiode
  - Institution
  - Lizenztyp (Creative Commons, Public Domain etc.)
- Detailansicht mit:
  - Bild des Objekts (mit Fallback)
  - Beschreibung, Thema, Typ, Land, Jahr, Veröffentlichungsdatum
  - Originalquelle & Lizenzinformationen
- Lizenzanzeige mit offiziellen Creative Commons Icons und Tooltip
  - Tooltip zeigt Beschreibung, Lizenztyp und Link zur Lizenzseite

## 🧑‍💻 Technologien

- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) für Dropdown-Komponenten
- [Europeana Record- & Search-API](https://europeana.atlassian.net/wiki/spaces/EF/pages/2385674279/Europeana+APIs)

## 🚀 Entwicklung starten

```bash
npm install
npm run dev
```

## 🔐 API-Schlüssel

Erstelle eine `.env.local` Datei mit deinem Europeana API-Key:

```env
NEXT_PUBLIC_EUROPEANA_API_KEY=dein_api_key
```

## 📜 Lizenz

Dieses Projekt basiert auf öffentlichen Daten der Europeana und dient Bildungs- und Demonstrationszwecken. Die Lizenzinformationen zu den einzelnen Objekten stammen aus den Metadaten von Europeana und werden visuell entsprechend dargestellt.

---
