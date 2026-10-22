import type { Project, SkillCategory, ExperienceItem, StatItem } from '../types/portfolio';

export const personalInfo = {
  name: 'Erjigit',
  title: 'Senior Full-Stack Software Engineer & Solutions Architect',
  shortBio: '5+ years crafting high-throughput distributed microservices, elegant reactive web applications, and mission-critical cloud solutions.',
  fullBio: `Senior Software Engineer with deep expertise across modern web ecosystems and high-concurrency backend architectures.
Proven track record of designing scalable cloud infrastructures, driving microservice migrations, optimizing web performance to sub-100ms thresholds, and mentoring high-velocity engineering teams. Passionate about clean code, robust type systems, and intuitive user experiences.`,
  location: 'Tashkent, Uzbekistan (Open to Global Remote)',
  email: 'erjigit.dev@gmail.com',
  github: 'https://github.com/erjigitvvv',
  telegram: 'https://t.me/erjigitvvv',
  linkedin: 'https://linkedin.com/in/erjigit',
  twitter: 'https://x.com/erjigitvvv',
  status: 'Open for high-impact senior engineering roles & consulting',
  availability: 'Full-time / High-impact Contracts',
  yearsOfExperience: '5+',
  completedProjects: '35+',
  codeCommitCount: '3,200+',
  uptimeRecord: '99.98%'
};

export const statsData: StatItem[] = [
  {
    value: '5+ Years',
    label: 'Industry Experience',
    sublabel: 'Delivering production systems'
  },
  {
    value: '35+ Projects',
    label: 'Shipped to Production',
    sublabel: 'Enterprise & consumer apps'
  },
  {
    value: '100K+',
    label: 'Active Users Served',
    sublabel: 'Zero downtime architectures'
  },
  {
    value: '< 120ms',
    label: 'P95 API Latency',
    sublabel: 'High-speed throughput'
  }
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Engineering',
    iconName: 'Layout',
    skills: [
      { name: 'React 18 / 19', level: 96, experience: '5 yrs', featured: true },
      { name: 'TypeScript', level: 95, experience: '5 yrs', featured: true },
      { name: 'Next.js (App Router)', level: 92, experience: '4 yrs', featured: true },
      { name: 'Tailwind CSS & Design Systems', level: 95, experience: '4 yrs', featured: true },
      { name: 'Vue.js / Nuxt', level: 85, experience: '3 yrs' },
      { name: 'State Management (Zustand/Redux)', level: 92, experience: '5 yrs' },
      { name: 'WebSockets & Realtime UI', level: 90, experience: '4 yrs' },
      { name: 'Performance Optimization & Core Web Vitals', level: 94, experience: '4 yrs' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend & Microservices',
    iconName: 'Server',
    skills: [
      { name: 'Node.js / Express / NestJS', level: 94, experience: '5 yrs', featured: true },
      { name: 'Go (Golang)', level: 88, experience: '3 yrs', featured: true },
      { name: 'Python / FastAPI', level: 86, experience: '3 yrs' },
      { name: 'GraphQL & RESTful APIs', level: 95, experience: '5 yrs', featured: true },
      { name: 'Event-Driven Systems (Kafka / RabbitMQ)', level: 87, experience: '3 yrs' },
      { name: 'Microservices & Distributed Systems', level: 90, experience: '4 yrs' },
      { name: 'Authentication (OAuth2, OIDC, JWT, RBAC)', level: 94, experience: '5 yrs' }
    ]
  },
  {
    id: 'database',
    name: 'Databases & Caching',
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL & Complex Query Tuning', level: 92, experience: '5 yrs', featured: true },
      { name: 'Redis (Caching, Pub/Sub, Queues)', level: 90, experience: '4 yrs', featured: true },
      { name: 'MongoDB / Document Stores', level: 88, experience: '4 yrs' },
      { name: 'Prisma ORM / Drizzle ORM', level: 92, experience: '3 yrs' },
      { name: 'Elasticsearch & Full-text Search', level: 82, experience: '2 yrs' },
      { name: 'ClickHouse / Analytics', level: 80, experience: '2 yrs' }
    ]
  },
  {
    id: 'devops',
    name: 'Cloud, DevOps & Tooling',
    iconName: 'Cloud',
    skills: [
      { name: 'Docker & Containerization', level: 92, experience: '4 yrs', featured: true },
      { name: 'Kubernetes (K8s) Basics & Deployments', level: 80, experience: '2 yrs' },
      { name: 'AWS (ECS, S3, RDS, Lambda, CloudFront)', level: 88, experience: '4 yrs', featured: true },
      { name: 'CI/CD Pipelines (GitHub Actions)', level: 94, experience: '4 yrs', featured: true },
      { name: 'Linux Server Administration & Nginx', level: 90, experience: '5 yrs' },
      { name: 'Monitoring (Prometheus, Grafana, Sentry)', level: 85, experience: '3 yrs' }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: 'cloudpulse',
    title: 'CloudPulse Observability Engine',
    tagline: 'Distributed Real-Time System Metrics & Telemetry Platform',
    description: 'High-performance observability suite delivering sub-second anomaly detection, dynamic tracing, and distributed logs monitoring for Kubernetes clusters.',
    longDescription: 'Architected from the ground up to ingest 15,000+ telemetry events per second. Integrated custom time-series aggregation, alert routing pipelines, and interactive canvas visualizations with customizable widget layouts.',
    category: 'fullstack',
    tags: ['React', 'TypeScript', 'Go', 'Kafka', 'ClickHouse', 'Docker', 'Tailwind'],
    metrics: 'Handles 15K+ events/sec with < 50ms query latency',
    githubUrl: 'https://github.com/erjigitvvv',
    liveUrl: 'https://cloudpulse-demo.example.com',
    featured: true,
    stars: 148,
    imageGradient: 'from-blue-600 via-indigo-600 to-purple-700'
  },
  {
    id: 'novatrade',
    title: 'NovaTrade Crypto & Asset Exchange',
    tagline: 'Ultra-low Latency Order Book & Trading Interface',
    description: 'Full-featured digital asset exchange frontend and WebSocket order matching stream with millisecond real-time market updates.',
    longDescription: 'Engineered high-frequency chart components using lightweight HTML5 Canvas, zero-render WebSocket state buffers, and multi-currency cryptographic wallet integrations with strict transaction signing.',
    category: 'fullstack',
    tags: ['Next.js', 'TypeScript', 'WebSockets', 'Tailwind CSS', 'Redis', 'Zustand'],
    metrics: 'Under 16ms render frame budget for 120 FPS charts',
    githubUrl: 'https://github.com/erjigitvvv',
    liveUrl: 'https://novatrade-demo.example.com',
    featured: true,
    stars: 210,
    imageGradient: 'from-emerald-600 via-teal-600 to-cyan-700'
  },
  {
    id: 'nexusai',
    title: 'NexusAI Agentic Workflow Platform',
    tagline: 'Multi-Agent Autonomous Code & Research Assistant',
    description: 'Autonomous orchestration tool that plans, executes, and audits multi-step development pipelines with tool execution and safety boundaries.',
    longDescription: 'Designed an asynchronous execution DAG with human-in-the-loop verification, sandbox code execution, vector embeddings search across documentation, and streaming SSE tokens with live markdown formatting.',
    category: 'ai',
    tags: ['FastAPI', 'Python', 'React', 'LangChain', 'PostgreSQL', 'pgvector'],
    metrics: 'Boosted dev velocity by 3.4x in benchmarks',
    githubUrl: 'https://github.com/erjigitvvv',
    liveUrl: 'https://nexusai-demo.example.com',
    featured: true,
    stars: 320,
    imageGradient: 'from-violet-600 via-purple-600 to-pink-700'
  },
  {
    id: 'apexcommerce',
    title: 'ApexCommerce Headless Architecture',
    tagline: 'Next-Gen Modular E-Commerce with Global Edge CDN',
    description: 'Ultra-fast headless commerce platform featuring sub-50ms SSR edge delivery, multi-currency checkout, and real-time inventory management.',
    longDescription: 'Replaced traditional monolithic storefronts with a microservice architecture built on Next.js Edge runtime, GraphQL federated gateways, Stripe webhook processors, and Redis caching layers.',
    category: 'frontend',
    tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Stripe', 'Redis'],
    metrics: '99/100 Google Lighthouse Core Web Vitals score',
    githubUrl: 'https://github.com/erjigitvvv',
    liveUrl: 'https://apexcommerce-demo.example.com',
    featured: false,
    stars: 94,
    imageGradient: 'from-amber-600 via-orange-600 to-rose-700'
  },
  {
    id: 'sentinelauth',
    title: 'SentinelAuth Identity & Access Service',
    tagline: 'Zero-Trust RBAC & Single Sign-On Microservice',
    description: 'Hardened multi-tenant identity microservice with passkey support, granular policy-based permissions, and automated audit logging.',
    longDescription: 'Built with cryptographic best practices: Argon2id password hashing, rotating Ed25519 asymmetric JWT keys, OAuth 2.1 PKCE flows, rate limiting via token bucket algorithms, and compliance audit exports.',
    category: 'backend',
    tags: ['Go', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'OAuth 2.1'],
    metrics: 'Passes enterprise OWASP ASVS Level 3 checks',
    githubUrl: 'https://github.com/erjigitvvv',
    liveUrl: 'https://sentinelauth-demo.example.com',
    featured: false,
    stars: 185,
    imageGradient: 'from-sky-600 via-blue-700 to-indigo-900'
  },
  {
    id: 'devcanvas',
    title: 'DevCanvas Real-Time Architecture Studio',
    tagline: 'Collaborative Diagramming & System Design Whiteboard',
    description: 'Interactive multiplayer whiteboard for software architects to map microservice diagrams, entity relationships, and cloud topologies in real time.',
    longDescription: 'Leverages CRDTs (Conflict-Free Replicated Data Types) for seamless conflict-free collaborative editing across distributed team members, complete with SVG/PNG exports and exportable infrastructure-as-code snippets.',
    category: 'frontend',
    tags: ['React', 'TypeScript', 'Canvas API', 'WebSockets', 'Yjs', 'Tailwind'],
    metrics: 'Sub-30ms sync latency across continents',
    githubUrl: 'https://github.com/erjigitvvv',
    liveUrl: 'https://devcanvas-demo.example.com',
    featured: true,
    stars: 275,
    imageGradient: 'from-fuchsia-600 via-pink-600 to-rose-600'
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead Full-Stack Software Engineer',
    company: 'FinTech Velocity Systems',
    location: 'Remote / Global',
    period: '2023 - Present',
    type: 'Full-time',
    description: 'Leading a cross-functional team of 8 engineers delivering enterprise core banking modules, real-time settlement rails, and high-frequency transaction dashboards.',
    achievements: [
      'Architected event-driven microservice system processing $4M+ daily volume with 99.99% uptime.',
      'Reduced average customer onboarding latency by 65% through optimized React state and async API batching.',
      'Established engineering standards, automated CI/CD security audits, and mentored junior and mid-level developers.'
    ],
    skills: ['TypeScript', 'React', 'Node.js', 'Go', 'Kafka', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    id: 'exp-2',
    role: 'Senior Backend & Cloud Engineer',
    company: 'Apex Cloud Solutions',
    location: 'Tashkent & Hybrid',
    period: '2021 - 2023',
    type: 'Full-time',
    description: 'Engineered multi-tenant SaaS cloud platforms, distributed background job processing workers, and customer-facing REST/GraphQL endpoints.',
    achievements: [
      'Migrated legacy monolithic database to partitioned PostgreSQL clusters, cutting query response times by 48%.',
      'Designed zero-downtime blue/green deployment strategy using Docker and GitHub Actions.',
      'Implemented distributed caching strategy with Redis, handling 50,000+ RPM traffic spikes effortlessly.'
    ],
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'GraphQL']
  },
  {
    id: 'exp-3',
    role: 'Full-Stack Web Developer',
    company: 'Digital Innovation Studio',
    location: 'Tashkent',
    period: '2019 - 2021',
    type: 'Full-time',
    description: 'Built scalable client web applications, e-commerce platforms, and interactive dashboards from initial wireframes to production rollouts.',
    achievements: [
      'Delivered 18+ client commercial projects on schedule with 100% client satisfaction ratings.',
      'Refactored legacy frontend codebases to modern TypeScript & React, reducing bundle sizes by over 40%.'
    ],
    skills: ['React', 'TypeScript', 'JavaScript (ES6+)', 'Node.js', 'Express', 'MongoDB', 'CSS3']
  }
];

export const corePhilosophy = [
  {
    title: 'Performance by Design',
    desc: 'Speed is a feature. Every byte transferred, DOM node rendered, and query executed is measured and optimized for instant responsiveness.',
    icon: 'Zap'
  },
  {
    title: 'Architectural Resilience',
    desc: 'Systems designed with graceful degradation, structured logging, distributed tracing, and fault-tolerant failovers.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Modern Craftsmanship',
    desc: 'Strict type safety with TypeScript, atomic component architecture, accessible semantic HTML, and delightful micro-interactions.',
    icon: 'Sparkles'
  },
  {
    title: 'Collaborative Leadership',
    desc: 'Empowering engineering teams through transparent documentation, active code reviews, clear architectural RFCs, and empathy.',
    icon: 'Users'
  }
];
