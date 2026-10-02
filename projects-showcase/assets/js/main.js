/**
 * AI CLUB - Flagship Web Platform Main JavaScript
 * Handles:
 * 1. Running Slow-Motion AI Video Background Engine (Hardware Accelerated, Smooth Slow-Mo Rate)
 * 2. Dynamic Project Card Rendering (Matching Sketch Image 1)
 * 3. Real-time Search, Category Filter & Status Counters
 * 4. Interactive Quick View Popups & Modals
 * 5. Interactive Contact Channels & Proposal Submission
 * 6. Responsive Navigation & Fluid Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  initSlowMoVideoBackground();
  renderProjectCards(getAllProjects());
  initFilterAndSearch();
  initModals();
  initContactForm();
  initCounters();
  initHeaderScroll();
});

/* ==========================================================================
   1. Running Slow-Motion AI Video Background
   Uses the generated local H.264 mp4 video with complete AI visualizations
   and sets a smooth cinematic slow-motion playback rate (0.6x).
   ========================================================================== */
function initSlowMoVideoBackground() {
  const video = document.getElementById('heroVideoBg');
  const playBtn = document.getElementById('btnVideoPlayPause');
  const speedBtn = document.getElementById('btnVideoSpeed');
  const statusIndicator = document.getElementById('videoStatusIndicator');

  if (!video) return;

  // Set smooth slow-motion playback speed
  video.playbackRate = 0.65;

  // Ensure autoplay works across all modern browsers
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // If browser blocked autoplay with sound (even though video is muted), retry muted
      video.muted = true;
      video.play().catch(() => {});
    });
  }

  // Play / Pause Toggle
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playBtn.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
          <span>Pause</span>
        `;
        if (statusIndicator) statusIndicator.style.background = 'var(--accent-emerald)';
      } else {
        video.pause();
        playBtn.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>Play</span>
        `;
        if (statusIndicator) statusIndicator.style.background = 'var(--accent-amber)';
      }
    });
  }

  // Speed Toggle (Slow-mo 0.5x <-> Normal 1.0x)
  if (speedBtn) {
    let currentSpeed = 0.65;
    speedBtn.addEventListener('click', () => {
      if (currentSpeed === 0.65) {
        currentSpeed = 0.4;
        video.playbackRate = 0.4;
        speedBtn.textContent = '0.4x Ultra Slow-Mo';
      } else if (currentSpeed === 0.4) {
        currentSpeed = 1.0;
        video.playbackRate = 1.0;
        speedBtn.textContent = '1.0x Normal';
      } else {
        currentSpeed = 0.65;
        video.playbackRate = 0.65;
        speedBtn.textContent = '0.6x Slow-Mo';
      }
    });
  }
}

/* ==========================================================================
   2. Render Project Grid Cards (Matching Sketch Image 1)
   Upper half: Project Image with hover zoom & status
   Lower half: Brief catchy overview, metrics, and interactive button
   ========================================================================== */
function renderProjectCards(projects) {
  const grid = document.getElementById('projectsGrid');
  const countBadge = document.getElementById('projectCountBadge');
  if (!grid) return;

  if (countBadge) {
    countBadge.textContent = `Showing ${projects.length} of ${getAllProjects().length} Projects`;
  }

  if (projects.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3 style="font-size: 1.15rem; margin-bottom: 6px; color: #fff;">No matching projects found</h3>
        <p style="color: var(--text-muted); font-size: 0.88rem;">Try adjusting your search terms or filter categories.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = projects.map(project => {
    // Generate mini member avatars
    const avatarsHtml = project.teamMembers.map(m => `
      <img src="${m.photo}" alt="${m.name}" title="${m.name} (${m.role})" class="avatar-mini" loading="lazy" />
    `).join('');

    return `
      <article class="project-card" data-id="${project.id}" role="button" tabindex="0" aria-label="View project ${project.title}">
        <!-- UPPER HALF: Project Image -->
        <div class="card-media">
          <img src="${project.thumbnail}" alt="${project.title}" class="card-img" loading="lazy" />
          <div class="card-gradient-scrim"></div>
          
          <div class="card-badges-top">
            <span class="category-tag">${project.category}</span>
            <span class="status-pill">
              <span class="indicator-dot"></span>
              ${project.status}
            </span>
          </div>

          <!-- Quick View Action Button -->
          <div class="card-quick-actions">
            <button class="btn-quick-preview" data-preview-id="${project.id}" title="Quick Preview Modal">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Quick Peek
            </button>
          </div>
        </div>

        <!-- LOWER HALF: Catchy Brief Idea & Specifications -->
        <div class="card-body">
          <h3 class="card-title">${project.title}</h3>
          <p class="card-summary">${project.tagline}</p>

          <div class="card-core-part">
            <strong>Core Architecture</strong>
            <span>${project.corePart}</span>
          </div>

          <div class="card-metrics-row">
            <div class="metric-pill-left">
              BENCHMARK: <span>${project.metrics.accuracy}</span>
            </div>
            <div class="metric-pill-right">
              ${project.metrics.latency}
            </div>
          </div>

          <div class="card-footer">
            <div class="card-team-avatars">
              ${avatarsHtml}
            </div>
            <div class="card-open-cta">
              <span>Deep Dive</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach card click handlers for navigation to project-detail.html
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-quick-preview')) {
        e.stopPropagation();
        const pId = e.target.closest('.btn-quick-preview').dataset.previewId;
        openQuickViewModal(pId);
        return;
      }
      const projectId = card.dataset.id;
      window.location.href = `project-detail.html?id=${projectId}`;
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = `project-detail.html?id=${card.dataset.id}`;
      }
    });
  });

  // Attach quick view peek button event handlers
  grid.querySelectorAll('.btn-quick-preview').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.dataset.previewId;
      openQuickViewModal(pId);
    });
  });
}

/* ==========================================================================
   3. Filter and Real-time Search
   ========================================================================== */
function initFilterAndSearch() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('projectSearchInput');
  let currentCategory = 'All';
  let searchQuery = '';

  function applyFilters() {
    let results = getAllProjects();

    if (currentCategory !== 'All') {
      results = results.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.corePart.toLowerCase().includes(q) ||
        p.languages.some(l => l.toLowerCase().includes(q)) ||
        p.frameworks.some(f => f.toLowerCase().includes(q)) ||
        p.teamMembers.some(m => m.name.toLowerCase().includes(q))
      );
    }

    renderProjectCards(results);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }
}

/* ==========================================================================
   4. Popups & Modals (Quick View Modal)
   ========================================================================== */
function initModals() {
  const backdrop = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('closeModalBtn');

  if (!backdrop) return;

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

function openQuickViewModal(projectId) {
  const project = getProjectById(projectId);
  const backdrop = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  if (!backdrop || !content) return;

  const teamList = project.teamMembers.map(m => `
    <div style="display:flex; align-items:center; gap:8px; margin-top:4px;">
      <img src="${m.photo}" alt="${m.name}" style="width:24px; height:24px; border-radius:50%; object-fit:cover;" />
      <span style="font-size:0.82rem; color:#fff;">${m.name}</span>
      <span style="font-size:0.75rem; color:var(--text-dim);">- ${m.role}</span>
    </div>
  `).join('');

  content.innerHTML = `
    <div class="quickview-header">
      <img src="${project.thumbnail}" alt="${project.title}" class="quickview-thumb" />
      <div class="quickview-info">
        <span class="category-tag" style="margin-bottom:6px; display:inline-block;">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.tagline}</p>
      </div>
    </div>

    <div class="quickview-specs-grid">
      <div class="spec-entry">
        <span class="spec-entry-title">Status</span>
        <span class="spec-entry-val" style="color:var(--accent-emerald);">${project.status} (${project.version})</span>
      </div>
      <div class="spec-entry">
        <span class="spec-entry-title">Accuracy / Metric</span>
        <span class="spec-entry-val">${project.metrics.accuracy}</span>
      </div>
      <div class="spec-entry">
        <span class="spec-entry-title">Inference Latency</span>
        <span class="spec-entry-val">${project.metrics.latency}</span>
      </div>
      <div class="spec-entry">
        <span class="spec-entry-title">Target Platform</span>
        <span class="spec-entry-val">${project.platform.split('•')[0]}</span>
      </div>
    </div>

    <div style="margin: 16px 0;">
      <h4 style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:4px; font-family:var(--font-mono);">EXECUTIVE SUMMARY</h4>
      <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6;">${project.executiveSummary}</p>
    </div>

    <div style="margin: 16px 0;">
      <h4 style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:6px; font-family:var(--font-mono);">PROJECT CONTRIBUTORS</h4>
      ${teamList}
    </div>

    <div class="modal-actions-row">
      <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-cta-github" style="padding:8px 16px; font-size:0.82rem;">
        GitHub Code
      </a>
      <a href="project-detail.html?id=${project.id}" class="btn-primary" style="padding:8px 20px; font-size:0.84rem;">
        Open Full Project View & Team ->
      </a>
    </div>
  `;

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   5. Contact Channels & Interactive Proposal Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('projectPitchForm');
  const copyButtons = document.querySelectorAll('.btn-copy-chip');

  // Copy to clipboard helper
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.dataset.copy;
      if (!val) return;

      navigator.clipboard.writeText(val).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--accent-emerald)';
        showToast(`Copied "${val}" to clipboard!`);
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
        }, 2000);
      }).catch(() => {
        showToast(`Failed to copy, please select manually.`);
      });
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const projectDomain = document.getElementById('projectDomain').value;
      const message = document.getElementById('pitchMessage').value;

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      const submitBtn = form.querySelector('.btn-submit-form');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `Transmitting Pitch to AI Club...`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = `Dispatched Successfully! ✓`;
        submitBtn.style.background = '#10b981';
        submitBtn.style.color = '#fff';
        showToast(`Thanks ${name}! Your proposal for [${projectDomain}] has been sent to our core research team.`);
        form.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 3500);
      }, 1000);
    });
  }
}

/* ==========================================================================
   6. Toast System
   ========================================================================== */
function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${msg}</span>
  `;

  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

/* ==========================================================================
   7. Metric Animated Counters
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.metric-val');
  let hasRun = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        counters.forEach(c => {
          const target = parseFloat(c.dataset.target || 0);
          const isDecimal = String(target).includes('.');
          let count = 0;
          const increment = target / 35;
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              c.childNodes[0].nodeValue = isDecimal ? target.toFixed(1) : Math.floor(target);
              clearInterval(timer);
            } else {
              c.childNodes[0].nodeValue = isDecimal ? count.toFixed(1) : Math.floor(count);
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsGrid = document.querySelector('.hero-metrics-grid');
  if (metricsGrid) observer.observe(metricsGrid);
}

/* ==========================================================================
   8. Header Scroll & Mobile Hamburger
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }
}
