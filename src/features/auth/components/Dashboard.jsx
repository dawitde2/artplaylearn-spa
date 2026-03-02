import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>🎨 ArtPlayLearn</div>
        <nav style={styles.nav}>
          <NavItem icon="🏠" label="Home" active />
          <NavItem icon="📚" label="Courses" />
          <NavItem icon="👥" label="Students" />
          <NavItem icon="📊" label="Reports" />
          <NavItem icon="⚙️" label="Settings" />
        </nav>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <h1 style={styles.welcome}>
            Welcome back, <span style={styles.highlight}>{user?.email}</span>
          </h1>
          <div style={styles.badge}>{user?.role}</div>
        </header>

        {/* Stats Cards */}
        <div style={styles.grid}>
          <StatCard
            icon="📚"
            label="Total Courses"
            value="12"
            color="#4f46e5"
          />
          <StatCard icon="👥" label="Students" value="148" color="#0891b2" />
          <StatCard icon="✅" label="Completed" value="34" color="#16a34a" />
          <StatCard icon="⭐" label="Avg. Rating" value="4.8" color="#d97706" />
        </div>

        {/* Recent Activity */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent Activity</h2>
          <div style={styles.activityList}>
            <ActivityItem
              text="New student enrolled in Watercolor Basics"
              time="2 min ago"
            />
            <ActivityItem
              text="Course 'Oil Painting 101' was updated"
              time="1 hr ago"
            />
            <ActivityItem
              text="Assignment submitted by John Doe"
              time="3 hr ago"
            />
            <ActivityItem
              text="New comment on 'Sketching for Beginners'"
              time="Yesterday"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

// ---- Sub-components ----

function NavItem({ icon, label, active }) {
  return (
    <div style={{ ...styles.navItem, ...(active ? styles.navItemActive : {}) }}>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div style={styles.card}>
      <div style={{ ...styles.cardIcon, background: color }}>{icon}</div>
      <div>
        <div style={styles.cardValue}>{value}</div>
        <div style={styles.cardLabel}>{label}</div>
      </div>
    </div>
  );
}

function ActivityItem({ text, time }) {
  return (
    <div style={styles.activityItem}>
      <div style={styles.activityDot} />
      <div style={styles.activityContent}>
        <p style={styles.activityText}>{text}</p>
        <span style={styles.activityTime}>{time}</span>
      </div>
    </div>
  );
}

// ---- Styles ----

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
    background: "#f8fafc",
  },

  // Sidebar
  sidebar: {
    width: "220px",
    background: "#1e1b4b",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem 1rem",
  },
  logo: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    paddingLeft: "8px",
  },
  nav: { display: "flex", flexDirection: "column", gap: "4px", flex: 1 },
  navItem: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#c7d2fe",
  },
  navItemActive: { background: "#4f46e5", color: "#fff" },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #4f46e5",
    color: "#c7d2fe",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },

  // Main
  main: { flex: 1, padding: "2rem", overflowY: "auto" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  welcome: { fontSize: "1.4rem", fontWeight: "600", color: "#1e293b" },
  highlight: { color: "#4f46e5" },
  badge: {
    background: "#ede9fe",
    color: "#4f46e5",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
  },

  // Grid
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
    marginBottom: "2rem",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    padding: "1.2rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
  },
  cardIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
  },
  cardValue: { fontSize: "1.5rem", fontWeight: "700", color: "#1e293b" },
  cardLabel: { fontSize: "12px", color: "#64748b" },

  // Activity
  section: {
    background: "#fff",
    borderRadius: "10px",
    padding: "1.5rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
  },
  sectionTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "1rem",
  },
  activityList: { display: "flex", flexDirection: "column", gap: "12px" },
  activityItem: { display: "flex", gap: "12px", alignItems: "flex-start" },
  activityDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#4f46e5",
    marginTop: "5px",
    flexShrink: 0,
  },
  activityContent: { flex: 1 },
  activityText: { margin: 0, fontSize: "14px", color: "#334155" },
  activityTime: { fontSize: "12px", color: "#94a3b8" },
};
