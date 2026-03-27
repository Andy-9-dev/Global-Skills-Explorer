// Mock search dataset - replace with real API calls later

export const searchJobs = [
  { id: 'j1', title: 'Senior React Developer', company: 'Tech Startup', location: 'Lagos, Nigeria', skills: ['React', 'TypeScript', 'Node.js'] },
  { id: 'j2', title: 'Full Stack Engineer', company: 'Digital Agency', location: 'Abuja, Nigeria', skills: ['React', 'Python', 'PostgreSQL'] },
  { id: 'j3', title: 'DevOps Engineer', company: 'Cloud Services', location: 'Remote', skills: ['Docker', 'Kubernetes', 'AWS'] },
  { id: 'j4', title: 'Data Scientist', company: 'Analytics Corp', location: 'Remote', skills: ['Python', 'ML', 'TensorFlow'] },
  { id: 'j5', title: 'Machine Learning Engineer', company: 'AI Innovations', location: 'Remote', skills: ['Python', 'PyTorch', 'AWS'] },
  { id: 'j6', title: 'Backend Developer', company: 'FinTech Solutions', location: 'Lagos, Nigeria', skills: ['Node.js', 'PostgreSQL', 'Redis'] },
  { id: 'j7', title: 'Cloud Architect', company: 'Infrastructure Pro', location: 'Lagos, Nigeria', skills: ['AWS', 'Terraform', 'Kubernetes'] },
  { id: 'j8', title: 'Mobile App Developer', company: 'Mobile First Inc', location: 'Abuja, Nigeria', skills: ['Flutter', 'React Native', 'Swift'] },
  { id: 'j9', title: 'Security Engineer', company: 'CyberSec Ltd', location: 'Lagos, Nigeria', skills: ['Penetration Testing', 'AWS', 'Linux'] },
  { id: 'j10', title: 'Blockchain Developer', company: 'Crypto Ventures', location: 'Remote', skills: ['Solidity', 'Web3', 'Rust'] },
  { id: 'j11', title: 'UX/UI Designer', company: 'Design Studio', location: 'Ibadan, Nigeria', skills: ['Figma', 'Prototyping', 'CSS'] },
  { id: 'j12', title: 'Product Manager', company: 'SaaS Company', location: 'Lagos, Nigeria', skills: ['Agile', 'Roadmapping', 'Analytics'] },
]

export const searchCountries = [
  { id: 'c1', name: 'Nigeria', skills: ['React', 'Python', 'Node.js', 'DevOps'], demand: 'High', lat: 9.082, lng: 8.6753 },
  { id: 'c2', name: 'United States', skills: ['React', 'AWS', 'Machine Learning', 'Go'], demand: 'Very High', lat: 37.0902, lng: -95.7129 },
  { id: 'c3', name: 'United Kingdom', skills: ['Python', 'Kubernetes', 'TypeScript'], demand: 'High', lat: 55.3781, lng: -3.4360 },
  { id: 'c4', name: 'Germany', skills: ['Java', 'Kubernetes', 'DevOps', 'Rust'], demand: 'High', lat: 51.1657, lng: 10.4515 },
  { id: 'c5', name: 'Canada', skills: ['React', 'Python', 'AWS', 'Data Science'], demand: 'High', lat: 56.1304, lng: -106.3468 },
  { id: 'c6', name: 'India', skills: ['React', 'Python', 'Java', 'DevOps'], demand: 'Very High', lat: 20.5937, lng: 78.9629 },
  { id: 'c7', name: 'Australia', skills: ['React', 'Python', 'AWS', 'Go'], demand: 'Medium', lat: -25.2744, lng: 133.7751 },
  { id: 'c8', name: 'South Africa', skills: ['React', 'Node.js', 'Python'], demand: 'Medium', lat: -30.5595, lng: 22.9375 },
  { id: 'c9', name: 'Kenya', skills: ['React', 'Python', 'Mobile'], demand: 'Growing', lat: -0.0236, lng: 37.9062 },
  { id: 'c10', name: 'Brazil', skills: ['React', 'Java', 'Python', 'Node.js'], demand: 'High', lat: -14.235, lng: -51.9253 },
]

// Unified search across jobs and countries
export const runSearch = (query) => {
  if (!query.trim()) return { jobs: [], countries: [] }
  const q = query.toLowerCase()
  return {
    jobs: searchJobs.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q) ||
      j.skills.some(s => s.toLowerCase().includes(q))
    ),
    countries: searchCountries.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.skills.some(s => s.toLowerCase().includes(q))
    )
  }
}
