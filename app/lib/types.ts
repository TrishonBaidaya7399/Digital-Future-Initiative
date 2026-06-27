export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: Record<string, string>;
  hero: Record<string, string>;
  whyWeStarted: {
    title: string;
    content: string;
    items: Array<{ label: string; desc: string }>;
  };
  vision: {
    title: string;
    content: string;
    items: string[];
  };
  roadmap: {
    title: string;
    phases: Array<{
      name: string;
      title: string;
      items: string[];
    }>;
  };
  partners: {
    title: string;
    disclaimer: string;
    names: string[];
  };
  donationImpact: {
    title: string;
    cards: Array<{ amount: string; unit: string; desc: string }>;
  };
  donationMethods: {
    title: string;
    copy: string;
    copied: string;
    merchantAccount: string;
    payment: string;
    bkash: { name: string; number: string; merchantName: string };
    nogod: { name: string; number: string; merchantName: string };
    bank: { name: string; accountName: string; accountNumber: string; bankName: string; branch: string; details: string };
  };
  progress: {
    title: string;
    computers: Record<string, string>;
    money: Record<string, string>;
    transparency: {
      title: string;
      reports: string;
      expenses: string;
      photos: string;
      invoices: string;
      equipment: string;
      drive: string;
    };
  };
  gallery: { title: string };
  whyDonate: {
    title: string;
    items: Array<{ title: string; desc: string }>;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  volunteer: Record<string, string>;
  footerCTA: Record<string, string>;
  footer: Record<string, string>;
}
