
export interface ContactInfo {
  email: string;
  // portfolio?: string; // Optional: for a link to an external portfolio
  // linkedIn?: string;  // Optional: LinkedIn profile URL
}

export interface ProfileSummary {
  narrative: string;
  highlights: string[];
}

export interface PersonalInfo {
  name: string;
  title: string; // e.g., "Electrical Engineering Student | Aspiring AI Technologist"
  contacts: ContactInfo;
  dob: string;
  college: string;
}

export interface AcademicRecord {
  qualification: string;
  institution: string; // Changed from board for clarity
  year: string;
  percentage?: string | number; // Make percentage primary
  cgpa?: string; // Specific for CGPA if applicable
  details?: Array<{ year: string, score: string, type: 'CGPA' | 'Percentage' }>; // More flexible score reporting
}

export interface TechnicalProficiencyCategory {
  categoryName: string;
  tools: string[];
}

export interface CoreCompetency {
  name: string;
  description: string; // Can be a paragraph or bullet points string
}

export interface Project {
  title: string; // Changed from name for impact
  date: string;
  description: string; // Key new field for details
  technologies: string[]; // Key technologies used
  achievement?: string; // e.g., "Hackathon Winner"
}

export interface Skill { // For soft skills
  name: string;
  description: string;
}

export interface LanguageProficiency {
  language: string;
  speaking: string;
  reading: string;
  writing: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  profileSummary: ProfileSummary;
  academicQualifications: AcademicRecord[];
  technicalProficiencies: TechnicalProficiencyCategory[];
  coreCompetencies: CoreCompetency[];
  projectsShowcase: Project[];
  projectManagementSkills: Skill[]; // Re-using Skill type for consistency
  certifications: string[];
  extraCurricularActivities: string[];
  softSkills: Skill[];
  languageCapability: LanguageProficiency[];
}
