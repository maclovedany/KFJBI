"use client";

import { useMemo, useState } from "react";

type Menu = {
  id: number;
  name: string;
  category: string;
  tags: string[];
  price: string;
  time: string;
  distance: string;
  rating: string;
  emoji: string;
  tone: string;
};

const menus: Menu[] = [
  { id: 1, name: "제육볶음 정식", category: "한식", tags: ["든든한", "매콤한"], price: "₩10,000", time: "12분", distance: "0.4km", rating: "4.8", emoji: "🥘", tone: "red" },
  { id: 2, name: "연어 포케", category: "건강식", tags: ["가벼운", "산뜻한"], price: "₩13,500", time: "8분", distance: "0.7km", rating: "4.7", emoji: "🥗", tone: "mint" },
  { id: 3, name: "탄탄멘", category: "면요리", tags: ["고소한", "뜨끈한"], price: "₩11,000", time: "15분", distance: "0.5km", rating: "4.6", emoji: "🍜", tone: "yellow" },
  { id: 4, name: "치킨 부리또", category: "간편식", tags: ["빠른", "든든한"], price: "₩9,500", time: "6분", distance: "0.2km", rating: "4.5", emoji: "🌯", tone: "blue" },
  { id: 5, name: "소고기 쌀국수", category: "면요리", tags: ["담백한", "뜨끈한"], price: "₩10,500", time: "11분", distance: "0.6km", rating: "4.8", emoji: "🍲", tone: "cream" },
  { id: 6, name: "버섯 크림 리조또", category: "양식", tags: ["부드러운", "여유로운"], price: "₩14,000", time: "18분", distance: "0.9km", rating: "4.6", emoji: "🍚", tone: "lavender" },
];

const filters = ["전체", "한식", "면요리", "건강식", "간편식", "양식"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [saved, setSaved] = useState<number[]>([2]);
  const [picked, setPicked] = useState(0);
  const [showSaved, setShowSaved] = useState(false);

  const visibleMenus = useMemo(() => {
    const filtered = activeFilter === "전체" ? menus : menus.filter((menu) => menu.category === activeFilter);
    return showSaved ? filtered.filter((menu) => saved.includes(menu.id)) : filtered;
  }, [activeFilter, saved, showSaved]);

  const pickRandom = () => {
    const pool = activeFilter === "전체" ? menus : menus.filter((menu) => menu.category === activeFilter);
    setPicked(Math.floor(Math.random() * pool.length));
    document.getElementById("recommendations")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleSaved = (id: number) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <main className="site-shell">
      <nav className="topbar">
        <a className="brand" href="#top" aria-label="오늘 뭐 먹지 홈"><span className="brand-mark">오늘</span><span>뭐 먹지?</span></a>
        <div className="nav-links"><a href="#recommendations">추천 메뉴</a><a href="#how">이용 방법</a><button className={showSaved ? "saved-nav active" : "saved-nav"} onClick={() => setShowSaved(!showSaved)}><span>♡</span> 저장한 메뉴 <b>{saved.length}</b></button></div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> TUESDAY, AUG 11 <span className="eyebrow-line" /> 서울, 맑음 27°C</div>
          <h1>오늘 점심,<br /><em>뭐 먹지?</em></h1>
          <p>매일 반복되는 점심 고민,<br />오늘은 10초 만에 골라드릴게요.</p>
          <button className="primary-btn" onClick={pickRandom}>오늘의 메뉴 뽑기 <span>↗</span></button>
          <div className="hero-note"><span>✦</span> 오늘도 맛있는 하루 되세요</div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="sun">☀</div><div className="plate plate-back" /><div className="plate plate-front"><div className="dish-emoji">🍜</div></div><div className="chopstick one" /><div className="chopstick two" /><span className="sprinkle s1">✦</span><span className="sprinkle s2">·</span><span className="sprinkle s3">✳</span></div>
      </section>

      <section className="section-wrap" id="recommendations">
        <div className="section-heading"><div><p className="section-kicker">JUST FOR YOU</p><h2>오늘의 추천 메뉴</h2></div><button className="refresh" onClick={pickRandom}>↻ <span>다시 뽑기</span></button></div>
        <div className="filter-row" role="tablist" aria-label="메뉴 카테고리">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? "filter active" : "filter"} onClick={() => { setActiveFilter(filter); setShowSaved(false); }} role="tab" aria-selected={activeFilter === filter}>{filter}</button>)}</div>
        {visibleMenus.length === 0 ? <div className="empty-state">아직 저장한 메뉴가 없어요.<br />마음에 드는 메뉴의 ♡를 눌러 담아보세요.</div> : <div className="menu-grid">{visibleMenus.map((menu, index) => <article className={index === picked % Math.max(visibleMenus.length, 1) ? "menu-card picked" : "menu-card"} key={menu.id}><div className={`menu-art ${menu.tone}`}><span className="art-emoji">{menu.emoji}</span><button className={saved.includes(menu.id) ? "heart saved" : "heart"} onClick={() => toggleSaved(menu.id)} aria-label={`${menu.name} ${saved.includes(menu.id) ? "저장 취소" : "저장"}`}>{saved.includes(menu.id) ? "♥" : "♡"}</button></div><div className="card-body"><div className="card-title-row"><h3>{menu.name}</h3><span className="rating">★ {menu.rating}</span></div><div className="tag-row">{menu.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><div className="meta-row"><span>{menu.price}</span><span>·</span><span>도보 {menu.time}</span><span>·</span><span>{menu.distance}</span></div></div></article>)}</div>}
      </section>

      <section className="how-section" id="how"><div className="how-inner"><div><p className="section-kicker">LUNCH, MADE EASY</p><h2>점심 선택도<br /><span>가볍게.</span></h2></div><div className="steps"><div className="step"><div className="step-no">01</div><div><h3>취향을 골라요</h3><p>오늘 당기는 카테고리를<br />가볍게 선택해 보세요.</p></div></div><div className="step"><div className="step-no">02</div><div><h3>메뉴를 확인해요</h3><p>직장인 점심에 딱 맞는<br />메뉴만 모아봤어요.</p></div></div><div className="step"><div className="step-no">03</div><div><h3>맛있게 먹어요</h3><p>고민은 줄이고, 점심시간은<br />더 즐겁게 보내세요.</p></div></div></div></div></section>
      <footer><span>오늘 뭐 먹지?</span><span>YOUR DAILY LUNCH COMPASS · SINCE 2024</span><span>Made for busy people <b>♥</b></span></footer>
    </main>
  );
}
