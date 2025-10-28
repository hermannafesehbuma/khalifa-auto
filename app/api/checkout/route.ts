import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend, emailTemplates } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    console.log('=== CHECKOUT API START ===');
    const body = await request.json();
    console.log('Request body received:', JSON.stringify(body, null, 2));

    const { customerData, paymentMethod, cartItems, totalAmount } = body;

    // Validate required fields
    if (!customerData || !paymentMethod || !cartItems || !totalAmount) {
      console.log('Missing required fields:', {
        customerData: !!customerData,
        paymentMethod: !!paymentMethod,
        cartItems: !!cartItems,
        totalAmount: !!totalAmount,
      });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Validating cart items:', cartItems);
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      console.log('Invalid cart items - not array or empty');
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // 1. Create order with guest information
    console.log('Step 1: Creating order...');
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        guest_name: `${customerData.first_name} ${customerData.last_name}`,
        guest_email: customerData.email,
        guest_phone: customerData.phone,
        total_amount: totalAmount,
        status: 'pending',
      })
      .select();

    if (orderError) {
      console.log('Order creation error:', orderError);
      throw orderError;
    }
    const orderId = order[0].id;
    console.log('Created order ID:', orderId);

    // 2. Create order items
    console.log('Step 2: Creating order items...');
    const orderItems = cartItems.map((item: any) => ({
      order_id: orderId,
      car_id: item.car.id,
      quantity: item.quantity,
      price: item.car.price,
    }));

    console.log('Order items to insert:', orderItems);
    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (orderItemsError) {
      console.log('Order items creation error:', orderItemsError);
      throw orderItemsError;
    }
    console.log('Created order items successfully');

    // 3. Prepare email data
    console.log('Step 3: Preparing email data...');
    console.log(
      'Sample cart item structure:',
      JSON.stringify(cartItems[0], null, 2)
    );

    const emailItems = cartItems.map((item: any) => {
      // Handle both 'make' and 'brand' fields for compatibility
      const carBrand = item.car.make || item.car.brand;
      console.log(
        `Car brand field: make=${item.car.make}, brand=${item.car.brand}, using=${carBrand}`
      );

      return {
        carBrand: carBrand,
        carModel: item.car.model,
        carYear: item.car.year,
        carPrice: item.car.price,
        quantity: item.quantity,
      };
    });

    const customerName = `${customerData.first_name} ${customerData.last_name}`;
    const customerAddress = `${customerData.address}, ${customerData.city}, ${customerData.state} ${customerData.zip_code}`;

    console.log('Email data prepared:', {
      orderId: orderId.toString(),
      customerName,
      customerEmail: customerData.email,
      totalAmount,
      paymentMethod,
      itemsCount: emailItems.length,
    });

    // 4. Send admin notification email
    console.log('Step 4: Sending admin notification email...');
    const adminEmailData = emailTemplates.orderNotification({
      orderId: orderId.toString(),
      customerName,
      customerEmail: customerData.email,
      customerPhone: customerData.phone,
      customerAddress,
      totalAmount,
      paymentMethod,
      items: emailItems,
    });

    const adminEmailResult = await resend.emails.send(adminEmailData);
    console.log('Admin email sent:', adminEmailResult);

    // 5. Send customer confirmation email
    console.log('Step 5: Sending customer confirmation email...');
    const customerEmailData = emailTemplates.orderConfirmation({
      orderId: orderId.toString(),
      customerName,
      totalAmount,
      paymentMethod,
      items: emailItems,
    });

    // Update the 'to' field with actual customer email
    customerEmailData.to = [customerData.email];

    const customerEmailResult = await resend.emails.send(customerEmailData);
    console.log('Customer email sent:', customerEmailResult);

    console.log('=== CHECKOUT API SUCCESS ===');
    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
        orderId: orderId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('=== CHECKOUT API ERROR ===');
    console.error('Checkout error details:', error);
    console.error(
      'Error message:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    console.error(
      'Error stack:',
      error instanceof Error ? error.stack : 'No stack trace'
    );
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}
