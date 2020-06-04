import { Injectable } from '@nestjs/common';
import { EmailController } from './email.controller';
//import { SendGridService } from "@anchan828/nest-sendgrid";
import { AppLoggerService } from '../../logger/app-logger.service';
import { CreateEmailDto } from '../models/dto/create-email.dto';
import { UpgradeEmailDto } from '../models/dto/upgrade-email.dto';
import { ReceiveEmailDto } from '../models/dto/receive-email.dto';
import { StatusEmailDto } from '../models/dto/status-email.dto';
import { MailService } from '@sendgrid/mail';
import { ConfigService } from '../../config/modules/config.service';
import mail = require('@sendgrid/mail/src/mail');

@Injectable()
export class EmailService {
  private readonly _apikey: string;

  constructor(
    private appLoggerService: AppLoggerService,
    private mailService: MailService,
    private configService: ConfigService
  ) {
    appLoggerService.setContext('EmailService');
    this._apikey = this.configService.get('SENDGRID_API_KEY');
  }

  async create(emailData: CreateEmailDto): Promise<void> {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(this._apikey);
    const msg = {
      to: emailData.email,
      from: 'mecoccaro.16@est.ucab.edu.ve',
      subject: 'Welcome!',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                    <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                        <head>
                          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                          <!--[if !mso]><!-->
                          <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                          <!--<![endif]-->
                          <!--[if (gte mso 9)|(IE)]>
                          <xml>
                            <o:OfficeDocumentSettings>
                              <o:AllowPNG/>
                              <o:PixelsPerInch>96</o:PixelsPerInch>
                            </o:OfficeDocumentSettings>
                          </xml>
                          <![endif]-->
                          <!--[if (gte mso 9)|(IE)]>
                      <style type="text/css">
                        body {width: 600px;margin: 0 auto;}
                        table {border-collapse: collapse;}
                        table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
                        img {-ms-interpolation-mode: bicubic;}
                      </style>
                    <![endif]-->
                          <style type="text/css">
                        body, p, div {
                          font-family: arial,helvetica,sans-serif;
                          font-size: 14px;
                        }
                        body {
                          color: #000000;
                        }
                        body a {
                          color: #1188E6;
                          text-decoration: none;
                        }
                        p { margin: 0; padding: 0; }
                        table.wrapper {
                          width:100% !important;
                          table-layout: fixed;
                          -webkit-font-smoothing: antialiased;
                          -webkit-text-size-adjust: 100%;
                          -moz-text-size-adjust: 100%;
                          -ms-text-size-adjust: 100%;
                        }
                        img.max-width {
                          max-width: 100% !important;
                        }
                        .column.of-2 {
                          width: 50%;
                        }
                        .column.of-3 {
                          width: 33.333%;
                        }
                        .column.of-4 {
                          width: 25%;
                        }
                        @media screen and (max-width:480px) {
                          .preheader .rightColumnContent,
                          .footer .rightColumnContent {
                            text-align: left !important;
                          }
                          .preheader .rightColumnContent div,
                          .preheader .rightColumnContent span,
                          .footer .rightColumnContent div,
                          .footer .rightColumnContent span {
                            text-align: left !important;
                          }
                          .preheader .rightColumnContent,
                          .preheader .leftColumnContent {
                            font-size: 80% !important;
                            padding: 5px 0;
                          }
                          table.wrapper-mobile {
                            width: 100% !important;
                            table-layout: fixed;
                          }
                          img.max-width {
                            height: auto !important;
                            max-width: 100% !important;
                          }
                          a.bulletproof-button {
                            display: block !important;
                            width: auto !important;
                            font-size: 80%;
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                          }
                          .columns {
                            width: 100% !important;
                          }
                          .column {
                            display: block !important;
                            width: 100% !important;
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                            margin-left: 0 !important;
                            margin-right: 0 !important;
                          }
                          .social-icon-column {
                            display: inline-block !important;
                          }
                        }
                      </style>
                          <!--user entered Head Start--><!--End Head user entered-->
                        </head>
                        <body>
                          <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
                            <div class="webkit">
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                                <tr>
                                  <td valign="top" bgcolor="#FFFFFF" width="100%">
                                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td width="100%">
                                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                              <td>
                                                <!--[if mso]>
                        <center>
                        <table><tr><td width="600">
                      <![endif]-->
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                          <tr>
                                                            <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                        <tr>
                          <td role="module-content">
                            <p></p>
                          </td>
                        </tr>
                      </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9de0861b-8755-462c-a5be-ea8516351f2f">
                        <tbody>
                          <tr>
                            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                              <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:80% !important; width:80%; height:auto !important;" width="480" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/116a75880d432c70/c08c9bca-95a4-456a-a7a5-04e5813b147a/792x367.png">
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c2a694f3-0b07-49d5-9dd7-c30887b10dcb">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b81ba082-7546-4597-9dfc-d4036edf29e1">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                              <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 10px 0px;" bgcolor="#86b037"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ecd6f771-fe10-43cb-98df-a62d2ad78010" data-mc-module-version="2019-10-22">
                        <tbody>
                          <tr>
                            <td style="padding:18px 0px 18px 0px; line-height:23px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h3 style="text-align: left">Congratulations!&nbsp;</h3>
                    <h3 style="text-align: left">${emailData.name} now your Loyalty Points account is set for gaining a lot of points, be sure to add your preferred bank account.</h3>
                    <h3 style="text-align: left">Take a look to our plans so you can enjoy the benefits of being a Premium Loyalty Points costumer.</h3><div></div></div></td>
                          </tr>
                        </tbody>
                      </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="729e7b0e-395f-4e97-a8a8-b9cf8ec8ff02">
                          <tbody>
                            <tr>
                              <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
                                <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                                  <tbody>
                                    <tr>
                                    <td align="center" bgcolor="#86b037" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                      <a href="${process.env.FRONTEND_URL}/home" style="background-color:#86b037; border:1px solid #346125; border-color:#346125; border-radius:6px; border-width:1px; color:#fffefe; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:30px; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid; width:120px;" target="_blank">Home</a>
                                    </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7abeac3b-1139-4f67-b1ea-024fe57916a6">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a0d4750b-09a9-4b04-99f5-774351c8667a">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                              <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 10px 0px;" bgcolor="#86b037"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="2982d9a8-75a0-4c6c-aa4d-b7d959c8ec3a">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="1b2d50c4-8904-48ba-a505-964baaa30d29">
                        <tbody>
                          <tr>
                            <td valign="top" style="padding:0px 0px 0px 0px; font-size:6px; line-height:10px;" align="center">
                              <table align="center" style="-webkit-margin-start:auto;-webkit-margin-end:auto;">
                                <tbody><tr align="center"><td style="padding: 0px 5px;" class="social-icon-column">
                          <a role="social-icon-link" href="http://@testtw" target="_blank" alt="Twitter" title="Twitter" style="display:inline-block; background-color:#5583df; height:33px; width:33px;">
                            <img role="social-icon" alt="Twitter" title="Twitter" src="https://marketing-image-production.s3.amazonaws.com/social/white/twitter.png" style="height:33px; width:33px;" height="33" width="33">
                          </a>
                        </td><td style="padding: 0px 5px;" class="social-icon-column">
                          <a role="social-icon-link" href="http://@testig" target="_blank" alt="Instagram" title="Instagram" style="display:inline-block; background-color:#5583df; height:33px; width:33px;">
                            <img role="social-icon" alt="Instagram" title="Instagram" src="https://marketing-image-production.s3.amazonaws.com/social/white/instagram.png" style="height:33px; width:33px;" height="33" width="33">
                          </a>
                        </td></tr></tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a></p></div></td>
                                                          </tr>
                                                        </table>
                                                        <!--[if mso]>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </center>
                                                <![endif]-->
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </center>
                        </body>
                      </html>`,
    };
    sgMail.send(msg);
    this.appLoggerService.log(
      `Welcome email to ${emailData.email}`,
      'Email has been sent'
    );
  }

  async upgrade(emailData: UpgradeEmailDto): Promise<void> {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(this._apikey);
    const msg = {
      to: emailData.email,
      from: 'mecoccaro.16@est.ucab.edu.ve',
      subject: emailData.name + ' New ' + emailData.plan + ' plan',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                    <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                        <head>
                          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                          <!--[if !mso]><!-->
                          <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                          <!--<![endif]-->
                          <!--[if (gte mso 9)|(IE)]>
                          <xml>
                            <o:OfficeDocumentSettings>
                              <o:AllowPNG/>
                              <o:PixelsPerInch>96</o:PixelsPerInch>
                            </o:OfficeDocumentSettings>
                          </xml>
                          <![endif]-->
                          <!--[if (gte mso 9)|(IE)]>
                      <style type="text/css">
                        body {width: 600px;margin: 0 auto;}
                        table {border-collapse: collapse;}
                        table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
                        img {-ms-interpolation-mode: bicubic;}
                      </style>
                    <![endif]-->
                          <style type="text/css">
                        body, p, div {
                          font-family: arial,helvetica,sans-serif;
                          font-size: 14px;
                        }
                        body {
                          color: #000000;
                        }
                        body a {
                          color: #1188E6;
                          text-decoration: none;
                        }
                        p { margin: 0; padding: 0; }
                        table.wrapper {
                          width:100% !important;
                          table-layout: fixed;
                          -webkit-font-smoothing: antialiased;
                          -webkit-text-size-adjust: 100%;
                          -moz-text-size-adjust: 100%;
                          -ms-text-size-adjust: 100%;
                        }
                        img.max-width {
                          max-width: 100% !important;
                        }
                        .column.of-2 {
                          width: 50%;
                        }
                        .column.of-3 {
                          width: 33.333%;
                        }
                        .column.of-4 {
                          width: 25%;
                        }
                        @media screen and (max-width:480px) {
                          .preheader .rightColumnContent,
                          .footer .rightColumnContent {
                            text-align: left !important;
                          }
                          .preheader .rightColumnContent div,
                          .preheader .rightColumnContent span,
                          .footer .rightColumnContent div,
                          .footer .rightColumnContent span {
                            text-align: left !important;
                          }
                          .preheader .rightColumnContent,
                          .preheader .leftColumnContent {
                            font-size: 80% !important;
                            padding: 5px 0;
                          }
                          table.wrapper-mobile {
                            width: 100% !important;
                            table-layout: fixed;
                          }
                          img.max-width {
                            height: auto !important;
                            max-width: 100% !important;
                          }
                          a.bulletproof-button {
                            display: block !important;
                            width: auto !important;
                            font-size: 80%;
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                          }
                          .columns {
                            width: 100% !important;
                          }
                          .column {
                            display: block !important;
                            width: 100% !important;
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                            margin-left: 0 !important;
                            margin-right: 0 !important;
                          }
                          .social-icon-column {
                            display: inline-block !important;
                          }
                        }
                      </style>
                          <!--user entered Head Start--><!--End Head user entered-->
                        </head>
                        <body>
                          <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
                            <div class="webkit">
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                                <tr>
                                  <td valign="top" bgcolor="#FFFFFF" width="100%">
                                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td width="100%">
                                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                              <td>
                                                <!--[if mso]>
                        <center>
                        <table><tr><td width="600">
                      <![endif]-->
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                          <tr>
                                                            <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                        <tr>
                          <td role="module-content">
                            <p></p>
                          </td>
                        </tr>
                      </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="5e44ebe4-de36-4efe-a350-21dbc0e722ad">
                        <tbody>
                          <tr>
                            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                              <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:70% !important; width:70%; height:auto !important;" width="420" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/116a75880d432c70/c08c9bca-95a4-456a-a7a5-04e5813b147a/792x367.png">
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="554f7ac1-e309-431a-bf83-2e5ffb26d23e">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4b70b4d2-bd22-4df8-a244-6c32e4f7068d">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                              <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 10px 0px;" bgcolor="#86B037"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 0px 0px 0px;" bgcolor="#FFFFFF">
                        <tbody>
                          <tr role="module-content">
                            <td height="100%" valign="top"><table width="290" style="width:290px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
                          <tbody>
                            <tr>
                              <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8DoZcsML2ZqFK95wJfKjCK" data-mc-module-version="2019-10-22">
                        <tbody>
                          <tr>
                            <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><strong>Your new ${emailData.plan} plan has been activated!</strong></div>
                    <div style="font-family: inherit; text-align: inherit"><br></div>
                    <div style="font-family: inherit; text-align: inherit"><strong>Now you can enjoy all the benefits of your plan! Start using your points today and get a lot of money.</strong></div>
                    <div style="font-family: inherit; text-align: inherit"><br></div>
                    <div style="font-family: inherit; text-align: inherit"><strong>Thanks for being a Loyalty Points user!&nbsp;</strong></div><div></div></div></td>
                          </tr>
                        </tbody>
                      </table></td>
                            </tr>
                          </tbody>
                        </table><table width="290" style="width:290px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-1">
                          <tbody>
                            <tr>
                              <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="bc0dd1f6-9f6f-403f-9076-74c9dedb0dac">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                            </td>
                          </tr>
                        </tbody>
                      </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="63e5f93a-1f00-4821-a9b8-6415fff3b7b3">
                          <tbody>
                            <tr>
                              <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
                                <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                                  <tbody>
                                    <tr>
                                    <td align="center" bgcolor="#86B037" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                      <a href="" style="background-color:#86B037; border:1px solid #1b4115; border-color:#1b4115; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">Home</a>
                                    </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b479b9e2-8f76-4a98-a6c0-3409271e73d7">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                            </td>
                          </tr>
                        </tbody>
                      </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="cd9d8b27-1b80-4549-b22b-d2197a981e55">
                          <tbody>
                            <tr>
                              <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
                                <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                                  <tbody>
                                    <tr>
                                    <td align="center" bgcolor="#86B037" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                      <a href="" style="background-color:#86B037; border:1px solid #1B4115; border-color:#1B4115; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">Plans</a>
                                    </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table></td>
                            </tr>
                          </tbody>
                        </table></td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4791d977-757b-4fa9-b59c-61ecb9e212ac">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                              <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 10px 0px;" bgcolor="#86B037"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="6a97bf8c-e807-4956-8dbc-e6b15d87050a">
                        <tbody>
                          <tr>
                            <td valign="top" style="padding:0px 0px 0px 0px; font-size:6px; line-height:10px;" align="center">
                              <table align="center" style="-webkit-margin-start:auto;-webkit-margin-end:auto;">
                                <tbody><tr align="center"><td style="padding: 20px 5px;" class="social-icon-column">
                          <a role="social-icon-link" href="http://TW" target="_blank" alt="Twitter" title="Twitter" style="display:inline-block; background-color:#7AC4F7; height:30px; width:30px;">
                            <img role="social-icon" alt="Twitter" title="Twitter" src="https://marketing-image-production.s3.amazonaws.com/social/white/twitter.png" style="height:30px; width:30px;" height="30" width="30">
                          </a>
                        </td><td style="padding: 0px 5px;" class="social-icon-column">
                          <a role="social-icon-link" href="IG" target="_blank" alt="Instagram" title="Instagram" style="display:inline-block; background-color:#7F4B30; height:30px; width:30px;">
                            <img role="social-icon" alt="Instagram" title="Instagram" src="https://marketing-image-production.s3.amazonaws.com/social/white/instagram.png" style="height:30px; width:30px;" height="30" width="30">
                          </a>
                        </td></tr></tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a></p></div></td>
                                                          </tr>
                                                        </table>
                                                        <!--[if mso]>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </center>
                                                <![endif]-->
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </center>
                        </body>
                      </html>`,
    };
    sgMail.send(msg);
    this.appLoggerService.log(
      `Upgrade email to ${emailData.email}`,
      'Email has been sent'
    );
  }

  async receive(email: string, file): Promise<void> {
    const sgMail = require('@sendgrid/mail');

    sgMail.setApiKey(this._apikey);
    const msg = {
      to: email,
      from: 'mecoccaro.16@est.ucab.edu.ve',
      subject: 'Transaction receive',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
              <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                  <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                    <!--[if !mso]><!-->
                    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                    <!--<![endif]-->
                    <!--[if (gte mso 9)|(IE)]>
                    <xml>
                      <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                      </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    <!--[if (gte mso 9)|(IE)]>
                <style type="text/css">
                  body {width: 600px;margin: 0 auto;}
                  table {border-collapse: collapse;}
                  table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
                  img {-ms-interpolation-mode: bicubic;}
                </style>
              <![endif]-->
                    <style type="text/css">
                  body, p, div {
                    font-family: arial,helvetica,sans-serif;
                    font-size: 14px;
                  }
                  body {
                    color: #000000;
                  }
                  body a {
                    color: #1188E6;
                    text-decoration: none;
                  }
                  p { margin: 0; padding: 0; }
                  table.wrapper {
                    width:100% !important;
                    table-layout: fixed;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-size-adjust: 100%;
                    -moz-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                  }
                  img.max-width {
                    max-width: 100% !important;
                  }
                  .column.of-2 {
                    width: 50%;
                  }
                  .column.of-3 {
                    width: 33.333%;
                  }
                  .column.of-4 {
                    width: 25%;
                  }
                  @media screen and (max-width:480px) {
                    .preheader .rightColumnContent,
                    .footer .rightColumnContent {
                      text-align: left !important;
                    }
                    .preheader .rightColumnContent div,
                    .preheader .rightColumnContent span,
                    .footer .rightColumnContent div,
                    .footer .rightColumnContent span {
                      text-align: left !important;
                    }
                    .preheader .rightColumnContent,
                    .preheader .leftColumnContent {
                      font-size: 80% !important;
                      padding: 5px 0;
                    }
                    table.wrapper-mobile {
                      width: 100% !important;
                      table-layout: fixed;
                    }
                    img.max-width {
                      height: auto !important;
                      max-width: 100% !important;
                    }
                    a.bulletproof-button {
                      display: block !important;
                      width: auto !important;
                      font-size: 80%;
                      padding-left: 0 !important;
                      padding-right: 0 !important;
                    }
                    .columns {
                      width: 100% !important;
                    }
                    .column {
                      display: block !important;
                      width: 100% !important;
                      padding-left: 0 !important;
                      padding-right: 0 !important;
                      margin-left: 0 !important;
                      margin-right: 0 !important;
                    }
                    .social-icon-column {
                      display: inline-block !important;
                    }
                  }
                </style>
                    <!--user entered Head Start--><!--End Head user entered-->
                  </head>
                  <body>
                    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
                      <div class="webkit">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                          <tr>
                            <td valign="top" bgcolor="#FFFFFF" width="100%">
                              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td width="100%">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td>
                                          <!--[if mso]>
                  <center>
                  <table><tr><td width="600">
                <![endif]-->
                                                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                    <tr>
                                                      <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                  <tr>
                    <td role="module-content">
                      <p></p>
                    </td>
                  </tr>
                </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8460229e-da80-4d09-a845-a2022651fc4e">
                  <tbody>
                    <tr>
                      <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                        <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:70% !important; width:70%; height:auto !important;" width="420" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/116a75880d432c70/c08c9bca-95a4-456a-a7a5-04e5813b147a/792x367.png">
                      </td>
                    </tr>
                  </tbody>
                </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="cd15db78-90a2-4cbe-a611-9681df94f19d">
                  <tbody>
                    <tr>
                      <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                      </td>
                    </tr>
                  </tbody>
                </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9eb28655-f934-4e18-abea-6d231d36d5ae">
                  <tbody>
                    <tr>
                      <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                        <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                          <tbody>
                            <tr>
                              <td style="padding:0px 0px 10px 0px;" bgcolor="#86b037"></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="243c4f84-ed37-4e67-ae90-bf51a4830264" data-mc-module-version="2019-10-22">
                  <tbody>
                    <tr>
                      <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><strong>Your transaction was approved!</strong></div>
              <div style="font-family: inherit; text-align: inherit"><br></div>
     
              <div style="font-family: inherit; text-align: inherit"><strong>Your receive is attached to this email.</strong></div>
              <div style="font-family: inherit; text-align: inherit"><strong>Thank your for using Loyalty Points</strong></div>
              
             
              <div style="font-family: inherit; text-align: inherit"><br></div>
              
              <div style="font-family: inherit; text-align: inherit"><br></div><div></div></div></td>
                    </tr>
                  </tbody>
                </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="01134744-8df6-4cdb-9869-bd471c4c03fc">
                    <tbody>
                      <tr>
                        <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
                          <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                            <tbody>
                              <tr>
                              <td align="center" bgcolor="#86b037" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                <a href="" style="border:1px solid #156326; border-color:#156326; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid; background-color:#86b037; font-family:arial,helvetica,sans-serif;" target="_blank">Transactions</a>
                              </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0bce39bc-9697-40bb-9ff4-ea7b4971b2ef">
                  <tbody>
                    <tr>
                      <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                      </td>
                    </tr>
                  </tbody>
                </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9eb28655-f934-4e18-abea-6d231d36d5ae.1">
                  <tbody>
                    <tr>
                      <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                        <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                          <tbody>
                            <tr>
                              <td style="padding:0px 0px 10px 0px;" bgcolor="#86b037"></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9036f371-5f7c-47d3-ac39-82e4a5221dac">
                  <tbody>
                    <tr>
                      <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                      </td>
                    </tr>
                  </tbody>
                </table><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="fdfc8832-0600-462b-8994-195a5b173167">
                  <tbody>
                    <tr>
                      <td valign="top" style="padding:0px 0px 0px 0px; font-size:6px; line-height:10px;" align="center">
                        <table align="center" style="-webkit-margin-start:auto;-webkit-margin-end:auto;">
                          <tbody><tr align="center"><td style="padding: 0px 5px;" class="social-icon-column">
                    <a role="social-icon-link" href="http://tw" target="_blank" alt="Twitter" title="Twitter" style="display:inline-block; background-color:#7AC4F7; height:21px; width:21px;">
                      <img role="social-icon" alt="Twitter" title="Twitter" src="https://marketing-image-production.s3.amazonaws.com/social/white/twitter.png" style="height:21px; width:21px;" height="21" width="21">
                    </a>
                  </td><td style="padding: 0px 5px;" class="social-icon-column">
                    <a role="social-icon-link" href="ig" target="_blank" alt="Instagram" title="Instagram" style="display:inline-block; background-color:#7F4B30; height:21px; width:21px;">
                      <img role="social-icon" alt="Instagram" title="Instagram" src="https://marketing-image-production.s3.amazonaws.com/social/white/instagram.png" style="height:21px; width:21px;" height="21" width="21">
                    </a>
                  </td></tr></tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a></p></div></td>
                                                    </tr>
                                                  </table>
                                                  <!--[if mso]>
                                                </td>
                                              </tr>
                                            </table>
                                          </center>
                                          <![endif]-->
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </center>
                  </body>
                </html>`,
      attachments: [
        {
          filename: 'receive.pdf',
          type: file.mimetype,
          content: file.buffer.toString('base64'),
        },
      ],
    };
    sgMail.send(msg);
    this.appLoggerService.log(
      `Receive email to ${email}`,
      'Email has been sent'
    );
  }

  async status(emailData: StatusEmailDto): Promise<void> {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(this._apikey);
    const msg = {
      to: emailData.email,
      from: 'mecoccaro.16@est.ucab.edu.ve',
      subject: 'Transaction status',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                    <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                        <head>
                          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                          <!--[if !mso]><!-->
                          <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                          <!--<![endif]-->
                          <!--[if (gte mso 9)|(IE)]>
                          <xml>
                            <o:OfficeDocumentSettings>
                              <o:AllowPNG/>
                              <o:PixelsPerInch>96</o:PixelsPerInch>
                            </o:OfficeDocumentSettings>
                          </xml>
                          <![endif]-->
                          <!--[if (gte mso 9)|(IE)]>
                      <style type="text/css">
                        body {width: 600px;margin: 0 auto;}
                        table {border-collapse: collapse;}
                        table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
                        img {-ms-interpolation-mode: bicubic;}
                      </style>
                    <![endif]-->
                          <style type="text/css">
                        body, p, div {
                          font-family: arial,helvetica,sans-serif;
                          font-size: 14px;
                        }
                        body {
                          color: #000000;
                        }
                        body a {
                          color: #1188E6;
                          text-decoration: none;
                        }
                        p { margin: 0; padding: 0; }
                        table.wrapper {
                          width:100% !important;
                          table-layout: fixed;
                          -webkit-font-smoothing: antialiased;
                          -webkit-text-size-adjust: 100%;
                          -moz-text-size-adjust: 100%;
                          -ms-text-size-adjust: 100%;
                        }
                        img.max-width {
                          max-width: 100% !important;
                        }
                        .column.of-2 {
                          width: 50%;
                        }
                        .column.of-3 {
                          width: 33.333%;
                        }
                        .column.of-4 {
                          width: 25%;
                        }
                        @media screen and (max-width:480px) {
                          .preheader .rightColumnContent,
                          .footer .rightColumnContent {
                            text-align: left !important;
                          }
                          .preheader .rightColumnContent div,
                          .preheader .rightColumnContent span,
                          .footer .rightColumnContent div,
                          .footer .rightColumnContent span {
                            text-align: left !important;
                          }
                          .preheader .rightColumnContent,
                          .preheader .leftColumnContent {
                            font-size: 80% !important;
                            padding: 5px 0;
                          }
                          table.wrapper-mobile {
                            width: 100% !important;
                            table-layout: fixed;
                          }
                          img.max-width {
                            height: auto !important;
                            max-width: 100% !important;
                          }
                          a.bulletproof-button {
                            display: block !important;
                            width: auto !important;
                            font-size: 80%;
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                          }
                          .columns {
                            width: 100% !important;
                          }
                          .column {
                            display: block !important;
                            width: 100% !important;
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                            margin-left: 0 !important;
                            margin-right: 0 !important;
                          }
                          .social-icon-column {
                            display: inline-block !important;
                          }
                        }
                      </style>
                          <!--user entered Head Start--><!--End Head user entered-->
                        </head>
                        <body>
                          <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
                            <div class="webkit">
                              <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                                <tr>
                                  <td valign="top" bgcolor="#FFFFFF" width="100%">
                                    <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td width="100%">
                                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                              <td>
                                                <!--[if mso]>
                        <center>
                        <table><tr><td width="600">
                      <![endif]-->
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                          <tr>
                                                            <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                        <tr>
                          <td role="module-content">
                            <p></p>
                          </td>
                        </tr>
                      </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="159f11eb-1f55-4220-8183-ff84e1f83d4d">
                        <tbody>
                          <tr>
                            <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                              <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:70% !important; width:70%; height:auto !important;" width="420" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/116a75880d432c70/c08c9bca-95a4-456a-a7a5-04e5813b147a/792x367.png">
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="cad7b475-281e-4859-a361-80388457ea97">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4cb248f5-d0d2-4e8b-95a1-9846befa60e1">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                              <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 10px 0px;" bgcolor="#86b037"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="99b3e76b-aacc-47e4-af53-fbe637641bd2" data-mc-module-version="2019-10-22">
                        <tbody>
                          <tr>
                            <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><strong>The transaction ${emailData.id} is in progress the actual status is:</strong></div>
                    <div style="font-family: inherit; text-align: center"><strong>${emailData.status}</strong></div>
                    <div style="font-family: inherit; text-align: center"><br></div>
                    <div style="font-family: inherit; text-align: center"><strong>Go to your transactions tab and see all the process</strong></div><div></div></div></td>
                          </tr>
                        </tbody>
                      </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="888c1b3c-a307-42f7-b68c-afc07b3cc7e5">
                          <tbody>
                            <tr>
                              <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
                                <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                                  <tbody>
                                    <tr>
                                    <td align="center" bgcolor="#86b037" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                      <a href="" style="background-color:#86b037; border:1px solid #19450f; border-color:#19450f; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">Transactions</a>
                                    </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="3763d44b-fe62-413b-a506-007263c9603f">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4cb248f5-d0d2-4e8b-95a1-9846befa60e1.1">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                              <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 10px 0px;" bgcolor="#86b037"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9e388dbd-50f1-400f-b5f7-e38f8bf12c61">
                        <tbody>
                          <tr>
                            <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                            </td>
                          </tr>
                        </tbody>
                      </table><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a62044e2-886d-4c8e-b3fa-6253555d1688">
                        <tbody>
                          <tr>
                            <td valign="top" style="padding:0px 0px 0px 0px; font-size:6px; line-height:10px;" align="center">
                              <table align="center" style="-webkit-margin-start:auto;-webkit-margin-end:auto;">
                                <tbody><tr align="center"><td style="padding: 0px 5px;" class="social-icon-column">
                          <a role="social-icon-link" href="http://te" target="_blank" alt="Twitter" title="Twitter" style="display:inline-block; background-color:#7AC4F7; height:21px; width:21px;">
                            <img role="social-icon" alt="Twitter" title="Twitter" src="https://marketing-image-production.s3.amazonaws.com/social/white/twitter.png" style="height:21px; width:21px;" height="21" width="21">
                          </a>
                        </td><td style="padding: 0px 5px;" class="social-icon-column">
                          <a role="social-icon-link" href="http://ig" target="_blank" alt="Instagram" title="Instagram" style="display:inline-block; background-color:#7F4B30; height:21px; width:21px;">
                            <img role="social-icon" alt="Instagram" title="Instagram" src="https://marketing-image-production.s3.amazonaws.com/social/white/instagram.png" style="height:21px; width:21px;" height="21" width="21">
                          </a>
                        </td></tr></tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a></p></div></td>
                                                          </tr>
                                                        </table>
                                                        <!--[if mso]>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </center>
                                                <![endif]-->
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </center>
                        </body>
                      </html>`,
    };
    sgMail.send(msg);
    this.appLoggerService.log(
      `Status email to ${emailData.email}`,
      'Email has been sent'
    );
  }

  async recover(email: string, userId: number): Promise<void> {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(this._apikey);
    const msg = {
      to: email,
      from: 'mecoccaro.16@est.ucab.edu.ve',
      subject: 'Forgot Password',
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
              <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                  <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                    <!--[if !mso]><!-->
                    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                    <!--<![endif]-->
                    <!--[if (gte mso 9)|(IE)]>
                    <xml>
                      <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                      </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    <!--[if (gte mso 9)|(IE)]>
                <style type="text/css">
                  body {width: 600px;margin: 0 auto;}
                  table {border-collapse: collapse;}
                  table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
                  img {-ms-interpolation-mode: bicubic;}
                </style>
              <![endif]-->
                    <style type="text/css">
                  body, p, div {
                    font-family: arial,helvetica,sans-serif;
                    font-size: 14px;
                  }
                  body {
                    color: #000000;
                  }
                  body a {
                    color: #1188E6;
                    text-decoration: none;
                  }
                  p { margin: 0; padding: 0; }
                  table.wrapper {
                    width:100% !important;
                    table-layout: fixed;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-size-adjust: 100%;
                    -moz-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                  }
                  img.max-width {
                    max-width: 100% !important;
                  }
                  .column.of-2 {
                    width: 50%;
                  }
                  .column.of-3 {
                    width: 33.333%;
                  }
                  .column.of-4 {
                    width: 25%;
                  }
                  @media screen and (max-width:480px) {
                    .preheader .rightColumnContent,
                    .footer .rightColumnContent {
                      text-align: left !important;
                    }
                    .preheader .rightColumnContent div,
                    .preheader .rightColumnContent span,
                    .footer .rightColumnContent div,
                    .footer .rightColumnContent span {
                      text-align: left !important;
                    }
                    .preheader .rightColumnContent,
                    .preheader .leftColumnContent {
                      font-size: 80% !important;
                      padding: 5px 0;
                    }
                    table.wrapper-mobile {
                      width: 100% !important;
                      table-layout: fixed;
                    }
                    img.max-width {
                      height: auto !important;
                      max-width: 100% !important;
                    }
                    a.bulletproof-button {
                      display: block !important;
                      width: auto !important;
                      font-size: 80%;
                      padding-left: 0 !important;
                      padding-right: 0 !important;
                    }
                    .columns {
                      width: 100% !important;
                    }
                    .column {
                      display: block !important;
                      width: 100% !important;
                      padding-left: 0 !important;
                      padding-right: 0 !important;
                      margin-left: 0 !important;
                      margin-right: 0 !important;
                    }
                    .social-icon-column {
                      display: inline-block !important;
                    }
                  }
                </style>
                    <!--user entered Head Start--><!--End Head user entered-->
                  </head>
                  <body>
                    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
                      <div class="webkit">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                          <tr>
                            <td valign="top" bgcolor="#FFFFFF" width="100%">
                              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td width="100%">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td>
                                          <!--[if mso]>
                  <center>
                  <table><tr><td width="600">
                <![endif]-->
                                                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                    <tr>
                                                      <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                  <tr>
                    <td role="module-content">
                      <p></p>
                    </td>
                  </tr>
                </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="68cf531c-4cf4-4f63-b157-712af7eddb8c">
                  <tbody>
                    <tr>
                      <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                        <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:70% !important; width:70%; height:auto !important;" width="420" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/116a75880d432c70/c08c9bca-95a4-456a-a7a5-04e5813b147a/792x367.png">
                      </td>
                    </tr>
                  </tbody>
                </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="fa063c69-1323-4eb8-a128-ee2b2617907e">
                  <tbody>
                    <tr>
                      <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                      </td>
                    </tr>
                  </tbody>
                </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="04dc17bb-100e-4054-9868-d622a9c9d415">
                  <tbody>
                    <tr>
                      <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                        <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                          <tbody>
                            <tr>
                              <td style="padding:0px 0px 10px 0px;" bgcolor="#86b037"></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="aafa0f3d-e568-45be-9dff-20b43735eb5f">
                  <tbody>
                    <tr>
                      <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px"><strong>Your recovery password link is ready!</strong></span></div>
              <div style="font-family: inherit; text-align: center"><br></div>
              <div style="font-family: inherit; text-align: center"><br></div><div></div></div></td>
                    </tr>
                  </tbody>
                </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="2026ce15-c735-47e0-9d2f-8074ff221b6a">
                    <tbody>
                      <tr>
                        <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
                          <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                            <tbody>
                              <tr>
                              <td align="center" bgcolor="#86b037" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                <a href="http://localhost:3000/changepass/${userId}" style="background-color:#86b037; border:1px solid #333333; border-color:#333333; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">Recover Password</a>
                              </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c9d5060b-4867-49bf-a258-be9a52237163">
                  <tbody>
                    <tr>
                      <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><em>If the button doesn't work set this link in the browser:</em></div>
              <div style="font-family: inherit; text-align: center">http://localhost:3000/changepass/${userId}</div><div></div></div></td>
                    </tr>
                  </tbody>
                </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7605e4c1-af25-4eb5-b8dc-3f63606218ff">
                  <tbody>
                    <tr>
                      <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                        <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                          <tbody>
                            <tr>
                              <td style="padding:0px 0px 10px 0px;" bgcolor="#86b037"></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a></p></div></td>
                                                    </tr>
                                                  </table>
                                                  <!--[if mso]>
                                                </td>
                                              </tr>
                                            </table>
                                          </center>
                                          <![endif]-->
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </center>
                  </body>
                </html>`,
    };
    sgMail.send(msg);
    this.appLoggerService.log(
      `Recover email sent to ${email}`,
      'Email has been sent'
    );
  }
}
