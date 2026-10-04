import { PrismaClient, Role, Status } from '@prisma/client';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient();

const S = Status;
const R = Role;

async function main() {
  // Clear existing data (child rows first).
  await prisma.activityLog.deleteMany();
  await prisma.homeSlot.deleteMany();
  await prisma.siteContent.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.media.deleteMany();
  await prisma.project.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.member.deleteMany();
  await prisma.user.deleteMany();

  // --- Admin user ---------------------------------------------------------
  const email = process.env.ADMIN_EMAIL ?? 'admin@club.test';
  const password = process.env.ADMIN_PASSWORD ?? 'admin123';
  const name = process.env.ADMIN_NAME ?? 'Club Admin';
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.create({
    data: { email, passwordHash, name, role: R.ADMIN },
  });
  const editorId = admin.id;

  // --- Projects (10, mixed status) ---------------------------------------
  await prisma.project.createMany({
    data: [
      {
        slug: 'campus-attendance-vision',
        name: 'Campus Attendance Vision',
        summary: 'Face-recognition attendance for classrooms and labs.',
        description:
          'A computer-vision pipeline that marks attendance from classroom cameras and syncs with the department register.',
        category: 'Computer Vision',
        tags: ['Python', 'OpenCV', 'React'],
        team: 'Vision Squad',
        status: S.APPROVED,
        priority: 1,
        featured: true,
        updatedById: editorId,
      },
      {
        slug: 'agri-disease-detector',
        name: 'Agri Disease Detector',
        summary: 'Leaf-image classifier that flags crop disease in the field.',
        description: 'Mobile-first classifier trained on public leaf datasets for early crop disease detection.',
        category: 'Computer Vision',
        tags: ['TensorFlow', 'Flutter'],
        team: 'Agri AI',
        status: S.APPROVED,
        priority: 2,
        featured: true,
        updatedById: editorId,
      },
      {
        slug: 'ai-resume-screener',
        name: 'AI Resume Screener',
        summary: 'NLP tool that ranks resumes against a role description.',
        description: 'Extracts skills and experience and scores candidates for campus placements.',
        category: 'NLP',
        tags: ['spaCy', 'FastAPI'],
        team: 'Language Lab',
        status: S.APPROVED,
        priority: 3,
        featured: true,
        updatedById: editorId,
      },
      {
        slug: 'sign-language-translator',
        name: 'Sign Language Translator',
        summary: 'Real-time gesture recognition for inclusive classrooms.',
        description: 'Translates Indian Sign Language gestures into captions using a lightweight CNN.',
        category: 'Computer Vision',
        tags: ['MediaPipe', 'Python'],
        status: S.APPROVED,
        priority: 4,
        updatedById: editorId,
      },
      {
        slug: 'club-chatbot',
        name: 'Club Chatbot',
        summary: 'RAG assistant answering club FAQs for new members.',
        description: 'Retrieval-augmented assistant over the club knowledge base.',
        category: 'NLP',
        tags: ['LangChain', 'pgvector'],
        status: S.APPROVED,
        priority: 5,
        updatedById: editorId,
      },
      {
        slug: 'energy-analytics-dashboard',
        name: 'Energy Analytics Dashboard',
        summary: 'Lab power-usage analytics with anomaly alerts.',
        description: 'Streams smart-meter data and flags abnormal consumption in the AI Lab.',
        category: 'Data',
        tags: ['React', 'TimescaleDB'],
        status: S.PENDING,
        priority: 6,
        updatedById: editorId,
      },
      {
        slug: 'traffic-signal-optimizer',
        name: 'Traffic Signal Optimizer',
        summary: 'Reinforcement learning for adaptive signal timing.',
        description: 'Simulation-driven RL agent that reduces waiting time at junctions.',
        category: 'Reinforcement Learning',
        tags: ['Python', 'SUMO'],
        status: S.APPROVED,
        priority: 7,
        updatedById: editorId,
      },
      {
        slug: 'campus-navigation-ar',
        name: 'Campus Navigation AR',
        summary: 'Augmented-reality wayfinding for the campus.',
        description: 'Mobile AR overlay that guides visitors to labs and classrooms.',
        category: 'AR/VR',
        tags: ['Unity', 'ARKit'],
        status: S.PENDING,
        priority: 8,
        updatedById: editorId,
      },
      {
        slug: 'voice-notes-summarizer',
        name: 'Voice Notes Summarizer',
        summary: 'Turns lecture recordings into structured notes.',
        description: 'Speech-to-text plus summarisation for class recordings.',
        category: 'NLP',
        tags: ['Whisper', 'LLM'],
        status: S.DRAFT,
        priority: 9,
        updatedById: editorId,
      },
      {
        slug: 'exam-proctor-assistant',
        name: 'Exam Proctor Assistant',
        summary: 'Automated monitoring for remote exams.',
        description: 'Flags suspicious behaviour during online assessments.',
        category: 'Computer Vision',
        tags: ['Python', 'OpenCV'],
        status: S.REJECTED,
        priority: 10,
        rejectionReason: 'Privacy review required before this can proceed.',
        updatedById: editorId,
      },
    ],
  });

  // --- Achievements (10, mixed status) -----------------------------------
  await prisma.achievement.createMany({
    data: [
      { name: 'Smart India Hackathon - Finalist', year: 2026, category: 'hackathon', description: 'Team of four reached the national finals with the attendance vision project.', status: S.APPROVED, priority: 1, featured: true, recipient: 'Vision Squad', updatedById: editorId },
      { name: 'Best Project - Dept. Technical Fest', year: 2025, category: 'competition', description: 'Awarded for the campus attendance vision project.', status: S.APPROVED, priority: 2, featured: true, updatedById: editorId },
      { name: 'Google Cloud Skills Boost - Cohort', year: 2026, category: 'free-course', description: 'Twelve members completed the cloud fundamentals track.', status: S.APPROVED, priority: 3, featured: true, updatedById: editorId },
      { name: 'Inter-College ML Challenge - Runner Up', year: 2025, category: 'competition', description: 'Second place for a crop disease classifier.', status: S.APPROVED, priority: 4, updatedById: editorId },
      { name: 'AWS Academy Cloud Ambassador', year: 2026, category: 'ambassador', description: 'Two club leads selected as campus ambassadors.', status: S.APPROVED, priority: 5, updatedById: editorId },
      { name: 'Internal Hackathon - Winner', year: 2024, category: 'hackathon', description: 'Winning team built a real-time sign language translator.', status: S.APPROVED, priority: 6, updatedById: editorId },
      { name: 'AI Research Paper - Accepted', year: 2026, category: 'other', description: 'Paper on adaptive traffic signals accepted at a student symposium.', status: S.PENDING, priority: 7, updatedById: editorId },
      { name: 'State Robotics Meet - Participant', year: 2025, category: 'competition', description: 'Team represented the institute at the state meet.', status: S.PENDING, priority: 8, updatedById: editorId },
      { name: 'Community Workshop Certificate', year: 2024, category: 'certificate', description: 'Certificate for conducting a Python workshop for first-years.', status: S.DRAFT, priority: 9, updatedById: editorId },
      { name: 'Startup Pitch Fest - Entry', year: 2026, category: 'competition', description: 'Draft pitch deck for an on-campus AI lab service.', status: S.REJECTED, priority: 10, rejectionReason: 'Missing proof link and team details.', updatedById: editorId },
    ],
  });

  // --- Guests (9, mixed status) ------------------------------------------
  const visit = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d));
  await prisma.guest.createMany({
    data: [
      { name: 'Dr. Arun Kumar', role: 'AI Researcher', organization: 'IIT Madras', topic: 'Large language models in education', bio: 'Session on transformer models and their classroom applications.', photo: 'https://i.pravatar.cc/300?img=11', visitDate: visit(2026, 2, 12), gallery: [], status: S.APPROVED, priority: 1, featured: true, updatedById: editorId },
      { name: 'Ms. Priya Raman', role: 'Data Scientist', organization: 'Zoho', topic: 'From notebooks to production ML', bio: 'Walked through the ML deployment lifecycle.', photo: 'https://i.pravatar.cc/300?img=5', visitDate: visit(2026, 1, 20), gallery: [], status: S.APPROVED, priority: 2, featured: true, updatedById: editorId },
      { name: 'Mr. Rahul Nair', role: 'Founder', organization: 'AgriSense', topic: 'Building AI products for farmers', bio: 'Founder talk on applied computer vision in agriculture.', photo: 'https://i.pravatar.cc/300?img=13', visitDate: visit(2025, 11, 8), gallery: [], status: S.APPROVED, priority: 3, updatedById: editorId },
      { name: 'Dr. Meera Iyer', role: 'Professor', organization: 'PSG Tech', topic: 'Responsible AI', bio: 'Guest lecture on ethics and fairness in ML systems.', photo: 'https://i.pravatar.cc/300?img=9', visitDate: visit(2025, 9, 30), gallery: [], status: S.APPROVED, priority: 4, updatedById: editorId },
      { name: 'Mr. Karthik Suresh', role: 'ML Engineer', organization: 'Freshworks', topic: 'MLOps in practice', bio: 'Hands-on pipeline and monitoring session.', photo: 'https://i.pravatar.cc/300?img=15', visitDate: visit(2026, 3, 4), gallery: [], status: S.PENDING, priority: 5, updatedById: editorId },
      { name: 'Ms. Divya Menon', role: 'Product Manager', organization: 'Sarvam AI', topic: 'Shipping Indic language models', bio: 'Overview of multilingual model deployment.', photo: 'https://i.pravatar.cc/300?img=20', visitDate: visit(2026, 3, 18), gallery: [], status: S.PENDING, priority: 6, updatedById: editorId },
      { name: 'Dr. Sanjay Gupta', role: 'Research Scientist', organization: 'TCS Research', topic: 'Graph neural networks', bio: 'Introductory session on GNNs for campus networks.', photo: 'https://i.pravatar.cc/300?img=17', visitDate: visit(2025, 7, 22), gallery: [], status: S.DRAFT, priority: 7, updatedById: editorId },
      { name: 'Ms. Ananya Bose', role: 'Designer', organization: 'Microsoft', topic: 'Designing AI interfaces', bio: 'Talk on human-centred AI product design.', photo: 'https://i.pravatar.cc/300?img=25', visitDate: visit(2026, 4, 2), gallery: [], status: S.REJECTED, priority: 8, rejectionReason: 'Session date clashes with exams.', updatedById: editorId },
      { name: 'Mr. Vivek Reddy', role: 'CTO', organization: 'Kalidos', topic: 'Edge AI for smart campuses', bio: 'Demo of edge inference on low-power devices.', photo: 'https://i.pravatar.cc/300?img=30', visitDate: visit(2026, 2, 27), gallery: [], status: S.APPROVED, priority: 9, updatedById: editorId },
    ],
  });

  // --- Members (9, mixed status) -----------------------------------------
  await prisma.member.createMany({
    data: [
      { name: 'Shiva Kumar', email: 'shiva@club.test', role: 'admin', group: 'core', bio: 'Club coordinator and admin.', status: S.APPROVED, priority: 1, featured: true, updatedById: editorId },
      { name: 'Anita Raj', email: 'anita@club.test', role: 'member', group: 'core', bio: 'Projects lead.', status: S.APPROVED, priority: 2, featured: true, updatedById: editorId },
      { name: 'Dr. S. Karthikeyan', email: 'karthik@ssiet.edu', role: 'faculty', group: 'faculty', bio: 'Faculty coordinator, AI Lab.', status: S.APPROVED, priority: 3, updatedById: editorId },
      { name: 'Mrs. Latha M', email: 'latha@ssiet.edu', role: 'staff', group: 'staff', bio: 'Lab administrator.', status: S.APPROVED, priority: 4, updatedById: editorId },
      { name: 'Ravi Prasad', email: 'ravi@club.test', role: 'member', group: 'core', bio: 'Events lead.', status: S.APPROVED, priority: 5, updatedById: editorId },
      { name: 'Sneha Nair', email: 'sneha@club.test', role: 'member', group: 'core', bio: 'Design and media.', status: S.PENDING, priority: 6, updatedById: editorId },
      { name: 'Arjun Das', email: 'arjun@club.test', role: 'member', group: 'core', bio: 'Backend contributor.', status: S.PENDING, priority: 7, updatedById: editorId },
      { name: 'Meena Kumari', email: 'meena@club.test', role: 'member', group: 'core', bio: 'Outreach volunteer.', status: S.DRAFT, priority: 8, updatedById: editorId },
      { name: 'Bala Murugan', email: 'bala@club.test', role: 'member', group: 'core', bio: 'Duplicate application.', status: S.REJECTED, priority: 9, rejectionReason: 'Duplicate of an existing member record.', updatedById: editorId },
    ],
  });

  // --- Default site content ----------------------------------------------
  await prisma.siteContent.createMany({
    data: [
      {
        key: 'hero',
        value: {
          headline: 'Building the next generation of AI engineers',
          subheadline: 'SIET AI Club and AI Lab',
          primaryCta: { label: 'Explore Projects', href: '/projects' },
          secondaryCta: { label: 'Contact Us', href: '/our-guests' },
          image: { url: '/images/hero.jpg', alt: 'AI Club members at work' },
        },
      },
      {
        key: 'overview',
        value: {
          about:
            'The AI Club is the student-run artificial intelligence community of Sri Shakthi Institute of Engineering and Technology. We run the AI Lab and build real projects every semester.',
          scope: ['Machine learning', 'Computer vision', 'Natural language processing', 'Robotics'],
          aim: 'Give every student a path from curiosity to a shipped AI project.',
          goals: [
            'Ship one production-ready project every semester',
            'Run monthly workshops and one flagship hackathon',
            'Mentor every first-year member through onboarding',
          ],
        },
      },
      {
        key: 'contact',
        value: {
          email: 'aiclub@ssiet.edu',
          phone: '+91 98765 43210',
          address: 'AI Lab, Block C, Sri Shakthi Institute of Engineering and Technology',
        },
      },
      {
        key: 'socials',
        value: [
          { platform: 'instagram', url: 'https://instagram.com/aiclub', label: 'Instagram' },
          { platform: 'github', url: 'https://github.com/aiclub', label: 'GitHub' },
          { platform: 'linkedin', url: 'https://linkedin.com/company/aiclub', label: 'LinkedIn' },
        ],
      },
    ],
  });

  // --- Default home layout (home slots) ----------------------------------
  await prisma.homeSlot.createMany({
    data: [
      // Featured projects strip (ids 1..3 are the approved featured projects)
      { section: 'featuredProjects', resourceType: 'projects', itemId: 1, position: 1 },
      { section: 'featuredProjects', resourceType: 'projects', itemId: 2, position: 2 },
      { section: 'featuredProjects', resourceType: 'projects', itemId: 3, position: 3 },
      // Achievements carousel
      { section: 'featuredAchievements', resourceType: 'achievements', itemId: 1, position: 1 },
      { section: 'featuredAchievements', resourceType: 'achievements', itemId: 2, position: 2 },
      { section: 'featuredAchievements', resourceType: 'achievements', itemId: 3, position: 3 },
      // Guests strip
      { section: 'guests', resourceType: 'guests', itemId: 1, position: 1 },
      { section: 'guests', resourceType: 'guests', itemId: 2, position: 2 },
    ],
  });

  // --- Contact messages --------------------------------------------------
  await prisma.contactMessage.createMany({
    data: [
      { name: 'Asha', email: 'asha@example.com', phone: '9876543210', message: 'I want to join the club. Do you take first-year students?', read: false },
      { name: 'Vikram', email: 'vikram@example.com', message: 'Is the workshop series open to other departments?', read: false },
      { name: 'Lakshmi', email: 'lakshmi@example.com', phone: '9123456780', message: 'Requesting a club certificate for a competition submission.', read: false },
      { name: 'Fathima', email: 'fathima@example.com', message: 'Can alumni attend the AI Lab open house?', read: true },
      { name: 'Rahul', email: 'rahul@example.com', phone: '9988776655', message: 'We would like to sponsor the next hackathon.', read: true },
      { name: 'Deepa', email: 'deepa@example.com', message: 'How do I register for the machine learning workshop?', read: false },
    ],
  });

  // --- Activity log ------------------------------------------------------
  await prisma.activityLog.createMany({
    data: [
      { action: 'approved', resourceType: 'projects', resourceId: 1, title: 'Campus Attendance Vision', userId: editorId },
      { action: 'approved', resourceType: 'projects', resourceId: 2, title: 'Agri Disease Detector', userId: editorId },
      { action: 'rejected', resourceType: 'projects', resourceId: 10, title: 'Exam Proctor Assistant', userId: editorId },
      { action: 'featured', resourceType: 'achievements', resourceId: 1, title: 'Smart India Hackathon - Finalist', userId: editorId },
      { action: 'created', resourceType: 'guests', resourceId: 1, title: 'Dr. Arun Kumar', userId: editorId },
      { action: 'updated', resourceType: 'site-content', resourceId: null, title: 'hero', userId: editorId },
    ],
  });

  // eslint-disable-next-line no-console
  console.log(`Seed complete. Admin: ${email} (password from ADMIN_PASSWORD)`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });


