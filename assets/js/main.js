(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    }
    return document.querySelector(el);
  };

  // Navbar links active state on scroll
  const navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  // Scroll to element with offset
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight + 16;
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  // Mobile nav toggle
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  on('click', '.mobile-nav-toggle', function(e) {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('show');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();
      const navMenu = document.getElementById('nav-menu');
      navMenu.classList.remove('show');
      const toggle = select('.mobile-nav-toggle');
      toggle.classList.add('bi-list');
      toggle.classList.remove('bi-x');
      scrollto(this.hash);
    }
  }, true);

  // Hash links on page load
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        setTimeout(() => scrollto(window.location.hash), 100);
      }
    }
  });

  // Typed effect
  const typed = select('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Lightbox
  GLightbox({ selector: '.portfolio-lightbox' });

  // Portfolio Filters
  const filterBtns = select('.filter-btn', true);
  const workCards = select('.work-card', true);

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        workCards.forEach(card => {
          if (filterValue === 'all') {
            card.classList.remove('is-hidden');
          } else if (card.classList.contains(`filter-${filterValue}`)) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // Project Details Modal Data
  const projectDetails = {
    docsearch: {
      title: "DocuQuery AI — Smart Requirement & Project Document Search Engine",
      subtitle: "Generative AI • RAG Architecture • Vector Search • Requirement Intelligence",
      image: "assets/img/ai1.png",
      description: "DocuQuery AI is an intelligent enterprise document retrieval and requirement analysis engine. It processes complex project specifications, PRDs (Product Requirement Documents), SRS documents, and engineering architectures. Powered by modern vector embeddings and LLM reasoning, it empowers engineers, product managers, and QA teams to perform deep semantic requirement searches, uncover specification gaps, and generate automated test acceptance criteria instantly.",
      features: [
        {
          icon: "bi-search",
          title: "Semantic Requirement Search",
          desc: "Goes beyond keyword matching with dense vector embeddings to retrieve relevant functional and non-functional requirements by context and intent."
        },
        {
          icon: "bi-diagram-3",
          title: "Requirement Traceability & Gap Analysis",
          desc: "Automatically maps inter-dependencies across user stories, design documents, and API specifications to highlight unaddressed edge cases."
        },
        {
          icon: "bi-file-earmark-code",
          title: "Multi-Format Ingestion Pipeline",
          desc: "Parses PDF, Markdown, Word, and Confluence docs with semantic chunking and metadata enrichment."
        },
        {
          icon: "bi-speedometer2",
          title: "Hybrid Search & High Accuracy",
          desc: "Combines dense vector retrieval (ChromaDB) with BM25 keyword filtering for 96.5%+ precision in technical requirement retrieval."
        }
      ],
      techStack: ["Python", "LangChain / LlamaIndex", "ChromaDB Vector Store", "FastAPI", "OpenAI / Claude API", "Streamlit UI"],
      demo: {
        prompt: "Find all latency and data encryption requirements in Apollo-V System PRD.",
        toolExecution: "[RAG Pipeline] Vector similarity query on collection 'apollo-v-specs' (k=4, score_threshold=0.85)",
        output: "✅ 2 Matching Requirements Found:\n\n1. [REQ-PERF-04.2] API Gateway Latency: p99 latency must remain under 120ms under 15,000 concurrent requests.\n2. [REQ-SEC-07.1] Data at Rest & In Transit: All employee and customer PII data must be encrypted with AES-256 at rest and TLS 1.3 in transit."
      }
    },
    hrmcp: {
      title: "HR AI Assistant — Real-Time MCP Server Tool Integration",
      subtitle: "Model Context Protocol (MCP) • Autonomous AI Agents • Live HRMS Data • Secure Tool Calling",
      image: "assets/img/ai2.png",
      description: "HR AI Assistant is an enterprise-grade autonomous Generative AI agent built using the Model Context Protocol (MCP). It bridges large language models directly with backend HRMS databases and payroll infrastructure. Rather than relying on static or outdated information, the agent autonomously plans and calls MCP tools in real-time to query employee profiles, live salary compensation bands, department structures, leave balances, and performance trends with strict role-based access control (RBAC).",
      features: [
        {
          icon: "bi-cpu",
          title: "Model Context Protocol (MCP) Tools",
          desc: "Standardized MCP client/server architecture enabling seamless LLM tool execution against live HRMS systems without custom brittle integrations."
        },
        {
          icon: "bi-cash-coin",
          title: "Real-Time Salary & Compensation Analytics",
          desc: "Securely queries live payroll databases, salary bands, bonus structures, and market parity benchmarks via authenticated MCP tools."
        },
        {
          icon: "bi-shield-lock",
          title: "Enterprise RBAC & Privacy Safeguards",
          desc: "Enforces strict authorization layers so managers, HR reps, and employees only access data permitted by their organizational role."
        },
        {
          icon: "bi-person-badge",
          title: "Full Lifecycle Employee Lookups",
          desc: "Queries employee tenure, performance history, reporting managers, leave utilization, and historical compensation trends in seconds."
        }
      ],
      techStack: ["Model Context Protocol (MCP)", "Python / TypeScript", "Claude / GPT-4o Agent", "FastAPI / Node.js", "PostgreSQL / SQLite HRMS", "OAuth2 & RBAC"],
      demo: {
        prompt: "Fetch compensation details, performance rating, and tenure for John Smith (EMP-204).",
        toolExecution: "[MCP Tool Execution] Calling 'hrms-database::fetch_employee_salary' with args: {'employee_id': 'EMP-204', 'auth_level': 'HR_ADMIN'}",
        output: "📊 Employee Profile & Real-Time Compensation Data:\n\n• Name: John Smith | Role: Sr. Software Engineer (Engineering Dept)\n• Current Base Salary: $165,000 / year\n• Market Benchmark Band: $155,000 - $175,000 (Positioned at 55th percentile)\n• Performance Rating: 4.8 / 5.0 (Exceeds Expectations)\n• Tenure: 5 Years | Status: Active & In Good Standing"
      }
    }
  };

  window.openProjectModal = function(projectId) {
    const modal = document.getElementById('project-modal');
    const container = document.getElementById('modal-content-container');
    const titleElem = document.getElementById('modal-title');
    const project = projectDetails[projectId];

    if (!project || !modal || !container) return;

    titleElem.textContent = project.title;

    let featuresHtml = project.features.map(f => `
      <div class="feature-item-box">
        <h5><i class="bi ${f.icon} text-accent"></i> ${f.title}</h5>
        <p>${f.desc}</p>
      </div>
    `).join('');

    let techTagsHtml = project.techStack.map(t => `<span class="skill-tag">${t}</span>`).join(' ');

    container.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="modal-image-preview">
      
      <p style="font-weight:600; color:var(--accent); font-size:14px; margin-bottom:12px;">${project.subtitle}</p>
      <p>${project.description}</p>
      
      <div class="modal-section-title"><i class="bi bi-grid-fill"></i> Core Capabilities & Architecture</div>
      <div class="feature-list-grid">
        ${featuresHtml}
      </div>

      <div class="modal-section-title"><i class="bi bi-terminal-fill"></i> Live Agent Tool Execution Demo</div>
      <div class="interactive-demo-card">
        <div class="prompt-bubble">
          <i class="bi bi-chat-quote-fill"></i>
          <div><strong>User Query:</strong> "${project.demo.prompt}"</div>
        </div>
        <div class="tool-execution-pill">
          <i class="bi bi-gear-wide-connected"></i> ${project.demo.toolExecution}
        </div>
        <pre class="tool-output-box">${project.demo.output}</pre>
      </div>

      <div class="modal-section-title"><i class="bi bi-stack"></i> Technology Stack</div>
      <div class="skills-grid" style="margin-top:10px;">
        ${techTagsHtml}
      </div>
    `;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function() {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  // Close modal on backdrop click or ESC
  const modalElem = document.getElementById('project-modal');
  if (modalElem) {
    modalElem.addEventListener('click', (e) => {
      if (e.target === modalElem) {
        window.closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeProjectModal();
    }
  });

})();
