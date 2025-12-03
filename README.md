# Mini CRM Dashboard

A simple Client Management dashboard built to demonstrate **Redux Toolkit Query**, **TypeScript**, and **Tailwind CSS**.

## Tech Stack
*   React + TypeScript (Vite)
*   Redux Toolkit & RTK Query (State Management)
*   Tailwind CSS (Styling)

## Setup & Run

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Configure API**

      **API URL(endpoint URL from MockAPI):** `https://692683fa26e7e41498fa8958.mockapi.io/api/v1/`

      **OR**
    
    *   Create a free project at [MockAPI.io](https://mockapi.io).
    *   Create a resource named `clients` with fields: `name`, `email`, `company`.
    *   Open `src/services/clientsApi.ts` and paste your API URL into `baseUrl`.

4.  **Start the server**
    ```bash
    npm run dev
    ```
