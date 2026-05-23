"use client";
import { useState, useMemo, CSSProperties } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
interface Vendor {
  id: number;
  name: string;
  category: string;
  city: string;
  areas: string[];
  rating: number;
  reviews: number;
  price: string;
  tag: string | null;
  bio: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  photos: string[];
}

// ── Seed Data ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All","Venue","Photographer","Videographer","Catering",
  "Makeup Artist","DJ","Decoration","Mehndi","Bridal Wear",
  "Wedding Planner","Cars",
];

const VENDORS: Vendor[] = [
  {
    id:1, name:"The Grand Manor", category:"Venue",
    city:"London", areas:["London","Surrey","Kent"],
    rating:4.9, reviews:134, price:"£3,500+", tag:"Featured",
    bio:"A stunning Georgian manor nestled in 12 acres of English countryside. Accommodates up to 300 guests with dedicated bridal suites, outdoor ceremony lawns, and award-winning in-house catering.",
    phone:"+44 7700 900001", whatsapp:"+44 7700 900001", instagram:"@thegrandmanor",
    photos:["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80","https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80","https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&q=80","https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80"],
  },
  {
    id:2, name:"Lens & Love Photography", category:"Photographer",
    city:"Manchester", areas:["Manchester","Liverpool","Leeds","Sheffield"],
    rating:5.0, reviews:89, price:"£1,200+", tag:"Top Rated",
    bio:"Documentary-style wedding photography that captures raw, genuine emotion. We travel across the North of England and beyond. Every story deserves to be told beautifully.",
    phone:"+44 7700 900002", whatsapp:"+44 7700 900002", instagram:"@lensandlovephoto",
    photos:["https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80","https://images.unsplash.com/photo-1583939411023-14783179e581?w=600&q=80","https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80","https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80"],
  },
  {
    id:3, name:"Bloom & Blossom Decor", category:"Decoration",
    city:"Birmingham", areas:["Birmingham","Coventry","Wolverhampton","Leicester"],
    rating:4.8, reviews:212, price:"£800+", tag:"Popular",
    bio:"Luxury floral design and event decoration for South Asian and Western weddings. Specialists in mandap design, table centrepieces, and full venue transformations.",
    phone:"+44 7700 900003", whatsapp:"+44 7700 900003", instagram:"@bloomblossomdecor",
    photos:["https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80","https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&q=80","https://images.unsplash.com/photo-1561128290-000d9c3c5b37?w=600&q=80","https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80"],
  },
  {
    id:4, name:"Spice Route Catering", category:"Catering",
    city:"Bradford", areas:["Bradford","Leeds","Huddersfield","Halifax","Manchester"],
    rating:4.9, reviews:307, price:"£45/head", tag:"Featured",
    bio:"Authentic South Asian cuisine for weddings of all sizes. Menus crafted from family recipes spanning three generations. Halal-certified. Serves 50–2,000 guests.",
    phone:"+44 7700 900004", whatsapp:"+44 7700 900004", instagram:"@spiceroutecatering",
    photos:["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80","https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80","https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80","https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80"],
  },
  {
    id:5, name:"Glam by Saira", category:"Makeup Artist",
    city:"London", areas:["London","Essex","Hertfordshire","Surrey"],
    rating:4.9, reviews:178, price:"£350+", tag:"Top Rated",
    bio:"Award-winning bridal makeup artist specialising in South Asian and fusion bridal looks. Available for trials, bridal day, and full bridal party bookings.",
    phone:"+44 7700 900005", whatsapp:"+44 7700 900005", instagram:"@glamby.saira",
    photos:["https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80","https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&q=80","https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80","https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80"],
  },
  {
    id:6, name:"DJ Riz Events", category:"DJ",
    city:"Leicester", areas:["Leicester","Nottingham","Birmingham","Coventry","Derby"],
    rating:4.7, reviews:95, price:"£600+", tag:null,
    bio:"10 years of wedding DJ experience across Asian and Western events. Bollywood, Bhangra, R&B, house and everything in between. Professional sound and lighting setup included.",
    phone:"+44 7700 900006", whatsapp:"+44 7700 900006", instagram:"@djrizevents",
    photos:["https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&q=80","https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=600&q=80","https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80","https://images.unsplash.com/photo-1518972559570-7cc1309f3229?w=600&q=80"],
  },
  {
    id:7, name:"Mehndi Masters", category:"Mehndi",
    city:"Birmingham", areas:["Birmingham","Leicester","Coventry","Derby","Wolverhampton"],
    rating:5.0, reviews:143, price:"£150+", tag:"Top Rated",
    bio:"Intricate bridal mehndi designs blending traditional Pakistani and Rajasthani styles with contemporary patterns. Bridal packages include hands, arms, and feet.",
    phone:"+44 7700 900007", whatsapp:"+44 7700 900007", instagram:"@mehndi.masters",
    photos:["https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=600&q=80","https://images.unsplash.com/photo-1631947430066-48c30d57b943?w=600&q=80","https://images.unsplash.com/photo-1606293926249-c5a2e3de2afa?w=600&q=80","https://images.unsplash.com/photo-1583468323330-9032ad490fed?w=600&q=80"],
  },
  {
    id:8, name:"Northern Frames Cinema", category:"Videographer",
    city:"Manchester", areas:["Manchester","Preston","Blackburn","Liverpool","Leeds"],
    rating:4.8, reviews:67, price:"£1,800+", tag:"Popular",
    bio:"Cinematic wedding films shot in 4K with drone footage. We craft 3–5 minute highlight reels and full-day edits that feel like a feature film of your most important day.",
    phone:"+44 7700 900008", whatsapp:"+44 7700 900008", instagram:"@northernframescinema",
    photos:["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80","https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80","https://images.unsplash.com/photo-1500490282668-5af115307f90?w=600&q=80","https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80"],
  },
];

const CITIES = ["London","Manchester","Birmingham","Bradford","Leicester","Leeds","Sheffield","Liverpool","Coventry","Nottingham"];

// ── Helpers ──────────────────────────────────────────────────────────────────
const Stars = ({ n }: { n: number }) => (
  <span style={{ color: "#C97D2E", fontSize: 13 }}>
    {"★".repeat(Math.round(n))}{"☆".repeat(5 - Math.round(n))}
  </span>
);

// ── Styles ───────────────────────────────────────────────────────────────────
const S: Record<string, CSSProperties> = {
  app: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#FAFAF8",
    minHeight: "100vh",
    color: "#1C1B18",
  },
  nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 32px", height: 64, background: "#fff",
    borderBottom: "1px solid #EBEBEA", position: "sticky", top: 0, zIndex: 100,
  },
  logo: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.5px", color: "#1C1B18" },
  logoAccent: { color: "#C97D2E" },
  navBtn: {
    background: "#C97D2E", color: "#fff", border: "none",
    padding: "8px 18px", borderRadius: 8, fontSize: 13,
    fontWeight: 600, cursor: "pointer",
  },
  hero: {
    background: "linear-gradient(135deg, #1C1B18 0%, #2D2B26 60%, #3A2F1E 100%)",
    padding: "72px 32px 80px", textAlign: "center", position: "relative", overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute", inset: 0,
    backgroundImage: "radial-gradient(circle at 30% 50%, rgba(201,125,46,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(201,125,46,0.08) 0%, transparent 40%)",
    pointerEvents: "none",
  },
  heroTagline: { color: "#C97D2E", fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 },
  heroH1: { fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 16, letterSpacing: "-1px" },
  heroSub: { color: "#A09D96", fontSize: 16, maxWidth: 520, margin: "0 auto 40px" },
  searchBox: {
    background: "#fff", borderRadius: 16, padding: 8,
    display: "flex", gap: 8, maxWidth: 620, margin: "0 auto",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)", flexWrap: "wrap",
  },
  searchSelect: {
    flex: 1, minWidth: 140, border: "1px solid #EBEBEA", borderRadius: 10,
    padding: "10px 12px", fontSize: 14, color: "#1C1B18",
    background: "#FAFAF8", outline: "none", cursor: "pointer",
  },
  searchBtn: {
    background: "#C97D2E", color: "#fff", border: "none",
    padding: "11px 24px", borderRadius: 10, fontSize: 14,
    fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
  },
  section: { maxWidth: 1100, margin: "0 auto", padding: "48px 24px" },
  sectionTitle: { fontSize: 22, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.3px" },
  sectionSub: { fontSize: 14, color: "#6B6860", marginBottom: 28 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 },
  card: {
    background: "#fff", borderRadius: 16, overflow: "hidden",
    border: "1px solid #EBEBEA", transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  cardImg: { width: "100%", height: 200, objectFit: "cover" as const, display: "block" },
  cardBody: { padding: "16px 18px 20px" },
  cardName: { fontSize: 16, fontWeight: 700, marginBottom: 4, letterSpacing: "-0.2px" },
  cardMeta: { fontSize: 13, color: "#6B6860", marginBottom: 8 },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  catBar: {
    background: "#fff", borderBottom: "1px solid #EBEBEA",
    position: "sticky", top: 64, zIndex: 90, overflowX: "auto" as const,
  },
  catInner: { display: "flex", gap: 4, padding: "0 24px", minWidth: "max-content" },
  profileBg: {
    background: "linear-gradient(135deg, #1C1B18 0%, #2D2B26 100%)",
    padding: "40px 32px 60px",
  },
  profileCard: {
    maxWidth: 900, margin: "0 auto", background: "#fff",
    borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
  },
  backBtn: {
    background: "none", border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff", padding: "8px 16px", borderRadius: 8,
    fontSize: 13, cursor: "pointer", marginBottom: 24, display: "flex", alignItems: "center", gap: 6,
  },
  aiBox: {
    background: "linear-gradient(135deg, #1C1B18 0%, #2D2B26 100%)",
    borderRadius: 20, padding: 32, maxWidth: 680, margin: "0 auto",
    textAlign: "center" as const, position: "relative", overflow: "hidden",
  },
  aiInput: {
    width: "100%", border: "1px solid #EBEBEA", borderRadius: 12,
    padding: "14px 16px", fontSize: 15, outline: "none",
    background: "#fff", boxSizing: "border-box" as const, marginBottom: 8,
  },
  emptyState: {
    textAlign: "center" as const, padding: "60px 24px", color: "#6B6860",
  },
};

// Dynamic style helpers (these return CSSProperties directly, not stored in S)
const cardTagStyle = (tag: string): CSSProperties => ({
  display: "inline-block", fontSize: 10, fontWeight: 700,
  padding: "3px 8px", borderRadius: 6, marginBottom: 8,
  textTransform: "uppercase", letterSpacing: "0.08em",
  background: tag === "Featured" ? "#FEF3E2" : tag === "Top Rated" ? "#F0FDF4" : "#F1F5F9",
  color: tag === "Featured" ? "#C97D2E" : tag === "Top Rated" ? "#16A34A" : "#475569",
});

const catBtnStyle = (active: boolean): CSSProperties => ({
  padding: "14px 16px", fontSize: 13, fontWeight: active ? 700 : 500,
  color: active ? "#C97D2E" : "#6B6860", background: "none", border: "none",
  borderBottom: `2px solid ${active ? "#C97D2E" : "transparent"}`,
  cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s",
});

const badgeStyle = (color: string): CSSProperties => ({
  display: "inline-block", padding: "4px 12px", borderRadius: 20,
  fontSize: 12, fontWeight: 600,
  background: color === "gold" ? "#FEF3E2" : "#F0FDF4",
  color: color === "gold" ? "#C97D2E" : "#16A34A",
});

const contactBtnStyle = (primary: boolean): CSSProperties => ({
  flex: 1, padding: "12px 0", borderRadius: 10, fontSize: 14,
  fontWeight: 600, cursor: "pointer", border: "none", transition: "opacity 0.15s",
  background: primary ? "#C97D2E" : "#1C1B18",
  color: "#fff",
});

// ── VendorCard ───────────────────────────────────────────────────────────────
function VendorCard({ v, onClick }: { v: Vendor; onClick: (v: Vendor) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...S.card, transform: hovered ? "translateY(-4px)" : "none", boxShadow: hovered ? "0 12px 36px rgba(0,0,0,0.1)" : "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(v)}
    >
      <img src={v.photos[0]} alt={v.name} style={S.cardImg} />
      <div style={S.cardBody}>
        {v.tag && <div style={cardTagStyle(v.tag)}>{v.tag}</div>}
        <div style={S.cardName}>{v.name}</div>
        <div style={S.cardMeta}>
          <span style={{ background: "#F5F4F0", borderRadius: 4, padding: "2px 7px", marginRight: 6, fontSize: 12 }}>{v.category}</span>
          📍 {v.city}
        </div>
        <div style={S.cardFooter}>
          <div><Stars n={v.rating} /> <span style={{ fontSize: 12, color: "#6B6860" }}>{v.rating} ({v.reviews})</span></div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#C97D2E" }}>{v.price}</div>
        </div>
      </div>
    </div>
  );
}

// ── VendorProfile ─────────────────────────────────────────────────────────────
function VendorProfile({ v, onBack }: { v: Vendor; onBack: () => void }) {
  const [activePhoto, setActivePhoto] = useState(0);
  return (
    <div>
      <div style={S.profileBg}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <button style={S.backBtn} onClick={onBack}>← Back to results</button>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              {v.tag && <div style={{ ...badgeStyle(v.tag === "Featured" ? "gold" : "green"), marginBottom: 12 }}>{v.tag}</div>}
              <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.5px" }}>{v.name}</h1>
              <p style={{ color: "#A09D96", fontSize: 14, margin: "0 0 12px" }}>
                <span style={{ background: "rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 8px", marginRight: 8 }}>{v.category}</span>
                📍 {v.areas.join(" · ")}
              </p>
              <div><Stars n={v.rating} /> <span style={{ color: "#A09D96", fontSize: 13 }}>{v.rating} from {v.reviews} reviews</span></div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#C97D2E" }}>{v.price}</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "-32px auto 0", padding: "0 24px 48px" }}>
        <div style={S.profileCard}>
          <div style={{ position: "relative" }}>
            <img src={v.photos[activePhoto]} alt="" style={{ width: "100%", height: 360, objectFit: "cover" as const, display: "block" }} />
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {v.photos.map((_: string, i: number) => (
                <button key={i} onClick={() => setActivePhoto(i)} style={{ width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer", background: i === activePhoto ? "#C97D2E" : "rgba(255,255,255,0.7)" }} />
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4, padding: "4px 0" }}>
            {v.photos.map((p: string, i: number) => (
              <img key={i} src={p} alt="" onClick={() => setActivePhoto(i)} style={{ width: "100%", height: 72, objectFit: "cover" as const, cursor: "pointer", opacity: i === activePhoto ? 1 : 0.65, transition: "opacity 0.15s" }} />
            ))}
          </div>

          <div style={{ padding: "28px 28px 32px" }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>About</h2>
            <p style={{ fontSize: 14, color: "#4A4843", lineHeight: 1.8, marginBottom: 28 }}>{v.bio}</p>

            <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Service areas</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {v.areas.map((a: string) => <span key={a} style={{ background: "#F5F4F0", borderRadius: 8, padding: "5px 12px", fontSize: 13 }}>📍 {a}</span>)}
            </div>

            <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Get in touch</h2>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={contactBtnStyle(true)} onClick={() => window.open(`https://wa.me/${v.whatsapp.replace(/\D/g, "")}`)}>💬 WhatsApp</button>
              <button style={contactBtnStyle(false)} onClick={() => window.open(`tel:${v.phone}`)}>📞 Call</button>
              <button style={{ ...contactBtnStyle(false), background: "#E1306C" }} onClick={() => window.open(`https://instagram.com/${v.instagram.replace("@", "")}`)}>📸 Instagram</button>
            </div>

            <div style={{ marginTop: 28, background: "#F5F4F0", borderRadius: 14, padding: 20, borderLeft: "3px solid #C97D2E" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#C97D2E", marginBottom: 4 }}>🤖 AI Assistant — coming soon</div>
              <div style={{ fontSize: 13, color: "#6B6860" }}>Ask questions like "Is this vendor available in December?" or "What packages do they offer?" — AI answers coming soon.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("All");
  const [searched, setSearched] = useState(false);
  const [selected, setSelected] = useState<Vendor | null>(null);
  const [aiQuery, setAiQuery] = useState("");

  const results = useMemo(() => {
    if (!searched) return [];
    return VENDORS.filter(v => {
      const cityMatch = !city || v.areas.some(a => a.toLowerCase().includes(city.toLowerCase()));
      const catMatch = category === "All" || v.category === category;
      return cityMatch && catMatch;
    });
  }, [searched, city, category]);

  if (selected) return <VendorProfile v={selected} onBack={() => setSelected(null)} />;

  return (
    <div style={S.app}>
      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.logo}>wed<span style={S.logoAccent}>link</span></div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#6B6860", cursor: "pointer" }}>List your business</span>
          <button style={S.navBtn}>Sign in</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={S.hero}>
        <div style={S.heroOverlay} />
        <div style={{ position: "relative" }}>
          <div style={S.heroTagline}>UK&apos;s wedding vendor marketplace</div>
          <h1 style={S.heroH1}>Find every vendor<br />for your perfect day</h1>
          <p style={S.heroSub}>Search photographers, venues, caterers, makeup artists and more — all filtered by your location.</p>
          <div style={S.searchBox}>
            <select style={S.searchSelect} value={city} onChange={e => setCity(e.target.value)}>
              <option value="">📍 All locations</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select style={S.searchSelect} value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c === "All" ? "All categories" : c}</option>)}
            </select>
            <button style={S.searchBtn} onClick={() => setSearched(true)}>Search vendors →</button>
          </div>
          <p style={{ color: "#6B6860", fontSize: 13, marginTop: 16 }}>
            {VENDORS.length} vendors across {CITIES.length} cities
          </p>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div style={S.catBar}>
        <div style={S.catInner}>
          {CATEGORIES.map(c => (
            <button key={c} style={catBtnStyle(category === c)} onClick={() => { setCategory(c); setSearched(true); }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS / HOME */}
      <div style={S.section}>
        {!searched ? (
          <>
            <div style={S.sectionTitle}>Featured vendors</div>
            <div style={S.sectionSub}>Handpicked across the UK</div>
            <div style={S.grid}>
              {VENDORS.filter(v => v.tag === "Featured" || v.tag === "Top Rated").slice(0, 6).map(v => (
                <VendorCard key={v.id} v={v} onClick={setSelected} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div style={S.sectionTitle}>
              {results.length} vendor{results.length !== 1 ? "s" : ""} found
            </div>
            <div style={{ ...S.sectionSub }}>
              {city ? `Serving ${city}` : "All locations"} · {category === "All" ? "All categories" : category}
            </div>
            {results.length === 0 ? (
              <div style={S.emptyState}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No vendors found</div>
                <div style={{ fontSize: 14 }}>Try a different city or category</div>
                <button style={{ ...S.navBtn, marginTop: 16 }} onClick={() => { setCity(""); setCategory("All"); }}>Clear filters</button>
              </div>
            ) : (
              <div style={S.grid}>
                {results.map(v => <VendorCard key={v.id} v={v} onClick={setSelected} />)}
              </div>
            )}
          </>
        )}

        {/* AI PLACEHOLDER */}
        <div style={{ marginTop: 64 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={S.sectionTitle}>AI wedding assistant</div>
            <div style={S.sectionSub}>Tell us what you need in plain English — coming soon</div>
          </div>
          <div style={S.aiBox}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 50% 0%, rgba(201,125,46,0.2) 0%, transparent 60%)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
              <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>Ask anything about your wedding</h3>
              <p style={{ color: "#A09D96", fontSize: 14, marginBottom: 20 }}>&quot;Find a Pakistani caterer in Birmingham under £40/head&quot;</p>
              <input style={S.aiInput} placeholder="Describe what you need…" value={aiQuery} onChange={e => setAiQuery(e.target.value)} disabled />
              <button style={{ ...S.searchBtn, opacity: 0.5, cursor: "not-allowed", borderRadius: 10, padding: "12px 28px", fontSize: 14 }} disabled>
                Coming soon
              </button>
              <p style={{ color: "#6B6860", fontSize: 12, marginTop: 12 }}>AI assistant powered by OpenAI — currently disabled.</p>
            </div>
          </div>
        </div>

        {/* VENDOR CTA */}
        <div style={{ marginTop: 64, background: "#1C1B18", borderRadius: 20, padding: "40px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ color: "#C97D2E", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Are you a wedding vendor?</div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>List your business for free</div>
            <div style={{ color: "#A09D96", fontSize: 14 }}>Reach thousands of couples looking for your services</div>
          </div>
          <button style={{ ...S.navBtn, padding: "14px 28px", fontSize: 15 }}>Get listed →</button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#1C1B18", padding: "32px", textAlign: "center" }}>
        <div style={{ ...S.logo, marginBottom: 8 }}>wed<span style={S.logoAccent}>link</span></div>
        <p style={{ color: "#6B6860", fontSize: 13 }}>© 2025 WedLink · Built to connect couples with the best vendors across the UK</p>
      </div>
    </div>
  );
}
