(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('axios'));
  } else if (typeof define === 'function' && define.amd) {
    define(['axios'], factory);
  } else {
    root.handler = factory(root.axios);
  }
}(this, function (axios) {
  const handler = async (m, { text, conn, usedPrefix, command }) => {
    if (!text) return m.reply(`Contoh:\n${usedPrefix + command} Hari ini aku belajar menulis bot WhatsApp!`);

    try {
      const response = await axios.post('https://lemon-write.vercel.app/api/generate-book', {
        text,
        font: 'default',
        color: '#000000',
        size: 28
      }, {
        responseType: 'arraybuffer',
        headers: { 'Content-Type': 'application/json' }
      });

      await conn.sendMessage(m.chat, {
        image: Buffer.from(response.data)
      }, { quoted: m });
    } catch (err) {
      console.error(err);
      m.reply('❌ Gagal menghubungi server penulisan.');
    }
  };

  handler.command = ['nulis'];
  handler.tags = ['fun'];
  handler.help = ['nulis'];

  return handler;
}));