import React from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { sendContactMessage } from '@/services/contact';

interface ContactBlockProps {
  className?: string;
}

export const ContactBlock: React.FC<ContactBlockProps> = ({ className }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    feedback: '',
  });
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<{ name?: string; email?: string; feedback?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const validateForm = (): boolean => {
    const errs: { name?: string; email?: string; feedback?: string } = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Please enter a valid email address';
    if (!formData.feedback.trim()) errs.feedback = 'Feedback message is required';
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      setErrorMessage('Please fix the highlighted fields below.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    try {
      await sendContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        message: formData.feedback,
      });
      setStatus('success');
      setFieldErrors({});
      setFormData({ name: '', email: '', phone: '', address: '', feedback: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Failed to send message. Please try again.');
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'aiclub@siet.ac.in', href: 'mailto:aiclub@siet.ac.in' },
    { icon: Phone, label: 'Phone', value: '+91 422 236 0000', href: 'tel:+914222360000' },
    { icon: MapPin, label: 'Address', value: 'Sri Shakthi Institute of Engineering and Technology, L&T Bypass Road, Coimbatore - 641062, Tamil Nadu, India', href: null },
  ];

  return (
    <section className={cn('py-20 md:py-28 relative', className)} aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Info */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide uppercase bg-slate-900/60 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] mb-4 backdrop-blur-xl">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Connect</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
              Get In <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Have questions about our visitors program, want to collaborate, or simply want to say hello? We'd love to hear from you.
            </p>

            <div className="space-y-6 mb-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 glass-card rounded-2xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-700 dark:text-slate-200">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Lab Hours */}
            <div className="glass-card rounded-2xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Lab Visiting Hours
              </p>
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Saturday</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Sunday</span>
                  <span className="text-slate-400 dark:text-slate-500">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="glass-card rounded-3xl border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-6 md:p-8 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Share Your Feedback
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      'glass-input w-full px-4 py-3 rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 backdrop-blur-md transition-all shadow-xs',
                      fieldErrors.name && 'border-red-500'
                    )}
                    placeholder="Your name"
                    aria-required="true"
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    disabled={status === 'submitting'}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-500">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      'glass-input w-full px-4 py-3 rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 backdrop-blur-md transition-all shadow-xs',
                      fieldErrors.email && 'border-red-500'
                    )}
                    placeholder="your@email.com"
                    aria-required="true"
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    disabled={status === 'submitting'}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-500">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="glass-input w-full px-4 py-3 rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 backdrop-blur-md transition-all shadow-xs"
                    placeholder="+91 XXXXX XXXXX"
                    disabled={status === 'submitting'}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                    Address / Institution
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="glass-input w-full px-4 py-3 rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 backdrop-blur-md transition-all shadow-xs"
                    placeholder="Your institution or address"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows={5}
                  className={cn(
                    'glass-input w-full px-4 py-3 rounded-2xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 backdrop-blur-md transition-all shadow-xs resize-none',
                    fieldErrors.feedback && 'border-red-500'
                  )}
                  placeholder="Share your thoughts, suggestions, or inquiry..."
                  aria-required="true"
                  aria-invalid={!!fieldErrors.feedback}
                  aria-describedby={fieldErrors.feedback ? 'feedback-error' : undefined}
                  disabled={status === 'submitting'}
                />
                {fieldErrors.feedback && (
                  <p id="feedback-error" role="alert" className="mt-1.5 text-xs text-red-500">{fieldErrors.feedback}</p>
                )}
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 text-sm">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-sm">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={cn(
                  'inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 active:scale-95 shadow-md shadow-blue-500/25 transition-all border border-blue-400/30',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900',
                  status === 'submitting' && 'opacity-70 cursor-wait'
                )}
              >
                {status === 'submitting' && <Loader2 className="w-5 h-5 animate-spin" />}
                {status !== 'submitting' && <Send className="w-5 h-5" />}
                <span>
                  {status === 'submitting' ? 'Sending...' : 'Send Feedback'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};