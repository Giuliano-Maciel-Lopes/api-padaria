import { z } from "zod";
import uploadConfig from "../../config/upload.js";
import { allowedCategories } from "../../utils/category.js";


export const uploadFileSchema = z
  .object({
    filename: z.string().min(1, "Nome do arquivo é obrigatório"),
    mimetype: z
      .string()
      .refine(
        (type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
        "Formato de arquivo inválido. Apenas JPEG e PNG são permitidos."
      ),
    size: z
      .number()
      .positive()
      .refine(
        (size) => size <= uploadConfig.MAX_FILE_SIZE,
        "Arquivo excede o tamanho máximo permitido"
      ),
  })
  .passthrough();

export const uploadCategorySchema = z
  .string()
  .min(1, "Categoria é obrigatória")
  .refine((value) => allowedCategories.includes(value), {
    message: "Categoria inválida",
  });
