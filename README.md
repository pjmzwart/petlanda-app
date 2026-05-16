# PetLanda Phase 3
Includes 3 previews, stronger watermark, neutral scene names, varied example animals, and internal sub-variations per scene.

Vercel env vars:
FAL_KEY
MOLLIE_API_KEY
BLOB_READ_WRITE_TOKEN
NEXT_PUBLIC_BASE_URL=https://petlanda-app.vercel.app


## Delivery speed/stability update

Added:
- `/api/create-hd` creates the paid HD pack with progress states
- `/api/hd-status` returns current generation status
- `/checkout` now shows immediate payment confirmation and live progress
- visible message after 20 seconds
- retry button on failure
- ZIP download button when complete

This prevents customers from seeing a silent waiting page.
