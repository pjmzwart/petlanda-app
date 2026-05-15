# PetLanda — Scene Transformation Edition

Deze versie is gebouwd voor het doel: **plaats hetzelfde herkenbare huisdier in magische scenes**.

## Belangrijkste wijzigingen

- Nieuwe interface met voorbeeld-scenes
- Scene-keuze in plaats van alleen stijl-keuze
- fal.ai FLUX Kontext als standaard model
- Betere identity-preserving prompts
- Basic/Premium checkout blijft aanwezig
- Mollie API betaling zonder vaste payment method
- Vercel Blob opslag met overwrite-fix
- Duidelijk watermerk op previews

## Environment variables in Vercel

```env
FAL_KEY=...
MOLLIE_API_KEY=live_...
BLOB_READ_WRITE_TOKEN=...
NEXT_PUBLIC_BASE_URL=https://jouw-vercel-url.vercel.app
```

Optioneel:

```env
FAL_MODEL=fal-ai/flux-pro/kontext
FAL_GUIDANCE_SCALE=3.5
WATERMARK_TEXT=PETLANDA PREVIEW
BASIC_PRICE_EUR=7.99
PREMIUM_PRICE_EUR=14.99
```

## Modelkeuze

Standaard gebruikt deze app:

```text
fal-ai/flux-pro/kontext
```

Dit model is bedoeld voor image editing / scene transformation met een referentieafbeelding.
