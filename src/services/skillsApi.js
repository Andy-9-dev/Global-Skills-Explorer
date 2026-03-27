/**
 * Skills & Trends Service
 * Fetches trending skills from GitHub and other sources
 */

import { fetchGitHubTrending } from './apiClient'

/**
 * Map programming languages to skill categories
 */
const languageToSkills = {
  'javascript': ['React', 'Node.js', 'Vue.js', 'Angular', 'TypeScript'],
  'python': ['Django', 'Flask', 'FastAPI', 'Data Science', 'Machine Learning'],
  'typescript': ['React', 'Next.js', 'NestJS', 'Angular', 'GraphQL'],
  'go': ['Microservices', 'Cloud Infrastructure', 'DevOps', 'Kubernetes'],
  'rust': ['Systems Programming', 'WebAssembly', 'Performance', 'Safety'],
  'java': ['Spring Boot', 'Enterprise', 'Microservices', 'Android'],
  'kotlin': ['Android', 'JVM', 'Coroutines', 'Functional Programming'],
  'swift': ['iOS', 'macOS', 'SwiftUI', 'Mobile Development'],
  'csharp': ['.NET', 'Azure', 'Enterprise', 'Game Development'],
  'php': ['Laravel', 'Symfony', 'WordPress', 'Web Development']
}

/**
 * Fetch trending skills from GitHub
 */
export const fetchTrendingSkills = async (language = 'javascript') => {
  try {
    const { data: repos, error } = await fetchGitHubTrending(language)
    
    if (error) {
      return { data: getMockTrendingSkills(), error }
    }

    // Extract skills from trending repos
    const skills = languageToSkills[language.toLowerCase()] || []
    
    return {
      data: {
        language,
        skills,
        trending: repos.slice(0, 5).map(repo => ({
          name: repo.name,
          url: repo.url,
          stars: repo.stars,
          description: repo.description
        }))
      },
      error: null
    }
  } catch (error) {
    return { data: getMockTrendingSkills(), error: error.message }
  }
}

/**
 * Get all trending skills across languages
 */
export const fetchAllTrendingSkills = async () => {
  const languages = ['javascript', 'python', 'typescript', 'go', 'rust']
  
  try {
    const results = await Promise.all(
      languages.map(lang => fetchTrendingSkills(lang))
    )

    const allSkills = results.reduce((acc, result) => {
      if (result.data && result.data.skills) {
        return [...acc, ...result.data.skills]
      }
      return acc
    }, [])

    // Remove duplicates and sort by frequency
    const uniqueSkills = [...new Set(allSkills)]

    return {
      data: {
        skills: uniqueSkills,
        byLanguage: results.map(r => r.data)
      },
      error: null
    }
  } catch (error) {
    return { data: getMockAllTrendingSkills(), error: error.message }
  }
}

/**
 * Get skill proficiency levels
 */
export const fetchSkillProficiency = async (userId) => {
  // Mock data - in real scenario would fetch from backend
  return {
    data: [
      { skill: 'React', level: 'Expert', percentage: 90 },
      { skill: 'TypeScript', level: 'Advanced', percentage: 85 },
      { skill: 'Node.js', level: 'Advanced', percentage: 80 },
      { skill: 'AWS', level: 'Intermediate', percentage: 65 },
      { skill: 'Docker', level: 'Intermediate', percentage: 60 },
      { skill: 'GraphQL', level: 'Beginner', percentage: 40 }
    ],
    error: null
  }
}

/**
 * Get skill recommendations based on career path
 */
export const fetchSkillRecommendations = async (currentRole, targetRole) => {
  const recommendations = {
    'Junior Developer': {
      'Senior Developer': [
        { skill: 'System Design', priority: 'High', resources: 5 },
        { skill: 'Leadership', priority: 'High', resources: 3 },
        { skill: 'Architecture Patterns', priority: 'Medium', resources: 4 }
      ],
      'Frontend Developer': [
        { skill: 'Advanced CSS', priority: 'High', resources: 3 },
        { skill: 'Performance Optimization', priority: 'High', resources: 4 },
        { skill: 'Accessibility', priority: 'Medium', resources: 2 }
      ]
    },
    'Frontend Developer': {
      'Senior Frontend Developer': [
        { skill: 'System Design', priority: 'High', resources: 5 },
        { skill: 'Team Leadership', priority: 'High', resources: 3 },
        { skill: 'Full Stack Basics', priority: 'Medium', resources: 4 }
      ]
    }
  }

  return {
    data: recommendations[currentRole]?.[targetRole] || [],
    error: null
  }
}

/**
 * Mock data
 */
const getMockTrendingSkills = () => ({
  language: 'javascript',
  skills: ['React', 'Node.js', 'Vue.js', 'Angular', 'TypeScript'],
  trending: [
    {
      name: 'react',
      url: 'https://github.com/facebook/react',
      stars: 200000,
      description: 'A JavaScript library for building user interfaces'
    },
    {
      name: 'next.js',
      url: 'https://github.com/vercel/next.js',
      stars: 120000,
      description: 'The React Framework for Production'
    }
  ]
})

const getMockAllTrendingSkills = () => ({
  skills: [
    'React', 'Node.js', 'TypeScript', 'Python', 'Django',
    'Go', 'Kubernetes', 'AWS', 'Docker', 'GraphQL',
    'Vue.js', 'Angular', 'FastAPI', 'Rust', 'WebAssembly'
  ],
  byLanguage: [
    { language: 'javascript', skills: ['React', 'Node.js', 'Vue.js'] },
    { language: 'python', skills: ['Django', 'FastAPI', 'Data Science'] },
    { language: 'typescript', skills: ['React', 'Next.js', 'NestJS'] }
  ]
})

export default {
  fetchTrendingSkills,
  fetchAllTrendingSkills,
  fetchSkillProficiency,
  fetchSkillRecommendations
}
