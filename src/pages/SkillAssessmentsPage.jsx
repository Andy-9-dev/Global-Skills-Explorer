import { useState } from 'react'
import { SkillDemandChart, SalaryByRegionChart, JobMarketShareChart, CareerGrowthChart } from '../components/SkillsChart'

const SkillAssessmentsPage = () => {
  const [currentAssessmentIndex, setCurrentAssessmentIndex] = useState(0)

  const skills = [
    { name: 'React Framework', level: 'Expert', percentage: 85, color: 'primary' },
    { name: 'Node.js Ecosystem', level: 'Advanced', percentage: 72, color: 'slate' },
    { name: 'System Design & Architecture', level: 'Intermediate', percentage: 54, color: 'slate' }
  ]

  const assessments = [
    {
      id: 1,
      title: 'Advanced JS Architecture',
      difficulty: 'Hard',
      difficultyColor: 'red',
      duration: '45 mins',
      questions: 30,
      icon: 'javascript',
      gradient: 'from-primary/20'
    },
    {
      id: 2,
      title: 'Cloud Infrastructure Security',
      difficulty: 'Medium',
      difficultyColor: 'orange',
      duration: '60 mins',
      questions: 45,
      icon: 'cloud',
      gradient: 'from-green-400/10'
    },
    {
      id: 3,
      title: 'PostgreSQL Performance Tuning',
      difficulty: 'Easy',
      difficultyColor: 'green',
      duration: '30 mins',
      questions: 20,
      icon: 'database',
      gradient: 'from-purple-400/10'
    }
  ]

  const recentResults = [
    {
      id: 1,
      name: 'React Design Patterns',
      category: 'Certification Path',
      date: 'Oct 24, 2023',
      score: 92,
      status: 'Passed'
    },
    {
      id: 2,
      name: 'Docker & Kubernetes Basics',
      category: 'General Skill Check',
      date: 'Oct 12, 2023',
      score: 78,
      status: 'Passed'
    },
    {
      id: 3,
      name: 'GraphQL API Design',
      category: 'Advanced Elective',
      date: 'Sep 28, 2023',
      score: null,
      status: 'Incomplete'
    }
  ]

  const handleScheduleExam = () => {
    console.log('Schedule Exam clicked')
  }

  const handlePracticeQuiz = () => {
    console.log('Take Practice Quiz clicked')
  }

  const handleStartAssessment = (assessmentId) => {
    console.log('Start Assessment:', assessmentId)
  }

  const handleViewResult = (resultId) => {
    console.log('View Result:', resultId)
  }

  const handleResumeAssessment = (resultId) => {
    console.log('Resume Assessment:', resultId)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
      {/* Header Section */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Skill Assessments
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Measure your technical proficiency and career readiness.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleScheduleExam}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            Schedule Exam
          </button>
          <button
            onClick={handlePracticeQuiz}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-sm">play_arrow</span>
            Take Practice Quiz
          </button>
        </div>
      </header>

      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Top Row: Proficiency & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skill Proficiency Card */}
          <section className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Skill Proficiency</h3>
              <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">
                Detailed View
              </button>
            </div>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold">{skill.name}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        skill.color === 'primary'
                          ? 'text-primary bg-primary/10'
                          : 'text-slate-500 bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      {skill.level} ({skill.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        skill.color === 'primary' ? 'bg-primary' : 'bg-slate-400'
                      } transition-all duration-1000`}
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Profile Snapshot */}
          <section className="bg-primary/5 dark:bg-primary/10 p-6 rounded-xl border border-primary/20 flex flex-col justify-center items-center text-center">
            <div className="relative mb-4">
              <div className="size-20 rounded-full bg-white dark:bg-slate-800 p-1 ring-4 ring-primary/20">
                <img
                  className="rounded-full w-full h-full object-cover"
                  alt="Professional headshot"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiwj32RHyKFOX-bORWPw-xJ-rd7417j2udqx9TODWVA8R97JPfRig8RTYtsweryTbPGmqkyV8bOcPSK-iiI0bXUMY1qHkDNUf03TO9OrpzZ1g4oE2t_7zilf390U_jmmVbNbYoXjMkZtPQ6g6olpWwHX16YAuBKEQ6V2bJ0UBvQmPpSK7IU12bPEwmd1gS7G6SJ0-hiBVBG63evNYn9y-ZGMyvbls_9Xp6qzUL1lDAJC6zFUFZ_hIL2ecJU-X_pOr6rc3lS-p7WIR-"
                />
              </div>
              <div className="absolute bottom-0 right-0 size-6 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <h4 className="font-bold text-lg">Alex Rivera</h4>
            <p className="text-slate-500 text-sm">Senior Frontend Engineer</p>
            <div className="mt-4 flex gap-4">
              <div>
                <p className="text-xl font-black text-primary">12</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Tests Taken</p>
              </div>
              <div className="w-px h-8 bg-primary/20 self-center"></div>
              <div>
                <p className="text-xl font-black text-primary">4</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Certifications</p>
              </div>
            </div>
          </section>
        </div>

        {/* Charts Section */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Market Analytics & Insights</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkillDemandChart />
            <SalaryByRegionChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <JobMarketShareChart />
            <CareerGrowthChart />
          </div>
        </section>

        {/* Available Assessments */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Available Assessments</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentAssessmentIndex(Math.max(0, currentAssessmentIndex - 1))}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-white dark:hover:bg-slate-900 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button
                onClick={() =>
                  setCurrentAssessmentIndex(Math.min(assessments.length - 1, currentAssessmentIndex + 1))
                }
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-white dark:hover:bg-slate-900 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div className="h-32 bg-slate-100 dark:bg-slate-800 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${assessment.gradient} to-transparent`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-primary/40">{assessment.icon}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{assessment.title}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-${assessment.difficultyColor}-100 text-${assessment.difficultyColor}-600 dark:bg-${assessment.difficultyColor}-900/30 dark:text-${assessment.difficultyColor}-400`}
                    >
                      {assessment.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-xs mb-4">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">timer</span> {assessment.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">quiz</span> {assessment.questions} Questions
                    </span>
                  </div>
                  <button
                    onClick={() => handleStartAssessment(assessment.id)}
                    className="w-full py-2.5 bg-slate-50 dark:bg-slate-800 group-hover:bg-primary group-hover:text-white text-slate-900 dark:text-slate-100 font-bold rounded-lg transition-all duration-300"
                  >
                    Start Assessment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Results Section */}
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-bold">Recent Results</h3>
            <button className="text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <th className="px-6 py-3">Assessment Name</th>
                  <th className="px-6 py-3">Date Completed</th>
                  <th className="px-6 py-3 text-center">Score</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentResults.map((result) => (
                  <tr key={result.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold">{result.name}</p>
                      <p className="text-[10px] text-slate-400">{result.category}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{result.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <span
                          className={`text-sm font-black ${
                            result.score ? 'text-primary' : 'text-slate-400 italic'
                          }`}
                        >
                          {result.score ? `${result.score}%` : 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                          result.status === 'Passed'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {result.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {result.status === 'Passed' ? (
                        <button
                          onClick={() => handleViewResult(result.id)}
                          className="text-slate-400 hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleResumeAssessment(result.id)}
                          className="text-primary hover:underline text-xs font-bold"
                        >
                          Resume
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SkillAssessmentsPage
