import sharp from "sharp";

const logo = "public/logo.png";
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const dark = { r: 18, g: 20, b: 10, alpha: 1 };

// Browser tab icon
await sharp(logo)
  .resize(512, 512, { fit: "contain", background: clear })
  .png()
  .toFile("src/app/icon.png");

// iPhone home screen icon (solid background, padded)
await sharp(logo)
  .resize(140, 140, { fit: "contain", background: clear })
  .extend({ top: 20, bottom: 20, left: 20, right: 20, background: dark })
  .flatten({ background: dark })
  .png()
  .toFile("src/app/apple-icon.png");

// Share image (Discord, WhatsApp, X previews)
const mark = await sharp(logo)
  .resize(420, 420, { fit: "contain", background: clear })
  .png()
  .toBuffer();

for (const file of ["opengraph-image.png", "twitter-image.png"]) {
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 26, g: 29, b: 14, alpha: 1 },
    },
  })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(`src/app/${file}`);
}

console.log("Icons generated in src/app/");