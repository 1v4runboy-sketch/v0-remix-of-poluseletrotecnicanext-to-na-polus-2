'use client';

import * as SITE from '@/lib/site';

/** WhatsApp flutuante (Gaurang7717 adaptado) — 56x56px e pílula no hover */
export default function WhatsFloat() {
  const hasFn = SITE && typeof SITE.whatsappHref === 'function';
  const href = hasFn
    ? SITE.whatsappHref('Olá! Vim pelo site da Polus.')
    : 'https://wa.me/551135992935?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Polus.';

  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="waBtn" aria-label="WhatsApp Polus">
      <div className="waSign">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
          />
        </svg>
      </div>
      <div className="waText">Whatsapp</div>

      <style jsx>{`
        .waBtn{
          position: fixed;
          left: 16px;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
          z-index: 100400;

          display:flex; align-items:center; justify-content:flex-start;
          width:56px; height:56px; border:none; border-radius:50%;
          cursor:pointer; overflow:hidden; transition:.3s;
          box-shadow: 2px 2px 10px rgba(0,0,0,.199);
          background-color:#00d757; text-decoration:none;
        }
        .waSign{ width:100%; display:flex; align-items:center; justify-content:center; transition:.3s; }
        .waSign svg{ width:28px; height:28px; }
        .waText{
          position:absolute; right:0%; width:0%; opacity:0; color:#fff;
          font-size:1rem; font-weight:700; transition:.3s; white-space:nowrap;
        }
        .waBtn:hover{ width:180px; border-radius:40px; }
        .waBtn:hover .waSign{ width:32%; padding-left:10px; }
        .waBtn:hover .waText{ opacity:1; width:68%; padding-right:12px; }

        @media (max-width:480px){
          .waBtn{ left:12px; }
        }
      `}</style>
    </a>
  );
}
