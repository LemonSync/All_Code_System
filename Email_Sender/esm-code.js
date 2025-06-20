import axios from 'axios';

const handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text || !text.includes('|')) {
    return m.reply(`Contoh:\n${usedPrefix + command} email@example.com|Judul Email|Isi Pesan|default/dark/struck`);
  }

  const [to, subject, message, template] = text.split('|').map(v => v.trim());

  if (!to || !subject || !message || !template) {
    return m.reply('Semua bagian harus diisi:\nFormat: email|judul|pesan|template');
  }

  const allowedTemplates = ['default', 'dark', 'struck'];
  const templateName = template.split('/').pop();

  if (!allowedTemplates.includes(templateName)) {
    return m.reply(`Template tidak tersedia. Gunakan salah satu dari: default, dark, struck`);
  }

  try {
    await axios.post('https://lemon-email.vercel.app/send-email', {
      to,
      subject,
      message,
      template
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    m.reply('✅ Email berhasil dikirim.');
  } catch (err) {
    console.error(err);
    m.reply('❌ Gagal mengirim email.');
  }
};

handler.command = ['sendemail'];
handler.tags = ['tool'];
handler.help = ['sendemail'];

export default handler;