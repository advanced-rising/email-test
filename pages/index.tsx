// pages/contact.js
import { useState } from 'react';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('전송중...');

    try {
      const response = await fetch('/api/contact', {
        // API Route 호출
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('메시지가 성공적으로 전송되었습니다!');
        setFormData({ name: '', phone: '' });
      } else {
        setStatus('전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      setStatus('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-md'>
      <h1 className='text-2xl font-bold mb-6'>문의하기</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block mb-1'>이름</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded'
          />
        </div>
        <div>
          <label className='block mb-1'>전화번호</label>
          <input
            type='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
            className='w-full border p-2 rounded'
          />
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          전송하기
        </button>
      </form>
      {status && <p className='mt-4 text-center'>{status}</p>}
    </div>
  );
};

export default Home;
