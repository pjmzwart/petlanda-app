# PetLanda AI App

International PetLanda app using fal.ai, Mollie, and Vercel Blob.

Required Vercel Environment Variables:

- `FAL_KEY`
- `MOLLIE_API_KEY`
- `NEXT_PUBLIC_BASE_URL`
- `BLOB_READ_WRITE_TOKEN`

Optional:

- `PRODUCT_PRICE_EUR=4.99`
- `PRODUCT_NAME=PetLanda 5 HD AI pet artworks`
- `WATERMARK_TEXT=PETLANDA PREVIEW`

Important: Vercel serverless functions cannot reliably store generated images on local disk. This version uses Vercel Blob so previews, orders, uploads, and paid HD files remain available between API calls.
