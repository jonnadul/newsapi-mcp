# NewsAPI MCP Server Development

This is a TypeScript-based Model Context Protocol (MCP) server for interacting with NewsAPI. The server exposes tools for searching articles, getting top headlines, and discovering news sources.

## Project Setup Progress

- [x] Create project structure
- [x] Set up TypeScript configuration
- [x] Create package.json with dependencies
- [x] Implement main server with three tools:
  - search_articles: Search news by keywords
  - get_top_headlines: Get top headlines by country/category
  - get_sources: Discover available news sources
- [x] Create MCP configuration file
- [x] Create comprehensive README with setup and usage instructions
- [x] Add .gitignore file

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build TypeScript:
   ```bash
   npm run build
   ```

3. Set your NewsAPI key:
   ```bash
   export NEWS_API_KEY="your-key-here"
   ```

4. Configure in Claude Desktop or use MCP Inspector to test

## Available Tools

1. **search_articles** - Search news articles by keyword with filtering options
2. **get_top_headlines** - Get top headlines by country or category
3. **get_sources** - List available news sources with filtering

## References

- MCP Documentation: https://modelcontextprotocol.io
- TypeScript SDK: https://github.com/modelcontextprotocol/typescript-sdk
- NewsAPI: https://newsapi.org

## Next Steps

- Install npm dependencies
- Build the project
- Test with MCP Inspector
- Configure with Claude Desktop or other MCP clients
