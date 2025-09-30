// server.js - Local development server for testing
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config({ path: '../.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

// Email configuration (removed createTransporter function)

// File validation
const validateFile = (file, fieldName) => {
  // Support formidable v3 shapes: single file object or array of files
  const f = Array.isArray(file) ? file[0] : file;
  const limits = {
    resume: { maxSize: 5 * 1024 * 1024, types: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
    coverLetter: { maxSize: 2 * 1024 * 1024, types: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
    portfolio: { maxSize: 10 * 1024 * 1024, types: ['application/pdf', 'application/zip', 'application/x-zip-compressed'] }
  };

  if (!f) return { valid: true };

  const fieldLimits = limits[fieldName];
  if (!fieldLimits) {
    return { valid: false, error: `Unknown file field: ${fieldName}` };
  }

  if (f.size > fieldLimits.maxSize) {
    return { valid: false, error: `${fieldName} file size exceeds ${fieldLimits.maxSize / (1024 * 1024)}MB limit` };
  }

  // Some browsers/devices report PDFs/DOCs/ZIPs as application/octet-stream; also normalize common aliases
  const normalizedType = (f.mimetype || '').toLowerCase();
  const acceptableTypes = new Set([
    ...fieldLimits.types,
    'application/x-pdf',
    'application/acrobat',
    'applications/vnd.pdf',
  ]);
  const isPdf = normalizedType === 'application/pdf' || normalizedType === 'application/x-pdf' || normalizedType === 'application/acrobat' || normalizedType === 'applications/vnd.pdf';
  const filename = (f.originalFilename || f.newFilename || '').toLowerCase();
  const isOctet = normalizedType === 'application/octet-stream';
  const allowOctetForPdf = isOctet && filename.endsWith('.pdf');
  const allowDocxOctet = isOctet && filename.endsWith('.docx');
  const allowDocOctet = isOctet && filename.endsWith('.doc');
  const allowZipOctet = isOctet && (filename.endsWith('.zip') || filename.endsWith('.7z'));

  const isAllowedByNameFallback = allowOctetForPdf || allowDocxOctet || allowDocOctet || allowZipOctet;

  if (!(acceptableTypes.has(normalizedType) || isPdf || isAllowedByNameFallback)) {
    return { valid: false, error: `${fieldName} file type not supported` };
  }

  return { valid: true };
};

// Email templates (same as Vercel function)
const createContactEmailHTML = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #00d1ff, #5de0e6); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
        .field:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #00d1ff; margin-bottom: 5px; }
        .value { color: #666; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p>Genessence Website Inquiry</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${formData.firstName} ${formData.lastName || ''}</div>
          </div>
          <div class="field">
            <div class="label">Work Email:</div>
            <div class="value">${formData.workEmail}</div>
          </div>
          <div class="field">
            <div class="label">Contact Number:</div>
            <div class="value">${formData.contactNumber || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">Company:</div>
            <div class="value">${formData.companyName || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">Company Size:</div>
            <div class="value">${formData.companySize || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">Industry:</div>
            <div class="value">${formData.industry || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">Role:</div>
            <div class="value">${formData.yourRole || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">Biggest Challenge:</div>
            <div class="value">${formData.biggestChallenge || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">Areas of Interest:</div>
            <div class="value">${formData.areasInterest || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">Timeline:</div>
            <div class="value">${formData.timeline || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="label">Submission Time:</div>
            <div class="value">${new Date().toLocaleString()}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the Genessence website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const createJobApplicationEmailHTML = (formData, files) => {
  const firstFile = (f) => Array.isArray(f) ? f[0] : f;
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Job Application</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #00d1ff, #5de0e6); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 18px; font-weight: bold; color: #00d1ff; margin-bottom: 15px; border-bottom: 2px solid #00d1ff; padding-bottom: 5px; }
        .field { margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
        .field:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #333; margin-bottom: 5px; }
        .value { color: #666; }
        .file-info { background: #f0f8ff; padding: 10px; margin: 10px 0; border-left: 4px solid #00d1ff; border-radius: 4px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Job Application</h1>
          <p>Genessence Career Portal</p>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">Personal Information</div>
            <div class="field">
              <div class="label">Full Name:</div>
              <div class="value">${formData.fullName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${formData.email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${formData.phone || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Location:</div>
              <div class="value">${formData.currentLocation || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">LinkedIn:</div>
              <div class="value">${formData.linkedIn || 'Not provided'}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Position Information</div>
            <div class="field">
              <div class="label">Position Applied For:</div>
              <div class="value">${formData.position || 'Not specified'}</div>
            </div>
            <div class="field">
              <div class="label">Current Job Title:</div>
              <div class="value">${formData.currentJobTitle || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Current Company:</div>
              <div class="value">${formData.currentCompany || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Experience:</div>
              <div class="value">${formData.experience || 'Not provided'} years</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Education</div>
            <div class="field">
              <div class="label">12th (% / Board / Year):</div>
              <div class="value">${
                (formData.grade12Format || 'percentage') + ': ' + (formData.grade12Value || 'N/A')
              } | ${formData.grade12Board || formData.board || 'N/A'} | ${formData.grade12Year || formData.year || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="label">Degree & Field:</div>
              <div class="value">${formData.degreeType || 'N/A'} — ${formData.fieldOfStudy || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="label">College:</div>
              <div class="value">${formData.collegeName || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="label">College Score:</div>
              <div class="value">${
                (formData.collegeFormat || 'cgpa') + ': ' + (formData.collegeValue || 'N/A')
              }</div>
            </div>
            <div class="field">
              <div class="label">Graduation Year:</div>
              <div class="value">${formData.graduationYear || 'N/A'}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Compensation & Availability</div>
            <div class="field">
              <div class="label">Current Salary:</div>
              <div class="value">${formData.currentSalary || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Expected Salary:</div>
              <div class="value">${formData.expectedSalary || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Notice Period:</div>
              <div class="value">${formData.noticePeriod || 'Not provided'}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Motivation</div>
            <div class="field">
              <div class="label">Why this role?</div>
              <div class="value">${formData.whyThisRole || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Interest in AI:</div>
              <div class="value">${formData.aiInterest || 'Not provided'}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">All Submitted Fields (Debug)</div>
            <div class="field" style="border:none; padding-bottom:0;">
              <div class="value">
                <table style="width:100%; border-collapse:collapse; font-size:14px;">
                  <tbody>
                    ${Object.entries(formData).map(([k,v]) => `
                      <tr>
                        <td style="width:40%; padding:6px 8px; border-bottom:1px solid #eee; font-weight:600; color:#333;">${k}</td>
                        <td style="padding:6px 8px; border-bottom:1px solid #eee; color:#666;">${String(v)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          ${files && Object.keys(files).length > 0 ? `
          <div class="section">
            <div class="section-title">Attached Files</div>
            ${Object.entries(files).map(([fieldName, file]) => {
              const ff = firstFile(file);
              return `
              <div class="file-info">
                <strong>${fieldName}:</strong> ${ff && (ff.originalFilename || ff.newFilename) || 'undefined'}<br>
                <small>Size: ${ff ? ((ff.size / 1024).toFixed(2) + ' KB') : 'NaN KB'} | Type: ${ff ? ff.mimetype : 'undefined'}</small>
              </div>
              `;
            }).join('')}
          </div>
          ` : ''}

          <div class="field">
            <div class="label">Submission Time:</div>
            <div class="value">${new Date().toLocaleString()}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the Genessence career portal.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Plain-text fallback for job application
const createJobApplicationEmailText = (formData, files) => {
  const lines = [];
  lines.push('New Job Application - Genessence');
  lines.push('');
  lines.push('[Personal Information]');
  lines.push(`Full Name: ${formData.fullName}`);
  lines.push(`Email: ${formData.email}`);
  lines.push(`Phone: ${formData.phone || 'Not provided'}`);
  lines.push(`Location: ${formData.currentLocation || 'Not provided'}`);
  lines.push(`LinkedIn: ${formData.linkedIn || 'Not provided'}`);
  lines.push('');
  lines.push('[Position Information]');
  lines.push(`Position: ${formData.position || 'Not specified'}`);
  lines.push(`Current Title: ${formData.currentJobTitle || 'Not provided'}`);
  lines.push(`Current Company: ${formData.currentCompany || 'Not provided'}`);
  lines.push(`Experience: ${formData.experience || 'Not provided'} years`);
  lines.push('');
  lines.push('[Education]');
  lines.push(`12th: ${(formData.grade12Format || 'percentage')}: ${formData.grade12Value || formData['12percentage'] || 'N/A'} | ${formData.grade12Board || formData.board || 'N/A'} | ${formData.grade12Year || formData.year || 'N/A'}`);
  lines.push(`Degree & Field: ${formData.degreeType || 'N/A'} — ${formData.fieldOfStudy || 'N/A'}`);
  lines.push(`College: ${formData.collegeName || 'N/A'}`);
  lines.push(`College Score: ${formData.collegeCgpa ? ('cgpa: ' + formData.collegeCgpa) : ((formData.collegeFormat || 'cgpa') + ': ' + (formData.collegeValue || 'N/A'))}`);
  lines.push(`Graduation Year: ${formData.graduationYear || 'N/A'}`);
  lines.push('');
  lines.push('[Compensation & Availability]');
  lines.push(`Current Salary: ${formData.currentSalary || 'Not provided'}`);
  lines.push(`Expected Salary: ${formData.expectedSalary || 'Not provided'}`);
  lines.push(`Notice Period: ${formData.noticePeriod || 'Not provided'}`);
  lines.push('');
  lines.push('[Motivation]');
  lines.push(`Why this role?: ${formData.whyThisRole || formData.positionMotivation || 'Not provided'}`);
  lines.push(`Interest in AI: ${formData.aiInterest || formData.interestInAI || 'Not provided'}`);
  lines.push('');
  lines.push(`[Submission Time] ${new Date().toLocaleString()}`);
  lines.push('');
  lines.push('[All Submitted Fields]');
  Object.entries(formData).forEach(([k, v]) => {
    lines.push(`${k}: ${String(v)}`);
  });
  return lines.join('\n');
};

// Clean up temporary files
const cleanupFiles = (files) => {
  if (files) {
    Object.values(files).forEach(file => {
      const f = Array.isArray(file) ? file[0] : file;
      if (f && f.filepath && fs.existsSync(f.filepath)) {
        try { fs.unlinkSync(f.filepath); } catch (error) { console.error('Error deleting temporary file:', error); }
      }
    });
  }
};

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true') === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL || process.env.SMTP_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send contact email' });
  }
});

// Health check endpoint (optional for local dev)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = app;
