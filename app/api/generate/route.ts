import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, userStyle } = await req.json();

    // 這裡未來會接 OpenAI API，目前先用蝦妹邏輯模擬
    // 蝦妹風格模擬產出
    const mockPosts = [
      {
        text: `【蝦妹推薦】${topic} 真的太精明了吧 🦐✨\n\n自從開始研究這個，感覺整個人質感都提升了 💅💖 有沒有人也覺得這超有料？留言告訴我你的看法！\n\n#${topic} #質感生活 #蝦妹精選`,
        visualPrompt: `${topic}, aesthetic, minimalist, clean high quality photography, soft lighting`,
        seed: Math.floor(Math.random() * 10000)
      }
    ];

    const results = mockPosts.map(post => ({
      ...post,
      imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(post.visualPrompt)}?width=1024&height=1024&nologo=true&seed=${post.seed}`
    }));

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json({ success: false, error: '蝦妹當機了 🦐' }, { status: 500 });
  }
}
