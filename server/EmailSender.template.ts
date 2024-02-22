export const applicantForgotPasswordMail = (
  firstName: string,
  token: string
) => `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
        rel="stylesheet"
      />
      <title>Document</title>
    </head>
<body>  
    Hi,<span style="margin-left: 0.5rem; text-transform: capitalize">${firstName}</span>
            
      <hr
        style="
          width: 50%;
          border: 0.5px solid rgb(214, 211, 211);
          margin-top: 2rem;
          margin-bottom: 2rem;
        "
      />
      <center>
        <p
          style="
            text-align: center;
            line-height: 40px;
            color: #515759;
            font-family: 'Inter', sans-serif;
          "
        >
        You are receiving this email because you (or someone else) recently requested a password reset on HRMs for an account associated with this email address.
        <br/>If this is you, please click the button below to reset your account password.Please disregard this email if you did not initiate this action.
        </p>
      </center>
      <center>
        <button
          style="
            width: 240px;
            height: 56px;
            background: #1890ff;
            border-radius: 8px;
            margin-top: 21px;
            border: none;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            font-family: 'Inter', sans-serif;
            cursor: pointer;
          "
        >
        <a style="color: #fff; text-decoration: none;" href="${process.env.WALET_APPLICANT_RESET_PASSWORD_URL}?token=${token}" target="_blank">Reset Your Password</a>
        </button>
      </center>
    </body>
  </html>
`;
