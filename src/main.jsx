import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Gauge,
  Layers3,
  LineChart,
  PlayCircle,
  ShieldCheck,
  Target,
} from "lucide-react";
import "./styles.css";

const frameworks = {
  foundation: {
    title: "Foundation Framework",
    eyebrow: "Strategic base",
    color: "green",
    icon: Compass,
    summary:
      "Defines the identity, rules, and operating beliefs behind the entire Trading OS.",
    points: [
      "Vision",
      "Mission",
      "Trading Philosophy",
      "Core Principles",
      "Risk Philosophy",
      "Performance Objectives",
      "Operating Rules",
      "Decision Hierarchy",
    ],
    sections: [
      ["Vision", "Create a trading environment where every decision has a clear reason and measurable outcome."],
      ["Mission", "Convert market activity into a disciplined operating process."],
      ["Trading Philosophy", "Describe the core market beliefs, trade selection standards, and behavioral principles that guide the system."],
      ["Core Principles", "List the non-negotiable principles that keep the Trading OS consistent across market conditions."],
      ["Risk Philosophy", "Define how much risk is acceptable, when risk should be reduced, and when trading should stop."],
      ["Performance Objectives", "Clarify the process and outcome goals used to judge progress over time."],
      ["Operating Rules", "Document the practical rules for preparation, execution, review, and daily trading behavior."],
      ["Decision Hierarchy", "Prioritize risk, process quality, and repeatable execution before profit targets."],
    ],
  },
  core: {
    title: "Core Framework",
    eyebrow: "Execution engine",
    color: "amber",
    icon: Layers3,
    summary:
      "Turns market ideas into a repeatable sequence: analyze, plan, execute, manage, and audit.",
    points: ["Analysis", "Planning", "Execution", "Management", "Audit"],
    sections: [
      ["Analysis", "Review structure, context, liquidity, trend, volatility, and invalidation before a trade exists."],
      ["Planning", "Define entry, stop, targets, sizing, timing, and the exact condition that cancels the setup."],
      ["Execution", "Take only planned trades and record whether the entry matched the playbook."],
      ["Management", "Adjust risk and exits by rule, not by emotion or live-market noise."],
      ["Audit", "Review the result, process score, and improvement action after the trade closes."],
    ],
  },
  scoring: {
    title: "Scoring Framework",
    eyebrow: "Performance control",
    color: "indigo",
    icon: ClipboardCheck,
    summary:
      "Measures the quality of decisions so the system improves beyond simple profit and loss.",
    points: [
      "Analysis Quality",
      "Planning Quality",
      "Execution Discipline",
      "Management Discipline",
      "Audit Completeness",
    ],
    sections: [
      ["Analysis quality", "Score whether the trade idea was supported by complete and relevant market evidence."],
      ["Planning quality", "Score whether risk, targets, and invalidation were defined before execution."],
      ["Execution discipline", "Score whether the trade followed the setup without late impulse changes."],
      ["Audit completeness", "Score whether the lesson, mistake, and next improvement were captured."],
    ],
  },
};

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash.replace("#/", "") || "home");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.replace("#/", "") || "home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (nextRoute) => {
    window.location.hash = `/${nextRoute}`;
  };

  return [route, navigate];
}

function App() {
  const [route, navigate] = useHashRoute();
  const page = useMemo(() => route.split("/")[0], [route]);

  if (page === "trading-os") {
    return <TradingOsPage onNavigate={navigate} />;
  }

  if (frameworks[page]) {
    return <FrameworkPage framework={frameworks[page]} onNavigate={navigate} />;
  }

  return <HomePage onNavigate={navigate} />;
}

function Shell({ children }) {
  return (
    <main className="app-shell">
      <div className="background-grid" />
      {children}
    </main>
  );
}

function HomePage({ onNavigate }) {
  return (
    <Shell>
      <section className="topbar">
        <div>
          <p className="kicker">Operating blueprint</p>
          <h1>Trading OS</h1>
        </div>
        <button className="ghost-button" onClick={() => onNavigate("trading-os")}>
          Overview <ChevronRight size={18} />
        </button>
      </section>

      <section className="hero-band">
        <div className="hero-copy">
          <p className="kicker">Professional trading system</p>
          <h2>One operating model for rules, execution, and scoring.</h2>
          <p>
            Click any framework below to open its dedicated page with the
            checklist, role, and operating steps.
          </p>
        </div>
        <div className="hero-metrics">
          <Metric icon={ShieldCheck} value="01" label="Foundation" />
          <Metric icon={PlayCircle} value="02" label="Core stages" />
          <Metric icon={Gauge} value="03" label="Score controls" />
        </div>
      </section>

      <Flowchart onNavigate={onNavigate} />
    </Shell>
  );
}

function Flowchart({ onNavigate }) {
  return (
    <section className="chart-area" aria-label="Trading OS flowchart">
      <button className="root-node" onClick={() => onNavigate("trading-os")}>
        <LineChart size={28} />
        <span>Trading OS</span>
      </button>

      <div className="connector main-vertical" />
      <div className="connector main-horizontal" />

      <div className="framework-grid">
        {Object.entries(frameworks).map(([key, framework]) => (
          <FrameworkColumn
            key={key}
            id={key}
            framework={framework}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </section>
  );
}

function FrameworkColumn({ id, framework, onNavigate }) {
  const Icon = framework.icon;
  return (
    <article className={`framework-column ${framework.color}`}>
      <button className="framework-node" onClick={() => onNavigate(id)}>
        <Icon size={22} />
        <span>{framework.title}</span>
      </button>
      <div className="connector short-vertical" />
      <button className="detail-card" onClick={() => onNavigate(id)}>
        <ol>
          {framework.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ol>
      </button>
    </article>
  );
}

function TradingOsPage({ onNavigate }) {
  return (
    <Shell>
      <PageHeader
        title="Trading OS"
        eyebrow="System overview"
        summary="The Trading OS connects strategy, execution, and review into one repeatable operating system."
        onNavigate={onNavigate}
      />
      <section className="overview-layout">
        <div className="large-panel">
          <h2>Operating sequence</h2>
          <p>
            The system starts with foundation rules, moves through core trading
            workflow, and closes the loop with scoring. Each page works like a
            professional operating manual for that layer.
          </p>
          <div className="timeline">
            <Step number="1" label="Define beliefs and rules" />
            <Step number="2" label="Run the trade workflow" />
            <Step number="3" label="Score and improve decisions" />
          </div>
        </div>
        <div className="side-panel">
          {Object.entries(frameworks).map(([key, framework]) => (
            <button key={key} className="side-link" onClick={() => onNavigate(key)}>
              <span>{framework.title}</span>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      </section>
    </Shell>
  );
}

function FrameworkPage({ framework, onNavigate }) {
  const Icon = framework.icon;
  const [selectedPoint, setSelectedPoint] = useState(framework.points[0]);

  useEffect(() => {
    setSelectedPoint(framework.points[0]);
  }, [framework]);

  const selectedSection =
    framework.sections.find(([title]) => normalizeTitle(title) === normalizeTitle(selectedPoint)) ||
    framework.sections[0];

  return (
    <Shell>
      <PageHeader
        title={framework.title}
        eyebrow={framework.eyebrow}
        summary={framework.summary}
        onNavigate={onNavigate}
        icon={Icon}
      />
      <section className="framework-page-grid">
        <div className={`checklist-panel ${framework.color}`}>
          <h2>Framework checklist</h2>
          <div className="checklist">
            {framework.points.map((point) => (
              <button
                className={`check-row ${selectedPoint === point ? "active" : ""}`}
                key={point}
                onClick={() => setSelectedPoint(point)}
              >
                <CheckCircle2 size={18} />
                <span>{point}</span>
                <ChevronRight className="check-arrow" size={17} />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-panel">
          <section className="selected-detail">
            <p className="kicker">Selected topic</p>
            <h2>{selectedSection[0]}</h2>
            <p>{selectedSection[1]}</p>
            <div className="content-note">
              Send me the final content for this section and I can replace this
              placeholder text.
            </div>
          </section>
        </div>
      </section>
    </Shell>
  );
}

function normalizeTitle(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function PageHeader({ title, eyebrow, summary, onNavigate, icon: Icon = Activity }) {
  return (
    <header className="page-header">
      <button className="back-button" onClick={() => onNavigate("home")}>
        <ArrowLeft size={18} /> Back
      </button>
      <div className="title-cluster">
        <div className="title-icon">
          <Icon size={28} />
        </div>
        <div>
          <p className="kicker">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{summary}</p>
        </div>
      </div>
    </header>
  );
}

function Metric({ icon: Icon, value, label }) {
  return (
    <div className="metric">
      <Icon size={22} />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Step({ number, label }) {
  return (
    <div className="step">
      <span>{number}</span>
      <p>{label}</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
