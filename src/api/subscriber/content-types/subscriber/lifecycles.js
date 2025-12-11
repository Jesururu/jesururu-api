module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      // This uses the email provider you configured (SendGrid/Gmail)
      await strapi.plugins['email'].services.email.send({
        to: result.Email,
        from: 'jude@jesururujude.com', // MUST match your verified sender in SendGrid
        subject: 'Welcome to the Family! 🕊️',
        text: `Hello ${result.Name},\n\nThank you for subscribing to the Daily Devotional list. You will now receive Kingdom perspectives every morning at 6AM.\n\nBlessings,\nJude Jesururu`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h1 style="color: #bf953f;">Welcome, ${result.Name}!</h1>
            <p>Thank you for joining our daily list. You have taken a great step toward starting your day with <strong>Faith & Excellence</strong>.</p>
            <p>Expect your first devotional tomorrow morning.</p>
            <br/>
            <p><em>Jude Jesururu</em></p>
          </div>
        `,
      });
      console.log(`✅ Welcome email sent to ${result.Email}`);
    } catch (err) {
      console.error("❌ Failed to send email:", err);
    }
  },
};