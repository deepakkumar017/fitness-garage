const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Email templates
const emailTemplates = {
  orderConfirmation: (orderNumber, customerName, orderTotal, deliveryDate) => ({
    subject: `Order Confirmation - #${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #667eea;">Order Confirmed! 🎉</h1>
        <p>Hi ${customerName},</p>
        <p>Thank you for your order! We're excited to get your items ready.</p>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details</h3>
          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p><strong>Order Total:</strong> ₹${orderTotal.toLocaleString()}</p>
          <p><strong>Estimated Delivery:</strong> ${deliveryDate}</p>
        </div>

        <p>You can track your order status in your account dashboard.</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #999; font-size: 0.9rem;">
          © 2024 Fitness Garage. All rights reserved.
        </p>
      </div>
    `
  }),

  passwordReset: (resetLink) => ({
    subject: 'Password Reset Request - Fitness Garage',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #667eea;">Reset Your Password</h1>
        <p>We received a request to reset your password.</p>
        
        <p style="margin: 30px 0;">
          <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Reset Password
          </a>
        </p>

        <p style="color: #999; font-size: 0.9rem;">
          If you didn't request a password reset, you can ignore this email.
          <br/>
          This link will expire in 24 hours.
        </p>
      </div>
    `
  }),

  emailVerification: (verificationLink) => ({
    subject: 'Verify Your Email - Fitness Garage',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #667eea;">Welcome to Fitness Garage!</h1>
        <p>Thank you for signing up. Please verify your email address to get started.</p>
        
        <p style="margin: 30px 0;">
          <a href="${verificationLink}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Verify Email
          </a>
        </p>

        <p style="color: #999; font-size: 0.9rem;">
          This link will expire in 24 hours.
        </p>
      </div>
    `
  }),

  orderShipped: (orderNumber, trackingId, deliveryDate) => ({
    subject: `Your Order #${orderNumber} Has Shipped!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #667eea;">Your Order is On the Way! 🚚</h1>
        <p>Great news! Your order has been shipped.</p>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Shipping Details</h3>
          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p><strong>Tracking ID:</strong> ${trackingId}</p>
          <p><strong>Estimated Delivery:</strong> ${deliveryDate}</p>
        </div>

        <p>Track your package in your account dashboard for real-time updates.</p>
      </div>
    `
  })
};

// Send email helper
const sendEmail = async (recipientEmail, templateName, ...args) => {
  try {
    if (!emailTemplates[templateName]) {
      throw new Error(`Email template ${templateName} not found`);
    }

    const emailContent = emailTemplates[templateName](...args);

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: recipientEmail,
      subject: emailContent.subject,
      html: emailContent.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${result.messageId}`);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Verify email configuration
const verifyEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log('✓ Email service is ready');
    return true;
  } catch (error) {
    console.error('✗ Email service error:', error.message);
    return false;
  }
};

module.exports = {
  sendEmail,
  verifyEmailConfig,
  transporter
};
