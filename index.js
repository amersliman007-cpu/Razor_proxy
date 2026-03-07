const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // لقراءة JSON في جسم الطلب

// الـ API الأصلي يشتغل على POST /analyze
app.post('/analyze', async (req, res) => {
    const text = req.body.text;

    if (!text) {
        return res.status(400).json({ error: 'لم يتم إرسال نص للتحليل' });
    }

    const apiKey = '23f8e1bc8c8d9944fbf10660f9ecb17e8cd721d7dedb3c1491a946d3';

    try {
        const response = await fetch('https://api.textrazor.com/', {
            method: 'POST',
            headers: {
                'x-textrazor-key': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `text=${encodeURIComponent(text)}&extractors=entities,topics`
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('خطأ:', error);
        res.status(500).json({ error: 'فشل الاتصال بـ TextRazor' });
    }
});

// إضافة دعم لطلب GET /analyze مع نص عبر query string
app.get('/analyze', async (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).json({ error: 'مطلوب النص للتحليل' });
    }

    const apiKey = '23f8e1bc8c8d9944fbf10660f9ecb17e8cd721d7dedb3c1491a946d3';

    try {
        const response = await fetch('https://api.textrazor.com/', {
            method: 'POST',
            headers: {
                'x-textrazor-key': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `text=${encodeURIComponent(text)}&extractors=entities,topics`
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('خطأ:', error);
        res.status(500).json({ error: 'فشل الاتصال بـ TextRazor' });
    }
});

app.listen(port, () => {
    console.log(`الخادم شغال على المنفذ ${port}`);
});
