// Career path mock data — replace fetch calls with real API later

export const roles = [
  {
    id: 'r1',
    title: 'Junior Developer',
    level: 'Level 1',
    levelNum: 1,
    duration: '1–2 years',
    salaryRange: '$45k – $65k',
    status: 'completed',
    skills: ['HTML/CSS', 'JavaScript ES6', 'Git Basics', 'REST APIs'],
    description: 'Entry-level role focused on building foundational web development skills and contributing to team projects under guidance.',
    timeToNext: '~1.5 years'
  },
  {
    id: 'r2',
    title: 'Frontend Developer',
    level: 'Level 2',
    levelNum: 2,
    duration: '2–3 years',
    salaryRange: '$65k – $95k',
    status: 'completed',
    skills: ['React Core', 'Redux/Context', 'Unit Testing', 'TypeScript', 'CSS-in-JS'],
    description: 'Mid-level role owning feature development end-to-end, writing tests, and collaborating closely with design and backend teams.',
    timeToNext: '~2 years'
  },
  {
    id: 'r3',
    title: 'Senior React Developer',
    level: 'Level 3',
    levelNum: 3,
    duration: '3+ years',
    salaryRange: '$95k – $135k',
    status: 'current',
    progress: 85,
    skills: [
      { name: 'Design Patterns', completed: true },
      { name: 'Performance Opt.', completed: true },
      { name: 'CI/CD Pipelines', completed: false },
      { name: 'Code Reviews', completed: true }
    ],
    description: 'Senior individual contributor leading technical decisions, mentoring juniors, and driving architecture within a team.',
    timeToNext: '~1.5 years'
  },
  {
    id: 'r4',
    title: 'Senior React Architect',
    level: 'Level 4',
    levelNum: 4,
    duration: 'Target role',
    salaryRange: '$145k – $185k',
    status: 'next',
    skills: ['Micro-frontends', 'Cloud Infrastructure', 'Strategic Leadership', 'System Design', 'Next.js Advanced'],
    description: 'Technical leader responsible for cross-team architecture decisions, platform strategy, and engineering culture.',
    timeToNext: null
  },
  {
    id: 'r5',
    title: 'Engineering Manager',
    level: 'Level 5',
    levelNum: 5,
    duration: 'Alternative path',
    salaryRange: '$160k – $220k',
    status: 'future',
    skills: ['People Management', 'Roadmap Planning', 'Hiring', 'OKRs', 'Stakeholder Comms'],
    description: 'People-focused leadership role managing a team of engineers, owning delivery, and growing talent.',
    timeToNext: null
  }
]

export const paths = [
  { from: 'r1', to: 'r2' },
  { from: 'r2', to: 'r3' },
  { from: 'r3', to: 'r4' },
  { from: 'r3', to: 'r5' }
]

export const skillGaps = [
  { skill: 'System Design', status: 'required', color: 'amber' },
  { skill: 'Micro-frontends', status: 'required', color: 'red' },
  { skill: 'Next.js Advanced', status: 'learning', color: 'emerald' }
]

export const recommendedCourses = [
  {
    title: 'Enterprise React Patterns',
    provider: 'Frontend Masters',
    duration: '14h',
    type: 'video',
    gradient: 'from-primary/30 to-blue-500/30'
  },
  {
    title: 'Scalable Frontend Architecture',
    provider: "O'Reilly",
    duration: '8 modules',
    type: 'book',
    gradient: 'from-emerald-400/30 to-teal-500/30'
  }
]
