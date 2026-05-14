# Deployment stappen

## 1. Maak AI API-key
Gebruik OpenAI en zet je key in:

```bash
OPENAI_API_KEY=sk-proj_xxx
```

De app gebruikt `gpt-image-1` via de OpenAI Images API.

## 2. Zet Mollie key klaar
Gebruik eerst je Mollie test key:

```bash
MOLLIE_API_KEY=test_xxx
```

Later vervang je deze door je live key.

## 3. Hosting
Aanbevolen voor eerste test: Render of Railway, omdat deze lokale storage minder snel weggooit dan Vercel. Voor productie: gebruik externe opslag zoals Supabase Storage, S3 of Cloudinary.

Environment variables:

```bash
OPENAI_API_KEY=...
MOLLIE_API_KEY=...
NEXT_PUBLIC_BASE_URL=https://jouw-app-url.nl
PRODUCT_PRICE_EUR=4.99
PRODUCT_NAME=5 AI huisdier-afbeeldingen HD pakket
WATERMARK_TEXT=PREVIEW
```

## 4. JouwWeb koppelen
Plaats een knop:

```html
<a href="https://jouw-app-url.nl" target="_blank" style="display:inline-block;padding:16px 24px;background:#2d221b;color:white;border-radius:999px;text-decoration:none;font-weight:bold;">
  Maak kunst van je huisdier
</a>
```

Of embed als iframe:

```html
<iframe src="https://jouw-app-url.nl" width="100%" height="950" style="border:0;border-radius:16px;"></iframe>
```

## 5. Testen
1. Start met Mollie test key.
2. Upload een huisdierfoto.
3. Genereer previews.
4. Start betaling.
5. Gebruik Mollie test checkout.
6. Download ZIP.

## 6. Productie-aanpassingen die ik zou adviseren
- Externe opslag toevoegen, anders kun je orders verliezen bij server-redeploy.
- E-mail naar klant na betaling.
- Automatisch verwijderen van bestanden na 7 of 14 dagen.
- Algemene voorwaarden/privacytekst omdat klanten foto's uploaden.
- Consent checkbox: klant bevestigt dat hij rechten heeft op de foto.
