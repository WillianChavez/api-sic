import nodemailer from 'nodemailer';
import mjml2html from 'mjml';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  service: process.env.MAIL_SERVICE,
  port: process.env.MAIL_PORT * 1,
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
export default class Mailer {
  static async sendMail(params) {
    const {
      email, header, subject, message, body = [], sections = [],
    } = params;

    const dirname = path.dirname(new URL(import.meta.url).pathname);
    const bannerPath = path.join(dirname, '../../public/banner.png');

    const { html } = mjml2html({
      tagName: 'mjml',
      attributes: {},
      children: [
        {
          tagName: 'mj-body',
          attributes: {},
          children: [
            {
              tagName: 'mj-section',
              attributes: {},
              children: [
                {
                  tagName: 'mj-column',
                  attributes: {},
                  children: [
                    ...header,
                    {
                      tagName: 'mj-image',
                      attributes: {
                        width: '1000px',
                        src: 'cid:banner',
                      },
                    },
                    {
                      tagName: 'mj-spacer',
                      attributes: {
                        'css-class': 'primary',
                      },
                    },
                    {
                      tagName: 'mj-divider',
                      attributes: {
                        'border-width': '3px',
                        'border-color': '#175efb',
                      },
                    },
                    {
                      tagName: 'mj-text',
                      attributes: {
                        align: 'center',
                        'font-weight': 'bold',
                        'font-size': '12px',
                      },
                      content: message,
                    },
                    ...body,
                  ],
                },
              ],
            },
            ...sections,
          ],
        },
      ],
    });

    await transporter.verify();

    const mailConfig = {
      from: `${process.env.SISTEM_NAME} <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      html,
      attachments: [
        {
          filename: 'banner.png',
          path: bannerPath,
          cid: 'banner',
        },
      ],
    };

    const send = await transporter.sendMail(mailConfig);
    return send;
  }
}
