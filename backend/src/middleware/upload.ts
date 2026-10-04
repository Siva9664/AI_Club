import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { AppError } from '../lib/errors';
import { slugify } from '../lib/slug';

/** Absolute directory where uploaded images are stored. */
export const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.bin';
    const base = slugify(path.basename(file.originalname, ext)) || 'image';
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

/** Multer instance accepting one image field named `file`. */
export const uploadImage = multer({
  storage,
  limits: { fileSize: MAX_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.includes(file.mimetype)) {
      cb(AppError.validation('Only JPG, PNG and WebP images are allowed', { file: 'Unsupported image type' }));
      return;
    }
    cb(null, true);
  },
}).single('file');
