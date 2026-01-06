import { Vulnerability } from "@/components/ui/VulnerabilityCard";

export const mockVulnerabilities: Vulnerability[] = [
  {
    id: "vuln-001",
    title: "SQL Injection Vulnerability",
    description: "User input is directly concatenated into SQL query without proper sanitization, allowing potential SQL injection attacks.",
    severity: "critical",
    location: "src/api/users.py:45",
    code: `query = "SELECT * FROM users WHERE id = " + user_id`,
    suggestion: `# Use parameterized queries to prevent SQL injection
query = "SELECT * FROM users WHERE id = %s"
cursor.execute(query, (user_id,))`,
  },
  {
    id: "vuln-002",
    title: "Hardcoded API Key Detected",
    description: "Sensitive API key is hardcoded in the source code. This can lead to unauthorized access if the codebase is exposed.",
    severity: "critical",
    location: "src/config/api.js:12",
    code: `const API_KEY = "sk-prod-a1b2c3d4e5f6g7h8i9j0"`,
    suggestion: `// Move sensitive keys to environment variables
const API_KEY = process.env.API_KEY;

// Add to .env file (never commit to version control)
// API_KEY=sk-prod-a1b2c3d4e5f6g7h8i9j0`,
  },
  {
    id: "vuln-003",
    title: "Cross-Site Scripting (XSS) Risk",
    description: "User-provided content is rendered without proper escaping, potentially allowing script injection.",
    severity: "medium",
    location: "src/components/Comment.tsx:28",
    code: `<div dangerouslySetInnerHTML={{ __html: userComment }} />`,
    suggestion: `// Sanitize HTML content before rendering
import DOMPurify from 'dompurify';

<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userComment) 
}} />`,
  },
  {
    id: "vuln-004",
    title: "Weak Password Hashing",
    description: "MD5 is being used for password hashing. MD5 is cryptographically broken and unsuitable for security purposes.",
    severity: "medium",
    location: "src/auth/hash.py:15",
    code: `password_hash = hashlib.md5(password.encode()).hexdigest()`,
    suggestion: `# Use bcrypt for secure password hashing
import bcrypt

salt = bcrypt.gensalt(rounds=12)
password_hash = bcrypt.hashpw(password.encode(), salt)`,
  },
  {
    id: "vuln-005",
    title: "Missing Rate Limiting",
    description: "API endpoint lacks rate limiting, making it vulnerable to brute force and DDoS attacks.",
    severity: "medium",
    location: "src/api/auth.js:50",
    suggestion: `// Implement rate limiting with express-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/auth', limiter);`,
  },
  {
    id: "vuln-006",
    title: "Insecure Cookie Configuration",
    description: "Session cookie is missing HttpOnly and Secure flags, making it accessible to JavaScript and vulnerable to interception.",
    severity: "low",
    location: "src/middleware/session.js:8",
    code: `res.cookie('session', token, { maxAge: 3600000 })`,
    suggestion: `// Add security flags to cookies
res.cookie('session', token, { 
  maxAge: 3600000,
  httpOnly: true,  // Prevents JavaScript access
  secure: true,    // Only sent over HTTPS
  sameSite: 'strict' // CSRF protection
})`,
  },
  {
    id: "vuln-007",
    title: "Verbose Error Messages",
    description: "Detailed error stack traces are exposed to users in production, potentially revealing sensitive system information.",
    severity: "low",
    location: "src/app.js:120",
    code: `app.use((err, req, res, next) => {
  res.status(500).json({ error: err.stack });
});`,
    suggestion: `// Hide stack traces in production
app.use((err, req, res, next) => {
  console.error(err.stack); // Log internally
  
  const message = process.env.NODE_ENV === 'production' 
    ? 'An unexpected error occurred'
    : err.message;
    
  res.status(500).json({ error: message });
});`,
  },
];

export const mockScanHistory = [
  {
    id: "scan-001",
    filename: "api-server.py",
    date: "2024-01-15",
    riskScore: 72,
    vulnerabilities: { critical: 2, medium: 3, low: 1 },
  },
  {
    id: "scan-002",
    filename: "auth-module.js",
    date: "2024-01-14",
    riskScore: 45,
    vulnerabilities: { critical: 0, medium: 2, low: 3 },
  },
  {
    id: "scan-003",
    filename: "data-logs.json",
    date: "2024-01-13",
    riskScore: 23,
    vulnerabilities: { critical: 0, medium: 1, low: 2 },
  },
  {
    id: "scan-004",
    filename: "user-service.ts",
    date: "2024-01-12",
    riskScore: 85,
    vulnerabilities: { critical: 3, medium: 4, low: 2 },
  },
  {
    id: "scan-005",
    filename: "config.csv",
    date: "2024-01-11",
    riskScore: 12,
    vulnerabilities: { critical: 0, medium: 0, low: 2 },
  },
];
