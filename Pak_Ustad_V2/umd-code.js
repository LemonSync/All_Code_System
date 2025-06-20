(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('axios'));
    } else if (typeof define === 'function' && define.amd) {
        define(['axios'], factory);
    } else {
        root.handler = factory(root.axios);
    }
}(this, function (axios) {
    const handler = async (m, { conn, text, usedPrefix, command }) => {
        if (!text) return m.reply(`Example:\n${usedPrefix + command} Makan Sambil Kuyang Bisa Gak Pak Ustad`);
        if (text.length > 68) return m.reply(`Teks tidak boleh lebih dari 68 karakter`);

        try {
            const response = await axios.post('https://lemon-ustad.vercel.app/api/generate-image', {
                isi: text,
                option: "type2" // hanya tersedia type1 dan type2
            }, {
                responseType: 'arraybuffer',
                headers: { 'Content-Type': 'application/json' }
            });

            await conn.sendMessage(m.chat, {
                image: Buffer.from(response.data)
            }, { quoted: m });

        } catch (err) {
            console.error(err);
            m.reply('Terjadi kesalahan saat menghubungi server.');
        }
    };

    handler.command = ['pak-ustad2'];
    handler.tags = ['fun'];
    handler.help = ['pak-ustad2'];

    return handler;
}));
