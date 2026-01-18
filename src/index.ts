import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

// NewsAPI base URL and configuration
const NEWSAPI_BASE_URL = "https://newsapi.org/v2";
const API_KEY = process.env.NEWS_API_KEY;

if (!API_KEY) {
  console.error("ERROR: NEWS_API_KEY environment variable is not set");
  process.exit(1);
}

// Create server instance
const server = new McpServer({
  name: "newsapi",
  version: "1.0.0",
});

// Type definitions for API responses
interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Helper function to format articles
function formatArticles(articles: NewsArticle[]): string {
  if (articles.length === 0) {
    return "No articles found.";
  }

  return articles
    .map((article, index) => {
      return `
${index + 1}. **${article.title}**
   Source: ${article.source.name}
   Author: ${article.author || "Unknown"}
   Published: ${new Date(article.publishedAt).toLocaleDateString()}
   Description: ${article.description || "N/A"}
   URL: ${article.url}
`;
    })
    .join("\n---\n");
}

// Register tools
server.registerTool(
  "search_articles",
  {
    description: "Search for news articles by keyword or phrase",
    inputSchema: {
      q: z
        .string()
        .describe("Search keywords or phrase"),
      sortBy: z
        .enum(["relevancy", "popularity", "publishedAt"])
        .optional()
        .describe("Sort order: relevancy, popularity, or publishedAt"),
      language: z
        .string()
        .optional()
        .describe("Language code (e.g., 'en', 'es', 'fr')"),
      pageSize: z
        .number()
        .min(1)
        .max(100)
        .optional()
        .describe("Number of articles per page (max 100)"),
    },
  },
  async ({ q, sortBy = "publishedAt", language = "en", pageSize = 10 }) => {
    try {
      const response = await axios.get<NewsApiResponse>(
        `${NEWSAPI_BASE_URL}/everything`,
        {
          params: {
            q,
            sortBy,
            language,
            pageSize,
            apiKey: API_KEY,
          },
        }
      );

      const formattedArticles = formatArticles(response.data.articles);
      return {
        content: [
          {
            type: "text",
            text: `Found ${response.data.totalResults} articles matching "${q}":\n\n${formattedArticles}`,
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return {
        content: [
          {
            type: "text",
            text: `Error searching articles: ${errorMessage}`,
          },
        ],
      };
    }
  }
);

server.registerTool(
  "get_top_headlines",
  {
    description: "Get top headlines from a specific country or category",
    inputSchema: {
      country: z
        .string()
        .optional()
        .describe(
          "Two-letter ISO country code (e.g., 'us', 'gb', 'de')"
        ),
      category: z
        .enum([
          "business",
          "entertainment",
          "general",
          "health",
          "science",
          "sports",
          "technology",
        ])
        .optional()
        .describe("News category"),
      pageSize: z
        .number()
        .min(1)
        .max(100)
        .optional()
        .describe("Number of articles per page (max 100)"),
    },
  },
  async ({ country = "us", category, pageSize = 10 }) => {
    try {
      const params: Record<string, string | number> = {
        pageSize,
        apiKey: API_KEY,
      };

      if (country) params.country = country;
      if (category) params.category = category;

      const response = await axios.get<NewsApiResponse>(
        `${NEWSAPI_BASE_URL}/top-headlines`,
        { params }
      );

      const headline = category ? category : country;
      const formattedArticles = formatArticles(response.data.articles);
      return {
        content: [
          {
            type: "text",
            text: `Top headlines for ${headline}:\n\n${formattedArticles}`,
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return {
        content: [
          {
            type: "text",
            text: `Error fetching headlines: ${errorMessage}`,
          },
        ],
      };
    }
  }
);

server.registerTool(
  "get_sources",
  {
    description: "Get available news sources, optionally filtered by category or country",
    inputSchema: {
      category: z
        .enum([
          "business",
          "entertainment",
          "general",
          "health",
          "science",
          "sports",
          "technology",
        ])
        .optional()
        .describe("Filter by category"),
      country: z
        .string()
        .optional()
        .describe("Filter by country code (e.g., 'us', 'gb')"),
    },
  },
  async ({ category, country }) => {
    try {
      const params: Record<string, string> = {
        apiKey: API_KEY,
      };

      if (category) params.category = category;
      if (country) params.country = country;

      const response = await axios.get<{
        status: string;
        sources: Array<{
          id: string;
          name: string;
          description: string;
          url: string;
          category: string;
          language: string;
          country: string;
        }>;
      }>(`${NEWSAPI_BASE_URL}/sources`, { params });

      const sourcesList = response.data.sources
        .map(
          (source) =>
            `• **${source.name}** (${source.id})\n  Category: ${source.category} | Language: ${source.language} | Country: ${source.country}\n  ${source.description}`
        )
        .join("\n\n");

      return {
        content: [
          {
            type: "text",
            text: `Available news sources:\n\n${sourcesList}`,
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return {
        content: [
          {
            type: "text",
            text: `Error fetching sources: ${errorMessage}`,
          },
        ],
      };
    }
  }
);

// Run the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("NewsAPI MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
