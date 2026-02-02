import {onCall, HttpsError} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import OpenAI from "openai";

const openaiKey = defineSecret("OPENAI_KEY");

export const generateDescription = onCall(
  {secrets: [openaiKey]},
  async (req) => {
    console.log("Génération de description demandée", req.data);

    const key = openaiKey.value();
    if (!key) {
      throw new HttpsError(
        "failed-precondition",
        "Clé API OpenAI non configurée"
      );
    }

    const title = String(req.data?.title ?? "").trim();
    const theme = String(req.data?.theme ?? "").trim();
    const condition = String(req.data?.condition ?? "").trim();

    if (!title || !theme || !condition) {
      throw new HttpsError(
        "invalid-argument",
        "Champs requis: title, theme, condition"
      );
    }

    const client = new OpenAI({apiKey: key});

    const systemPrompt =
      "Tu écris comme un particulier qui poste une annonce. " +
      "Style simple, naturel, crédible. " +
      "Interdits: titres, listes, markdown, emojis, " +
      "phrases marketing. 5 à 7 lignes max.";

    const userPrompt =
      "Écris une description naturelle pour une annonce.\n" +
      `Produit: ${title}\n` +
      `Catégorie: ${theme}\n` +
      `État: ${condition}\n` +
      "Mentionne l'état et une phrase simple remise/envoi. " +
      "N'invente pas d'infos.";

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {role: "system", content: systemPrompt},
        {role: "user", content: userPrompt},
      ],
    });

    const description =
      completion.choices?.[0]?.message?.content?.trim();

    if (!description) {
      throw new HttpsError("internal", "Aucune description générée");
    }

    return {success: true, description: description};
  }
);
