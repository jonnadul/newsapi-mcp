# NewsAPI MCP Server

_Note this service was 100% vibecoded using Copilot Agent!_

A TypeScript-based Model Context Protocol (MCP) server for integrating with NewsAPI, enabling seamless access to global news articles, headlines, and sources through MCP-compatible applications.


## Features

This MCP server provides three main tools for interacting with NewsAPI:

### 1. **search_articles**
Search for news articles by keyword or phrase with options to:
- Filter by language
- Sort results (by relevancy, popularity, or publication date)
- Control pagination

### 2. **get_top_headlines**
Fetch top headlines from specific countries or categories:
- Filter by country (using ISO country codes)
- Filter by category (business, entertainment, general, health, science, sports, technology)
- Customizable page size

### 3. **get_sources**
Discover available news sources with optional filtering by:
- Category
- Country

## Setup

### Prerequisites

- Node.js 16 or higher
- npm (comes with Node.js)
- A NewsAPI API key (get one free at [https://newsapi.org](https://newsapi.org))

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd newsapi-mcp
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the TypeScript code:
   ```bash
   npm run build
   ```

### Configuration

1. Set your NewsAPI key as an environment variable:

   **On Windows:**
   ```powershell
   $env:NEWS_API_KEY="your-newsapi-key-here"
   ```

   **On macOS/Linux:**
   ```bash
   export NEWS_API_KEY="your-newsapi-key-here"
   ```

2. Or create a `.env` file in the project root (if using dotenv):
   ```
   NEWS_API_KEY=your-newsapi-key-here
   ```

## Usage

### With Claude Desktop

1. Update your Claude Desktop configuration file:

   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   
   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

2. Add the NewsAPI server configuration:
   ```json
   {
     "mcpServers": {
       "newsapi": {
         "command": "node",
         "args": ["/absolute/path/to/newsapi-mcp/build/index.js"],
         "env": {
           "NEWS_API_KEY": "your-newsapi-key"
         }
       }
     }
   }
   ```

3. Restart Claude Desktop

### With MCP Inspector

Test the server using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node ./build/index.js
```

Make sure `NEWS_API_KEY` is set before running.

## Tool Details

### search_articles

Search for news articles by keyword.

**Parameters:**
- `q` (required): Search keywords or phrase
- `sortBy` (optional): Sort order - `relevancy`, `popularity`, or `publishedAt` (default: `publishedAt`)
- `language` (optional): Language code like 'en', 'es', 'fr' (default: 'en')
- `pageSize` (optional): Number of articles to return, 1-100 (default: 10)

**Example:**
```
"Find articles about artificial intelligence sorted by popularity"
```

### get_top_headlines

Get top headlines from a specific country or category.

**Parameters:**
- `country` (optional): Two-letter ISO country code like 'us', 'gb', 'de' (default: 'us')
- `category` (optional): One of: business, entertainment, general, health, science, sports, technology
- `pageSize` (optional): Number of articles to return, 1-100 (default: 10)

**Example:**
```
"Get top technology headlines from the UK"
```

### get_sources

Get available news sources with optional filtering.

**Parameters:**
- `category` (optional): Filter by category
- `country` (optional): Filter by country code

**Example:**
```
"Show me all technology news sources"
```

## Development

### Build
```bash
npm run build
```

### Run in development mode
```bash
npm run dev
```

### Project Structure
```
newsapi-mcp/
├── src/
│   └── index.ts          # Main server implementation
├── build/                # Compiled JavaScript (after build)
├── .vscode/
│   └── mcp.json         # MCP configuration
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

## Environment Variables

- `NEWS_API_KEY` (required): Your NewsAPI API key from https://newsapi.org

## API Documentation

For more information about the NewsAPI endpoints and parameters, visit:
https://newsapi.org/docs

## Troubleshooting

### "NEWS_API_KEY environment variable is not set"
Make sure you have set the `NEWS_API_KEY` environment variable with a valid NewsAPI key.

### "Error fetching headlines"
Check that:
1. Your API key is valid
2. Your API key has not exceeded its usage limit
3. The parameters you're using are valid (valid country/category codes)

### Connection refused
Ensure the server has been built:
```bash
npm run build
```

And make sure you're using the correct absolute path in your configuration.

## License

MIT

## Support

For issues with the MCP server, file an issue in the repository.
For questions about NewsAPI, visit: https://newsapi.org/docs
