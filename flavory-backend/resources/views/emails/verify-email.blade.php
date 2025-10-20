<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
    <div style="max-width: 600px; margin: auto; border: 1px solid #dadce0; padding: 20px; border-radius: 8px;">        
        <!-- Logo -->
        <div style="text-align: center;">
            <img src="{{ $pathToImage }}" alt="Logo" style="height: 70px;">
        </div>

        <h2 style="color: #333;">Hello {{ $user->first_name }} {{ $user->last_name }},</h2>
        <p style="color: #555;">Thank you for signing up on our platform. Please verify your email address by clicking the link below:</p>

        <a href="{{ $verificationUrl }}" style="display: inline-block; padding: 18px 57px; font-family: 'Raleway', Arial, sans-serif; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: white; background-color: #e35640; text-decoration: none; cursor: pointer;">
            Verify Email
        </a>

        <p style="color: #555;">If you did not create an account, please ignore this email.</p>

        <p style="color: #555;">If you have any questions or run into any issues, feel free to contact us.</p>

        <p style="color: #555;">Best regards, <br> The Flavory Team</p>

        <!-- Footer -->
        <p style="margin-top: 20px; color: #999; font-size: 12px;">
            © {{ date('Y') }} Flavory™. All rights reserved.
        </p>
    </div>
</body>
</html>