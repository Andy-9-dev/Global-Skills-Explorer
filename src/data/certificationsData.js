// Mock certifications data - structured for API replacement
export const allCertifications = [
  {
    id: 'aws-developer-associate',
    title: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services',
    difficulty: 'Intermediate',
    duration: '4 weeks',
    skills: ['AWS', 'Cloud Computing', 'DevOps'],
    progress: 100,
    status: 'completed',
    issued: 'Oct 2023',
    expires: 'Oct 2026',
    logo: 'AWS',
    logoBg: 'bg-orange-500',
    description: 'Validate your ability to develop and maintain applications on AWS. This certification demonstrates proficiency in AWS services and best practices.',
    certificateUrl: '#'
  },
  {
    id: 'meta-frontend-pro',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta via Coursera',
    difficulty: 'Intermediate',
    duration: '3 months',
    skills: ['React', 'JavaScript', 'Web Development', 'CSS'],
    progress: 100,
    status: 'completed',
    issued: 'Jan 2024',
    expires: 'No expiration',
    logo: 'Meta',
    logoBg: 'bg-blue-600',
    description: 'Learn to build responsive websites and web applications using React. Master modern front-end development practices.',
    certificateUrl: '#'
  },
  {
    id: 'terraform-associate',
    title: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    difficulty: 'Beginner',
    duration: '2 weeks',
    skills: ['Terraform', 'Infrastructure as Code', 'DevOps'],
    progress: 100,
    status: 'completed',
    issued: 'Dec 2023',
    expires: 'Dec 2025',
    logo: 'HC',
    logoBg: 'bg-purple-600',
    description: 'Demonstrate your knowledge of Terraform and infrastructure as code principles. Essential for DevOps professionals.',
    certificateUrl: '#'
  },
  {
    id: 'gcp-digital-leader',
    title: 'Google Cloud Digital Leader',
    issuer: 'Google Cloud',
    difficulty: 'Beginner',
    duration: '40 hours',
    skills: ['Google Cloud', 'Cloud Computing', 'Digital Transformation'],
    progress: 65,
    status: 'in_progress',
    issued: null,
    expires: null,
    logo: 'GCP',
    logoBg: 'bg-red-500',
    description: 'Understand cloud computing fundamentals and Google Cloud services. Perfect for business decision-makers.',
    certificateUrl: '#'
  },
  {
    id: 'azure-architect',
    title: 'Azure Solutions Architect Expert',
    issuer: 'Microsoft',
    difficulty: 'Advanced',
    duration: '120 hours',
    skills: ['Azure', 'Cloud Architecture', 'Enterprise Solutions'],
    progress: 30,
    status: 'in_progress',
    issued: null,
    expires: null,
    logo: 'Azure',
    logoBg: 'bg-blue-500',
    description: 'Design and implement solutions on Microsoft Azure. Advanced certification for architects and senior engineers.',
    certificateUrl: '#'
  },
  {
    id: 'kubernetes-cka',
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Linux Foundation',
    difficulty: 'Advanced',
    duration: '60 hours',
    skills: ['Kubernetes', 'Container Orchestration', 'DevOps'],
    progress: 0,
    status: 'not_started',
    issued: null,
    expires: null,
    logo: 'K8s',
    logoBg: 'bg-blue-700',
    description: 'Demonstrate your ability to manage Kubernetes clusters in production environments.',
    certificateUrl: '#'
  },
  {
    id: 'python-professional',
    title: 'Python Professional Certificate',
    issuer: 'Google via Coursera',
    difficulty: 'Intermediate',
    duration: '6 months',
    skills: ['Python', 'Programming', 'Data Analysis'],
    progress: 0,
    status: 'not_started',
    issued: null,
    expires: null,
    logo: 'Py',
    logoBg: 'bg-yellow-600',
    description: 'Master Python programming from basics to advanced concepts. Ideal for data science and backend development.',
    certificateUrl: '#'
  },
  {
    id: 'scrum-master',
    title: 'Certified Scrum Master (CSM)',
    issuer: 'Scrum Alliance',
    difficulty: 'Beginner',
    duration: '2 days',
    skills: ['Agile', 'Scrum', 'Project Management'],
    progress: 0,
    status: 'not_started',
    issued: null,
    expires: null,
    logo: 'SM',
    logoBg: 'bg-green-600',
    description: 'Learn to facilitate Scrum teams and deliver value through agile methodologies.',
    certificateUrl: '#'
  }
]

export const recommendedCertifications = [
  {
    id: 'gcp-digital-leader',
    title: 'Google Cloud Digital Leader',
    description: 'Cloud Fundamentals • 40h estimated study',
    icon: 'cloud',
    matchScore: 94,
    reason: 'Complements your AWS knowledge'
  },
  {
    id: 'azure-architect',
    title: 'Azure Solutions Architect Expert',
    description: 'Advanced Architecture • 120h estimated study',
    icon: 'architecture',
    matchScore: 82,
    reason: 'Next step in cloud expertise'
  },
  {
    id: 'kubernetes-cka',
    title: 'Certified Kubernetes Administrator',
    description: 'Container Orchestration • 60h estimated study',
    icon: 'settings_cluster',
    matchScore: 78,
    reason: 'Aligns with DevOps skills'
  }
]

export const getCertificationById = (id) => {
  return allCertifications.find(cert => cert.id === id)
}

export const filterCertifications = (query, filters = {}) => {
  let results = allCertifications

  // Search query
  if (query) {
    const q = query.toLowerCase()
    results = results.filter(cert =>
      cert.title.toLowerCase().includes(q) ||
      cert.issuer.toLowerCase().includes(q) ||
      cert.skills.some(skill => skill.toLowerCase().includes(q))
    )
  }

  // Filter by status
  if (filters.status) {
    results = results.filter(cert => cert.status === filters.status)
  }

  // Filter by difficulty
  if (filters.difficulty) {
    results = results.filter(cert => cert.difficulty === filters.difficulty)
  }

  // Filter by skill
  if (filters.skill) {
    results = results.filter(cert =>
      cert.skills.some(s => s.toLowerCase() === filters.skill.toLowerCase())
    )
  }

  return results
}

export const getCertificationsByStatus = (status) => {
  return allCertifications.filter(cert => cert.status === status)
}
