import { Request, Response } from "express";
import { DiskStorage } from "@/providers/disktorage.js";
import { uploadFileSchema, uploadCategorySchema } from "@/schema/uploads/schemaupload.js"; // certifique-se que esse caminho está certo
import { ZodError } from "zod";

class UploadsController {
  async create(req: Request, res: Response) {
    const diskStorage = new DiskStorage();

    const file = req.file;
    const category = req.body.category;

    try {
      // Validação com Zod
      const validFile = uploadFileSchema.parse(file);
      const validCategory = uploadCategorySchema.parse(category);

      // Move da pasta temporária para a pasta da categoria
      const relativePath = await diskStorage.saveFileToCategory(validFile.filename, validCategory);

      res.status(201).json({ message: "Upload feito", path: relativePath });

    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.issues[0].message });
      }

      console.error("Erro ao mover arquivo:", error);
      res.status(500).json({ error: "Erro interno" });
    }
  }
}

export { UploadsController };
