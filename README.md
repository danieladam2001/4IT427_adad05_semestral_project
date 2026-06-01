# LLM Prompt Optimization Dashboard

Jedná se o minimalistický dashboard navržený pro vizualizaci, analýzu a vyhodnocování automatického procesu optimalizace textových promptů (Prompt Engineering Pipeline). Aplikace umožňuje přehledně sledovat evoluci promptů napříč jednotlivými optimalizačními kroky, porovnávat metriky kandidátů a sledovat přesné textové rozdíly (Diff) mezi jednou z akutálních verzí promptu a předchozí (vítěznou) verzí.

## Klíčové vlastnosti

- **Asynchronní Pipeline architektura:** Data jsou načítána z externího JSON souboru simulujícího data fetching.
- **Inteligentní srovnání metrik:** Automatické zvýraznění nejlepších dosažených výsledků v iteraci (správně rozděluje mezi metrikami, které potřebují maximalizovat, a těmi, které potřebují minimalizovat).
- **Inline Textový Diff:** Vizuální porovnání změn slov mezi vybraným kandidátem a jeho rodičovským promptem (knihovna `react-diff-viewer-continued`).

## Technologie

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Data Fetching & Caching:** TanStack React Query
- **Routing:** React Router DOM
- **Testování:** Vitest

## Instalace a zprovoznění

Pro lokální spuštění projektu na svém počítači postupujte podle následujících kroků.

### 1. Klonování repozitáře
```bash
git clone https://github.com/danieladam2001/4IT427_adad05_semestral_project.git
cd 4IT427_adad05_semestral_project
```

### 2. Instalace závislostí

Aplikace využívá standardní balíčkovací manažer `npm`.

```bash
npm install
```

### 3. Spuštění vývojového serveru

Spustí lokální server (zpravidla na `http://localhost:5173`).

```bash
npm run dev
```

## Spuštění automatických testů

Projekt obsahuje testovací sadu rozdělenou na jednotkové testy logiky a integrační testy komponent. Jednorázové spuštění všech testů.

```bash
npx vitest run
```

### Struktura testů:

* `src/utils/pipelineUtils.test.ts`: **Unit test** pomocné funkce. Ověřuje správnost logiky vyhledávání maximálních (např. accuracy, precision) a minimálních (avg_latency_ms) hodnot v rámci jedné iterace promptů.
* `src/components/PromptCard.test.tsx`: **Integrační test** PromptCard komponenty. Simuluje interakci uživatele, kontroluje propagaci událostí a vykreslování stavů (vítěžná badge, šipky u nejlepších metrik).

## Struktura projektu

```text
├── src/
│   ├── components/        # Znovupoužitelné UI komponenty (PromptCard, IterationCard, InitialCard)
│   ├── context/           # Globální sdílení stavu včetně funkce pro fetching dat (datová pipeline)
│   ├── pages/             # Stránky reprezentující jednotlivé routy (InitPage, IterationPage)
│   ├── types/             # Definování TypeScript interface (pipeline.types.ts)
│   ├── utils/             # Pomocné funkce (pipelineUtils.ts)
│   ├── App.tsx            # Kořenová komponenta s definicí rout
│   └── main.tsx           # Hlavní soubor (PipelineProvider, BrowserRouter, QueryClientProvider)
├── public/
│   └── pipeline.json      # Datová pipeline ve formátu JSON
└── README.md              # Dokumentace projektu
