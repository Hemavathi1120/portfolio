// SINGLE SOURCE OF TRUTH: every value here is copied from the original portfolio
// at https://hemavathiportfolio.vercel.app/ — nothing is invented.

export const profile = {
  name: "HEMAVATHI SAIDHU",
  firstName: "HEMAVATHI",
  lastName: "SAIDHU",
  role: "Full Stack Developer",
  headline: "Crafting Digital Excellence",
  intro:
    "B.Tech student passionate about building elegant solutions. Full stack developer, Toastmaster leader, and innovation enthusiast dedicated to creating experiences that matter.",
  location: "Andhra Pradesh, India",
  status: "Open to Opportunities",
  avatar:
    "https://res.cloudinary.com/dobktsnix/image/upload/v1774164995/portfolio/avatars/lhhixdgb4t5mtknzzytu.jpg",
  resume:
    "https://res.cloudinary.com/dobktsnix/image/upload/v1774167092/portfolio/resumes/nmp1j8ywy02pmarmbdqn.png",
  email: "saidhuhema11@gmail.com",
  github: "https://github.com/Hemavathi1120",
  linkedin: "https://www.linkedin.com/in/saidhu-hemavathi-ba0b0631b/",
};

export const about = {
  eyebrow: "About Me",
  title: "Passionate About Creating Digital Excellence",
  body: "A B.Tech student at KIET Group of Engineering & Technology with a deep passion for building exceptional digital experiences. My journey in tech began with curiosity and has evolved into a commitment to excellence in creating solutions that make a meaningful difference.",
  note: "passinate to build wonders with ai",
  education: {
    degree: "B TECH",
    institution: "KAKINADA INSTITUTE OF ENGINEERING AND TECHNOLOGY",
    branch: "AID",
    grade: "Grade: 8.75",
  },
  coreSkills: [
    "CLOUDINARY",
    "LOVABLE",
    "FIRESTORE DATABASE",
    "FLOW AI",
    "CODE WITH AI",
    "GEMINI",
  ],
  leadership: {
    role: "VICE PRESIDENT PUBLIC RELATIONS",
    org: "KIET TOASTMASTERS CLUB",
    description:
      "THE VPPR JOB IN THIS TOASTMASTERS THOUGHT ME SOMETHING NEW THAT I CAN CHARISH FOR LIFE TIME LIKE DESIGNING AND POSTER MAKING AND MANY OTHERS",
  },
  stats: [
    { value: "3+", label: "Projects" },
    { value: "95.6%", label: "10th Grade" },
    { value: "92%", label: "Intermediate" },
  ],
};

export const education = [
  {
    period: "2024 - Present",
    result: "Ongoing",
    title: "B.Tech in Engineering",
    institution: "KIET Group of Engineering & Technology",
    description:
      "Pursuing Bachelor's degree with focus on full-stack development and emerging technologies.",
  },
  {
    period: "2022 - 2024",
    result: "92%",
    title: "Intermediate (MPC)",
    institution: "Sri Chaitanya Junior College, Eluru",
    description:
      "Completed with 92% aggregate, building strong foundations in mathematics and sciences.",
  },
  {
    period: "2022",
    result: "95.6%",
    title: "Secondary School (10th)",
    institution: "Sri Chaitanya Techno School, Eluru",
    description:
      "Graduated with distinction, demonstrating academic excellence from an early age.",
  },
];

export const skillGroups = [
  {
    category: "backend",
    items: [
      { name: "CLOUDINARY", level: 90 },
      { name: "FIRESTORE DATABASE", level: 95 },
    ],
  },
  {
    category: "frontend",
    items: [
      { name: "LOVABLE", level: 86 },
      { name: "CODE WITH AI", level: 50 },
    ],
  },
  {
    category: "tools",
    items: [
      { name: "FLOW AI", level: 100 },
      { name: "GEMINI", level: 75 },
      { name: "GOOGLE AI STUDIO", level: 90 },
      { name: "GROK", level: 80 },
      { name: "PROMPT BUILDING", level: 95 },
      { name: "CHATGPT", level: 90 },
      { name: "GITHUB", level: 78 },
      { name: "VS CODE", level: 82 },
    ],
  },
];


export const softSkills = [
  "Problem Solving",
  "Team Leadership",
  "Communication",
  "Adaptability",
  "Quick Learner",
  "Time Management",
];

export type Project = {
  id: string;
  index: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "hospital",
    index: "01",
    name: "HOSPITAL",
    featured: true,
    tags: ["gen AI"],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDEzehxpJwPjPZXKebNeMoAx5gCYyzPofMq2Vo_N4&s",
    description:
      "MediCare+ Healthcare Platform is a modern React-based healthcare web application designed to showcase a responsive and professional hospital/medical services interface. Built using TypeScript, React, Vite, Tailwind CSS, and Firebase, it offers a polished UI with validated forms and seamless routing. The project serves as a premium healthcare platform highlighting expert physicians, state-of-the-art facilities, and user-friendly design. It's ideal as a portfolio project or template for healthcare service websites, demonstrating best practices in modern front-end development. The codebase is fully customizable and deployable on platforms like Vercel or Firebase Hosting.",
  },
  {
    id: "expense-manager",
    index: "02",
    name: "EXPENSE MANAGER",
    featured: true,
    tags: [],
    image:
      "https://cdn.prod.website-files.com/64244f777752183940b98af6/642451b361e9570cd6c814a1_63d836d3a17bf828a91ff322_expense_management.png",
    description:
      "Expense Manager is a web-based finance tracking application that helps users record, view, and manage their daily expenses. It provides an intuitive interface to add, categorize, and monitor spending in real time. The app aims to simplify personal budgeting by giving users a clear overview of their financial activities. Built as a lightweight and responsive tool, it works seamlessly on both desktop and mobile browsers. With this app, users can stay organized and make better financial decisions by keeping their expense history structured and accessible.",
  },
  {
    id: "sahayak",
    index: "03",
    name: "SAHAYAK",
    featured: true,
    tags: ["gen AI"],
    image:
      "https://images.squarespace-cdn.com/content/v1/5e6b001abd00171b81d045e9/1621685196024-BREAPFXETEGC38EZJVOO/Teaching+Assistant.jpeg",
    description:
      "Sahayak is an AI-powered teaching assistant designed to support educators by simplifying lesson planning and content creation. It helps teachers generate structured lessons, worksheets, and learning activities quickly and efficiently. The platform supports localized and multilingual content, making it suitable for diverse classrooms. By automating repetitive academic tasks, Sahayak saves valuable time for teachers. This allows educators to focus more on student engagement and effective teaching.",
  },
  {
    id: "real-estate",
    index: "04",
    name: "REAL-ESTATE",
    featured: false,
    tags: [],
    image:
      "https://www.clvgroup.com/wp-content/uploads/1734370114508_CLV_Group__Real_estate_investing_-scaled.jpg",
    description:
      "DreamHouse One is a clean and modern real estate web application that showcases property listings for users to explore. It provides an attractive interface to browse homes, view featured properties, and get essential information about each listing. The app is built with responsive design so it works smoothly on both desktop and mobile screens. It aims to help users easily find their dream home by presenting properties clearly and intuitively. This project is ideal for portfolios or real estate showcase purposes.",
  },
  {
    id: "my-portfolio",
    index: "05",
    name: "MY PORTFOLIO",
    featured: false,
    tags: ["gen AI"],
    image:
      "https://static.resumegiants.com/wp-content/uploads/sites/25/2022/06/09105622/Professional-portfolio-736x414.webp",
    description:
      "This is a personal portfolio web app that highlights a curated collection of web development projects. It features responsive UI built with modern web technologies (like React/Next.js and Tailwind CSS) and showcases your deployed applications with links and descriptions. The site is designed to work seamlessly across desktop and mobile screens, making it easy for visitors to explore your skills and code highlights. It serves as a professional hub for employers or collaborators to view your work. Hosted on Vercel for fast performance and availability.",
  },
];

export const leadership = {
  eyebrow: "Leadership",
  title: "Beyond Code",
  intro:
    "Leadership isn't just about giving orders—it's about inspiring others, facilitating growth, and building communities.",
  org: "KIET TOASTMASTERS CLUB",
  orgDescription:
    "THE VPPR JOB IN THIS TOASTMASTERS THOUGHT ME SOMETHING NEW THAT I CAN CHARISH FOR LIFE TIME LIKE DESIGNING AND POSTER MAKING AND MANY OTHERS",
  since: "Since December 2025",
  logo: "https://hemavathiportfolio.vercel.app/logos/toastmasters-logo.png",
  roles: [
    {
      date: "Dec 2025",
      role: "VICE PRESIDENT PUBLIC RELATIONS",
      org: "KIET TOASTMASTERS CLUB",
      description:
        "THE VPPR JOB IN THIS TOASTMASTERS THOUGHT ME SOMETHING NEW THAT I CAN CHARISH FOR LIFE TIME LIKE DESIGNING AND POSTER MAKING AND MANY OTHERS",
    },
    {
      date: "Jun 2025",
      role: "SECRETARY",
      org: "KIET TOASTMASTERS",
      description:
        "BEING SECREATARY THE FIRST TIME IN THE EXECUTIVE COMMITEE I HAVE LEARNED SO MANY THINGS LIKE HOW THE TOASTMSATERS WORKS AND KNOW HOW TO MANAGE SOMETHING",
    },
  ],
};

export const contact = {
  eyebrow: "Contact",
  title: "Let's Connect",
  intro: "Have a project in mind or just want to say hello? I'd love to hear from you.",
};

export const sections = [
  { id: "identity", label: "IDENTITY", num: "01" },
  { id: "about", label: "ABOUT", num: "02" },
  { id: "experience", label: "EXPERIENCE", num: "03" },
  { id: "work", label: "WORK", num: "04" },
  { id: "skills", label: "SKILLS", num: "05" },
  { id: "education", label: "EDUCATION", num: "06" },
  { id: "contact", label: "CONTACT", num: "07" },
];
