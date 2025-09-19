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
    if (!resume) return 'Resume is required';
    if (formData.grade12Value === '' || isNaN(Number(formData.grade12Value))) return 'Valid Grade 12 score required';
    if (formData.collegeValue === '' || isNaN(Number(formData.collegeValue))) return 'Valid college score required';
    return '';
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const sendApplication = async () => {
    // NOTE: Replace placeholders with real EmailJS IDs in production
    try {
      const templateParams = {
        to_email: 'vagish.mishra@genessence.ai',
        from_email: 'tech@genessence.com',
        applicant_name: formData.fullName,
        position: formData.selectedPosition,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        education: `${formData.degreeType} ${formData.fieldOfStudy} from ${formData.collegeName}`,
        cgpa_12th: `${formData.grade12Format}:${formData.grade12Value}`,
        cgpa_college: `${formData.collegeFormat}:${formData.collegeValue}`,
        current_location: formData.currentLocation,
        message: formData.additionalComments,
      };
      const files = {
        resume: resume ? await toBase64(resume) : null,
        coverLetter: coverLetter ? await toBase64(coverLetter) : null,
        portfolio: portfolio ? await toBase64(portfolio) : null,
      };
      console.log('EmailJS payload preview:', { templateParams, files });
      // await emailjs.send('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID',templateParams,'YOUR_PUBLIC_KEY');
      return { success: true };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError(''); setSubmitting(true);
    const result = await sendApplication();
    setSubmitting(false);
    if (result.success) {
      setSubmitted(true);
      localStorage.removeItem('careers_form');
    } else {
      setError('Submission failed. Please try again.');
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
