import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export { resend };

// Email templates
export const emailTemplates = {
  contactForm: (data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) => ({
    from: 'Khalifa Auto <noreply@khalifaautotrading.com>',
    to: ['contact@khalifaautotrading.com'],
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0D3B66 0%, #1a4d7a 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Khalifa Auto Trading</h1>
          <p style="color: #F95738; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">Premium Automotive Solutions</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #0D3B66; margin: 0 0 20px 0; font-size: 24px; border-bottom: 3px solid #F95738; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #F95738;">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h3>
            <div style="display: grid; gap: 10px;">
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Name:</strong> ${data.name}</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Email:</strong> ${data.email}</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Phone:</strong> ${data.phone}</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Subject:</strong> ${data.subject}</p>
            </div>
          </div>
          
          <div style="background: #ffffff; padding: 25px; border: 2px solid #e9ecef; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #F95738;">
              <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.6;">${data.message}</p>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #0D3B66; padding: 25px 20px; text-align: center;">
          <p style="margin: 0; color: #ffffff; font-size: 14px;">
            This email was sent from the Khalifa Auto Trading contact form.
          </p>
          <div style="margin-top: 15px;">
            <a href="tel:+9715083633902" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500;">📞 +9715083633902</a>
            <a href="mailto:contact@khalifaautotrading.com" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500;">✉️ contact@khalifaautotrading.com</a>
          </div>
        </div>
      </div>
    `,
  }),

  financingApplication: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    income: string;
    creditScore: string;
    downPayment: string;
    loanAmount: string;
    employmentStatus: string;
    additionalInfo: string;
  }) => ({
    from: 'Khalifa Auto <noreply@khalifaautotrading.com>',
    to: ['contact@khalifaautotrading.com'],
    subject: 'New Financing Application Submission',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0D3B66 0%, #1a4d7a 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Khalifa Auto Trading</h1>
          <p style="color: #F95738; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">Premium Automotive Solutions</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #0D3B66; margin: 0 0 20px 0; font-size: 24px; border-bottom: 3px solid #F95738; padding-bottom: 10px;">New Financing Application</h2>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #F95738;">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Personal Information</h3>
            <div style="display: grid; gap: 10px;">
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Name:</strong> ${
                data.firstName
              } ${data.lastName}</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Email:</strong> ${
                data.email
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Phone:</strong> ${
                data.phone
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Employment Status:</strong> ${
                data.employmentStatus
              }</p>
            </div>
          </div>
          
          <div style="background: #ffffff; padding: 25px; border: 2px solid #e9ecef; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 25px 0;">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Financial Information</h3>
            <div style="display: grid; gap: 10px;">
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Annual Income:</strong> ${
                data.income
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Credit Score:</strong> ${
                data.creditScore
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Down Payment:</strong> ${
                data.downPayment
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Loan Amount:</strong> ${
                data.loanAmount
              }</p>
            </div>
          </div>
          
          ${
            data.additionalInfo
              ? `
          <div style="background: #ffffff; padding: 25px; border: 2px solid #e9ecef; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Additional Information</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #F95738;">
              <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.6;">${data.additionalInfo}</p>
            </div>
          </div>
        `
              : ''
          }
        </div>
        
        <!-- Footer -->
        <div style="background: #0D3B66; padding: 25px 20px; text-align: center;">
          <p style="margin: 0; color: #ffffff; font-size: 14px;">
            This financing application was submitted through the Khalifa Auto Trading website.
          </p>
          <div style="margin-top: 15px;">
            <a href="tel:+9715083633902" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500;">📞 +9715083633902</a>
            <a href="mailto:contact@khalifaautotrading.com" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500;">✉️ contact@khalifaautotrading.com</a>
          </div>
        </div>
      </div>
    `,
  }),

  tradeInForm: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    year: string;
    make: string;
    model: string;
    mileage: string;
    condition: string;
    vin: string;
    additionalInfo: string;
  }) => ({
    from: 'Khalifa Auto <noreply@khalifaautotrading.com>',
    to: ['contact@khalifaautotrading.com'],
    subject: 'New Trade-In Request',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0D3B66 0%, #1a4d7a 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Khalifa Auto Trading</h1>
          <p style="color: #F95738; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">Premium Automotive Solutions</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #0D3B66; margin: 0 0 20px 0; font-size: 24px; border-bottom: 3px solid #F95738; padding-bottom: 10px;">New Trade-In Request</h2>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #F95738;">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h3>
            <div style="display: grid; gap: 10px;">
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Name:</strong> ${
                data.firstName
              } ${data.lastName}</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Email:</strong> ${
                data.email
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Phone:</strong> ${
                data.phone
              }</p>
            </div>
          </div>
          
          <div style="background: #ffffff; padding: 25px; border: 2px solid #e9ecef; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 25px 0;">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Vehicle Information</h3>
            <div style="display: grid; gap: 10px;">
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Year:</strong> ${
                data.year
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Make:</strong> ${
                data.make
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Model:</strong> ${
                data.model
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Mileage:</strong> ${
                data.mileage
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Condition:</strong> ${
                data.condition
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">VIN:</strong> ${
                data.vin
              }</p>
            </div>
          </div>
          
          ${
            data.additionalInfo
              ? `
          <div style="background: #ffffff; padding: 25px; border: 2px solid #e9ecef; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Additional Information</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #F95738;">
              <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.6;">${data.additionalInfo}</p>
            </div>
          </div>
        `
              : ''
          }
        </div>
        
        <!-- Footer -->
        <div style="background: #0D3B66; padding: 25px 20px; text-align: center;">
          <p style="margin: 0; color: #ffffff; font-size: 14px;">
            This trade-in request was submitted through the Khalifa Auto Trading website.
          </p>
          <div style="margin-top: 15px;">
            <a href="tel:+9715083633902" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500;">📞 +9715083633902</a>
            <a href="mailto:contact@khalifaautotrading.com" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500;">✉️ contact@khalifaautotrading.com</a>
          </div>
        </div>
      </div>
    `,
  }),

  carInquiry: (data: {
    name: string;
    email: string;
    phone: string;
    carInfo: string;
    message: string;
  }) => ({
    from: 'Khalifa Auto <noreply@khalifaautotrading.com>',
    to: ['contact@khalifaautotrading.com'],
    subject: `Car Inquiry: ${data.carInfo}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0D3B66 0%, #1a4d7a 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Khalifa Auto Trading</h1>
          <p style="color: #F95738; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">Premium Automotive Solutions</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #0D3B66; margin: 0 0 20px 0; font-size: 24px; border-bottom: 3px solid #F95738; padding-bottom: 10px;">New Car Inquiry</h2>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #F95738;">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Contact Information</h3>
            <div style="display: grid; gap: 10px;">
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Name:</strong> ${data.name}</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Email:</strong> ${data.email}</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Phone:</strong> ${data.phone}</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Vehicle:</strong> ${data.carInfo}</p>
            </div>
          </div>
          
          <div style="background: #ffffff; padding: 25px; border: 2px solid #e9ecef; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #F95738;">
              <p style="margin: 0; white-space: pre-wrap; color: #333; line-height: 1.6;">${data.message}</p>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #0D3B66; padding: 25px 20px; text-align: center;">
          <p style="margin: 0; color: #ffffff; font-size: 14px;">
            This inquiry was submitted through the Khalifa Auto Trading website.
          </p>
          <div style="margin-top: 15px;">
            <a href="tel:+9715083633902" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500;">📞 +9715083633902</a>
            <a href="mailto:contact@khalifaautotrading.com" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500;">✉️ contact@khalifaautotrading.com</a>
          </div>
        </div>
      </div>
    `,
  }),

  orderNotification: (data: {
    orderId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    totalAmount: number;
    paymentMethod: string;
    items: Array<{
      carBrand: string;
      carModel: string;
      carYear: number;
      carPrice: number;
      quantity: number;
    }>;
  }) => ({
    from: 'Khalifa Auto <noreply@khalifaautotrading.com>',
    to: ['contact@khalifaautotrading.com'],
    subject: `New Order #${data.orderId} - ${data.customerName}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0D3B66 0%, #1a4d7a 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Khalifa Auto Trading</h1>
          <p style="color: #F95738; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">Premium Automotive Solutions</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 20px;">
          <h2 style="color: #0D3B66; margin: 0 0 20px 0; font-size: 24px; border-bottom: 3px solid #F95738; padding-bottom: 10px;">New Order Received</h2>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #F95738;">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Order Information</h3>
            <div style="display: grid; gap: 10px;">
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Order ID:</strong> #${
                data.orderId
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Total Amount:</strong> $${data.totalAmount.toLocaleString()}</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Payment Method:</strong> ${
                data.paymentMethod
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div style="background: #ffffff; padding: 25px; border: 2px solid #e9ecef; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 25px 0;">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Customer Information</h3>
            <div style="display: grid; gap: 10px;">
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Name:</strong> ${
                data.customerName
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Email:</strong> ${
                data.customerEmail
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Phone:</strong> ${
                data.customerPhone
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Address:</strong> ${
                data.customerAddress
              }</p>
            </div>
          </div>
          
          <div style="background: #ffffff; padding: 25px; border: 2px solid #e9ecef; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">Order Items</h3>
            ${data.items
              .map(
                (item) => `
            <div style="border-bottom: 1px solid #e9ecef; padding: 15px 0; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <p style="margin: 0; font-size: 16px; font-weight: bold; color: #0D3B66;">${
                  item.carYear
                } ${item.carBrand} ${item.carModel}</p>
                <p style="margin: 5px 0 0 0; color: #666;">Quantity: ${
                  item.quantity
                }</p>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0; font-size: 16px; font-weight: bold; color: #F95738;">$${item.carPrice.toLocaleString()}</p>
              </div>
            </div>
          `
              )
              .join('')}
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #0D3B66; padding: 25px 20px; text-align: center;">
          <p style="margin: 0; color: #ffffff; font-size: 14px;">
            This order was placed through the Khalifa Auto Trading website. Please process the order and contact the customer.
          </p>
          <div style="margin-top: 15px;">
            <a href="tel:+9715083633902" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500;">📞 +9715083633902</a>
            <a href="mailto:contact@khalifaautotrading.com" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500;">✉️ contact@khalifaautotrading.com</a>
          </div>
        </div>
      </div>
    `,
  }),

  orderConfirmation: (data: {
    orderId: string;
    customerName: string;
    totalAmount: number;
    paymentMethod: string;
    items: Array<{
      carBrand: string;
      carModel: string;
      carYear: number;
      carPrice: number;
      quantity: number;
    }>;
  }) => ({
    from: 'Khalifa Auto <noreply@khalifaautotrading.com>',
    to: [data.customerName], // This will be replaced with actual customer email
    subject: `Order Confirmation #${data.orderId} - Khalifa Auto`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0D3B66 0%, #1a4d7a 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">Thank You for Your Order!</h1>
          <p style="color: #F95738; margin: 15px 0 0 0; font-size: 18px; font-weight: 500;">Your order has been received and is being processed</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 20px;">
          <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #F95738;">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 20px;">Order Summary</h3>
            <div style="display: grid; gap: 10px;">
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Order ID:</strong> #${
                data.orderId
              }</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Order Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Total Amount:</strong> $${data.totalAmount.toLocaleString()}</p>
              <p style="margin: 0; color: #333;"><strong style="color: #0D3B66;">Payment Method:</strong> ${
                data.paymentMethod
              }</p>
            </div>
          </div>

          <div style="background: #ffffff; padding: 25px; border: 2px solid #e9ecef; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h3 style="color: #0D3B66; margin: 0 0 20px 0; font-size: 20px;">Your Vehicles</h3>
            ${data.items
              .map(
                (item) => `
            <div style="border-bottom: 1px solid #e9ecef; padding: 20px 0; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <p style="margin: 0; font-size: 18px; font-weight: bold; color: #0D3B66;">${
                  item.carYear
                } ${item.carBrand} ${item.carModel}</p>
                <p style="margin: 5px 0 0 0; color: #666;">Quantity: ${
                  item.quantity
                }</p>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0; font-size: 18px; font-weight: bold; color: #F95738;">$${item.carPrice.toLocaleString()}</p>
              </div>
            </div>
          `
              )
              .join('')}
          </div>

          <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 5px solid #F95738;">
            <h3 style="color: #0D3B66; margin: 0 0 15px 0; font-size: 18px;">What's Next?</h3>
            <p style="margin: 0 0 15px 0; color: #333;">Our team will review your order and contact you within 24 hours to:</p>
            <ul style="margin: 0; padding-left: 20px; color: #333;">
              <li style="margin-bottom: 8px;">Confirm your order details</li>
              <li style="margin-bottom: 8px;">Schedule vehicle inspection (if needed)</li>
              <li style="margin-bottom: 8px;">Arrange payment processing</li>
              <li style="margin-bottom: 8px;">Coordinate delivery or pickup</li>
            </ul>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #0D3B66; padding: 30px 20px; text-align: center;">
          <h3 style="margin: 0 0 15px 0; color: #ffffff; font-size: 20px;">Questions?</h3>
          <p style="margin: 0 0 20px 0; color: #ffffff;">Contact us anytime for assistance</p>
          <div style="margin-top: 20px;">
            <a href="tel:+9715083633902" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500; font-size: 16px;">📞 +9715083633902</a>
            <a href="mailto:contact@khalifaautotrading.com" style="color: #F95738; text-decoration: none; margin: 0 15px; font-weight: 500; font-size: 16px;">✉️ contact@khalifaautotrading.com</a>
          </div>
          <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #1a4d7a;">
            <p style="margin: 0; font-size: 14px; color: #F95738; font-weight: 500;">
              Thank you for choosing Khalifa Auto Trading!
            </p>
          </div>
        </div>
      </div>
    `,
  }),
};
