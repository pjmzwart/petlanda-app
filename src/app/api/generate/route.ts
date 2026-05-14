import { NextRequest, NextResponse } from 'next/server';
import OpenAI, { toFile } from 'openai';
import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import { getStylePrompt } from '@/lib/styles';
import { ensureOrderDir, saveOrder } from '@/lib/orders';
import { makeWatermarkedPreview } from '@/lib/watermark';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY ontbreekt.' }, { status: 500 });
    }

    const form = await req.formData();
    const image = form.get('image');
    const styleId = String(form.get('styleId') ?? 'royal');

    if (!(image instanceof File)) {
      return NextResponse.json({ error: 'Geen afbeelding ontvangen.' }, { status: 400 });
    }

    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Afbeelding is te groot. Maximaal 10 MB.' }, { status: 400 });
    }

    const orderId = nanoid(12);
    const dir = await ensureOrderDir(orderId);
    const inputBuffer = Buffer.from(await image.arrayBuffer());
    await fs.writeFile(`${dir}/upload-${image.name.replace(/[^a-z0-9.\-_]/gi, '_')}`, inputBuffer);

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `${getStylePrompt(styleId)} Maak een vierkante compositie van hoge kwaliteit. Geen tekst, geen logo's, geen extra dieren.`;

    const hdFiles: string[] = [];
    const previewFiles: string[] = [];

    for (let i = 1; i <= 5; i++) {
      const result = await client.images.edit({
        model: 'gpt-image-1',
        image: await toFile(inputBuffer, 'pet.png', { type: image.type || 'image/png' }),
        prompt: `${prompt} Variant ${i}: gebruik een andere pose, achtergrond of lichtsetting, maar behoud hetzelfde huisdier.`,
        size: '1024x1024'
      });

      const b64 = result.data?.[0]?.b64_json;
      if (!b64) throw new Error('Geen afbeelding ontvangen van de AI API.');

      const hdBuffer = Buffer.from(b64, 'base64');
      const hdName = `hd-${i}.png`;
      const previewName = `preview-${i}.jpg`;
      await fs.writeFile(`${dir}/${hdName}`, hdBuffer);
      const previewBuffer = await makeWatermarkedPreview(hdBuffer, process.env.WATERMARK_TEXT || 'PREVIEW');
      await fs.writeFile(`${dir}/${previewName}`, previewBuffer);
      hdFiles.push(hdName);
      previewFiles.push(previewName);
    }

    await saveOrder({
      id: orderId,
      styleId,
      createdAt: new Date().toISOString(),
      status: 'preview',
      previewFiles,
      hdFiles
    });

    return NextResponse.json({ orderId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Genereren is mislukt. Controleer je API-key en probeer opnieuw.' }, { status: 500 });
  }
}
