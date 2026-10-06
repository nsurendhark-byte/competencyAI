import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Layers,
  Database,
  Cpu,
  Globe,
  Terminal,
  CheckCircle2,
  Compass
} from 'lucide-react';

export default function SkillsTaxonomyPage() {
  const categories = [
    {
      name: 'Frontend & UI Architecture',
      icon: Globe,
      color: '#3B82F6',
      desc: 'Master DOM hierarchy, CSS Grid, React custom hooks, virtual DOM reconciliation, and state machines.',
      skills: [
        'HTML5 & Semantic Page Layouts',
        'CSS3 Responsive Flexbox & Grid',
        'JavaScript ES6 & Execution Context',
        'React Component & Custom Hook Lifecycle',
        'Next.js App Router & Server Components'
      ]
    },
    {
      name: 'Backend & Microservices Engine',
      icon: Terminal,
      color: '#5B3DF5',
      desc: 'Master V8 event loop, Node.js non-blocking I/O streams, REST APIs, Express middleware, and JWT security.',
      skills: [
        'Node.js REST Engine & Middleware Chains',
        'Express.js API Architecture',
        'Asynchronous Promises & Event Loop',
        'Microservice Stream Processing',
        'Auth & JWT Session Security'
      ]
    },
    {
      name: 'Relational Databases & Data Stores',
      icon: Database,
      color: '#22D3EE',
      desc: 'Master SQL schema normalization, B-Tree indexing, JOIN query optimization, transactions, and ACID compliance.',
      skills: [
        'SQL Relational Schema Design',
        'B-Tree Indexing Strategies',
        'PostgreSQL & Prisma ORM',
        'Complex JOIN Query Optimization',
        'ACID Transactions & Lock Management'
      ]
    },
    {
      name: 'System Design & Distributed Systems',
      icon: Layers,
      color: '#00E6A7',
      desc: 'Master load balancing, Redis caching strategies, RabbitMQ messaging queues, and CAP theorem trade-offs.',
      skills: [
        'Distributed Caching with Redis',
        'Load Balancer Routing & Reverse Proxies',
        'Event-Driven Message Queues',
        'CAP Theorem & High Availability',
        'Docker Microservice Deployment'
      ]
    },
    {
      name: 'AI & Vector Systems Architecture',
      icon: Cpu,
      color: '#EC4899',
      desc: 'Master LLM prompt pipelines, vector embedding databases, RAG search systems, and fine-tuned AI agents.',
      skills: [
        'Vector Embedding Databases (pgvector/Pinecone)',
        'Retrieval-Augmented Generation (RAG)',
        'LLM Context Window Management',
        'Fine-Tuning & Model Evaluation',
        'Autonomous AI Agent Workflows'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] flex flex-col font-sans antialiased">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-20 space-y-16">
        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05091A] border border-[#26314A] text-[11px] font-mono font-semibold tracking-wider text-[#22D3EE]">
            <Compass className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>10-LEVEL VERIFIED TAXONOMY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#F8FAFC]">
            Engineering Skills{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#5B3DF5] to-[#22D3EE] bg-clip-text text-transparent">
              Taxonomy & Matrix
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-normal">
            Every skill domain in CompetencyAI is decomposed into 10 discrete mastery levels evaluated by code execution, unit tests, and knowledge graph prerequisites.
          </p>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden transition-all group"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#5B3DF5]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#22D3EE]/10 transition-colors" />

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#050A19] border border-[#26314A] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg tracking-tight group-hover:text-[#22D3EE] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[#64748B]">10 VERIFIED MASTERY LEVELS</span>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {cat.desc}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#26314A]">
                <div className="text-[10px] font-bold font-mono text-[#64748B] uppercase tracking-wider">CORE SKILL VECTOR NODES</div>
                {cat.skills.map((s) => (
                  <div key={s} className="p-3 bg-[#050A19] border border-[#26314A] rounded-xl flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E6A7] shrink-0" />
                      <span className="font-bold text-slate-200 truncate">{s}</span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#11182B] text-[#22D3EE] border border-[#22D3EE]/30 shrink-0">
                      L1-L10
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA CARD */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Test Your Skill Mastery Level
          </h2>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Take your diagnostic assessment today to evaluate your level across all 10 domain tiers and generate your personalized Knowledge Graph roadmap.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-full shadow-lg shadow-[#5B3DF5]/30 transition-all"
          >
            <span>Start Your Diagnostic Assessment</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
