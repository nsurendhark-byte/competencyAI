import fs from 'fs';
import path from 'path';

const PRIMARY_DB_FILE = path.join(process.cwd(), 'competency_db.json');
const VERCEL_TMP_DB_FILE = path.join('/tmp', 'competency_db.json');

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

function getDbFilePath(): string {
  if (process.env.VERCEL) {
    if (fs.existsSync(VERCEL_TMP_DB_FILE)) return VERCEL_TMP_DB_FILE;
    if (fs.existsSync(PRIMARY_DB_FILE)) return PRIMARY_DB_FILE;
    return VERCEL_TMP_DB_FILE;
  }
  return PRIMARY_DB_FILE;
}

export function readDB(): DBStore {
  try {
    const targetFile = getDbFilePath();
    if (!fs.existsSync(targetFile)) {
      if (fs.existsSync(PRIMARY_DB_FILE)) {
        const raw = fs.readFileSync(PRIMARY_DB_FILE, 'utf-8');
        return JSON.parse(raw);
      }
      const initial = getInitialStore();
      return initial;
    }
    const raw = fs.readFileSync(targetFile, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB file:', err);
    return getInitialStore();
  }
}

export function writeDB(store: DBStore): void {
  try {
    const targetFile = process.env.VERCEL ? VERCEL_TMP_DB_FILE : PRIMARY_DB_FILE;
    fs.writeFileSync(targetFile, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    try {
      fs.writeFileSync(VERCEL_TMP_DB_FILE, JSON.stringify(store, null, 2), 'utf-8');
    } catch (fallbackErr) {
      console.error('Error writing DB file fallback:', fallbackErr);
    }
  }
}
