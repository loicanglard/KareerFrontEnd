import React, { useState, useRef, useEffect } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { NavigationSection } from "../Dashboard/sections/NavigationSection";
import { EditableBio } from "../../components/EditableBio";
import { ProfileContactCard } from "../../components/ProfileContactCard";
import { ProfileImageUpload } from "../../components/ProfileImageUpload/ProfileImageUpload";
import { ProfileBannerUpload } from "../../components/ProfileBannerUpload/ProfileBannerUpload";
import { 
  EditIcon, 
  DownloadIcon, 
  MapPinIcon, 
  PhoneIcon, 
  MailIcon, 
  CalendarIcon,
  LinkedinIcon,
  GlobeIcon,
  PlusIcon,
  BookOpenIcon,
  BriefcaseIcon,
  AwardIcon,
  FolderIcon,
  StarIcon,
  TrendingUpIcon,
  ChevronRightIcon,
  UserIcon,
  GraduationCapIcon,
} from "lucide-react";

// Profile data
const profileData = {
  name: "Alex Smith",
  id: "10105518",
  email: "alex.smith@aes.edu",
  phone: "07551 541758",
  birthdate: "05/06/2005",
  location: "Paris, France",
  linkedin: "https://www.linkedin.com/in/alexsmith2005",
  portfolio: "https://Alex.portfolio.com",
  bio: "Étudiant passionné par le commerce, spécialisé en marchés internationaux et en transformation numérique, je poursuis actuellement une licence à l’AES Business School. Mon parcours m’a permis d’acquérir une solide expérience en analyse stratégique et en gestion de projet, que je souhaite mettre au service d’entreprises innovantes.",
  profileCompletion: 85,
  initials: "AS"
};

// Skills data
const skills = [
  { name: "Analyse Stratégique", level: 90 },
  { name: "Gestion de Projet", level: 85 },
  { name: "Commerce International", level: 88 },
  { name: "Marketing Digital", level: 75 },
  { name: "Analyse de Données", level: 70 },
  { name: "Prise de Parole en Public", level: 80 }
];

// Languages data
const languages = [
  { name: "Français", level: "Langue maternelle" },
  { name: "Anglais", level: "Courant" },
  { name: "Espagnol", level: "Intermédiaire" },
  { name: "Allemand", level: "Notions" }
];

// Education data
const educationData = [
  {
    institution: "AES Business School",
    degree: "Bachelor in Management",
    period: "Sep 2023 - Jun 2026",
    location: "Paris, France",
    gpa: "3.8/4.0",
    status: "En cours",
    cycle: "Bachelor",
    specialisation: "International Business",
    mineure: "Entrepreneuriat",
    studyMode: "Temps plein",
    specificPath: "N/A",
    hasYearPages: true,
    years: [
      {
        year: 1,
        title: "Première Année - Fondamentaux",
        period: "Sep 2023 - Jun 2024",
        modules: [
          "Introduction to Business Strategy",
          "Financial Accounting Fundamentals",
          "Marketing Principles",
          "Organizational Behavior",
          "Business Statistics",
          "Microeconomics",
          "Communication Skills",
          "Business Ethics"
        ]
      },
      {
        year: 2,
        title: "Deuxième Année - Développement",
        period: "Sep 2024 - Jun 2025",
        modules: [
          "International Business",
          "Markets and Consumption",
          "Interpreting Management",
          "Foundation in Digital Enterprise",
          "Corporate Finance",
          "Operations Management",
          "Strategic Analysis",
          "Managerial Economics"
        ]
      },
      {
        year: 3,
        title: "Troisième Année - Spécialisation",
        period: "Sep 2025 - Jun 2026",
        modules: [
          "Advanced Strategic Management",
          "Global Market Entry",
          "Digital Transformation",
          "Entrepreneurship & Innovation",
          "Leadership Development",
          "Business Analytics",
          "Negotiation & Conflict Resolution",
          "Capstone Project"
        ]
      }
    ]
  },
  {
    institution: "Saint Nicolas Paris",
    degree: "Baccalauréat Général",
    period: "Jun 2023",
    location: "Paris, France",
    gpa: "17.2/20",
    status: "Terminé",
    mention: "Très Bien",
    specialisation: "Mathématiques et Physique-Chimie",
    specificPath: "Voie Générale",
    bacType: "Baccalauréat Général",
    hasYearPages: false,
    modules: [
      "Mathématiques (Spécialité)",
      "Physique-Chimie",
      "Grand Oral",
      "Histoire-Géographie",
      "Philosophie",
      "Langues Vivantes (Anglais)"
    ]
  }
];

// Projects data
const projectsData = [
  {
    name: "International Market Entry Strategy",
    organization: "AES Business School",
    period: "Jan 2024 - May 2024",
    description: "Led a team of **5 students** to develop a comprehensive **market entry strategy** for a French company expanding to **Asian markets**. This project involved extensive research into **cultural differences**, **regulatory environments**, and **competitive landscapes** across multiple Asian countries. Our team conducted **SWOT analysis**, **Porter's Five Forces analysis**, and **financial modeling** to evaluate different entry modes including **joint ventures**, **strategic alliances**, and **wholly-owned subsidiaries**. We presented our findings to a panel of professors and industry professionals, demonstrating our ability to think strategically about **international expansion** challenges.",
    keyLearning: [
      "Developed expertise in **international market analysis** by evaluating macroeconomic factors, political stability, and business environments in target countries.",
      "Enhanced **team leadership skills** by coordinating workstreams, facilitating meetings, and ensuring alignment across diverse perspectives and working styles.",
      "Gained practical experience in **strategic frameworks** including market entry modes, risk assessment matrices, and financial projections for international ventures.",
      "Improved **presentation skills** through multiple practice sessions and final presentation to stakeholders, receiving constructive feedback on clarity and impact.",
      "Learned to synthesize complex data from multiple sources into actionable recommendations, balancing **risk** and **opportunity** in strategic decision-making.",
      "Strengthened **cross-cultural competence** by studying how cultural dimensions impact business practices, negotiations, and consumer behavior in Asian markets."
    ],
    skills: ["Strategic Planning", "Market Research", "Team Leadership", "Financial Modeling", "Cross-Cultural Analysis"],
    status: "Terminé"
  },
  {
    name: "Organisation de Tournois d'Échecs",
    organization: "Projet Personnel",
    period: "2015 - Présent",
    description: "Since 2015, I have been organizing and managing **local chess tournaments** in my community, growing the initiative from small gatherings of 10-15 players to larger events attracting over **50 participants**. This long-term personal project involves **event planning**, **logistics coordination**, **sponsor outreach**, and **community engagement**. I handle everything from **venue booking** and **equipment management** to **tournament software** and **results publication**. The tournaments have become a regular fixture in the local chess community, fostering **competitive play**, **skill development**, and **social connections** among players of all ages and levels.",
    keyLearning: [
      "Developed strong **organizational skills** by managing all aspects of tournament planning, from initial concept to post-event analysis and feedback collection.",
      "Enhanced **leadership abilities** through recruiting and coordinating volunteers, delegating tasks effectively, and maintaining team motivation throughout events.",
      "Gained experience in **stakeholder management** by building relationships with local chess clubs, schools, and community centers to promote participation.",
      "Improved **problem-solving skills** by handling unexpected challenges during events such as scheduling conflicts, equipment failures, and participant disputes.",
      "Learned **budget management** by tracking expenses, securing sponsorships, managing registration fees, and ensuring financial sustainability of the tournaments.",
      "Strengthened **communication skills** by creating promotional materials, managing social media presence, and engaging with participants before, during, and after events."
    ],
    skills: ["Gestion d'Événements", "Leadership", "Organisation", "Communication", "Budget Management", "Community Engagement"],
    status: "En cours"
  }
];

// Work experience data
const workExperienceData = [
  {
    position: "Business Analyst Intern",
    company: "Deloitte",
    period: "Jun 2024 - Aug 2024",
    location: "Paris, France",
    description: "As a Business Analyst Intern at **Deloitte**, I was embedded within a **high-performing consulting team** focused on delivering strategic insights to clients in the **retail and consumer goods sector**. My primary responsibilities included conducting comprehensive **market research**, performing **competitive landscape analysis**, and synthesizing complex datasets into actionable recommendations. I collaborated closely with senior consultants and project managers to develop **data-driven strategies** that addressed client challenges related to market positioning, customer segmentation, and operational efficiency. Throughout the internship, I gained hands-on experience with industry-standard analytical tools such as **Excel**, **Tableau**, and **PowerPoint**, while also developing strong **communication skills** through regular client presentations. This role significantly enhanced my ability to work under pressure, manage multiple priorities, and deliver high-quality work within tight deadlines. The experience provided me with deep insights into the **consulting industry**, strategic problem-solving, and the importance of client relationship management in professional services.",
    achievements: [
      "Improved data analysis efficiency by 25% through automation of recurring reporting tasks using Excel macros and Python scripts",
      "Presented findings to senior management and client stakeholders, receiving commendation for clarity and insight",
      "Contributed to a major strategic review project that influenced client's three-year expansion roadmap"
    ],
    status: "Terminé"
  },
  {
    position: "Assistant Marketing",
    company: "Local Startup",
    period: "Sep 2023 - Dec 2023",
    location: "Paris, France",
    description: "In my role as Marketing Assistant at a dynamic **tech startup**, I supported the marketing team in executing comprehensive **digital marketing campaigns** across multiple channels including **social media**, **email marketing**, and **content creation**. I was responsible for managing the company's social media presence on platforms such as **LinkedIn**, **Instagram**, and **Twitter**, developing engaging content that resonated with our target audience and drove measurable engagement. My responsibilities extended to conducting **market research** to identify emerging trends, analyzing **campaign performance metrics**, and optimizing content strategy based on data insights. I collaborated with the design team to create visually compelling marketing materials and worked closely with the sales team to ensure marketing initiatives aligned with business objectives. This experience taught me the importance of **agile marketing** in a fast-paced startup environment, where rapid iteration and data-driven decision-making are crucial for success. I developed strong skills in **social media analytics**, **content strategy**, and **cross-functional collaboration**, while gaining practical experience in building brand awareness for an early-stage company.",
    achievements: [
      "Increased social media engagement by 40% within three months through strategic content planning and community management",
      "Created content for 3 major product launch campaigns that collectively generated over 50,000 impressions",
      "Implemented a new content calendar system that improved team coordination and campaign execution efficiency"
    ],
    status: "Terminé"
  }
];

// Certifications data
const certificationsData = [
  {
    name: "Google Analytics Certified",
    provider: "Google",
    date: "March 2024",
    credentialId: "GA-123456789"
  },
  {
    name: "Project Management Fundamentals",
    provider: "LinkedIn Learning",
    date: "January 2024",
    credentialId: "LL-987654321"
  }
];

// Navigation tabs data
const tabs = [
  {
    id: "education",
    label: "Formation",
    icon: <GraduationCapIcon className="w-4 h-4" />
  },
  {
    id: "experience",
    label: "Expérience",
    icon: <BriefcaseIcon className="w-4 h-4" />
  },
  {
    id: "projects",
    label: "Projets",
    icon: <FolderIcon className="w-4 h-4" />
  },
  {
    id: "sports",
    label: "Sports & Compétences",
    icon: <StarIcon className="w-4 h-4" />
  }
];

// Module details mapping for each school
const schoolModules = {
  "AES Business School": {
    "Introduction to Business Strategy": {
      description: "This foundational course introduces students to the core concepts of **strategic management**, **competitive analysis**, and **business model design**. It covers frameworks such as **SWOT analysis**, **Porter's Five Forces**, and **value chain analysis**.",
      keyLearning: [
        "Learned to analyze competitive environments using **Porter's Five Forces** framework and identify key success factors in different industries.",
        "Developed skills in **strategic positioning** and understanding how companies create and sustain **competitive advantages** in dynamic markets.",
        "Completed a comprehensive case study analyzing a Fortune 500 company's strategic evolution, examining their **market entry decisions**, **diversification strategies**, and **competitive responses**.",
        "Gained practical experience in **SWOT analysis** by evaluating real-world businesses and identifying strategic opportunities and threats.",
        "Participated in **strategy simulation exercises** where teams competed in virtual markets, making decisions about pricing, product development, and market expansion.",
        "Enhanced my ability to think critically about **long-term planning**, **resource allocation**, and the importance of aligning strategy with organizational capabilities and market dynamics."
      ]
    },
    "Financial Accounting Fundamentals": {
      description: "An introductory course covering the principles of **financial accounting**, **financial statement analysis**, **double-entry bookkeeping**, and the interpretation of **balance sheets**, **income statements**, and **cash flow statements**.",
      keyLearning: [
        "Mastered the fundamentals of **double-entry bookkeeping** and learned to prepare accurate **financial statements** following international accounting standards.",
        "Developed strong analytical skills in interpreting **financial ratios** such as **liquidity ratios**, **profitability ratios**, and **leverage ratios** to assess company performance.",
        "Completed practical exercises involving the preparation of **journal entries**, **ledger accounts**, and **trial balances** for various business transactions.",
        "Analyzed real company financial statements to identify trends, assess financial health, and make informed business decisions based on quantitative data.",
        "Gained understanding of **accrual accounting** principles and the distinction between **cash-based** and **accrual-based** accounting methods.",
        "Learned about **depreciation methods**, **inventory valuation techniques**, and their impact on financial reporting and business decision-making."
      ]
    },
    "Marketing Principles": {
      description: "This course provides a comprehensive introduction to **marketing strategy**, **consumer behavior**, the **marketing mix (4Ps)**, **market segmentation**, **targeting**, and **positioning** strategies.",
      keyLearning: [
        "Studied the **marketing mix framework** (Product, Price, Place, Promotion) and learned how companies integrate these elements to create effective marketing strategies.",
        "Analyzed **consumer behavior patterns**, exploring psychological and social factors that influence purchasing decisions in both B2C and B2B contexts.",
        "Developed skills in **market segmentation** and **targeting**, learning to identify distinct customer groups and tailor marketing approaches to specific segments.",
        "Completed a team project designing a comprehensive marketing plan for a new product launch, including **competitive analysis**, **positioning strategy**, and **promotional tactics**.",
        "Gained insights into **digital marketing** trends and how traditional marketing principles apply to online channels, social media, and e-commerce platforms.",
        "Enhanced my understanding of **brand management**, **customer value creation**, and the importance of building long-term customer relationships in competitive markets."
      ]
    },
    "Organizational Behavior": {
      description: "Examines **human behavior** in organizational settings, covering topics such as **motivation theory**, **leadership styles**, **team dynamics**, **organizational culture**, and **change management**.",
      keyLearning: [
        "Explored major **motivation theories** including Maslow's hierarchy, Herzberg's two-factor theory, and contemporary approaches to understanding employee engagement.",
        "Analyzed different **leadership styles** and their effectiveness in various organizational contexts, from **transformational leadership** to **situational leadership** approaches.",
        "Participated in **team-building exercises** that highlighted the importance of **communication**, **conflict resolution**, and **collaborative problem-solving** in group settings.",
        "Studied **organizational culture** and its impact on employee behavior, performance, and overall organizational effectiveness in achieving strategic objectives.",
        "Examined real-world case studies of successful and unsuccessful **change management initiatives**, learning about resistance to change and strategies for overcoming it.",
        "Developed a deeper understanding of **diversity and inclusion** in the workplace and how organizations can create environments that value different perspectives and backgrounds."
      ]
    },
    "Business Statistics": {
      description: "A foundational course in **statistical methods** for business decision-making, covering **descriptive statistics**, **probability theory**, **hypothesis testing**, **regression analysis**, and **data visualization**.",
      keyLearning: [
        "Mastered **descriptive statistics** techniques including measures of central tendency, dispersion, and the use of **histograms**, **box plots**, and other visualization tools.",
        "Learned **probability theory** fundamentals and applied probability distributions such as **normal distribution**, **binomial distribution**, and **Poisson distribution** to business problems.",
        "Developed skills in **hypothesis testing**, understanding concepts of **null hypothesis**, **p-values**, **confidence intervals**, and **statistical significance** in decision-making.",
        "Applied **regression analysis** to model relationships between variables, interpret regression coefficients, and make predictions based on statistical models.",
        "Gained hands-on experience with statistical software tools like **Excel** and **R**, learning to analyze real datasets and present findings effectively.",
        "Enhanced my ability to make **data-driven decisions** by understanding how to collect, analyze, and interpret quantitative information in business contexts."
      ]
    },
    "Microeconomics": {
      description: "Studies the behavior of individual economic agents including **consumers**, **firms**, and **markets**. Topics include **supply and demand**, **elasticity**, **market structures**, **game theory**, and **market failures**.",
      keyLearning: [
        "Developed a strong foundation in **supply and demand analysis**, learning how prices are determined in competitive markets and how **equilibrium** is achieved.",
        "Studied **elasticity** concepts including price elasticity of demand and supply, and their applications in pricing strategies and tax policy analysis.",
        "Analyzed different **market structures** (perfect competition, monopoly, oligopoly, monopolistic competition) and their implications for pricing, output, and efficiency.",
        "Explored **game theory** fundamentals including the **prisoner's dilemma**, **Nash equilibrium**, and strategic decision-making in competitive environments.",
        "Examined **market failures** such as externalities, public goods, and information asymmetry, and evaluated policy interventions to address these issues.",
        "Applied microeconomic principles to real-world business scenarios, enhancing my understanding of how firms make production, pricing, and investment decisions."
      ]
    },
    "Communication Skills": {
      description: "Focuses on developing effective **business communication** abilities including **written communication**, **oral presentations**, **interpersonal communication**, and **professional correspondence**.",
      keyLearning: [
        "Enhanced **written communication** skills through various assignments including business reports, professional emails, and persuasive proposals.",
        "Developed **public speaking** and **presentation skills** by delivering multiple presentations to peers and instructors, receiving constructive feedback.",
        "Learned techniques for **active listening**, **non-verbal communication**, and building rapport in professional settings and team environments.",
        "Practiced **business correspondence** including writing effective emails, memos, and formal letters following professional communication standards.",
        "Participated in **negotiation simulations** and **group discussions** that emphasized the importance of clear, concise, and persuasive communication.",
        "Gained confidence in articulating ideas clearly, structuring arguments logically, and adapting communication style to different audiences and contexts."
      ]
    },
    "Business Ethics": {
      description: "Examines **ethical dilemmas** in business contexts, covering **corporate social responsibility**, **stakeholder theory**, **ethical decision-making frameworks**, and the role of **ethics in leadership**.",
      keyLearning: [
        "Studied major **ethical theories** including utilitarianism, deontology, and virtue ethics, and their application to business decision-making.",
        "Analyzed real-world **ethical dilemmas** faced by corporations, exploring issues such as environmental sustainability, labor practices, and consumer protection.",
        "Examined **corporate social responsibility (CSR)** frameworks and the evolving expectations of businesses to contribute positively to society beyond profit maximization.",
        "Discussed **stakeholder theory** and the balancing of interests among shareholders, employees, customers, communities, and other stakeholders.",
        "Developed critical thinking skills in evaluating the ethical implications of business strategies, marketing practices, and organizational policies.",
        "Enhanced my awareness of **ethical leadership** and the importance of integrity, transparency, and accountability in building sustainable and reputable organizations."
      ]
    },
    "International Business": {
      description: "International Business focuses on the complexities of **global markets**, emphasizing **strategic decision-making**, **cross-cultural management**, and **international trade regulations**.",
      keyLearning: [
        "During this course, I collaborated on a group project focused on developing a **market entry strategy** for a mid-sized company targeting international expansion.",
        "Our team conducted a full **SWOT analysis**, evaluated **cultural and economic factors**, and recommended an optimal entry model based on **risk assessment** and financial flexibility.",
        "I personally analyzed the **competitive landscape** and addressed **regulatory challenges**, sharpening my **strategic thinking**, problem-solving, and analytical skills.",
        "We presented our findings to a panel of professors, an experience that strengthened my **public speaking**, **teamwork**, and **adaptability** under pressure.",
        "Through case study evaluations, I developed a better understanding of how **multinational firms** navigate international markets, learning to critically assess strategic choices.",
        "The final exam and team presentations tested not only our technical understanding of global business dynamics, but also our ability to work collaboratively and communicate ideas clearly."
      ]
    },
    "Markets and Consumption": {
      description: "This module explores **consumer behavior**, **market dynamics**, and **consumption patterns** across different demographics and cultures, with emphasis on **digital consumer trends**.",
      keyLearning: [
        "Analyzed **market trends** and **consumer decision-making processes** using frameworks such as the **consumer decision journey** and **behavioral economics** principles.",
        "Conducted in-depth research on **purchasing behaviors** in digital environments, examining the impact of **e-commerce**, **social media**, and **mobile commerce**.",
        "Developed comprehensive **marketing strategies** based on consumption analysis, focusing on segmentation, targeting, and personalization techniques.",
        "Studied the role of **cultural factors**, **social influences**, and **psychological triggers** in shaping consumer preferences and brand loyalty.",
        "Completed a research project analyzing the evolution of consumption patterns in a specific industry, identifying key drivers of change and future trends.",
        "Enhanced my understanding of how businesses can leverage **consumer insights** to create value, differentiate products, and build lasting customer relationships."
      ]
    },
    "Interpreting Management": {
      description: "Focuses on **critical approaches** to management theory and practice across various organizational contexts, examining traditional and contemporary management paradigms.",
      keyLearning: [
        "Studied various **management philosophies** including classical, behavioral, and modern approaches, understanding their historical development and relevance.",
        "Analyzed case studies of successful and failed management approaches across different industries, identifying key factors contributing to organizational performance.",
        "Developed frameworks for **decision-making** in complex organizational scenarios, considering multiple stakeholder perspectives and long-term implications.",
        "Explored the tension between **efficiency** and **innovation**, examining how organizations balance operational excellence with creative thinking.",
        "Discussed **contemporary management challenges** such as remote work, digital transformation, and managing diverse, multigenerational workforces.",
        "Enhanced my critical thinking about what constitutes effective management, recognizing that context matters and one-size-fits-all solutions rarely work."
      ]
    },
    "Foundation in Digital Enterprise": {
      description: "Covers **digital transformation**, **e-commerce fundamentals**, and **technology integration** in modern business operations, with focus on emerging technologies.",
      keyLearning: [
        "Explored various **digital business models** including platform economics, subscription models, and freemium strategies adopted by leading tech companies.",
        "Analyzed **digital disruption** across traditional industries such as retail, finance, and media, examining how incumbents respond to technological change.",
        "Developed **digital transformation strategies** for established businesses, considering organizational readiness, change management, and technological capabilities.",
        "Studied emerging technologies including **artificial intelligence**, **blockchain**, **IoT**, and their potential applications in business contexts.",
        "Completed a project designing a digital business proposal, including market analysis, revenue model, technology stack, and go-to-market strategy.",
        "Gained practical insights into **e-commerce platforms**, **digital marketing tools**, and **data analytics** that drive online business success."
      ]
    },
    "Corporate Finance": {
      description: "Examines financial decision-making within corporations, covering **capital budgeting**, **capital structure**, **cost of capital**, **dividend policy**, and **financial planning**.",
      keyLearning: [
        "Mastered **capital budgeting techniques** including NPV, IRR, and payback period, learning to evaluate investment opportunities and project feasibility.",
        "Analyzed **capital structure** decisions and the trade-offs between debt and equity financing, considering the impact on firm value and risk.",
        "Studied the **cost of capital** concept and learned to calculate WACC (Weighted Average Cost of Capital) for investment appraisal purposes.",
        "Examined **dividend policy** theories and their implications for shareholder value, stock prices, and signaling effects in capital markets.",
        "Developed skills in **financial modeling** using Excel, creating pro forma financial statements and conducting sensitivity analysis.",
        "Enhanced understanding of how CFOs make strategic financial decisions that balance growth objectives, risk management, and stakeholder expectations."
      ]
    },
    "Operations Management": {
      description: "Focuses on the design, operation, and improvement of production and service delivery systems, covering **supply chain management**, **quality control**, and **process optimization**.",
      keyLearning: [
        "Studied **supply chain management** principles including procurement, inventory management, logistics, and the coordination of global supply networks.",
        "Learned **quality control** methodologies such as Six Sigma, TQM, and statistical process control for maintaining product and service standards.",
        "Analyzed **process optimization** techniques including lean manufacturing, bottleneck analysis, and capacity planning to improve operational efficiency.",
        "Completed simulation exercises involving production scheduling, resource allocation, and trade-offs between cost, quality, and speed.",
        "Examined case studies of companies with world-class operations, identifying best practices in inventory management, supplier relationships, and continuous improvement.",
        "Developed appreciation for the strategic importance of operations in achieving competitive advantage through cost leadership, quality, or flexibility."
      ]
    },
    "Strategic Analysis": {
      description: "An advanced course in **strategic management** focusing on **competitive strategy**, **industry analysis**, **strategic positioning**, and **strategic implementation**.",
      keyLearning: [
        "Deepened understanding of **competitive strategy** frameworks including cost leadership, differentiation, and focus strategies.",
        "Conducted detailed **industry analysis** using tools like Porter's Five Forces, PESTEL analysis, and value net analysis to assess competitive dynamics.",
        "Studied **strategic positioning** and how firms create sustainable competitive advantages through unique value propositions and resource capabilities.",
        "Analyzed the challenges of **strategic implementation**, examining organizational structure, culture, and leadership's role in executing strategy.",
        "Completed comprehensive case studies requiring development of strategic recommendations for companies facing competitive threats or growth opportunities.",
        "Enhanced ability to think strategically about business problems, considering both external market dynamics and internal organizational capabilities."
      ]
    },
    "Managerial Economics": {
      description: "Applies economic theory and methods to business decision-making, covering **demand analysis**, **production and cost analysis**, **pricing strategies**, and **market structure**.",
      keyLearning: [
        "Applied **demand analysis** techniques to estimate price elasticity and forecast demand for products and services in various market conditions.",
        "Studied **production and cost functions**, learning to optimize output levels and minimize costs given resource constraints.",
        "Analyzed **pricing strategies** including price discrimination, bundling, and dynamic pricing, understanding their application in different market contexts.",
        "Examined how **market structure** affects firm behavior, profitability, and strategic options in industries ranging from perfect competition to monopoly.",
        "Developed skills in using economic models to inform business decisions regarding production levels, pricing, and resource allocation.",
        "Enhanced ability to apply rigorous economic thinking to practical business problems, improving decision-making quality under uncertainty."
      ]
    },
    "Advanced Strategic Management": {
      description: "A capstone-level course examining **corporate strategy**, **diversification**, **mergers and acquisitions**, **strategic alliances**, and **global strategy**.",
      keyLearning: [
        "Analyzed **corporate-level strategy** decisions including portfolio management, vertical integration, and diversification into related or unrelated businesses.",
        "Studied **mergers and acquisitions** from strategic, financial, and organizational perspectives, examining success factors and common pitfalls.",
        "Explored **strategic alliances** and **joint ventures** as alternative growth strategies, considering partner selection, governance, and value creation.",
        "Examined **global strategy** challenges including standardization vs. adaptation, managing international operations, and competing across borders.",
        "Completed an intensive strategy project analyzing a real company's strategic options, presenting recommendations to a panel of industry professionals.",
        "Synthesized learning from previous courses to develop holistic, multi-faceted strategic recommendations addressing complex business challenges."
      ]
    },
    "Global Market Entry": {
      description: "Focuses on **international expansion strategies**, **market selection**, **entry modes**, **cross-cultural management**, and **global competitive dynamics**.",
      keyLearning: [
        "Developed frameworks for **market selection** in international expansion, considering factors such as market size, growth potential, competitive intensity, and regulatory environment.",
        "Analyzed different **entry modes** including exporting, licensing, franchising, joint ventures, and wholly-owned subsidiaries, evaluating their risks and benefits.",
        "Studied **cross-cultural management** challenges and strategies for managing diverse teams, adapting products, and communicating effectively across cultures.",
        "Examined successful and failed international expansion cases, identifying patterns and learning from both positive and negative examples.",
        "Completed a comprehensive project developing an international market entry strategy for a company, including market analysis, entry mode recommendation, and implementation plan.",
        "Enhanced understanding of how **geopolitical factors**, **trade policies**, and **cultural differences** shape international business opportunities and risks."
      ]
    },
    "Digital Transformation": {
      description: "Examines how organizations leverage **digital technologies** to transform business models, operations, and customer experiences, covering **AI**, **data analytics**, and **innovation management**.",
      keyLearning: [
        "Studied frameworks for **digital transformation** including assessing digital maturity, developing transformation roadmaps, and managing organizational change.",
        "Explored applications of **artificial intelligence** and **machine learning** in business contexts such as customer service, predictive analytics, and process automation.",
        "Analyzed how **data analytics** and **big data** technologies enable organizations to gain insights, personalize offerings, and make data-driven decisions.",
        "Examined **innovation management** in digital contexts, including agile methodologies, design thinking, and fostering cultures of experimentation.",
        "Completed a digital transformation consulting project, working with a real or simulated organization to identify opportunities and develop implementation strategies.",
        "Developed appreciation for the challenges of digital transformation including legacy systems, skill gaps, and resistance to change."
      ]
    },
    "Entrepreneurship & Innovation": {
      description: "Covers the **entrepreneurial process** from idea generation to venture launch, including **business model innovation**, **venture financing**, and **scaling strategies**.",
      keyLearning: [
        "Learned structured approaches to **opportunity identification** and **ideation**, using tools such as design thinking and lean startup methodology.",
        "Developed skills in **business model design** using frameworks like the Business Model Canvas, understanding value propositions and revenue models.",
        "Studied **venture financing** options including bootstrapping, angel investing, venture capital, and crowdfunding, and how to pitch to investors.",
        "Analyzed **scaling strategies** for startups, examining challenges of rapid growth and transitioning from startup to established company.",
        "Completed an entrepreneurial project developing a business concept, conducting customer validation, and creating a pitch deck for potential investors.",
        "Gained insights into the entrepreneurial mindset, risk-taking, resilience, and the importance of adaptability in building successful ventures."
      ]
    },
    "Leadership Development": {
      description: "Focuses on developing **leadership skills** through experiential learning, covering **emotional intelligence**, **team leadership**, **change leadership**, and **ethical leadership**.",
      keyLearning: [
        "Enhanced **emotional intelligence** through self-assessment exercises and feedback, learning to recognize and manage emotions in leadership contexts.",
        "Developed **team leadership** skills through group projects and simulations, focusing on delegation, motivation, and conflict resolution.",
        "Studied **change leadership** and the role of leaders in driving organizational transformation, overcoming resistance, and building momentum.",
        "Examined **ethical leadership** and the importance of integrity, authenticity, and values-based decision-making in building trust and credibility.",
        "Participated in leadership development exercises including 360-degree feedback, executive coaching simulations, and peer mentoring.",
        "Created a personal leadership development plan identifying strengths, areas for growth, and action steps for continuous improvement."
      ]
    },
    "Business Analytics": {
      description: "Covers advanced analytical techniques for business decision-making including **predictive modeling**, **data mining**, **optimization**, and **data visualization**.",
      keyLearning: [
        "Mastered **predictive modeling** techniques such as regression, classification trees, and neural networks for forecasting and pattern recognition.",
        "Learned **data mining** methods to extract valuable insights from large datasets, identifying trends, anomalies, and actionable patterns.",
        "Applied **optimization** techniques including linear programming and simulation to solve complex business problems involving resource allocation.",
        "Developed advanced **data visualization** skills using tools like Tableau and Power BI to communicate insights effectively to diverse audiences.",
        "Completed hands-on projects analyzing real business datasets, from data cleaning and exploration to model building and recommendation development.",
        "Gained practical experience with programming languages like Python and R, along with SQL for database querying and data manipulation."
      ]
    },
    "Negotiation & Conflict Resolution": {
      description: "Examines **negotiation strategies**, **conflict resolution techniques**, and **dispute management** in business contexts, combining theory with practical simulation.",
      keyLearning: [
        "Studied **negotiation theory** including distributive vs. integrative bargaining, BATNA (Best Alternative to Negotiated Agreement), and zone of possible agreement.",
        "Participated in numerous **negotiation simulations** playing various roles and practicing different negotiation strategies in diverse scenarios.",
        "Learned **conflict resolution** techniques for managing disagreements in teams, between departments, and with external stakeholders.",
        "Developed skills in **active listening**, **empathy**, and **creative problem-solving** essential for reaching mutually beneficial agreements.",
        "Analyzed real-world negotiation cases from business, diplomacy, and law, identifying tactics, common mistakes, and best practices.",
        "Enhanced awareness of cultural dimensions in negotiation, understanding how negotiation styles and preferences vary across cultures."
      ]
    },
    "Capstone Project": {
      description: "A culminating project that integrates learning from the entire Bachelor program, involving **strategic consulting** work for a real company or comprehensive business case analysis.",
      keyLearning: [
        "Applied knowledge from multiple disciplines including strategy, finance, marketing, and operations to a complex, real-world business challenge.",
        "Conducted extensive research and analysis, synthesizing information from various sources to develop comprehensive insights and recommendations.",
        "Worked in a team to deliver a **strategic consulting report** addressing a significant business problem, demonstrating professional-level analytical and presentation skills.",
        "Presented findings and recommendations to company executives and faculty panel, fielding questions and defending strategic choices.",
        "Managed a long-term project including timeline planning, task allocation, progress monitoring, and quality assurance throughout the semester.",
        "Demonstrated ability to integrate theoretical knowledge with practical application, showcasing readiness for professional roles in strategy, consulting, or management."
      ]
    }
  },
  "Saint Nicolas Paris": {
    "Mathématiques (Spécialité)": {
      description: "Approfondissement des **mathématiques** avec focus sur l'**analyse avancée**, l'**algèbre linéaire**, les **probabilités** et les **algorithmes**.",
      keyLearning: [
        "Approfondi l'**analyse** avec l'étude des fonctions trigonométriques, exponentielles complexes et calcul intégral avancé.",
        "Développé des compétences en **algèbre linéaire** incluant les matrices, déterminants, systèmes d'équations et transformations linéaires.",
        "Maîtrisé les **probabilités conditionnelles**, les **lois de probabilité** continues et discrètes, et l'**échantillonnage**.",
        "Introduit aux **algorithmes** et à la **programmation**, apprenant à résoudre des problèmes mathématiques par des approches computationnelles.",
        "Renforcé la **rigueur mathématique** par des démonstrations complexes et l'utilisation de raisonnements par récurrence et contraposée.",
        "Préparé les bases nécessaires pour des études supérieures en **sciences**, **économie**, **ingénierie** et **finance**."
      ]
    },
    "Physique-Chimie": {
      description: "Étude des **lois physiques** et des **réactions chimiques**. Développement de l'**esprit scientifique** et de la **démarche expérimentale**.",
      keyLearning: [
        "Maîtrisé les **concepts fondamentaux de physique** incluant la mécanique, l'électricité, l'optique et l'énergie.",
        "Étudié la **chimie** avec focus sur la structure de la matière, les réactions chimiques et la transformation de la matière.",
        "Développé des compétences en **démarche expérimentale** à travers des travaux pratiques en laboratoire.",
        "Renforcé les capacités d'**observation**, de **mesure** et d'**analyse** des phénomènes physiques et chimiques.",
        "Appris à **modéliser** des situations physiques et à utiliser des **outils mathématiques** pour résoudre des problèmes scientifiques.",
        "Développé une **culture scientifique** essentielle pour comprendre les enjeux technologiques et environnementaux actuels."
      ]
    },
    "Grand Oral": {
      description: "Épreuve de **communication orale** sur un sujet personnel lié aux spécialités. Développement des compétences en **présentation** et **argumentation**.",
      keyLearning: [
        "Développé des compétences en **prise de parole en public** en préparant et présentant un exposé structuré de 5 minutes.",
        "Renforcé la capacité à **argumenter** et à **défendre** un point de vue face à un jury, en répondant à des questions approfondies.",
        "Approfondi un **sujet personnel** liant les spécialités suivies, démontrant curiosité intellectuelle et capacité de recherche.",
        "Amélioré la **gestion du stress** et la **confiance en soi** face à un public exigeant.",
        "Développé des compétences en **communication non-verbale** incluant la posture, le regard et la gestuelle.",
        "Acquis une expérience précieuse pour les **présentations académiques et professionnelles** futures."
      ]
    }
  }
};

// Sports data with detailed information
const sportsData = [
  {
    name: "Rugby",
    club: "RC Toulon",
    period: "2018 - Présent",
    position: "Flanker",
    level: "Régional",
    status: "En cours",
    description: "Membre actif de l'équipe de **rugby** du **RC Toulon** depuis 2018, jouant au poste de **flanker** (troisième ligne aile). Le rugby m'a permis de développer des compétences essentielles en **travail d'équipe**, **leadership sous pression**, et **résilience physique et mentale**. En tant que flanker, mon rôle implique d'être à la fois dans les phases offensives et défensives, nécessitant une excellente **condition physique**, une **lecture tactique du jeu**, et une **communication constante** avec mes coéquipiers. J'ai participé à de nombreux matchs régionaux et tournois, contribuant à la cohésion d'équipe et au développement de stratégies de jeu.",
    keyLearning: [
      "Développé un **esprit d'équipe** exceptionnel en travaillant avec des coéquipiers diversifiés vers un objectif commun lors de matchs intenses.",
      "Renforcé mes capacités de **leadership** en motivant l'équipe pendant les moments difficiles et en communiquant efficacement sur le terrain.",
      "Amélioré ma **résilience mentale** en gérant la pression des matchs importants, en surmontant les défaites et en célébrant les victoires avec humilité.",
      "Acquis une excellente **discipline personnelle** à travers l'entraînement régulier, la préparation physique et le respect des règles du jeu.",
      "Développé des compétences en **stratégie tactique** en analysant les adversaires, en adaptant le style de jeu et en exécutant des plans de match complexes.",
      "Cultivé des valeurs de **respect**, **intégrité** et **fair-play** qui sont au cœur de l'esprit rugby et applicables dans tous les aspects de la vie."
    ],
    achievements: [
      "Participation à plus de 50 matchs officiels en tant que titulaire",
      "Contribution à 3 victoires en tournois régionaux",
      "Capitaine adjoint de l'équipe lors de la saison 2023-2024",
      "Amélioration constante des performances physiques et techniques"
    ]
  },
  {
    name: "Échecs",
    organization: "Club d'Échecs Local & Compétitions",
    period: "2015 - Présent",
    level: "Compétiteur régional",
    status: "En cours",
    description: "Passionné d'**échecs** depuis 2015, j'ai développé mes compétences à travers la **pratique régulière**, la **participation à des tournois** et l'**étude approfondie** des stratégies et ouvertures classiques. Les échecs m'ont appris l'importance de la **pensée stratégique à long terme**, de l'**anticipation** et de la **prise de décision** sous pression. En mars 2024, j'ai obtenu la **3ème place** dans la catégorie moins de 25 ans lors du **Championnat Régional**, démontrant ma progression constante. Au-delà de la compétition, j'organise également des **tournois locaux**, partageant ma passion et contribuant au développement de la communauté des échecs.",
    keyLearning: [
      "Développé des compétences avancées en **pensée stratégique** en planifiant plusieurs coups à l'avance et en anticipant les réponses adverses.",
      "Renforcé ma **concentration** et ma **patience** en maintenant un niveau élevé d'attention pendant des parties pouvant durer plusieurs heures.",
      "Amélioré mes capacités d'**analyse** en étudiant des parties de grands maîtres, en identifiant des patterns et en comprenant les principes stratégiques.",
      "Cultivé la **gestion des émotions** en restant calme face aux erreurs, en gérant la pression du temps limité et en maintenant la confiance.",
      "Développé des compétences en **résolution de problèmes** en trouvant des solutions créatives dans des positions complexes et défavorables.",
      "Appris l'importance de la **préparation** et de l'**apprentissage continu** en étudiant régulièrement les ouvertures, les fins de partie et les tactiques."
    ],
    achievements: [
      "3ème place au Championnat Régional (catégorie -25 ans) - Mars 2024",
      "Organisation de 15+ tournois locaux depuis 2015",
      "Rating ELO en constante progression",
      "Participation à plus de 30 tournois officiels"
    ]
  }
];

export const Profile = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("education");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);
  const [selectedEducation, setSelectedEducation] = useState<any | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [selectedSport, setSelectedSport] = useState<any | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [bioContent, setBioContent] = useState(profileData.bio);
  const [contactInfo, setContactInfo] = useState({
    email: profileData.email,
    phone: profileData.phone,
    location: profileData.location,
    linkedin: profileData.linkedin,
    portfolio: profileData.portfolio,
    university: "AES Business School",
    graduation: "Class of 2026"
  });
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [bannerImage, setBannerImage] = useState<string | undefined>(undefined);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    console.log("Toggle edit mode");
  };

  const handleExport = () => {
    console.log("Exporting profile");
  };

  const handleSaveBio = async (newBio: string) => {
    console.log("Saving bio:", newBio);
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setBioContent(newBio);
    return Promise.resolve();
  };

  const handleSaveContactField = async (field: keyof typeof contactInfo, value: string) => {
    console.log(`Saving ${field}:`, value);
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleModuleClick = (module: string, education: any, year?: number) => {
    console.log(`Selected module: ${module}`);
    setSelectedModule(module);
    setSelectedEducation(education);
    if (year) setSelectedYear(year);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleExperienceClick = (experience: any) => {
    console.log(`Selected experience: ${experience.position}`);
    setSelectedExperience(experience);
  };

  const handleProjectClick = (project: any) => {
    console.log(`Selected project: ${project.name}`);
    setSelectedProject(project);
  };

  const handleSportClick = (sport: any) => {
    console.log(`Selected sport: ${sport.name}`);
    setSelectedSport(sport);
  };

  const handleBackToProfile = () => {
    setSelectedModule(null);
    setSelectedExperience(null);
    setSelectedEducation(null);
    setSelectedProject(null);
    setSelectedSport(null);
    setSelectedYear(1);
  };
  
  // Handle profile image upload
  const handleProfileImageUpload = async (file: File): Promise<string> => {
    console.log("Uploading profile image:", file.name);
    
    // In a real app, this would upload to a server
    // For demo purposes, we'll just create an object URL
    return new Promise((resolve) => {
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        resolve(imageUrl);
      }, 1500);
    });
  };
  
  // Handle banner image upload
  const handleBannerImageUpload = async (file: File): Promise<string> => {
    console.log("Uploading banner image:", file.name);
    
    // In a real app, this would upload to a server
    // For demo purposes, we'll just create an object URL
    return new Promise((resolve) => {
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setBannerImage(imageUrl);
        resolve(imageUrl);
      }, 1500);
    });
  };

  // If a module is selected, show the module detail view
  if (selectedModule && selectedEducation) {
    const moduleDetails = schoolModules[selectedEducation.institution]?.[selectedModule];
    
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <aside className="h-screen w-60 fixed">
          <NavigationSection />
        </aside>
        
        <div className="flex-1 ml-60 p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBackToProfile}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 rotate-180" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedModule}</h1>
              <p className="text-slate-600">{selectedEducation.institution} • {selectedEducation.degree}</p>
            </div>
          </div>

          {moduleDetails ? (
            <div className="space-y-6">
              <Card className="p-6">
                <h4 className="font-medium text-slate-800 text-base mb-4">Compétences Acquises & Expériences</h4>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {moduleDetails.keyLearning.map((point: string, idx: number) => (
                      <span key={idx}>
                        {point.split('**').map((part: string, partIdx: number) =>
                          partIdx % 2 === 1 ? <strong key={partIdx} className="text-slate-900 font-semibold">{part}</strong> : part
                        )}
                        {idx < moduleDetails.keyLearning.length - 1 && ' '}
                      </span>
                    ))}
                  </p>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-slate-600">Aucune information détaillée disponible pour ce module.</p>
            </Card>
          )}
        </div>
      </main>
    );
  }

  // If an experience is selected, show the experience detail view
  if (selectedExperience) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <aside className="h-screen w-60 fixed">
          <NavigationSection />
        </aside>
        
        <div className="flex-1 ml-60 p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBackToProfile}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 rotate-180" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedExperience.position}</h1>
              <p className="text-slate-600">{selectedExperience.company} • {selectedExperience.location}</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Experience Overview */}
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <BriefcaseIcon className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{selectedExperience.position}</h3>
                  <p className="text-slate-600 mb-2">{selectedExperience.company}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span>{selectedExperience.period}</span>
                    <span>•</span>
                    <span>{selectedExperience.location}</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {selectedExperience.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Description du Poste</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedExperience.description.split('**').map((part: string, idx: number) =>
                      idx % 2 === 1 ? <strong key={idx} className="text-slate-900 font-semibold">{part}</strong> : part
                    )}
                  </p>
                </div>
              </div>
            </Card>

            {/* Key Achievements */}
            <Card className="p-6">
              <h4 className="font-medium text-slate-800 text-base mb-4">Réalisations Clés & Impact</h4>
              <div className="space-y-3">
                {selectedExperience.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200/60">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-medium text-sm">
                      ✓
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </main>
    );
  }

  // If a project is selected, show the project detail view
  if (selectedProject) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <aside className="h-screen w-60 fixed">
          <NavigationSection />
        </aside>

        <div className="flex-1 ml-60 p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToProfile}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 rotate-180" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedProject.name}</h1>
              <p className="text-slate-600">{selectedProject.organization} • {selectedProject.period}</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FolderIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{selectedProject.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{selectedProject.organization}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span>{selectedProject.period}</span>
                  </div>
                  <Badge variant="outline" className={selectedProject.status === "En cours" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-green-50 text-green-700 border-green-200"}>
                    {selectedProject.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Description du Projet</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedProject.description.split('**').map((part: string, idx: number) =>
                      idx % 2 === 1 ? <strong key={idx} className="text-slate-900 font-semibold">{part}</strong> : part
                    )}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-medium text-slate-800 text-base mb-4">Compétences Acquises & Expériences</h4>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedProject.keyLearning.map((point: string, idx: number) => (
                    <span key={idx}>
                      {point.split('**').map((part: string, partIdx: number) =>
                        partIdx % 2 === 1 ? <strong key={partIdx} className="text-slate-900 font-semibold">{part}</strong> : part
                      )}
                      {idx < selectedProject.keyLearning.length - 1 && ' '}
                    </span>
                  ))}
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-medium text-slate-800 text-base mb-4">Compétences Développées</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.skills.map((skill: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  // If a sport is selected, show the sport detail view
  if (selectedSport) {
    return (
      <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <aside className="h-screen w-60 fixed">
          <NavigationSection />
        </aside>

        <div className="flex-1 ml-60 p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToProfile}
              className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-200/60 hover:bg-white hover:ring-blue-500/20 transition-all duration-200"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 rotate-180" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{selectedSport.name}</h1>
              <p className="text-slate-600">{selectedSport.club || selectedSport.organization} • {selectedSport.period}</p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUpIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{selectedSport.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{selectedSport.club || selectedSport.organization}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span>{selectedSport.period}</span>
                    {selectedSport.position && (
                      <>
                        <span>•</span>
                        <span>{selectedSport.position}</span>
                      </>
                    )}
                    {selectedSport.level && (
                      <>
                        <span>•</span>
                        <span>{selectedSport.level}</span>
                      </>
                    )}
                  </div>
                  <Badge variant="outline" className={selectedSport.status === "En cours" ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"}>
                    {selectedSport.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800 mb-2">Description</h4>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedSport.description.split('**').map((part: string, idx: number) =>
                      idx % 2 === 1 ? <strong key={idx} className="text-slate-900 font-semibold">{part}</strong> : part
                    )}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="font-medium text-slate-800 text-base mb-4">Compétences Acquises & Expériences</h4>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/60">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedSport.keyLearning.map((point: string, idx: number) => (
                    <span key={idx}>
                      {point.split('**').map((part: string, partIdx: number) =>
                        partIdx % 2 === 1 ? <strong key={partIdx} className="text-slate-900 font-semibold">{part}</strong> : part
                      )}
                      {idx < selectedSport.keyLearning.length - 1 && ' '}
                    </span>
                  ))}
                </p>
              </div>
            </Card>

            {selectedSport.achievements && selectedSport.achievements.length > 0 && (
              <Card className="p-6">
                <h4 className="font-medium text-slate-800 text-base mb-4">Réalisations & Résultats</h4>
                <div className="space-y-3">
                  {selectedSport.achievements.map((achievement: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200/60">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                        ✓
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <aside className="h-screen w-60 fixed">
        <NavigationSection />
      </aside>
      
      <div className="flex-1 ml-60 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Mon Profil</h1>
            <p className="text-slate-600">Gérez vos informations personnelles et professionnelles</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleExport}
            >
              <DownloadIcon className="w-4 h-4" />
              Exporter le Profil
            </Button>
          </div>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-32 relative">
            <ProfileBannerUpload
              currentImage={bannerImage}
              onImageUpload={handleBannerImageUpload}
            />
          </div>
          
          <CardContent className="relative pt-0 pb-6">
            <div className="flex items-start gap-6 -mt-12">
              <ProfileImageUpload
                name={profileData.name}
                initials={profileData.initials}
                currentImage={profileImage}
                onImageUpload={handleProfileImageUpload}
              />
              
              <div className="flex-1 mt-16">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1 group cursor-pointer" onClick={handleEdit}>
                    <h2 className="text-3xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors duration-200 flex items-center gap-2">
                      {profileData.name}
                      <EditIcon className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                      <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                      <span className="text-lg text-blue-600 font-medium">Étudiant en commerce et gestion</span>
                    </div>
                    
                    <EditableBio
                      content={bioContent}
                      onSave={handleSaveBio}
                      isEditing={isEditing}
                      className="text-slate-700 max-w-3xl leading-relaxed text-base mb-6"
                    />
                  </div>
                </div>
                
                {/* Contact Information Grid */}
                <ProfileContactCard 
                  contactInfo={contactInfo}
                  isEditing={isEditing}
                  onFieldSave={handleSaveContactField}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Education Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-0 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setActiveTab("education")}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <BookOpenIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-900 mb-1">{educationData.length}</div>
                  <div className="text-sm font-medium text-blue-700">Education</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Card */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-0 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setActiveTab("experience")}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <BriefcaseIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-900 mb-1">{workExperienceData.length}</div>
                  <div className="text-sm font-medium text-green-700">Experience</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects Card */}
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-0 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setActiveTab("projects")}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <FolderIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-900 mb-1">{projectsData.length}</div>
                  <div className="text-sm font-medium text-purple-700">Projects</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificates Card */}
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-0 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setActiveTab("sports")}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center shadow-sm">
                  <AwardIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-900 mb-1">{certificationsData.length}</div>
                  <div className="text-sm font-medium text-orange-700">Certificates</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 mb-8 bg-white p-1 rounded-lg shadow-sm border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-md font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "education" && (
            <div className="space-y-6">
              {educationData.map((education, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpenIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-slate-800">{education.degree}</h3>
                          <Badge variant="outline" className={education.status === "En cours" ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"}>
                            {education.status}
                          </Badge>
                        </div>
                        <p className="text-blue-600 font-medium mb-3">{education.institution}</p>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 mb-4">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            {education.period}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1">
                            <MapPinIcon className="w-3.5 h-3.5" />
                            {education.location}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="font-medium text-slate-700">GPA: {education.gpa}</span>
                        </div>

                        {/* Educational Details Section - Inline Format */}
                        {(education.cycle || education.specialisation || education.mineure || education.studyMode || (education.specificPath && education.specificPath !== "N/A") || education.mention) && (
                          <div className="flex flex-wrap items-center gap-2 text-sm pt-3 border-t border-slate-200">
                            {education.cycle && (
                              <>
                                <span className="text-slate-500">Cycle:</span>
                                <span className="font-medium text-slate-800">{education.cycle}</span>
                                <span className="text-slate-300">•</span>
                              </>
                            )}
                            {education.specialisation && (
                              <>
                                <span className="text-slate-500">Spécialisation:</span>
                                <span className="font-medium text-slate-800">{education.specialisation}</span>
                                <span className="text-slate-300">•</span>
                              </>
                            )}
                            {education.mineure && (
                              <>
                                <span className="text-slate-500">Mineure:</span>
                                <span className="font-medium text-slate-800">{education.mineure}</span>
                                <span className="text-slate-300">•</span>
                              </>
                            )}
                            {education.studyMode && (
                              <>
                                <span className="text-slate-500">Modalité:</span>
                                <span className="font-medium text-slate-800">{education.studyMode}</span>
                              </>
                            )}
                            {education.specificPath && education.specificPath !== "N/A" && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-500">Parcours:</span>
                                <span className="font-medium text-slate-800">{education.specificPath}</span>
                              </>
                            )}
                            {education.mention && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-500">Mention:</span>
                                <span className="font-medium text-emerald-700">{education.mention}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {education.hasYearPages && education.years && (
                      <div className="mt-6">
                        {/* Year Pagination */}
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="font-medium text-slate-800">Années Académiques</h4>
                          <div className="flex gap-2">
                            {education.years.map((yearData: any) => (
                              <button
                                key={yearData.year}
                                onClick={() => handleYearChange(yearData.year)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                                  selectedYear === yearData.year
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                Année {yearData.year}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Display selected year's modules */}
                        {education.years.map((yearData: any) =>
                          yearData.year === selectedYear && (
                            <div key={yearData.year} className="space-y-4">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h5 className="text-lg font-semibold text-slate-800">{yearData.title}</h5>
                                  <p className="text-sm text-slate-600">{yearData.period}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {yearData.modules.map((module: string, idx: number) => (
                                  <div
                                    key={idx}
                                    className="group relative overflow-hidden bg-white rounded-2xl border-2 border-slate-200/60 hover:border-blue-400/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                    onClick={() => handleModuleClick(module, education, yearData.year)}
                                  >
                                    <div className="relative p-6">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 flex-1">
                                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                                            <BookOpenIcon className="w-6 h-6 text-white" />
                                          </div>

                                          <h5 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                                            {module}
                                          </h5>
                                        </div>

                                        <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm group-hover:bg-blue-500 group-hover:shadow-md transition-all duration-300">
                                          <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {!education.hasYearPages && education.modules && education.modules.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium text-slate-800 mb-3">Composantes clés</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {education.modules.map((module: string, idx: number) => (
                            <div
                              key={idx}
                              className="group relative overflow-hidden bg-white rounded-2xl border-2 border-slate-200/60 hover:border-blue-400/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                              onClick={() => handleModuleClick(module, education)}
                            >
                              <div className="relative p-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                                      <BookOpenIcon className="w-6 h-6 text-white" />
                                    </div>

                                    <h5 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                                      {module}
                                    </h5>
                                  </div>

                                  <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm group-hover:bg-blue-500 group-hover:shadow-md transition-all duration-300">
                                    <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "experience" && (
            <div className="space-y-6">
              {workExperienceData.map((experience, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => handleExperienceClick(experience)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <BriefcaseIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-800 mb-1">{experience.position}</h3>
                          <p className="text-green-600 font-medium mb-2">{experience.company}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>{experience.period}</span>
                            <span>•</span>
                            <span>{experience.location}</span>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {experience.status}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Mes Projets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectsData.map((project, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden bg-white rounded-2xl border-2 border-slate-200/60 hover:border-blue-400/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="relative p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                            <FolderIcon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight mb-1">
                              {project.name}
                            </h5>
                            <p className="text-sm text-blue-600 font-medium">{project.organization}</p>
                          </div>
                        </div>
                        <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm group-hover:bg-blue-500 group-hover:shadow-md transition-all duration-300">
                          <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          <span>{project.period}</span>
                        </div>
                        <Badge variant="outline" className={project.status === "En cours" ? "bg-orange-50 text-orange-700 border-orange-200 text-xs" : "bg-green-50 text-green-700 border-green-200 text-xs"}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "sports" && (
            <div className="space-y-6">
              {/* Sports Section */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Sports & Activités</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sportsData.map((sport, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden bg-white rounded-2xl border-2 border-slate-200/60 hover:border-blue-400/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      onClick={() => handleSportClick(sport)}
                    >
                      <div className="relative p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                              <TrendingUpIcon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h5 className="text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight mb-1">
                                {sport.name}
                              </h5>
                              <p className="text-sm text-blue-600 font-medium">{sport.club || sport.organization}</p>
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm group-hover:bg-blue-500 group-hover:shadow-md transition-all duration-300">
                            <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            <span>{sport.period}</span>
                          </div>
                          {sport.position && (
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <UserIcon className="w-3.5 h-3.5" />
                              <span>{sport.position}</span>
                            </div>
                          )}
                          {sport.level && (
                            <div className="text-xs text-slate-600 font-medium">
                              Niveau: {sport.level}
                            </div>
                          )}
                          <Badge variant="outline" className={sport.status === "En cours" ? "bg-green-50 text-green-700 border-green-200 text-xs" : "bg-blue-50 text-blue-700 border-blue-200 text-xs"}>
                            {sport.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificates & Languages */}
              <Card>
                <CardHeader>
                  <CardTitle>Certificats & Langues</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Certifications Section */}
                  <div>
                    <h4 className="font-medium text-slate-800 text-sm mb-3 flex items-center gap-2">
                      <AwardIcon className="w-4 h-4" />
                      Certifications
                    </h4>
                    <div className="space-y-3">
                      {certificationsData.map((cert, index) => (
                        <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="font-medium text-slate-800 text-sm">{cert.name}</div>
                          <div className="text-xs text-slate-600">{cert.provider} • {cert.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Languages Section */}
                  <div>
                    <h4 className="font-medium text-slate-800 text-sm mb-3 flex items-center gap-2">
                      <GlobeIcon className="w-4 h-4" />
                      Langues
                    </h4>
                    <div className="space-y-3">
                      {languages.map((language, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="font-medium text-slate-800">{language.name}</span>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {language.level}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};