const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const myOAuth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND,
);

// Gui mail
const sendMail = async (to, url, text) => {
  // Su dung phuong thuc setCredentials de lay ma truy cap
  myOAuth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  //Vì mã thông báo truy cập của chúng tôi sẽ hết hạn trong một khoảng thời gian cụ thể,
  // chúng tôi cần viết một dòng mã sẽ lấy mã thông báo truy cập mới khi nó hết hạn.
  const accessToken = myOAuth2Client.getAccessToken();

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    // dung OAuth de gui mail gium
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: 'ChildiT',
    html: `<table id="m_-8967697135683607433bodyTable" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f5f3" style="background-color:#f5f5f3">
      <tbody><tr>
        <td width="100%" style="padding:0 10px 30px 10px">
          <table class="m_-8967697135683607433width-full" width="100%" cellpadding="0" cellspacing="0" border="0" style="Margin:0 auto;max-width:600px">
            <tbody><tr>
              <td style="padding:30px 0 30px 0;text-align:center">
                <img src="https://res.cloudinary.com/dxnfxl89q/image/upload/v1622274371/Classdojo/sharing_t1fe72.png" style="display:block;Margin:0 auto;font-size:19px;color:#424242;line-height:28px;font-family:ProximaNova-Semibold,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif" width="158" alt="ClassDojo Logo" class="CToWUd">
              </td>
            </tr>
          </tbody></table>
          <table class="m_-8967697135683607433width-full" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="Margin:0 auto;max-width:600px">
          <tbody><tr><td><div style="display:none"></div>
          </td></tr><tr>
            <td style="width:100%;background-color:#fff;padding:30px 0" width="100%;">
              <table class="m_-8967697135683607433width-full" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="Margin:0 auto;max-width:600px">
                <tbody><tr>
                  <td style="padding:0 50px 0px 50px;text-align:left;vertical-align:middle;font-family:ProximaNova-Semibold,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif;font-size:24px;color:#424242;line-height:29px;text-align:center">
                    Bạn được mời tham gia lớp học của con bạn trên ChildiT
                  </td>
                </tr>
                  <tr>
                    <td style="padding:30px 50px 0px 50px;text-align:left;vertical-align:middle;font-family:ProximaNova-Regular,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif;font-size:18px;color:#424242;line-height:24px;white-space:pre-wrap;text-align:center">Tham gia lớp học của con bạn để xem ảnh và các cập nhật quan trọng.
Nhấp vào liên kết đặc biệt này để tham gia lớp học của bạn:
 <strong><a href="${url}" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://classdojo.com/PTZEZY7MM&amp;source=gmail&amp;ust=1621959805404000&amp;usg=AFQjCNFbCm5eNy2t26gGu7OElT7SxWGQKA">${url}</a></strong></td>
                  </tr>
              </tbody></table>
            </td>
          </tr>
          </tbody></table>
          <table class="m_-8967697135683607433width-full" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="Margin:0 auto;max-width:600px">
            <tbody><tr>
              <td style="padding:30px 0 15px 0;text-align:center;vertical-align:middle">
                <img src="https://ci3.googleusercontent.com/proxy/_pioaBgBrvHC4MhE5ziETB9QboOhpvO91HC3E6UcyFVygGQQVL4umbyoKS0jvjZvzyhdXn33iUwkFnQxo2GJmHK-kL9ZgpjybwI63_LuCoeG6yVChdYK=s0-d-e1-ft#https://static.classdojo.com/img/email/new/heart-email-bottom@2x.png" style="width:36px;height:36px;display:block;max-width:100%;Margin:0 auto;font-size:19px;color:#424242;line-height:36px;font-family:ProximaNova-Semibold,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif" width="36" alt="Hearts Footer Image" class="CToWUd">
              </td>
            </tr>
            <tr>
              <td style="font-family:ProximaNova-Regular,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif;color:#a7a7a7;line-height:24px;font-size:12px;text-align:center;padding:0 0 5px 0">
                Gửi yêu thương từ ChildiT
              </td>
            </tr>
          </tbody></table>
        </td>
      </tr>
    </tbody></table>`,
  };

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    return infor;
  });
};

module.exports = sendMail;
