const mysql = require('../../backend/node_modules/mysql2/promise');

async function main() {
  const db = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'unimrkt_strapi'
  });

  console.log('Connected to MySQL. Setting up components_sections_contact_forms...');

  await db.query(`
    CREATE TABLE IF NOT EXISTS components_sections_contact_forms (
      id INT AUTO_INCREMENT PRIMARY KEY,
      kicker VARCHAR(255) NULL,
      heading VARCHAR(255) NULL,
      description TEXT NULL,
      name_placeholder VARCHAR(255) NULL,
      email_placeholder VARCHAR(255) NULL,
      country_code_options TEXT NULL,
      phone_placeholder VARCHAR(255) NULL,
      company_placeholder VARCHAR(255) NULL,
      consent_text TEXT NULL,
      submit_button_text VARCHAR(255) NULL,
      submitting_button_text VARCHAR(255) NULL,
      success_message TEXT NULL,
      error_message TEXT NULL,
      notification_email VARCHAR(255) NULL
    )
  `);

  console.log('Table components_sections_contact_forms ensured.');

  // Check if contact page row exists
  const [existingContact] = await db.query(
    'SELECT * FROM components_sections_contact_forms WHERE heading LIKE "%Let\'s Team Up%" OR kicker LIKE "%Contact Form%"'
  );

  let contactFormId;
  if (existingContact.length > 0) {
    contactFormId = existingContact[0].id;
    await db.query(
      `UPDATE components_sections_contact_forms SET
        kicker = ?,
        heading = ?,
        description = ?,
        name_placeholder = ?,
        email_placeholder = ?,
        country_code_options = ?,
        phone_placeholder = ?,
        company_placeholder = ?,
        consent_text = ?,
        submit_button_text = ?,
        submitting_button_text = ?,
        success_message = ?,
        error_message = ?,
        notification_email = ?
      WHERE id = ?`,
      [
        'Contact Form',
        "Let's Team Up!",
        'Interested in high-end, extensive market research? Get in touch with our experts.',
        'Name*',
        'Email ID*',
        '+91:🇮🇳 +91,+1:🇺🇸 +1,+44:🇬🇧 +44,+61:🇦🇺 +61,+49:🇩🇪 +49',
        'Phone number*',
        'Company name*',
        'I agree to be contacted about my research enquiry.',
        'Send',
        'Sending...',
        'Message Sent! Thank you for reaching out. Our research team will contact you shortly.',
        'An error occurred while submitting your inquiry. Please try again.',
        'sales@unimrkt.com',
        contactFormId
      ]
    );
  } else {
    const [ins] = await db.query(
      `INSERT INTO components_sections_contact_forms (
        kicker, heading, description, name_placeholder, email_placeholder,
        country_code_options, phone_placeholder, company_placeholder,
        consent_text, submit_button_text, submitting_button_text,
        success_message, error_message, notification_email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Contact Form',
        "Let's Team Up!",
        'Interested in high-end, extensive market research? Get in touch with our experts.',
        'Name*',
        'Email ID*',
        '+91:🇮🇳 +91,+1:🇺🇸 +1,+44:🇬🇧 +44,+61:🇦🇺 +61,+49:🇩🇪 +49',
        'Phone number*',
        'Company name*',
        'I agree to be contacted about my research enquiry.',
        'Send',
        'Sending...',
        'Message Sent! Thank you for reaching out. Our research team will contact you shortly.',
        'An error occurred while submitting your inquiry. Please try again.',
        'sales@unimrkt.com'
      ]
    );
    contactFormId = ins.insertId;
  }

  // Check if primary research row exists
  const [existingPr] = await db.query(
    'SELECT * FROM components_sections_contact_forms WHERE heading LIKE "%Discuss Your%"'
  );
  let prFormId;
  if (existingPr.length > 0) {
    prFormId = existingPr[0].id;
  } else {
    const [insPr] = await db.query(
      `INSERT INTO components_sections_contact_forms (
        kicker, heading, description, name_placeholder, email_placeholder,
        country_code_options, phone_placeholder, company_placeholder,
        consent_text, submit_button_text, submitting_button_text,
        success_message, error_message, notification_email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'GET IN TOUCH WITH US',
        "Let's Discuss Your Research Needs",
        'Our experts are ready to help you design and execute primary research that delivers answers to your critical business questions.',
        'Name*',
        'Email ID*',
        '+91:🇮🇳 +91,+1:🇺🇸 +1,+44:🇬🇧 +44,+61:🇦🇺 +61,+49:🇩🇪 +49',
        'Phone number*',
        'Company / Research Requirements*',
        'I agree to be contacted regarding my research enquiry.',
        'Submit',
        'Submitting...',
        'Thank You! Your inquiry has been received. Our research team will reach out to you shortly.',
        'An error occurred while submitting. Please try again.',
        'sales@unimrkt.com'
      ]
    );
    prFormId = insPr.insertId;
  }

  // Link to contact page in pages_cmps
  const [contactPages] = await db.query('SELECT id FROM pages WHERE slug = "contact"');
  for (const p of contactPages) {
    const [exists] = await db.query(
      'SELECT * FROM pages_cmps WHERE entity_id = ? AND cmp_id = ? AND component_type = "sections.contact-form"',
      [p.id, contactFormId]
    );
    if (exists.length === 0) {
      await db.query(
        'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, "sections.contact-form", "sections", 2)',
        [p.id, contactFormId]
      );
      console.log(`Linked sections.contact-form to contact page (id=${p.id})`);
    }
  }

  // Link to primary-research page in pages_cmps
  const [prPages] = await db.query('SELECT id FROM pages WHERE slug = "primary-research"');
  for (const p of prPages) {
    const [exists] = await db.query(
      'SELECT * FROM pages_cmps WHERE entity_id = ? AND cmp_id = ? AND component_type = "sections.contact-form"',
      [p.id, prFormId]
    );
    if (exists.length === 0) {
      await db.query(
        'INSERT INTO pages_cmps (entity_id, cmp_id, component_type, field, `order`) VALUES (?, ?, "sections.contact-form", "sections", 6)',
        [p.id, prFormId]
      );
      console.log(`Linked sections.contact-form to primary-research page (id=${p.id})`);
    }
  }

  console.log('Contact form CMS setup completed in MySQL!');
  await db.end();
}

main().catch(console.error);
