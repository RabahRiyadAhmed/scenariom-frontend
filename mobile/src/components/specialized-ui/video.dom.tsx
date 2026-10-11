'use dom';

export default function VideoDom({ sourceUrl, title, aspectRatio = '16:9' }: { sourceUrl: string; title: string; aspectRatio?: '21:9' | '16:9' | '4:3' | '1:1'; dom?: import('expo/dom').DOMProps }) {
  const ratios = { '21:9': '21 / 9', '16:9': '16 / 9', '4:3': '4 / 3', '1:1': '1 / 1' };
  return <iframe src={sourceUrl} title={title} allowFullScreen style={{ display: 'block', width: '100%', height: '100%', border: 0, aspectRatio: ratios[aspectRatio], background: '#000' }}/>
}
