# Pet Art AI App

Mini-app voor gepersonaliseerde AI-afbeeldingen van huisdieren:

1. klant uploadt foto
2. kiest stijl
3. app genereert 5 previews met watermerk
4. klant betaalt via Mollie
5. na betaling kan klant een ZIP met HD-afbeeldingen downloaden

## Installatie lokaal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open daarna: http://localhost:3000

## Nodig

- OpenAI API-key
- Mollie API-key
- Hosting zoals Vercel, Render of Railway

## JouwWeb koppeling

Knop:

```html
<a href="https://jouw-app-domein.nl" target="_blank">Maak AI kunst van je huisdier</a>
```

Iframe:

```html
<iframe src="https://jouw-app-domein.nl" width="100%" height="950" style="border:0;border-radius:16px;"></iframe>
```

## Belangrijk voor productie

Deze demo slaat orders lokaal op in `storage/orders`. Voor echte productie is externe opslag beter, bijvoorbeeld Supabase, S3 of Cloudinary. Op Vercel is lokale opslag tijdelijk en niet geschikt voor permanente downloads.
