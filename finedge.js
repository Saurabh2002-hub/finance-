/* ───── TICKER ───── */
const ticks = [
    {n:'NIFTY 50',   p:'24,683.70', c:'+0.84%', up:true},
    {n:'SENSEX',     p:'81,220.15', c:'+0.71%', up:true},
    {n:'NIFTY BANK', p:'52,340.80', c:'+0.75%', up:true},
    {n:'NIFTY IT',   p:'38,760.50', c:'+0.81%', up:true},
    {n:'S&P 500',    p:'5,348.20',  c:'−0.23%', up:false},
    {n:'NASDAQ',     p:'19,241.40', c:'−0.18%', up:false},
    {n:'GOLD MCX',   p:'₹95,340',  c:'+1.22%', up:true},
    {n:'SILVER',     p:'₹96,450',  c:'+0.93%', up:true},
    {n:'CRUDE WTI',  p:'$78.40',   c:'−0.64%', up:false},
    {n:'USD/INR',    p:'83.76',    c:'−0.09%', up:false},
    {n:'EUR/USD',    p:'1.0842',   c:'+0.22%', up:true},
    {n:'BITCOIN',    p:'$71,240',  c:'+3.40%', up:true},
  ];
  const tr = document.getElementById('ticker');
  if (tr) {
    const html = ticks.map(t=>`<div class="ticker-item"><span class="t-name">${t.n}</span><span class="t-price">${t.p}</span><span class="t-chg ${t.up?'up':'dn'}">${t.c}</span></div>`).join('');
    tr.innerHTML = html + html; 
  }
  
  /* ───── DATA FETCHING FRAMEWORK (REPLACE RANDOM DATA HERE) ───── */
  // Use this function when you are ready to connect to a real Broker API (Upstox/AngelOne/etc)
  async function fetchMarketData(symbol) {
      /*
      const response = await fetch(`https://api.yourbroker.com/v1/historical?symbol=${symbol}`, {
          headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
      });
      const data = await response.json();
      return data.prices; 
      */
      console.warn("API not connected for", symbol, "- Using static fallback data.");
  }
  
  /* ───── SPARKLINES ───── */
  function spark(id, data, color) {
    const c = document.getElementById(id);
    if(!c || typeof Chart === 'undefined') return;
    new Chart(c.getContext('2d'), {
      type:'line',
      data:{ labels:data.map((_,i)=>i), datasets:[{data, borderColor:color, borderWidth:1.5, fill:false, pointRadius:0, tension:0.4}] },
      options:{ responsive:true, maintainAspectRatio:false,
        plugins:{legend:{display:false},tooltip:{enabled:false}},
        scales:{x:{display:false},y:{display:false}} }
    });
  }
  const rnd = (s,t,n) => Array.from({length:18},(_,i)=>s+t*i+(Math.random()-.5)*n); // TEMPORARY FAKE DATA GENERATOR
  
  spark('sp1', rnd(24200, 26, 90),  '#059669'); // Darker Green for light mode
  spark('sp2', rnd(80200, 55, 250), '#059669');
  spark('sp3', rnd(5385, -2.2, 35), '#DC2626'); // Darker Red for light mode
  spark('sp4', rnd(93800, 86, 400), '#059669');
  spark('sp5', rnd(83.88, -.007, .12), '#DC2626');
  spark('sp6', rnd(79.0, -.035, .6),  '#DC2626');
  
  /* ───── MAIN CHARTS ───── */
  function mainChart(id, labels, data, color) {
    const el = document.getElementById(id);
    if(!el || typeof Chart === 'undefined') return;
    const ctx = el.getContext('2d');
    const g = ctx.createLinearGradient(0,0,0,82);
    g.addColorStop(0, color+'30'); g.addColorStop(1,'transparent');
    new Chart(ctx,{
        type:'line',
        data:{labels,datasets:[{data,borderColor:color,borderWidth:2,backgroundColor:g,fill:true,pointRadius:0,tension:.4}]},
      options:{responsive:true,maintainAspectRatio:false,
        plugins:{
            legend:{display:false},
            tooltip:{
                backgroundColor:'#FFFFFF', // Fixed for light mode readability
                borderColor:'#E2E8F0',
                borderWidth:1,
                titleColor:'#475569',
                bodyColor:'#0F172A'
            }
        },
        scales:{
            x:{display:true,grid:{display:false},ticks:{color:'#94A3B8',font:{size:9,family:'IBM Plex Mono'}}},
            y:{display:false,grid:{display:false}}
        }
    }});
  }
  const mo = ['Jan','Feb','Mar','Apr','May','Jun'];
  mainChart('ch1', mo, [22800,23300,23900,24100,24450,24683], '#059669');
  mainChart('ch2', mo, [5490,5410,5440,5470,5360,5348],       '#DC2626');
  mainChart('ch3', mo, [61000,65500,68200,70500,69000,71240],  '#059669');
  mainChart('ch4', mo, [6.93,6.89,6.86,6.88,6.81,6.84],       '#DC2626');
  
  /* ───── GLOSSARY DATA ───── */
  const glsData = [
    {t:'Bull Market',     d:'A market condition where prices rise 20%+ from recent lows. Characterised by investor optimism, strong GDP growth, and broad participation across sectors.'},
    {t:'Bear Market',     d:'A sustained 20%+ decline from recent highs, often coinciding with economic contraction, rising unemployment, and widespread pessimism.'},
    {t:'P/E Ratio',       d:'Price-to-Earnings: how much investors pay per rupee of earnings. High P/E implies growth expectations; low P/E may signal undervaluation or poor outlook.'},
    {t:'Repo Rate',       d:'Rate at which RBI lends short-term funds to commercial banks. The primary monetary policy lever — raising it cools credit and inflation; cutting it stimulates growth.'},
    {t:'Inflation',       d:'Sustained rise in the general price level, eroding purchasing power. India measures via CPI (retail) and WPI (wholesale). RBI targets 4% CPI ±2%.'},
    {t:'ETF',             d:'Exchange Traded Fund. Tracks an index, commodity, or basket of assets and trades on exchanges like a stock. Offers low-cost, liquid diversification.'},
    {t:'SIP',             d:'Systematic Investment Plan. Fixed periodic investment in mutual funds, leveraging rupee-cost averaging to reduce market-timing risk over time.'},
    {t:'FII / FPI',       d:'Foreign Institutional / Portfolio Investor. Overseas entities investing in Indian equities and debt. FII flows are a major driver of short-term market direction.'},
    {t:'Fiscal Deficit',  d:'Government expenditure minus revenue (excluding borrowings). Expressed as % of GDP. India\'s FY26 target is 4.5% — lower deficits signal fiscal discipline.'},
    {t:'CAD',             d:'Current Account Deficit. When imports exceed exports of goods, services, and income. India\'s persistent CAD (~1.5-2% of GDP) puts structural pressure on the rupee.'},
    {t:'Yield Curve',     d:'Graph of bond yields across maturities. Normal curves slope upward; an inverted curve (short > long rates) has historically predicted US recessions.'},
    {t:'CAGR',            d:'Compound Annual Growth Rate — the steady rate at which an investment grows annually. The standard metric for comparing returns across different time horizons.'},
    {t:'Liquidity',       d:'Ease of converting an asset to cash without significant price impact. Cash is perfectly liquid; real estate and art are illiquid. Liquidity matters in crises.'},
    {t:'DII',             d:'Domestic Institutional Investors — mutual funds, insurance companies, pension funds. DIIs often buy when FIIs sell, providing market stability and depth.'},
    {t:'Open Interest',   d:'Total outstanding F&O contracts not yet settled. Rising OI with rising prices = bullish confirmation; rising OI with falling prices = bearish pressure building.'},
    {t:'CRISIL Rating',   d:'Credit rating by India\'s leading rating agency. AAA is highest quality; D is default. Determines the interest rate a borrower must offer investors.'},
    {t:'NAV',             d:'Net Asset Value — the per-unit price of a mutual fund, calculated daily. NAV = (Total Assets − Liabilities) ÷ Units Outstanding.'},
    {t:'Alpha',           d:'Excess return of an investment relative to a benchmark index. Positive alpha = outperformance. A fund manager\'s alpha measures their actual skill.'},
    {t:'Beta',            d:'Measure of volatility relative to the market. Beta >1 = more volatile than index; Beta <1 = less volatile. High-beta stocks amplify both gains and losses.'},
    {t:'Hedge',           d:'Position taken to offset potential losses in another investment. Buying put options on Nifty hedges a long equity portfolio against a market fall.'},
  ];
  
  function buildAlpha(){
    const r=document.getElementById('alphaRow');
    if(!r) return;
    const ls=['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
    r.innerHTML=ls.map(l=>`<button class="a-btn${l==='All'?' on':''}" onclick="filterAlpha('${l}',this)">${l}</button>`).join('');
  }
  function renderGls(arr){
    const g=document.getElementById('glsGrid');
    if(!g) return;
    if(!arr.length){g.innerHTML='<div style="color:var(--text-muted);padding:30px;text-align:center;grid-column:span 2">No matching terms found.</div>';return;}
    g.innerHTML=arr.map(x=>`<div class="gls-item"><div class="gls-term">${x.t}</div><div class="gls-def">${x.d}</div></div>`).join('');
  }
  function filterGls(q){
    const lq=q.toLowerCase();
    document.querySelectorAll('.a-btn').forEach((b,i)=>{b.classList.toggle('on', i===0 && lq==='');});
    renderGls(glsData.filter(x=>x.t.toLowerCase().includes(lq)||x.d.toLowerCase().includes(lq)));
  }
  function filterAlpha(l,btn){
    document.querySelectorAll('.a-btn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    const inputEl = document.getElementById('glsInput');
    if(inputEl) inputEl.value='';
    const filtered = l==='All' ? glsData : glsData.filter(x=>x.t.toUpperCase().startsWith(l.toUpperCase()));
    renderGls(filtered);
  }
  buildAlpha(); renderGls(glsData);
  
  /* ───── MODAL CONTENT ───── */
  const modals={
    'inflation':{t:'📈 Inflation & CPI — Complete Guide',b:`
      <h4>What is Inflation?</h4>
      <p>Inflation is the sustained rise in the general price level. Each percentage point reduces the purchasing power of your money. ₹100 at 6% inflation is worth ₹94 in real terms after one year.</p>
      <h4>How India Measures It</h4>
      <p><strong>CPI (Consumer Price Index)</strong> tracks a basket of goods consumed by households — food has ~46% weight. RBI's 4% target (±2% band) is based on CPI. <strong>WPI (Wholesale Price Index)</strong> tracks producer-level prices and leads CPI by 1-2 months.</p>`},
    'interest-rates':{t:'🏛️ Interest Rates & Monetary Policy',b:`
      <h4>RBI's Toolkit</h4>
      <p><strong>Repo Rate (6.50%):</strong> Rate at which banks borrow from RBI overnight. The primary signalling tool.</p>
      <h4>Impact on Every Asset Class</h4>
      <p>Rising rates → bond prices fall, equity valuations compress (higher discount rate hurts growth stocks more than value), real estate demand cools, banks' NIM expands initially then compresses as deposit costs catch up.</p>`},
    'gdp-concept':{t:'🌐 GDP & Economic Growth',b:`
      <h4>What GDP Measures</h4>
      <p>Gross Domestic Product = total monetary value of all final goods and services produced within a country's borders in a period. It's the primary scorecard of economic health.</p>`},
    'fiscal':{t:'💰 Fiscal Policy & Union Budget',b:`
      <h4>Fiscal Policy vs Monetary Policy</h4>
      <p>Monetary policy = RBI controls money supply via interest rates. Fiscal policy = Finance Ministry controls government spending and taxation.</p>`},
    'forex':{t:'💱 Forex & Exchange Rates',b:`
      <h4>How USD/INR is Determined</h4>
      <p>India uses a "managed float" — the rupee floats based on market supply-demand, but RBI intervenes to prevent excessive volatility.</p>`},
    'bonds':{t:'📋 Bonds & Yield Curves',b:`
      <h4>Bond Mechanics</h4>
      <p>A bond = debt contract. Issuer borrows money, pays coupon (fixed interest) at intervals, returns principal at maturity.</p>`},
    'rbi':{t:'RBI Holds Repo Rate at 6.50% — June 2026',b:`
      <h4>Decision</h4>
      <p>The Monetary Policy Committee (MPC) voted unanimously to keep the benchmark repo rate unchanged at 6.50% in its June 2026 review.</p>`},
    'gdp':{t:'India Q4 FY26 GDP: 7.4% — Third Consecutive Beat',b:`
      <h4>The Number</h4>
      <p>India's GDP grew at 7.4% in Q4 FY26 (January–March 2026), beating the median analyst estimate of 7.0%.</p>`},
    'note1':{t:'📊 The 50-30-20 Rule for Indian Households',b:`
      <h4>The Framework</h4>
      <p>Allocate 50% of take-home income to needs (rent, groceries, EMIs, utilities), 30% to wants (dining, entertainment, travel), and 20% to savings and investments.</p>`},
    'note2':{t:'🏦 Equity vs Debt vs Gold: Asset Classes Explained',b:`
      <h4>Equity — You Own a Piece of the Business</h4>
      <p>Stocks and equity mutual funds = ownership stake. Returns are variable.</p>`},
    'note3':{t:'🌍 Macro for Investors: Global Forces & Indian Markets',b:`
      <h4>The US Fed — Why Every Indian Investor Must Watch It</h4>
      <p>When the Fed raises rates, US Treasuries (risk-free, higher yield) attract global capital. FIIs pull money from emerging markets — including India.</p>`},
  };
  
  function openModal(key){
    const m=modals[key];if(!m)return;
    document.getElementById('mTitle').textContent=m.t;
    document.getElementById('mBody').innerHTML=m.b;
    document.getElementById('modalBg').classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeModal(){
    document.getElementById('modalBg').classList.remove('open');
    document.body.style.overflow='';
  }
  function bgClose(e){if(e.target===document.getElementById('modalBg'))closeModal();}
  
  /* ───── TAB FILTER LOGIC (FIXED) ───── */
  function tabNews(cat, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
  
    const newsItems = document.querySelectorAll('.news-hero, .n-item');
    
    newsItems.forEach(item => {
      if (cat === 'all') {
        item.style.display = 'block';
        return;
      }
      
      const hasTag = item.querySelector(`.cat-${cat}`);
      if (hasTag) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  /* ───── NAV ACTIVE STATE ───── */
  const secs=document.querySelectorAll('section[id]');
  window.addEventListener('scroll',()=>{
    let cur='';
    secs.forEach(s=>{if(window.scrollY>=s.offsetTop-90)cur=s.id;});
    document.querySelectorAll('nav a').forEach(a=>{
      a.classList.toggle('active',a.getAttribute('href')==='#'+cur);
    });
  });
  
  /* ───── COSMETIC PRICE FLICKER ───── */
  setInterval(()=>{
    document.querySelectorAll('.mkt-val').forEach(el=>{
      el.style.transition='color .3s';
      el.style.color=Math.random()>.5?'var(--green)':'var(--red)';
      setTimeout(()=>el.style.color='',600);
    });
  },4000);
