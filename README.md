# PetLanda AI Pet Art App

This version uses **fal.ai** for AI image generation.

## Vercel environment variables

Add these in Vercel → Project → Settings → Environment Variables:

- `FAL_KEY` = your fal.ai API key
- `MOLLIE_API_KEY` = your Mollie API key
- `NEXT_PUBLIC_BASE_URL` = your Vercel app URL, for example `https://petlanda-app.vercel.app`
- `PRODUCT_PRICE_EUR` = `4.99`
- `WATERMARK_TEXT` = `PETLANDA PREVIEW`

Important: use `FAL_KEY`, not `OPENAI_API_KEY`. The app includes a temporary fallback for `OPENAI_API_KEY`, but `FAL_KEY` is the clean setup.

## Flow

1. Customer uploads a pet photo.
2. Customer chooses a style.
3. The app generates 1 free watermarked preview with fal.ai.
4. After Mollie payment, the app generates 5 HD images.
5. Customer downloads the ZIP package.
