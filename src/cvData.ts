
import { CVData } from './types';

export const cvDataContent: CVData = {
  personalInfo: {
    name: "",
    title: "Electrical Engineering Innovator | AI Enthusiast",
    contacts: {
      email: "lokenathroy2003@gmail.com",
      // linkedIn: "linkedin.com/in/yourprofile" // Example
    },
    dob: "12/11/2003",
    college: "Institute of Engineering & Management (IEM), Kolkata",
  },
  profileSummary: {
    narrative:
      "A highly motivated Electrical Engineering student at IEM Kolkata with a strong foundation in core electrical principles and a fervent interest in AI, machine learning, and sustainable technologies. Passionate about leveraging simulation tools and programming to design innovative solutions for real-world challenges. Eager to contribute to a dynamic team and grow in a challenging tech environment.",
    highlights: [
      "Hands-on experience in award-winning hardware projects and complex system simulations.",
      "Proficient in MATLAB, Python, SolidWorks, and various power system analysis software.",
      "Adept at translating theoretical knowledge into practical, impactful engineering solutions.",
      "Proactive learner, certified in AI and prompt engineering, committed to continuous skill development.",
    ],
  },
  academicQualifications: [
    {
      qualification: "Bachelor of Technology (B.Tech), Electrical Engineering",
      institution: "MAKAUT (for IEM Kolkata)",
      year: "Pursuing 3rd Year (Expected Graduation: 2026)",
      cgpa: "8.9/10 (Average up to 3rd Year)",
      details: [
        { year: "3rd Year (Ongoing)", score: "9.18", type: "CGPA" },
        { year: "2nd Year", score: "8.6", type: "CGPA" },
        { year: "1st Year", score: "8.87", type: "CGPA" },
      ],
    },
    {
      qualification: "AISSCE (Class XII, Science)",
      institution: "CBSE Board",
      year: "2021",
      percentage: "93.7%",
    },
    {
      qualification: "AISSE (Class X)",
      institution: "CBSE Board",
      year: "2019",
      percentage: "86.5%",
    },
  ],
  technicalProficiencies: [
    {
      categoryName: "Simulation & Design Software",
      tools: [
        "MATLAB & Simulink",
        "PSpice & LTSpice",
        "SolidWorks (CAD/CAE)",
        "FEMM (Finite Element Analysis)",
        "ETAP",
        "Power World Simulator",
        "KiCAD (PCB Design)",
        "OpenRocket (Simulation)",
      ],
    },
    {
      categoryName: "Programming & Development",
      tools: ["Python (NumPy, Pandas, Scikit-learn)", "Arduino CPP", "C/C++ Basics", "JavaScript (Basic for Web Interaction)"],
    },
    {
      categoryName: "AI & Data Platforms",
      tools: ["OpenAI API", "Mistral API", "Llama Models", "Claude API", "IBM WatsonX (Certified)"],
    },
    {
      categoryName: "Productivity & Office",
      tools: ["MS Office Suite (Word, Excel, PowerPoint)", "Google Workspace"],
    }
  ],
  coreCompetencies: [
    {
      name: "Electrical Design & Simulation",
      description:
        "Expertise in schematic capture, circuit simulation (analog/digital), and system modeling using SPICE variants and MATLAB/Simulink. Proficient in 3D modeling (SolidWorks) and Finite Element Analysis (FEMM) for electromechanical systems and magnetic field simulations.",
    },
    {
      name: "Power Systems Analysis",
      description:
        "Comprehensive understanding of power generation, transmission, distribution, and protection. Skilled in load flow studies, fault analysis, and system stability assessment using ETAP and Power World Simulator.",
    },
    {
      name: "Control Systems & Automation",
      description:
        "Solid grasp of open-loop/closed-loop control systems, feedback mechanisms, and sensor/transducer integration. Experienced with microcontroller programming (Arduino) for automation tasks.",
    },
    {
      name: "AI Application & Development",
      description:
        "Actively exploring and applying AI/ML concepts. Certified in Prompt Engineering (IBM WatsonX) and experienced with various LLM APIs for developing intelligent applications and data analysis.",
    },
  ],
  projectsShowcase: [
    {
      title: "Numerical Relay Prototype with Remote Monitoring",
      date: "Ongoing",
      description:
        "Developing an Arduino-MATLAB integrated numerical relay for overcurrent protection, featuring remote monitoring capabilities. Focuses on real-time data acquisition, fault detection algorithms, and IoT integration for enhanced power system reliability.",
      technologies: ["MATLAB", "Arduino", "Simulink", "Embedded C++", "IoT Concepts"],
      achievement: "Selected for internal university showcase",
    },
    {
      title: "Permanent Magnet Linear Synchronous Motor (PMLSM) Design",
      date: "February 2025 (Target)",
      description:
        "Designing and simulating a PMLSM for a specific application, focusing on optimizing thrust, efficiency, and thermal performance using FEMM and SolidWorks. Involves theoretical analysis and iterative design improvements.",
      technologies: ["FEMM", "SolidWorks", "MATLAB", "Electromagnetics"],
    },
    {
      title: "Fault Detection in Ring Main Distribution Systems",
      date: "September 2024",
      description:
        "Developed a hardware prototype and simulation model to detect and annunciate faults in a ring main distribution system, improving understanding of power system protection schemes.",
      technologies: ["Circuit Design", "Microcontrollers", "Sensors", "PSpice"],
       achievement: "Hackathon - 2nd Place",
    },
    {
      title: "Miniature Modified Sine Wave Inverter",
      date: "January 2024",
      description:
        "Successfully designed, built, and tested a compact modified sine wave inverter. Gained practical experience in power electronics, PCB design, and component selection.",
      technologies: ["Power Electronics", "Analog/Digital Circuits", "PCB Layout (KiCAD basics)"],
    },
    {
      title: "Smart City Project Simulation",
      date: "July 2023",
      description:
        "Contributed to a team project simulating smart grid features for an urban environment, including smart lighting and traffic control using MATLAB and Simulink.",
      technologies: ["MATLAB", "Simulink", "Control Logic", "Team Collaboration"],
    },
  ],
  projectManagementSkills: [
      { name: "Planning & Scoping", description: "Ability to define project objectives, deliverables, timelines, and resource requirements effectively." },
      { name: "Execution & Coordination", description: "Experience in managing project tasks, delegating responsibilities, ensuring quality control, and driving timely completion." },
      { name: "Problem Solving & Troubleshooting", description: "Skilled in identifying, analyzing, and resolving technical and non-technical issues proactively within project constraints." },
      { name: "Agile Learner", description: "Quickly adapts to new tools, technologies, and methodologies to meet project demands."}
  ],
  certifications: [
    "Prompt Engineering Certification, IBM WatsonX Platform",
    "Joy of Computing in Python, NPTEL (IIT Madras)",
    "AI in Marketing, NPTEL (IIT Roorkee)",
    // "Python for Data Science, Coursera (Example if you have one)"
  ],
  extraCurricularActivities: [
    "Passionate Chess Player: Participated in national-level age-group tournaments, developing strategic thinking and foresight.",
    "Published Author & Poet: Authored a book and numerous poems (400+) on Quora (65k+ followers) and literary journals, honing creative expression and communication.",
    "Member, IEM Innovation Cell: Actively participate in brainstorming and developing new project ideas.",
  ],
  softSkills: [
    { name: "Analytical & Critical Thinking", description: "Methodical approach to complex technical challenges, focusing on root-cause analysis and innovative solutions." },
    { name: "Effective Communication", description: "Articulate in conveying technical concepts clearly to diverse audiences, both verbally and in writing." },
    { name: "Collaborative Teamwork", description: "Proactive team player, adept at both leading and supporting colleagues to achieve shared goals." },
    { name: "Adaptability & Resilience", description: "Embraces new technologies and methodologies; maintains performance under pressure and adapts to changing project requirements." },
    { name: "Attention to Detail & Meticulousness", description: "Committed to accuracy and thoroughness in all aspects of design, implementation, and documentation." },
  ],
  languageCapability: [
    { language: "English", speaking: "Excellent (Fluent)", reading: "Excellent", writing: "Excellent" },
    { language: "Hindi", speaking: "Excellent (Fluent)", reading: "Good", writing: "Good" },
    { language: "Bengali", speaking: "Native", reading: "Excellent", writing: "Excellent" },
  ],
};
