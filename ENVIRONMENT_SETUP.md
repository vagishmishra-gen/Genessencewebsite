# Environment Variables Configuration

## Required Environment Variables

Set these environment variables in your Vercel dashboard:

### Gmail SMTP Configuration
```
SMTP_USER=contact@genessence.ai
SMTP_PASS=xant uvcu unqy hhsy
SENDER_EMAIL=contact@genessence.ai
RECEIVER_EMAIL=hello@genessence.ai
```

### Optional SMTP Settings (defaults provided)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
```

## How to Set Environment Variables in Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project

2. **Navigate to Settings**
   - Click on your project
   - Go to "Settings" tab
   - Click on "Environment Variables" in the sidebar

3. **Add Variables**
   - Click "Add New"
   - Enter variable name (e.g., `SMTP_USER`)
   - Enter variable value (e.g., `contact@genessence.ai`)
   - Select environments: Production, Preview, Development
   - Click "Save"

4. **Repeat for all variables**
   - Add each environment variable listed above
   - Make sure to set them for all environments

5. **Redeploy**
   - After adding all variables, redeploy your project
   - Environment variables take effect on the next deployment

## Gmail App Password Setup

1. **Enable 2-Factor Authentication**
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Security → 2-Step Verification → Turn on

2. **Generate App Password**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Enter "Genessence Website" as the name
   - Copy the generated 16-character password
   - Use this password as `SMTP_PASS`

## Security Notes

- **Never commit environment variables to git**
- **Use different passwords for different environments**
- **Regularly rotate app passwords**
- **Monitor email sending limits**

## Testing Environment Variables

You can test if environment variables are set correctly by:

1. **Check Vercel Function Logs**
   - Go to Vercel Dashboard → Functions tab
   - Check logs for any authentication errors

2. **Test Email Sending**
   - Submit a test form
   - Check if email is received
   - Check function logs for errors

## Troubleshooting

### Common Issues

1. **"Authentication failed" error**
   - Check if 2FA is enabled on Gmail
   - Verify app password is correct
   - Ensure `SMTP_USER` is the correct email

2. **"Connection timeout" error**
   - Check if `SMTP_HOST` and `SMTP_PORT` are correct
   - Verify `SMTP_SECURE` is set to `true`

3. **"Invalid credentials" error**
   - Regenerate app password
   - Update `SMTP_PASS` in Vercel dashboard
   - Redeploy the project

### Debug Steps

1. **Check Vercel Function Logs**
   ```bash
   vercel logs --follow
   ```

2. **Test Locally**
   ```bash
   vercel dev
   ```

3. **Verify Environment Variables**
   - Check Vercel dashboard
   - Ensure variables are set for correct environment
   - Redeploy after changes
