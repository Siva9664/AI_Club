/**
 * AI CLUB - Project Detailed View JavaScript
 * Matches Sketch Image 2:
 * Ingests project data, orchestrates the two-column interface:
 * Left: Specs, Architecture, Uses, Code, Live AI Model Playground
 * Right: Team Group Photo, Scrolling Members Roster, Individual Contributions & Socials
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id') || 'aeroscan-sentinel';
  const project = getProjectById(projectId);

  renderProjectDetail(project);
  initSimulator(project);
  initMemberSpotlightModal();
  initCopyCodeButtons();
  initShareAction(project);
});

/* ==========================================================================
   Render Project Detail Page
   ========================================================================== */
function renderProjectDetail(project) {
  // Update browser page title
  document.title = `${project.title} | AI Club Projects`;

  // Update Breadcrumbs
  const crumbEl = document.getElementById('crumbProjectName');
  if (crumbEl) crumbEl.textContent = project.title;

  // Adjacent Project Switcher
  setupAdjacentNavigation(project.id);

  // 1. Header Information
  document.getElementById('projectTitle').textContent = project.title;
  document.getElementById('projectCategory').textContent = project.category;
  document.getElementById('projectStatus').textContent = project.status;
  document.getElementById('projectVersion').textContent = project.version;
  document.getElementById('projectTagline').textContent = project.tagline;

  // 2. Action Links
  const githubBtn = document.getElementById('btnProjectGithub');
  const demoBtn = document.getElementById('btnProjectDemo');
  const docsBtn = document.getElementById('btnProjectDocs');

  if (githubBtn) githubBtn.href = project.githubUrl;
  if (demoBtn) demoBtn.href = project.liveDemoUrl;
  if (docsBtn && project.docsUrl) docsBtn.href = project.docsUrl;

  // 3. Banner Image
  const bannerImg = document.getElementById('projectBannerImg');
  if (bannerImg) {
    bannerImg.src = project.bannerImage;
    bannerImg.alt = project.title;
  }

  // 4. Metrics Strip
  document.getElementById('metricAccuracy').textContent = project.metrics.accuracy;
  document.getElementById('metricLatency').textContent = project.metrics.latency;
  document.getElementById('metricFps').textContent = project.metrics.fps;
  document.getElementById('metricPayload').textContent = project.metrics.payload;
  document.getElementById('metricRange').textContent = project.metrics.range;
  document.getElementById('metricParams').textContent = project.metrics.params;

  // 5. Overview & Core Part
  document.getElementById('projectSummary').textContent = project.executiveSummary;
  document.getElementById('corePartText').textContent = project.corePart;

  // 6. Uses List
  const usesContainer = document.getElementById('projectUsesGrid');
  if (usesContainer) {
    usesContainer.innerHTML = project.uses.map((u, i) => `
      <div class="use-item-card">
        <div class="use-item-bullet">${i + 1}</div>
        <div class="use-item-content">${u}</div>
      </div>
    `).join('');
  }

  // 7. Applications List
  const appsContainer = document.getElementById('projectAppsGrid');
  if (appsContainer) {
    appsContainer.innerHTML = project.applications.map((app, i) => `
      <div class="use-item-card">
        <div class="use-item-bullet">✦</div>
        <div class="use-item-content">${app}</div>
      </div>
    `).join('');
  }

  // 8. Tech Stack & Platform
  const platformWrap = document.getElementById('platformChips');
  if (platformWrap) {
    platformWrap.innerHTML = project.platform.split('•').map(p => `
      <span class="tech-chip platform">${p.trim()}</span>
    `).join('');
  }

  const langWrap = document.getElementById('languagesChips');
  if (langWrap) {
    langWrap.innerHTML = project.languages.map(l => `
      <span class="tech-chip">${l}</span>
    `).join('');
  }

  const fwWrap = document.getElementById('frameworksChips');
  if (fwWrap) {
    fwWrap.innerHTML = project.frameworks.map(f => `
      <span class="tech-chip">${f}</span>
    `).join('');
  }

  // 9. Architecture Pipeline Steps
  const archTimeline = document.getElementById('archTimeline');
  if (archTimeline && project.architectureSteps) {
    archTimeline.innerHTML = project.architectureSteps.map(s => `
      <div class="arch-step-card">
        <span class="arch-step-num">${s.step.split('.')[0]}</span>
        <div class="arch-step-info">
          <h4>${s.step}</h4>
          <p>${s.detail}</p>
        </div>
      </div>
    `).join('');
  }

  // 10. Code Snippet
  const codeEl = document.getElementById('projectCodePre');
  if (codeEl) {
    codeEl.textContent = project.codeSnippet;
  }

  // ==========================================================================
  // RIGHT COLUMN: Team Section (Matches Sketch Image 2)
  // ==========================================================================
  const groupPhotoEl = document.getElementById('teamGroupImg');
  if (groupPhotoEl) {
    groupPhotoEl.src = project.teamPhoto;
    groupPhotoEl.alt = `${project.title} Engineering Squad`;
  }

  const rosterCountEl = document.getElementById('teamMembersCount');
  if (rosterCountEl) {
    rosterCountEl.textContent = `${project.teamMembers.length} Research Engineers`;
  }

  const rosterContainer = document.getElementById('membersScrollStack');
  if (rosterContainer) {
    rosterContainer.innerHTML = project.teamMembers.map(m => {
      const skillsHtml = m.skills.map(s => `<span class="member-skill-badge">${s}</span>`).join('');
      return `
        <div class="member-detail-card">
          <div class="member-card-top">
            <img src="${m.photo}" alt="${m.name}" class="member-portrait-thumb" loading="lazy" />
            <div class="member-info-col">
              <h4>${m.name}</h4>
              <div class="member-role">${m.role}</div>
            </div>
          </div>
          <div class="member-part-desc">
            <strong>Role & Part: </strong>${m.contribution}
          </div>
          <div class="member-skills-row">
            ${skillsHtml}
          </div>
          <div class="member-social-row">
            <div class="member-links">
              <a href="${m.github}" target="_blank" rel="noopener noreferrer" class="member-social-btn" title="GitHub">
                GitHub ↗
              </a>
              <a href="${m.linkedin}" target="_blank" rel="noopener noreferrer" class="member-social-btn" title="LinkedIn">
                LinkedIn ↗
              </a>
            </div>
            <button class="btn-member-spotlight" data-member-name="${m.name}" data-member-role="${m.role}" data-member-photo="${m.photo}" data-member-part="${m.contribution}">
              Profile Spotlight
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
}

/* ==========================================================================
   Adjacent Project Switcher (Prev / Next)
   ========================================================================== */
function setupAdjacentNavigation(currentId) {
  const all = getAllProjects();
  const currentIndex = all.findIndex(p => p.id === currentId);

  const prevIndex = (currentIndex - 1 + all.length) % all.length;
  const nextIndex = (currentIndex + 1) % all.length;

  const prevBtn = document.getElementById('btnPrevProject');
  const nextBtn = document.getElementById('btnNextProject');

  if (prevBtn) {
    prevBtn.href = `project-detail.html?id=${all[prevIndex].id}`;
    prevBtn.title = `Previous: ${all[prevIndex].title}`;
  }

  if (nextBtn) {
    nextBtn.href = `project-detail.html?id=${all[nextIndex].id}`;
    nextBtn.title = `Next: ${all[nextIndex].title}`;
  }
}

/* ==========================================================================
   Interactive Live AI Model Playground Simulator
   ========================================================================== */
function initSimulator(project) {
  const sim = project.simulator;
  const optionsContainer = document.getElementById('simOptionsContainer');
  const consoleScreen = document.getElementById('simConsoleScreen');
  const promptLabel = document.getElementById('simPromptLabel');

  if (!sim || !optionsContainer || !consoleScreen) return;

  if (promptLabel) promptLabel.textContent = sim.promptLabel;

  optionsContainer.innerHTML = sim.samples.map((s, idx) => `
    <button class="btn-sim-opt ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
      ${s.label}
    </button>
  `).join('');

  function runSimulation(index) {
    const selected = sim.samples[index];
    consoleScreen.innerHTML = `
      <div style="color:var(--neon-cyan); display:flex; align-items:center; gap:8px;">
        <span class="pulse-dot" style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--neon-cyan);"></span>
        <span>Loading input tensor to GPU cluster [NVIDIA A100 / Jetson Orin]...</span>
      </div>
    `;

    setTimeout(() => {
      consoleScreen.innerHTML = `
        <div style="color:var(--text-dim); margin-bottom:4px;">>> INFERENCE RESULT [Time: 18.4ms | Tensor Core FP16]</div>
        <div class="sim-telemetry-result">${selected.result}</div>
      `;
    }, 600);
  }

  // Run first sample initially
  runSimulation(0);

  optionsContainer.querySelectorAll('.btn-sim-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      optionsContainer.querySelectorAll('.btn-sim-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const idx = parseInt(btn.dataset.idx, 10);
      runSimulation(idx);
    });
  });
}

/* ==========================================================================
   Member Spotlight Modal Popup
   ========================================================================== */
function initMemberSpotlightModal() {
  const modal = document.getElementById('memberSpotlightModal');
  const closeBtn = document.getElementById('closeMemberModalBtn');
  const content = document.getElementById('memberSpotlightContent');

  if (!modal || !content) return;

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-member-spotlight');
    if (btn) {
      const name = btn.dataset.memberName;
      const role = btn.dataset.memberRole;
      const photo = btn.dataset.memberPhoto;
      const part = btn.dataset.memberPart;

      content.innerHTML = `
        <div style="display:flex; align-items:center; gap:20px; margin-bottom:20px;">
          <img src="${photo}" alt="${name}" style="width:84px; height:84px; border-radius:50%; object-fit:cover; border:3px solid var(--neon-cyan); box-shadow:0 0 20px var(--neon-cyan-glow);" />
          <div>
            <span style="font-size:0.75rem; font-family:var(--font-mono); color:var(--neon-emerald); letter-spacing:0.1em; text-transform:uppercase;">AI Club Student Researcher</span>
            <h3 style="font-size:1.5rem; color:#fff; font-weight:700;">${name}</h3>
            <p style="font-size:0.9rem; color:var(--neon-cyan); font-family:var(--font-mono);">${role}</p>
          </div>
        </div>

        <div style="background:rgba(9, 12, 19, 0.6); padding:20px; border-radius:12px; border:1px solid var(--border-subtle); margin-bottom:20px;">
          <h4 style="font-size:0.8rem; font-family:var(--font-mono); color:var(--text-dim); text-transform:uppercase; margin-bottom:8px;">Project Contributions & Engineering Part</h4>
          <p style="font-size:0.95rem; color:#f0f4fc; line-height:1.65;">${part}</p>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px;">
          <div style="padding:14px; background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:8px;">
            <div style="font-size:0.72rem; color:var(--text-dim); font-family:var(--font-mono);">ACADEMIC STANDING</div>
            <div style="font-size:0.9rem; color:#fff; font-weight:600; margin-top:2px;">B.Tech CSE (AI & Data Science)</div>
          </div>
          <div style="padding:14px; background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:8px;">
            <div style="font-size:0.72rem; color:var(--text-dim); font-family:var(--font-mono);">CAMPUS LAB WING</div>
            <div style="font-size:0.9rem; color:var(--neon-purple); font-weight:600; margin-top:2px;">Turing Lab Room 402</div>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:12px; padding-top:16px; border-top:1px solid var(--border-subtle);">
          <button onclick="document.getElementById('memberSpotlightModal').classList.remove('open'); document.body.style.overflow='';" class="btn-secondary" style="padding:8px 18px; font-size:0.84rem;">Close</button>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
}

/* ==========================================================================
   Code Copy Button Helper
   ========================================================================== */
function initCopyCodeButtons() {
  const btn = document.getElementById('btnCopyCode');
  const codePre = document.getElementById('projectCodePre');

  if (btn && codePre) {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(codePre.textContent).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied to Clipboard! ✓';
        btn.style.color = 'var(--neon-emerald)';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.color = '';
        }, 2000);
      });
    });
  }
}

/* ==========================================================================
   Share Action Helper
   ========================================================================== */
function initShareAction(project) {
  const shareBtn = document.getElementById('btnShareProject');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl).then(() => {
        shareBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Link Copied!
        `;
        shareBtn.style.color = 'var(--neon-emerald)';
        setTimeout(() => {
          shareBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            Share Project
          `;
          shareBtn.style.color = '';
        }, 2200);
      });
    });
  }
}
