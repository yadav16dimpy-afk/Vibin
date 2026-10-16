import { NextRequest, NextResponse } from 'next/server';

/**
 * ==============================================================================
 * VIBIN SECURE RAZORPAY PAYMENT & CREDITS API
 * ==============================================================================
 * Route: POST /api/checkout
 * 
 * SECURITY BEST PRACTICE:
 * Razorpay Key Secret and payment capture webhooks must be strictly processed
 * on the backend. Never allow client code to update user_credits directly.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planTier } = body; // 'starter_49', 'pass_99', 'pro_299'

    const priceMap: Record<string, { amountInr: number; credits: number }> = {
      starter: { amountInr: 49, credits: 5 },
      pass: { amountInr: 99, credits: 15 },
      pro: { amountInr: 299, credits: 50 },
    };

    const tierInfo = priceMap[planTier] || priceMap.pass;

    /*
    // Future Razorpay server-side SDK call:
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (razorpayKeyId && razorpaySecret) {
      const razorpay = new Razorpay({ key_id: razorpayKeyId, key_secret: razorpaySecret });
      const order = await razorpay.orders.create({
        amount: tierInfo.amountInr * 100, // paise
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
      });
      return NextResponse.json({ orderId: order.id, amount: order.amount });
    }
    */

    return NextResponse.json({
      success: true,
      message: 'Checkout initialized in mock mode. Connect RAZORPAY_KEY_SECRET for live payments.',
      orderId: 'order_' + Math.random().toString(36).substring(2, 9),
      amountInr: tierInfo.amountInr,
      creditsToAdd: tierInfo.credits,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Payment initiation failed' },
      { status: 500 }
    );
  }
}
