import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Element, scroller } from "react-scroll";
import styles from "./allDetilse.module.css"
import { useTranslation } from 'react-i18next';

export default function AllDetilse() {
    const location = useLocation();
    const { t } = useTranslation();
    useEffect(() => {
      if (location.hash) {
        scroller.scrollTo(location.hash.replace("#", ""), {
          duration: 100,
          delay: 0,
          smooth: "easeInOutQuart",
        });
      }
    }, [location]);
  return (
    <div className=" container">
          <Element name="section1" className={styles.section}>
      <h2>{t('section1.title')}</h2>
      <p>
        <strong>{t('section1.delivery_time')}</strong><br />
        {t('section1.delivery_time_desc')}
      </p>
      <p>
        <strong>{t('section1.delivery_cost')}</strong><br />
        {t('section1.delivery_cost_desc')}
        <br />
        <strong>{t('section1.delivery_details_header')}</strong>
        <ul>
          {t('section1.delivery_details', { returnObjects: true }).map((detail, index) => (
            <li key={index}>
              {detail.type}: {detail.days} {t('days')} - {detail.charge} {t('currency')}
            </li>
          ))}
        </ul>
      </p>
      <p>
        <strong>{t('section1.contact_service')}</strong><br />
        {t('section1.contact_service_desc')}
      </p>
      <p>
        <strong>{t('section1.payment_options')}</strong><br />
        {t('section1.payment_options_desc')}
      </p>
      <p>
        <strong>{t('section1.refund_policy')}</strong><br />
        {t('section1.refund_desc')}
      </p>
      <p>
        <strong>{t('section1.exchange_policy')}</strong><br />
        {t('section1.exchange_desc')}
      </p>
      <p>
        <strong>{t('section1.company_rights')}</strong><br />
        {t('section1.company_rights_desc')}
      </p>
      <p>
        <strong>{t('section1.return_exchange')}</strong><br />
        {t('section1.return_exchange_desc')}
      </p>
    </Element>
    <Element name="section2" className={styles.section2}>
      <hr />
      <h2>{t('faq.title')}</h2>
      <p>
        <strong>{t('faq.q1')}</strong><br />
        {t('faq.a1')}
      </p>
      <p>
        <strong>{t('faq.q2')}</strong><br />
        {t('faq.a2')}
      </p>
      <p>
        <strong>{t('faq.q3')}</strong><br />
        {t('faq.a3')}
      </p>
      <p>
        <strong>{t('faq.q4')}</strong><br />
        {t('faq.a4')}
      </p>
      <p>
        <strong>{t('faq.q5')}</strong><br />
        {t('faq.a5')}
      </p>
      <p>
        <strong>{t('faq.q6')}</strong><br />
        {t('faq.a6')}
      </p>
    </Element>
    <Element name="section3" className={styles.section3}>
      <hr />
      <h2>{t('shipping_policy.title')}</h2>
      <p>
        <strong>{t('shipping_policy.order_processing_times')}</strong><br />
        {t('shipping_policy.order_processing_times_text')}
      </p>
      <p>
        <strong>{t('shipping_policy.tracking')}</strong><br />
        {t('shipping_policy.tracking_text')}
      </p>
      <p>
        <strong>{t('shipping_policy.delivery')}</strong><br />
        {t('shipping_policy.delivery_text')}
      </p>
      <p>
        <strong>{t('shipping_policy.damages')}</strong><br />
        {t('shipping_policy.damages_text')}
      </p>
      <p>
        <strong>{t('shipping_policy.lost_packages')}</strong><br />
        {t('shipping_policy.lost_packages_text')}
      </p>
    </Element>
    <Element name="section4" className={styles.section3}>
      <hr />
      <h2>{t('shipping_policy.title')}</h2>
      <p>
        <strong>{t('shipping_policy.order_processing_times')}</strong><br />
        {t('shipping_policy.order_processing_times_text')}
      </p>
      <p>
        <strong>{t('shipping_policy.tracking')}</strong><br />
        {t('shipping_policy.tracking_text')}
      </p>
      <p>
        <strong>{t('shipping_policy.delivery')}</strong><br />
        {t('shipping_policy.delivery_text')}
      </p>
      <p>
        <strong>{t('shipping_policy.damages')}</strong><br />
        {t('shipping_policy.damages_text')}
      </p>
      <p>
        <strong>{t('shipping_policy.lost_packages')}</strong><br />
        {t('shipping_policy.lost_packages_text')}
      </p>
    </Element>
    <Element name="section5" className={styles.section3}>
      <hr />
      <h2>{t('return_exchange_policy.title')}</h2>
      <br />
      <p>{t('return_exchange_policy.text')}</p>
      <p><strong>{t('return_exchange_policy.exchange_steps_title')}</strong></p>
      <p>{t('return_exchange_policy.exchange_steps_text')}</p>
      <p><strong>{t('return_exchange_policy.refund_steps_title')}</strong></p>
      <p>{t('return_exchange_policy.refund_steps_text')}</p>
    </Element>
    <Element name="section6" className={styles.section3}>
      <h2>{t('defect_policy.title')}</h2>
      <p>{t('defect_policy.text')}</p>
      <p><strong>{t('defect_policy.promotions_title')}</strong><br/>{t('defect_policy.promotions_text')}</p>
    </Element>
    </div>
  )
}
