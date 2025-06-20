const express = require('express')
const axios = require('axios')
const router = express.Router()

router.get('/', async (req, res) => {
  const { text } = req.query
  if (!text) return res.status(400).json({ status: false, message: 'Masukkan query text' })

  try {
    const response = await axios.post('https://lemon-email.vercel.app/send-email', {
      to,
      subject,
      message,
      template
    }, {
      responseType: 'arraybuffer',
      headers: { 'Content-Type': 'application/json' }
    })

    res.set('Content-Type', 'image/png')
    res.send(response.data)
  } catch (error) {
    res.status(500).json({ status: false, message: 'Gagal generate gambar' })
  }
})

module.exports = router