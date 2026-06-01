This is a project for SMO of Informatics, Burapha University.
## Tech Stack
- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites
- **Node.js**: >= 22
- **npm**: >= 10

### Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/TAHPAPANGKORN/checkShirtForInformatics.git
    cd checkShirtForInformatics
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Copy the .env.example to .env:**
    ```bash
    cp .env.example .env
    ```
    - This project use **[Opensheet](https://github.com/benborgers/opensheet#readme)** for api
        ```env file
        SHEET_API_URL=https://opensheet.elk.sh/"SHEET_ID"/"SHEET_NAME"
        ```

4. Start development
    ```bash
    npm run dev
    ```

## File Structure
```
├── app
│   ├── api
│   │   └── search
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── ui
│   │   ├── ButtonContact.tsx
│   │   ├── ButtonSearch.tsx
│   │   ├── ButtonShare.tsx
│   │   ├── ButtonSlip.tsx
│   │   └── input.tsx
│   └── Footer.tsx
└── types
    └── student.ts
```
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Developers
- **[Papangkorn Pitjawong](https://github.com/TAHPAPANGKORN)** & **[Jatenipat Chanapisitthi](https://github.com/JatenipatChanapisitthi)** @[FTGFLabs](https://github.com/ftgflabs)
