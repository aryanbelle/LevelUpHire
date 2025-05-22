import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RocketIcon, BriefcaseIcon, BadgeCheckIcon, TrophyIcon } from '@/components/icons';

export default function Home() {
  return (
    <div className="animate-in">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <RocketIcon className="h-8 w-8 text-primary" />
            <h1 className="ml-2 text-2xl font-bold text-primary">LevelUpHire</h1>
          </div>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Level Up Your Career <span className="text-primary">Journey</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
              Earn points, unlock opportunities, and compete with peers in your job search.
              A gamified approach to finding your dream job.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup?role=student">
                <Button size="lg" className="h-14 px-8">
                  Join as Student
                </Button>
              </Link>
              <Link href="/auth/signup?role=recruiter">
                <Button size="lg" variant="outline" className="h-14 px-8">
                  Join as Recruiter
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-secondary/30 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="card-hover bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <BadgeCheckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Tasks</h3>
              <p className="text-gray-600">
                Earn points by completing career-boosting tasks like uploading your resume, 
                applying for jobs, and referring friends.
              </p>
            </div>
            <div className="card-hover bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <TrophyIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Climb the Leaderboard</h3>
              <p className="text-gray-600">
                Compete with peers, achieve milestones, and showcase your dedication to potential employers.
              </p>
            </div>
            <div className="card-hover bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <BriefcaseIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Land Your Dream Job</h3>
              <p className="text-gray-600">
                Connect with recruiters who value your initiative and stand out with your points and achievements.
              </p>
            </div>
          </div>
        </section>

        {/* Points System Overview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Points Ecosystem</h2>
          <div className="overflow-hidden overflow-x-auto rounded-lg shadow">
            <table className="w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Task</th>
                  <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Points</th>
                  <th className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">Daily Sign-In</td>
                  <td className="py-4 px-4 text-sm text-gray-900">10</td>
                  <td className="py-4 px-4 text-sm text-gray-600">Check in once per day</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">Refer a Peer</td>
                  <td className="py-4 px-4 text-sm text-gray-900">200</td>
                  <td className="py-4 px-4 text-sm text-gray-600">Unique referral link generates points on signup</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">Apply for a Job</td>
                  <td className="py-4 px-4 text-sm text-gray-900">5</td>
                  <td className="py-4 px-4 text-sm text-gray-600">Click "Apply" on a job listing via portal</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">Upload Resume</td>
                  <td className="py-4 px-4 text-sm text-gray-900">20</td>
                  <td className="py-4 px-4 text-sm text-gray-600">Add or update resume PDF/profile document</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">Complete Profile</td>
                  <td className="py-4 px-4 text-sm text-gray-900">50</td>
                  <td className="py-4 px-4 text-sm text-gray-600">Fill out all profile fields (education, skills)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-primary rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-8 md:mb-0 md:max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Job Search?</h2>
              <p className="text-primary-foreground/90">
                Join thousands of students and recruiters already using LevelUpHire to 
                revolutionize the recruitment process.
              </p>
            </div>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="h-14 px-8">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <RocketIcon className="h-6 w-6 text-primary" />
              <h1 className="ml-2 text-xl font-bold text-primary">LevelUpHire</h1>
            </div>
            <div className="flex space-x-8 text-gray-600">
              <Link href="#" className="hover:text-primary">About</Link>
              <Link href="#" className="hover:text-primary">Features</Link>
              <Link href="#" className="hover:text-primary">Contact</Link>
              <Link href="#" className="hover:text-primary">Privacy</Link>
              <Link href="#" className="hover:text-primary">Terms</Link>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-500">
            <p>© 2025 LevelUpHire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}