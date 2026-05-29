import { useEffect, useRef } from 'react'

export default function LoopAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return
      const el = containerRef.current
      const clone = el.cloneNode(true) as HTMLDivElement
      el.parentNode?.replaceChild(clone, el)
    }, 19000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} style={{
      width: '360px',
      height: '360px',
      background: '#1A1410',
      borderRadius: '24px',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <style>{`
        .loop-scene {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          flex-direction: column;
          gap: 14px;
          padding: 24px;
        }
        .loop-s1 { animation: lSceneIn 0.6s cubic-bezier(0.76,0,0.24,1) 0.2s forwards, lSceneOut 0.5s cubic-bezier(0.76,0,0.24,1) 3.2s forwards; }
        .loop-s2 { animation: lSceneIn 0.6s cubic-bezier(0.76,0,0.24,1) 4s forwards,   lSceneOut 0.5s cubic-bezier(0.76,0,0.24,1) 7s forwards; }
        .loop-s3 { animation: lSceneIn 0.6s cubic-bezier(0.76,0,0.24,1) 7.8s forwards,  lSceneOut 0.5s cubic-bezier(0.76,0,0.24,1) 10.8s forwards; }
        .loop-s4 { animation: lSceneIn 0.6s cubic-bezier(0.76,0,0.24,1) 11.6s forwards, lSceneOut 0.5s cubic-bezier(0.76,0,0.24,1) 14.6s forwards; }
        .loop-s5 { animation: lSceneIn 0.6s cubic-bezier(0.76,0,0.24,1) 15.4s forwards, lSceneOut 0.5s cubic-bezier(0.76,0,0.24,1) 18.4s forwards; }

        @keyframes lSceneIn  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes lSceneOut { from { opacity:1; transform:translateY(0); }   to { opacity:0; transform:translateY(-20px); } }

        .l-ring-outer {
          stroke-dasharray: 289; stroke-dashoffset: 289;
          animation: lDrawRing 0.8s cubic-bezier(0.76,0,0.24,1) 0.6s forwards;
        }
        .l-ring-inner {
          stroke-dasharray: 176; stroke-dashoffset: 176;
          animation: lDrawRing 0.6s cubic-bezier(0.76,0,0.24,1) 1.1s forwards;
        }
        .l-fill  { opacity:0; animation: lFadeIn 0.01s 1.6s forwards; }
        .l-dot-o { opacity:0; transform:scale(0); transform-origin:48px 20px; animation: lPopIn 0.4s cubic-bezier(0.34,1.56,0.64,1) 1.7s forwards; }
        .l-dot-i { opacity:0; transform:scale(0); transform-origin:48px 20px; animation: lPopIn 0.3s cubic-bezier(0.34,1.56,0.64,1) 1.85s forwards; }
        .l-name  { opacity:0; transform:translateY(16px); animation: lSlideUp 0.6s cubic-bezier(0.76,0,0.24,1) 2s forwards; }

        @keyframes lDrawRing { to { stroke-dashoffset: 0; } }
        @keyframes lFadeIn   { to { opacity: 1; } }
        @keyframes lPopIn    { from { opacity:0; transform:scale(0); } to { opacity:1; transform:scale(1); } }
        @keyframes lSlideUp  { to { opacity:1; transform:translateY(0); } }

        .l-si-1 { opacity:0; transform:translateY(20px); animation: lSlideUp 0.5s cubic-bezier(0.76,0,0.24,1) 4.3s forwards; }
        .l-si-2 { opacity:0; transform:translateY(20px); animation: lSlideUp 0.5s cubic-bezier(0.76,0,0.24,1) 4.5s forwards; }
        .l-si-3 { opacity:0; transform:translateY(20px); animation: lSlideUp 0.5s cubic-bezier(0.76,0,0.24,1) 4.7s forwards; }
        .l-si-a1 { opacity:0; transform:translateY(20px); animation: lSlideUp 0.5s cubic-bezier(0.76,0,0.24,1) 8.1s forwards; }
        .l-si-a2 { opacity:0; transform:translateY(20px); animation: lSlideUp 0.5s cubic-bezier(0.76,0,0.24,1) 8.4s forwards; }
        .l-si-d1 { opacity:0; transform:translateY(20px); animation: lSlideUp 0.5s cubic-bezier(0.76,0,0.24,1) 11.9s forwards; }
        .l-si-d2 { opacity:0; transform:translateY(20px); animation: lSlideUp 0.5s cubic-bezier(0.76,0,0.24,1) 12.2s forwards; }
        .l-si-c1 { opacity:0; transform:translateY(20px); animation: lSlideUp 0.6s cubic-bezier(0.76,0,0.24,1) 15.7s forwards; }
        .l-si-c2 { opacity:0; transform:translateY(20px); animation: lSlideUp 0.5s cubic-bezier(0.76,0,0.24,1) 16s forwards; }

        .loop-progress {
          position: absolute; bottom:0; left:0; height:2px;
          background:#E8522A;
          animation: lProgress 19s linear 0s infinite;
        }
        @keyframes lProgress { from { width:0%; } to { width:100%; } }

        .loop-corner-dot {
          position:absolute; top:16px; right:16px;
          width:7px; height:7px; border-radius:50%;
          background:#E8522A;
          animation: lPulse 2s ease-in-out infinite;
        }
        @keyframes lPulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.3;transform:scale(0.5);} }

        .l-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px; letter-spacing:0.2em;
          color: rgba(245,240,232,0.3); text-transform:uppercase;
        }
        .l-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 32px; font-weight:900;
          color:#F5F0E8; line-height:1;
        }
        .l-title span { color:#E8522A; }

        .l-browser {
          width:250px; background:#2A2420;
          border-radius:10px; overflow:hidden;
          box-shadow:0 16px 48px rgba(0,0,0,0.4);
        }
        .l-browser-bar {
          background:#3A3430; padding:7px 10px;
          display:flex; align-items:center; gap:5px;
        }
        .l-bdot { width:7px;height:7px;border-radius:50%; }
        .l-nav-mock {
          background:#3A3430; height:24px;
          display:flex; align-items:center; padding:0 10px; gap:6px;
        }
        .l-pill-s {
          height:10px;width:34px;
          border:1px solid rgba(245,240,232,0.2);
          border-radius:999px;
        }
        .l-pill-s.filled { background:#E8522A; border-color:#E8522A; }
        .l-content { padding:12px; display:flex; flex-direction:column; gap:6px; }
        .l-line { height:6px; border-radius:3px; background:rgba(245,240,232,0.12); }
        .l-line.acc { background:#E8522A; width:38%; }
        .l-line.med { width:75%; }
        .l-line.sht { width:55%; }

        .l-phone {
          width:96px; background:#2A2420;
          border-radius:18px; padding:5px;
          box-shadow:0 16px 48px rgba(0,0,0,0.5);
          border:1px solid rgba(255,255,255,0.04);
        }
        .l-phone-screen {
          background:#1A1410; border-radius:13px;
          height:175px; padding:10px 8px;
          display:flex; flex-direction:column; gap:7px;
        }
        .l-notch {
          width:36px;height:9px;background:#2A2420;
          border-radius:4px; margin:0 auto 6px;
        }

        .l-design-row { width:250px; display:flex; gap:8px; }
        .l-card-mock {
          flex:1; background:#2A2420;
          border-radius:8px; padding:12px;
          display:flex; flex-direction:column; gap:7px;
        }
        .l-icon-mock { width:24px;height:24px;border-radius:5px;background:#E8522A;opacity:0.9; }
        .l-icon-mock.sec { background:rgba(245,240,232,0.12); }
      `}</style>

      <div className="loop-corner-dot" />
      <div className="loop-progress" />

      {/* SCENE 1 — Logo Build */}
      <div className="loop-scene loop-s1">
        <svg width="110" height="110" viewBox="0 0 96 96" style={{overflow:'visible'}}>
          <circle className="l-ring-outer" cx="48" cy="48" r="46" fill="none" stroke="#F5F0E8" strokeWidth="3.5"/>
          <circle className="l-ring-inner" cx="48" cy="48" r="28" fill="none" stroke="#F5F0E8" strokeWidth="3.5"/>
          <clipPath id="lrh"><rect x="48" y="0" width="48" height="96"/></clipPath>
          <circle className="l-fill" cx="48" cy="48" r="46" fill="#E8522A" clipPath="url(#lrh)"/>
          <circle className="l-fill" cx="48" cy="48" r="28" fill="#1A1410"/>
          <circle className="l-dot-o" cx="48" cy="20" r="9" fill="#F5F0E8"/>
          <circle className="l-dot-i" cx="48" cy="20" r="4" fill="#E8522A"/>
        </svg>
        <div className="l-name" style={{
          fontFamily:"'Barlow Condensed',sans-serif",
          fontSize:'28px', fontWeight:900, color:'#F5F0E8', letterSpacing:'1px'
        }}>co-studio</div>
      </div>

      {/* SCENE 2 — Web Dev */}
      <div className="loop-scene loop-s2">
        <div className="l-label l-si-1">01 — Web Development</div>
        <div className="l-browser l-si-2">
          <div className="l-browser-bar">
            <div className="l-bdot" style={{background:'#FF5F57'}}/>
            <div className="l-bdot" style={{background:'#FFBD2E'}}/>
            <div className="l-bdot" style={{background:'#28C840'}}/>
            <div style={{flex:1,background:'#2A2420',borderRadius:'3px',height:'12px',marginLeft:'6px'}}/>
          </div>
          <div className="l-nav-mock">
            <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'#E8522A',opacity:0.9,flexShrink:0}}/>
            <div style={{flex:1}}/>
            <div className="l-pill-s filled"/>
            <div className="l-pill-s"/>
          </div>
          <div className="l-content">
            <div className="l-line acc"/>
            <div className="l-line med"/>
            <div className="l-line sht"/>
            <div style={{height:'34px',background:'rgba(232,82,42,0.1)',borderRadius:'5px',marginTop:'2px'}}/>
            <div className="l-line sht"/>
            <div className="l-line"/>
          </div>
        </div>
        <div className="l-title l-si-3"><span>Web</span> Apps</div>
      </div>

      {/* SCENE 3 — App Dev */}
      <div className="loop-scene loop-s3" style={{flexDirection:'row',gap:'16px'}}>
        <div className="l-phone l-si-a1">
          <div className="l-phone-screen">
            <div className="l-notch"/>
            <div style={{height:'7px',width:'44px',background:'#E8522A',borderRadius:'3px',opacity:0.9}}/>
            <div style={{height:'5px',width:'62px',background:'rgba(245,240,232,0.15)',borderRadius:'3px'}}/>
            <div style={{height:'5px',width:'48px',background:'rgba(245,240,232,0.1)',borderRadius:'3px'}}/>
            <div style={{height:'40px',background:'rgba(232,82,42,0.15)',borderRadius:'7px',marginTop:'2px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'#E8522A',opacity:0.8}}/>
            </div>
            <div style={{height:'5px',width:'52px',background:'rgba(245,240,232,0.1)',borderRadius:'3px'}}/>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'6px'}} className="l-si-a2">
          <div className="l-label">02 — App Dev</div>
          <div className="l-title">Mobile<br/><span>Apps</span></div>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'9px',color:'rgba(245,240,232,0.3)',letterSpacing:'0.1em',lineHeight:1.6}}>iOS · Android<br/>Desktop</div>
        </div>
      </div>

      {/* SCENE 4 — UI/UX */}
      <div className="loop-scene loop-s4">
        <div className="l-label l-si-d1">03 — UI/UX Design</div>
        <div className="l-design-row l-si-d2">
          {[
            {bg:'#E8522A', btnBg:'rgba(232,82,42,0.8)'},
            {bg:'rgba(245,240,232,0.12)', btnBg:'transparent', btnBorder:'1px solid rgba(245,240,232,0.15)'},
            {bg:'rgba(245,240,232,0.06)', btnBg:'rgba(245,240,232,0.06)'},
          ].map((c,i) => (
            <div key={i} className="l-card-mock">
              <div className="l-icon-mock" style={{background:c.bg, opacity:0.9}}/>
              <div style={{height:'6px',width:'70%',background:'rgba(245,240,232,0.18)',borderRadius:'3px'}}/>
              <div style={{height:'4px',width:'90%',background:'rgba(245,240,232,0.1)',borderRadius:'3px'}}/>
              <div style={{marginTop:'4px',height:'20px',background:c.btnBg,border:c.btnBorder||'none',borderRadius:'5px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                {i===0 && <div style={{height:'4px',width:'32px',background:'white',borderRadius:'2px',opacity:0.9}}/>}
              </div>
            </div>
          ))}
        </div>
        <div className="l-title l-si-d2" style={{fontSize:'26px'}}>Clean <span>Interfaces</span></div>
      </div>

      {/* SCENE 5 — CTA */}
      <div className="loop-scene loop-s5" style={{gap:'10px'}}>
        <svg width="44" height="44" viewBox="0 0 96 96" className="l-si-c1">
          <circle cx="48" cy="48" r="46" fill="#E8522A"/>
          <circle cx="48" cy="48" r="28" fill="#1A1410"/>
          <rect x="48" y="2" width="48" height="46" fill="#1A1410"/>
          <rect x="48" y="48" width="48" height="46" fill="#1A1410"/>
          <circle cx="48" cy="20" r="9" fill="#F5F0E8"/>
          <circle cx="48" cy="20" r="4" fill="#E8522A"/>
        </svg>
        <div className="l-si-c1" style={{
          fontFamily:"'Barlow Condensed',sans-serif",
          fontSize:'36px', fontWeight:900, color:'#F5F0E8',
          textAlign:'center', lineHeight:1.05
        }}>
          LET'S BUILD<br/>SOMETHING<br/><span style={{color:'#E8522A'}}>GREAT ツ</span>
        </div>
        <div className="l-si-c2" style={{
          fontFamily:"'JetBrains Mono',monospace",
          fontSize:'9px', color:'rgba(245,240,232,0.3)',
          letterSpacing:'0.2em', textAlign:'center'
        }}>
          co-studio.at · Vienna · 2026
        </div>
      </div>
    </div>
  )
}
