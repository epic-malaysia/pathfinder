import { jsPDF } from 'jspdf';

const PAGE_W = 1200;
const MARGIN_X = 48;
const CONTENT_W = PAGE_W - MARGIN_X * 2; // 1104px

const COLOR_PAPER = '#FBF8F1';
const COLOR_IVORY = '#FFFDF9';
const COLOR_INK = '#1F1B18';
const COLOR_INK_MUTED = '#4C463F';
const COLOR_BORDER = '#DCD7CE';
const COLOR_BORDER_SOFT = '#EAE5DC';
const COLOR_ORANGE = '#ff821e';
const COLOR_ORANGE_INK = '#B84D00';
const COLOR_TAPE = '#F4E8C1';
const COLOR_TAPE_BORDER = '#E2D29F';

const URL_EPIC = 'https://epic.my';
const URL_REGISTER = 'https://forms.gle/94ckPd8yCP1fF2zT9';
const URL_SEDUNIA =
  'https://www.sedunia.me/missions/mapping-kampung-orang-asli-tanah-abang-mersing-johor';
const URL_MAPS = 'https://maps.app.goo.gl/cc2UgZ9RWF1fihsKA';
const URL_FB = 'https://www.facebook.com/theepichomes';
const URL_IG = 'https://www.instagram.com/the.epichomes/';

const HERO_IMAGE_PATH = '/src/assets/images/regenerated_image_1794845523601.png';
const PATHFINDER_IMAGE_PATH = '/src/assets/images/regenerated_image_1794847870140.png';
const LOGO_IMAGE_PATH = '/assets/aistudio/Epic_Logo_4df8a1b2.png';

interface LoadedImage {
  dataUrl: string;
  format: 'PNG' | 'JPEG';
  aspect: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

async function prepareImageAsset(
  src: string,
  options: {
    format: 'PNG' | 'JPEG';
    targetAspect?: number;
    cropAlign?: 'center' | 'top';
    maxWidth?: number;
  },
): Promise<LoadedImage | null> {
  try {
    const img = await loadImage(src);
    const natW = img.naturalWidth;
    const natH = img.naturalHeight;
    if (!natW || !natH) return null;

    let sx = 0;
    let sy = 0;
    let sw = natW;
    let sh = natH;

    if (options.targetAspect) {
      const srcAspect = natW / natH;
      if (srcAspect > options.targetAspect) {
        sw = Math.round(natH * options.targetAspect);
        sx = Math.round((natW - sw) / 2);
      } else if (srcAspect < options.targetAspect) {
        sh = Math.round(natW / options.targetAspect);
        sy = options.cropAlign === 'top' ? 0 : Math.round((natH - sh) / 2);
      }
    }

    const maxW = options.maxWidth ?? sw;
    const scale = Math.min(1, maxW / sw);
    const outW = Math.max(1, Math.round(sw * scale));
    const outH = Math.max(1, Math.round(sh * scale));

    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    if (options.format === 'JPEG') {
      ctx.fillStyle = COLOR_IVORY;
      ctx.fillRect(0, 0, outW, outH);
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);

    const mime = options.format === 'PNG' ? 'image/png' : 'image/jpeg';
    const dataUrl = canvas.toDataURL(mime, options.format === 'JPEG' ? 0.92 : undefined);

    return {
      dataUrl,
      format: options.format,
      aspect: outW / outH,
    };
  } catch {
    return null;
  }
}

function drawBrushUnderline(pdf: jsPDF, x: number, y: number, w: number) {
  pdf.saveGraphicsState();
  pdf.setDrawColor(COLOR_ORANGE);
  pdf.setLineWidth(4.5);
  pdf.setLineCap('round');
  pdf.moveTo(x, y + 3);
  pdf.curveTo(x + w * 0.25, y - 2, x + w * 0.6, y - 2.5, x + w, y + 2);
  pdf.stroke();

  pdf.setDrawColor('#FFA962');
  pdf.setLineWidth(2.2);
  pdf.moveTo(x + w * 0.08, y + 6);
  pdf.curveTo(x + w * 0.35, y + 3, x + w * 0.7, y + 2.5, x + w * 0.94, y + 5.5);
  pdf.stroke();
  pdf.restoreGraphicsState();
}

function drawArrowUpRight(pdf: jsPDF, x: number, y: number, size: number, color: string) {
  pdf.saveGraphicsState();
  pdf.setDrawColor(color);
  pdf.setLineWidth(1.8);
  pdf.setLineCap('round');
  pdf.setLineJoin('round');
  pdf.line(x, y + size, x + size, y);
  pdf.line(x + size * 0.3, y, x + size, y);
  pdf.line(x + size, y, x + size, y + size * 0.7);
  pdf.restoreGraphicsState();
}

function drawMapPin(pdf: jsPDF, cx: number, topY: number) {
  pdf.saveGraphicsState();
  pdf.setDrawColor(COLOR_ORANGE_INK);
  pdf.setLineWidth(1.5);
  pdf.circle(cx, topY + 5, 4.5, 'S');
  pdf.line(cx - 3.6, topY + 7.6, cx, topY + 13.5);
  pdf.line(cx + 3.6, topY + 7.6, cx, topY + 13.5);
  pdf.circle(cx, topY + 5, 1.5, 'S');
  pdf.restoreGraphicsState();
}

function drawMaskingTape(pdf: jsPDF, x: number, y: number, w: number, h: number) {
  pdf.setFillColor(COLOR_TAPE);
  pdf.setDrawColor(COLOR_TAPE_BORDER);
  pdf.setLineWidth(0.75);
  pdf.rect(x, y, w, h, 'FD');
}

interface SectionBounds {
  heroEndY: number;
  pathEndY: number;
  trainEndY: number;
  aboutEndY: number;
  totalH: number;
}

function renderDocument(
  pdf: jsPDF,
  assets: {
    logo: LoadedImage | null;
    heroPhoto: LoadedImage | null;
    pathfinderPhoto: LoadedImage | null;
  },
  isDryRun: boolean,
  bounds?: SectionBounds,
): SectionBounds {
  const link = (x: number, y: number, w: number, h: number, url: string) => {
    if (!isDryRun) {
      pdf.link(x, y, w, h, { url });
    }
  };

  if (!isDryRun && bounds) {
    // Full-page base canvas (#FBF8F1)
    pdf.setFillColor(COLOR_PAPER);
    pdf.rect(0, 0, PAGE_W, bounds.totalH, 'F');

    // Warm ivory bands for Pathfinder & About sections (#FFFDF9)
    pdf.setFillColor(COLOR_IVORY);
    pdf.rect(0, bounds.heroEndY, PAGE_W, bounds.pathEndY - bounds.heroEndY, 'F');
    pdf.rect(0, bounds.trainEndY, PAGE_W, bounds.aboutEndY - bounds.trainEndY, 'F');

    // Crisp 1px section dividers
    pdf.setDrawColor(COLOR_BORDER);
    pdf.setLineWidth(1);
    pdf.line(0, bounds.heroEndY, PAGE_W, bounds.heroEndY);
    pdf.line(0, bounds.pathEndY, PAGE_W, bounds.pathEndY);
    pdf.line(0, bounds.trainEndY, PAGE_W, bounds.trainEndY);
  }

  // =========================================================================
  // 1. HEADER / NAVBAR
  // =========================================================================
  const headerH = 64;
  if (!isDryRun) {
    pdf.setFillColor(COLOR_PAPER);
    pdf.rect(0, 0, PAGE_W, headerH, 'F');
    pdf.setDrawColor(COLOR_BORDER);
    pdf.setLineWidth(1);
    pdf.line(0, headerH, PAGE_W, headerH);
  }

  // EPIC Logo
  const logoH = 34;
  const logoW = assets.logo ? logoH * assets.logo.aspect : 88;
  const logoY = (headerH - logoH) / 2;
  if (!isDryRun) {
    if (assets.logo) {
      pdf.addImage(assets.logo.dataUrl, assets.logo.format, MARGIN_X, logoY, logoW, logoH);
    } else {
      pdf.setFont('times', 'bold');
      pdf.setFontSize(22);
      pdf.setTextColor(COLOR_ORANGE);
      pdf.text('epic', MARGIN_X, 40);
    }
  }
  link(MARGIN_X, logoY, logoW, logoH, URL_EPIC);

  // Nav links (centered)
  const navItems = ['Mission', 'Pathfinders', 'Training', 'About EPIC'];
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(14);
  const navWidths = navItems.map((label) => pdf.getTextWidth(label));
  const navGap = 32;
  const navTotalW = navWidths.reduce((a, b) => a + b, 0) + navGap * (navItems.length - 1);
  let navX = (PAGE_W - navTotalW) / 2;
  if (!isDryRun) {
    pdf.setTextColor(COLOR_INK);
    navItems.forEach((label, idx) => {
      pdf.text(label, navX, 37);
      navX += navWidths[idx] + navGap;
    });
  }

  // Header CTA Button
  const navBtnLabel = 'Register Your Interest Here';
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(13);
  const navBtnW = pdf.getTextWidth(navBtnLabel) + 32;
  const navBtnH = 38;
  const navBtnX = PAGE_W - MARGIN_X - navBtnW;
  const navBtnY = (headerH - navBtnH) / 2;
  if (!isDryRun) {
    pdf.setFillColor(COLOR_ORANGE);
    pdf.roundedRect(navBtnX, navBtnY, navBtnW, navBtnH, 6, 6, 'F');
    pdf.setTextColor(COLOR_INK);
    pdf.text(navBtnLabel, navBtnX + 16, navBtnY + 23.5);
  }
  link(navBtnX, navBtnY, navBtnW, navBtnH, URL_REGISTER);

  let y = headerH;

  // =========================================================================
  // 2. HERO SECTION (#mission)
  // =========================================================================
  const heroStartY = y;
  const heroPadY = 54;
  const leftColW = 630;
  const rightColX = MARGIN_X + leftColW + 56;
  const rightColW = CONTENT_W - leftColW - 56; // 418px

  let ly = heroStartY + heroPadY;

  // Hero H1
  pdf.setFont('times', 'bold');
  pdf.setFontSize(54);
  const h1Line1 = 'Big change starts with';
  const h1Line2 = 'small conversations.';
  if (!isDryRun) {
    pdf.setTextColor(COLOR_INK);
    pdf.text(h1Line1, MARGIN_X, ly + 42);
    pdf.setFont('times', 'bolditalic');
    pdf.text(h1Line2, MARGIN_X, ly + 98);
    const underlineW = pdf.getTextWidth(h1Line2);
    drawBrushUnderline(pdf, MARGIN_X, ly + 104, underlineW);
  }
  ly += 126;

  // Hero body paragraph
  const heroIntro =
    "We're looking for 45 volunteers to help us capture the stories, dreams, and everyday needs of Kampung Orang Asli Tanah Abang in Mersing, Johor. The information we gather together will shape their community development plan, creating opportunities for volunteers and collaborators to make it a reality. We call these volunteers: Pathfinders.";
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(15);
  const heroIntroLines: string[] = pdf.splitTextToSize(heroIntro, leftColW - 10);
  const heroIntroLineH = 24;
  if (!isDryRun) {
    pdf.setTextColor(COLOR_INK_MUTED);
    pdf.text(heroIntroLines, MARGIN_X, ly + 14, { lineHeightFactor: heroIntroLineH / 15 });
  }
  ly += heroIntroLines.length * heroIntroLineH + 22;

  // Key details ledger (2x2 + Criteria)
  if (!isDryRun) {
    pdf.setDrawColor(COLOR_BORDER);
    pdf.setLineWidth(1);
    pdf.line(MARGIN_X, ly, MARGIN_X + leftColW, ly);
  }
  ly += 18;

  const keyDetails = [
    { label: 'Mission Date', value: 'Sat, 12 December 2026' },
    { label: 'Time', value: '10:00 AM - 5:00 PM' },
    { label: 'Pathfinders Needed', value: '45 volunteers' },
    { label: 'Location', value: 'Mersing, Johor' },
  ];
  const cellW = (leftColW - 28) / 2;

  for (let row = 0; row < 2; row++) {
    const rowY = ly;
    for (let col = 0; col < 2; col++) {
      const item = keyDetails[row * 2 + col];
      const cx = MARGIN_X + col * (cellW + 28);
      if (!isDryRun) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.setTextColor(COLOR_ORANGE_INK);
        pdf.text(item.label, cx, rowY + 12);

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(15);
        pdf.setTextColor(COLOR_INK);
        pdf.text(item.value, cx, rowY + 32);

        pdf.setDrawColor(COLOR_BORDER);
        pdf.setLineWidth(0.8);
        pdf.line(cx, rowY + 44, cx + cellW, rowY + 44);
      }
    }
    ly += 58;
  }

  // Criteria row
  if (!isDryRun) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(COLOR_ORANGE_INK);
    pdf.text('Criteria', MARGIN_X, ly + 12);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(14.5);
    pdf.setTextColor(COLOR_INK);
    pdf.text('18+, able to speak in BM & attend training on Nov 28.', MARGIN_X, ly + 32);

    pdf.setDrawColor(COLOR_BORDER);
    pdf.setLineWidth(0.8);
    pdf.line(MARGIN_X, ly + 44, MARGIN_X + leftColW, ly + 44);
  }
  ly += 66;

  // Hero CTA Button
  const heroBtnLabel = 'Find out more about the Mission here';
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14.5);
  const heroBtnW = pdf.getTextWidth(heroBtnLabel) + 60;
  const heroBtnH = 44;
  if (!isDryRun) {
    pdf.setFillColor(COLOR_ORANGE);
    pdf.roundedRect(MARGIN_X, ly, heroBtnW, heroBtnH, 6, 6, 'F');
    pdf.setTextColor(COLOR_INK);
    pdf.text(heroBtnLabel, MARGIN_X + 20, ly + 27);
    drawArrowUpRight(pdf, MARGIN_X + heroBtnW - 30, ly + 16, 11, COLOR_INK);
  }
  link(MARGIN_X, ly, heroBtnW, heroBtnH, URL_SEDUNIA);
  ly += heroBtnH;

  // Right Column: Hero Photo Print Mat
  const heroMatPad = 14;
  const heroPhotoW = rightColW - heroMatPad * 2;
  const heroPhotoH = Math.round(heroPhotoW * 0.75); // 4:3
  const heroMatH = heroPhotoH + heroMatPad * 2;
  const heroLeftContentH = ly - (heroStartY + heroPadY);
  const heroMatY = heroStartY + heroPadY + Math.max(24, (heroLeftContentH - heroMatH) / 2);

  if (!isDryRun) {
    pdf.setFillColor(COLOR_IVORY);
    pdf.setDrawColor(COLOR_BORDER);
    pdf.setLineWidth(1);
    pdf.rect(rightColX, heroMatY, rightColW, heroMatH, 'FD');

    if (assets.heroPhoto) {
      pdf.addImage(
        assets.heroPhoto.dataUrl,
        assets.heroPhoto.format,
        rightColX + heroMatPad,
        heroMatY + heroMatPad,
        heroPhotoW,
        heroPhotoH,
      );
    } else {
      pdf.setFillColor('#EAE3D2');
      pdf.rect(rightColX + heroMatPad, heroMatY + heroMatPad, heroPhotoW, heroPhotoH, 'F');
    }

    drawMaskingTape(pdf, rightColX + 18, heroMatY - 10, 74, 20);
    drawMaskingTape(pdf, rightColX + rightColW - 92, heroMatY - 10, 74, 20);
  }

  const heroEndY = Math.max(ly, heroMatY + heroMatH) + heroPadY;
  y = heroEndY;

  // =========================================================================
  // 3. WHAT'S A PATHFINDER? SECTION (#pathfinder)
  // =========================================================================
  const pathStartY = y;
  const pathPadY = 48;
  const pathPhotoColW = 428;
  const pathTextColX = MARGIN_X + pathPhotoColW + 52;
  const pathTextColW = CONTENT_W - pathPhotoColW - 52; // 624px

  let py = pathStartY + pathPadY;
  pdf.setFont('times', 'bold');
  pdf.setFontSize(38);
  const pathTitlePart1 = "What's A ";
  const pathTitlePart2 = 'Pathfinder?';
  const part1W = pdf.getTextWidth(pathTitlePart1);
  const part2W = pdf.getTextWidth(pathTitlePart2);
  if (!isDryRun) {
    pdf.setTextColor(COLOR_INK);
    pdf.text(pathTitlePart1 + pathTitlePart2, pathTextColX, py + 30);
    drawBrushUnderline(pdf, pathTextColX + part1W, py + 35, part2W);
  }
  py += 54;

  const pathBody =
    'A Pathfinder is a volunteer who takes the first step in getting to know a community. Pathfinders visit villages, meet the people who live there and have conversations to better understand their everyday lives, experiences and hopes for the future. They hold respectful, one-on-one conversations with villagers in Bahasa Malaysia and capture their stories accurately.';
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(15.5);
  const pathBodyLines: string[] = pdf.splitTextToSize(pathBody, pathTextColW);
  const pathBodyLineH = 25;
  if (!isDryRun) {
    pdf.setTextColor(COLOR_INK_MUTED);
    pdf.text(pathBodyLines, pathTextColX, py + 15, { lineHeightFactor: pathBodyLineH / 15.5 });
  }
  py += pathBodyLines.length * pathBodyLineH + 22;

  const pathBoldQuote = 'A Pathfinder is not an expert - just a neighbour who knows how to listen.';
  pdf.setFont('times', 'bold');
  pdf.setFontSize(22);
  const pathQuoteLines: string[] = pdf.splitTextToSize(pathBoldQuote, pathTextColW);
  const pathQuoteLineH = 28;
  if (!isDryRun) {
    pdf.setTextColor(COLOR_INK);
    pdf.text(pathQuoteLines, pathTextColX, py + 18, { lineHeightFactor: pathQuoteLineH / 22 });
  }
  py += pathQuoteLines.length * pathQuoteLineH;

  const pathMatPad = 14;
  const pathPhotoW = pathPhotoColW - pathMatPad * 2;
  const pathPhotoH = Math.round(pathPhotoW * (2 / 3)); // 3:2
  const pathMatH = pathPhotoH + pathMatPad * 2;
  const pathTextH = py - (pathStartY + pathPadY);
  const pathMatY = pathStartY + pathPadY + Math.max(0, (pathTextH - pathMatH) / 2);

  if (!isDryRun) {
    pdf.setFillColor(COLOR_IVORY);
    pdf.setDrawColor(COLOR_BORDER);
    pdf.setLineWidth(1);
    pdf.rect(MARGIN_X, pathMatY, pathPhotoColW, pathMatH, 'FD');

    if (assets.pathfinderPhoto) {
      pdf.addImage(
        assets.pathfinderPhoto.dataUrl,
        assets.pathfinderPhoto.format,
        MARGIN_X + pathMatPad,
        pathMatY + pathMatPad,
        pathPhotoW,
        pathPhotoH,
      );
    } else {
      pdf.setFillColor('#EAE3D2');
      pdf.rect(MARGIN_X + pathMatPad, pathMatY + pathMatPad, pathPhotoW, pathPhotoH, 'F');
    }

    drawMaskingTape(pdf, MARGIN_X + 18, pathMatY - 10, 74, 20);
    drawMaskingTape(pdf, MARGIN_X + pathPhotoColW - 92, pathMatY - 10, 74, 20);
  }

  const pathEndY = Math.max(py, pathMatY + pathMatH) + pathPadY;
  y = pathEndY;

  // =========================================================================
  // 4. TRAINING SECTION (#training)
  // =========================================================================
  const trainStartY = y;
  const trainPadY = 50;
  const trainLeftW = 630;
  const trainRightX = MARGIN_X + trainLeftW + 52;
  const trainRightW = CONTENT_W - trainLeftW - 52; // 422px

  let ty = trainStartY + trainPadY;
  pdf.setFont('times', 'bold');
  pdf.setFontSize(38);
  const tTitle1 = 'How do I start? Join the';
  const tTitle2 = 'Pathfinder Training.';
  if (!isDryRun) {
    pdf.setTextColor(COLOR_INK);
    pdf.text(tTitle1, MARGIN_X, ty + 30);
    pdf.text(tTitle2, MARGIN_X, ty + 72);
    drawBrushUnderline(pdf, MARGIN_X, ty + 77, pdf.getTextWidth(tTitle2));
  }
  ty += 96;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(15.5);
  const trainIntro =
    'In this hands-on training workshop, you will gain the mindset and skills to interact with the community:';
  const trainIntroLines: string[] = pdf.splitTextToSize(trainIntro, trainLeftW);
  if (!isDryRun) {
    pdf.setTextColor(COLOR_INK_MUTED);
    pdf.text(trainIntroLines, MARGIN_X, ty + 14, { lineHeightFactor: 24 / 15.5 });
  }
  ty += trainIntroLines.length * 24 + 22;

  const notebookY = ty;
  const trainingPoints = [
    {
      num: '01.',
      title: 'Respectful village entry',
      desc: "Navigate a village visit respectfully using EPIC's core principles for working alongside communities.",
    },
    {
      num: '02.',
      title: 'Stories into clear records',
      desc: 'Turn casual family chats into clear, accurate village records so nothing gets lost in translation.',
    },
    {
      num: '03.',
      title: 'Community-led questions',
      desc: 'Ask questions that empower villagers to share their own priorities rather than speaking for them.',
    },
    {
      num: '04.',
      title: 'Local cultural context',
      desc: 'Learn about the Orang Asli before stepping foot in the village and broaden your perspective.',
    },
  ];

  const marginColW = 68;
  const entryTextW = trainLeftW - marginColW - 44;
  const entryHeights = trainingPoints.map((pt) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(14.5);
    const descLines: string[] = pdf.splitTextToSize(pt.desc, entryTextW);
    return 18 + 24 + descLines.length * 22 + 18;
  });
  const notebookH = entryHeights.reduce((a, b) => a + b, 0);

  if (!isDryRun) {
    pdf.setFillColor(COLOR_IVORY);
    pdf.setDrawColor(COLOR_BORDER);
    pdf.setLineWidth(1);
    pdf.rect(MARGIN_X, notebookY, trainLeftW, notebookH, 'FD');

    pdf.setDrawColor('#EFEBE2');
    pdf.setLineWidth(0.6);
    for (let ruleY = notebookY + 28; ruleY < notebookY + notebookH; ruleY += 28) {
      pdf.line(MARGIN_X + 1, ruleY, MARGIN_X + trainLeftW - 1, ruleY);
    }

    pdf.setDrawColor('#F4B27D');
    pdf.setLineWidth(1);
    pdf.line(MARGIN_X + marginColW, notebookY, MARGIN_X + marginColW, notebookY + notebookH);
  }

  let entryY = notebookY;
  trainingPoints.forEach((pt, idx) => {
    const h = entryHeights[idx];
    if (!isDryRun) {
      if (idx > 0) {
        pdf.setDrawColor(COLOR_BORDER);
        pdf.setLineWidth(0.8);
        pdf.line(MARGIN_X, entryY, MARGIN_X + trainLeftW, entryY);
      }

      pdf.setFont('times', 'bolditalic');
      pdf.setFontSize(19);
      pdf.setTextColor(COLOR_ORANGE_INK);
      pdf.text(pt.num, MARGIN_X + 22, entryY + 34);

      pdf.setFont('times', 'bold');
      pdf.setFontSize(18);
      pdf.setTextColor(COLOR_INK);
      pdf.text(pt.title, MARGIN_X + marginColW + 22, entryY + 34);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(14.5);
      pdf.setTextColor(COLOR_INK_MUTED);
      const descLines: string[] = pdf.splitTextToSize(pt.desc, entryTextW);
      pdf.text(descLines, MARGIN_X + marginColW + 22, entryY + 58, {
        lineHeightFactor: 22 / 14.5,
      });
    }
    entryY += h;
  });

  // Right Column: Taped Workshop Bulletin Card
  const cardTopY = trainStartY + trainPadY + 28;
  const cardHeaderH = 74;
  const cardPadX = 24;
  const cardInnerW = trainRightW - cardPadX * 2;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14.5);
  const venueText = 'Placemaking Association of Johor, A57 Jalan Ismail, Kulai';
  const venueLines: string[] = pdf.splitTextToSize(venueText, cardInnerW - 22);
  const venueBlockH = 18 + venueLines.length * 21 + 16;

  const cardBodyH = 22 + 54 + venueBlockH + 54 + 12 + 46 + 24;
  const cardTotalH = cardHeaderH + cardBodyH;

  if (!isDryRun) {
    pdf.setFillColor(COLOR_IVORY);
    pdf.setDrawColor(COLOR_BORDER);
    pdf.setLineWidth(1);
    pdf.rect(trainRightX, cardTopY, trainRightW, cardTotalH, 'FD');

    pdf.setFillColor(COLOR_ORANGE);
    pdf.rect(trainRightX, cardTopY, trainRightW, cardHeaderH, 'F');
    pdf.setDrawColor(COLOR_BORDER);
    pdf.line(trainRightX, cardTopY + cardHeaderH, trainRightX + trainRightW, cardTopY + cardHeaderH);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11.5);
    pdf.setTextColor(COLOR_INK);
    pdf.text('Workshop Details · Kulai, Johor', trainRightX + cardPadX, cardTopY + 26);

    pdf.setFont('times', 'bold');
    pdf.setFontSize(24);
    pdf.text('The Pathfinder Training', trainRightX + cardPadX, cardTopY + 55);

    drawMaskingTape(pdf, trainRightX + 18, cardTopY - 10, 74, 20);
    drawMaskingTape(pdf, trainRightX + trainRightW - 92, cardTopY - 10, 74, 20);
  }

  let cy = cardTopY + cardHeaderH + 22;

  if (!isDryRun) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(COLOR_ORANGE_INK);
    pdf.text('Date & Time', trainRightX + cardPadX, cy + 12);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(15);
    pdf.setTextColor(COLOR_INK);
    pdf.text('Sat, 28 Nov 2026 · 2:00 PM - 5:00 PM', trainRightX + cardPadX, cy + 34);

    pdf.setDrawColor(COLOR_BORDER_SOFT);
    pdf.setLineWidth(0.8);
    pdf.line(trainRightX + cardPadX, cy + 46, trainRightX + trainRightW - cardPadX, cy + 46);
  }
  cy += 54;

  if (!isDryRun) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(COLOR_ORANGE_INK);
    pdf.text('Venue', trainRightX + cardPadX, cy + 12);

    drawMapPin(pdf, trainRightX + cardPadX + 6, cy + 20);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14.5);
    pdf.setTextColor(COLOR_INK);
    pdf.text(venueLines, trainRightX + cardPadX + 20, cy + 32, { lineHeightFactor: 21 / 14.5 });

    pdf.setDrawColor(COLOR_ORANGE);
    pdf.setLineWidth(1.4);
    venueLines.forEach((line, idx) => {
      const lw = pdf.getTextWidth(line);
      const lyLine = cy + 35 + idx * 21;
      pdf.line(trainRightX + cardPadX + 20, lyLine, trainRightX + cardPadX + 20 + lw, lyLine);
    });

    pdf.setDrawColor(COLOR_BORDER_SOFT);
    pdf.setLineWidth(0.8);
    pdf.line(
      trainRightX + cardPadX,
      cy + venueBlockH - 8,
      trainRightX + trainRightW - cardPadX,
      cy + venueBlockH - 8,
    );
  }
  link(trainRightX + cardPadX, cy + 18, cardInnerW, venueBlockH - 24, URL_MAPS);
  cy += venueBlockH;

  if (!isDryRun) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(COLOR_ORANGE_INK);
    pdf.text('Capacity & Deadline', trainRightX + cardPadX, cy + 12);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(15);
    pdf.setTextColor(COLOR_INK);
    pdf.text('30 spots only · Register by 20 Nov 2026', trainRightX + cardPadX, cy + 34);
  }
  cy += 54 + 12;

  const cardBtnLabel = 'Register Your Interest Here';
  if (!isDryRun) {
    pdf.setFillColor(COLOR_ORANGE);
    pdf.roundedRect(trainRightX + cardPadX, cy, cardInnerW, 46, 6, 6, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14.5);
    pdf.setTextColor(COLOR_INK);
    const labelW = pdf.getTextWidth(cardBtnLabel);
    const startTextX = trainRightX + cardPadX + (cardInnerW - (labelW + 18)) / 2;
    pdf.text(cardBtnLabel, startTextX, cy + 28);
    drawArrowUpRight(pdf, startTextX + labelW + 7, cy + 17, 10, COLOR_INK);
  }
  link(trainRightX + cardPadX, cy, cardInnerW, 46, URL_REGISTER);

  const trainEndY = Math.max(entryY, cardTopY + cardTotalH) + trainPadY;
  y = trainEndY;

  // =========================================================================
  // 5. ABOUT SECTION (#about)
  // =========================================================================
  const aboutStartY = y;
  const aboutPadY = 48;
  let ay = aboutStartY + aboutPadY;

  if (!isDryRun) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12.5);
    pdf.setTextColor(COLOR_ORANGE_INK);
    pdf.text('About the Organiser', MARGIN_X, ay + 12);
  }
  ay += 24;

  pdf.setFont('times', 'bold');
  pdf.setFontSize(36);
  const aboutTitleLines: string[] = pdf.splitTextToSize(
    'Meet EPIC: Extraordinary People Impacting Communities',
    760,
  );
  if (!isDryRun) {
    pdf.setTextColor(COLOR_INK);
    pdf.text(aboutTitleLines, MARGIN_X, ay + 28, { lineHeightFactor: 42 / 36 });
  }
  ay += aboutTitleLines.length * 42 + 14;

  const aboutBody =
    "EPIC is a multiple award-winning Malaysian social enterprise, founded in 2010. We bring people from all walks of life together to build stronger, more resilient communities. From building homes to planting farms, we bring together villagers and volunteers to make it happen. We're looking to build a community of volunteers with a wide range of skills and experiences.";
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(15);
  const aboutBodyLines: string[] = pdf.splitTextToSize(aboutBody, 760);
  if (!isDryRun) {
    pdf.setTextColor(COLOR_INK_MUTED);
    pdf.text(aboutBodyLines, MARGIN_X, ay + 14, { lineHeightFactor: 24 / 15 });
  }
  ay += aboutBodyLines.length * 24 + 8;

  const prefixText = 'Find us on ';
  const fbText = 'FB';
  const sepText = ' | ';
  const igText = 'Instagram @the.epichomes';
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(15);
  const prefixW = pdf.getTextWidth(prefixText);
  pdf.setFont('helvetica', 'bold');
  const fbW = pdf.getTextWidth(fbText);
  const sepW = pdf.getTextWidth(sepText);
  const igW = pdf.getTextWidth(igText);

  if (!isDryRun) {
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(COLOR_INK_MUTED);
    pdf.text(prefixText, MARGIN_X, ay + 14);

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(COLOR_ORANGE_INK);
    pdf.text(fbText, MARGIN_X + prefixW, ay + 14);
    pdf.setDrawColor(COLOR_ORANGE);
    pdf.setLineWidth(1.5);
    pdf.line(MARGIN_X + prefixW, ay + 17, MARGIN_X + prefixW + fbW, ay + 17);

    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(COLOR_BORDER);
    pdf.text(sepText, MARGIN_X + prefixW + fbW, ay + 14);

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(COLOR_ORANGE_INK);
    pdf.text(igText, MARGIN_X + prefixW + fbW + sepW, ay + 14);
    pdf.line(
      MARGIN_X + prefixW + fbW + sepW,
      ay + 17,
      MARGIN_X + prefixW + fbW + sepW + igW,
      ay + 17,
    );
  }
  link(MARGIN_X + prefixW, ay, fbW, 20, URL_FB);
  link(MARGIN_X + prefixW + fbW + sepW, ay, igW, 20, URL_IG);
  ay += 36;

  if (!isDryRun) {
    pdf.setDrawColor(COLOR_BORDER);
    pdf.setLineWidth(1);
    pdf.line(MARGIN_X, ay, MARGIN_X + CONTENT_W, ay);
  }
  ay += 28;

  const col2X = MARGIN_X + CONTENT_W / 2 + 24;
  const colHalfW = CONTENT_W / 2 - 24;

  if (!isDryRun) {
    pdf.setFont('times', 'bolditalic');
    pdf.setFontSize(17);
    pdf.setTextColor(COLOR_ORANGE_INK);
    pdf.text('Recognised by', MARGIN_X, ay + 14);
    pdf.text('As featured in', col2X, ay + 14);
  }
  ay += 28;

  const awards = [
    'Changemaker Award, MCIEA 2026',
    'iF Design Social Impact Prize (2026)',
    'ASEAN Outstanding Social Welfare and Development Award (2023)',
  ];
  let awardsY = ay;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(14.5);
  awards.forEach((award) => {
    const lines: string[] = pdf.splitTextToSize(award, colHalfW);
    if (!isDryRun) {
      pdf.setTextColor(COLOR_INK);
      pdf.text(lines, MARGIN_X, awardsY + 14, { lineHeightFactor: 21 / 14.5 });
    }
    awardsY += lines.length * 21 + 6;
  });

  const media = 'The Edge Malaysia  ·  New Straits Times  ·  Free Malaysia Today  ·  8TV  ·  BFM.my';
  const mediaLines: string[] = pdf.splitTextToSize(media, colHalfW);
  if (!isDryRun) {
    pdf.setTextColor(COLOR_INK);
    pdf.text(mediaLines, col2X, ay + 14, { lineHeightFactor: 23 / 14.5 });
  }
  const mediaY = ay + mediaLines.length * 23;

  const aboutEndY = Math.max(awardsY, mediaY) + aboutPadY;
  y = aboutEndY;

  // =========================================================================
  // 6. FOOTER
  // =========================================================================
  const footerStartY = y;
  const footerH = 74;
  const footerTextY = footerStartY + 42;

  if (!isDryRun) {
    pdf.setDrawColor(COLOR_BORDER);
    pdf.setLineWidth(1);
    pdf.line(0, footerStartY, PAGE_W, footerStartY);

    pdf.setFont('times', 'bold');
    pdf.setFontSize(15);
    pdf.setTextColor(COLOR_INK);
    pdf.text('EPIC', MARGIN_X, footerTextY);
    const epicW = pdf.getTextWidth('EPIC');

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(13);
    pdf.setTextColor(COLOR_INK_MUTED);
    pdf.text(
      ' - Extraordinary People Impacting Communities  |  Epic Society PPM-014-10-28112013',
      MARGIN_X + epicW,
      footerTextY,
    );
  }

  const fEmail = 'info@epic.my';
  const fSep1 = '  ·  ';
  const fFb = 'FB';
  const fSep2 = '  |  ';
  const fIg = 'IG @the.epichomes';
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(13);
  const fEmailW = pdf.getTextWidth(fEmail);
  const fFbW = pdf.getTextWidth(fFb);
  const fIgW = pdf.getTextWidth(fIg);
  pdf.setFont('helvetica', 'normal');
  const fSep1W = pdf.getTextWidth(fSep1);
  const fSep2W = pdf.getTextWidth(fSep2);

  const fTotalW = fEmailW + fSep1W + fFbW + fSep2W + fIgW;
  let fx = PAGE_W - MARGIN_X - fTotalW;

  if (!isDryRun) {
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(COLOR_INK);
    pdf.text(fEmail, fx, footerTextY);
    pdf.setDrawColor(COLOR_ORANGE);
    pdf.setLineWidth(1.2);
    pdf.line(fx, footerTextY + 3, fx + fEmailW, footerTextY + 3);
  }
  link(fx, footerTextY - 14, fEmailW, 20, 'mailto:info@epic.my');
  fx += fEmailW;

  if (!isDryRun) {
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(COLOR_BORDER);
    pdf.text(fSep1, fx, footerTextY);
  }
  fx += fSep1W;

  if (!isDryRun) {
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(COLOR_INK);
    pdf.text(fFb, fx, footerTextY);
    pdf.setDrawColor(COLOR_ORANGE);
    pdf.line(fx, footerTextY + 3, fx + fFbW, footerTextY + 3);
  }
  link(fx, footerTextY - 14, fFbW, 20, URL_FB);
  fx += fFbW;

  if (!isDryRun) {
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(COLOR_BORDER);
    pdf.text(fSep2, fx, footerTextY);
  }
  fx += fSep2W;

  if (!isDryRun) {
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(COLOR_INK);
    pdf.text(fIg, fx, footerTextY);
    pdf.setDrawColor(COLOR_ORANGE);
    pdf.line(fx, footerTextY + 3, fx + fIgW, footerTextY + 3);
  }
  link(fx, footerTextY - 14, fIgW, 20, URL_IG);

  const totalH = footerStartY + footerH;
  return { heroEndY, pathEndY, trainEndY, aboutEndY, totalH };
}

export async function exportEditablePdf(): Promise<void> {
  const [logo, heroPhoto, pathfinderPhoto] = await Promise.all([
    prepareImageAsset(LOGO_IMAGE_PATH, { format: 'PNG', maxWidth: 400 }),
    prepareImageAsset(HERO_IMAGE_PATH, {
      format: 'JPEG',
      targetAspect: 4 / 3,
      cropAlign: 'center',
      maxWidth: 1000,
    }),
    prepareImageAsset(PATHFINDER_IMAGE_PATH, {
      format: 'JPEG',
      targetAspect: 3 / 2,
      cropAlign: 'top',
      maxWidth: 1000,
    }),
  ]);

  const assets = { logo, heroPhoto, pathfinderPhoto };

  // Pass 1: Measure exact section bounds and total height
  const scratch = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [PAGE_W, 2200],
    hotfixes: ['px_scaling'],
  });
  const bounds = renderDocument(scratch, assets, true);

  // Pass 2: Render into exact-sized 1-page vector PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [PAGE_W, bounds.totalH],
    hotfixes: ['px_scaling'],
  });

  pdf.setProperties({
    title: 'EPIC Pathfinder - Tanah Abang Mission & Training Workshop',
    subject: 'Volunteer Field Brief',
    creator: 'EPIC Pathfinder',
  });

  renderDocument(pdf, assets, false, bounds);
  pdf.save('epic-pathfinder-tanah-abang.pdf');
}
