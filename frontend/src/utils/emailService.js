// src/utils/emailService.js - Email service utility functions
/**
 * Email service utility functions for form submissions
 * Handles API communication and error handling
 */

/**
 * Submit contact form data
 * @param {Object} formData - Contact form data
 * @returns {Promise<Object>} - API response
 */
export const submitContactForm = async (formData) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('formType', 'contact');
    
    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'areasInterest' && Array.isArray(value)) {
        formDataToSend.append(key, value.join(', '));
      } else if (value !== '' && value !== null && value !== undefined) {
        formDataToSend.append(key, value);
      }
    });

    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: formDataToSend,
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Submission failed');
    }

    return {
      success: true,
      message: 'Thank you! Your inquiry has been submitted successfully. We\'ll get back to you soon.',
      messageId: result.messageId
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: `Error: ${error.message}`
    };
  }
};

/**
 * Submit job application form data with file attachments
 * @param {Object} formData - Job form data
 * @param {Object} files - File objects from input elements
 * @returns {Promise<Object>} - API response
 */
export const submitJobApplication = async (formData, files = {}) => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('formType', 'job');
    
    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        formDataToSend.append(key, value);
      }
    });

    // Add file attachments
    Object.entries(files).forEach(([fieldName, file]) => {
      if (file && file instanceof File) {
        formDataToSend.append(fieldName, file);
      }
    });

    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: formDataToSend,
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Submission failed');
    }

    return {
      success: true,
      message: 'Thank you! Your job application has been submitted successfully. We\'ll review it and get back to you soon.',
      messageId: result.messageId
    };
  } catch (error) {
    console.error('Job application submission error:', error);
    return {
      success: false,
      message: `Error: ${error.message}`
    };
  }
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * @param {string} phone - Phone to validate
 * @returns {boolean} - Is valid phone
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate file size and type
 * @param {File} file - File to validate
 * @param {string} fieldName - Field name (resume, coverLetter, portfolio)
 * @returns {Object} - Validation result
 */
export const validateFile = (file, fieldName) => {
  const limits = {
    resume: { 
      maxSize: 5 * 1024 * 1024, // 5MB
      types: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      extensions: ['.pdf', '.doc', '.docx']
    },
    coverLetter: { 
      maxSize: 2 * 1024 * 1024, // 2MB
      types: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      extensions: ['.pdf', '.doc', '.docx']
    },
    portfolio: { 
      maxSize: 10 * 1024 * 1024, // 10MB
      types: ['application/pdf', 'application/zip'],
      extensions: ['.pdf', '.zip']
    }
  };

  const fieldLimits = limits[fieldName];
  if (!fieldLimits) {
    return { valid: false, error: `Unknown file field: ${fieldName}` };
  }

  if (file.size > fieldLimits.maxSize) {
    return { valid: false, error: `${fieldName} file size exceeds ${fieldLimits.maxSize / (1024 * 1024)}MB limit` };
  }

  if (!fieldLimits.types.includes(file.type)) {
    return { valid: false, error: `${fieldName} file type not supported. Allowed: ${fieldLimits.extensions.join(', ')}` };
  }

  return { valid: true };
};

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file type icon based on file extension
 * @param {string} filename - File name
 * @returns {string} - Icon class or emoji
 */
export const getFileIcon = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return '📄';
    case 'doc':
    case 'docx':
      return '📝';
    case 'zip':
      return '📦';
    default:
      return '📎';
  }
};

/**
 * Check if form is in development mode
 * @returns {boolean} - Is development mode
 */
export const isDevelopment = () => {
  return import.meta.env.DEV;
};

/**
 * Get API endpoint based on environment
 * @returns {string} - API endpoint URL
 */
export const getApiEndpoint = () => {
  return isDevelopment() 
    ? 'http://localhost:4000/api/send-email' // For local Express server
    : '/api/send-email'; // For production Vercel
};

/**
 * Debounce function for form validation
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate unique form submission ID
 * @returns {string} - Unique ID
 */
export const generateSubmissionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Sanitize form data for display
 * @param {Object} data - Form data
 * @returns {Object} - Sanitized data
 */
export const sanitizeFormData = (data) => {
  const sanitized = {};
  
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'string') {
      // Remove potentially dangerous characters
      sanitized[key] = value.replace(/[<>]/g, '');
    } else {
      sanitized[key] = value;
    }
  });
  
  return sanitized;
};

/**
 * Check if required fields are filled
 * @param {Object} formData - Form data
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} - Validation result
 */
export const validateRequiredFields = (formData, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].toString().trim() === '') {
      errors[field] = `${field} is required`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
