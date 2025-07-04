import fs from "node:fs"
import path from "node:path"

import uploadConfig from "../config/upload.js"

export class DiskStorage {
  async saveFileToCategory(file: string, category: string) {
    const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file)
    const categoryFolder = path.resolve(uploadConfig.TMP_FOLDER, category) // 'fotos/Bebidas', por ex.

    // NÃO precisa criar a pasta porque elas já existem

    const finalPath = path.resolve(categoryFolder, file)

    await fs.promises.rename(tmpPath, finalPath)

    // Retorna o caminho relativo para salvar no banco
    return `fotos/${category}/${file}`
  }

  async deleteFile(file: string, category?: string) {
    const baseFolder = category
      ? path.resolve(uploadConfig.TMP_FOLDER, category)
      : uploadConfig.TMP_FOLDER

    const filePath = path.resolve(baseFolder, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}
