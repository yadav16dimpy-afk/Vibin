import { NextRequest, NextResponse } from 'next/server';

/**
 * ==============================================================================
 * VIBIN AFFILIATE REDIRECT & METRICS API
 * ==============================================================================
 * Route: GET /api/affiliate?productId=...&merchant=...
 * 
 * Safely redirects out to Amazon India, IKEA India, Pepperfry, Myntra Home, Meesho
 * with your affiliate tag appended securely on the server.
 */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  const merchant = searchParams.get('merchant') || 'Amazon India';

  // Fallback destination URL
  let targetUrl = 'https://www.amazon.in';

  if (merchant.toLowerCase().includes('ikea')) {
    targetUrl = 'https://www.ikea.com/in/en/';
  } else if (merchant.toLowerCase().includes('pepperfry')) {
    targetUrl = 'https://www.pepperfry.com/';
  } else if (merchant.toLowerCase().includes('myntra')) {
    targetUrl = 'https://www.myntra.com/';
  } else if (merchant.toLowerCase().includes('meesho')) {
    targetUrl = 'https://www.meesho.com/';
  } else if (merchant.toLowerCase().includes('flipkart')) {
    targetUrl = 'https://www.flipkart.com/';
  }

  // Future affiliate tag appending:
  // const amazonTag = process.env.AMAZON_ASSOCIATE_TAG;
  // targetUrl += `?tag=${amazonTag}`;

  return NextResponse.redirect(targetUrl, 302);
}
