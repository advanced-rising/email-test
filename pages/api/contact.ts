// pages/api/contact.js
import { init, send } from '@emailjs/nodejs';
import { NextApiRequest, NextApiResponse } from 'next';
import { EmailJSResponseStatus } from '@emailjs/nodejs';

init({
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone } = req.body;

  try {
    const response: EmailJSResponseStatus = await send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      {
        message: `전화번호: ${phone}`,
      }
    );

    if (response.status === 200) {
      res.status(200).json({ message: '이메일이 성공적으로 전송되었습니다.' });
    } else {
      throw new Error('이메일 전송 실패');
    }
  } catch (error) {
    console.error('이메일 전송 중 오류:', error);
    res.status(500).json({ message: '이메일 전송에 실패했습니다.' });
  }
}
