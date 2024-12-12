export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JapaWord - Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #ff7b00;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            margin: 10px 0;
        }
        .otp {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            font-size: 20px;
            font-weight: bold;
            color: #333333;
            background-color: #f1f1f1;
            border: 1px dashed #ff7b00;
            border-radius: 6px;
        }
        .footer {
            text-align: center;
            padding: 10px 20px;
            background-color: #f1f1f1;
            font-size: 12px;
            color: #666666;
        }
        .footer a {
            color: #ff7b00;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>こんにちは (Konnichiwa)!</p>
            <p>We received a request to reset your password for your JapaWord account. Use the OTP below to reset your password:</p>
            <div class="otp">{{otp}}</div>
            <p>If you didn’t request a password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 JapaWord. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`