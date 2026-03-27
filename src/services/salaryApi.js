/**
 * Salary Data Service
 * Provides salary trends, benchmarks, and role-based estimates
 */

/**
 * Get salary trends data
 */
export const fetchSalaryTrends = async () => {
  // Mock salary trend data (in real scenario, would fetch from Adzuna or similar)
  return {
    data: {
      role: 'Senior Software Engineer',
      location: 'Worldwide Avg.',
      trend: '+18.5%',
      data: [
        { year: 2019, salary: 95000 },
        { year: 2020, salary: 105000 },
        { year: 2021, salary: 125000 },
        { year: 2022, salary: 135000 },
        { year: 2023, salary: 155000 },
        { year: 2024, salary: 165000 }
      ]
    },
    error: null
  }
}

/**
 * Get top paying companies
 */
export const fetchTopPayingCompanies = async () => {
  return {
    data: [
      {
        id: 1,
        name: 'CloudScale Dynamics',
        salary: '$210k+',
        skills: 'React, Node.js, Kubernetes',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-1NpbU7nqwU4XV1ix68ioJqjhJQkDpf7Znn84xayq18QXVb1dcJ47DFRZIpUbetGX8IN7ST2IXDlwaQrXwFnUrnYmzYbvkNkE1E0TOI664yOO3qYUoxql0AUr8cjGDvl4wC3usaN5MAv3I9gxft2jCzcm4Ixw1SgykBPP9uN89pmKmaihy_l0QLX9_ge7A6ETUm9EjOF0cJFlL769Vh53jNK3MwuZo-ZhndVSfVSJlkjDy-mRF-YYJNsv8bWnAaYh41zvRJ9_N-i6'
      },
      {
        id: 2,
        name: 'DataNexus Global',
        salary: '$195k+',
        skills: 'React, AWS, Python',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHfh5sKB1H2Vud-ZN9LOqVKz_3yK58buBHMy3J6mqPetlGactrh5qRC1thwbCHiTm1pBWXdyqy768q1W9HjdVTT_T9kspjM_0V5dTrdSNU1CGv_lI1Z2coX-6MAkmYes094MHnHu3xKPcLibUeCXycyHWsqFhClvbvDuU_t0QywRI-U6DHKlgkr0bFEAm1q0MLnl8lsX5idkQgXtcYFpibWs610fSaDdCkexbNwFPZz6ganAOKeXO8UiPUjRFRM04NlIV47Ewwe_EX'
      },
      {
        id: 3,
        name: 'EcoTech Systems',
        salary: '$188k+',
        skills: 'Fullstack React/Node',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLmJLcCvMi3z9O0m6kenn971QaxfCtU9z4Gez9gnh6cOPU2rHm1bUr7eTqlkxKmelaTsNMf4TzY60P0nKG1CtEKgE4yo-kO7432Xxnu8QSP0A8aZGdL__72kNZGIit2pzMfGZnW35ESqoupPVfIswsRCSsY0fNi9SoStMw_YKeAJ_yON2GNd0s2W8KYPQAs8Whfn7EmFZ04UZNQoON4olQ1Qn7vSNWMTTV_01pUdamCEymmlXYbABoa-pDyEj3scMLUm-yF7UNcOz2'
      },
      {
        id: 4,
        name: 'Vanguard Labs',
        salary: '$182k+',
        skills: 'Next.js, TypeScript, AWS',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTDeI6oV7RsrdYyrM6unszy0pvSXTmEY13TUSe-4zns_4stHkZtFWVKCLMCReZZcyMarHLaY9Qx6jNTUQL72gfdVZ8tdvs-EfMOTUktf-6ZqSheDoin7ym9VG_VuxG8kcRpXN8QyUQSLkl8wJd6Fl5psZJzIYV2NidNBLtYE0HKkzlWQgTJH_mz0XpULVosfVPDlq-n5cUVYzpVDQDGSFy_Ir4sTpqAeFmmVRpXPwnL2YYCPUS-iJGFg_Flednb35Y1Q1t-DCr1ecQ'
      }
    ],
    error: null
  }
}

/**
 * Calculate salary estimate based on role, experience, and skills
 */
export const calculateSalaryEstimate = (role, experience, skills) => {
  const baseRoles = {
    'Backend Engineer': 120000,
    'Frontend Engineer': 115000,
    'Data Scientist': 130000,
    'DevOps Specialist': 125000,
    'Full Stack Engineer': 122000
  }

  const basesalary = baseRoles[role] || 100000
  const experienceMultiplier = 1 + (experience * 0.05) // 5% per year
  const skillBonus = skills.length * 5000 // $5k per skill

  const minSalary = Math.round(basesalary * experienceMultiplier)
  const maxSalary = Math.round((basesalary * experienceMultiplier) + skillBonus)

  return {
    min: minSalary,
    max: maxSalary,
    formatted: `$${Math.round(minSalary / 1000)}k - $${Math.round(maxSalary / 1000)}k`
  }
}

/**
 * Get salary benchmarks by role
 */
export const fetchSalaryBenchmarks = async () => {
  return {
    data: [
      { role: 'Software Engineer (L4)', range: '$140k - $190k', percentage: 85 },
      { role: 'Product Manager', range: '$130k - $175k', percentage: 78 },
      { role: 'UX Designer', range: '$110k - $160k', percentage: 70 },
      { role: 'DevOps Engineer', range: '$145k - $205k', percentage: 90 }
    ],
    error: null
  }
}

/**
 * Get cost of living data by city
 */
export const fetchCostOfLivingData = async () => {
  return {
    data: [
      { city: 'San Francisco', level: 'Very High', color: 'text-rose-500', score: 9.2 },
      { city: 'London', level: 'High', color: 'text-orange-500', score: 8.5 },
      { city: 'Berlin', level: 'Moderate', color: 'text-emerald-500', score: 8.9 },
      { city: 'Bangalore', level: 'Low', color: 'text-emerald-500', score: 7.2 },
      { city: 'Toronto', level: 'High', color: 'text-orange-500', score: 8.1 },
      { city: 'Singapore', level: 'Very High', color: 'text-rose-500', score: 8.8 }
    ],
    error: null
  }
}

export default {
  fetchSalaryTrends,
  fetchTopPayingCompanies,
  calculateSalaryEstimate,
  fetchSalaryBenchmarks,
  fetchCostOfLivingData
}
