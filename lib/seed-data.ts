import { readDB, writeDB, DBStore } from './db';
import crypto from 'crypto';

// Simple PBKDF2 password hashing helper
export function hashPassword(password: string): string {
  const salt = 'competency_ai_salt_2026';
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function ensureSeededData() {
  const db = readDB();

  // 1. Seed Initial Secure Admin if not present (Requirement 46)
  const existingAdmin = db.adminUsers.find(a => a.email === 'adminssp.it@gmail.com');
  if (!existingAdmin) {
    db.adminUsers.push({
      id: 'admin-super-01',
      email: 'adminssp.it@gmail.com',
      passwordHash: hashPassword('miniprojectsathy'),
      fullName: 'CompetencyAI Lead Administrator',
      role: 'SUPER_ADMIN',
      mustChangePassword: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  // 2. Seed Baseline Career Track
  if (db.careers.length === 0) {
    db.careers.push(
      {
        id: 'career-fs-01',
        title: 'Full-Stack Software Engineer',
        slug: 'full-stack-engineer',
        description: 'Master front-end, back-end architecture, relational databases, web security, and cloud deployment.',
        status: 'PUBLISHED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'career-ai-01',
        title: 'AI Systems Architect',
        slug: 'ai-systems-architect',
        description: 'Build enterprise LLM pipelines, autonomous AI agents, fine-tuned models, and scalable vector infrastructure.',
        status: 'PUBLISHED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    );
  }

  // 3. Seed Skills with 10 Levels (Requirement 16)
  if (db.skills.length === 0) {
    const skillsData = [
      { id: 'skill-js', name: 'JavaScript & Async Programming', slug: 'javascript', category: 'Frontend', desc: 'Core language runtime, event loop, closures, closures, async/await.' },
      { id: 'skill-react', name: 'React & Frontend Architecture', slug: 'react', category: 'Frontend', desc: 'Virtual DOM, custom hooks, state machine design, hydration.' },
      { id: 'skill-node', name: 'Node.js & Backend Architecture', slug: 'nodejs', category: 'Backend', desc: 'Non-blocking I/O, REST APIs, GraphQL, microservice streams.' },
      { id: 'skill-sql', name: 'SQL & Relational Databases', slug: 'sql-db', category: 'Database', desc: 'Schema design, indexing strategies, transactions, ACID compliance.' },
      { id: 'skill-sys', name: 'System Design & Distributed Systems', slug: 'system-design', category: 'Architecture', desc: 'Load balancing, caching strategies, messaging queues, CAP theorem.' },
    ];

    skillsData.forEach(s => {
      db.skills.push({
        id: s.id,
        careerId: 'career-fs-01',
        name: s.name,
        slug: s.slug,
        category: s.category,
        description: s.desc,
        status: 'PUBLISHED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // 10 Levels for each skill
      const levelNames = [
        'Syntax & Primitive Types',
        'Variables, Scope & Execution Context',
        'Arrays, Objects & Collections',
        'DOM Manipulation & Event Handlers',
        'Asynchronous JS, Promises & Async/Await',
        'Advanced Closures, Prototypes & OOP',
        'Architectural Design & State Machines',
        'Performance Profiling & Memory Leak Audit',
        'Production Engineering & Security',
        'Distributed Runtime & Micro-frontends'
      ];

      levelNames.forEach((lvlTitle, idx) => {
        const lvlNum = idx + 1;
        db.skillLevels.push({
          id: `lvl-${s.id}-${lvlNum}`,
          skillId: s.id,
          levelNumber: lvlNum,
          title: `Level ${lvlNum}: ${lvlTitle}`,
          description: `Deep dive into ${s.name} mastery at level ${lvlNum}.`,
          topics: JSON.stringify([`${lvlTitle} Basics`, `Core Concepts L${lvlNum}`, `Practical Optimization`]),
          createdAt: new Date().toISOString()
        });
      });
    });

    // Seed Skill Dependencies for Knowledge Graph
    db.skillDependencies.push(
      { id: 'dep-1', skillId: 'skill-react', prerequisiteId: 'skill-js' },
      { id: 'dep-2', skillId: 'skill-node', prerequisiteId: 'skill-js' },
      { id: 'dep-3', skillId: 'skill-sys', prerequisiteId: 'skill-node' },
      { id: 'dep-4', skillId: 'skill-sys', prerequisiteId: 'skill-sql' }
    );
  }

  // 4. Seed Baseline 100-Question Assessment Suite (Requirement 17)
  if (db.questions.length === 0) {
    let questionIndex = 1;
    for (let level = 1; level <= 10; level++) {
      for (let q = 1; q <= 10; q++) {
        const qId = `q-100-${questionIndex}`;
        const skillId = (q % 2 === 0) ? 'skill-js' : 'skill-react';
        db.questions.push({
          id: qId,
          skillId,
          levelNumber: level,
          type: level % 2 === 1 ? 'MCQ' : 'CODE_OUTPUT',
          title: `Level ${level} Assessment Q${q}: ${skillId === 'skill-js' ? 'JavaScript' : 'React'} Mastery`,
          prompt: `[Level ${level} Core Competency] What is the expected runtime behavior of the following expression under strict execution context?`,
          explanation: `At Level ${level}, execution context handling dictates how memory references are resolved.`,
          codeSnippet: level > 3 ? `function executeStep() {\n  const ref = Level${level}State;\n  return typeof ref;\n}` : null,
          difficulty: level <= 3 ? 'EASY' : level <= 7 ? 'MEDIUM' : 'HARD',
          status: 'PUBLISHED',
          createdAt: new Date().toISOString()
        });

        // Add 4 options per question
        db.questionOptions.push(
          { id: `opt-${qId}-1`, questionId: qId, optionText: `Standard evaluation matching Level ${level} specification`, isCorrect: true },
          { id: `opt-${qId}-2`, questionId: qId, optionText: `Throws runtime TypeError due to uninitialized scope`, isCorrect: false },
          { id: `opt-${qId}-3`, questionId: qId, optionText: `Returns undefined due to variable hoisting`, isCorrect: false },
          { id: `opt-${qId}-4`, questionId: qId, optionText: `Creates memory leak on main looper thread`, isCorrect: false }
        );
        questionIndex++;
      }
    }

    // Default 100 question assessment record
    db.assessments.push({
      id: 'assessment-baseline-100',
      title: 'Full-Stack Competency Diagnostic (100 Questions)',
      description: 'Comprehensive 10-level diagnostic evaluating technical readiness across 100 curated domain questions.',
      totalQuestions: 100,
      status: 'PUBLISHED',
      createdAt: new Date().toISOString()
    });

    db.questions.forEach((q, idx) => {
      db.assessmentQuestions.push({
        id: `aq-${idx + 1}`,
        assessmentId: 'assessment-baseline-100',
        questionId: q.id,
        orderIndex: idx + 1
      });
    });
  }

  // 5. Seed Courses & Lessons
  if (db.courses.length === 0) {
    db.courses.push({
      id: 'course-js-mastery',
      careerId: 'career-fs-01',
      title: 'Enterprise JavaScript & Modern Runtime Systems',
      slug: 'javascript-mastery',
      description: 'Master the event loop, V8 engine internals, memory management, and asynchronous patterns.',
      status: 'PUBLISHED',
      createdAt: new Date().toISOString()
    });

    db.modules.push({
      id: 'mod-js-1',
      courseId: 'course-js-mastery',
      title: 'Module 1: Execution Context & Memory Lifecycle',
      orderIndex: 1,
      createdAt: new Date().toISOString()
    });

    db.lessons.push({
      id: 'lesson-js-101',
      moduleId: 'mod-js-1',
      skillId: 'skill-js',
      levelNumber: 1,
      title: 'Understanding V8 Heap, Stack, and Variable Scope',
      description: 'Learn how JavaScript allocates primitives and object references in memory stack vs heap.',
      theory: `### Memory Allocation in JavaScript

JavaScript manages memory automatically using a garbage collector based on mark-and-sweep algorithms.

- **Stack Memory**: Static data allocation for primitive types (numbers, booleans, strings). Fast, fixed-size.
- **Heap Memory**: Dynamic memory allocation for objects, arrays, and functions.

\`\`\`javascript
let name = "CompetencyAI"; // Allocated on Call Stack
let user = { id: 101, role: "Engineer" }; // Object stored in Heap, reference stored in Stack
\`\`\`
`,
      codeExamples: JSON.stringify([{ label: 'Stack vs Heap Example', code: 'const a = 42;\nconst b = { key: "val" };' }]),
      estimatedTimeMinutes: 25,
      status: 'PUBLISHED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }

  // 6. Seed Coding Challenges (Requirement 24)
  if (db.codingChallenges.length === 0) {
    db.codingChallenges.push(
      {
        id: 'code-challenge-01',
        skillId: 'skill-js',
        levelNumber: 2,
        title: 'Two Sum Competency Challenge',
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.',
        starterCode: `function twoSum(nums, target) {\n  // Write your code here\n  return [];\n}`,
        testCases: JSON.stringify([
          { input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]', isHidden: false },
          { input: '[3, 2, 4], 6', expectedOutput: '[1, 2]', isHidden: false },
          { input: '[3, 3], 6', expectedOutput: '[0, 1]', isHidden: true }
        ]),
        constraints: '1 <= nums.length <= 10^4, Time complexity must be O(N).',
        status: 'PUBLISHED',
        createdAt: new Date().toISOString()
      },
      {
        id: 'code-challenge-02',
        skillId: 'skill-js',
        levelNumber: 4,
        title: 'Custom Debounce Function Implementation',
        description: 'Create a debounce function that delays invoking `fn` until after `delay` milliseconds have elapsed since the last call.',
        starterCode: `function debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}`,
        testCases: JSON.stringify([
          { input: 'fn, 100', expectedOutput: 'Function', isHidden: false }
        ]),
        constraints: 'Must handle context binding and arguments array.',
        status: 'PUBLISHED',
        createdAt: new Date().toISOString()
      }
    );
  }

  // 7. Seed Achievements
  if (db.achievements.length === 0) {
    db.achievements.push(
      { id: 'ach-1', code: 'FIRST_ASSESSMENT', title: 'Diagnostic Pioneer', description: 'Completed your first 100-Question Diagnostic Assessment.', badgeIcon: 'Target' },
      { id: 'ach-2', code: 'CODING_MAESTRO', title: 'Code Maestro', description: 'Passed all test cases on a production coding challenge.', badgeIcon: 'Code' },
      { id: 'ach-3', code: 'GRAPH_EXPLORER', title: 'Knowledge Architect', description: 'Mapped out 5 competency nodes on your Knowledge Graph.', badgeIcon: 'Network' },
      { id: 'ach-4', code: 'CAREER_READY_70', title: 'Career Ready 70%', description: 'Attained a 70%+ aggregate Career Readiness rating.', badgeIcon: 'Award' }
    );
  }

  writeDB(db);
}
