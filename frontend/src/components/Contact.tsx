import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';
import ScrollWords from './ScrollWords';
import { EASE, sectionVariants, staggerParent, fadeRise, viewportOnce } from '../motion/shared';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '');

type Status = { kind: 'sending' | 'success' | 'error'; text: string } | null;

const Contact: React.FC = () => {
  const ref = useFadeIn();
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ kind: 'error', text: t('contact.configError') as string });
      return;
    }

    setStatus({ kind: 'sending', text: t('contact.sending') as string });
    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      if (response.status === 200) {
        setStatus({ kind: 'success', text: t('contact.success') as string });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw response;
      }
    } catch {
      setStatus({ kind: 'error', text: t('contact.error') as string });
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="fade-in contact-centered"
      variants={sectionVariants('up')}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      <span className="section-kicker">{t('contact.kicker') as string}</span>
      <h2>{t('contact.title') as string}</h2>
      <ScrollWords text={t('contact.lead') as string} className="section-lead" />
      <div className="contact-availability">
        <span className="hero-badge-dot" aria-hidden="true" />
        {t('contact.availability') as string}
      </div>
      <motion.form
        className="contact-form contact-card"
        onSubmit={handleSubmit}
        variants={staggerParent(0.08)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div className="form-row" variants={fadeRise}>
          <div className="form-field">
            <label className="form-label" htmlFor="contact-name">{t('contact.nameLabel') as string}</label>
            <input
              id="contact-name"
              type="text"
              placeholder={t('contact.namePlaceholder') as string}
              required
              autoComplete="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="contact-email">{t('contact.emailLabel') as string}</label>
            <input
              id="contact-email"
              type="email"
              placeholder={t('contact.emailPlaceholder') as string}
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </motion.div>
        <motion.div className="form-field" variants={fadeRise}>
          <label className="form-label" htmlFor="contact-message">{t('contact.messageLabel') as string}</label>
          <textarea
            id="contact-message"
            placeholder={t('contact.messagePlaceholder') as string}
            rows={5}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </motion.div>
        <motion.div variants={fadeRise}>
          <motion.button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            whileHover={reduce ? undefined : {
              y: -3,
              boxShadow: '0 14px 34px -10px rgba(56, 189, 248, 0.6)',
              transition: { duration: 0.3, ease: EASE },
            }}
            whileTap={{ scale: 0.97 }}
          >
            {t('contact.sendBtn') as string}
          </motion.button>
        </motion.div>
        <AnimatePresence mode="wait">
          {status && (
            <motion.p
              key={status.kind + status.text}
              role="status"
              aria-live="polite"
              className={`form-status ${status.kind}`}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {status.kind === 'success' ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                  style={{ display: 'inline-block', marginRight: '0.5rem' }}
                  aria-hidden
                >
                  ✓
                </motion.span>
              ) : null}
              {status.text}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
      <p className="contact-alt">
        {t('contact.alt') as string}{' '}
        <a href="mailto:niccolopiccioli68@gmail.com">niccolopiccioli68@gmail.com</a>
      </p>
      <motion.div
        style={{ display: 'flex', gap: '1rem', marginTop: '1.2rem' }}
        variants={staggerParent(0.1)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={viewportOnce}
      >
        {[
          { href: 'https://github.com/niccolopiccioli', icon: <FaGithub size={20} />, label: 'GitHub' },
          { href: 'https://linkedin.com/in/niccolopiccioli', icon: <FaLinkedin size={20} />, label: 'LinkedIn' },
        ].map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="footer-social"
            variants={fadeRise}
            whileHover={reduce ? undefined : { y: -4, transition: { type: 'spring', stiffness: 400, damping: 12 } }}
            style={{ fontSize: '1.3rem' }}
          >
            {s.icon}
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Contact;
