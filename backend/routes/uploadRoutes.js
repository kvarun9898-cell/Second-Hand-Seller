
import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const router = express.Router()

const uploadDir = path.resolve('uploads')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname)

    const filename =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      extension

    cb(null, filename)
  },
})

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/

    const extension = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    )

    const mimeType = allowedTypes.test(file.mimetype)

    if (extension && mimeType) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  },
})

router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded',
      })
    }

    const imageUrl = `/uploads/${req.file.filename}`

    res.status(201).json({
      message: 'Image uploaded successfully',
      url: imageUrl,
      filename: req.file.filename,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Image upload failed',
    })
  }
})

export default router
