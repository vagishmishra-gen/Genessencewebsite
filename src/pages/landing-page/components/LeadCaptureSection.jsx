import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LeadCaptureSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();

  const watchedValues = watch();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(1);
      reset();
    }, 5000);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepProgress = () => {
    return (currentStep / 3) * 100;
  };

  if (isSubmitted) {
    return (
      <section id="lead-capture" className="py-20 bg-card/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-card border border-border rounded-2xl p-12">
              <div className="w-20 h-20 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={40} className="text-success" />
              </div>
              <h2 className="text-3xl font-headline text-foreground mb-4">
                Thank You for Your Interest!
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                We've received your information and will contact you within 24 hours to schedule your free AI assessment.
              </p>
              <div className="bg-teal-500/10 rounded-lg p-4 border border-teal-500/20">
                <p className="text-teal-500 font-medium">
                  What happens next?
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Our AI expert will review your requirements</li>
                  <li>• We'll schedule a 30-minute discovery call</li>
                  <li>• You'll receive a custom AI transformation roadmap</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-capture" className="py-20 bg-card/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-6">
            Get Your Free{' '}
            <span className="bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent">
              AI Assessment
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how AI can transform your business operations and drive measurable growth
          </p>
        </motion.div>

        <div className="bg-card border border-border rounded-2xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Step {currentStep} of 3</span>
              <span className="text-sm text-teal-500 font-medium">{Math.round(getStepProgress())}% Complete</span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getStepProgress()}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Tell us about yourself
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="John"
                    required
                    error={errors?.firstName?.message}
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Smith"
                    required
                    error={errors?.lastName?.message}
                    {...register('lastName', { required: 'Last name is required' })}
                  />
                </div>

                <Input
                  label="Work Email"
                  type="email"
                  placeholder="john.smith@company.com"
                  required
                  error={errors?.email?.message}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  error={errors?.phone?.message}
                  {...register('phone')}
                />
              </motion.div>
            )}

            {/* Step 2: Company Information */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  About your company
                </h3>

                <Input
                  label="Company Name"
                  type="text"
                  placeholder="Acme Corporation"
                  required
                  error={errors?.company?.message}
                  {...register('company', { required: 'Company name is required' })}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Size
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      {...register('companySize', { required: 'Company size is required' })}
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                    {errors?.companySize && (
                      <p className="text-error text-sm mt-1">{errors?.companySize?.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Industry
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      {...register('industry', { required: 'Industry is required' })}
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Financial Services</option>
                      <option value="retail">Retail</option>
                      <option value="education">Education</option>
                      <option value="other">Other</option>
                    </select>
                    {errors?.industry && (
                      <p className="text-error text-sm mt-1">{errors?.industry?.message}</p>
                    )}
                  </div>
                </div>

                <Input
                  label="Your Role"
                  type="text"
                  placeholder="CTO, CEO, VP of Operations, etc."
                  required
                  error={errors?.role?.message}
                  {...register('role', { required: 'Role is required' })}
                />
              </motion.div>
            )}

            {/* Step 3: Project Details */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Your AI transformation goals
                </h3>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    What's your biggest operational challenge?
                  </label>
                  <textarea
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    rows="4"
                    placeholder="Describe the manual processes or inefficiencies you'd like to automate..."
                    {...register('challenge', { required: 'Please describe your challenge' })}
                  />
                  {errors?.challenge && (
                    <p className="text-error text-sm mt-1">{errors?.challenge?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Which areas interest you most? (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Operations Automation',
                      'Sales Intelligence',
                      'Customer Service AI',
                      'Predictive Analytics',
                      'Process Optimization',
                      'Data Analysis'
                    ]?.map((area) => (
                      <label key={area} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          value={area}
                          className="w-4 h-4 text-teal-500 bg-input border-border rounded focus:ring-teal-500 focus:ring-2"
                          {...register('interests')}
                        />
                        <span className="text-muted-foreground">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Timeline for Implementation
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    {...register('timeline', { required: 'Timeline is required' })}
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (within 1 month)</option>
                    <option value="quarter">This quarter (1-3 months)</option>
                    <option value="half-year">Next 6 months</option>
                    <option value="year">Within a year</option>
                    <option value="exploring">Just exploring options</option>
                  </select>
                  {errors?.timeline && (
                    <p className="text-error text-sm mt-1">{errors?.timeline?.message}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-border">
              <div>
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                )}
              </div>

              <div>
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    variant="default"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && (!watchedValues?.firstName || !watchedValues?.lastName || !watchedValues?.email)) ||
                      (currentStep === 2 && (!watchedValues?.company || !watchedValues?.companySize || !watchedValues?.industry || !watchedValues?.role))
                    }
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="default"
                    loading={isSubmitting}
                    className="cta-shadow font-cta"
                    iconName="Send"
                    iconPosition="right"
                  >
                    Get My Free Assessment
                  </Button>
                )}
              </div>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-teal-500" />
                <span>100% Secure & Confidential</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-secondary" />
                <span>Response within 24 hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span>No spam, ever</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;