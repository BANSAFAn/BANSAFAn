export interface Issuer {
  id: string;
  name: string;
  shortName: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  verifyHost: string;
  website: string;
  description: string;
}

export interface Certificate {
  id: string;
  issuerId: string;
  issuerName: string;
  category: 'systems' | 'security' | 'governance' | 'cloud' | 'networking' | 'devops' | 'other';
  code: string;
  codeShort: string;
  title: string;
  description: string;
  date: string;
  verifyId: string;
  verifyUrl: string;
  skills: string[];
  fileUrl: string;
  fileName: string;
  previewSvg?: string;
  badgeBg: string;
  badgeText: string;
  status: 'verified' | 'in-progress' | 'planned';
}

export const ISSUERS: Record<string, Issuer> = {
  'linux-foundation': {
    id: 'linux-foundation',
    name: 'The Linux Foundation',
    shortName: 'Linux Foundation',
    badgeBg: 'bg-blue-600',
    badgeBorder: 'border-blue-500',
    badgeText: 'text-blue-600 dark:text-blue-400',
    verifyHost: 'training.linuxfoundation.org',
    website: 'https://training.linuxfoundation.org',
    description: 'Провідний світовий консорціум розвитку відкритого коду, ядра Linux та хмарної інфраструктури.',
  },
  'cisco': {
    id: 'cisco',
    name: 'Cisco Systems',
    shortName: 'Cisco',
    badgeBg: 'bg-cyan-600',
    badgeBorder: 'border-cyan-500',
    badgeText: 'text-cyan-600 dark:text-cyan-400',
    verifyHost: 'cisco.com/go/certifications',
    website: 'https://www.cisco.com',
    description: 'Глобальний стандарт мережевої інженерії, маршрутизації та корпоративної кібербезпеки.',
  },
  'google-cloud': {
    id: 'google-cloud',
    name: 'Google Cloud Platform',
    shortName: 'Google Cloud',
    badgeBg: 'bg-amber-600',
    badgeBorder: 'border-amber-500',
    badgeText: 'text-amber-600 dark:text-amber-400',
    verifyHost: 'cloud.google.com/certification',
    website: 'https://cloud.google.com',
    description: 'Професійна сертифікація хмарної архітектури, безпеки та масштабованих сервісів.',
  },
  'aws': {
    id: 'aws',
    name: 'Amazon Web Services',
    shortName: 'AWS',
    badgeBg: 'bg-orange-600',
    badgeBorder: 'border-orange-500',
    badgeText: 'text-orange-600 dark:text-orange-400',
    verifyHost: 'aws.amazon.com/verification',
    website: 'https://aws.amazon.com',
    description: 'Платформа хмарних обчислень, серверлес-архітектури та розподілених баз даних.',
  },
  'microsoft': {
    id: 'microsoft',
    name: 'Microsoft Learn',
    shortName: 'Microsoft',
    badgeBg: 'bg-sky-600',
    badgeBorder: 'border-sky-500',
    badgeText: 'text-sky-600 dark:text-sky-400',
    verifyHost: 'learn.microsoft.com',
    website: 'https://learn.microsoft.com',
    description: 'Системне адміністрування, Azure Cloud та корпоративна розробка програмного забезпечення.',
  },
};

export const CERTIFICATES: Certificate[] = [
  {
    id: 'lf-rust-1002',
    issuerId: 'linux-foundation',
    issuerName: 'The Linux Foundation',
    category: 'systems',
    code: 'LFEL1002',
    codeShort: 'RUST',
    title: 'Getting Started with Rust',
    description: 'Системне програмування на Rust: керування пам’яттю без Garbage Collector, моделі володіння (Ownership) та запозичення (Borrowing), потокобезпечність (Memory & Concurrency Safety), оптимізація та архітектура системних утиліт.',
    date: '10 Жовтня 2026',
    verifyId: 'LF-9c159fuqql',
    verifyUrl: 'https://training.linuxfoundation.org/certification/verify/',
    skills: ['Rust', 'Ownership & Borrowing', 'Memory Safety', 'Concurrency', 'Cargo', 'Low-level Systems'],
    fileUrl: '/cert/1.pdf',
    fileName: 'Linux-Foundation-Rust-LFEL1002.pdf',
    previewSvg: '/cert/1.svg',
    badgeBg: 'bg-orange-600',
    badgeText: 'text-orange-600 dark:text-orange-400',
    status: 'verified',
  },
  {
    id: 'lf-auth-1004',
    issuerId: 'linux-foundation',
    issuerName: 'The Linux Foundation',
    category: 'security',
    code: 'LFEL1004',
    codeShort: 'AUTH',
    title: 'Authentication and Authorization for Web/API',
    description: 'Архітектура та промислові стандарти безпеки веб-сервісів: протоколи авторизації OAuth 2.0 та федеративної ідентифікації OpenID Connect (OIDC), цифрові підписи JWT токенів, політики контролю доступу RBAC та ABAC, захист REST & RPC API.',
    date: '11 Жовтня 2026',
    verifyId: 'LF-mvqoqvupix',
    verifyUrl: 'https://training.linuxfoundation.org/certification/verify/',
    skills: ['OAuth 2.0', 'OpenID Connect', 'JWT Tokens', 'API Security', 'RBAC & ABAC', 'CORS & Headers'],
    fileUrl: '/cert/2.pdf',
    fileName: 'Linux-Foundation-Auth-Web-API-LFEL1004.pdf',
    previewSvg: '/cert/2.svg',
    badgeBg: 'bg-blue-600',
    badgeText: 'text-blue-600 dark:text-blue-400',
    status: 'verified',
  },
  {
    id: 'lf-oss-105',
    issuerId: 'linux-foundation',
    issuerName: 'The Linux Foundation',
    category: 'governance',
    code: 'LFC105',
    codeShort: 'OSS',
    title: 'Antitrust Laws and OSS Project Management and Participation',
    description: 'Правові аспекти, антимонопольне регулювання та міжнародні стандарти управління проектами з відкритим вихідним кодом. Моделі консорціумів, комплаєнс ліцензування (GPL, Apache, MIT), відкрите управління та захист інтелектуальної власності.',
    date: '11 Жовтня 2026',
    verifyId: 'LF-7ooankiew0',
    verifyUrl: 'https://training.linuxfoundation.org/certification/verify/',
    skills: ['Open Source Governance', 'Antitrust Compliance', 'OSS Licensing', 'Community Stewardship', 'Consortium Standards'],
    fileUrl: '/cert/3.pdf',
    fileName: 'Linux-Foundation-Antitrust-OSS-LFC105.pdf',
    previewSvg: '/cert/3.svg',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-emerald-600 dark:text-emerald-400',
    status: 'verified',
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'Всі напрямки' },
  { id: 'systems', label: 'Rust & Системна розробка' },
  { id: 'security', label: 'Кібербезпека & Веб/API' },
  { id: 'governance', label: 'Open Source & Управління' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'networking', label: 'Мережі' },
] as const;
