 # Backend API Specification

## Overview

This document outlines the complete API specification for the Career Development Platform backend. The system provides comprehensive career guidance, job search, salary insights, skill assessments, and company information.

## Table of Contents

1. [Authentication & Authorization](#authentication--authorization)
2. [User Management](#user-management)
3. [Dashboard APIs](#dashboard-apis)
4. [Job Search & Postings](#job-search--postings)
5. [Company Information](#company-information)
6. [Career Path & Skills](#career-path--skills)
7. [Salary Insights](#salary-insights)
8. [Skill Assessments](#skill-assessments)
9. [External API Integrations](#external-api-integrations)
10. [Data Models](#data-models)
11. [Error Handling](#error-handling)
12. [Rate Limiting](#rate-limiting)

---

## Authentication & Authorization

### Base URL
```
https://api.careerplatform.com/v1
```

### Authentication Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Auth Endpoints

#### POST /auth/login
Login user with credentials
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "expiresIn": 3600
}
```

#### POST /auth/register
Register new user
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### POST /auth/refresh
Refresh JWT token
```json
{
  "refreshToken": "refresh_token_here"
}
```

#### POST /auth/logout
Logout user (invalidate token)

#### POST /auth/forgot-password
Request password reset
```json
{
  "email": "user@example.com"
}
```

#### POST /auth/reset-password
Reset password with token
```json
{
  "token": "reset_token",
  "password": "new_password",
  "confirmPassword": "new_password"
}
```

---

## User Management

#### GET /users/profile
Get current user profile

**Response:**
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "user@example.com",
  "avatar": "avatar_url",
  "title": "Senior Frontend Engineer",
  "location": "San Francisco, CA",
  "skills": ["React", "TypeScript", "Node.js"],
  "experience": 5,
  "preferences": {
    "remoteWork": true,
    "salaryRange": {
      "min": 120000,
      "max": 180000
    },
    "preferredLocations": ["San Francisco", "New York", "Remote"]
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

#### PUT /users/profile
Update user profile
```json
{
  "name": "John Doe",
  "title": "Senior Frontend Engineer",
  "location": "San Francisco, CA",
  "skills": ["React", "TypeScript", "Node.js"],
  "experience": 5,
  "preferences": {
    "remoteWork": true,
    "salaryRange": {
      "min": 120000,
      "max": 180000
    }
  }
}
```

#### POST /users/avatar
Upload user avatar (multipart/form-data)

#### GET /users/settings
Get user settings

#### PUT /users/settings
Update user settings

---

## Dashboard APIs

#### GET /dashboard/skills-heatmap
Get skills demand heatmap data

**Query Parameters:**
- `skills` (string): Comma-separated list of skills
- `role` (string): Role filter

**Response:**
```json
{
  "countries": [
    {
      "code": "US",
      "name": "United States",
      "flag": "🇺🇸",
      "demand": "High",
      "salary": "$145k",
      "skills": ["React", "Python", "AWS"],
      "jobs": 1248,
      "coordinates": {
        "x": 20,
        "y": 35
      }
    }
  ],
  "skillDemand": [
    {
      "skill": "React",
      "country": "US",
      "demandLevel": "high",
      "percentage": 95,
      "jobCount": 1248
    }
  ]
}
```

#### GET /dashboard/job-postings
Get job postings for dashboard

**Query Parameters:**
- `role` (string): Role filter
- `skills` (string): Comma-separated skills
- `geography` (string): Geography filter
- `limit` (number): Number of results (default: 10)

**Response:**
```json
{
  "jobs": [
    {
      "id": "job_id",
      "title": "Senior React Developer",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "salary": "$150k - $200k",
      "postedAt": "2024-01-15T10:30:00Z",
      "skills": ["React", "TypeScript"],
      "remote": true,
      "url": "https://example.com/job/123"
    }
  ],
  "total": 1248,
  "page": 1,
  "limit": 10
}
```

#### GET /dashboard/salary-insights
Get salary insights by region

**Response:**
```json
{
  "regions": [
    {
      "region": "North America",
      "avgSalary": 145000,
      "currency": "USD",
      "growth": 12,
      "jobCount": 5000
    }
  ],
  "trends": {
    "role": "Senior Software Engineer",
    "location": "Worldwide Avg.",
    "trend": "+18.5%",
    "data": [
      {
        "year": 2024,
        "salary": 165000
      }
    ]
  }
}
```

---

## Job Search & Postings

#### GET /jobs/search
Advanced job search

**Query Parameters:**
- `q` (string): Search query
- `location` (string): Location filter
- `remote` (boolean): Remote jobs only
- `salary_min` (number): Minimum salary
- `salary_max` (number): Maximum salary
- `skills` (string): Required skills (comma-separated)
- `experience` (string): Experience level
- `company_size` (string): Company size
- `page` (number): Page number
- `limit` (number): Results per page

**Response:**
```json
{
  "jobs": [
    {
      "id": "job_id",
      "title": "Senior React Developer",
      "company": {
        "id": "company_id",
        "name": "Tech Corp",
        "logo": "logo_url",
        "size": "100-500"
      },
      "location": "San Francisco, CA",
      "remote": true,
      "salary": {
        "min": 150000,
        "max": 200000,
        "currency": "USD"
      },
      "description": "Job description...",
      "requirements": ["5+ years React", "TypeScript"],
      "benefits": ["Health insurance", "401k"],
      "postedAt": "2024-01-15T10:30:00Z",
      "expiresAt": "2024-02-15T10:30:00Z",
      "applicationUrl": "https://example.com/apply/123"
    }
  ],
  "total": 1248,
  "page": 1,
  "limit": 20,
  "filters": {
    "locations": ["San Francisco", "New York"],
    "skills": ["React", "Python"],
    "companies": ["Tech Corp", "StartupXYZ"]
  }
}
```

#### GET /jobs/:id
Get job details by ID

#### POST /jobs/:id/apply
Apply to a job
```json
{
  "coverLetter": "Cover letter text...",
  "resumeUrl": "resume_url"
}
```

#### GET /jobs/saved
Get user's saved jobs

#### POST /jobs/:id/save
Save a job

#### DELETE /jobs/:id/save
Remove saved job

#### GET /jobs/applications
Get user's job applications

**Response:**
```json
{
  "applications": [
    {
      "id": "application_id",
      "job": {
        "id": "job_id",
        "title": "Senior React Developer",
        "company": "Tech Corp"
      },
      "status": "pending",
      "appliedAt": "2024-01-15T10:30:00Z",
      "lastUpdated": "2024-01-16T10:30:00Z"
    }
  ]
}
```

---

## Company Information

#### GET /companies
Get companies list

**Query Parameters:**
- `q` (string): Search query
- `size` (string): Company size filter
- `location` (string): Location filter
- `hiring` (boolean): Currently hiring filter
- `page` (number): Page number
- `limit` (number): Results per page

**Response:**
```json
{
  "companies": [
    {
      "id": "company_id",
      "name": "TechFlow Systems",
      "slug": "techflow-systems",
      "description": "Company description...",
      "location": "San Francisco, CA",
      "size": "500-1000 Employees",
      "remotePolicy": "Remote Friendly",
      "hiringNow": true,
      "logo": "logo_url",
      "website": "https://company.com",
      "founded": 2015,
      "industry": "Technology"
    }
  ],
  "total": 200,
  "page": 1,
  "limit": 20
}
```

#### GET /companies/:slug
Get company details by slug

**Response:**
```json
{
  "id": "company_id",
  "name": "TechFlow Systems",
  "slug": "techflow-systems",
  "description": "Detailed company description...",
  "location": "San Francisco, CA (HQ)",
  "size": "850 Employees",
  "remotePolicy": "Remote Friendly",
  "hiringNow": true,
  "logo": "logo_url",
  "website": "https://company.com",
  "founded": 2015,
  "industry": "Technology",
  "cultureImages": ["image1_url", "image2_url"],
  "address": "450 Mission St, Suite 200\nSan Francisco, CA 94105",
  "values": [
    "Radical transparency across all levels.",
    "Continuous learning budget ($5k/year)."
  ],
  "growthStats": [
    {
      "label": "Yearly Growth",
      "value": "42%"
    }
  ],
  "salaryBenchmarks": [
    {
      "role": "Software Engineer",
      "range": "$140k - $190k",
      "percentage": 85
    }
  ],
  "openRoles": [
    {
      "id": "role_id",
      "title": "Senior React Developer",
      "department": "Engineering",
      "location": "Remote / SF",
      "isNew": true,
      "skills": ["React", "TypeScript"]
    }
  ],
  "benefits": [
    "Health Insurance",
    "401k Matching",
    "Unlimited PTO"
  ],
  "techStack": ["React", "Node.js", "PostgreSQL", "AWS"]
}
```

#### GET /companies/:id/jobs
Get jobs at specific company

#### GET /companies/:id/reviews
Get company reviews

#### POST /companies/:id/reviews
Submit company review
```json
{
  "rating": 4.5,
  "title": "Great place to work",
  "pros": "Good culture, learning opportunities",
  "cons": "Fast-paced environment",
  "recommendation": true,
  "anonymous": false
}
```

---

## Career Path & Skills

#### GET /career/path
Get user's career path

**Response:**
```json
{
  "currentRole": {
    "title": "Senior React Developer",
    "level": "Level 3",
    "experience": "3+ years"
  },
  "targetRole": {
    "title": "Senior React Architect",
    "level": "Level 4",
    "estimatedTime": "1.5 years"
  },
  "steps": [
    {
      "id": 1,
      "title": "Junior Developer",
      "level": "Level 1",
      "duration": "1.2 years",
      "status": "completed",
      "skills": ["HTML/CSS", "JavaScript ES6", "Git Basics"]
    }
  ],
  "progress": 85
}
```

#### PUT /career/path
Update career path
```json
{
  "targetRole": "Senior React Architect",
  "targetLevel": "Level 4",
  "timeline": "18 months"
}
```

#### GET /career/skill-gaps
Get skill gaps for current milestone

**Response:**
```json
{
  "gaps": [
    {
      "skill": "System Design",
      "status": "required",
      "priority": "high",
      "estimatedTime": "3 months"
    }
  ],
  "recommendations": [
    {
      "skill": "System Design",
      "courses": [
        {
          "title": "System Design Course",
          "provider": "TechEd",
          "duration": "40 hours",
          "rating": 4.8
        }
      ]
    }
  ]
}
```

#### GET /career/recommended-courses
Get recommended courses

**Response:**
```json
{
  "courses": [
    {
      "id": "course_id",
      "title": "Enterprise React Patterns",
      "provider": "Frontend Masters",
      "duration": "14h",
      "type": "video",
      "rating": 4.9,
      "price": 299,
      "url": "https://course-url.com",
      "skills": ["React", "Design Patterns"],
      "difficulty": "Advanced"
    }
  ]
}
```

#### POST /career/active-target
Set active career target
```json
{
  "targetId": "target_id"
}
```

#### GET /career/download-pdf
Generate and download career path PDF

#### GET /skills/trending
Get trending skills

**Query Parameters:**
- `language` (string): Programming language filter
- `timeframe` (string): Time period (week, month, year)

**Response:**
```json
{
  "skills": [
    {
      "name": "React",
      "trend": "up",
      "growth": 15.5,
      "jobCount": 5000,
      "avgSalary": 145000
    }
  ],
  "byLanguage": [
    {
      "language": "JavaScript",
      "skills": ["React", "Vue.js", "Angular"]
    }
  ]
}
```

#### GET /skills/proficiency
Get user's skill proficiency

**Response:**
```json
{
  "skills": [
    {
      "skill": "React",
      "level": "Expert",
      "percentage": 90,
      "yearsExperience": 5,
      "lastAssessed": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### PUT /skills/proficiency
Update skill proficiency
```json
{
  "skills": [
    {
      "skill": "React",
      "level": "Expert",
      "percentage": 90
    }
  ]
}
```

---

## Salary Insights

#### GET /salary/trends
Get salary trends

**Query Parameters:**
- `role` (string): Job role
- `location` (string): Location
- `experience` (string): Experience level
- `timeframe` (string): Time period

**Response:**
```json
{
  "role": "Senior Software Engineer",
  "location": "San Francisco, CA",
  "trend": "+18.5%",
  "data": [
    {
      "year": 2024,
      "salary": 165000,
      "percentile25": 140000,
      "percentile75": 190000
    }
  ],
  "factors": [
    {
      "factor": "Remote Work",
      "impact": "+12%"
    }
  ]
}
```

#### GET /salary/companies/top-paying
Get top paying companies

**Query Parameters:**
- `role` (string): Job role
- `location` (string): Location
- `skills` (string): Required skills

**Response:**
```json
{
  "companies": [
    {
      "id": "company_id",
      "name": "CloudScale Dynamics",
      "salary": {
        "min": 210000,
        "max": 280000,
        "currency": "USD"
      },
      "skills": ["React", "Node.js", "Kubernetes"],
      "logo": "logo_url",
      "openPositions": 15
    }
  ]
}
```

#### GET /salary/benchmarks
Get salary benchmarks by role

**Response:**
```json
{
  "benchmarks": [
    {
      "role": "Software Engineer",
      "experience": "3-5 years",
      "salary": {
        "min": 140000,
        "max": 190000,
        "median": 165000,
        "currency": "USD"
      },
      "percentile": 85,
      "location": "San Francisco, CA"
    }
  ]
}
```

#### POST /salary/calculate
Calculate salary estimate
```json
{
  "role": "Backend Engineer",
  "experience": 5,
  "skills": ["Python", "AWS", "Docker"],
  "location": "San Francisco, CA",
  "education": "Bachelor's",
  "companySize": "100-500"
}
```

**Response:**
```json
{
  "estimate": {
    "min": 140000,
    "max": 180000,
    "median": 160000,
    "currency": "USD"
  },
  "factors": [
    {
      "factor": "Skills",
      "impact": "+15000"
    }
  ],
  "confidence": 85
}
```

#### GET /salary/cost-of-living
Get cost of living data

**Response:**
```json
{
  "cities": [
    {
      "city": "San Francisco",
      "country": "US",
      "costIndex": 9.2,
      "level": "Very High",
      "housingCost": 4500,
      "avgSalary": 165000,
      "salaryToCostRatio": 8.9
    }
  ]
}
```

---

## Skill Assessments

#### GET /assessments
Get available assessments

**Query Parameters:**
- `skill` (string): Skill filter
- `difficulty` (string): Difficulty level
- `type` (string): Assessment type

**Response:**
```json
{
  "assessments": [
    {
      "id": "assessment_id",
      "title": "Advanced JS Architecture",
      "skill": "JavaScript",
      "difficulty": "Hard",
      "duration": 45,
      "questionCount": 30,
      "type": "multiple_choice",
      "description": "Test your advanced JavaScript knowledge",
      "prerequisites": ["Basic JavaScript", "ES6+"]
    }
  ]
}
```

#### GET /assessments/:id
Get assessment details

#### POST /assessments/:id/start
Start an assessment

**Response:**
```json
{
  "sessionId": "session_id",
  "questions": [
    {
      "id": "question_id",
      "type": "multiple_choice",
      "question": "What is the output of...",
      "options": ["A", "B", "C", "D"],
      "timeLimit": 120
    }
  ],
  "timeLimit": 2700,
  "startedAt": "2024-01-15T10:30:00Z"
}
```

#### POST /assessments/sessions/:sessionId/answer
Submit answer
```json
{
  "questionId": "question_id",
  "answer": "A",
  "timeSpent": 45
}
```

#### POST /assessments/sessions/:sessionId/submit
Submit assessment

**Response:**
```json
{
  "score": 92,
  "percentage": 92,
  "passed": true,
  "breakdown": [
    {
      "category": "Fundamentals",
      "score": 95,
      "questions": 10
    }
  ],
  "recommendations": [
    "Focus on advanced async patterns"
  ],
  "certificate": {
    "id": "cert_id",
    "url": "certificate_url"
  }
}
```

#### GET /assessments/results
Get user's assessment results

**Response:**
```json
{
  "results": [
    {
      "id": "result_id",
      "assessment": {
        "id": "assessment_id",
        "title": "React Design Patterns",
        "skill": "React"
      },
      "score": 92,
      "passed": true,
      "completedAt": "2024-01-15T10:30:00Z",
      "certificate": {
        "id": "cert_id",
        "url": "certificate_url"
      }
    }
  ]
}
```

#### GET /assessments/results/:id
Get specific assessment result

#### GET /assessments/certificates
Get user's certificates

---

## External API Integrations

### Adzuna Jobs API Integration

#### GET /external/adzuna/jobs
Fetch jobs from Adzuna API

**Query Parameters:**
- `country` (string): Country code (US, GB, etc.)
- `page` (number): Page number
- `limit` (number): Results per page
- `what` (string): Job title/keywords
- `where` (string): Location

#### GET /external/adzuna/salary-stats
Get salary statistics from Adzuna

### GitHub Integration

#### GET /external/github/trending
Get trending repositories

**Query Parameters:**
- `language` (string): Programming language
- `since` (string): Time period (daily, weekly, monthly)

### LinkedIn Integration (Future)

#### GET /external/linkedin/companies/:id
Get company information from LinkedIn

#### GET /external/linkedin/jobs
Search jobs on LinkedIn

---

## Data Models

### User Model
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "avatar": "string",
  "title": "string",
  "location": "string",
  "skills": ["string"],
  "experience": "number",
  "preferences": {
    "remoteWork": "boolean",
    "salaryRange": {
      "min": "number",
      "max": "number"
    },
    "preferredLocations": ["string"]
  },
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Job Model
```json
{
  "id": "string",
  "title": "string",
  "company": {
    "id": "string",
    "name": "string",
    "logo": "string"
  },
  "location": "string",
  "remote": "boolean",
  "salary": {
    "min": "number",
    "max": "number",
    "currency": "string"
  },
  "description": "string",
  "requirements": ["string"],
  "benefits": ["string"],
  "skills": ["string"],
  "experienceLevel": "string",
  "employmentType": "string",
  "postedAt": "datetime",
  "expiresAt": "datetime",
  "applicationUrl": "string",
  "source": "string"
}
```

### Company Model
```json
{
  "id": "string",
  "name": "string",
  "slug": "string",
  "description": "string",
  "location": "string",
  "size": "string",
  "remotePolicy": "string",
  "hiringNow": "boolean",
  "logo": "string",
  "website": "string",
  "founded": "number",
  "industry": "string",
  "values": ["string"],
  "benefits": ["string"],
  "techStack": ["string"]
}
```

### Assessment Model
```json
{
  "id": "string",
  "title": "string",
  "skill": "string",
  "difficulty": "string",
  "duration": "number",
  "questionCount": "number",
  "type": "string",
  "description": "string",
  "prerequisites": ["string"],
  "passingScore": "number"
}
```

---

## Error Handling

### Standard Error Response
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details",
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456"
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Rate Limited
- `500` - Internal Server Error
- `503` - Service Unavailable

### Common Error Codes
- `INVALID_CREDENTIALS` - Invalid login credentials
- `TOKEN_EXPIRED` - JWT token has expired
- `VALIDATION_ERROR` - Request validation failed
- `RESOURCE_NOT_FOUND` - Requested resource not found
- `RATE_LIMIT_EXCEEDED` - API rate limit exceeded
- `EXTERNAL_API_ERROR` - External service error

---

## Rate Limiting

### Rate Limits
- **Authentication endpoints**: 5 requests per minute per IP
- **General API**: 100 requests per minute per user
- **Search endpoints**: 50 requests per minute per user
- **Assessment endpoints**: 10 requests per minute per user

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642262400
```

---

## Environment Variables

### Required Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/career_platform
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d

# External APIs
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_API_KEY=your_adzuna_api_key
GITHUB_TOKEN=your_github_token
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_s3_bucket
AWS_REGION=us-west-2

# Application
NODE_ENV=production
PORT=3000
API_BASE_URL=https://api.careerplatform.com
FRONTEND_URL=https://careerplatform.com
```

---

## Database Schema

### Core Tables
- `users` - User accounts and profiles
- `companies` - Company information
- `jobs` - Job postings
- `applications` - Job applications
- `assessments` - Skill assessments
- `assessment_results` - Assessment results
- `skills` - Skills catalog
- `user_skills` - User skill proficiency
- `career_paths` - Career progression paths
- `courses` - Learning courses
- `certificates` - User certificates

### Relationship Tables
- `user_saved_jobs` - Saved jobs
- `company_reviews` - Company reviews
- `job_skills` - Job required skills
- `assessment_questions` - Assessment questions
- `user_preferences` - User preferences

---

## Deployment Requirements

### Infrastructure
- **Application Server**: Node.js 18+ with Express/Fastify
- **Database**: PostgreSQL 14+
- **Cache**: Redis 6+
- **File Storage**: AWS S3 or compatible
- **Search**: Elasticsearch (optional)
- **Monitoring**: Application monitoring (DataDog, New Relic)

### Security
- JWT authentication with refresh tokens
- Rate limiting per endpoint
- Input validation and sanitization
- SQL injection prevention
- CORS configuration
- HTTPS enforcement
- API key management for external services

### Performance
- Database indexing strategy
- Response caching with Redis
- CDN for static assets
- Database connection pooling
- Async job processing for heavy operations

---

## Testing Strategy

### Unit Tests
- Service layer functions
- Utility functions
- Data validation
- Authentication logic

### Integration Tests
- API endpoint testing
- Database operations
- External API integrations
- Authentication flows

### Load Testing
- API performance under load
- Database query optimization
- Rate limiting validation
- Concurrent user scenarios

---

## API Documentation

This specification should be implemented with:
- **OpenAPI 3.0** specification
- **Swagger UI** for interactive documentation
- **Postman Collection** for API testing
- **SDK Generation** for client libraries

---

## Support & Maintenance

### Monitoring
- API response times
- Error rates by endpoint
- External API availability
- Database performance metrics

### Logging
- Request/response logging
- Error tracking with stack traces
- User activity logging
- External API call logging

### Backup & Recovery
- Daily database backups
- File storage backups
- Disaster recovery procedures
- Data retention policies

---

This specification provides a comprehensive foundation for building the backend API for the Career Development Platform. Each endpoint should be implemented with proper validation, error handling, and documentation.