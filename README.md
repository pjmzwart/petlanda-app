# PetLanda AI App

International PetLanda app for AI pet art.

## Included
- English pastel interface
- fal.ai image generation
- 1 free watermarked preview
- Basic Pack: €7.99 for 5 HD images
- Premium Pack: €14.99 for 10 HD images + extra polish
- Mollie API payments created dynamically in code, no manual payment links needed
- Vercel Blob storage for previews and downloads
- ZIP download after payment

## Required Vercel Environment Variables

```env
FAL_KEY=your_fal_ai_key
MOLLIE_API_KEY=live_xxxxx_or_test_xxxxx
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
NEXT_PUBLIC_BASE_URL=https://your-vercel-domain.vercel.app
BASIC_PRICE_EUR=7.99
PREMIUM_PRICE_EUR=14.99
WATERMARK_TEXT=PETLANDA PREVIEW
```

After changing environment variables, redeploy the project.

## Mollie
Do not create manual payment links. The app creates Mollie payments via the API.
Make sure at least one payment method such as iDEAL is active in your Mollie website profile.
