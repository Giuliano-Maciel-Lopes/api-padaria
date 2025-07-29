import { z } from "zod";
import uploadConfig from "../../config/upload.js";
import { allowedCategories } from "../../utils/category.js";

const uploadFileSchema = z.object({
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
}).passthrough();

const uploadCategorySchema = z.enum(allowedCategories, {
  errorMap: () => ({ message: "Categoria inválida" }),
});

export const uploadCombinedSchema = z
  .object({
    file: uploadFileSchema.optional(),
    category: uploadCategorySchema.optional(),
  })
  .refine((data) => {
    if (data.file) {
      return data.category !== undefined && allowedCategories.includes(data.category);
    }
    return true;
  }, {
    message: "Categoria é obrigatória quando o arquivo é enviado",
    path: ["category"],
  });
