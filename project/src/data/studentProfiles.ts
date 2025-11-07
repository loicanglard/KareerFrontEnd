export interface StudentProfile {
  id: number;
  name: string;
  initials: string;
  role: string;
  program: string;
  university: string;
  graduationYear: string;
  email: string;
  linkedin: string;
  portfolio?: string;
  phone?: string;
  birthdate?: string;
  color: string;
  profilePhoto: string;
  skills: Array<{ name: string; level: number }>;
  languages: Array<{ name: string; level: string }>;
  projects: Array<{
    name: string;
    organization: string;
    description: string;
    period: string;
    keyLearning?: string[];
    skills?: string[];
    status?: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    period: string;
    location?: string;
    gpa?: string;
    status?: string;
    mention?: string;
    modules?: string[];
    cycle?: string;
    specialisation?: string;
    mineure?: string;
    studyMode?: string;
    specificPath?: string;
    bacType?: string;
    bacSpecialities?: string[];
    bacGrade?: string;
    hasYearPages?: boolean;
  }>;
  workExperience: Array<{
    position: string;
    company: string;
    period: string;
    location?: string;
    description: string;
    achievements?: string[];
    status?: string;
  }>;
  certifications: Array<{
    name: string;
    provider: string;
    date: string;
  }>;
  sports: Array<{
    name: string;
    club?: string;
    organization?: string;
    period: string;
    position?: string;
    level?: string;
    status: string;
    description: string;
    keyLearning: string[];
    achievements?: string[];
  }>;
  bio: string;
}

export const studentProfiles: StudentProfile[] = [
  {
    id: 1,
    name: "Sophie Martin",
    initials: "SM",
    role: "Computer Science Student",
    program: "BSc Computer Science",
    university: "AES Business School",
    graduationYear: "2026",
    email: "sophie.martin@polytechnique.edu",
    linkedin: "https://www.linkedin.com/in/sophiemartin",
    portfolio: "https://sophiemartin.dev",
    phone: "07552 123456",
    birthdate: "12/03/2004",
    color: "from-blue-500 to-blue-700",
    profilePhoto: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      { name: "Python", level: 90 },
      { name: "Machine Learning", level: 85 },
      { name: "Data Analysis", level: 88 },
      { name: "React", level: 75 }
    ],
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Courant" },
      { name: "Allemand", level: "Intermédiaire" }
    ],
    projects: [
      {
        name: "AI Image Recognition System",
        organization: "École Polytechnique",
        description: "Led the development of an advanced **convolutional neural network** for **real-time image classification** achieving **94% accuracy** on the ImageNet dataset. This project involved designing and implementing a custom CNN architecture, preprocessing large-scale image datasets, and optimizing model performance for deployment on edge devices. The system was built using **TensorFlow** and **Keras**, incorporating state-of-the-art techniques such as **transfer learning**, **data augmentation**, and **batch normalization**. The final model was successfully deployed on a Raspberry Pi for real-time inference, processing images at **30 FPS** while maintaining high accuracy.",
        period: "Sep 2024 - Dec 2024",
        keyLearning: [
          "Mastered **deep learning architectures** including ResNet, VGG, and custom CNN designs for various computer vision tasks.",
          "Developed expertise in **model optimization** techniques such as pruning, quantization, and knowledge distillation for edge deployment.",
          "Gained practical experience in **dataset preprocessing** including normalization, augmentation, and handling class imbalance.",
          "Enhanced **debugging skills** by troubleshooting training issues like vanishing gradients and overfitting through regularization.",
          "Improved **performance tuning** abilities by experimenting with hyperparameters and monitoring training metrics.",
          "Learned to balance **accuracy vs. inference speed** trade-offs when deploying models on resource-constrained devices."
        ],
        skills: ["TensorFlow", "Python", "Computer Vision", "Deep Learning", "Model Optimization"],
        status: "Terminé"
      },
      {
        name: "Automated Research Paper Summarizer",
        organization: "École Polytechnique",
        description: "Developed an **NLP-based system** to automatically generate concise summaries of academic research papers using **transformer models**. This project addressed the challenge of information overload in academic research by creating a tool that extracts key findings, methodologies, and conclusions from lengthy scientific papers. Built using **BERT** and **GPT-3**, the system employs advanced techniques such as **extractive and abstractive summarization**, **named entity recognition**, and **citation analysis**. The tool processes papers in multiple scientific domains and generates structured summaries that highlight contributions, limitations, and future work.",
        period: "Jan 2024 - May 2024",
        keyLearning: [
          "Developed deep understanding of **transformer architectures** and their application to text summarization tasks.",
          "Gained expertise in **fine-tuning pre-trained models** on domain-specific datasets for improved performance.",
          "Enhanced skills in **natural language processing** including tokenization, attention mechanisms, and sequence-to-sequence models.",
          "Learned to evaluate summarization quality using metrics like **ROUGE**, **BLEU**, and human evaluation.",
          "Improved **data collection** skills by building web scrapers to gather research papers from arXiv and Google Scholar.",
          "Strengthened **software engineering** practices by implementing modular code, unit tests, and CI/CD pipelines."
        ],
        skills: ["NLP", "Transformers", "BERT", "Python", "PyTorch", "Web Scraping"],
        status: "Terminé"
      }
    ],
    education: [
      {
        institution: "École Polytechnique",
        degree: "BSc Computer Science",
        period: "Sep 2023 - Jun 2026",
        location: "Paris, France",
        gpa: "18.2/20",
        status: "En cours",
        cycle: "Bachelor",
        specialisation: "Artificial Intelligence",
        mineure: "Data Science",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Deep Learning & Neural Networks",
          "Computer Vision",
          "Natural Language Processing",
          "Machine Learning Theory",
          "Algorithms & Data Structures",
          "Probability & Statistics",
          "Linear Algebra",
          "Software Engineering"
        ]
      },
      {
        institution: "Lycée Louis-le-Grand",
        degree: "Baccalauréat Général",
        period: "Jun 2023",
        location: "Paris, France",
        gpa: "19.1/20",
        status: "Terminé",
        mention: "Très Bien avec Félicitations",
        specialisation: "Mathématiques et NSI",
        specificPath: "Voie Générale",
        bacType: "Baccalauréat Général",
        hasYearPages: false,
        modules: [
          "Mathématiques (Spécialité)",
          "Numérique et Sciences Informatiques",
          "Grand Oral",
          "Philosophie",
          "Anglais",
          "Histoire-Géographie"
        ]
      }
    ],
    workExperience: [
      {
        position: "Machine Learning Intern",
        company: "Google",
        period: "Jun 2024 - Aug 2024",
        location: "Paris, France",
        description: "As a Machine Learning Intern at **Google**, I joined the **YouTube Recommendations team** where I contributed to improving the platform's **recommendation algorithms** using advanced **deep learning techniques**. My primary focus was on enhancing the **user engagement metrics** by developing and testing new **neural network architectures** for video recommendations. I worked extensively with **TensorFlow** and **PyTorch**, implementing **transformer-based models** and **collaborative filtering** approaches. The role involved processing massive datasets using **Google Cloud Platform**, conducting **A/B tests** to validate model improvements, and collaborating with senior engineers to deploy models to production. I gained invaluable experience in **large-scale machine learning systems**, **distributed computing**, and the intricacies of **recommendation algorithms** that power one of the world's largest video platforms. This internship significantly enhanced my understanding of **production ML systems**, **model optimization**, and the importance of **user-centric metrics** in algorithm design.",
        achievements: [
          "Improved recommendation model accuracy by 12% through implementation of attention mechanisms",
          "Published internal technical paper on novel architecture that was adopted by the team",
          "Optimized inference pipeline reducing latency by 25% for real-time recommendations",
          "Presented findings to senior leadership and received commendation for impact"
        ],
        status: "Terminé"
      },
      {
        position: "Research Assistant",
        company: "École Polytechnique AI Lab",
        period: "Sep 2023 - Présent",
        location: "Paris, France",
        description: "Working as a Research Assistant in the **AI Lab** at **École Polytechnique**, focusing on cutting-edge research in **computer vision** and **deep learning**. My responsibilities include conducting experiments for ongoing research projects, implementing state-of-the-art algorithms from recent publications, and contributing to grant proposals and research papers. I collaborate closely with PhD students and professors on projects related to **object detection**, **image segmentation**, and **neural architecture search**. The role involves extensive programming in **Python**, managing experiments using **MLflow** and **Weights & Biases**, and presenting findings at weekly lab meetings. This position has significantly strengthened my research skills, scientific writing abilities, and understanding of the academic research process in artificial intelligence.",
        achievements: [
          "Co-authored 2 research papers currently under review at top-tier conferences",
          "Developed novel data augmentation technique that improved model robustness by 18%",
          "Mentored 3 undergraduate students on research projects",
          "Secured funding for GPU cluster access through successful grant proposal"
        ],
        status: "ongoing"
      }
    ],
    certifications: [
      { name: "TensorFlow Developer Certificate", provider: "Google", date: "May 2024" },
      { name: "AWS Machine Learning Specialty", provider: "Amazon", date: "March 2024" }
    ],
    sports: [
      {
        name: "Tennis",
        club: "Tennis Club de Paris",
        period: "2018 - Présent",
        position: "Competitive Player",
        level: "Régional",
        status: "En cours",
        description: "Active member of Tennis Club de Paris since 2018, competing in regional tournaments. Tennis has taught me **discipline**, **strategic thinking**, and **resilience** under pressure. Regular training and competitive matches have developed my ability to stay focused, adapt strategies quickly, and maintain composure in high-pressure situations.",
        keyLearning: [
          "Developed **mental resilience** through competitive matches and learning to recover from setbacks quickly.",
          "Enhanced **strategic thinking** by analyzing opponents' playing styles and adapting tactics mid-match.",
          "Improved **time management** skills by balancing intensive training schedule with academic commitments.",
          "Cultivated **sportsmanship** and respect for opponents, referees, and the rules of the game.",
          "Strengthened **physical endurance** and overall fitness through regular conditioning and match play."
        ],
        achievements: [
          "Reached semi-finals in Regional Championship 2024",
          "Ranked top 15 in regional junior circuit",
          "Captain of university tennis team"
        ]
      }
    ],
    bio: "Passionate AI researcher with expertise in deep learning and computer vision. Experienced in building scalable machine learning systems."
  },
  {
    id: 2,
    name: "Lucas Dubois",
    initials: "LD",
    role: "Business Analytics Student",
    program: "MSc Business Analytics",
    university: "AES Business School",
    graduationYear: "2025",
    email: "lucas.dubois@hec.edu",
    linkedin: "https://www.linkedin.com/in/lucasdubois",
    phone: "07553 234567",
    birthdate: "28/07/2003",
    color: "from-green-500 to-green-700",
    profilePhoto: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      { name: "Data Visualization", level: 92 },
      { name: "SQL", level: 88 },
      { name: "Business Intelligence", level: 85 },
      { name: "Excel", level: 95 }
    ],
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Courant" },
      { name: "Espagnol", level: "Intermédiaire" }
    ],
    projects: [
      {
        name: "E-commerce Sales Dashboard",
        organization: "HEC Paris",
        description: "Designed and developed an **interactive Tableau dashboard** for analyzing **e-commerce sales patterns** across **10 European countries**. This comprehensive analytics project involved extracting data from multiple sources, performing **ETL operations**, and creating visually compelling dashboards that revealed key insights into customer behavior, seasonal trends, and regional performance. The dashboard integrated **real-time data** from Shopify, Google Analytics, and internal databases, providing stakeholders with **actionable insights** for strategic decision-making. Key visualizations included **cohort analysis**, **customer segmentation**, **conversion funnels**, and **geographic heat maps** showing sales distribution across Europe.",
        period: "Jan 2024 - Apr 2024",
        keyLearning: [
          "Mastered **Tableau** features including calculated fields, parameters, actions, and dashboard interactivity.",
          "Developed expertise in **data visualization best practices** for creating clear, impactful dashboards that drive decisions.",
          "Enhanced **SQL skills** by writing complex queries involving joins, subqueries, window functions, and CTEs.",
          "Gained experience in **KPI development** by collaborating with stakeholders to define meaningful business metrics.",
          "Improved **stakeholder communication** through regular presentations and iterative feedback incorporation.",
          "Learned **data storytelling** techniques to transform raw data into compelling narratives that influence business strategy."
        ],
        skills: ["Tableau", "SQL", "Data Storytelling", "ETL", "Business Intelligence"],
        status: "Terminé"
      },
      {
        name: "Customer Churn Prediction Model",
        organization: "HEC Paris",
        description: "Built a **machine learning model** to predict customer churn for a subscription-based business, achieving **87% accuracy** and identifying key factors driving customer attrition. This project involved comprehensive **data analysis**, **feature engineering**, and **model selection** to create a production-ready system. The model was trained on historical customer data including demographics, usage patterns, support interactions, and payment history. Deployed as a **REST API**, the system provides real-time churn predictions that enable proactive customer retention strategies.",
        period: "Sep 2023 - Dec 2023",
        keyLearning: [
          "Developed proficiency in **machine learning algorithms** including logistic regression, random forests, and gradient boosting.",
          "Gained expertise in **feature engineering** by creating derived variables that improved model performance.",
          "Enhanced understanding of **model evaluation** through ROC curves, precision-recall trade-offs, and cross-validation.",
          "Learned to handle **imbalanced datasets** using techniques like SMOTE, class weights, and stratified sampling.",
          "Improved **Python** skills by implementing data pipelines using pandas, scikit-learn, and matplotlib.",
          "Understood importance of **model interpretability** using SHAP values to explain predictions to business stakeholders."
        ],
        skills: ["Python", "Scikit-learn", "Machine Learning", "Feature Engineering", "Model Deployment"],
        status: "Terminé"
      }
    ],
    education: [
      {
        institution: "HEC Paris",
        degree: "MSc Business Analytics",
        period: "Sep 2023 - Jun 2025",
        location: "Paris, France",
        gpa: "3.9/4.0",
        status: "En cours",
        cycle: "Master",
        specialisation: "Data Science for Business",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Predictive Analytics",
          "Business Intelligence",
          "Data Visualization",
          "Machine Learning for Business",
          "SQL & Database Management",
          "Python for Data Science",
          "Strategic Analytics",
          "Digital Transformation"
        ]
      },
      {
        institution: "ESSEC Business School",
        degree: "Bachelor in Business Administration",
        period: "Sep 2020 - Jun 2023",
        location: "Cergy, France",
        gpa: "17.8/20",
        status: "Terminé",
        cycle: "Bachelor",
        specialisation: "Finance & Marketing",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Financial Accounting",
          "Corporate Finance",
          "Marketing Strategy",
          "Organizational Behavior",
          "Business Statistics",
          "Microeconomics",
          "International Business",
          "Entrepreneurship"
        ]
      },
      {
        institution: "Lycée Henri IV",
        degree: "Baccalauréat Général",
        period: "Jun 2020",
        location: "Paris, France",
        gpa: "18.5/20",
        status: "Terminé",
        mention: "Très Bien",
        specialisation: "Sciences Économiques et Sociales",
        specificPath: "Voie Générale",
        bacType: "Baccalauréat Général",
        hasYearPages: false,
        modules: [
          "Sciences Économiques et Sociales (Spécialité)",
          "Mathématiques",
          "Grand Oral",
          "Philosophie",
          "Anglais",
          "Histoire-Géographie"
        ]
      }
    ],
    workExperience: [
      {
        position: "Business Analyst Intern",
        company: "McKinsey & Company",
        period: "Jun 2024 - Aug 2024",
        location: "Paris, France",
        description: "As a Business Analyst Intern at **McKinsey & Company**, I was integrated into a high-performing consulting team serving **Fortune 500 clients** in the **retail sector**. My role involved conducting comprehensive **market research**, performing detailed **competitive analysis**, and synthesizing complex business data into actionable strategic insights. I worked on multiple client engagements simultaneously, developing expertise in **industry analysis**, **financial modeling**, and **strategic frameworks**. Key responsibilities included building **Excel models** to evaluate business scenarios, creating compelling **PowerPoint presentations** for C-level executives, and conducting **stakeholder interviews** to gather qualitative insights. I collaborated with senior consultants to develop **go-to-market strategies**, analyze **consumer trends**, and identify **growth opportunities** in competitive markets. The fast-paced environment and exposure to diverse business challenges significantly enhanced my analytical thinking, problem-solving abilities, and client communication skills.",
        achievements: [
          "Led client presentation to executive board, receiving positive feedback on clarity and insights",
          "Developed 3 strategic recommendations that were adopted by client and projected to increase revenue by 15%",
          "Built comprehensive financial model that became template for future team projects",
          "Recognized as top intern in cohort for analytical rigor and client impact"
        ],
        status: "Terminé"
      },
      {
        position: "Data Analytics Consultant",
        company: "Freelance",
        period: "Jan 2024 - Présent",
        location: "Remote",
        description: "Operating as a **freelance Data Analytics Consultant**, providing **data-driven insights** and **business intelligence solutions** to small and medium-sized enterprises across various industries. My services include **data visualization**, **dashboard development**, **predictive modeling**, and **strategic analytics**. I work with clients to understand their business challenges, identify key metrics, design analytics solutions using tools like **Tableau**, **Python**, and **SQL**, and deliver actionable recommendations. Projects have spanned **customer segmentation**, **sales forecasting**, **operational efficiency analysis**, and **marketing attribution modeling**. This freelance work has honed my ability to quickly understand diverse business contexts, communicate technical concepts to non-technical stakeholders, and deliver high-quality work independently while managing multiple client relationships.",
        achievements: [
          "Completed 8 successful client projects with 5-star ratings across all engagements",
          "Generated average of 20% efficiency improvement for clients through data-driven recommendations",
          "Built reusable analytics frameworks that reduced project delivery time by 40%",
          "Expanded client base through referrals, achieving 150% revenue growth quarter-over-quarter"
        ],
        status: "ongoing"
      }
    ],
    certifications: [
      { name: "Tableau Desktop Specialist", provider: "Tableau", date: "April 2024" },
      { name: "Google Data Analytics", provider: "Google", date: "February 2024" }
    ],
    sports: [
      {
        name: "Basketball",
        club: "HEC Paris Basketball",
        period: "2020 - Présent",
        position: "Point Guard",
        level: "Universitaire",
        status: "En cours",
        description: "Playing basketball at university level since 2020, serving as point guard for HEC Paris team. Basketball has enhanced my **leadership skills**, **team coordination**, and ability to make quick decisions under pressure. Leading plays and coordinating team strategies on court translates directly to business scenarios.",
        keyLearning: [
          "Developed **leadership abilities** by directing team plays and making split-second strategic decisions.",
          "Enhanced **collaborative skills** through constant communication and coordination with teammates.",
          "Improved **adaptability** by adjusting strategies based on opponent tactics and game situations.",
          "Strengthened **competitive drive** while maintaining respect and sportsmanship.",
          "Learned to stay **composed under pressure** during crucial game moments."
        ],
        achievements: [
          "Led team to university championship finals 2023",
          "Average 12 assists per game",
          "Named team captain for 2024 season"
        ]
      }
    ],
    bio: "Data-driven business analyst specializing in transforming complex datasets into actionable insights for strategic decision-making."
  },
  {
    id: 3,
    name: "Camille Rousseau",
    initials: "CR",
    role: "Marketing & Communications Student",
    program: "Bachelor in Marketing",
    university: "AES Business School",
    graduationYear: "2026",
    email: "camille.rousseau@essec.edu",
    linkedin: "https://www.linkedin.com/in/camillerousseau",
    portfolio: "https://camillerousseau.com",
    phone: "07554 345678",
    birthdate: "15/11/2004",
    color: "from-pink-500 to-pink-700",
    profilePhoto: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      { name: "Digital Marketing", level: 90 },
      { name: "Content Strategy", level: 88 },
      { name: "Social Media", level: 92 },
      { name: "Brand Management", level: 85 }
    ],
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Courant" },
      { name: "Italien", level: "Intermédiaire" }
    ],
    projects: [
      {
        name: "Sustainable Fashion Campaign",
        organization: "ESSEC Business School",
        description: "Designed and executed a comprehensive **multi-channel marketing campaign** promoting **sustainable fashion brands** to **Gen Z audiences** across France. This project involved developing a creative strategy, producing engaging content, partnering with micro-influencers, and measuring campaign impact. The campaign reached over **500,000 people** and generated **45,000 engagements** across Instagram, TikTok, and YouTube. Key deliverables included **20+ original content pieces**, **influencer collaboration guidelines**, and a detailed **campaign performance report**. The campaign successfully increased brand awareness by **35%** and drove **2,000+ website visits** with a **12% conversion rate**.",
        period: "Feb 2024 - Jun 2024",
        keyLearning: [
          "Mastered **campaign management** by coordinating multiple stakeholders, timelines, and deliverables simultaneously.",
          "Developed expertise in **influencer partnerships** by identifying, vetting, and negotiating with micro-influencers aligned with brand values.",
          "Enhanced **content creation** skills across formats including video, graphics, copy, and user-generated content.",
          "Gained proficiency in **social media analytics** tools to track reach, engagement, conversions, and ROI.",
          "Improved **audience targeting** by analyzing demographics, psychographics, and behavioral data.",
          "Learned importance of **authenticity** in sustainability marketing and avoiding greenwashing accusations."
        ],
        skills: ["Instagram Marketing", "Content Creation", "Analytics", "Influencer Marketing", "Campaign Strategy"],
        status: "Terminé"
      },
      {
        name: "Brand Identity Development for Startup",
        organization: "Freelance Project",
        description: "Led the complete **brand identity development** for a French tech startup, creating a cohesive visual and verbal identity that positioned the company in the competitive SaaS market. This comprehensive project included **brand strategy**, **logo design**, **color palette**, **typography system**, **brand guidelines**, and **marketing collateral**. Worked closely with the founding team to understand their vision, target audience, and competitive landscape. Delivered a **100-page brand book** that serves as the foundation for all marketing communications.",
        period: "Sep 2023 - Dec 2023",
        keyLearning: [
          "Developed expertise in **brand strategy** by conducting market research, competitive analysis, and positioning workshops.",
          "Enhanced **visual design skills** through creating logos, color systems, and comprehensive brand guidelines.",
          "Improved **client management** abilities by facilitating discovery sessions and presenting design concepts.",
          "Gained experience with **design tools** including Adobe Creative Suite, Figma, and brand asset management platforms.",
          "Learned to balance **creative vision** with business objectives and market realities.",
          "Strengthened **storytelling** skills by developing brand narratives that resonate with target audiences."
        ],
        skills: ["Brand Strategy", "Visual Design", "Adobe Creative Suite", "Figma", "Client Management"],
        status: "Terminé"
      }
    ],
    education: [
      {
        institution: "ESSEC Business School",
        degree: "Bachelor in Marketing",
        period: "Sep 2023 - Jun 2026",
        location: "Cergy, France",
        gpa: "17.5/20",
        status: "En cours",
        cycle: "Bachelor",
        specialisation: "Digital Marketing",
        mineure: "Brand Strategy",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Digital Marketing Strategy",
          "Social Media Marketing",
          "Content Marketing",
          "Brand Management",
          "Consumer Behavior",
          "Marketing Analytics",
          "Advertising & Communications",
          "E-commerce Strategy"
        ]
      },
      {
        institution: "Parsons School of Design",
        degree: "Summer Design Program",
        period: "Jul 2024 - Aug 2024",
        location: "New York, USA",
        status: "Terminé",
        cycle: "Programme d'été",
        specialisation: "Visual Communication",
        studyMode: "Intensif",
        hasYearPages: false,
        modules: [
          "Graphic Design Fundamentals",
          "Typography",
          "Color Theory",
          "Digital Media Design",
          "Brand Identity Design",
          "Portfolio Development"
        ]
      },
      {
        institution: "Lycée Janson de Sailly",
        degree: "Baccalauréat Général",
        period: "Jun 2023",
        location: "Paris, France",
        gpa: "17.9/20",
        status: "Terminé",
        mention: "Très Bien",
        specialisation: "Arts et Sciences Économiques",
        specificPath: "Voie Générale",
        bacType: "Baccalauréat Général",
        hasYearPages: false,
        modules: [
          "Arts Plastiques (Spécialité)",
          "Sciences Économiques et Sociales",
          "Grand Oral",
          "Philosophie",
          "Anglais",
          "Italien"
        ]
      }
    ],
    workExperience: [
      {
        position: "Marketing Intern",
        company: "L'Oréal",
        period: "Jun 2024 - Aug 2024",
        location: "Paris, France",
        description: "As a Marketing Intern at **L'Oréal**, I supported the **brand marketing team** in launching a new **skincare product line** specifically targeting **young adults aged 18-25**. My role encompassed **end-to-end campaign execution** including developing the **social media strategy**, creating engaging **content** across multiple platforms, coordinating **influencer partnerships**, and analyzing **campaign performance metrics**. I worked closely with the creative team to develop **brand messaging** that resonated with Gen Z values around authenticity and sustainability. Key activities included managing the **Instagram** and **TikTok** content calendars, conducting **consumer research** through surveys and focus groups, and optimizing **paid advertising campaigns** on Meta platforms. The launch exceeded expectations, generating significant **brand awareness** and **product trial** among the target demographic. This experience deepened my understanding of **consumer behavior**, **digital marketing tactics**, and the complexities of launching products in the competitive beauty industry.",
        achievements: [
          "Generated 500K+ social media impressions across Instagram, TikTok, and YouTube",
          "Increased social engagement by 45% through strategic content planning and community management",
          "Coordinated partnerships with 15 micro-influencers resulting in 2M+ reach",
          "Contributed to successful launch achieving 120% of first-month sales targets"
        ],
        status: "Terminé"
      },
      {
        position: "Social Media Manager",
        company: "Sustainable Fashion Collective",
        period: "Feb 2023 - Présent",
        location: "Paris, France",
        description: "Serving as **Social Media Manager** for the **Sustainable Fashion Collective**, a non-profit organization promoting **ethical fashion** and **environmental sustainability** in the fashion industry. I develop and execute comprehensive **social media strategies** to raise awareness about sustainable fashion practices, engage with conscious consumers, and build a community of advocates for fashion sustainability. My responsibilities include creating original content (graphics, videos, stories), managing posting schedules across **Instagram**, **LinkedIn**, and **Twitter**, engaging with followers and partners, and tracking performance metrics. I also collaborate with sustainable fashion brands for **co-marketing campaigns** and organize virtual events and workshops. This ongoing role allows me to combine my passion for sustainability with marketing expertise while building long-term brand presence and community engagement.",
        achievements: [
          "Grew Instagram following from 5K to 45K in 18 months through consistent, authentic content",
          "Achieved average engagement rate of 8.5%, significantly above industry benchmark of 3%",
          "Organized 4 virtual sustainability workshops with 500+ participants",
          "Secured partnerships with 20+ ethical fashion brands for collaborative campaigns"
        ],
        status: "ongoing"
      }
    ],
    certifications: [
      { name: "Facebook Blueprint Certification", provider: "Meta", date: "June 2024" },
      { name: "HubSpot Content Marketing", provider: "HubSpot", date: "April 2024" }
    ],
    sports: [
      {
        name: "Yoga",
        organization: "Yoga Studio ESSEC",
        period: "2021 - Présent",
        level: "Avancé",
        status: "En cours",
        description: "Practicing yoga regularly since 2021, achieving advanced level proficiency. Yoga has been instrumental in developing **mindfulness**, **stress management**, and **work-life balance**. The discipline and focus required in yoga practice translate directly to maintaining clarity and composure in demanding professional environments.",
        keyLearning: [
          "Mastered **stress management** techniques through breathing exercises and meditation.",
          "Enhanced **focus and concentration** through mindful practice and present-moment awareness.",
          "Developed **body awareness** and improved overall physical and mental well-being.",
          "Cultivated **patience and persistence** by progressing through challenging poses and sequences.",
          "Learned to maintain **balance** between personal wellness and professional ambitions."
        ],
        achievements: [
          "Completed 200-hour yoga teacher training certification",
          "Lead weekly yoga sessions for students",
          "Participated in international yoga retreat 2023"
        ]
      }
    ],
    bio: "Creative marketing professional passionate about building authentic brand connections through innovative digital strategies and storytelling."
  },
  {
    id: 4,
    name: "Thomas Lefevre",
    initials: "TL",
    role: "Software Engineering Student",
    program: "Engineering Degree",
    university: "AES Business School",
    graduationYear: "2025",
    email: "thomas.lefevre@centralesupelec.fr",
    linkedin: "https://www.linkedin.com/in/thomaslefevre",
    portfolio: "https://thomaslefevre.io",
    phone: "07555 456789",
    birthdate: "08/01/2003",
    color: "from-teal-500 to-teal-700",
    profilePhoto: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      { name: "Java", level: 92 },
      { name: "Spring Boot", level: 88 },
      { name: "Cloud Computing", level: 85 },
      { name: "DevOps", level: 80 }
    ],
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Courant" },
      { name: "Mandarin", level: "Notions" }
    ],
    projects: [
      {
        name: "Cloud-Based Microservices Platform",
        organization: "CentraleSupélec",
        description: "Architected and deployed a highly **scalable microservices platform** on **AWS** capable of handling over **10,000 requests per second** with **99.9% uptime**. This comprehensive project involved designing a distributed system using **Spring Boot microservices**, implementing **service discovery** with Eureka, setting up **API Gateway**, and orchestrating containers with **Kubernetes**. The platform employed **event-driven architecture** using Kafka for asynchronous communication, **Redis** for caching, and **PostgreSQL** for persistent storage. Implemented comprehensive **monitoring and logging** using Prometheus, Grafana, and ELK stack.",
        period: "Sep 2024 - Dec 2024",
        keyLearning: [
          "Mastered **microservices architecture** patterns including service decomposition, API design, and inter-service communication.",
          "Gained deep expertise in **Kubernetes** for container orchestration, including pods, services, deployments, and ingress.",
          "Developed proficiency in **cloud deployment** using AWS services like EC2, RDS, S3, CloudWatch, and Load Balancers.",
          "Enhanced understanding of **distributed systems** concepts including CAP theorem, eventual consistency, and fault tolerance.",
          "Learned **DevOps practices** by implementing CI/CD pipelines with Jenkins and automating infrastructure with Terraform.",
          "Improved **system design skills** by making architectural decisions balancing performance, scalability, and maintainability."
        ],
        skills: ["AWS", "Docker", "Kubernetes", "Java", "Spring Boot", "Microservices"],
        status: "Terminé"
      },
      {
        name: "Real-Time Collaboration Platform",
        organization: "CentraleSupélec",
        description: "Developed a **real-time collaboration platform** similar to Google Docs, enabling multiple users to simultaneously edit documents with **operational transformation** for conflict resolution. This technically challenging project required implementing **WebSocket connections** for real-time communication, designing efficient **data synchronization algorithms**, and building a responsive **React frontend**. The system supports **rich text editing**, **commenting**, **version history**, and **user presence indicators**. Successfully scaled to support **100+ concurrent users** per document.",
        period: "Jan 2024 - May 2024",
        keyLearning: [
          "Gained expertise in **real-time systems** by implementing WebSocket protocols and handling bi-directional communication.",
          "Developed understanding of **operational transformation** algorithms for maintaining consistency in collaborative editing.",
          "Enhanced **frontend development** skills using React, Redux, and modern JavaScript ES6+ features.",
          "Improved **database design** by creating efficient schemas for document storage and version control.",
          "Learned to optimize **performance** by implementing debouncing, throttling, and efficient rendering strategies.",
          "Strengthened **testing skills** by writing unit tests, integration tests, and end-to-end tests for complex interactions."
        ],
        skills: ["React", "WebSocket", "Node.js", "MongoDB", "Real-Time Systems", "JavaScript"],
        status: "Terminé"
      }
    ],
    education: [
      {
        institution: "CentraleSupélec",
        degree: "Engineering Degree",
        period: "Sep 2022 - Jun 2025",
        location: "Gif-sur-Yvette, France",
        gpa: "17.8/20",
        status: "En cours",
        cycle: "Master",
        specialisation: "Software Engineering",
        mineure: "Cloud Computing",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Distributed Systems",
          "Software Architecture",
          "Cloud Infrastructure",
          "DevOps & CI/CD",
          "Microservices Design",
          "Database Systems",
          "System Security",
          "Advanced Algorithms"
        ]
      },
      {
        institution: "National University of Singapore",
        degree: "Exchange Semester",
        period: "Jan 2024 - Jun 2024",
        location: "Singapore",
        status: "Terminé",
        cycle: "Échange international",
        specialisation: "Computer Science",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Cloud Computing Technologies",
          "Big Data Analytics",
          "Mobile Application Development",
          "Artificial Intelligence",
          "Cybersecurity Fundamentals",
          "Internet of Things"
        ]
      },
      {
        institution: "Classe Préparatoire Hoche",
        degree: "CPGE MPSI/MP",
        period: "Sep 2020 - Jun 2022",
        location: "Versailles, France",
        status: "Terminé",
        cycle: "Classes Préparatoires",
        specialisation: "Mathématiques, Physique, Sciences de l'Ingénieur",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Mathématiques Supérieures",
          "Physique-Chimie",
          "Sciences de l'Ingénieur",
          "Informatique",
          "Français-Philosophie",
          "Anglais"
        ]
      }
    ],
    workExperience: [
      {
        position: "Backend Developer Intern",
        company: "Amazon",
        period: "Jun 2024 - Aug 2024",
        location: "Paris, France",
        description: "As a Backend Developer Intern at **Amazon**, I joined the **Prime Video Recommendations** team where I contributed to developing **high-performance backend services** that power video recommendations for millions of users globally. My work focused on improving the **recommendation engine's performance** and **scalability** using **Java**, **Spring Boot**, and **AWS services**. I was responsible for designing and implementing new API endpoints, optimizing database queries, introducing **Redis caching layers**, and ensuring services could handle peak traffic loads. The role involved working with **microservices architecture**, participating in code reviews, writing comprehensive unit and integration tests, and monitoring production systems using **CloudWatch** and **Datadog**. I collaborated with data scientists to integrate new ML models into the production pipeline and worked closely with senior engineers to follow Amazon's rigorous engineering standards. This experience provided deep insights into building **distributed systems** at massive scale and the engineering practices of one of the world's leading tech companies.",
        achievements: [
          "Reduced API latency by 30% through query optimization and intelligent caching strategies",
          "Implemented Redis caching layer that decreased database load by 50% during peak hours",
          "Designed and deployed 3 new API endpoints handling 10K+ requests per second",
          "Identified and fixed critical bug that improved system reliability by 15%"
        ],
        status: "Terminé"
      },
      {
        position: "Full-Stack Developer",
        company: "TechStartup (Stealth Mode)",
        period: "Dec 2023 - Présent",
        location: "Paris, France",
        description: "Working as a **Full-Stack Developer** for an early-stage tech startup in stealth mode, developing a B2B SaaS platform from the ground up. I'm responsible for both **frontend** and **backend development**, making architectural decisions, selecting technology stack, and building core product features. The tech stack includes **React** and **TypeScript** for the frontend, **Node.js** and **Express** for the backend, **PostgreSQL** for data persistence, and **AWS** for cloud infrastructure. My role encompasses everything from designing database schemas and implementing RESTful APIs to creating intuitive user interfaces and setting up CI/CD pipelines. Working in a small team requires wearing multiple hats, participating in product decisions, and moving quickly from concept to implementation. This experience is teaching me the realities of building products in resource-constrained startup environments while maintaining code quality and scalability.",
        achievements: [
          "Built MVP from scratch that secured initial seed funding of €200K",
          "Developed core product features serving first 50 beta customers",
          "Implemented automated testing and deployment pipeline reducing release time by 60%",
          "Made key architectural decisions that positioned product for future scale"
        ],
        status: "ongoing"
      }
    ],
    certifications: [
      { name: "AWS Solutions Architect", provider: "Amazon", date: "July 2024" },
      { name: "Java SE 11 Developer", provider: "Oracle", date: "March 2024" }
    ],
    sports: [
      {
        name: "Cyclisme",
        club: "Vélo Club CentraleSupélec",
        period: "2019 - Présent",
        level: "Compétitif",
        status: "En cours",
        description: "Competitive cyclist since 2019, participating in regional races and long-distance events. Cycling has instilled **perseverance**, **goal-setting**, and the ability to push through physical and mental barriers. Training for endurance events requires careful planning and consistent effort, skills that apply to long-term engineering projects.",
        keyLearning: [
          "Built **mental toughness** through challenging long-distance rides and competitive races.",
          "Developed **goal-oriented mindset** by setting and achieving progressive performance targets.",
          "Enhanced **strategic planning** skills through race preparation and pacing strategies.",
          "Improved **self-discipline** via consistent training schedules and recovery protocols.",
          "Learned importance of **incremental progress** and continuous improvement."
        ],
        achievements: [
          "Completed Paris-Roubaix amateur race 2024",
          "Placed 3rd in regional 100km time trial",
          "Cycled over 5000km in 2023"
        ]
      }
    ],
    bio: "Full-stack engineer focused on building scalable cloud-native applications with expertise in microservices architecture and distributed systems."
  },
  {
    id: 5,
    name: "Léa Bernard",
    initials: "LB",
    role: "Finance Student",
    program: "MSc Finance",
    university: "AES Business School",
    graduationYear: "2025",
    email: "lea.bernard@escp.eu",
    linkedin: "https://www.linkedin.com/in/leabernard",
    phone: "07556 567890",
    birthdate: "22/09/2003",
    color: "from-orange-500 to-orange-700",
    profilePhoto: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      { name: "Financial Modeling", level: 93 },
      { name: "Valuation", level: 90 },
      { name: "Excel VBA", level: 88 },
      { name: "Bloomberg Terminal", level: 85 }
    ],
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Courant" },
      { name: "Espagnol", level: "Courant" }
    ],
    projects: [
      {
        name: "Equity Research Analysis",
        organization: "ESCP Business School",
        description: "Conducted comprehensive **equity research** on **5 European tech companies** with detailed **DCF valuation models**, comparable company analysis, and investment recommendations. This intensive project involved analyzing financial statements, industry trends, competitive positioning, and growth prospects. Built sophisticated **Excel models** incorporating revenue forecasts, margin analysis, WACC calculations, and sensitivity analysis. Presented findings to a panel of finance professors and received top marks for analytical rigor. The final report included **50+ pages** of analysis with detailed assumptions, risk factors, and price targets.",
        period: "Jan 2024 - May 2024",
        keyLearning: [
          "Mastered **DCF valuation** methodology including free cash flow projections, terminal value calculations, and discount rate estimation.",
          "Developed expertise in **financial statement analysis** by dissecting income statements, balance sheets, and cash flow statements.",
          "Enhanced **industry analysis** skills by studying market dynamics, competitive forces, and regulatory environments.",
          "Gained proficiency in **Excel modeling** using advanced formulas, data tables, scenarios, and VBA for automation.",
          "Improved **investment thesis development** by synthesizing quantitative analysis with qualitative insights.",
          "Strengthened **presentation skills** by communicating complex financial concepts to diverse audiences."
        ],
        skills: ["Financial Modeling", "Excel", "PowerPoint", "Valuation", "Financial Analysis"],
        status: "Terminé"
      },
      {
        name: "Portfolio Management Simulation",
        organization: "ESCP Business School",
        description: "Participated in a semester-long **portfolio management competition** managing a virtual **€1 million portfolio** of European stocks and bonds. Developed and executed investment strategies based on **fundamental analysis**, **technical indicators**, and **macroeconomic trends**. The portfolio achieved **18% returns** outperforming the benchmark index by **7%**. This hands-on project provided practical experience in **asset allocation**, **risk management**, and **performance attribution**.",
        period: "Sep 2023 - Dec 2023",
        keyLearning: [
          "Gained practical experience in **portfolio construction** by balancing risk-return trade-offs and diversification.",
          "Developed skills in **risk management** using metrics like VaR, beta, Sharpe ratio, and maximum drawdown.",
          "Enhanced understanding of **market dynamics** by actively managing positions during volatile market conditions.",
          "Improved **decision-making under uncertainty** by making investment decisions with incomplete information.",
          "Learned importance of **discipline** in following investment strategy despite short-term market fluctuations.",
          "Strengthened **analytical thinking** by conducting regular portfolio reviews and performance attribution analysis."
        ],
        skills: ["Portfolio Management", "Risk Management", "Bloomberg Terminal", "Investment Strategy", "Performance Analysis"],
        status: "Terminé"
      }
    ],
    education: [
      {
        institution: "ESCP Business School",
        degree: "MSc Finance",
        period: "Sep 2023 - Jun 2025",
        location: "Paris, France",
        gpa: "18.5/20",
        status: "En cours",
        cycle: "Master",
        specialisation: "Corporate Finance",
        mineure: "Investment Banking",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Corporate Valuation",
          "Mergers & Acquisitions",
          "Financial Modeling",
          "Investment Analysis",
          "Derivatives & Risk Management",
          "Private Equity",
          "Financial Markets",
          "Quantitative Finance"
        ]
      },
      {
        institution: "London School of Economics",
        degree: "Exchange Semester",
        period: "Sep 2024 - Dec 2024",
        location: "London, UK",
        status: "Terminé",
        cycle: "Échange international",
        specialisation: "Finance & Economics",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Advanced Corporate Finance",
          "International Financial Markets",
          "Financial Econometrics",
          "Asset Pricing Theory",
          "Behavioural Finance",
          "Financial Regulation"
        ]
      },
      {
        institution: "Université Paris-Dauphine",
        degree: "Licence Économie et Gestion",
        period: "Sep 2020 - Jun 2023",
        location: "Paris, France",
        gpa: "17.9/20",
        status: "Terminé",
        cycle: "Licence",
        specialisation: "Finance",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Microéconomie",
          "Macroéconomie",
          "Comptabilité Financière",
          "Mathématiques Financières",
          "Statistiques",
          "Finance d'Entreprise",
          "Marchés Financiers",
          "Économétrie"
        ]
      }
    ],
    workExperience: [
      {
        position: "Investment Banking Intern",
        company: "Goldman Sachs",
        period: "Jun 2024 - Aug 2024",
        location: "Paris, France",
        description: "As an Investment Banking Intern at **Goldman Sachs**, I supported the **M&A advisory team** in executing **multi-billion euro transactions** in the **Technology, Media, and Telecommunications (TMT) sector**. My responsibilities included building detailed **financial models** for valuation analysis, conducting comprehensive **due diligence**, preparing **pitch books** and **client presentations**, and supporting deal execution processes. I worked intensively with **Excel** for financial modeling (DCF, comparable companies, precedent transactions), **PowerPoint** for client deliverables, and **Bloomberg Terminal** for market research and financial data. The role demanded long hours, extreme attention to detail, and the ability to work under tight deadlines while maintaining accuracy. I participated in client meetings, deal negotiations, and collaborated with legal, tax, and industry specialists. This demanding experience significantly enhanced my financial acumen, technical modeling skills, and understanding of complex M&A transactions in high-stakes environments.",
        achievements: [
          "Built 15+ comprehensive financial models for deals totaling over €5 billion in transaction value",
          "Prepared client pitch books that contributed to winning 2 major advisory mandates",
          "Conducted due diligence identifying key risks that shaped deal structure and valuation",
          "Received exceptional performance rating and return offer for full-time analyst position"
        ],
        status: "Terminé"
      },
      {
        position: "Private Equity Analyst Intern",
        company: "PAI Partners",
        period: "Jan 2024 - Présent",
        location: "Paris, France",
        description: "Working as a **Private Equity Analyst Intern** at **PAI Partners**, a leading European private equity firm with €20+ billion assets under management. I support investment professionals in **deal sourcing**, **company analysis**, **financial modeling**, and **portfolio monitoring**. My responsibilities include conducting **industry research** to identify attractive investment opportunities, building detailed **LBO models** to evaluate potential acquisitions, performing **operational due diligence** on target companies, and tracking performance of portfolio companies. I analyze **market trends**, competitive dynamics, and value creation opportunities across multiple sectors. The role involves extensive financial analysis using Excel, creating investment memos, and participating in management meetings with portfolio companies. This ongoing internship provides deep exposure to the private equity investment process, from initial screening through deal execution to value creation in portfolio companies.",
        achievements: [
          "Sourced 3 potential investment opportunities that progressed to detailed due diligence",
          "Built comprehensive LBO models evaluating acquisition scenarios and return projections",
          "Contributed to quarterly portfolio review analyzing performance of 8 portfolio companies",
          "Developed industry research reports informing team's investment thesis in healthcare sector"
        ],
        status: "ongoing"
      }
    ],
    certifications: [
      { name: "CFA Level I", provider: "CFA Institute", date: "August 2024" },
      { name: "Bloomberg Market Concepts", provider: "Bloomberg", date: "May 2024" }
    ],
    sports: [
      {
        name: "Équitation",
        club: "Centre Équestre de Paris",
        period: "2016 - Présent",
        position: "Show Jumping",
        level: "National",
        status: "En cours",
        description: "Competitive show jumper since 2016, competing at national level. Horseback riding demands **precision**, **trust**, and **clear communication**. The partnership with a horse requires reading subtle cues and responding appropriately, skills that translate to understanding client needs and building strong professional relationships in finance.",
        keyLearning: [
          "Cultivated **attention to detail** through precise control and timing in jumping courses.",
          "Developed **trust and partnership** skills by building strong relationships with horses.",
          "Enhanced **risk assessment** abilities by evaluating and navigating challenging courses.",
          "Improved **composure under scrutiny** during competitions before judges and audiences.",
          "Learned **responsibility** through daily care and training of horses."
        ],
        achievements: [
          "National show jumping championship qualifier 2023",
          "Multiple regional competition wins",
          "GALOP 7 certification"
        ]
      }
    ],
    bio: "Aspiring investment banker with strong analytical skills and passion for financial markets, corporate strategy, and M&A transactions."
  },
  {
    id: 6,
    name: "Antoine Moreau",
    initials: "AM",
    role: "Product Management Student",
    program: "MSc Innovation & Entrepreneurship",
    university: "AES Business School",
    graduationYear: "2025",
    email: "antoine.moreau@edhec.edu",
    linkedin: "https://www.linkedin.com/in/antoinemoreau",
    portfolio: "https://antoinemoreau.com",
    phone: "07557 678901",
    birthdate: "05/04/2003",
    color: "from-red-500 to-red-700",
    profilePhoto: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      { name: "Product Strategy", level: 88 },
      { name: "Agile/Scrum", level: 90 },
      { name: "User Research", level: 85 },
      { name: "Roadmap Planning", level: 87 }
    ],
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Courant" },
      { name: "Portugais", level: "Intermédiaire" }
    ],
    projects: [
      {
        name: "HealthTech Mobile App",
        organization: "EDHEC Business School",
        description: "Led end-to-end **product development** of a **mobile health tracking application** from initial concept through **MVP launch** to **500+ active users**. This comprehensive project involved conducting user research, defining product requirements, creating wireframes and prototypes, coordinating with developers, and iterating based on user feedback. The app enables users to track health metrics, set wellness goals, and receive personalized recommendations. Employed **lean startup methodology** with rapid experimentation and **validated learning**. Successfully raised **€50K** in seed funding based on MVP traction.",
        period: "Feb 2024 - Jun 2024",
        keyLearning: [
          "Mastered **product discovery** techniques including user interviews, surveys, and competitive analysis.",
          "Developed proficiency in **product-market fit** assessment using metrics like retention, engagement, and NPS.",
          "Enhanced **prototyping skills** using Figma to create interactive mockups for user testing.",
          "Gained experience in **agile development** by writing user stories, managing sprints, and prioritizing backlog.",
          "Improved **stakeholder management** by aligning development team, advisors, and potential investors.",
          "Learned importance of **iterative development** and pivoting based on user feedback and market signals."
        ],
        skills: ["Figma", "Product Management", "User Stories", "Agile", "User Research"],
        status: "Terminé"
      },
      {
        name: "E-commerce Platform Optimization",
        organization: "Consulting Project",
        description: "Consulted for a mid-sized **e-commerce company** to optimize their platform's **conversion rate** and **user experience**. Conducted comprehensive **analytics audit**, **A/B testing program**, and **UX improvements** that increased conversion rate by **32%** and average order value by **15%**. This data-driven project involved analyzing user behavior through **Google Analytics**, **Hotjar heatmaps**, and **user testing sessions**. Delivered actionable recommendations spanning **checkout flow**, **product pages**, **navigation**, and **mobile experience**.",
        period: "Sep 2023 - Dec 2023",
        keyLearning: [
          "Developed expertise in **conversion rate optimization** using data-driven experimentation and testing.",
          "Enhanced **analytics skills** by analyzing user funnels, identifying drop-off points, and measuring impact.",
          "Gained proficiency in **A/B testing** methodology including hypothesis formation, test design, and statistical significance.",
          "Improved **UX analysis** abilities by conducting heuristic evaluations and identifying friction points.",
          "Learned to **prioritize initiatives** based on potential impact, implementation effort, and business goals.",
          "Strengthened **communication skills** by presenting findings and recommendations to C-level executives."
        ],
        skills: ["Product Analytics", "A/B Testing", "UX Design", "Google Analytics", "Data-Driven Decision Making"],
        status: "Terminé"
      }
    ],
    education: [
      {
        institution: "EDHEC Business School",
        degree: "MSc Innovation & Entrepreneurship",
        period: "Sep 2023 - Jun 2025",
        location: "Lille, France",
        gpa: "17.2/20",
        status: "En cours",
        cycle: "Master",
        specialisation: "Product Management",
        mineure: "Digital Innovation",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Product Strategy & Roadmapping",
          "User Experience Design",
          "Agile Product Development",
          "Innovation Management",
          "Business Model Innovation",
          "Data-Driven Decision Making",
          "Lean Startup Methodology",
          "Growth Hacking"
        ]
      },
      {
        institution: "Stanford University",
        degree: "Design Thinking Workshop",
        period: "Jun 2024",
        location: "Stanford, USA",
        status: "Terminé",
        cycle: "Formation courte",
        specialisation: "Design Thinking",
        studyMode: "Intensif",
        hasYearPages: false,
        modules: [
          "Human-Centered Design",
          "Rapid Prototyping",
          "User Research Methods",
          "Ideation Techniques",
          "Testing & Iteration",
          "Design Sprint Methodology"
        ]
      },
      {
        institution: "IESEG School of Management",
        degree: "Bachelor in Business Administration",
        period: "Sep 2020 - Jun 2023",
        location: "Lille, France",
        gpa: "17.4/20",
        status: "Terminé",
        cycle: "Bachelor",
        specialisation: "Management & Innovation",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Strategic Management",
          "Marketing Fundamentals",
          "Financial Management",
          "Operations Management",
          "Entrepreneurship",
          "Business Analytics",
          "Organizational Behavior",
          "International Business"
        ]
      }
    ],
    workExperience: [
      {
        position: "Product Manager Intern",
        company: "BlaBlaCar",
        period: "Jun 2024 - Aug 2024",
        location: "Paris, France",
        description: "As a Product Manager Intern at **BlaBlaCar**, Europe's leading **carpooling platform**, I managed the **end-to-end feature development** process working closely with **engineering**, **design**, and **data science** teams. My responsibilities included defining **product requirements**, creating **user stories**, prioritizing the **product backlog**, facilitating **sprint planning** meetings, and tracking progress using **agile methodologies**. I conducted **user research** through interviews and surveys to identify pain points, analyzed **product metrics** to measure feature impact, and made data-driven decisions about feature prioritization. Key projects included improving the **booking flow**, enhancing **trust and safety features**, and optimizing the **driver-passenger matching algorithm**. I worked extensively with **Jira** for project management, **Figma** for design collaboration, and **Mixpanel** for product analytics. This internship provided invaluable hands-on experience in **product management** at a high-growth tech company serving millions of users across Europe.",
        achievements: [
          "Launched 2 major features: enhanced booking flow and improved messaging system",
          "Increased user retention by 18% through improvements to onboarding experience",
          "Conducted 20+ user interviews that informed product roadmap decisions",
          "Collaborated with engineering team to reduce feature development time by 25%"
        ],
        status: "Terminé"
      },
      {
        position: "Product Owner",
        company: "EdTech Startup",
        period: "Oct 2023 - Présent",
        location: "Lille, France",
        description: "Serving as **Product Owner** for an **EdTech startup** developing an innovative online learning platform for professional skills development. I own the **product vision** and **roadmap**, working closely with stakeholders to translate business objectives into actionable product features. My responsibilities include managing the **product backlog**, defining **acceptance criteria**, conducting **user acceptance testing**, and ensuring delivered features align with user needs and business goals. I facilitate daily standups, sprint planning, and retrospective meetings, fostering a collaborative environment between development, design, and business teams. The role requires balancing **user needs**, **technical constraints**, and **business priorities** while maintaining a clear product strategy. I also analyze **user behavior data**, conduct **A/B tests** to validate hypotheses, and iterate based on learnings. This ongoing role is developing my leadership skills and deepening my understanding of product development in the education technology space.",
        achievements: [
          "Defined and executed product roadmap resulting in 200% growth in active users",
          "Launched 5 major feature releases with 95%+ on-time delivery rate",
          "Improved user satisfaction score (NPS) from 42 to 68 through user-centric approach",
          "Established product metrics framework and analytics dashboard for data-driven decisions"
        ],
        status: "ongoing"
      }
    ],
    certifications: [
      { name: "Certified Scrum Product Owner", provider: "Scrum Alliance", date: "July 2024" },
      { name: "Google UX Design Certificate", provider: "Google", date: "May 2024" }
    ],
    sports: [
      {
        name: "Escalade",
        club: "Climb Up Lille",
        period: "2020 - Présent",
        level: "6c+",
        status: "En cours",
        description: "Rock climbing enthusiast since 2020, currently climbing at 6c+ level. Climbing develops **problem-solving skills**, **calculated risk-taking**, and **perseverance**. Each route is a unique puzzle requiring creative solutions, patience, and the courage to attempt challenging moves—directly applicable to product management.",
        keyLearning: [
          "Enhanced **problem-solving abilities** by analyzing routes and finding optimal solutions.",
          "Developed **risk management** skills through assessing holds, falls, and safety measures.",
          "Improved **persistence** by working through challenging routes over multiple attempts.",
          "Cultivated **growth mindset** by continuously pushing beyond comfort zone.",
          "Strengthened **trust** through belaying partnerships and climbing community."
        ],
        achievements: [
          "Completed multiple 6c+ routes",
          "Lead climbing certification",
          "Organized university climbing trips"
        ]
      }
    ],
    bio: "Product manager passionate about building user-centric products that solve real problems through iterative development and data-driven decisions."
  },
  {
    id: 7,
    name: "Marie Fontaine",
    initials: "MF",
    role: "Sustainability & CSR Student",
    program: "MSc Sustainable Development",
    university: "AES Business School",
    graduationYear: "2025",
    email: "marie.fontaine@sciencespo.fr",
    linkedin: "https://www.linkedin.com/in/mariefontaine",
    phone: "07558 789012",
    birthdate: "18/06/2003",
    color: "from-emerald-500 to-emerald-700",
    profilePhoto: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      { name: "ESG Analysis", level: 90 },
      { name: "Sustainability Reporting", level: 88 },
      { name: "Stakeholder Engagement", level: 92 },
      { name: "Policy Analysis", level: 85 }
    ],
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Courant" },
      { name: "Néerlandais", level: "Intermédiaire" }
    ],
    projects: [
      {
        name: "Corporate Carbon Footprint Study",
        organization: "Sciences Po Paris",
        description: "Conducted comprehensive **carbon footprint analysis** for a multinational corporation with operations across **15 countries**, following the **GHG Protocol** methodology. This extensive project involved collecting activity data from multiple sources, calculating **Scope 1, 2, and 3 emissions**, identifying emission hotspots, and developing a detailed **decarbonization roadmap** aligned with **Science-Based Targets**. The final deliverable included a **150-page report** with emissions inventory, reduction scenarios, cost-benefit analysis, and implementation timeline. Presented findings to the company's sustainability committee and board of directors.",
        period: "Sep 2024 - Dec 2024",
        keyLearning: [
          "Mastered **GHG Protocol** standards for corporate greenhouse gas accounting and reporting.",
          "Developed expertise in **carbon accounting** including emission factors, calculation methodologies, and data quality assessment.",
          "Enhanced **data collection** skills by coordinating with multiple departments and international offices.",
          "Gained proficiency in **climate strategy** development including target setting, reduction pathways, and offsetting strategies.",
          "Improved **stakeholder engagement** by conducting workshops and interviews with business unit leaders.",
          "Learned to balance **environmental ambition** with business realities and financial constraints."
        ],
        skills: ["ESG", "Data Analysis", "Sustainability", "GHG Protocol", "Climate Strategy"],
        status: "Terminé"
      },
      {
        name: "Circular Economy Business Model Design",
        organization: "Sciences Po Paris",
        description: "Designed a **circular economy business model** for a consumer electronics company to reduce waste and extend product lifecycles. This innovative project involved analyzing the current **linear take-make-dispose model**, identifying opportunities for **product-as-a-service**, **refurbishment programs**, and **material recovery**. Developed financial projections showing potential **25% cost savings** and **40% waste reduction** over 5 years. Created detailed implementation roadmap addressing technical, operational, and cultural challenges.",
        period: "Jan 2024 - May 2024",
        keyLearning: [
          "Gained deep understanding of **circular economy** principles including reduce, reuse, recycle, and regenerate.",
          "Developed skills in **business model innovation** by redesigning value propositions, revenue streams, and cost structures.",
          "Enhanced **systems thinking** by analyzing material flows, lifecycle impacts, and stakeholder ecosystems.",
          "Improved **financial modeling** for circular initiatives including TCO, payback periods, and NPV calculations.",
          "Learned about **reverse logistics** challenges and solutions for product take-back and refurbishment.",
          "Strengthened **change management** understanding by addressing organizational barriers to circularity."
        ],
        skills: ["Circular Economy", "Business Model Design", "Sustainability", "Financial Analysis", "Systems Thinking"],
        status: "Terminé"
      }
    ],
    education: [
      {
        institution: "Sciences Po Paris",
        degree: "MSc Sustainable Development",
        period: "Sep 2023 - Jun 2025",
        location: "Paris, France",
        gpa: "17.9/20",
        status: "En cours",
        cycle: "Master",
        specialisation: "Corporate Sustainability",
        mineure: "Climate Policy",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Climate Change & Sustainability",
          "ESG Strategy & Reporting",
          "Circular Economy",
          "Environmental Policy",
          "Carbon Accounting",
          "Sustainable Finance",
          "Corporate Social Responsibility",
          "Green Business Models"
        ]
      },
      {
        institution: "Copenhagen Business School",
        degree: "Summer School in Sustainability",
        period: "Jul 2024 - Aug 2024",
        location: "Copenhagen, Denmark",
        status: "Terminé",
        cycle: "Programme d'été",
        specialisation: "Sustainable Business",
        studyMode: "Intensif",
        hasYearPages: false,
        modules: [
          "Nordic Model of Sustainability",
          "Green Energy Transition",
          "Sustainable Supply Chains",
          "Impact Measurement",
          "Sustainability Reporting Standards",
          "Circular Design Principles"
        ]
      },
      {
        institution: "Sciences Po Paris",
        degree: "Bachelor Sciences Sociales",
        period: "Sep 2020 - Jun 2023",
        location: "Paris, France",
        gpa: "17.6/20",
        status: "Terminé",
        cycle: "Bachelor",
        specialisation: "Économie et Société",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Économie Politique",
          "Sociologie",
          "Science Politique",
          "Histoire Contemporaine",
          "Méthodes Quantitatives",
          "Enjeux Environnementaux",
          "Relations Internationales",
          "Anthropologie"
        ]
      }
    ],
    workExperience: [
      {
        position: "Sustainability Consultant Intern",
        company: "EY",
        period: "Jun 2024 - Aug 2024",
        location: "Paris, France",
        description: "As a Sustainability Consultant Intern at **EY** (Ernst & Young), I advised multinational clients on **ESG strategy development** and **sustainability reporting** aligned with emerging **EU regulations** including the **EU Taxonomy** and **Corporate Sustainability Reporting Directive (CSRD)**. My work involved conducting comprehensive **ESG assessments**, identifying **materiality issues**, benchmarking against industry peers, and developing actionable recommendations to improve clients' sustainability performance. I supported clients in preparing for new reporting requirements by analyzing existing data collection processes, identifying gaps, and designing frameworks for comprehensive **non-financial reporting**. The role required deep understanding of **sustainability frameworks** (GRI, SASB, TCFD), **EU regulations**, and industry-specific ESG risks and opportunities. I collaborated with multidisciplinary teams including auditors, strategists, and technical specialists to deliver integrated advisory services. This experience provided exposure to the rapidly evolving field of **corporate sustainability** and the critical role of regulation in driving business transformation.",
        achievements: [
          "Delivered 3 comprehensive ESG assessments for clients in manufacturing, retail, and financial services",
          "Contributed to CSRD compliance project for major European bank with €500B+ assets",
          "Developed ESG data collection framework adopted as internal best practice",
          "Presented sustainability strategy recommendations to C-suite executives"
        ],
        status: "Terminé"
      },
      {
        position: "Climate Policy Researcher",
        company: "Sciences Po Research Center",
        period: "Sep 2023 - Présent",
        location: "Paris, France",
        description: "Working as a **Climate Policy Researcher** at the **Sciences Po Research Center**, contributing to academic research on **climate policy**, **carbon pricing mechanisms**, and **just transition** strategies. My work focuses on analyzing the effectiveness of various policy instruments in driving decarbonization while ensuring social equity. I conduct **literature reviews**, collect and analyze policy data from multiple countries, perform **comparative policy analysis**, and contribute to research papers and policy briefs. The research involves examining **emissions trading systems**, **carbon taxes**, **green industrial policy**, and mechanisms for supporting workers and communities affected by the transition. I collaborate with professors, PhD students, and policy practitioners, attending conferences and workshops to stay current with latest developments. This ongoing research position is developing my analytical capabilities, academic writing skills, and deep expertise in climate policy at a critical time for global climate action.",
        achievements: [
          "Co-authored research paper on EU carbon border adjustment mechanism under review",
          "Contributed to policy brief that informed French government's climate strategy",
          "Built comprehensive database of global carbon pricing policies across 50+ jurisdictions",
          "Presented research findings at international climate policy conference"
        ],
        status: "ongoing"
      }
    ],
    certifications: [
      { name: "GRI Sustainability Reporting", provider: "GRI", date: "June 2024" },
      { name: "Climate Change Professional", provider: "Climate Institute", date: "April 2024" }
    ],
    sports: [
      {
        name: "Randonnée",
        organization: "Club Alpin Français",
        period: "2019 - Présent",
        level: "Expérimenté",
        status: "En cours",
        description: "Passionate hiker since 2019, completing numerous mountain treks across French Alps and Pyrenees. Hiking fosters **environmental awareness**, **endurance**, and **appreciation for nature**. Long treks require careful planning, resource management, and respect for the environment—values central to sustainability work.",
        keyLearning: [
          "Deepened **environmental consciousness** through direct connection with natural landscapes.",
          "Developed **endurance and determination** by completing challenging multi-day treks.",
          "Enhanced **planning and preparation** skills for safe mountain expeditions.",
          "Cultivated **minimalist mindset** by carrying only essential equipment.",
          "Learned **respect for nature** and importance of leave-no-trace principles."
        ],
        achievements: [
          "Completed Tour du Mont Blanc (170km)",
          "Summited Mont Blanc (4,808m) in 2023",
          "Trekked GR20 in Corsica"
        ]
      }
    ],
    bio: "Sustainability consultant dedicated to helping organizations transition to net-zero through strategic ESG integration and climate action."
  },
  {
    id: 8,
    name: "Hugo Lambert",
    initials: "HL",
    role: "Data Science Student",
    program: "MSc Data Science",
    university: "AES Business School",
    graduationYear: "2025",
    email: "hugo.lambert@telecom-paris.fr",
    linkedin: "https://www.linkedin.com/in/hugolambert",
    portfolio: "https://hugolambert.github.io",
    phone: "07559 890123",
    birthdate: "30/10/2003",
    color: "from-cyan-500 to-cyan-700",
    profilePhoto: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      { name: "Python", level: 95 },
      { name: "Deep Learning", level: 90 },
      { name: "NLP", level: 88 },
      { name: "Big Data", level: 85 }
    ],
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Courant" },
      { name: "Japonais", level: "Notions" }
    ],
    projects: [
      {
        name: "Sentiment Analysis Engine",
        organization: "Télécom Paris",
        description: "Built a sophisticated **transformer-based NLP model** for **multilingual sentiment analysis** supporting **8 languages** and achieving **state-of-the-art results** with **92% accuracy** on benchmark datasets. This advanced project involved fine-tuning **BERT** and **XLM-RoBERTa** models on domain-specific data, implementing **transfer learning** strategies, and deploying the model as a **REST API** using **FastAPI**. The system processes **1000+ texts per second** and provides detailed sentiment scores (positive, negative, neutral) with confidence levels. Successfully deployed to production serving **50K+ daily requests**.",
        period: "Jan 2024 - May 2024",
        keyLearning: [
          "Mastered **transformer architectures** including self-attention mechanisms, multi-head attention, and positional encodings.",
          "Developed expertise in **transfer learning** by fine-tuning pre-trained models on custom datasets.",
          "Enhanced **PyTorch** skills by implementing custom training loops, loss functions, and evaluation metrics.",
          "Gained proficiency in **model deployment** using FastAPI, Docker, and cloud services for scalable inference.",
          "Improved **multilingual NLP** understanding by handling tokenization, encoding, and linguistic variations across languages.",
          "Learned to optimize **inference speed** through batching, caching, and model quantization techniques."
        ],
        skills: ["PyTorch", "BERT", "FastAPI", "NLP", "Transfer Learning", "Model Deployment"],
        status: "Terminé"
      },
      {
        name: "Question Answering System",
        organization: "Télécom Paris",
        description: "Developed an intelligent **question answering system** using **retrieval-augmented generation (RAG)** that combines document retrieval with generative models to provide accurate, contextual answers. The system indexes a large corpus of technical documentation using **vector embeddings**, retrieves relevant passages using **semantic search**, and generates natural language answers using **GPT-3**. Achieved **85% answer accuracy** on technical support questions, significantly reducing response time from hours to seconds.",
        period: "Sep 2023 - Dec 2023",
        keyLearning: [
          "Gained expertise in **retrieval-augmented generation** architectures combining retrieval and generation.",
          "Developed proficiency in **vector embeddings** and semantic search using FAISS and Pinecone.",
          "Enhanced understanding of **prompt engineering** techniques for optimizing generative model outputs.",
          "Improved **information retrieval** skills by implementing BM25, TF-IDF, and dense retrieval methods.",
          "Learned to evaluate **QA systems** using metrics like EM, F1, BLEU, and human evaluation.",
          "Strengthened **system integration** abilities by building end-to-end pipelines from documents to answers."
        ],
        skills: ["RAG", "Vector Embeddings", "GPT-3", "Information Retrieval", "Python", "Semantic Search"],
        status: "Terminé"
      }
    ],
    education: [
      {
        institution: "Télécom Paris",
        degree: "MSc Data Science",
        period: "Sep 2023 - Jun 2025",
        location: "Paris, France",
        gpa: "18.1/20",
        status: "En cours",
        cycle: "Master",
        specialisation: "Natural Language Processing",
        mineure: "Deep Learning",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Natural Language Processing",
          "Deep Learning",
          "Machine Learning",
          "Big Data Analytics",
          "Statistical Learning",
          "Neural Networks",
          "Text Mining",
          "Computer Vision"
        ]
      },
      {
        institution: "MIT",
        degree: "Deep Learning Specialization",
        period: "Jan 2024 - Mar 2024",
        location: "Online (MIT)",
        status: "Terminé",
        cycle: "Certification en ligne",
        specialisation: "Deep Learning",
        studyMode: "À distance",
        hasYearPages: false,
        modules: [
          "Neural Networks Fundamentals",
          "Convolutional Neural Networks",
          "Sequence Models",
          "Transformers Architecture",
          "Optimization Algorithms",
          "Regularization Techniques"
        ]
      },
      {
        institution: "Télécom Paris",
        degree: "Diplôme d'Ingénieur",
        period: "Sep 2020 - Jun 2023",
        location: "Paris, France",
        gpa: "17.8/20",
        status: "Terminé",
        cycle: "Cycle Ingénieur",
        specialisation: "Informatique et Réseaux",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Algorithms & Data Structures",
          "Operating Systems",
          "Computer Networks",
          "Databases",
          "Software Engineering",
          "Artificial Intelligence",
          "Probability & Statistics",
          "Signal Processing"
        ]
      }
    ],
    workExperience: [
      {
        position: "Data Scientist Intern",
        company: "Meta",
        period: "Jun 2024 - Aug 2024",
        location: "Paris, France",
        description: "As a Data Scientist Intern at **Meta** (formerly Facebook), I worked on the **Trust & Safety team** developing **machine learning models** for **content moderation** and **hate speech detection** across multiple languages. My project focused on improving the accuracy and fairness of automated systems that protect users from harmful content while minimizing false positives that could restrict legitimate expression. I worked with massive multilingual datasets, implemented **transformer-based NLP models**, conducted extensive **model evaluation** including fairness metrics across different demographic groups, and collaborated with policy teams to ensure technical solutions aligned with community standards. The role involved using **PyTorch**, **Python**, and Meta's internal ML infrastructure to train, evaluate, and deploy models at scale. I participated in team meetings discussing the complex ethical considerations in content moderation and learned about the challenges of building AI systems that operate fairly across diverse cultures and languages. This experience provided unique insights into applied AI at one of the world's largest tech platforms.",
        achievements: [
          "Improved hate speech detection accuracy by 15% while maintaining precision",
          "Reduced false positive rate by 20% through better handling of linguistic nuance",
          "Extended model to support 5 additional languages with comparable performance",
          "Documented best practices for multilingual model evaluation adopted by team"
        ],
        status: "Terminé"
      },
      {
        position: "Machine Learning Engineer",
        company: "AI Research Lab",
        period: "Jan 2024 - Présent",
        location: "Paris, France",
        description: "Working as a **Machine Learning Engineer** at an **AI Research Lab** within **Télécom Paris**, focusing on developing practical applications of cutting-edge AI research. I bridge the gap between research prototypes and production systems, implementing state-of-the-art algorithms, optimizing model performance, and deploying ML models to real-world applications. My work involves experimenting with new architectures from recent papers, conducting ablation studies to understand what drives performance, and engineering solutions that make research ideas practical and scalable. I work on projects spanning **computer vision**, **natural language processing**, and **reinforcement learning**, using frameworks like **PyTorch**, **TensorFlow**, and **JAX**. The role requires staying current with latest AI research, reproducing paper results, and collaborating with researchers to translate ideas into working systems. This position combines my passion for both research and engineering while contributing to projects that push the boundaries of what's possible with AI.",
        achievements: [
          "Implemented and deployed 4 research prototypes to production serving 10K+ users",
          "Optimized inference speed of vision models by 3x through quantization and pruning",
          "Built MLOps pipeline that reduced model deployment time from weeks to hours",
          "Published 2 technical blog posts explaining research implementations with 50K+ views"
        ],
        status: "ongoing"
      }
    ],
    certifications: [
      { name: "Deep Learning Specialization", provider: "deeplearning.ai", date: "May 2024" },
      { name: "Apache Spark Developer", provider: "Databricks", date: "March 2024" }
    ],
    sports: [
      {
        name: "Judo",
        club: "Judo Club Télécom Paris",
        period: "2015 - Présent",
        position: "Ceinture Noire 1er Dan",
        level: "National",
        status: "En cours",
        description: "Practicing judo since 2015, currently holding black belt (1st dan). Judo embodies principles of **respect**, **discipline**, and **continuous improvement** (kaizen). The martial art teaches how to use an opponent's force against them—a powerful metaphor for turning challenges into opportunities in data science.",
        keyLearning: [
          "Mastered **discipline and respect** through traditional Japanese martial arts training.",
          "Developed **strategic thinking** by analyzing opponents and adapting techniques.",
          "Enhanced **reflexes and reaction time** through intensive sparring practice.",
          "Cultivated **humility** by learning from defeats and celebrating others' victories.",
          "Embodied **continuous improvement** philosophy through progressive belt system."
        ],
        achievements: [
          "Black belt (1st dan) achieved in 2023",
          "Regional judo championship bronze medal",
          "Assistant instructor for beginner classes"
        ]
      }
    ],
    bio: "Data scientist specializing in NLP and deep learning with experience building production ML systems at scale."
  },
  {
    id: 9,
    name: "Chloé Petit",
    initials: "CP",
    role: "UX/UI Design Student",
    program: "Bachelor Design",
    university: "AES Business School",
    graduationYear: "2026",
    email: "chloe.petit@strate.design",
    linkedin: "https://www.linkedin.com/in/chloepetit",
    portfolio: "https://chloepetit.design",
    phone: "07560 901234",
    birthdate: "14/12/2004",
    color: "from-violet-500 to-violet-700",
    profilePhoto: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      { name: "Figma", level: 95 },
      { name: "UI Design", level: 92 },
      { name: "User Research", level: 88 },
      { name: "Prototyping", level: 90 }
    ],
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Courant" },
      { name: "Coréen", level: "Intermédiaire" }
    ],
    projects: [
      {
        name: "Banking App Redesign",
        organization: "Strate École de Design",
        description: "Redesigned a **mobile banking application** with strong focus on **accessibility** and **user experience** specifically for **elderly users aged 60+**. This human-centered design project involved extensive **user research** including interviews, usability testing, and co-design sessions with target users. Created **high-fidelity prototypes** in Figma incorporating **WCAG 2.1 AA standards**, larger touch targets, simplified navigation, and clear visual hierarchy. User testing showed **65% improvement** in task completion rates and **80% increase** in user satisfaction scores compared to the original design.",
        period: "Feb 2024 - Jun 2024",
        keyLearning: [
          "Mastered **inclusive design** principles for creating accessible digital experiences for diverse user groups.",
          "Developed expertise in **WCAG standards** including color contrast, text sizing, keyboard navigation, and screen reader compatibility.",
          "Enhanced **user research** skills through conducting interviews, usability tests, and analyzing behavioral data.",
          "Gained proficiency in **Figma** for creating design systems, components, auto-layout, and interactive prototypes.",
          "Improved **usability testing** abilities by developing test plans, facilitating sessions, and synthesizing findings.",
          "Learned importance of **empathy** in design by understanding cognitive and physical challenges faced by elderly users."
        ],
        skills: ["Figma", "User Research", "Accessibility", "Inclusive Design", "Usability Testing"],
        status: "Terminé"
      },
      {
        name: "Design System for SaaS Platform",
        organization: "Freelance Project",
        description: "Created a comprehensive **design system** for a growing SaaS platform to ensure consistency across **15+ product features** and enable **scalable design**. This systematic project involved auditing existing designs, establishing **design tokens**, creating **reusable components**, documenting **usage guidelines**, and building a **component library** in Figma. The design system includes **200+ components**, **color palette**, **typography scale**, **spacing system**, **iconography**, and **interaction patterns**. Reduced design-to-development time by **40%** and improved visual consistency across the product.",
        period: "Sep 2023 - Dec 2023",
        keyLearning: [
          "Gained expertise in **design systems** including atomic design methodology and component architecture.",
          "Developed proficiency in **design tokens** for maintaining consistent visual properties across platforms.",
          "Enhanced **documentation skills** by creating clear usage guidelines, dos and don'ts, and code examples.",
          "Improved **collaboration** with developers by using shared language and handoff tools like Zeplin.",
          "Learned to balance **flexibility and consistency** when creating reusable design components.",
          "Strengthened **systematic thinking** by organizing design decisions into logical, scalable frameworks."
        ],
        skills: ["Design Systems", "Figma", "Component Design", "Documentation", "UI Design"],
        status: "Terminé"
      }
    ],
    education: [
      {
        institution: "Strate École de Design",
        degree: "Bachelor Design",
        period: "Sep 2023 - Jun 2026",
        location: "Sèvres, France",
        gpa: "17.6/20",
        status: "En cours",
        cycle: "Bachelor",
        specialisation: "UX/UI Design",
        mineure: "Design Thinking",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "User Experience Design",
          "Interface Design",
          "Design Systems",
          "User Research Methods",
          "Prototyping & Wireframing",
          "Interaction Design",
          "Visual Design",
          "Accessibility Design"
        ]
      },
      {
        institution: "Hyper Island",
        degree: "Digital Design Bootcamp",
        period: "Jun 2024 - Aug 2024",
        location: "Stockholm, Sweden",
        status: "Terminé",
        cycle: "Bootcamp",
        specialisation: "Digital Product Design",
        studyMode: "Intensif",
        hasYearPages: false,
        modules: [
          "Design Sprint Methodology",
          "Rapid Prototyping",
          "Usability Testing",
          "Design for Mobile",
          "Animation & Micro-interactions",
          "Collaborative Design Tools"
        ]
      },
      {
        institution: "Lycée Pablo Picasso",
        degree: "Baccalauréat STD2A",
        period: "Jun 2023",
        location: "Paris, France",
        gpa: "18.2/20",
        status: "Terminé",
        mention: "Très Bien",
        specialisation: "Sciences et Technologies du Design et des Arts Appliqués",
        specificPath: "STD2A",
        bacType: "Baccalauréat Technologique",
        hasYearPages: false,
        modules: [
          "Design & Arts Appliqués",
          "Technologies",
          "Physique-Chimie",
          "Français-Philosophie",
          "Anglais",
          "Histoire-Géographie"
        ]
      }
    ],
    workExperience: [
      {
        position: "UX Designer Intern",
        company: "Airbnb",
        period: "Jun 2024 - Aug 2024",
        location: "Paris, France",
        description: "As a UX Designer Intern at **Airbnb**, I worked on the **Host Experience team** redesigning the **host onboarding flow** to make it easier and more intuitive for new hosts to list their properties. My process began with extensive **user research** including interviews with prospective hosts, usability testing of the existing flow, and analysis of drop-off points in the onboarding funnel. Based on insights, I designed new **user flows**, created **wireframes** and **high-fidelity mockups** in **Figma**, built **interactive prototypes** for testing, and collaborated with product managers and engineers to implement the design. I conducted multiple rounds of **usability testing** to validate design decisions and iterated based on feedback. The work involved applying **UX principles** including progressive disclosure, clear visual hierarchy, and helpful micro-copy. I also contributed to **design system documentation** and participated in weekly design critiques. This internship provided hands-on experience in **human-centered design** at a company known for exceptional user experience.",
        achievements: [
          "Improved onboarding completion rate by 25% through streamlined flow and clearer guidance",
          "Created comprehensive design system for host onboarding adopted by team",
          "Conducted 30+ user interviews and usability tests informing design decisions",
          "Designed responsive experience working across desktop, mobile, and tablet"
        ],
        status: "Terminé"
      },
      {
        position: "Freelance UX/UI Designer",
        company: "Multiple Clients",
        period: "Mar 2023 - Présent",
        location: "Remote",
        description: "Operating as a **Freelance UX/UI Designer** working with diverse clients ranging from early-stage startups to established companies looking to improve their digital products. My services span the complete **design process** from initial **user research** and **information architecture** through **visual design** and **design system creation**. I conduct discovery workshops with stakeholders, perform **competitive analysis**, create **user personas**, design **wireframes** and **prototypes**, and deliver production-ready **design specifications** for development teams. Projects have included **mobile apps**, **web applications**, **e-commerce platforms**, and **SaaS products** across various industries. Working independently has honed my client communication skills, project management abilities, and capacity to adapt to different design contexts and requirements. I maintain a portfolio of successful projects and continuously expand my client base through referrals and platform presence.",
        achievements: [
          "Completed 15+ successful projects with 100% client satisfaction ratings",
          "Designed mobile app that achieved 50K+ downloads within 3 months of launch",
          "Built design system for SaaS product serving 5K+ business users",
          "Generated steady income averaging €3K+ per month while studying full-time"
        ],
        status: "ongoing"
      }
    ],
    certifications: [
      { name: "Google UX Design Professional", provider: "Google", date: "July 2024" },
      { name: "Interaction Design Foundation", provider: "IxDF", date: "April 2024" }
    ],
    sports: [
      {
        name: "Danse Contemporaine",
        organization: "Studio de Danse Strate",
        period: "2017 - Présent",
        level: "Avancé",
        status: "En cours",
        description: "Contemporary dance practitioner since 2017, performing at advanced level. Dance cultivates **creativity**, **body awareness**, and **emotional expression**. The art form requires understanding space, movement, and rhythm—skills that translate directly to designing intuitive user interfaces and understanding user flow.",
        keyLearning: [
          "Enhanced **creative expression** through choreography and improvisation.",
          "Developed **spatial awareness** and understanding of movement and flow.",
          "Improved **body-mind connection** through controlled movements and expressions.",
          "Cultivated **collaboration skills** through group performances and ensemble work.",
          "Strengthened **confidence** in self-expression and public performance."
        ],
        achievements: [
          "Performed in 5 public contemporary dance shows",
          "Choreographed pieces for student productions",
          "Attended international dance workshop in Berlin"
        ]
      }
    ],
    bio: "UX/UI designer passionate about creating intuitive, accessible digital experiences through user-centered design and research-driven decisions."
  },
  {
    id: 10,
    name: "Maxime Girard",
    initials: "MG",
    role: "Cybersecurity Student",
    program: "MSc Cybersecurity",
    university: "AES Business School",
    graduationYear: "2025",
    email: "maxime.girard@epita.fr",
    linkedin: "https://www.linkedin.com/in/maximegirard",
    portfolio: "https://maximegirard.tech",
    phone: "07561 012345",
    birthdate: "25/02/2003",
    color: "from-slate-600 to-slate-800",
    profilePhoto: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      { name: "Penetration Testing", level: 90 },
      { name: "Network Security", level: 92 },
      { name: "Cryptography", level: 88 },
      { name: "Security Auditing", level: 85 }
    ],
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Courant" },
      { name: "Russe", level: "Notions" }
    ],
    projects: [
      {
        name: "Blockchain Security Analysis",
        organization: "EPITA",
        description: "Conducted comprehensive **security audit** of **smart contracts** on the **Ethereum blockchain**, identifying **12 critical vulnerabilities** including reentrancy attacks, integer overflows, and access control issues. This meticulous project involved **static analysis** using tools like Slither and Mythril, **dynamic testing** with fuzzing techniques, and **manual code review** of **5,000+ lines** of Solidity code. Provided detailed vulnerability reports with **proof-of-concept exploits**, risk ratings, and remediation recommendations. All identified issues were successfully patched before contract deployment, preventing potential losses of **$2M+ in assets**.",
        period: "Sep 2024 - Dec 2024",
        keyLearning: [
          "Mastered **smart contract auditing** methodologies including systematic review processes and testing frameworks.",
          "Developed deep understanding of **Solidity security** patterns and common vulnerabilities like reentrancy and front-running.",
          "Enhanced **blockchain security** knowledge by studying consensus mechanisms, transaction ordering, and MEV attacks.",
          "Gained proficiency in **security tools** including Slither, Mythril, Echidna, and custom fuzzing scripts.",
          "Improved **vulnerability assessment** skills by evaluating risk severity, exploitability, and business impact.",
          "Learned importance of **secure coding practices** and defense-in-depth strategies in blockchain development."
        ],
        skills: ["Solidity", "Security Testing", "Cryptography", "Smart Contract Auditing", "Blockchain Security"],
        status: "Terminé"
      },
      {
        name: "Penetration Testing Framework",
        organization: "EPITA",
        description: "Developed an automated **penetration testing framework** for web applications that systematically identifies common vulnerabilities including **SQL injection**, **XSS**, **CSRF**, and **authentication bypasses**. The framework combines **automated scanning** with **intelligent fuzzing** and generates comprehensive reports with remediation guidance. Successfully tested on **20+ applications**, discovering **150+ vulnerabilities** and achieving **95% detection rate** compared to manual testing. Released as **open-source tool** with **500+ GitHub stars**.",
        period: "Jan 2024 - May 2024",
        keyLearning: [
          "Gained expertise in **penetration testing** methodologies including reconnaissance, scanning, exploitation, and reporting.",
          "Developed proficiency in **web security** vulnerabilities and OWASP Top 10 exploitation techniques.",
          "Enhanced **Python** skills by building robust, extensible security tools with custom modules and plugins.",
          "Improved **automation** abilities by creating intelligent scanning algorithms and payload generation.",
          "Learned about **responsible disclosure** and ethical considerations in security research.",
          "Strengthened **technical writing** skills by documenting vulnerabilities clearly for both technical and non-technical audiences."
        ],
        skills: ["Penetration Testing", "Python", "Web Security", "OWASP", "Security Tools Development"],
        status: "Terminé"
      }
    ],
    education: [
      {
        institution: "EPITA",
        degree: "MSc Cybersecurity",
        period: "Sep 2023 - Jun 2025",
        location: "Kremlin-Bicêtre, France",
        gpa: "18.3/20",
        status: "En cours",
        cycle: "Master",
        specialisation: "Offensive Security",
        mineure: "Network Security",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "Penetration Testing",
          "Web Application Security",
          "Network Security",
          "Cryptography",
          "Malware Analysis",
          "Reverse Engineering",
          "Digital Forensics",
          "Security Auditing"
        ]
      },
      {
        institution: "SANS Institute",
        degree: "GIAC Security Certifications",
        period: "Jan 2024 - Jun 2024",
        location: "Online",
        status: "Terminé",
        cycle: "Certifications professionnelles",
        specialisation: "Advanced Penetration Testing",
        studyMode: "À distance",
        hasYearPages: false,
        modules: [
          "Advanced Penetration Testing",
          "Web App Penetration Testing",
          "Exploit Development",
          "Red Team Operations",
          "Threat Intelligence",
          "Incident Response"
        ]
      },
      {
        institution: "EPITA",
        degree: "Diplôme d'Ingénieur",
        period: "Sep 2020 - Jun 2023",
        location: "Kremlin-Bicêtre, France",
        gpa: "18.0/20",
        status: "Terminé",
        cycle: "Cycle Ingénieur",
        specialisation: "Informatique et Sécurité",
        studyMode: "Temps plein",
        hasYearPages: false,
        modules: [
          "System Administration",
          "Network Architecture",
          "Operating Systems Security",
          "Programming (C, Python, Java)",
          "Algorithms",
          "Database Security",
          "Web Technologies",
          "Software Engineering"
        ]
      }
    ],
    workExperience: [
      {
        position: "Security Analyst Intern",
        company: "Thales",
        period: "Jun 2024 - Aug 2024",
        location: "Paris, France",
        description: "As a Security Analyst Intern at **Thales**, a global leader in **defense** and **aerospace** technology, I performed **penetration testing** and comprehensive **security assessments** for critical systems serving government and military clients. My work involved conducting **vulnerability assessments**, **network penetration tests**, **application security reviews**, and **social engineering simulations** following industry-standard methodologies including **OWASP** and **NIST** frameworks. I used a variety of security tools including **Metasploit**, **Burp Suite**, **Nmap**, **Wireshark**, and custom scripts to identify security weaknesses. Each assessment concluded with detailed reports documenting findings, assigning risk ratings, providing technical details of vulnerabilities, and recommending specific remediation actions. Given the sensitive nature of defense clients, the role required strict adherence to security clearance protocols and confidentiality agreements. This experience provided exposure to **enterprise security** practices and the unique challenges of securing critical infrastructure.",
        achievements: [
          "Identified 25+ critical vulnerabilities across multiple client systems",
          "Developed Python automation tools that reduced testing time by 40%",
          "Created standardized reporting templates adopted across security team",
          "Received commendation for thorough analysis and clear communication of findings"
        ],
        status: "Terminé"
      },
      {
        position: "Bug Bounty Hunter",
        company: "HackerOne Platform",
        period: "Aug 2022 - Présent",
        location: "Remote",
        description: "Active as a **Bug Bounty Hunter** on the **HackerOne platform**, identifying and reporting security vulnerabilities in web applications and systems of participating companies. I conduct **security research** on a wide range of targets including major tech companies, financial institutions, and SaaS platforms, looking for vulnerabilities such as **SQL injection**, **XSS**, **authentication bypasses**, **authorization flaws**, and **business logic issues**. The work involves understanding application functionality, thinking creatively about potential attack vectors, methodically testing security controls, and documenting findings with clear reproduction steps and impact assessment. Successful reports result in bounties ranging from hundreds to thousands of euros depending on severity. This ongoing activity keeps my offensive security skills sharp, exposes me to diverse technologies and architectures, and provides both intellectual challenge and financial rewards. It's also built my reputation in the cybersecurity community.",
        achievements: [
          "Earned €15K+ in bounties across 50+ successful vulnerability reports",
          "Achieved reputation ranking in top 5% of HackerOne platform researchers",
          "Discovered critical authentication bypass vulnerability for major tech company",
          "Published security research blog posts helping other researchers learn techniques"
        ],
        status: "ongoing"
      }
    ],
    certifications: [
      { name: "CEH (Certified Ethical Hacker)", provider: "EC-Council", date: "June 2024" },
      { name: "CompTIA Security+", provider: "CompTIA", date: "March 2024" }
    ],
    sports: [
      {
        name: "Échecs",
        organization: "Fédération Française des Échecs",
        period: "2014 - Présent",
        level: "ELO 1850",
        status: "En cours",
        description: "Competitive chess player since 2014 with current ELO rating of 1850. Chess is the ultimate mental sport, requiring **strategic planning**, **pattern recognition**, and **anticipation**—skills directly applicable to cybersecurity where predicting attacker moves and planning defensive strategies is crucial.",
        keyLearning: [
          "Mastered **strategic thinking** by planning multiple moves ahead and anticipating consequences.",
          "Enhanced **pattern recognition** through studying classic games and tactical motifs.",
          "Developed **analytical skills** by analyzing positions and evaluating trade-offs.",
          "Improved **decision-making under pressure** during timed tournament games.",
          "Cultivated **patience and focus** required for long, complex games."
        ],
        achievements: [
          "Achieved ELO rating of 1850",
          "Won regional rapid chess tournament 2023",
          "Participated in 30+ rated tournaments"
        ]
      }
    ],
    bio: "Ethical hacker and cybersecurity professional focused on offensive security, penetration testing, and securing critical infrastructure."
  },
  {
    id: 11,
    name: "Alex Smith",
    initials: "AS",
    role: "Business Management Student",
    program: "Bachelor in Management",
    university: "AES Business School",
    graduationYear: "2026",
    email: "alex.smith@aes.edu",
    linkedin: "https://www.linkedin.com/in/alexsmith2005",
    portfolio: "https://Alex.portfolio.com",
    phone: "07551 541758",
    birthdate: "05/06/2005",
    color: "from-blue-500 to-blue-700",
    profilePhoto: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    skills: [
      { name: "Analyse Stratégique", level: 90 },
      { name: "Gestion de Projet", level: 85 },
      { name: "Commerce International", level: 88 },
      { name: "Marketing Digital", level: 75 },
      { name: "Analyse de Données", level: 70 },
      { name: "Prise de Parole en Public", level: 80 }
    ],
    languages: [
      { name: "Français", level: "Langue maternelle" },
      { name: "Anglais", level: "Courant" },
      { name: "Espagnol", level: "Intermédiaire" },
      { name: "Allemand", level: "Notions" }
    ],
    projects: [
      {
        name: "International Market Entry Strategy",
        organization: "AES Business School",
        description: "Led a team of **5 students** to develop a comprehensive **market entry strategy** for a French company expanding to **Asian markets**. This project involved extensive research into **cultural differences**, **regulatory environments**, and **competitive landscapes** across multiple Asian countries. Our team conducted **SWOT analysis**, **Porter's Five Forces analysis**, and **financial modeling** to evaluate different entry modes including **joint ventures**, **strategic alliances**, and **wholly-owned subsidiaries**. We presented our findings to a panel of professors and industry professionals, demonstrating our ability to think strategically about **international expansion** challenges.",
        period: "Jan 2024 - May 2024",
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
        description: "Since 2015, I have been organizing and managing **local chess tournaments** in my community, growing the initiative from small gatherings of 10-15 players to larger events attracting over **50 participants**. This long-term personal project involves **event planning**, **logistics coordination**, **sponsor outreach**, and **community engagement**. I handle everything from **venue booking** and **equipment management** to **tournament software** and **results publication**. The tournaments have become a regular fixture in the local chess community, fostering **competitive play**, **skill development**, and **social connections** among players of all ages and levels.",
        period: "2015 - Présent",
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
    ],
    education: [
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
        modules: [
          "Introduction to Business Strategy",
          "Financial Accounting Fundamentals",
          "Marketing Principles",
          "Organizational Behavior",
          "Business Statistics",
          "Microeconomics",
          "Communication Skills",
          "Business Ethics",
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
    ],
    workExperience: [
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
    ],
    certifications: [
      {
        name: "Google Analytics Certified",
        provider: "Google",
        date: "March 2024"
      },
      {
        name: "Project Management Fundamentals",
        provider: "LinkedIn Learning",
        date: "January 2024"
      }
    ],
    sports: [
      {
        name: "Échecs",
        organization: "Club d'Échecs de Paris",
        period: "2015 - Présent",
        position: "Organisateur de Tournois",
        level: "Avancé",
        status: "En cours",
        description: "Passionate chess player and tournament organizer. I've been playing competitive chess since 2015 and have organized numerous local tournaments that bring the community together. Chess has taught me **strategic thinking**, **pattern recognition**, **patience**, and the ability to plan several moves ahead. These skills directly translate to business strategy and problem-solving in professional contexts.",
        keyLearning: [
          "Developed **strategic thinking** through analyzing complex positions and planning multi-move sequences.",
          "Enhanced **decision-making under pressure** during timed tournament games with limited time to evaluate options.",
          "Improved **pattern recognition** by studying classic games and identifying recurring tactical and positional themes.",
          "Cultivated **patience and discipline** required for long games requiring sustained concentration and careful evaluation.",
          "Strengthened **analytical skills** by post-game analysis, identifying mistakes and learning from both victories and defeats.",
          "Built **resilience** by learning to handle losses constructively and maintain composure in competitive situations."
        ],
        achievements: [
          "Organized over 20 successful local chess tournaments since 2015",
          "Grew tournament participation from 15 to over 50 regular players",
          "Established partnerships with local chess clubs and community centers",
          "Managed tournament budgets and secured sponsorships from local businesses"
        ]
      }
    ],
    bio: "Passionate business student with a focus on international markets and digital transformation. Currently pursuing a Bachelor's degree at AES Business School with hands-on experience in strategic analysis and project management."
  }
];
