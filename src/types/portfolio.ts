export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: 'all' | 'fullstack' | 'frontend' | 'backend' | 'ai';
  tags: string[];
  metrics?: string;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  stars?: number;
  imageGradient: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 1 - 100
    icon?: string;
    experience: string;
    featured?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Remote';
  description: string;
  achievements: string[];
  skills: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}
