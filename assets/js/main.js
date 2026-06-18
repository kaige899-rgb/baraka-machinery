/* ============================================
   Baraka Machinery — Main JavaScript
   ============================================ */

// --- Machine Data ---
let machines = [];


let brands = [];
let yearRange = { min: 2000, max: 2025 };

function formatPrice(price) {
  return '$' + price.toLocaleString('en-US');
}

// --- Navigation ---
function initNav() {
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// --- Scroll Animations ---
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });
}

// --- Home: Render Featured Machines ---

// Helper: get image(s) for a machine
function getImages(machine) {
  return machine.images || (machine.image ? [machine.image] : []);
}
function getImage(machine) {
  const imgs = getImages(machine);
  return imgs.length > 0 ? imgs[0] : "";
}

function renderFeatured() {
  const grid = document.querySelector('.featured-machines .machines-grid');
  if (!grid) return;

  const featured = machines.filter(m => m.featured).slice(0, 6);
  grid.innerHTML = featured.map(m => `
    <div class="machine-card" data-id="${m.id}" onclick="openModal(${m.id})">
      <img class="machine-card-image" src="${getImage(m)}" alt="${m.brand} ${m.model}" loading="lazy">
      <div class="machine-card-body">
        <div class="machine-card-brand">${m.brand}</div>
        <div class="machine-card-title">${m.model}</div>
        <div class="machine-card-specs">
          <div class="machine-card-spec">
            <div class="machine-card-spec-value">${m.year}</div>
            <div class="machine-card-spec-label">Year</div>
          </div>
          <div class="machine-card-spec">
            <div class="machine-card-spec-value">${m.hours.toLocaleString()}</div>
            <div class="machine-card-spec-label">Hours</div>
          </div>
          <div class="machine-card-spec">
            <div class="machine-card-spec-value">${m.location.split(',')[0]}</div>
            <div class="machine-card-spec-label">Location</div>
          </div>
        </div>
        <div class="machine-card-price">
          <span class="machine-card-price-value">${formatPrice(m.price)}</span>
        </div>
      </div>
      <div class="machine-card-footer">
        <button class="btn btn-gold-outline btn-sm" onclick="event.stopPropagation(); openModal(${m.id})">View Details</button>
      </div>
    </div>
  `).join('');
}

// --- Inventory Page ---
function initInventory() {
  const grid = document.getElementById('inventory-grid');
  const count = document.getElementById('inventory-count');
  const filterBrands = document.getElementById('filter-brands');
  const filterYearMin = document.getElementById('filter-year-min');
  const filterYearMax = document.getElementById('filter-year-max');
  const filterSearch = document.getElementById('filter-search');
  const sortSelect = document.getElementById('sort-select');
  const resetBtn = document.getElementById('filter-reset');
  const mobileFilterBtn = document.getElementById('filter-toggle-mobile');
  const filterSidebar = document.querySelector('.filter-sidebar');

  if (!grid) return;

  if (filterBrands) {
    filterBrands.innerHTML = brands.map(b => `
      <label class="filter-checkbox">
        <input type="checkbox" value="${b}" checked> ${b}
      </label>
    `).join('');
  }

  if (filterYearMin) { filterYearMin.value = yearRange.min; filterYearMin.min = yearRange.min; filterYearMin.max = yearRange.max; }
  if (filterYearMax) { filterYearMax.value = yearRange.max; filterYearMax.min = yearRange.min; filterYearMax.max = yearRange.max; }

  function getFilteredMachines() {
    let filtered = [...machines];

    if (filterBrands) {
      const checked = [...filterBrands.querySelectorAll('input:checked')].map(c => c.value);
      if (checked.length > 0) {
        filtered = filtered.filter(m => checked.includes(m.brand));
      }
    }

    if (filterYearMin) {
      const min = parseInt(filterYearMin.value) || yearRange.min;
      filtered = filtered.filter(m => m.year >= min);
    }
    if (filterYearMax) {
      const max = parseInt(filterYearMax.value) || yearRange.max;
      filtered = filtered.filter(m => m.year <= max);
    }

    if (filterSearch) {
      const q = filterSearch.value.toLowerCase().trim();
      if (q) {
        filtered = filtered.filter(m =>
          m.brand.toLowerCase().includes(q) ||
          m.model.toLowerCase().includes(q) ||
          m.location.toLowerCase().includes(q)
        );
      }
    }

    if (sortSelect) {
      const sortBy = sortSelect.value;
      switch (sortBy) {
        case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
        case 'year-desc': filtered.sort((a, b) => b.year - a.year); break;
        case 'year-asc': filtered.sort((a, b) => a.year - b.year); break;
        case 'hours-asc': filtered.sort((a, b) => a.hours - b.hours); break;
        case 'hours-desc': filtered.sort((a, b) => b.hours - a.hours); break;
        default: break;
      }
    }

    return filtered;
  }

  function renderGrid() {
    const filtered = getFilteredMachines();

    if (count) {
      count.innerHTML = `Showing <strong>${filtered.length}</strong> of <strong>${machines.length}</strong> machines`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="inventory-empty">
          <h3>No machines found</h3>
          <p>Try adjusting your filters to see more results.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(m => `
      <div class="machine-card" data-id="${m.id}" onclick="openModal(${m.id})">
        <img class="machine-card-image" src="${getImage(m)}" alt="${m.brand} ${m.model}" loading="lazy">
        <div class="machine-card-body">
          <div class="machine-card-brand">${m.brand}</div>
          <div class="machine-card-title">${m.model}</div>
          <div class="machine-card-specs">
            <div class="machine-card-spec">
              <div class="machine-card-spec-value">${m.year}</div>
              <div class="machine-card-spec-label">Year</div>
            </div>
            <div class="machine-card-spec">
              <div class="machine-card-spec-value">${m.hours.toLocaleString()}</div>
              <div class="machine-card-spec-label">Hours</div>
            </div>
            <div class="machine-card-spec">
              <div class="machine-card-spec-value">${m.location.split(',')[0]}</div>
              <div class="machine-card-spec-label">Location</div>
            </div>
          </div>
          <div class="machine-card-price">
            <span class="machine-card-price-value">${formatPrice(m.price)}</span>
          </div>
        </div>
        <div class="machine-card-footer">
          <button class="btn btn-gold-outline btn-sm" onclick="event.stopPropagation(); openModal(${m.id})">View Details</button>
        </div>
      </div>
    `).join('');
  }

  if (filterBrands) { filterBrands.addEventListener('change', renderGrid); }
  if (filterYearMin) { filterYearMin.addEventListener('input', renderGrid); }
  if (filterYearMax) { filterYearMax.addEventListener('input', renderGrid); }
  if (filterSearch) { filterSearch.addEventListener('input', renderGrid); }
  if (sortSelect) { sortSelect.addEventListener('change', renderGrid); }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (filterBrands) { filterBrands.querySelectorAll('input').forEach(c => c.checked = true); }
      if (filterYearMin) filterYearMin.value = yearRange.min;
      if (filterYearMax) filterYearMax.value = yearRange.max;
      if (filterSearch) filterSearch.value = '';
      if (sortSelect) sortSelect.value = 'default';
      renderGrid();
    });
  }

  if (mobileFilterBtn && filterSidebar) {
    mobileFilterBtn.addEventListener('click', () => {
      filterSidebar.classList.toggle('open');
    });
  }

  renderGrid();
}

// --- Modal ---
function openModal(id) {
  const machine = machines.find(m => m.id === id);
  if (!machine) return;

  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  window._currentMachineId = id;
  window._currentSlide = 0;

  overlay.innerHTML = `
    <div class="modal">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <div class="modal-image-carousel">
        <div class="carousel-container" id="carousel-container"></div>
        <button class="carousel-btn carousel-prev" onclick="changeSlide(-1)">&lsaquo;</button>
        <button class="carousel-btn carousel-next" onclick="changeSlide(1)">&rsaquo;</button>
        <div class="carousel-dots" id="carousel-dots"></div>
        <div class="carousel-counter" id="carousel-counter"></div>
      </div>
      <div class="modal-body">
        <div class="modal-brand">${machine.brand}</div>
        <h2 class="modal-title">${machine.model}</h2>
        <div class="modal-price">${formatPrice(machine.price)}</div>
        <div class="modal-specs">
          <div class="modal-spec-item">
            <span class="modal-spec-label">Year</span>
            <span class="modal-spec-value">${machine.year}</span>
          </div>
          <div class="modal-spec-item">
            <span class="modal-spec-label">Hours</span>
            <span class="modal-spec-value">${machine.hours.toLocaleString()}</span>
          </div>
          <div class="modal-spec-item">
            <span class="modal-spec-label">Location</span>
            <span class="modal-spec-value">${machine.location}</span>
          </div>
          <div class="modal-spec-item">
            <span class="modal-spec-label">Condition</span>
            <span class="modal-spec-value">Excellent</span>
          </div>
        </div>
        <p class="modal-description">${machine.description}</p>
        <div class="modal-actions">
          <a href="https://wa.me/8618028050818?text=Hello%20Baraka%20Machinery%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(machine.brand + ' ' + machine.model)}" target="_blank" class="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Inquiry
          </a>
          <button class="btn btn-outline-dark" onclick="closeModal()">Close</button>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', escHandler);
  initCarousel(id);
}

function initCarousel(id) {
  const machine = machines.find(m => m.id === id);
  if (!machine) return;
  const images = getImages(machine);
  if (images.length <= 1) {
    document.querySelector('.carousel-prev').style.display = 'none';
    document.querySelector('.carousel-next').style.display = 'none';
    document.getElementById('carousel-dots').style.display = 'none';
    document.getElementById('carousel-counter').style.display = 'none';
  }
  const container = document.getElementById('carousel-container');
  const dots = document.getElementById('carousel-dots');
  const counter = document.getElementById('carousel-counter');

  container.innerHTML = images.map((img, i) =>
    '<div class="carousel-slide" data-index="' + i + '" style="display:' + (i === 0 ? 'block' : 'none') + '">' +
      '<img src="' + img + '" alt="' + machine.brand + ' ' + machine.model + '" class="carousel-image">' +
    '</div>'
  ).join('');

  if (images.length > 1) {
    dots.innerHTML = images.map((_, i) =>
      '<span class="carousel-dot' + (i === 0 ? ' active' : '') + '" onclick="goToSlide(' + i + ')"></span>'
    ).join('');
    counter.textContent = '1 / ' + images.length;
  } else {
    dots.style.display = 'none';
    counter.style.display = 'none';
  }
}

function changeSlide(delta) {
  const machine = machines.find(m => m.id === window._currentMachineId);
  if (!machine) return;
  const images = getImages(machine);
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;

  slides[window._currentSlide].style.display = 'none';
  if (dots.length) dots[window._currentSlide].classList.remove('active');

  window._currentSlide = (window._currentSlide + delta + images.length) % images.length;

  slides[window._currentSlide].style.display = 'block';
  if (dots.length) dots[window._currentSlide].classList.add('active');
  document.getElementById('carousel-counter').textContent = (window._currentSlide + 1) + ' / ' + images.length;
}

function goToSlide(index) {
  const machine = machines.find(m => m.id === window._currentMachineId);
  if (!machine) return;
  const images = getImages(machine);
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;

  slides[window._currentSlide].style.display = 'none';
  if (dots.length) dots[window._currentSlide].classList.remove('active');

  window._currentSlide = index;

  slides[window._currentSlide].style.display = 'block';
  if (dots.length) dots[window._currentSlide].classList.add('active');
  document.getElementById('carousel-counter').textContent = (window._currentSlide + 1) + ' / ' + images.length;
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) { overlay.classList.remove('active'); }
  document.body.style.overflow = '';
  document.removeEventListener('keydown', escHandler);
}

function escHandler(e) {
  if (e.key === 'Escape') closeModal();
}

// --- Form Handling ---
function initForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  // Check if redirected from Formspree with success
  if (window.location.search.includes('sent=true')) {
    form.style.display = 'none';
    if (success) success.classList.add('active');
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const btn = form.querySelector('.form-submit');
    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    // Submit via AJAX, fallback to direct submit
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(r => r.json())
    .then(d => {
      if (d.ok) {
        form.style.display = 'none';
        if (success) success.classList.add('active');
      } else {
        form.submit();
      }
    })
    .catch(() => {
      form.submit();
    })
    .finally(() => {
      btn.innerHTML = 'Send Inquiry';
      btn.disabled = false;
    });
  });
}


// --- Stats Counter Animation ---
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current.toLocaleString() + suffix;
        }, 40);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAnimations();
  // Load data from JSON, then render
fetch('data/machines.json')
  .then(r => r.json())
  .then(data => {
    machines = data;
    brands = [...new Set(data.map(m => m.brand))].sort();
    yearRange = { min: Math.min(...data.map(m => m.year)), max: Math.max(...data.map(m => m.year)) };
    renderFeatured();
    initInventory();
    initForm();
  })
  .catch(err => {
    console.error('Failed to load machines data:', err);
    // Fallback: render with empty data if JSON fails
    renderFeatured();
    initInventory();
    initForm();
  });
  initCounters();
});
