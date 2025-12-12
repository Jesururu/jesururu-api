'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');

module.exports = createCoreController('api::book-sale.book-sale', ({ strapi }) => ({
  async create(ctx) {
    const { reference, customerEmail } = ctx.request.body.data;

    if (reference) {
      try {
        const secretKey = process.env.PAYSTACK_SECRET_KEY
        
        // 1. Verify with Paystack
        const verifyRes = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
          headers: { Authorization: `Bearer ${secretKey}` }
        });

        const pData = verifyRes.data.data;
        const auth = pData.authorization;
        const payer = pData.customer;

        // 2. Capture Technical Details
        if (auth) {
          ctx.request.body.data.bank = auth.bank;
          ctx.request.body.data.cardType = auth.card_type;
          ctx.request.body.data.last4 = auth.last4;
        }

        // 3. CAPTURE THE NAME (Logic Updated to match your DB)
        let foundName = null;

        if (auth && auth.account_name) {
            foundName = auth.account_name; // Bank Name
        } 
        else if (payer && (payer.first_name || payer.last_name)) {
            foundName = `${payer.first_name || ''} ${payer.last_name || ''}`.trim(); // Profile Name
        }
        else if (pData.metadata && pData.metadata.name) {
             foundName = pData.metadata.name; // Fallback to Form Name
        }

        // 🔥 CRITICAL FIX: Save it to 'payerAccountName' because that is what you have in Strapi
        if (foundName) {
            ctx.request.body.data.payerAccountName = foundName;
        }

        // 4. Capture Email
        if (payer && payer.email) {
            ctx.request.body.data.payerEmail = payer.email;
        }

      } catch (error) {
        console.error("Paystack Verification Warning:", error.message);
      }
    }

    const response = await super.create(ctx);
    return response;
  }
}));