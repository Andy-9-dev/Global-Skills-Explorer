// Mock company data - API-ready structure
// This can be replaced with real API calls to LinkedIn, Glassdoor, Crunchbase, etc.

// Mock company data - API-ready structure with 200+ companies
// This can be replaced with real API calls to LinkedIn, Glassdoor, Crunchbase, etc.

const generateCompanyData = () => {
  const companyTypes = ['Systems', 'Tech', 'Digital', 'Innovation', 'Solutions', 'Labs', 'Dynamics', 'Corp', 'Inc', 'Ltd'];
  const companyPrefixes = ['Tech', 'Data', 'Cloud', 'Smart', 'Future', 'Next', 'Quantum', 'Cyber', 'AI', 'Blockchain', 'Green', 'Blue', 'Red', 'Silver', 'Gold', 'Prime', 'Elite', 'Pro', 'Ultra', 'Mega'];
  const locations = [
    'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Boston, MA',
    'London, UK', 'Berlin, DE', 'Paris, FR', 'Amsterdam, NL', 'Stockholm, SE',
    'Toronto, CA', 'Vancouver, CA', 'Sydney, AU', 'Melbourne, AU', 'Singapore, SG',
    'Tokyo, JP', 'Seoul, KR', 'Bangalore, IN', 'Mumbai, IN', 'Tel Aviv, IL'
  ];
  const sizes = ['50-100 Employees', '100-250 Employees', '250-500 Employees', '500-1000 Employees', '1000+ Employees'];
  const policies = ['Remote First', 'Hybrid', 'Remote Friendly', 'On-site'];
  const icons = ['cloud_done', 'eco', 'bolt', 'hub', 'rocket_launch', 'psychology', 'security', 'analytics', 'api', 'code'];
  const iconBgs = ['bg-blue-50', 'bg-emerald-50', 'bg-orange-50', 'bg-purple-50', 'bg-red-50', 'bg-green-50', 'bg-yellow-50', 'bg-pink-50', 'bg-indigo-50', 'bg-teal-50'];
  const iconColors = ['text-blue-600', 'text-emerald-600', 'text-orange-600', 'text-purple-600', 'text-red-600', 'text-green-600', 'text-yellow-600', 'text-pink-600', 'text-indigo-600', 'text-teal-600'];

  const companies = {};

  for (let i = 0; i < 200; i++) {
    const prefix = companyPrefixes[i % companyPrefixes.length];
    const suffix = companyTypes[i % companyTypes.length];
    const name = `${prefix}${i > 19 ? ` ${Math.floor(i/20)}` : ''} ${suffix}`;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    companies[slug] = {
      name,
      slug,
      description: `${name} is ${i % 2 === 0 ? 'revolutionizing' : 'transforming'} the ${i % 3 === 0 ? 'future of technology' : i % 3 === 1 ? 'digital landscape' : 'way we work'} through ${i % 4 === 0 ? 'innovative solutions' : i % 4 === 1 ? 'cutting-edge technology' : i % 4 === 2 ? 'advanced AI systems' : 'scalable platforms'}.`,
      location: `${locations[i % locations.length]} (HQ)`,
      size: sizes[i % sizes.length],
      remotePolicy: policies[i % policies.length],
      hiringNow: i % 3 !== 0,
      icon: icons[i % icons.length],
      iconBg: iconBgs[i % iconBgs.length],
      iconColor: iconColors[i % iconColors.length],
      cultureImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpLeyylbf-1U04VhRKcpY6cFkQ15KnCejUChM7pucZkzx5evLtwg2OoWynl6MRBb8Z51dOAur1V0k7Yowpj3XKmwH3zUVaDfDguUQrnpGI3Fv7O2kBW98LlfKN9mrMQMgMr4wRWo9gUI9AqOPPrwtVyq4OzRasCfIqo8JDPRhQ-_76op76qanlfMykPwBWIGHw3u1_1lTFG2pvaah7nFke-kLhRM1w4fatxE59pCf1K4xneq14Ec0DYCsKLW4NVAk_DKGa9ESaZ8I8',
      locationImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlV4mLghjdSkDlnuqoN0tLaSrmTvlsjJy0X1iywUez-nOvupuX4xJmHnIl7K4ZenY79aHb9cHIGYPHLCv_j4v4oaonZy1qT6FVYhX3t1J_JZrrPSGrmSNSsV6knov1RTBioqetAoT1xpcGAVEmxRqdlBLPNcX9O_4_DMkG0gYhcbAvj3qfoyL_vJIGqi41lqHU9A6hY6ILPkweHkY0hapVYHXH5G9sXua28-eWfrqgAKX-183pQ2dA9JqTEUqc7WQUzrZHzgFQd8MJ',
      address: `${100 + i} ${['Main St', 'Tech Ave', 'Innovation Blvd', 'Digital Way', 'Future Rd'][i % 5]}, Suite ${200 + (i * 10)}\n${locations[i % locations.length]}`,
      values: [
        `${['Innovation', 'Excellence', 'Collaboration', 'Transparency', 'Growth'][i % 5]} driven culture.`,
        `${['Continuous learning', 'Professional development', 'Work-life balance', 'Team collaboration', 'Innovation'][i % 5]} focus.`,
        `${['Equity for all', 'Remote flexibility', 'Health benefits', 'Learning budget', 'Career growth'][i % 5]} commitment.`
      ],
      growthStats: [
        { label: 'Yearly Growth', value: `${25 + (i % 50)}%` },
        { label: 'Retention', value: `${85 + (i % 15)}%` },
        { label: 'Avg Tenure', value: `${2 + (i % 3)}.${i % 10}y` },
        { label: 'Nationalities', value: `${10 + (i % 20)}+` }
      ],
      salaryBenchmarks: [
        { role: 'Software Engineer', range: `$${100 + (i % 50)}k - $${150 + (i % 80)}k`, percentage: 75 + (i % 20) },
        { role: 'Senior Engineer', range: `$${130 + (i % 40)}k - $${180 + (i % 70)}k`, percentage: 80 + (i % 15) },
        { role: 'Product Manager', range: `$${120 + (i % 45)}k - $${170 + (i % 60)}k`, percentage: 78 + (i % 17) },
        { role: 'DevOps Engineer', range: `$${125 + (i % 50)}k - $${185 + (i % 75)}k`, percentage: 82 + (i % 18) }
      ],
      openRoles: Array.from({ length: Math.min(5, 1 + (i % 8)) }, (_, roleIndex) => ({
        id: roleIndex + 1,
        title: [
          'Senior Full Stack Engineer', 'Frontend Developer', 'Backend Engineer', 'DevOps Specialist',
          'Product Designer', 'Data Scientist', 'Mobile Developer', 'QA Engineer'
        ][roleIndex % 8],
        department: ['Engineering', 'Product', 'Design', 'Data', 'Mobile', 'Quality'][roleIndex % 6],
        location: i % 3 === 0 ? 'Remote' : i % 3 === 1 ? 'Hybrid' : locations[i % locations.length].split(',')[0],
        isNew: roleIndex < 2,
        skills: [
          ['React', 'TypeScript', 'Node.js'],
          ['Vue.js', 'Python', 'AWS'],
          ['Angular', 'Java', 'Docker'],
          ['React Native', 'Swift', 'Kotlin'],
          ['Figma', 'Design Systems', 'Prototyping'],
          ['Python', 'SQL', 'Machine Learning'],
          ['Kubernetes', 'Terraform', 'CI/CD'],
          ['Selenium', 'Jest', 'Cypress']
        ][roleIndex % 8]
      }))
    };
  }

  return companies;
};

export const mockCompanyData = generateCompanyData();

/**
 * Fetch company data by slug
 * @param {string} slug - Company slug (e.g., 'techflow-systems')
 * @returns {object|null} Company data or null if not found
 */
export const getCompanyBySlug = (slug) => {
  return mockCompanyData[slug] || null
}

/**
 * Get all companies
 * @returns {array} Array of all companies
 */
export const getAllCompanies = () => {
  return Object.values(mockCompanyData)
}

/**
 * Search companies by name
 * @param {string} query - Search query
 * @returns {array} Matching companies
 */
export const searchCompanies = (query) => {
  const lowerQuery = query.toLowerCase()
  return Object.values(mockCompanyData).filter(company =>
    company.name.toLowerCase().includes(lowerQuery) ||
    company.description.toLowerCase().includes(lowerQuery)
  )
}

// Future API integration examples:
/*
// LinkedIn Company API
export const fetchCompanyFromLinkedIn = async (companyId) => {
  const response = await fetch(`https://api.linkedin.com/v2/companies/${companyId}`, {
    headers: { Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}` }
  })
  return response.json()
}

// Glassdoor API (via proxy)
export const fetchCompanyFromGlassdoor = async (companyName) => {
  const response = await fetch(`/api/glassdoor/companies?name=${companyName}`)
  return response.json()
}

// Crunchbase API
export const fetchCompanyFromCrunchbase = async (companySlug) => {
  const response = await fetch(`https://api.crunchbase.com/v4/entities/companies/${companySlug}`, {
    headers: { 'X-Cb-User-Key': CRUNCHBASE_API_KEY }
  })
  return response.json()
}
*/
