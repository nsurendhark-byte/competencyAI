import fs from 'fs';
import path from 'path';

// Production database path
const DB_FILE = path.join(process.cwd(), 'competency_db.json');

// Interface definition for local embedded DB state
export interface DBStore {
  users: any[];
  profiles: any[];
  adminUsers: any[];
  careers: any[];
  skills: any[];
  skillLevels: any[];
  skillDependencies: any[];
  courses: any[];
  modules: any[];
  lessons: any[];
  resources: any[];
  questions: any[];
  questionOptions: any[];
  assessments: any[];
  assessmentQuestions: any[];
  assessmentAttempts: any[];
  assessmentAnswers: any[];
  practiceQuestions: any[];
  practiceAttempts: any[];
  codingChallenges: any[];
  codingSubmissions: any[];
  projects: any[];
  projectSubmissions: any[];
  roadmaps: any[];
  roadmapItems: any[];
  learningProgress: any[];
  skillMasteries: any[];
  careerReadiness: any[];
  careerTwins: any[];
  studySessions: any[];
  achievements: any[];
  userAchievements: any[];
  aiConversations: any[];
  aiMessages: any[];
  interviewSessions: any[];
  interviewResults: any[];
  issueReports: any[];
  contentVersions: any[];
  notifications: any[];
  contactMessages: any[];
  auditLogs: any[];
}

function getInitialStore(): DBStore {
  return {
    users: [],
    profiles: [],
    adminUsers: [],
    careers: [],
    skills: [],
    skillLevels: [],
    skillDependencies: [],
    courses: [],
    modules: [],
    lessons: [],
    resources: [],
    questions: [],
    questionOptions: [],
    assessments: [],
    assessmentQuestions: [],
    assessmentAttempts: [],
    assessmentAnswers: [],
    practiceQuestions: [],
    practiceAttempts: [],
    codingChallenges: [],
    codingSubmissions: [],
    projects: [],
    projectSubmissions: [],
    roadmaps: [],
    roadmapItems: [],
    learningProgress: [],
    skillMasteries: [],
    careerReadiness: [],
    careerTwins: [],
    studySessions: [],
    achievements: [],
    userAchievements: [],
    aiConversations: [],
    aiMessages: [],
    interviewSessions: [],
    interviewResults: [],
    issueReports: [],
    contentVersions: [],
    notifications: [],
    contactMessages: [],
    auditLogs: [],
  };
}

export function readDB(): DBStore {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialStore();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB file:', err);
    return getInitialStore();
  }
}

export function writeDB(store: DBStore): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB file:', err);
  }
}
