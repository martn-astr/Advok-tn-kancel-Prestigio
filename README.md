# Advokátní kancelář Prestigio — Frontend (statická stránka)

📋 Stručný přehled

Tento repozitář obsahuje jednoduchou statickou prezentační stránku (HTML/CSS/JS) pro modelovou advokátní kancelář "Prestigio". Hlavní soubory jsou:
- `index.html` — hlavní struktura webu
- `stylesheet.css` — veškeré styly a design
- `script.js` — JavaScript pro interakce a UI animace

⚙️ Požadavky

- Jde o čistě statický projekt (HTML/CSS/JS). Nepotřebuje backend.
- Doporučeno: moderní prohlížeč (Chrome, Edge, Firefox) a editor jako VS Code nebo jiný.
- Pro lokální testování je pohodlné mít Python nebo Node (volitelné): viz níže.

🚀 Jak spustit lokálně

1) Doporučená metoda — VS Code + Live Server Plugin
- Otevřete workspace v VS Code
- Pravým klikem na `index.html` → "Open with Live Server"

2) Bez nástrojů (Python 3) — jednoduchý server
- Otevřete PowerShell v kořenové složce projektu a spusťte:

```powershell
python -m http.server 8000
```

- Otevřete v prohlížeči: http://localhost:8000

3) Alternativně (Node):
- Použijte `http-server` nebo `serve` z `npx`:

```powershell
npx http-server -p 8080
# nebo
npx serve -s . -l 8080
```

🗂️ Struktura projektu

- `index.html` – hlavní markup
  - Sekce: hero, about, services, practice, team, testimonials, pricing, FAQ, dodatky
  - Ve spodní části je volání `script.js`:
    ```html
    <script src="script.js"></script>
    ```
- `stylesheet.css` – kompletní design
  - Obsahuje CSS proměnné, breakpoints, animace, a speciální styles pro avatary a ribbon
- `script.js` – všechny skripty
  - Obsahuje: hamburger toggle, reveal-on-scroll, animace čísel, split-text reveal, a syncAvatarSize

📸 Jak spravovat fotografie členů týmu

- Umístěte fotky do složky `images/` (doporučeno) nebo do root projektu.
- V `index.html` aktualizujte `src` atribut v avataru konkrétního člena, např.:
  ```html
  <img src="images/matthew.jpg" alt="Matthew Richards">
  ```
- Avatar kontrast a formát: doporučujeme portrétní poměr (např. 3:5). CSS používá `object-fit: cover`. 

🛠️ Jak upravit "Dodělává se" ribbon (Marco Deluca)

- Upravení textu:
  - V `index.html` najděte element:
    ```html
    <span class="avatar-ribbon" aria-hidden="true">Dodělává se</span>
    ```
  - Změňte text přímo na libovolné jiné (např. "V úpravě" nebo "Brzy")

- Změna barvy, velikosti nebo rotace:
  - V `stylesheet.css` najděte `.avatar .avatar-ribbon` a změňte:
    - `background: var(--gold);` — barva pásky
    - `color: #0b0b0b;` — barva textu
    - `transform: translate(-50%, -50%) rotate(-45deg);` — úhel rotace (např. `-35deg`)
    - `font-size: 18px;` — velikost textu

- Rozšíření pásky na ostatní členy: zkopírujte element `.avatar-ribbon` do dalších `.avatar` kontejnerů.

♿ Přístupnost (Accessibility)

- Vždy vyplňujte `alt` atribut u `<img>` — např. `alt="Matthew Richards"`.
- Elementy s dekorativními texty (pásky) mají `aria-hidden="true"`, protože jsou vizuální dekorací.
- Pro důležité informace, které mají být čteny asistivními technologiemi, přidejte `aria-label` na rodičovský element.

🧭 Co projekt implementuje (rychlý přehled)

- Reveal on scroll: `.reveal` elementy se animují při přiblížení.
- Split-text animation pro vybrané titulky (animuje jednotlivé znaky).
- Synchronizace rozměru avataru: `syncAvatarSize()` měří nejdelší jméno a upravuje velikost avatara.
- Avatar placeholder a diagonal ribbon pro stav členů týmu.
- AnimateCount: počítadlo statistik v headeru.

🔧 Tipy a časté úpravy

- Chcete přidat nové člena týmu:
  - Zkopírujte `.member` blok v `index.html`, upravte jméno, telefon a avatar.
- Změna základních barev: upravte proměnné v `:root { --gold, --text, --muted-text }` v `stylesheet.css`.
- Optimalizace obrázků: pro rychlé načítání použijte optimalizované JPEG/WEBP a `loading="lazy"`.

🐞 Debugging (co zkontrolovat)

- Pokud se JS chová zvláštně, zkontrolujte ve vývojářských nástrojích (F12), zda nehlásí chyby.
- Pokud se CSS nezobrazuje aktualizovaně, udělejte hard refresh (Ctrl+F5) nebo vymažte cache.
- Pokud `script.js` nefunguje, ověřte, že `<script src="script.js"></script>` je na konci `index.html` těsně před `</body>`.

📦 Další nápady / rozšíření

- Iniciály fallback: doplnit JS, který zobrazí iniciály jména v `.avatar` pokud není obrázek přítomen.
- Upload foto preview: přidat jednoduché client-side nahrávání a preview pro admin rozhraní (mimo rozsah této statické verze).
- Internationalizace (i18n): pro vícejazyčnou verzi by bylo vhodné oddělit text do JSON souborů a načítat podle jazykové volby.

💬 Přispívání

- Klidně upravujte HTML/CSS/JS a posílejte PR. Pokud chceš, můžeme přidat jednoduchý CONTRIBUTING.md s konvencemi.

---

Pokud chceš, můžu přidat:
- implementaci initials fallbacku (JS),
- upload/preview pro avatary,
- přesun `script.js` do podsložky `scripts/` (a aktualizovat importy),
- nebo menší UX/kosmetické úpravy (úhel a barva ribbonu apod.)

Napiš, co chceš dál a já to ihned doplním.