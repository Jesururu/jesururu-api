export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'your.personal.email@gmail.com', // Put your real Gmail here
          pass: env('GMAIL_APP_PASSWORD'), // We will put the code in .env
        },
      },
      settings: {
        defaultFrom: 'your.personal.email@gmail.com',
        defaultReplyTo: 'your.personal.email@gmail.com',
      },
    },
  },
});