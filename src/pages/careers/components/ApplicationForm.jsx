import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../../components/ui/Button';
import FileUpload from './FileUpload';
import Icon from '../../../components/AppIcon';

const defaultData = {
  fullName: '', email: '', phone: '', currentLocation: '', linkedinUrl: '', portfolioUrl: '',
  selectedPosition: '',
  grade12Format: 'percentage', grade12Value: '', grade12Board: '', grade12Year: '',
  degreeType: '', fieldOfStudy: '', collegeName: '', collegeFormat: 'cgpa', collegeValue: '', graduationYear: '',
  currentJobTitle: '', currentCompany: '', experience: '', currentSalary: '', expectedSalary: '', noticePeriod: '',
  whyThisRole: '', aiInterest: '', relevantSkills: [], previousProjects: '',
  howHeardAbout: '', willingToRelocate: '', preferredWorkArrangement: '', additionalComments: '',
};

const ApplicationForm = ({ positions = [] }) => {
  const [formData, setFormData] = useState(defaultData);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Persist draft
  useEffect(() => {
    const saved = localStorage.getItem('careers_form');
    if (saved) setFormData(prev => ({ ...prev, ...JSON.parse(saved) }));
  }, []);
  useEffect(() => {
    localStorage.setItem('careers_form', JSON.stringify(formData));
  }, [formData]);

  const update = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const validate = () => {
    if (!formData.fullName || formData.fullName.length < 2) return 'Full name is required';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Valid email is required';
    if (!formData.phone || !/^[+]?\d{10,15}$/.test(formData.phone)) return 'Valid phone is required';
    if (!formData.selectedPosition) return 'Please select a position';
    // Resume not strictly required by server, but recommended. Keep optional if needed.
    if (formData.grade12Value === '' || isNaN(Number(formData.grade12Value))) return 'Valid Grade 12 score required';
    if (formData.collegeValue === '' || isNaN(Number(formData.collegeValue))) return 'Valid college score required';
    return '';
  };

  // toBase64 function removed - now using direct file upload

  const sendApplication = async () => {
    try {
      // Client-side file validation to avoid server 400s
      const isAllowed = (file, types, maxBytes) => file && types.includes(file.type) && file.size <= maxBytes;
      if (resume && !isAllowed(resume, [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ], 5 * 1024 * 1024)) {
        throw new Error('Resume must be PDF/DOC/DOCX and ≤ 5MB');
      }
      if (coverLetter && !isAllowed(coverLetter, [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ], 2 * 1024 * 1024)) {
        throw new Error('Cover Letter must be PDF/DOC/DOCX and ≤ 2MB');
      }
      if (portfolio && !isAllowed(portfolio, [
        'application/pdf',
        'application/zip',
        'application/x-zip-compressed'
      ], 10 * 1024 * 1024)) {
        throw new Error('Portfolio must be ZIP/PDF and ≤ 10MB');
      }

      // Prepare form data for email API
      const formDataToSend = new FormData();
      formDataToSend.append('formType', 'job');
      
      // Add all form fields with API field mapping
      const fieldMap = {
        selectedPosition: 'position',
        linkedinUrl: 'linkedIn',
      };

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          const apiKey = fieldMap[key] || key;
          formDataToSend.append(apiKey, value);
        }
      });

      // Add file attachments
      if (resume) formDataToSend.append('resume', resume);
      if (coverLetter) formDataToSend.append('coverLetter', coverLetter);
      if (portfolio) formDataToSend.append('portfolio', portfolio);

      // Debug: log what we are sending from the frontend
      try {
        const preview = {};
        formDataToSend.forEach((v, k) => {
          if (v instanceof File) {
            preview[k] = { name: v.name, type: v.type, size: v.size };
          } else {
            preview[k] = v;
          }
        });
        // eslint-disable-next-line no-console
        console.log('Job form payload preview →', preview);
      } catch (_) {}

      // Determine API endpoint based on environment
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:4000/api/send-email'
        : '/api/send-email';

      // Add a timeout to avoid hanging UI if network stalls
      // Avoid aborting when uploading files; only apply timeout for no-file submissions
      const hasFiles = Boolean(resume || coverLetter || portfolio);
      let response;
      if (hasFiles) {
        response = await fetch(apiUrl, { method: 'POST', body: formDataToSend });
      } else {
        const controller = new AbortController();
        const timeoutMs = 60000;
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        response = await fetch(apiUrl, { method: 'POST', body: formDataToSend, signal: controller.signal });
        clearTimeout(timeoutId);
      }

      const result = await response.json();
      
      if (!response.ok) {
        // Surface server-side validation errors if present
        if (result && Array.isArray(result.errors) && result.errors.length > 0) {
          throw new Error(result.errors.join('\n'));
        }
        throw new Error(result.error || 'Submission failed');
      }

      console.log('Job application submitted successfully:', result);
      return { success: true };
    } catch (e) {
      console.error('Job application submission error:', e);
      if (e.name === 'AbortError') {
        return { success: false, error: new Error('Upload timed out. Please try again (files may be large or network is slow).') };
      }
      return { success: false, error: e };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError(''); setSubmitting(true);
    try {
      const result = await sendApplication();
      if (result.success) {
        setSubmitted(true);
        localStorage.removeItem('careers_form');
      } else {
        setError(result?.error?.message || String(result?.error) || 'Submission failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <Icon name="CheckCircle" size={64} className="text-green-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
        <p className="text-muted-foreground mb-6">Thank you for your interest. Our HR team will review your application.</p>
        <div className="bg-card p-6 rounded-lg border text-left">
          <h3 className="font-semibold mb-2">Next Steps:</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>HR review in 3-5 business days</li>
            <li>Shortlisted candidates receive next-round email</li>
            <li>Interview process: 2-3 rounds</li>
            <li>Final decision: ~1-2 weeks post interviews</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground mt-6">Questions? Email <strong>vagish.mishra@genessence.ai</strong></p>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-headline-bold text-foreground mb-6">Apply Now</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal */}
          <div className="grid md:grid-cols-2 gap-4">
            <input className="px-4 py-3 bg-input border border-border rounded-lg" placeholder="Full Name*" value={formData.fullName} onChange={(e)=>update('fullName', e.target.value)} />
            <input className="px-4 py-3 bg-input border border-border rounded-lg" placeholder="Email*" value={formData.email} onChange={(e)=>update('email', e.target.value)} />
            <input className="px-4 py-3 bg-input border border-border rounded-lg" placeholder="Phone*" value={formData.phone} onChange={(e)=>update('phone', e.target.value)} />
            <input className="px-4 py-3 bg-input border border-border rounded-lg" placeholder="Current Location" value={formData.currentLocation} onChange={(e)=>update('currentLocation', e.target.value)} />
            <input className="px-4 py-3 bg-input border border-border rounded-lg md:col-span-2" placeholder="LinkedIn URL" value={formData.linkedinUrl} onChange={(e)=>update('linkedinUrl', e.target.value)} />
            <select className="px-4 py-3 bg-input border border-border rounded-lg md:col-span-2" value={formData.selectedPosition} onChange={(e)=>update('selectedPosition', e.target.value)}>
              <option value="">Select Position*</option>
              {positions.map(p => (<option key={p.id} value={p.title}>{p.title}</option>))}
            </select>
          </div>

          {/* Education */}
          <div>
            <div className="font-semibold mb-2">Education</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid grid-cols-2 gap-2">
                <select className="px-3 py-2 bg-input border border-border rounded-lg" value={formData.grade12Format} onChange={(e)=>update('grade12Format', e.target.value)}>
                  <option value="percentage">12th: Percentage</option>
                  <option value="cgpa">12th: CGPA</option>
                </select>
                <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Value*" value={formData.grade12Value} onChange={(e)=>update('grade12Value', e.target.value)} />
              </div>
              <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Board" value={formData.grade12Board} onChange={(e)=>update('grade12Board', e.target.value)} />
              <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Year" value={formData.grade12Year} onChange={(e)=>update('grade12Year', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Degree Type" value={formData.degreeType} onChange={(e)=>update('degreeType', e.target.value)} />
                <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Field of Study" value={formData.fieldOfStudy} onChange={(e)=>update('fieldOfStudy', e.target.value)} />
              </div>
              <input className="px-3 py-2 bg-input border border-border rounded-lg md:col-span-2" placeholder="College Name" value={formData.collegeName} onChange={(e)=>update('collegeName', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                <select className="px-3 py-2 bg-input border border-border rounded-lg" value={formData.collegeFormat} onChange={(e)=>update('collegeFormat', e.target.value)}>
                  <option value="cgpa">College: CGPA</option>
                  <option value="percentage">College: Percentage</option>
                </select>
                <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Value*" value={formData.collegeValue} onChange={(e)=>update('collegeValue', e.target.value)} />
              </div>
              <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Graduation Year" value={formData.graduationYear} onChange={(e)=>update('graduationYear', e.target.value)} />
            </div>
          </div>

          {/* Professional */}
          <div>
            <div className="font-semibold mb-2">Professional</div>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Current Job Title" value={formData.currentJobTitle} onChange={(e)=>update('currentJobTitle', e.target.value)} />
              <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Current Company" value={formData.currentCompany} onChange={(e)=>update('currentCompany', e.target.value)} />
              <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Experience (years)" value={formData.experience} onChange={(e)=>update('experience', e.target.value)} />
              <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Current Salary" value={formData.currentSalary} onChange={(e)=>update('currentSalary', e.target.value)} />
              <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Expected Salary" value={formData.expectedSalary} onChange={(e)=>update('expectedSalary', e.target.value)} />
              <input className="px-3 py-2 bg-input border border-border rounded-lg" placeholder="Notice Period" value={formData.noticePeriod} onChange={(e)=>update('noticePeriod', e.target.value)} />
            </div>
          </div>

          {/* Position-specific */}
          <div>
            <div className="font-semibold mb-2">Position Motivation</div>
            <textarea className="w-full px-3 py-2 bg-input border border-border rounded-lg" rows={4} placeholder="Why this role?" value={formData.whyThisRole} onChange={(e)=>update('whyThisRole', e.target.value)} />
            <textarea className="w-full px-3 py-2 bg-input border border-border rounded-lg mt-2" rows={3} placeholder="Your interest in AI" value={formData.aiInterest} onChange={(e)=>update('aiInterest', e.target.value)} />
          </div>

          {/* Files */}
          <div>
            <div className="font-semibold mb-2">Attachments</div>
            <div className="grid md:grid-cols-3 gap-4">
              <FileUpload label="Resume (PDF/DOC, max 5MB)" accept=".pdf,.doc,.docx" maxSizeMB={5} onChange={setResume} />
              <FileUpload label="Cover Letter (PDF/DOC, max 2MB)" accept=".pdf,.doc,.docx" maxSizeMB={2} onChange={setCoverLetter} />
              <FileUpload label="Portfolio (ZIP/PDF, max 10MB)" accept=".zip,.pdf" maxSizeMB={10} onChange={setPortfolio} />
            </div>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit Application'}</Button>
            <div className="text-xs text-muted-foreground">We respect your privacy. Your information is kept confidential.</div>
          </div>
        </form>

        <div className="mt-8 text-sm text-muted-foreground">
          Email integration: install <code>@emailjs/browser</code> and replace service/template/public keys in the form. Attachments are prepared as base64.
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
