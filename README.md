# data-discovery-dashboard
a simple dashboard with table, pagination, and more...
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
### INSTRUCTIONS ###

# Company Privacy List Dashboard

A data table interface for managing company information with search filtering, pagination, bulk actions, and mock API integration.

## Features
- **Search filter**: Filter companies by name, industry, or location.
- **Bulk deletion**: Select multiple companies to delete using checkboxes.
- **Row actions**: Individual row actions (e.g., delete) available via an ellipsis (`...`) button.
- **Pagination**: Paginate through the table and set the number of items displayed per page.
- **Mock API**: Simulated API calls for fetching and deleting data.

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd <directory>
```

### 2. Install Dependencies
```bash
npm install
```


### 3. EnvironmentVariables
```bash
touch .env.local
```

### 4. Add the followibng environment variables
# API Base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

# Mock database URL
DATABASE_URL="file:./db.json"

### 4. Run the app
```bash
npm run dev  # Start Next.js app
npm run mock-data  # Start mock JSON server
```

## Enjoy :)


# submitted by: https://www.wenziequerubin.com/
