
import { useEffect, useMemo, useState } from "react";
import {
  GraduationCap,
  House,
  Bot,
  BookOpen,
  FileText,
  CircleHelp,
  ClipboardCheck,
  ClipboardList,
  CalendarDays,
  ChartNoAxesColumn,
  Users,
  Wrench,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  Sparkles,
  Plus,
  Check,
  ArrowRight,
  Code2,
  Cpu,
  Network,
  Database,
  Sigma,
  Brain,
  Lightbulb,
  Rocket,
  Send,
  Trash2,
  CalendarCheck,
  Trophy,
  ChevronRight,
  MessageCircle,
  BookMarked,
} from "lucide-react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Java - Arrays & Strings",
    subtitle: "Java practice",
    duration: "1h",
    icon: Code2,
    color: "java",
    done: true,
  },
  {
    id: 2,
    title: "DBMS - SQL Practice",
    subtitle: "Queries and joins",
    duration: "1h",
    icon: Database,
    color: "dbms",
    done: false,
  },
  {
    id: 3,
    title: "Computer Architecture",
    subtitle: "Processor fundamentals",
    duration: "1h",
    icon: Cpu,
    color: "architecture",
    done: false,
  },
  {
    id: 4,
    title: "Theory of Computation",
    subtitle: "Finite automata",
    duration: "45m",
    icon: Network,
    color: "theory",
    done: false,
  },
];


const questionBankData = [
  { id: 1, subject: "Java", level: "Beginner", question: "Which keyword is used to inherit a class in Java?", options: ["implements", "extends", "inherits", "super"], answer: "extends", explanation: "A class uses extends to inherit fields and methods from another class." },
  { id: 2, subject: "Java", level: "Beginner", question: "Which index does the first element of a Java array use?", options: ["0", "1", "-1", "Depends on the array"], answer: "0", explanation: "Java arrays are zero-indexed, so the first element is at index 0." },
  { id: 3, subject: "Java", level: "Intermediate", question: "Which type stores true or false in Java?", options: ["int", "String", "boolean", "char"], answer: "boolean", explanation: "The boolean type stores one of two values: true or false." },
  { id: 4, subject: "DBMS", level: "Beginner", question: "Which SQL command retrieves rows from a table?", options: ["GET", "SELECT", "OPEN", "FETCH TABLE"], answer: "SELECT", explanation: "SELECT reads data from one or more database tables." },
  { id: 5, subject: "DBMS", level: "Intermediate", question: "Which key uniquely identifies each row in a table?", options: ["Foreign key", "Candidate label", "Primary key", "Duplicate key"], answer: "Primary key", explanation: "A primary key uniquely identifies each record and cannot contain NULL values." },
  { id: 6, subject: "DBMS", level: "Intermediate", question: "What does an INNER JOIN return?", options: ["All rows from the left table", "Only matching rows from both tables", "All rows from both tables regardless of match", "Only duplicate columns"], answer: "Only matching rows from both tables", explanation: "INNER JOIN returns rows where the join condition matches in both tables." },
  { id: 7, subject: "Computer Architecture", level: "Beginner", question: "Which CPU component performs arithmetic and logical operations?", options: ["Control Unit", "ALU", "RAM", "Program Counter"], answer: "ALU", explanation: "The Arithmetic Logic Unit (ALU) performs arithmetic calculations and logical comparisons." },
  { id: 8, subject: "Computer Architecture", level: "Beginner", question: "What does RAM primarily provide?", options: ["Permanent file storage", "Temporary working memory", "Internet access", "Power regulation"], answer: "Temporary working memory", explanation: "RAM holds data and instructions currently needed by running programs; it is volatile." },
  { id: 9, subject: "Theory of Computation", level: "Beginner", question: "What does DFA stand for?", options: ["Direct Function Algorithm", "Deterministic Finite Automaton", "Data Flow Array", "Digital Formal Arithmetic"], answer: "Deterministic Finite Automaton", explanation: "A DFA is a finite-state machine with exactly one transition for each state and input symbol." },
  { id: 10, subject: "Theory of Computation", level: "Intermediate", question: "A finite automaton recognizes which class of languages?", options: ["Regular languages", "All languages", "Only context-sensitive languages", "Only natural languages"], answer: "Regular languages", explanation: "Finite automata recognize regular languages." },
  { id: 11, subject: "Linear Algebra", level: "Beginner", question: "What is the identity matrix on its main diagonal?", options: ["All zeros", "All ones with other entries zero", "All negative ones", "Any random values"], answer: "Ones with other entries zero", explanation: "An identity matrix has 1s on the main diagonal and 0s elsewhere." },
  { id: 12, subject: "Linear Algebra", level: "Intermediate", question: "For a square matrix, when is it singular?", options: ["When determinant is zero", "When determinant is one", "When all entries are positive", "When it is diagonal"], answer: "When determinant is zero", explanation: "A square matrix is singular if its determinant is 0, so it has no inverse." },
];

const navigation = [
  { label: "Dashboard", icon: House },
  { label: "AI Tutor", icon: Bot },
  { label: "Subjects", icon: BookOpen },
  { label: "Notes", icon: FileText },
  { label: "Question Bank", icon: CircleHelp },
  { label: "Practice Test", icon: ClipboardCheck },
  { label: "Assignments", icon: ClipboardList },
  { label: "Study Plan", icon: CalendarDays },
  { label: "Progress", icon: ChartNoAxesColumn },
  { label: "Community", icon: Users },
  { label: "Tools", icon: Wrench },
  { label: "Settings", icon: Settings },
];

const subjects = [
  { title: "Java", icon: Code2, color: "java" },
  {
    title: "Computer Architecture",
    icon: Cpu,
    color: "architecture",
  },
  {
    title: "Theory of Computation",
    icon: Network,
    color: "theory",
  },
  { title: "DBMS", icon: Database, color: "dbms" },
  { title: "Linear Algebra", icon: Sigma, color: "algebra" },
  { title: "MIPS & Computer Org", icon: Brain, color: "mips" },
  { title: "Management", icon: Users, color: "management" },
];

const tools = [
  {
    title: "AI Notes Generator",
    description: "Turn your ideas into organized notes with AI.",
    button: "Generate",
    icon: FileText,
    color: "notes",
    page: "Notes",
  },
  {
    title: "Question Solver",
    description: "Get step-by-step explanations for any question.",
    button: "Solve",
    icon: Lightbulb,
    color: "solver",
    page: "AI Tutor",
  },
  {
    title: "Assignment Help",
    description: "Get structured content with diagrams and examples.",
    button: "Create",
    icon: ClipboardList,
    color: "assignment",
    page: "Assignments",
  },
  {
    title: "Practice Test",
    description: "Use quick tests and check your results.",
    button: "Start",
    icon: ChartNoAxesColumn,
    color: "practice",
    page: "Practice Test",
  },
  {
    title: "Project Ideas",
    description: "Hackathons and mini projects for real-world learning.",
    button: "Explore",
    icon: Rocket,
    color: "projects",
    page: "Tools",
  },
];

const weeklyHours = [
  { day: "MON", height: 48 },
  { day: "TUE", height: 72 },
  { day: "WED", height: 58 },
  { day: "THU", height: 88 },
  { day: "FRI", height: 63 },
  { day: "SAT", height: 96 },
  { day: "SUN", height: 42 },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("studyverse-tasks"));
      if (!Array.isArray(savedTasks)) return initialTasks;

      const iconByColor = {
        java: Code2,
        dbms: Database,
        architecture: Cpu,
        theory: Network,
        mips: BookOpen,
      };

      return savedTasks.map((task) => ({
        ...task,
        icon: iconByColor[task.color] || BookOpen,
      }));
    } catch {
      return initialTasks;
    }
  });
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = JSON.parse(localStorage.getItem("studyverse-notes"));
      return Array.isArray(savedNotes) ? savedNotes : [];
    } catch {
      return [];
    }
  });
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [bankSubject, setBankSubject] = useState("All Subjects");
  const [bankSearch, setBankSearch] = useState("");
  const [revealedAnswers, setRevealedAnswers] = useState([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testAnswers, setTestAnswers] = useState({});
  const [testFinished, setTestFinished] = useState(false);
  const [testSubject, setTestSubject] = useState("All Subjects");
  const [testCount, setTestCount] = useState("5");

  useEffect(() => {
    try {
      // React icon components are functions, so save only plain task data.
      const tasksToSave = tasks.map(({ icon, ...task }) => task);
      localStorage.setItem("studyverse-tasks", JSON.stringify(tasksToSave));
    } catch (error) {
      console.error("Could not save StudyVerse tasks:", error);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem("studyverse-notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Could not save StudyVerse notes:", error);
    }
  }, [notes]);

  const completedTasks = tasks.filter((task) => task.done).length;

  const completion = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  const filteredTasks = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return tasks;

    return tasks.filter((task) =>
      `${task.title} ${task.subtitle}`.toLowerCase().includes(term)
    );
  }, [tasks, search]);

  function changePage(page) {
    setActivePage(page);
    setMobileOpen(false);
    setSearch("");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function addTask(event) {
    event.preventDefault();

    if (!newTask.trim()) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: newTask.trim(),
        subtitle: "Personal study task",
        duration: "30m",
        icon: BookOpen,
        color: "mips",
        done: false,
      },
    ]);

    setNewTask("");
    setShowTaskForm(false);
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function saveNote(event) {
    event.preventDefault();

    if (!noteTitle.trim() || !noteContent.trim()) return;

    setNotes((current) => [
      {
        id: Date.now(),
        title: noteTitle.trim(),
        content: noteContent.trim(),
      },
      ...current,
    ]);

    setNoteTitle("");
    setNoteContent("");
  }

  function askTutor(event) {
    event.preventDefault();

    const topic = question.trim();
    if (!topic) return;

    const normalizedTopic = topic.toLowerCase();
    let explanation = "Start by writing the meaning of the topic in your own words. Then identify its main parts and explain how they work together.";
    let example = `For “${topic}”, write one simple real-world or classroom example and explain why it fits the topic.`;
    let practice = `Can you explain “${topic}” in two sentences without looking at your notes?`;

    if (normalizedTopic.includes("array") || normalizedTopic.includes("java")) {
      explanation = "In Java, an array stores multiple values of the same data type under one variable name. Each value has an index, and indexing starts at 0.";
      example = "Example: int[] marks = {80, 75, 90}; System.out.println(marks[0]); prints 80 because the first element is at index 0.";
      practice = "Try creating an array of five numbers and print the first and last elements.";
    } else if (normalizedTopic.includes("sql") || normalizedTopic.includes("join") || normalizedTopic.includes("dbms")) {
      explanation = "A database join combines related rows from two tables using a matching column. INNER JOIN returns matching rows; LEFT JOIN keeps every row from the left table and adds matching data when available.";
      example = "Example: join Students and Marks tables using student_id to display each student's name alongside their marks.";
      practice = "When would you choose LEFT JOIN instead of INNER JOIN? Explain with two small tables.";
    } else if (normalizedTopic.includes("exam") || normalizedTopic.includes("revision")) {
      explanation = "Use active recall instead of only rereading. Break the syllabus into small topics, practise questions without notes, and review mistakes.";
      example = "Study for 25 minutes, take a 5-minute break, then spend 5 minutes recalling the key points from memory.";
      practice = "Choose one topic now and write three questions that could appear in your exam.";
    } else if (normalizedTopic.includes("automata") || normalizedTopic.includes("theory of computation") || normalizedTopic.includes("toc")) {
      explanation = "Theory of Computation studies abstract machines and the problems they can solve. A finite automaton reads an input string one symbol at a time and changes state according to its transition rules.";
      example = "A DFA that accepts binary strings ending in 1 can use states to remember whether the most recently read symbol was 1.";
      practice = "Draw a two-state DFA that accepts binary strings ending in 1, and test it with 101 and 100.";
    } else if (normalizedTopic.includes("computer architecture") || normalizedTopic.includes("processor") || normalizedTopic.includes("cpu")) {
      explanation = "Computer architecture describes how a computer's CPU, memory, registers, and input/output components are organized and how they work together to execute instructions.";
      example = "A simple instruction cycle is fetch the instruction, decode it, execute it, and store or write back the result.";
      practice = "Explain the fetch-decode-execute cycle in your own words and give one instruction example.";
    }

    setAnswer(
      `TOPIC\n${topic}\n\n` +
      `EXPLANATION\n${explanation}\n\n` +
      `EXAMPLE\n${example}\n\n` +
      `PRACTICE\n${practice}\n\n` +
      "Note: These are built-in study examples, not live AI-generated answers. Connect an AI API to get dynamic responses."
    );
  }

  function renderTask(task, index) {
    const Icon = task.icon;

    return (
      <div
        className={`task-item ${task.done ? "task-done" : ""}`}
        key={task.id}
      >
        <button
          className={`task-check ${task.done ? "checked" : ""}`}
          aria-label={`Toggle ${task.title}`}
          onClick={() => toggleTask(task.id)}
        >
          {task.done ? <Check size={15} /> : index + 1}
        </button>

        <div className={`subject-icon ${task.color}`}>
          <Icon size={19} />
        </div>

        <div className="task-info">
          <strong>{task.title}</strong>
          <span>{task.subtitle}</span>
        </div>

        <span className="task-duration">{task.duration}</span>

        <button
          className="delete-task"
          title="Delete task"
          aria-label={`Delete ${task.title}`}
          onClick={() => deleteTask(task.id)}
        >
          <Trash2 size={14} />
        </button>
      </div>
    );
  }

  function renderSubject(subject) {
    const Icon = subject.icon;

    return (
      <button
        key={subject.title}
        className={`subject-card ${subject.color}`}
        onClick={() => {
          setQuestion(`Help me study ${subject.title}`);
          setAnswer("");
          changePage("AI Tutor");
        }}
      >
        <Icon size={29} />
        <span>{subject.title}</span>
        <ArrowRight className="subject-arrow" size={16} />
      </button>
    );
  }

  function renderWeeklyChart() {
    return (
      <div className="weekly-chart">
        {weeklyHours.map((item) => (
          <div className="bar-column" key={item.day}>
            <div className="bar-track">
              <span style={{ height: `${item.height}%` }} />
            </div>
            <small>{item.day}</small>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="app-shell">
      {mobileOpen && (
        <button
          className="mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <GraduationCap size={31} />
          </div>

          <div className="brand-copy">
            <h1>
              StudyVerse <span>AI</span>
            </h1>
            <p>Learn · Plan · Practice · Achieve</p>
          </div>

          <button
            className="close-menu"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="navigation" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${
                activePage === label ? "nav-active" : ""
              }`}
              onClick={() => changePage(label)}
            >
              <Icon size={21} />
              <span>{label}</span>
              {label === "AI Tutor" && (
                <small className="new-badge">AI</small>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="focus-card">
            <div className="focus-icon">
              <Sparkles size={22} />
            </div>
            <h3>Better Learning</h3>
            <p>Small steps today. Brighter future.</p>
            <div className="focus-track">
              <span style={{ width: `${completion}%` }} />
            </div>
            <small>{completion}% of today's plan</small>
          </div>

          <div className="profile">
            <div className="avatar">R</div>
            <div className="profile-info">
              <strong>Ragul R</strong>
              <span>B.Tech IT · 2nd Year</span>
            </div>
            <Sparkles className="profile-sparkle" size={17} />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={21} />
          </button>

          <div className="breadcrumb">
            <span>Workspace</span>
            <b>/</b>
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <Search size={19} />
              <input
                type="search"
                placeholder="Search your study tasks..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setActivePage("Dashboard");
                }}
                aria-label="Search tasks"
              />
            </label>

            <button
              className="icon-button notification-button"
              aria-label="Notifications"
              title="Notifications"
            >
              <Bell size={20} />
              <span />
            </button>

            <div className="top-profile">
              <div className="top-avatar">R</div>
              <div>
                <strong>Ragul R</strong>
                <small>B.Tech IT · 2nd Year</small>
              </div>
            </div>
          </div>
        </header>

        <div className="page-content">
          {activePage === "Dashboard" && (
            <>
              <div className="dashboard-feature-layout">
                <section className="hero-section">
                  <div className="hero-copy">
                    <span className="hero-kicker">
                      <Sparkles size={15} />
                      YOUR PERSONAL LEARNING UNIVERSE
                    </span>

                    <h2>
                      Learn smarter.
                      <br />
                      <span>Dream bigger.</span>
                    </h2>

                    <p>
                      Explore your learning journey, build new skills, and
                      achieve your goals one step at a time.
                    </p>

                    <button
                      className="primary-button"
                      onClick={() =>
                        document
                          .getElementById("dashboard-content")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    >
                      Explore your journey <ArrowRight size={17} />
                    </button>
                  </div>
                </section>

                <section
                  className="dashboard-top-grid"
                  id="dashboard-content"
                >
                  <article className="panel today-panel">
                    <div className="panel-heading">
                      <div className="heading-with-icon">
                        <CalendarDays size={22} />
                        <div>
                          <h3>Today's Plan</h3>
                          <p>Make every study session count</p>
                        </div>
                      </div>

                      <button
                        className="text-button"
                        onClick={() => changePage("Study Plan")}
                      >
                        View All <ArrowRight size={15} />
                      </button>
                    </div>

                    {showTaskForm && (
                      <form className="task-form" onSubmit={addTask}>
                        <input
                          autoFocus
                          value={newTask}
                          onChange={(event) =>
                            setNewTask(event.target.value)
                          }
                          placeholder="Enter a study task..."
                          required
                        />
                        <button className="primary-button" type="submit">
                          <Plus size={16} /> Add
                        </button>
                        <button
                          className="cancel-button"
                          type="button"
                          onClick={() => setShowTaskForm(false)}
                        >
                          Cancel
                        </button>
                      </form>
                    )}

                    <div className="task-list">
                      {filteredTasks.map(renderTask)}

                      {filteredTasks.length === 0 && (
                        <p className="empty-state">
                          No matching tasks. Try another search.
                        </p>
                      )}
                    </div>

                    <div className="task-footer">
                      <span>
                        {completedTasks} / {tasks.length} goals completed
                      </span>
                      <button
                        className="text-button"
                        onClick={() =>
                          setShowTaskForm((value) => !value)
                        }
                      >
                        <Plus size={15} /> Add task
                      </button>
                    </div>

                    <div className="large-progress">
                      <span style={{ width: `${completion}%` }} />
                    </div>
                  </article>

                  <article className="panel weekly-panel">
                    <div className="panel-heading">
                      <div className="heading-with-icon">
                        <ChartNoAxesColumn size={22} />
                        <div>
                          <h3>Weekly Progress</h3>
                          <p>Your consistency is growing</p>
                        </div>
                      </div>

                      <strong className="progress-percent">
                        {Math.max(68, completion)}%
                      </strong>
                    </div>

                    <div className="weekly-progress-track">
                      <span
                        style={{
                          width: `${Math.max(68, completion)}%`,
                        }}
                      />
                    </div>

                    <div className="weekly-summary">
                      <span>
                        {completedTasks} / {tasks.length} tasks completed
                      </span>
                      <ChartNoAxesColumn size={20} />
                    </div>

                    {renderWeeklyChart()}

                    <div className="weekly-note">
                      <Lightbulb size={18} />
                      <p>
                        <strong>Study tip</strong> — Focus for 25 minutes,
                        then take a 5-minute break.
                      </p>
                    </div>
                  </article>
                </section>
              </div>

              <section className="subjects-section">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">YOUR LEARNING PATH</span>
                    <h3>Explore Subjects</h3>
                  </div>
                  <button
                    className="text-button"
                    onClick={() => changePage("Subjects")}
                  >
                    All subjects <ArrowRight size={15} />
                  </button>
                </div>

                <div className="subjects-grid">
                  {subjects.map(renderSubject)}
                </div>
              </section>

              <section className="tools-section">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">STUDY SMARTER WITH AI</span>
                    <h3>Your AI Learning Toolkit</h3>
                  </div>
                </div>

                <div className="tools-grid">
                  {tools.map(
                    ({
                      title,
                      description,
                      button,
                      icon: Icon,
                      color,
                      page,
                    }) => (
                      <article
                        className={`tool-card ${color}`}
                        key={title}
                      >
                        <div className="tool-icon">
                          <Icon size={31} />
                        </div>
                        <h4>{title}</h4>
                        <p>{description}</p>
                        <button onClick={() => changePage(page)}>
                          {button} <ArrowRight size={15} />
                        </button>
                      </article>
                    )
                  )}
                </div>
              </section>

              <section className="bottom-banner">
                <div className="banner-icon">
                  <Trophy size={28} />
                </div>
                <div>
                  <strong>Small Steps, Big Dreams</strong>
                  <p>Learn · Practice · Build · Grow</p>
                </div>
                <button onClick={() => changePage("Progress")}>
                  Keep going <ArrowRight size={16} />
                </button>
              </section>
            </>
          )}

          {activePage === "Study Plan" && (
            <section className="page-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">PLAN YOUR SUCCESS</span>
                  <h2>Study Plan</h2>
                  <p className="welcome-subtitle">
                    Organize your day and build consistent study habits.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => setShowTaskForm((value) => !value)}
                >
                  <Plus size={17} /> Add task
                </button>
              </div>

              <article className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Your tasks</h3>
                    <p>{completedTasks} completed so far</p>
                  </div>
                  <CalendarCheck size={22} />
                </div>

                {showTaskForm && (
                  <form className="task-form" onSubmit={addTask}>
                    <input
                      value={newTask}
                      onChange={(event) => setNewTask(event.target.value)}
                      placeholder="Enter a study task..."
                      required
                    />
                    <button className="primary-button" type="submit">
                      Add task
                    </button>
                  </form>
                )}

                {tasks.map(renderTask)}
              </article>
            </section>
          )}

          {activePage === "Notes" && (
            <section className="page-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR KNOWLEDGE SPACE</span>
                  <h2>My Notes</h2>
                  <p className="welcome-subtitle">
                    Capture what you learn and revisit it anytime.
                  </p>
                </div>
              </div>

              <div className="content-two-column">
                <article className="panel">
                  <div className="panel-heading">
                    <h3>Create a note</h3>
                    <BookMarked size={22} />
                  </div>

                  <form className="note-form" onSubmit={saveNote}>
                    <input
                      value={noteTitle}
                      onChange={(event) => setNoteTitle(event.target.value)}
                      placeholder="Note title"
                      required
                    />
                    <textarea
                      value={noteContent}
                      onChange={(event) =>
                        setNoteContent(event.target.value)
                      }
                      placeholder="Write your study notes here..."
                      rows={7}
                      required
                    />
                    <button className="primary-button" type="submit">
                      <Plus size={16} /> Save note
                    </button>
                  </form>
                </article>

                <article className="panel">
                  <div className="panel-heading">
                    <h3>Saved notes ({notes.length})</h3>
                    <FileText size={22} />
                  </div>

                  {notes.length === 0 ? (
                    <p className="empty-state">
                      Your saved notes will appear here.
                    </p>
                  ) : (
                    notes.map((note) => (
                      <div className="saved-note" key={note.id}>
                        <div>
                          <strong>{note.title}</strong>
                          <p>{note.content}</p>
                        </div>
                        <button
                          className="delete-task"
                          onClick={() =>
                            setNotes((current) =>
                              current.filter((item) => item.id !== note.id)
                            )
                          }
                          aria-label={`Delete note ${note.title}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))
                  )}
                </article>
              </div>
            </section>
          )}

          {activePage === "AI Tutor" && (
            <section className="page-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR LEARNING COMPANION</span>
                  <h2>AI Tutor</h2>
                  <p className="welcome-subtitle">
                    Ask a question and get a structured study guide.
                  </p>
                </div>
              </div>

              <article className="ai-panel">
                <div className="ai-orb">
                  <Bot size={38} />
                </div>
                <span className="eyebrow">PERSONAL STUDY ASSISTANT</span>
                <h3>What would you like to learn?</h3>
                <p>
                  Enter a topic to get a simple explanation, an example, and a practice task.
                </p>

                <form onSubmit={askTutor} className="tutor-form">
                  <input
                    value={question}
                    onChange={(event) => {
                      setQuestion(event.target.value);
                      setAnswer("");
                    }}
                    placeholder="e.g. Explain Java arrays with an example..."
                    aria-label="Ask your study question"
                    required
                  />
                  <button className="primary-button" type="submit">
                    <Send size={16} /> Create study guide
                  </button>
                </form>

                <div className="tutor-suggestions">
                  <strong>Try asking about</strong>
                  <div className="suggestion-chips">
                    {["Java arrays", "SQL joins", "Finite automata", "CPU instruction cycle", "Exam preparation"].map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          setQuestion(suggestion);
                          setAnswer("");
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {answer ? (
                  <div className="ai-answer" aria-live="polite">
                    <div className="heading-with-icon">
                      <MessageCircle size={18} />
                      <strong>Your study guide</strong>
                    </div>
                    <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>{answer}</p>
                    <button
                      className="text-button"
                      type="button"
                      onClick={() => {
                        setQuestion("");
                        setAnswer("");
                      }}
                    >
                      Ask another question <ArrowRight size={15} />
                    </button>
                  </div>
                ) : (
                  <div className="tutor-empty-state">
                    <BookOpen size={22} />
                    <p>Your study guide will appear here after you ask a question.</p>
                  </div>
                )}
              </article>
            </section>
          )}

          {activePage === "Subjects" && (
            <section className="page-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">BUILD YOUR KNOWLEDGE</span>
                  <h2>Subjects</h2>
                  <p className="welcome-subtitle">
                    Choose a subject to start a guided learning session.
                  </p>
                </div>
              </div>

              <div className="subjects-grid page-subjects">
                {subjects.map(renderSubject)}
              </div>
            </section>
          )}

          {activePage === "Progress" && (
            <section className="page-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOUR ACHIEVEMENTS</span>
                  <h2>Learning Progress</h2>
                  <p className="welcome-subtitle">
                    Every completed task moves you forward.
                  </p>
                </div>
              </div>

              <div className="stats-grid">
                <article className="stat-card">
                  <span>Tasks completed</span>
                  <strong className="stat-value">{completedTasks}</strong>
                </article>
                <article className="stat-card">
                  <span>Completion rate</span>
                  <strong className="stat-value">{completion}%</strong>
                </article>
                <article className="stat-card">
                  <span>Weekly focus</span>
                  <strong className="stat-value">12.5h</strong>
                </article>
                <article className="stat-card">
                  <span>Study streak</span>
                  <strong className="stat-value">5 days</strong>
                </article>
              </div>

              <article className="panel">
                <div className="panel-heading">
                  <h3>Weekly study activity</h3>
                  <Trophy size={23} />
                </div>
                {renderWeeklyChart()}
              </article>
            </section>
          )}

          {activePage === "Question Bank" && (
            <section className="page-section">
              <div className="section-heading">
                <div><span className="eyebrow">PRACTISE WITH PURPOSE</span><h2>Question Bank</h2><p className="welcome-subtitle">Choose a subject, try each question, then reveal the answer and explanation.</p></div>
              </div>
              <div className="panel" style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                  <label style={{ flex: "1 1 220px" }}><span style={{ display: "block", marginBottom: 7, fontSize: 13 }}>Subject</span>
                    <select value={bankSubject} onChange={(e) => setBankSubject(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border-color, #26334f)", background: "var(--card-bg, #0a112a)", color: "inherit" }}>
                      {["All Subjects", ...subjects.map((item) => item.title)].map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </label>
                  <label style={{ flex: "2 1 260px" }}><span style={{ display: "block", marginBottom: 7, fontSize: 13 }}>Search questions</span>
                    <input value={bankSearch} onChange={(e) => setBankSearch(e.target.value)} placeholder="Search a question or topic..." style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border-color, #26334f)", background: "var(--card-bg, #0a112a)", color: "inherit" }} />
                  </label>
                </div>
                <p style={{ margin: "14px 0 0", color: "var(--muted, #9aa8c7)", fontSize: 13 }}>{questionBankData.filter((item) => (bankSubject === "All Subjects" || item.subject === bankSubject) && `${item.question} ${item.subject} ${item.options.join(" ")}`.toLowerCase().includes(bankSearch.toLowerCase())).length} questions available</p>
              </div>
              <div style={{ display: "grid", gap: 16 }}>
                {questionBankData.filter((item) => (bankSubject === "All Subjects" || item.subject === bankSubject) && `${item.question} ${item.subject} ${item.options.join(" ")}`.toLowerCase().includes(bankSearch.toLowerCase())).map((item, index) => (
                  <article className="panel" key={item.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}><span className="eyebrow">{item.subject}</span><span style={{ fontSize: 12, padding: "5px 10px", borderRadius: 99, background: "rgba(0,217,255,.10)", color: "var(--neon-blue, #00d9ff)" }}>{item.level}</span></div>
                    <h3 style={{ margin: "0 0 16px", lineHeight: 1.5 }}>{index + 1}. {item.question}</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 }}>
                      {item.options.map((option, optionIndex) => <div key={option} style={{ padding: "11px 13px", borderRadius: 10, border: "1px solid var(--border-color, #26334f)", background: revealedAnswers.includes(item.id) && option.toLowerCase() === item.answer.toLowerCase() ? "rgba(34,197,94,.12)" : "rgba(255,255,255,.02)" }}><strong style={{ marginRight: 8, color: "var(--neon-blue, #00d9ff)" }}>{String.fromCharCode(65 + optionIndex)}.</strong>{option}</div>)}
                    </div>
                    {revealedAnswers.includes(item.id) && <div style={{ marginTop: 15, padding: 14, borderRadius: 12, background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.25)" }}><p style={{ margin: "0 0 7px" }}><strong>Correct answer:</strong> {item.answer}</p><p style={{ margin: 0, lineHeight: 1.6 }}><strong>Why:</strong> {item.explanation}</p></div>}
                    <button className="primary-button" style={{ marginTop: 16 }} onClick={() => setRevealedAnswers((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])}>{revealedAnswers.includes(item.id) ? "Hide answer" : "Reveal answer"} <ChevronRight size={16} /></button>
                  </article>
                ))}
                {questionBankData.filter((item) => (bankSubject === "All Subjects" || item.subject === bankSubject) && `${item.question} ${item.subject} ${item.options.join(" ")}`.toLowerCase().includes(bankSearch.toLowerCase())).length === 0 && <article className="panel"><h3>No questions found</h3><p>Try another subject or search phrase.</p></article>}
              </div>
            </section>
          )}

          {activePage === "Practice Test" && (() => {
            const availableQuestions = questionBankData.filter((item) => testSubject === "All Subjects" || item.subject === testSubject);
            const testQuestions = availableQuestions.slice(0, Math.min(Number(testCount) || 5, availableQuestions.length));
            const score = testQuestions.filter((item) => testAnswers[item.id] === item.answer).length;
            return <section className="page-section">
              <div className="section-heading"><div><span className="eyebrow">TEST YOUR KNOWLEDGE</span><h2>Practice Test</h2><p className="welcome-subtitle">Answer multiple-choice questions and get your score instantly.</p></div></div>
              {!testStarted ? <article className="panel" style={{ maxWidth: 760 }}>
                <div className="ai-orb" style={{ marginBottom: 18 }}><ClipboardCheck size={30} /></div>
                <h3 style={{ marginTop: 0 }}>Ready for a quick challenge?</h3><p style={{ color: "var(--muted, #9aa8c7)", lineHeight: 1.7 }}>Choose a subject and test length. Your results will show your score and the correct answers.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, margin: "22px 0" }}>
                  <label><span style={{ display: "block", marginBottom: 7, fontSize: 13 }}>Subject</span><select value={testSubject} onChange={(e) => setTestSubject(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border-color, #26334f)", background: "var(--card-bg, #0a112a)", color: "inherit" }}>{["All Subjects", ...subjects.map((item) => item.title).filter((name) => questionBankData.some((q) => q.subject === name))].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
                  <label><span style={{ display: "block", marginBottom: 7, fontSize: 13 }}>Number of questions</span><select value={testCount} onChange={(e) => setTestCount(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border-color, #26334f)", background: "var(--card-bg, #0a112a)", color: "inherit" }}>{["5", "10", "12"].map((n) => <option key={n} value={n}>{Math.min(Number(n), availableQuestions.length)} questions</option>)}</select></label>
                </div>
                <button className="primary-button" disabled={!availableQuestions.length} onClick={() => { setTestAnswers({}); setTestFinished(false); setTestStarted(true); }}>Start Practice Test <ArrowRight size={16} /></button>
                <p style={{ fontSize: 12, color: "var(--muted, #9aa8c7)", marginTop: 12 }}>{availableQuestions.length} questions available for this selection.</p>
              </article> : <>
                <div className="panel" style={{ marginBottom: 18, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}><div><span className="eyebrow">{testFinished ? "TEST COMPLETE" : "YOUR TEST IS IN PROGRESS"}</span><h3 style={{ margin: "6px 0 0" }}>{testFinished ? `Your score: ${score} / ${testQuestions.length}` : `Question ${Object.keys(testAnswers).length} of ${testQuestions.length} answered`}</h3></div><span style={{ borderRadius: 99, padding: "8px 12px", background: "rgba(0,217,255,.10)", color: "var(--neon-blue, #00d9ff)", fontWeight: 700 }}>{testQuestions.length ? Math.round(score / testQuestions.length * 100) : 0}%</span></div>
                {testFinished && <article className="panel" style={{ marginBottom: 18, border: "1px solid rgba(34,197,94,.3)" }}><h3 style={{ marginTop: 0 }}>{score / Math.max(testQuestions.length, 1) >= .8 ? "Excellent work! 🎉" : score / Math.max(testQuestions.length, 1) >= .5 ? "Good effort — keep practising!" : "Keep going — practice makes progress."}</h3><p style={{ color: "var(--muted, #9aa8c7)" }}>You answered {score} correctly and {testQuestions.length - score} incorrectly.</p></article>}
                <div style={{ display: "grid", gap: 16 }}>{testQuestions.map((item, index) => <article className="panel" key={item.id}><span className="eyebrow">QUESTION {index + 1} · {item.subject}</span><h3 style={{ lineHeight: 1.5, margin: "12px 0 16px" }}>{item.question}</h3><div style={{ display: "grid", gap: 10 }}>{item.options.map((option, oi) => { const selected = testAnswers[item.id] === option; const correct = option === item.answer; let bg = "rgba(255,255,255,.02)"; let border = "1px solid var(--border-color, #26334f)"; if (testFinished && correct) { bg = "rgba(34,197,94,.12)"; border = "1px solid rgba(34,197,94,.5)"; } else if (testFinished && selected && !correct) { bg = "rgba(248,113,113,.12)"; border = "1px solid rgba(248,113,113,.5)"; } else if (selected) { bg = "rgba(0,217,255,.10)"; border = "1px solid var(--neon-blue, #00d9ff)"; } return <button key={option} disabled={testFinished} onClick={() => setTestAnswers((current) => ({ ...current, [item.id]: option }))} style={{ textAlign: "left", padding: "12px 14px", borderRadius: 11, border, background: bg, color: "inherit", cursor: testFinished ? "default" : "pointer" }}><strong style={{ color: "var(--neon-blue, #00d9ff)", marginRight: 8 }}>{String.fromCharCode(65 + oi)}.</strong>{option}{selected && !testFinished ? "  ✓ Selected" : ""}</button>})}</div>{testFinished && <div style={{ marginTop: 14, lineHeight: 1.6 }}><p><strong>Correct answer:</strong> {item.answer}</p><p style={{ marginBottom: 0 }}><strong>Explanation:</strong> {item.explanation}</p></div>}</article>)}</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>{!testFinished ? <button className="primary-button" disabled={Object.keys(testAnswers).length < testQuestions.length} onClick={() => setTestFinished(true)}>Submit Test <Check size={16} /></button> : <button className="primary-button" onClick={() => { setTestStarted(false); setTestAnswers({}); setTestFinished(false); }}>Try Another Test <ArrowRight size={16} /></button>}<button className="secondary-button" onClick={() => { setTestStarted(false); setTestAnswers({}); setTestFinished(false); }}>Exit Test</button></div>
                {!testFinished && <p style={{ fontSize: 12, color: "var(--muted, #9aa8c7)", marginTop: 10 }}>Select an answer for every question to enable Submit Test.</p>}
              </>}
            </section>;
          })()}

          {[
            "Assignments",
            "Community",
            "Tools",
            "Settings",
          ].includes(activePage) && (
            <section className="page-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">STUDYVERSE AI</span>
                  <h2>{activePage}</h2>
                  <p className="welcome-subtitle">
                    Your {activePage.toLowerCase()} workspace is ready to
                    explore.
                  </p>
                </div>
              </div>

              <article className="placeholder-panel">
                <div className="ai-orb">
                  <Sparkles size={34} />
                </div>
                <h3>Make learning interactive</h3>
                <p>
                  Use your StudyVerse workspace to practise, organize your
                  work, and keep moving toward your academic goals.
                </p>
                <button
                  className="primary-button"
                  onClick={() => changePage("Dashboard")}
                >
                  Back to Dashboard <ChevronRight size={16} />
                </button>
              </article>
            </section>
          )}

          <footer className="footer">
            <span>© 2026 StudyVerse AI</span>
            <span>Learn · Plan · Practice · Achieve</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
