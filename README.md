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


## No-timeout generation update

This version avoids Vercel 60-second timeouts by splitting generation into short requests:

Preview flow:
- `/api/init-preview` uploads the pet photo and returns immediately.
- `/api/generate-preview-one` creates one preview per request.
- The frontend shows preview progress and displays previews one by one.

Paid HD flow:
- `/api/create-hd-one` creates one HD image per request.
- `/api/create-zip` packages already-created HD image URLs into a ZIP.
- The checkout page shows live progress and displays HD images as they arrive.

Important:
Do not rely on `/api/create-hd` or `/api/download/[orderId]` for long multi-image generation anymore.
