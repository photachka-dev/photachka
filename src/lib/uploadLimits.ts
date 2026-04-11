/** Maksimalna veličina jedne fotografije pri otpremanju (4 MB). */
export const MAX_IMAGE_UPLOAD_BYTES = 4 * 1024 * 1024;

export function isImageFileWithinLimit(file: File): boolean {
  return file.size <= MAX_IMAGE_UPLOAD_BYTES;
}

export function partitionFilesByUploadLimit(files: File[]): {
  valid: File[];
  tooLarge: File[];
} {
  const valid: File[] = [];
  const tooLarge: File[] = [];
  for (const f of files) {
    (isImageFileWithinLimit(f) ? valid : tooLarge).push(f);
  }
  return { valid, tooLarge };
}
