// Mock notifications - replace with real API later

export const initialNotifications = [
  {
    id: 'n1',
    type: 'job_match',
    icon: 'work',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    title: 'New Job Match',
    message: 'Senior React Developer at Tech Startup matches your profile',
    time: '2 min ago',
    read: false,
    link: '/jobs'
  },
  {
    id: 'n2',
    type: 'salary_update',
    icon: 'trending_up',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
    title: 'Salary Update',
    message: 'React Developer salaries in Lagos increased by 12% this quarter',
    time: '1 hr ago',
    read: false,
    link: '/insights/salary'
  },
  {
    id: 'n3',
    type: 'market_trend',
    icon: 'insights',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50 dark:bg-purple-900/20',
    title: 'Market Trend Alert',
    message: 'Demand for DevOps engineers in West Africa is up 34% this month',
    time: '3 hr ago',
    read: false,
    link: '/skill-assessments'
  },
  {
    id: 'n4',
    type: 'job_match',
    icon: 'work',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50 dark:bg-blue-900/20',
    title: 'New Job Match',
    message: 'Cloud Architect role at Infrastructure Pro — $100k-$150k',
    time: '5 hr ago',
    read: true,
    link: '/jobs'
  },
  {
    id: 'n5',
    type: 'market_trend',
    icon: 'public',
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-50 dark:bg-orange-900/20',
    title: 'Global Insight',
    message: 'Nigeria ranks #3 in fastest-growing tech talent markets globally',
    time: '1 day ago',
    read: true,
    link: '/dashboard'
  }
]
