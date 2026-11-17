import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: "15mb" }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const CATALOG_SUMMARY = `
HOME OF KING'S — AUTOMATIC PLATINUM COLLECTION (Tagline: "Nothing better than king's"):
1. Sovereign Automatic I (ID: sovereign-platinum-i, Ref: HK-01-PT) — $48,500 | 40.0 mm x 8.9 mm | Solid 950 Platinum | Caliber HK-01 Automatic | 72h power reserve | 28,800 vph | 31 jewels | Anthracite sunray dial, small seconds, 50m WR.
2. Monarch Flyback Chronograph (ID: monarch-chronograph, Ref: HK-04-CHR) — $62,000 | 41.5 mm x 11.4 mm | Brushed 950 Platinum | Caliber HK-04 Column-Wheel Automatic | 68h power reserve | 36,000 vph (5 Hz) | 38 jewels | Twin-register slate dial, 100m WR.
3. Regent Openworked Automatic (ID: regent-openworked, Ref: HK-07-SKL) — $78,500 | 41.0 mm x 9.6 mm | 950 Platinum Integrated Bracelet | Caliber HK-07 Architectural Skeleton | 70h power reserve | 28,800 vph | 29 jewels | Peripheral rotor, 142 hand-chamfered angles, 50m WR.
4. Imperator Perpetual Calendar (ID: imperator-perpetual, Ref: HK-09-PER) — $94,000 | 40.5 mm x 10.2 mm | Polished 950 Platinum | Caliber HK-09 Perpetual | 72h power reserve | 21,600 vph | 41 jewels | Smoked silver moonphase (122-yr accuracy), power reserve indicator, 30m WR.
5. Crown Diver Automatic 300M (ID: crown-diver-300, Ref: HK-05-DIV) — $54,000 | 41.0 mm x 11.8 mm | Brushed 950 Platinum & Ceramic Bezel | Caliber HK-05 Marine Automatic | 72h power reserve | 28,800 vph | 28 jewels | Silicon hairspring (15,000 gauss), 300m WR.
6. Atelier Ultrathin 38mm (ID: atelier-dress-38, Ref: HK-02-ATL) — $44,500 | 38.0 mm x 7.4 mm | 950 Platinum | Caliber HK-02 Micro-Rotor Automatic | 65h power reserve | 28,800 vph | 29 jewels | Vertical brushed silver dial, 30m WR.
`;

const CONCIERGE_SYSTEM_INSTRUCTION = `You are the Master Horologist & Private Client Concierge for Home of King's, an independent haute horlogerie maison renowned for solid 950 platinum automatic wristwatches. Our guiding ethos is "Nothing better than king's."

Your tone is refined, deeply knowledgeable, poised, and helpful—never robotic, pushy, or overly verbose.
You exclusively discuss Home of King's automatic timepieces, mechanical horology, 950 platinum craftsmanship, strap/attire pairing, and private acquisition guidance.
Always cite exact reference numbers, calibers, dimensions, and pricing when recommending pieces from our catalog:
${CATALOG_SUMMARY}

Format responses cleanly in crisp short paragraphs or compact specification lines. Avoid excessive markdown clutter.`;

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/concierge/chat", async (req, res) => {
  try {
    const { history = [], message, mode = "concierge", activeWatchId } = req.body ?? {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Please enter a question for the horology concierge." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Gemini API key is not configured on the server. Please check Settings > Secrets.",
      });
    }

    let model = "gemini-4-hydrogen";
    let thinkingLevel: ThinkingLevel | undefined = undefined;

    if (mode === "quick") {
      model = "gemini-3.1-flash-lite";
    } else if (mode === "deep") {
      model = "gemini-4-hydrogen";
      thinkingLevel = ThinkingLevel.HIGH;
    } else {
      model = "gemini-4-hydrogen";
      thinkingLevel = ThinkingLevel.MEDIUM;
    }

    const formattedHistory = Array.isArray(history)
      ? history
          .filter(
            (item: unknown): item is { role: "user" | "model"; text: string } =>
              Boolean(item) &&
              typeof item === "object" &&
              ((item as { role?: string }).role === "user" || (item as { role?: string }).role === "model") &&
              typeof (item as { text?: string }).text === "string" &&
              (item as { text: string }).text.trim().length > 0
          )
          .map((item) => ({
            role: item.role,
            parts: [{ text: item.text }],
          }))
      : [];

    const contextPrefix = activeWatchId
      ? `[Client is currently inspecting timepiece ID: ${activeWatchId}] `
      : "";

    const chat = ai.chats.create({
      model,
      history: formattedHistory,
      config: {
        systemInstruction: CONCIERGE_SYSTEM_INSTRUCTION,
        ...(thinkingLevel ? { thinkingConfig: { thinkingLevel } } : {}),
      },
    });

    const response = await chat.sendMessage({
      message: `${contextPrefix}${message.trim()}`,
    });

    const reply = response.text?.trim();
    if (!reply) {
      return res.status(502).json({ error: "The concierge returned an empty response. Please try again." });
    }

    return res.json({ reply, model });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Failed to reach the Horology Concierge.";
    const status = errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED")
      ? 429
      : errMsg.includes("403") || errMsg.includes("PERMISSION_DENIED")
      ? 403
      : 500;
    return res.status(status).json({ error: errMsg });
  }
});

app.post("/api/analyzer/inspect", async (req, res) => {
  try {
    const { imageBase64, mimeType, note } = req.body ?? {};

    if (!imageBase64 || typeof imageBase64 !== "string" || !mimeType || typeof mimeType !== "string") {
      return res.status(400).json({ error: "Please upload a valid watch or wrist photograph." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Gemini API key is not configured on the server. Please check Settings > Secrets.",
      });
    }

    const cleanBase64 = imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64;

    const promptText = `Analyze this photograph as a Master Horologist and Style Director at Home of King's ("Nothing better than king's").
${note ? `Client note: "${note}"` : "Provide a thorough horological, aesthetic, and proportion appraisal."}

Examine what is visible in the image (whether it is a wristwatch close-up, a wrist shot, or formal/casual attire) and provide:
1. Subject classification and a concise editorial headline.
2. Case, dial, finish, and visual proportion observations.
3. Mechanical/movement or horological craftsmanship cues (or wrist-pairing cues if no watch is present).
4. Styling and occasion guidance.
5. Select 1 to 3 exact IDs from the Home of King's automatic platinum catalog that best complement or elevate the client's taste:
${CATALOG_SUMMARY}
Only return exact catalog IDs from: sovereign-platinum-i, monarch-chronograph, regent-openworked, imperator-perpetual, crown-diver-300, atelier-dress-38.`;

    const response = await ai.models.generateContent({
      model: "gemini-4-hydrogen",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: cleanBase64,
            },
          },
          { text: promptText },
        ],
      },
      config: {
        systemInstruction:
          "You are a senior horological appraiser at Home of King's. Deliver sharp, authentic watchmaking insight grounded strictly in visual evidence from the uploaded photo.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subjectType: {
              type: Type.STRING,
              description: "Short classification like 'Watch Macro Study', 'Wrist & Cuff Pairing', or 'Attire & Lifestyle Frame'.",
            },
            headline: {
              type: Type.STRING,
              description: "A refined 5-9 word editorial appraisal headline.",
            },
            caseAndDialAnalysis: {
              type: Type.STRING,
              description: "2-3 sentences analyzing visible case geometry, metal tones, dial textures, or visual aesthetic.",
            },
            movementAndCraftCues: {
              type: Type.STRING,
              description: "2 sentences assessing mechanical character, bezel/strap execution, or horological craftsmanship cues.",
            },
            stylingAndProportionNote: {
              type: Type.STRING,
              description: "2 sentences on wrist proportion, formality balance, and platinum pairing advice.",
            },
            recommendedWatchIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "1 to 3 matching Home of King's catalog watch IDs.",
            },
            recommendationRationale: {
              type: Type.STRING,
              description: "2 sentences explaining why these specific 950 platinum automatic references fit the visual profile.",
            },
          },
          required: [
            "subjectType",
            "headline",
            "caseAndDialAnalysis",
            "movementAndCraftCues",
            "stylingAndProportionNote",
            "recommendedWatchIds",
            "recommendationRationale",
          ],
        },
      },
    });

    const rawJson = (response.text ?? "{}").trim();
    const parsed = JSON.parse(rawJson);

    return res.json({ analysis: parsed, model: "gemini-4-hydrogen" });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : "Unable to analyze photograph.";
    const status = errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED")
      ? 429
      : errMsg.includes("403") || errMsg.includes("PERMISSION_DENIED")
      ? 403
      : 500;
    return res.status(status).json({ error: errMsg });
  }
});

async function startServer() {
  const port = Number(process.env.PORT) || 3000;

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("/{*path}", (_req, res) => {
      const indexHtml = path.join(distPath, "index.html");
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send("Build artifacts not found. Run npm run build first.");
      }
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Home of King's server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
