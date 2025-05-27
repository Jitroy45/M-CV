
import React, { useState, useEffect, useRef } from 'react';
import { CVData, AcademicRecord, TechnicalProficiencyCategory, CoreCompetency, Project, Skill as GenericSkill, LanguageProficiency } from './types'; // Renamed Skill to GenericSkill to avoid conflict
import { cvDataContent } from './cvData';
import Section from './components/Section';
import AnimatedBackground from './components/AnimatedBackground';
import SectionConnector from './components/SectionConnector';

const toTitleCase = (str: string): string => {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
};

const App: React.FC = () => {
  const data: CVData = cvDataContent;
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [headerNameChars, setHeaderNameChars] = useState<string[]>([]);

  useEffect(() => {
    // Prepare the name for animation: trim, convert to title case, then split.
    const originalName = data.personalInfo.name || ""; // Ensure it's a string
    const displayName = toTitleCase(originalName.trim());
    const nameChars = displayName.split('');
    
    let currentIndex = 0;
    setHeaderNameChars([]); // Clear previous state
    
    const interval = setInterval(() => {
      if (currentIndex < nameChars.length) {
        setHeaderNameChars(prev => [...prev, nameChars[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust speed of character animation
    
    return () => clearInterval(interval);
  }, [data.personalInfo.name]);


  const renderAcademicRecord = (record: AcademicRecord, index: number) => (
    <div key={index} className="mb-4 p-3 border border-green-700 rounded-md bg-black bg-opacity-30 backdrop-blur-sm animate-fadeInUpItem">
      <h4 className="text-lg text-green-300 font-semibold">{record.qualification}</h4>
      <p className="text-sm text-green-400">{record.institution} - {record.year}</p>
      {record.cgpa && <p className="text-sm text-green-400">CGPA: {record.cgpa}</p>}
      {record.percentage && <p className="text-sm text-green-400">Percentage: {record.percentage}</p>}
      {record.details && record.details.length > 0 && (
        <ul className="list-disc list-inside ml-4 text-green-400 text-xs">
          {record.details.map((detail, i) => (
            <li key={i}>{detail.year}: {detail.score} {detail.type}</li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderTechnicalProficiencies = (categories: TechnicalProficiencyCategory[]) => (
    <div className="space-y-4">
      {categories.map((category, index) => (
        <div key={index} className="animate-fadeInUpItem">
          <h4 className="text-md text-green-300 font-semibold mb-1">{category.categoryName}</h4>
          <ul className="flex flex-wrap gap-2">
            {category.tools.map((tool, toolIndex) => (
              <li key={toolIndex} className="bg-green-900 bg-opacity-60 text-green-300 text-xs px-2 py-1 rounded subtle-glow-on-hover">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
  
  const renderCoreCompetencies = (competencies: CoreCompetency[]) => (
    <div className="space-y-3">
      {competencies.map((competency, index) => (
        <div key={index} className="animate-fadeInUpItem">
          <h4 className="text-lg text-green-300 font-semibold">{competency.name}</h4>
          <p className="text-green-400 leading-relaxed text-sm whitespace-pre-line">{competency.description}</p>
        </div>
      ))}
    </div>
  );

  const renderProjects = (projects: Project[]) => (
     <div className="space-y-6">
      {projects.map((project, index) => (
        <div key={index} className="p-3 border border-green-800 rounded-md bg-black bg-opacity-20 animate-fadeInUpItem">
          <h4 className="text-xl text-green-300 font-semibold">{project.title}
            {project.achievement && <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full glow">{project.achievement}</span>}
          </h4>
          <p className="text-xs text-green-500 mb-1">{project.date}</p>
          <p className="text-green-400 text-sm mb-2 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="text-xs bg-green-700 bg-opacity-50 text-green-200 px-2 py-0.5 rounded">{tech}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderGenericSkills = (skills: GenericSkill[], title: string) => (
    <ul className="list-disc list-inside space-y-2 text-green-400">
      {skills.map((skill, index) => (
        <li key={index} className="animate-fadeInUpItem">
          <span className="font-semibold text-green-300">{skill.name}:</span>
          <span className="text-sm"> {skill.description}</span>
        </li>
      ))}
    </ul>
  );

  const renderLanguageTable = (languages: LanguageProficiency[]) => (
    <div className="overflow-x-auto animate-fadeInUpItem">
      <table className="min-w-full text-sm text-left text-green-400 border border-green-700">
        <thead className="text-xs text-green-300 uppercase bg-green-900 bg-opacity-50">
          <tr>
            <th scope="col" className="px-4 py-2 border-r border-green-700">Language</th>
            <th scope="col" className="px-4 py-2 border-r border-green-700">Speaking</th>
            <th scope="col" className="px-4 py-2 border-r border-green-700">Reading</th>
            <th scope="col" className="px-4 py-2">Writing</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((lang, index) => (
            <tr key={index} className="border-b border-green-700 hover:bg-green-800 hover:bg-opacity-30">
              <td className="px-4 py-2 font-medium text-green-300 whitespace-nowrap border-r border-green-700">{lang.language}</td>
              <td className="px-4 py-2 border-r border-green-700">{lang.speaking}</td>
              <td className="px-4 py-2 border-r border-green-700">{lang.reading}</td>
              <td className="px-4 py-2">{lang.writing}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const sections = [
    { id: "profile", title: "Profile Summary", content: (
      <>
        <p className="text-green-400 leading-relaxed mb-4 animate-fadeInUpItem">{data.profileSummary.narrative}</p>
        <ul className="list-none space-y-1">
          {data.profileSummary.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start animate-fadeInUpItem" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="text-green-300 mr-2 glow text-xl">&#10147;</span> {/* Custom bullet */}
              <span className="text-green-400">{highlight}</span>
            </li>
          ))}
        </ul>
      </>
    )},
    { id: "academic", title: "Academic Qualifications", content: data.academicQualifications.map(renderAcademicRecord) },
    { id: "proficiencies", title: "Technical Proficiencies", content: renderTechnicalProficiencies(data.technicalProficiencies) },
    { id: "core-competencies", title: "Core Competencies", content: renderCoreCompetencies(data.coreCompetencies) },
    { id: "projects", title: "Projects Showcase", content: renderProjects(data.projectsShowcase) },
    { id: "management-skills", title: "Project Management Capabilities", content: renderGenericSkills(data.projectManagementSkills, "Project Management Skills") },
    { id: "certifications", title: "Certifications & Continuous Learning", content: (
      <ul className="list-disc list-inside space-y-1 text-green-400">
        {data.certifications.map((item, index) => <li key={index} className="animate-fadeInUpItem">{item}</li>)}
      </ul>
    )},
    { id: "extra-curricular", title: "Extra-Curricular Engagements", content: (
      <ul className="list-disc list-inside space-y-1 text-green-400">
        {data.extraCurricularActivities.map((item, index) => <li key={index} className="animate-fadeInUpItem whitespace-pre-line">{item}</li>)}
      </ul>
    )},
    { id: "soft-skills", title: "Soft Skills", content: renderGenericSkills(data.softSkills, "Soft Skills") },
    { id: "language-capability", title: "Language Capability", content: renderLanguageTable(data.languageCapability) },
     { id: "contact", title: "Get In Touch", content: (
      <div className="text-center animate-fadeInUpItem">
        <p className="text-green-400 mb-2">Feel free to reach out for collaborations or opportunities:</p>
        <a href={`mailto:${data.personalInfo.contacts.email}`}
           className="text-xl text-green-300 hover:text-green-100 glow hover:underline transition-all duration-300">
          {data.personalInfo.contacts.email}
        </a>
        {/* Add LinkedIn or Portfolio links here if available in data */}
      </div>
    )},
  ];

  const sectionIds = sections.map(s => s.id);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black font-mono">
      <AnimatedBackground />
      <SectionConnector sectionIds={sectionIds} activeSectionId={activeSection} />
      
      <header className="sticky top-0 z-20 py-4 px-4 md:px-8 bg-black bg-opacity-80 backdrop-blur-lg shadow-lg shadow-green-900/50">
        <div className="container mx-auto flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-green-400 glow h-12 flex items-center justify-center"> {/* Increased height to h-12 and added flex for centering */}
            {headerNameChars.map((char, index) => (
              <span key={index} style={{ animation: `textEntry 0.5s ease forwards ${index * 0.05}s`, display: 'inline-block' }}> {/* Ensure span takes space */}
                {char}
              </span>
            ))}
             {headerNameChars.length === 0 && <>&nbsp;</> /* Placeholder for height when empty */}
          </h1>
          <p className="text-center text-green-500 subtle-glow text-md">{data.personalInfo.title}</p>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 space-y-16"> {/* Increased space-y */}
        {sections.map(sec => (
          <Section 
            title={sec.title} 
            id={sec.id} 
            key={sec.id}
            onVisible={() => setActiveSection(sec.id)} // Basic active section tracking
            isFocused={activeSection === sec.id} // Pass focus state
          >
            {sec.content}
          </Section>
        ))}
      </main>
      
      <footer className="py-8 px-4 text-center text-sm text-green-600 relative z-10">
        <p className="mb-1">&copy; {new Date().getFullYear()} Lokenath Roy. All rights reserved.</p>
        <p>Interactive Résumé | Last Updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
};

export default App;
