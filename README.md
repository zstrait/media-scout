# Media Scout

- Media Scout is a marketplace aggregator designed to help users find physical media (vinyl, CDs, etc). <br>
- It simultaneously searches across *Discogs* and *eBay*, combining the live listings from both sites into a single cohesive interface.

### [→  Live Demo  ←](https://mediascout.netlify.app/)


https://github.com/user-attachments/assets/971af98f-1e74-4300-9d85-54f7b118d122

<img width="823" height="468" alt="titlefight" src="https://github.com/user-attachments/assets/5b5d427b-22d9-4bb4-84b0-bcda18b2ac1b" />

## Tech Stack

* Next.js (App Router)
* React
* Tailwind CSS
* Mantine UI

## Features

- **Combined Search:** 
    - Queries the Discogs and eBay APIs in parallel and merges the responses into a single list of results.
- **Favorites Watchlist:** 
    - Users can favorite listings to save them to a dedicated Watchlist page.
    - Utilizes browser LocalStorage to persist saved items across sessions without requiring user authentication.
    - Full sorting and filtering capabilities are preserved for saved listings.
- **Data Normalization:** 
    - Takes the different data formats from eBay and Discogs and converts them into a single, standard format for the frontend.
- **Filtering and Sorting:** 
    - Users can filter the combined results by media format, condition, release year, listing platform, artist, and price range.
    - Users can also sort results by Best Match / Lowest Price / Highest Price.

## Features Roadmap

- [x] ~**Favorites / Watchlist:** Use localStorage to let users save listings without needing to create an account.~
- [x] ~**Artist Filtering:** Add a filter option to only show results that match a specific artist name.~
- [ ] **Autocomplete:** Use the Discogs database API to provide a dropdown of search suggestions as the user types.
- [ ] **Accounts & Database:** Move favorites from localStorage to a PostgreSQL database, and add user logins.

## Running Locally

**1) Clone the repository**
   ```bash
   git clone https://github.com/zstrait/media-scout.git
   ```
**2) Install Dependencies**
   ```bash
   pnpm install
   ```

**3) Create a `.env.local` file in the root directory and add your API keys**
   ```js
   DISCOGS_TOKEN=your_discogs_token
EBAY_APP_ID=your_ebay_app_id
EBAY_DEV_ID=your_ebay_dev_id
EBAY_CERT_ID=your_ebay_cert_id
   ```
> NOTE: Process for obtaining API keys can be found in Discog's & eBay's developer docs

**4) Start the development server**
   ```bash
   pnpm run dev
   ```
