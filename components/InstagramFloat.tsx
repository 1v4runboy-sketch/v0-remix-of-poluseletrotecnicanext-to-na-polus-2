'use client';

/**
 * Instagram flutuante — Uiverse (vinodjangid07) com ÍCONE OFICIAL
 * - Mantém TODAS as animações/estrutura do Uiverse (tooltip, camadas, label)
 * - Substitui o SVG por um desenho do APP ICON oficial:
 *   • Quadrado arredondado (contorno branco)
 *   • Círculo grande (contorno branco)
 *   • Ponto branco (lens flare)
 * - Fixo no canto inferior direito (sem cortar o tooltip)
 * - Z-index altíssimo para não ficar atrás de nada
 */

export default function InstagramFloat() {
  const instagramHref = 'https://www.instagram.com/_poluseletrotecnica/';

  return (
    <div className="ig-fix" aria-label="Instagram Polus">
      {/* From Uiverse.io by vinodjangid07 (estrutura e classes originais) */}
      <div className="tooltip-container">
        {/* Tooltip (cartão) — abre para cima/ESQUERDA, ancorado à direita */}
        <div className="tooltip" role="tooltip" aria-hidden="true">
          <div className="profile">
            <div className="user">
              <div className="img">IG</div>
              <div className="details">
                <div className="name">Polus Eletrotécnica</div>
                <div className="username">@_poluseletrotecnica</div>
              </div>
            </div>
            <div className="about">Instagram oficial</div>
          </div>
        </div>

        <div className="text">
          <a
            className="icon"
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label="Abrir Instagram da Polus"
          >
            <div className="layer">
              <span></span>
              <span></span>
              <span></span>
              <span></span>

              {/* Bloco do gradiente (fundo do app icon) */}
              <span className="instagramSVG">
                {/* ÍCONE OFICIAL (app icon): rounded square + circle + dot */}
                <svg
                  className="svgIcon"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Quadrado arredondado (contorno branco) */}
                  <rect
                    x="56" y="56" width="400" height="400" rx="110" ry="110"
                    fill="none"
                    stroke="white"
                    strokeWidth="36"
                  />
                  {/* Círculo grande (contorno branco) */}
                  <circle
                    cx="256" cy="256" r="95"
                    fill="none"
                    stroke="white"
                    strokeWidth="36"
                  />
                  {/* Ponto (lens) */}
                  <circle cx="356" cy="156" r="22" fill="white" />
                </svg>
              </span>
            </div>
            <div className="text">Instagram</div>
          </a>
        </div>
      </div>

      {/* Posicionamento fixo + CSS do Uiverse (fiel), com âncora direita no tooltip */}
      <style jsx>{`
        /* Fixo no canto inferior direito */
        .ig-fix{
          position: fixed;
          right: 16px;
          bottom: calc(16px + env(safe-area-inset-bottom, 0px));
          z-index: 2147483647; /* topo absoluto */
          pointer-events: auto;
          transform: translateZ(0);
        }
        @media (max-width: 480px){
          .ig-fix{ right: 12px; bottom: calc(12px + env(safe-area-inset-bottom, 0px)); }
        }

        /* ===== CSS ORIGINAL UIVERSE (vinodjangid07) ===== */
        .tooltip-container { position: relative; cursor: pointer; transition: all .2s; font-size: 17px; border-radius: 10px; }

        /* Tooltip ancorado à direita (abre p/ cima e p/ ESQUERDA) para não cortar */
        .tooltip{
          position: absolute;
          bottom: calc(100% + 10px); /* sobe */
          right: 0;                  /* ancora à direita do botão */
          transform: translateY(6px);
          padding: 10px;
          opacity: 0;
          pointer-events: none;
          transition: transform .3s ease, opacity .3s ease;
          border-radius: 15px;
          box-shadow:
            inset 5px 5px 5px rgba(0,0,0,.2),
            inset -5px -5px 15px rgba(255,255,255,.1),
            5px 5px 15px rgba(0,0,0,.3),
            -5px -5px 15px rgba(255,255,255,.1);
        }
        .tooltip-container:hover .tooltip{
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        .profile { background:#2a2b2f; border-radius:10px 15px; padding:10px; border:1px solid #52382f; width:max-content; }
        .user{ display:flex; gap:10px; }
        .img{ width:50px; height:50px; font-size:25px; font-weight:700; border:1px solid #e6683c; border-radius:10px; display:flex; align-items:center; justify-content:center; background:#fff; }
        .details{ display:flex; flex-direction:column; gap:0; color:#fff; }
        .name{ font-size:17px; font-weight:700; color:#e6683c; }
        .username{ font-size:13px; opacity:.9; }
        .about{ color:#ccc; padding-top:5px; font-size:12px; }

        .text { position: relative; }
        .icon { text-decoration:none; color:#fff; display:block; position:relative; }
        .layer { width:55px; height:55px; transition: transform .3s; }
        .icon:hover .layer { transform: rotate(-35deg) skew(20deg); }

        .layer span { position:absolute; top:0; left:0; height:100%; width:100%; border:1px solid #fff; border-radius:15px; transition:all .3s; }

        .layer span, .text { color:#e6683c; border-color:#e6683c; }
        .icon:hover .layer span { box-shadow:-1px 1px 3px #e6683c; }

        .icon .text{
          position:absolute; left:50%; bottom:-5px; opacity:0; font-weight:500;
          transform:translateX(-50%); transition: bottom .3s ease, opacity .3s ease;
          white-space:nowrap; text-shadow: 0 1px 2px rgba(0,0,0,.45);
        }
        .icon:hover .text{ bottom:-35px; opacity:1; }

        .icon:hover .layer span:nth-child(1){ opacity:.2; }
        .icon:hover .layer span:nth-child(2){ opacity:.4; transform:translate(5px,-5px); }
        .icon:hover .layer span:nth-child(3){ opacity:.6; transform:translate(10px,-10px); }
        .icon:hover .layer span:nth-child(4){ opacity:.8; transform:translate(15px,-15px); }

        /* Fundo (gradiente) do app icon — fica 100% atrás do SVG branco */
        .instagramSVG{
          position:absolute; inset:0; border-radius:15px;
          display:flex; align-items:center; justify-content:center;
          background: linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
        }

        /* Tamanho do “ícone branco” — fiel à proporção do app icon */
        .svgIcon{
          height: 26px;   /* ~1.5em do original; 26 px combina com 55×55 e bordas 15px */
          width: auto;
          display: block;
        }
      `}</style>
    </div>
  );
}
