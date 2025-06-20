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
    if (!text) return m.reply(`Contoh:\n${usedPrefix + command} Kenapa kamu suka ngirim NGL ke aku?`);
    if (text.length > 125) return m.reply('Teks tidak boleh lebih dari 125 karakter.');

    try {
      const response = await axios.post('https://lemon-ngl.vercel.app/api/generate-image', {
        text
      }, {
        responseType: 'arraybuffer',
        headers: { 'Content-Type': 'application/json' }
      });

      await conn.sendMessage(m.chat, {
        image: Buffer.from(response.data)
      }, { quoted: m });
    } catch (err) {
      console.error(err);
      m.reply('❌ Gagal menghubungi server NGL.');
    }
  };

  handler.command = ['ngl'];
  handler.tags = ['fun'];
  handler.help = ['ngl'];

  return handler;
}));