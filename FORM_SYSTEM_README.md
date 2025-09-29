# Email Form Submission System

A complete email functionality implementation for React + Vite websites deployed on Vercel, featuring contact forms and job applications with file uploads.

## 🚀 Features

- **Contact Form**: Lead generation with comprehensive business information
- **Job Application Form**: Complete application process with file uploads
- **File Upload Support**: Resume, cover letter, and portfolio attachments
- **Professional Email Templates**: HTML-formatted emails with company branding
- **Client-side Validation**: Real-time form validation with error messages
- **Loading States**: User-friendly loading indicators during submission
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Mobile-friendly forms with TailwindCSS
- **Security**: Environment variable configuration and file validation

## 📁 Project Structure

```
├── api/
│   └── send-email.js          # Vercel serverless function
├── src/
│   ├── components/
│   │   ├── ContactForm.jsx    # Contact/inquiry form
│   │   └── JobApplicationForm.jsx # Job application form
│   └── utils/
│       └── emailService.js    # Email service utilities
├── ENVIRONMENT_SETUP.md       # Environment variables guide
└── README.md                  # This file
```

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
npm install nodemailer formidable
```

### 2. Environment Variables

Set these environment variables in your Vercel dashboard:

```env
SMTP_USER=contact@genessence.ai
SMTP_PASS=xant uvcu unqy hhsy
SENDER_EMAIL=contact@genessence.ai
RECEIVER_EMAIL=vagish.mishra@genessence.ai
```

**See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for detailed setup instructions.**

### 3. Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use the generated password as `SMTP_PASS`

## 🚀 Deployment

### Deploy to Vercel

1. **Connect Repository**
   ```bash
   vercel --prod
   ```

2. **Set Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all required variables (see ENVIRONMENT_SETUP.md)

3. **Redeploy**
   - Environment variables take effect on the next deployment
   - Trigger a new deployment after setting variables

## 📝 Usage

### Contact Form

```jsx
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div>
      <ContactForm />
    </div>
  );
}
```

**Contact Form Fields:**
- First Name (required)
- Last Name
- Work Email (required)
- Contact Number
- Company Name
- Company Size
- Industry
- Your Role
- Biggest Challenge (textarea)
- Areas of Interest (checkboxes)
- Timeline (select)

### Job Application Form

```jsx
import JobApplicationForm from './components/JobApplicationForm';

function App() {
  return (
    <div>
      <JobApplicationForm />
    </div>
  );
}
```

**Job Application Fields:**
- Personal Information (name, email, phone, location, LinkedIn)
- Position Information (role, experience, current job)
- Education Details (degree, college, CGPA, graduation year)
- Professional Information (salary, notice period)
- Motivation & Interest (textareas)
- File Uploads (resume, cover letter, portfolio)

### Using Email Service Utilities

```jsx
import { 
  submitContactForm, 
  submitJobApplication, 
  validateEmail, 
  validateFile 
} from './utils/emailService';

// Submit contact form
const result = await submitContactForm(formData);

// Submit job application with files
const result = await submitJobApplication(formData, files);

// Validate email
const isValidEmail = validateEmail('user@example.com');

// Validate file
const validation = validateFile(file, 'resume');
```

## 📧 Email Templates

The system sends professional HTML emails with:

- **Company Branding**: Genessence colors and styling
- **Organized Layout**: Sections for different information types
- **File Information**: Details about uploaded attachments
- **Submission Metadata**: Timestamp and form type
- **Responsive Design**: Mobile-friendly email layout

## 🔒 Security Features

- **Environment Variables**: All sensitive data stored securely
- **File Validation**: Size and type restrictions for uploads
- **Input Sanitization**: Protection against malicious input
- **CORS Configuration**: Proper cross-origin resource sharing
- **Rate Limiting**: Built-in protection against spam

## 📊 File Upload Limits

| File Type | Max Size | Allowed Formats |
|-----------|----------|-----------------|
| Resume | 5MB | PDF, DOC, DOCX |
| Cover Letter | 2MB | PDF, DOC, DOCX |
| Portfolio | 10MB | PDF, ZIP |

## 🧪 Testing

### Test Contact Form

```bash
curl -X POST https://your-domain.vercel.app/api/send-email \
  -F "formType=contact" \
  -F "firstName=John" \
  -F "workEmail=john@example.com" \
  -F "companyName=Test Company"
```

### Test Job Application

```bash
curl -X POST https://your-domain.vercel.app/api/send-email \
  -F "formType=job" \
  -F "fullName=Jane Doe" \
  -F "email=jane@example.com" \
  -F "position=Software Engineer" \
  -F "resume=@/path/to/resume.pdf"
```

## 🐛 Troubleshooting

### Common Issues

1. **"Authentication failed" error**
   - Verify Gmail app password is correct
   - Check if 2FA is enabled
   - Ensure `SMTP_USER` matches the email

2. **"File too large" error**
   - Check file size limits
   - Compress large files before upload

3. **"Invalid file type" error**
   - Ensure files are in supported formats
   - Check file extensions

4. **CORS errors**
   - Verify API endpoint is correct
   - Check CORS configuration in serverless function

### Debug Steps

1. **Check Vercel Function Logs**
   ```bash
   vercel logs --follow
   ```

2. **Test Environment Variables**
   - Verify all variables are set in Vercel dashboard
   - Redeploy after making changes

3. **Test Email Delivery**
   - Submit test forms
   - Check email inbox
   - Review function logs for errors

## 📈 Performance

- **Serverless Functions**: Automatic scaling with Vercel
- **File Processing**: Efficient multipart form handling
- **Email Delivery**: Gmail SMTP for reliable delivery
- **Client-side Validation**: Reduces server load

## 🔄 Maintenance

- **Monitor Email Limits**: Gmail has daily sending limits
- **Update Dependencies**: Keep nodemailer and formidable updated
- **Review Logs**: Regular monitoring of function logs
- **Test Regularly**: Verify forms work after deployments

## 📞 Support

For issues or questions:

1. Check the troubleshooting section above
2. Review Vercel function logs
3. Verify environment variables are set correctly
4. Test with curl examples provided

## 📄 License

This implementation is ready for production use with proper environment variable configuration. All secrets are externalized and the code follows security best practices.

---

**Ready to deploy!** 🚀

Follow the setup instructions, configure environment variables, and deploy to Vercel for a production-ready email form system.
