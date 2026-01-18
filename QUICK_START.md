# Quick Start Guide - NewsAPI MCP Server

## What You Have

A fully functional TypeScript-based MCP server that integrates with NewsAPI, providing:

✅ **search_articles** - Search news by keywords  
✅ **get_top_headlines** - Get headlines by country/category  
✅ **get_sources** - Discover available news sources

## Next Steps

### 1. Get a NewsAPI Key
- Visit https://newsapi.org
- Sign up for a free account (free tier includes 100 requests/day)
- Copy your API key

### 2. Set Your API Key

**On Windows (PowerShell):**
```powershell
$env:NEWS_API_KEY="your-api-key-here"
```

**On Windows (Command Prompt):**
```cmd
set NEWS_API_KEY=your-api-key-here
```

**On macOS/Linux:**
```bash
export NEWS_API_KEY="your-api-key-here"
```

### 3. Test with MCP Inspector

```bash
npx @modelcontextprotocol/inspector node ./build/index.js
```

This will open a web interface where you can:
- Test all three tools
- See the JSON-RPC messages
- Verify the server is working correctly

### 4. Use with Claude Desktop

1. Open your Claude Desktop configuration:
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

2. Add this configuration (update the path to your project):
   ```json
   {
     "mcpServers": {
       "newsapi": {
         "command": "node",
         "args": ["C:\\Users\\jonna\\Development\\newsapi-mcp\\build\\index.js"],
         "env": {
           "NEWS_API_KEY": "your-api-key-here"
         }
       }
     }
   }
   ```

3. Restart Claude Desktop

4. You should see an MCP server indicator in the bottom right corner

## Example Prompts for Claude

Once configured with Claude Desktop, try these prompts:

- "Find the latest articles about artificial intelligence"
- "Get top technology headlines from the US"
- "Show me all entertainment news sources available"
- "Search for COVID-19 news from the past week"
- "What are the top headlines in Europe right now?"

## Project Files

```
newsapi-mcp/
├── src/
│   └── index.ts              # Main server code
├── build/
│   └── index.js              # Compiled JavaScript
├── .vscode/
│   └── mcp.json              # MCP configuration
├── .github/
│   └── copilot-instructions.md
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── README.md                 # Full documentation
└── .gitignore
```

## Troubleshooting

**Q: "NEWS_API_KEY environment variable is not set"**  
A: Make sure you've set the environment variable before running the server.

**Q: "Error fetching headlines"**  
A: Check that your API key is valid and hasn't exceeded its daily limit.

**Q: Server won't connect**  
A: Verify the path in mcp.json is correct and the project was built with `npm run build`.

## Resources

- 📚 Full README: See [README.md](README.md)
- 🔌 MCP Documentation: https://modelcontextprotocol.io
- 📰 NewsAPI Docs: https://newsapi.org/docs
- 💻 TypeScript SDK: https://github.com/modelcontextprotocol/typescript-sdk

Happy news hunting! 🚀
