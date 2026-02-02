import { getFunctions, httpsCallable } from "firebase/functions";

export interface GenerateDescriptionParams {
  title: string;
  theme: string;
  condition: string;
}

interface GenerateDescriptionResponse {
  success: boolean;
  description: string;
}

export const generateDescription = async (
  params: GenerateDescriptionParams
): Promise<string> => {
  try {
    const functions = getFunctions();

    const generateDescriptionFunction = httpsCallable<
      GenerateDescriptionParams,
      GenerateDescriptionResponse
    >(functions, "generateDescription");

    const result = await generateDescriptionFunction(params);

    if (result.data.success) {
      return result.data.description;
    } else {
      throw new Error("Échec de la génération");
    }
  } catch (error) {
    console.error("Erreur lors de la génération:", error);
    throw error;
  }
};
