/* ============================================
   Baraka Machinery — Main JavaScript
   ============================================ */

// --- Machine Data ---
const machines = [
  { id: 1, brand: 'Caterpillar', model: '320D', year: 2015, hours: 8500, price: 38000, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', featured: true, description: 'Well-maintained CAT 320D excavator with regular service history. Equipped with hydraulic quick coupler, auxiliary plumbing, and air conditioning. Machine is in good working condition and ready for international shipment.' },
  { id: 2, brand: 'Komatsu', model: 'PC200-8', year: 2014, hours: 9200, price: 32500, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80', featured: true, description: 'Reliable Komatsu PC200-8 with low engine hours for its year. Fully serviced with new filters and oils. Comes with standard arm and bucket, A/C, and ROPS cab.' },
  { id: 3, brand: 'Hitachi', model: 'ZX210LC-5G', year: 2016, hours: 7800, price: 42000, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1598032892097-5e7b3af04ace?w=600&q=80', featured: true, description: 'Excellent condition Hitachi ZX210LC-5G. Long carriage model with great stability. Low hours, well-maintained by original owner. Includes quick coupler and spare bucket.' },
  { id: 4, brand: 'Kobelco', model: 'SK200-8', year: 2015, hours: 8100, price: 35000, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1578996952311-4b0a2486c9a6?w=600&q=80', featured: true, description: 'Well-maintained Kobelco SK200-8 with strong hydraulic performance. Comes with boom float, auxiliary lines, and air suspension seat. Ready for inspection.' },
  { id: 5, brand: 'Doosan', model: 'DX225LCA', year: 2017, hours: 6500, price: 45000, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1614314106912-5a7c7b1b5a2f?w=600&q=80', featured: true, description: 'Low-hour Doosan DX225LCA. Fuel-efficient with superior digging force. Features include rear camera, premium cab, and hydraulic quick coupler. Excellent investment.' },
  { id: 6, brand: 'Volvo', model: 'EC210D', year: 2016, hours: 7200, price: 40000, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1541888941-0a7b8bb78bb0?w=600&q=80', featured: false, description: 'Volvo EC210D with low hours. Known for fuel efficiency and operator comfort. Serviced regularly with genuine Volvo parts. Includes quick coupler and extra bucket.' },
  { id: 7, brand: 'Hyundai', model: 'R220LC-9S', year: 2018, hours: 5800, price: 48000, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80', featured: false, description: 'Late-model Hyundai R220LC-9S with very low hours. Excellent condition with full service records. Equipped with hydraulic coupler, A/C, and sound-reduced cab.' },
  { id: 8, brand: 'Caterpillar', model: '330D', year: 2014, hours: 10200, price: 55000, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80', featured: false, description: 'Large CAT 330D excavator ideal for heavy earthmoving. Strong undercarriage and engine. Well-maintained with documented service history. Available for worldwide delivery.' },
  { id: 9, brand: 'Komatsu', model: 'PC300-8', year: 2015, hours: 8900, price: 52000, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1598032892097-5e7b3af04ace?w=600&q=80', featured: false, description: 'Komatsu PC300-8 in good working order. Powerful machine suitable for mining and large construction projects. Regularly serviced, ready to work.' },
  { id: 10, brand: 'Hitachi', model: 'ZX350LC-5G', year: 2017, hours: 6100, price: 62000, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1533055640607-b9e5e3b75f23?w=600&q=80', featured: false, description: 'Premium Hitachi ZX350LC-5G with remarkably low hours. Large excavator in near-new condition. Full options including GPS, rear camera, and hydraulic coupler.' },
  { id: 11, brand: 'Kobelco', model: 'SK350LC-8', year: 2016, hours: 7500, price: 56000, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1578996952311-4b0a2486c9a6?w=600&q=80', featured: false, description: 'Kobelco SK350LC-8 with low hours. Excellent power-to-weight ratio. Well-maintained with no major repairs. Includes spare bucket set.' },
  { id: 12, brand: 'SANY', model: 'SY215C', year: 2019, hours: 4200, price: 36000, location: 'Guangzhou', image: 'https://images.unsplash.com/photo-1614314106912-5a7c7b1b5a2f?w=600&q=80', featured: false, description: 'Near-new SANY SY215C with incredibly low hours. Modern machine with excellent fuel economy and strong resale value. Still under manufacturer warranty.' },
];

const brands = [...new Set(machines.map(m => m.brand))].sort();
const yearRange = { min: Math.min(...machines.map(m => m.year)), max: Math.max(...machines.map(m => m.year)) };

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
function renderFeatured() {
  const grid = document.querySelector('.featured-machines .machines-grid');
  if (!grid) return;

  const featured = machines.filter(m => m.featured).slice(0, 6);
  grid.innerHTML = featured.map(m => `
    <div class="machine-card" data-id="${m.id}" onclick="openModal(${m.id})">
      <img class="machine-card-image" src="${m.image}" alt="${m.brand} ${m.model}" loading="lazy">
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
        <img class="machine-card-image" src="${m.image}" alt="${m.brand} ${m.model}" loading="lazy">
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

  overlay.innerHTML = `
    <div class="modal">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <img class="modal-image" src="${machine.image}" alt="${machine.brand} ${machine.model}">
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
          <a href="https://wa.me/18028050818?text=Hello%20Baraka%20Machinery%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(machine.brand + ' ' + machine.model)}" target="_blank" class="btn btn-primary">
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
  renderFeatured();
  initInventory();
  initForm();
  initCounters();
});
