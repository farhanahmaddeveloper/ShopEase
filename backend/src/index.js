'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('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');

    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],

      // Send email to new user
      async afterCreate({ params }) {
        const {
          data: { email },
        } = params;

        try {

          await sgMail.send({
            to: `${email}`,
            from: 'farhanrajpoot470@gmail.com',
            replyTo: 'farhanrajpoot470@gmail.com',
            subject: 'Account Confirmation Email',
            html: `<p>Thank you for registering!</p>
            <p>Your Account has been created successfully. Please be Login:</p>
            <br></br>
            <p>Regards</p>
            <p>ShopEase - Do Shopping with Ease</p> `,


          })
        } catch (err) {
          console.log(err);
        }
      },
    });

  }
};
