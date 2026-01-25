let allCars = [];
let selectedCars = [];

// placeholder SVG used when car images are missing (keeps layout consistent)
const PLACEHOLDER_IMG = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='360'><rect fill='%23f0f0f0' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Poppins, Arial' font-size='28'>No image</text></svg>";

// API base — injected at build or runtime via js/config.js; fallback to localhost for dev
const API_BASE = (window.__APP_ENV && window.__APP_ENV.API_BASE) ? String(window.__APP_ENV.API_BASE).replace(/\/+$/,'') : (location.hostname === 'localhost' ? 'http://localhost:5000' : '');

// returns an array of images for a car, ensuring at least one placeholder exists and up to 'count' return length
function getImages(car, count = 3){
  const imgs = (car && Array.isArray(car.images) && car.images.length) ? car.images.slice() : (car && car.image ? [car.image] : []);
  while(imgs.length < count) imgs.push(PLACEHOLDER_IMG);
  return imgs;
} 

/* =========================
   FETCH DATA
========================= */
async function fetchCars() {
  const res = await fetch("data/cars.json");
  return await res.json();
}

// small utility
function debounce(fn, wait=200){let t;return (...args)=>{clearTimeout(t);t=setTimeout(()=>fn(...args),wait);};}

// ensure images fallback to placeholder when they fail to load (prevents broken icons and layout shifts)
function protectImages(root = document){
  if (!root) root = document;
  const imgs = (root.querySelectorAll) ? root.querySelectorAll('img') : [];
  imgs.forEach(img => {
    if (img.dataset.__protected) return;
    img.dataset.__protected = '1';
    img.addEventListener('error', () => {
      if (img.src !== PLACEHOLDER_IMG) img.src = PLACEHOLDER_IMG;
      img.classList.add('placeholder');
    });
  });
} 


/* =========================
   FEATURED CARS (HOME)
========================= */
async function loadFeaturedCars() {
  const container = document.getElementById("featuredCars");
  if (!container) return;

  try {
    const cars = await fetchCars();
    const featured = cars.slice(0, 3);

    container.innerHTML = featured.map(car => `
      <div class="card">
        <div class="card-media">
          <img class="card-main-img" src="${getImages(car)[0]}" alt="${car.make} ${car.model}" loading="lazy">
          <div class="card-overlay">
            <button class="btn small quickView" data-id="${car.id}">Quick View</button>
            <a href="car.html?id=${car.id}" class="btn small">Details</a>
          </div>
          ${car.isNew ? '<span class="badge">New</span>' : ''}
          <span class="price-tag">₹ ${car.price.toLocaleString()}</span>
        </div>
        <div class="card-body">
          <h3>${car.make} ${car.model}</h3>
          <p class="muted">${car.year}</p>
          <div class="card-thumbs">
            ${getImages(car,3).slice(0,3).map(img => `<img src="${img}" class="thumb" loading="lazy">`).join('')}
          </div>
        </div>
      </div>
    `).join("");
    protectImages(container);    initCardThumbnails();
  } catch (err) {
    container.innerHTML = "<p>Failed to load cars.</p>";
  }
}

/* =========================
   RENDER CARS
========================= */
function renderCars(cars) {
  const grid = document.getElementById("carGrid");
  if (!grid) return;

  if (cars === null) {
    grid.innerHTML = `<div class="loading">Loading cars...</div>`;
    return;
  }

  if (!cars || cars.length === 0) {
    grid.innerHTML = "<p>No cars found.</p>";
    return;
  }

  grid.innerHTML = cars.map(car => `
    <div class="card">
      <div class="card-media">
        <img class="card-main-img" src="${getImages(car)[0]}" alt="${car.make} ${car.model}" loading="lazy">
        <div class="card-overlay">
          <button class="btn small quickView" data-id="${car.id}">Quick View</button>
          <a href="car.html?id=${car.id}" class="btn small">Details</a>
        </div>
        ${car.isNew ? '<span class="badge">New</span>' : ''}
        <span class="price-tag">₹ ${car.price.toLocaleString()}</span>
      </div>
      <div class="card-body">
        <h3>${car.make} ${car.model}</h3>
        <p class="muted">${car.year} • ${car.fuel || ''}</p>
        <div class="card-thumbs">
          ${getImages(car,3).slice(0,3).map(img => `<img src="${img}" class="thumb" loading="lazy">`).join('')}
        </div>
        <div class="card-footer">
          <label class="compare-label">
            <input type="checkbox" class="compareCheck" value="${car.id}">
            Compare
          </label>
          <button class="btn outline small contactDealer" data-id="${car.id}">Contact</button>
        </div>
      </div>
    </div>
  `).join("");

  // initialize thumbnail click behavior
  protectImages(grid);
  initCardThumbnails();
  initCompare();
}


// thumbnail gallery behavior: clicking a thumb updates main image on its card
function initCardThumbnails(){
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const mainImg = card.querySelector('.card-main-img');
    const thumbs = card.querySelectorAll('.card-thumbs .thumb');
    if(!thumbs || thumbs.length === 0) return;

    thumbs.forEach(t => {
      // mark first thumb as active if matches main
      if(t.src === mainImg.src) t.classList.add('active');
      t.addEventListener('click', () => {
        thumbs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        mainImg.src = t.src;
      });
    });

    // if none matched, ensure there is an active thumb for visual cue
    if(!card.querySelector('.card-thumbs .thumb.active') && thumbs[0]){
      thumbs[0].classList.add('active');
    }
  });
}

// append initUI to startup
// (the rest of file remains same, startup area will call initUI) 

/* =========================
   LISTINGS + SEARCH + FILTER
========================= */
async function loadAllCars() {
  const grid = document.getElementById("carGrid");
  if (!grid) return;

  renderCars(null);

  allCars = await fetchCars();
  renderCars(allCars);

  const searchInput = document.getElementById("searchInput");
  const yearFilter = document.getElementById("yearFilter");
  const priceFilter = document.getElementById("priceFilter");

  function applyFilters() {
    const term = searchInput ? searchInput.value.toLowerCase() : "";
    const year = yearFilter ? yearFilter.value : "";
    const price = priceFilter ? priceFilter.value : "";

    const filtered = allCars.filter(car => {
      const matchesText =
        car.make.toLowerCase().includes(term) ||
        car.model.toLowerCase().includes(term);

      const matchesYear = year ? car.year >= parseInt(year) : true;
      const matchesPrice = price ? car.price <= parseInt(price) : true;

      return matchesText && matchesYear && matchesPrice;
    });

    renderCars(filtered);
  }

  if (searchInput) {
    const onInput = debounce(applyFilters, 220);
    searchInput.addEventListener("input", onInput);
  }
  if (yearFilter) yearFilter.addEventListener("change", applyFilters);
  if (priceFilter) priceFilter.addEventListener("change", applyFilters);
}

/* =========================
   CAR DETAILS PAGE
========================= */
async function loadCarDetails() {
  const container = document.getElementById("carDetails");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    container.innerHTML = "<p>Car not found.</p>";
    return;
  }

  try {
    const cars = await fetchCars();
    const car = cars.find(c => c.id == id);

    if (!car) {
      container.innerHTML = "<p>Car not found.</p>";
      return;
    }

    const imgs = getImages(car,5);
    const thumbs = imgs.map((img, i) =>
      `<img src="${img}" class="${i === 0 ? "active" : ""}" data-src="${img}">`
    ).join("");

    container.innerHTML = `
      <div class="car-details">
        <div>
          <img id="mainCarImage" src="${imgs[0]}" class="main-image">
          <div class="thumb-row">${thumbs}</div>
        </div>

        <div class="card-body">
          <h2>${car.make} ${car.model}</h2>
          <p><strong>Year:</strong> ${car.year}</p>
          <p><strong>Price:</strong> ₹ ${car.price.toLocaleString()}</p>
          <p>
            This ${car.make} ${car.model} is in excellent condition,
            well maintained and ready for purchase.
          </p>
          <a href="contact.html" class="btn">Contact Dealer</a>
        </div>
      </div>
    `;

    protectImages(container);
    const mainImg = document.getElementById("mainCarImage");
    const thumbnails = container.querySelectorAll(".thumb-row img");

    thumbnails.forEach(img => {
      img.addEventListener("click", () => {
        thumbnails.forEach(t => t.classList.remove("active"));
        img.classList.add("active");
        mainImg.src = img.dataset.src;
      });
    });

  } catch (err) {
    container.innerHTML = "<p>Error loading car details.</p>";
  }
}

/* =========================
   CONTACT FORM
========================= */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const btn = form.querySelector("button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    if (!name || !email || !message) {
      status.textContent = "All fields are required.";
      status.className = "error-text";
      return;
    }

    btn.disabled = true;
    status.textContent = "Sending...";
    status.className = "loading";

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const result = await res.json();

      if (result.success) {
        status.textContent = "Message sent successfully!";
        status.className = "success-text";
        form.reset();
      } else {
        status.textContent = "Failed to send message.";
        status.className = "error-text";
      }
    } catch {
      status.textContent = "Server not reachable.";
      status.className = "error-text";
    }

    btn.disabled = false;
  });
}

// Internship application handler
function initInternshipForm(){
  const form = document.getElementById('internshipForm');
  if(!form) return;
  const status = document.getElementById('internshipStatus');
  const btn = form.querySelector('button');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const name = (fd.get('name')||'').trim();
    const email = (fd.get('email')||'').trim();
    const github = (fd.get('github')||'').trim();
    const demo = (fd.get('demo')||'').trim();
    const message = (fd.get('message')||'').trim();

    if(!name || !email || !github || !message){
      status.textContent = 'Please fill name, email, github and a short message.';
      status.className = 'error-text';
      return;
    }

    btn.disabled = true; status.textContent = 'Submitting...'; status.className = 'loading';

    try{
      const res = await fetch(`${API_BASE}/contact`,{
        method:'POST',headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, message: `Internship application\nGitHub: ${github}\nDemo: ${demo}\n\n${message}` })
      });
      const j = await res.json();
      if(j.success){ status.textContent = 'Application submitted — thank you!'; status.className='success-text'; form.reset(); }
      else { status.textContent = 'Submission failed.'; status.className='error-text'; }
    }catch(err){ status.textContent = 'Server not reachable.'; status.className='error-text'; }

    btn.disabled = false;
  });
}

// small FAQ toggles
function initFAQ(){
  document.addEventListener('click',(e)=>{
    const btn = e.target.closest('.faq-q');
    if(!btn) return;
    const item = btn.closest('.faq-item');
    if(!item) return;
    const a = item.querySelector('.faq-a');
    if(!a) return;
    const open = a.style.display === 'block';
    document.querySelectorAll('.faq-a').forEach(x=>x.style.display='none');
    a.style.display = open ? 'none' : 'block';
  });
}

/* FOOTER NEWSLETTER */
function initFooterNewsletter(){
  const form = document.getElementById('footerNewsletter');
  if(!form) return;
  const status = document.getElementById('newsletterStatus');
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = (form.querySelector('input[name="newsletterEmail"]').value||'').trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      status.textContent = 'Please enter a valid email address.';
      status.className = 'error-text';
      return;
    }
    const btn = form.querySelector('button');
    btn.disabled = true;
    status.textContent = 'Subscribing...'; status.className = 'loading';
    // simulate network request
    setTimeout(()=>{
      status.textContent = 'Subscribed! Thanks — we will send updates to your inbox.';
      status.className = 'success-text';
      form.reset();
      btn.disabled = false;
    },800);
  });
} 

/* =========================
   COMPARE FEATURE
========================= */
function initCompare() {
  const checks = document.querySelectorAll(".compareCheck");
  const countText = document.getElementById("compareCount");
  const btn = document.getElementById("compareBtn");

  if (!countText || !btn) return;

  selectedCars = [];
  countText.textContent = "0 selected";
  btn.disabled = true;

  checks.forEach(chk => {
    chk.addEventListener("change", () => {
      const id = chk.value;

      if (chk.checked) {
        if (selectedCars.length >= 2) {
          chk.checked = false;
          return alert("You can compare only 2 cars.");
        }
        selectedCars.push(id);
      } else {
        selectedCars = selectedCars.filter(x => x !== id);
      }

      countText.textContent = `${selectedCars.length} selected`;
      btn.disabled = selectedCars.length !== 2;
    });
  });

  btn.onclick = () => {
    window.location.href = `compare.html?ids=${selectedCars.join(",")}`;
  };
}

/* =========================
   COMPARISON PAGE
========================= */
async function loadComparison() {
  const box = document.getElementById("compareTable");
  if (!box) return;

  const params = new URLSearchParams(window.location.search);
  const ids = params.get("ids");
  if (!ids) return;

  const cars = await fetchCars();
  const selected = cars.filter(c => ids.split(",").includes(String(c.id)));

  box.innerHTML = selected.map(car => `
    <div class="card">
      <img src="${getImages(car)[0]}" alt="${car.make}">
      <div class="card-body">
        <h3>${car.make} ${car.model}</h3>
        <p><strong>Year:</strong> ${car.year}</p>
        <p><strong>Price:</strong> ₹ ${car.price.toLocaleString()}</p>
      </div>
    </div>
  `).join("");
  protectImages(box);
}

/* =========================
   INIT
========================= */
function initUI() {
  // mobile nav toggle
  document.querySelectorAll('.nav-toggle').forEach(bt => bt.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav-links');
    nav && nav.classList.toggle('open');
    bt.classList.toggle('open');
  }));

  // sticky navbar
  const navBar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => navBar && navBar.classList.toggle('scrolled', window.scrollY > 20));

  // modal helpers
  const modal = document.getElementById('modal');
  function closeModal(){ if (!modal) return; modal.classList.remove('active'); modal.setAttribute('aria-hidden','true'); }
  function openModal(html){ if (!modal) return; const body = document.getElementById('modalBody'); body.innerHTML = html; protectImages(body); modal.classList.add('active'); modal.setAttribute('aria-hidden','false'); }

  modal && modal.querySelector('.modal-close') && modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal && modal.addEventListener('click', (e)=> { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=> { if (e.key === 'Escape') closeModal(); });

  // quick view & contact actions (delegation)
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('.quickView')) {
      const id = target.dataset.id; openQuickView(id);
    }
    if (target.matches('.contactDealer')) {
      const carId = target.dataset.id; window.location.href = `contact.html?car=${carId}`;
    }
  });

  // compare drawer
  const compareGo = document.getElementById('compareGo');
  const compareClose = document.getElementById('compareClose');
  const compareDrawer = document.getElementById('compareDrawer');
  const compareList = document.getElementById('compareList');

  compareClose && compareClose.addEventListener('click', () => compareDrawer && compareDrawer.classList.remove('open'));
  compareGo && compareGo.addEventListener('click', () => { if (selectedCars.length === 2) window.location.href = `compare.html?ids=${selectedCars.join(',')}`; });

  function updateCompareDrawer() {
    if (!compareList) return;
    compareList.innerHTML = selectedCars.map(id => {
      const car = allCars.find(c => String(c.id) === String(id));
      return `<div class="compare-item">${car ? `${car.make} ${car.model} — ₹ ${car.price.toLocaleString()}` : id}</div>`;
    }).join('');

    if (compareDrawer) compareDrawer.classList.toggle('open', selectedCars.length > 0);
    if (compareGo) compareGo.disabled = selectedCars.length !== 2;
  }

  // listen for compare checkbox changes
  document.addEventListener('change', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('compareCheck')) {
      // selectedCars updated by initCompare; just update drawer
      updateCompareDrawer();
    }
  });

  // quick view function
  window.openQuickView = async function(id){
    const cars = allCars.length ? allCars : await fetchCars();
    const car = cars.find(c => String(c.id) === String(id));
    if (!car) return openModal('<p>Car not found</p>');

    const imgs = getImages(car,5);
    const thumbs = imgs.map((img,i)=>`<img src="${img}" class="thumb" style="width:64px;height:48px;object-fit:cover;border-radius:6px;margin-right:6px">`).join('');
    const html = `
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <div style="flex:1 1 320px"><img src="${imgs[0]}" style="width:100%;border-radius:8px;object-fit:cover;max-height:300px" /><div style="margin-top:8px;display:flex">${thumbs}</div></div>
        <div style="flex:1 1 260px"><h3 style="margin-top:0">${car.make} ${car.model}</h3><p style="color:var(--muted)">Year: ${car.year} • ${car.fuel || ''}</p><p style="font-weight:700;margin-top:10px">₹ ${car.price.toLocaleString()}</p><p style="margin-top:12px;color:var(--muted)">This ${car.make} ${car.model} is in great condition. Contact for test drive.</p><div style="margin-top:14px;display:flex;gap:8px"><a class="btn" href="car.html?id=${car.id}">View Details</a><a class="btn outline" href="contact.html?car=${car.id}">Contact Dealer</a></div></div>
      </div>
    `;

    openModal(html);
  };
}

// Load shared nav first, then initialize UI and all features
async function loadNav(){
  try{
    const res = await fetch('partials/nav.html');
    if(!res.ok) throw new Error('Failed to fetch nav');
    const html = await res.text();
    const target = document.getElementById('siteNav');
    if(target) target.innerHTML = html;
    // protect logo image
    protectImages(document.getElementById('siteNav'));
    // set active link based on current file
    const current = (location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if(!href) return;
      if(href === current || (href === 'index.html' && (current === '' || current === 'index.html')) || current.endsWith(href)){
        a.classList.add('active');
      }
    });
  } catch (err){
    console.warn('Failed to load nav:', err);
  }
}

loadNav().then(()=>{
  initUI();
  loadFeaturedCars();
  // start carousels after a short delay to allow DOM content
  setTimeout(initFeaturedCarousel, 900);
  initTestimonialsCarousel();
  loadAllCars();
  loadCarDetails();
  loadComparison();
  initContactForm();
  initInternshipForm();
  initFAQ();
  initFooterNewsletter();
}).catch((err)=>{
  console.error('Nav load failed', err);
  // fallback initialization
  initUI();
  loadFeaturedCars();
  // start carousels after a short delay to allow DOM content
  setTimeout(initFeaturedCarousel, 900);
  initTestimonialsCarousel();
  loadAllCars();
  loadCarDetails();
  loadComparison();
  initContactForm();
  initInternshipForm();
  initFAQ();
  initFooterNewsletter();
});

// Featured carousel: gently rotate first card to end
function initFeaturedCarousel(){
  const container = document.getElementById('featuredCars');
  if(!container) return;
  if(container._carouselStarted) return; container._carouselStarted = true;

  setInterval(()=>{
    if(container.children.length <= 1) return;
    const first = container.children[0];
    first.classList.add('fade-out');
    setTimeout(()=>{
      try{ container.appendChild(first); }catch(e){}
      first.classList.remove('fade-out');
    },400);
  }, 4200);
}

// Testimonials carousel simple rotate
function initTestimonialsCarousel(){
  const box = document.getElementById('testimonials');
  if(!box) return;
  const items = box.querySelectorAll('.testimonial');
  if(items.length <= 1) return;
  let idx = 0;
  items.forEach((it,i)=> it.style.display = i===0 ? 'block' : 'none');
  setInterval(()=>{
    items[idx].style.display = 'none';
    idx = (idx + 1) % items.length;
    items[idx].style.display = 'block';
  }, 3800);
}
