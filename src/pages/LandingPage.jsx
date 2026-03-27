import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import ValuePropositions from '../components/ValuePropositions'
import CTA from '../components/CTA'

const LandingPage = () => {
  const stats = {
    activeUsers: '2.4M+',
    globalPartners: '850+',
    skillDataPoints: '150M+'
  }

  return (
    <>
      <Hero />
      <StatsBar stats={stats} />
      <ValuePropositions skillsData={[]} />
      <CTA />
    </>
  )
}

export default LandingPage
