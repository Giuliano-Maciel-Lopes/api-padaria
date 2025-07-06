import { Request, Response } from "express";
import { DiskStorage } from "@/providers/disktorage.js";
import { uploadCombinedSchema } from "@/schema/uploads/schemaupload.js"; // import seu esquema combinado
import { ZodError } from "zod";


class UploadsController {
  async create(req: Request, res: Response): Promise<void> {
    const diskStorage = new DiskStorage();

    const category = req.body.category;

    // Adaptar fileData para validar (pode ser undefined)
    const fileData = req.file
      ? {
          filename: req.file.filename || req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
        }
      : undefined;

    try {
      // Validar dados combinados (arquivo opcional, categoria opcional mas condicionada)
      const validData = uploadCombinedSchema.parse({ file: fileData, category });

      // Se tem arquivo, mover
      let relativePath = null;
      if (validData.file) {
        relativePath = await diskStorage.saveFileToCategory(
          req.file!.filename, // req.file existe se validData.file existe
          validData.category!
        );
      }

      res.status(201).json({ 
        message: "Upload feito",
        path: relativePath,
      });

    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.issues[0].message })
        return;
      }
      console.error("Erro ao processar upload:", error);
      res.status(500).json({ error: "Erro interno" });
    }
  }
}



export { UploadsController };
