import { useEffect, useState } from "react";
import Calendar from "./Calaender";
import styles from "./InterFaceIntern.module.css";
import useFeatureTrack from '../../utils/useFeatureTrack';
import Friday from "../Friday A.I/Friday";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

function InterFaceIntern() {
  useFeatureTrack('internship');
  const [internships, setInternships] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [active, setActive] = useState("intern");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const [remotiveRes, theMuse, arbeitnow] = await Promise.allSettled([
        fetch("https://remotive.com/api/remote-jobs?limit=100")
          .then(r => r.json())
          .then(data => data.jobs.map(job => ({
            id:       "rem-" + job.id,
            title:    job.title,
            company:  job.company_name,
            location: job.candidate_required_location || "Remote",
            url:      job.url,
            source:   "Remotive",
            tags:     job.tags || [],
          }))),

        fetch("https://www.themuse.com/api/public/jobs?page=1&descending=true&level=Internship&api_key=")
          .then(r => r.json())
          .then(data => (data.results || []).map(job => ({
            id:       "muse-" + job.id,
            title:    job.name,
            company:  job.company?.name || "Unknown",
            location: job.locations?.map(l => l.name).join(", ") || "Remote",
            url:      job.refs?.landing_page || "#",
            source:   "The Muse",
            tags:     job.categories?.map(c => c.name) || [],
          }))),

        fetch("https://www.arbeitnow.com/api/job-board-api")
          .then(r => r.json())
          .then(data => (data.data || []).map(job => ({
            id:       "arb-" + job.slug,
            title:    job.title,
            company:  job.company_name,
            location: job.location || "Remote",
            url:      job.url,
            source:   "Arbeitnow",
            tags:     job.tags || [],
          }))),
      ]);

      let allJobs = [];
      [remotiveRes, theMuse, arbeitnow].forEach(result => {
        if (result.status === "fulfilled" && Array.isArray(result.value)) {
          allJobs = [...allJobs, ...result.value];
        }
      });

      const seen = new Set();
      allJobs = allJobs.filter(job => {
        const key = job.title.toLowerCase() + job.company.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      const internKeywords = ["intern", "internship", "trainee", "apprentice"];
      const internJobs = allJobs.filter(job =>
        internKeywords.some(kw => job.title.toLowerCase().includes(kw))
      );
      const placeJobs = allJobs.filter(job =>
        !internKeywords.some(kw => job.title.toLowerCase().includes(kw))
      );

      setInternships(internJobs);
      setPlacements(placeJobs);

    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const JobCard = ({ job }) => (
    <div className={styles.OfferCard}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <span className={styles.Location}>{job.location}</span>
        </div>
        <span style={{
          fontSize: "10px",
          background: "rgba(255,255,255,0.1)",
          padding: "2px 8px",
          borderRadius: "10px",
          color: "rgba(255,255,255,0.5)",
          whiteSpace: "nowrap",
          marginLeft: "8px",
          marginTop: "4px",
        }}>
          {job.source}
        </span>
      </div>

      {job.tags?.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", margin: "8px 0" }}>
          {job.tags.slice(0, 4).map((tag, i) => (
            <span key={i} style={{
              fontSize: "11px",
              background: "rgba(99,102,241,0.2)",
              color: "#a5b4fc",
              padding: "2px 8px",
              borderRadius: "10px",
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <button
        className={styles.ApplyBtn}
        onClick={() => window.open(job.url, "_blank")}
      >
        Apply
      </button>
    </div>
  );

  return (
    <div className={styles.Container}>
      <Calendar />

      <div className={styles.Box}>

        {/* LEFT BOX 70% */}
        <div className={styles.Box1}>

          <div className={styles.TabButtons}>
            <button
              className={active === "intern" ? styles.ActiveTab : ""}
              onClick={() => setActive("intern")}
            >
              Internships {!loading && `(${internships.length})`}
            </button>
            <button
              className={active === "placement" ? styles.ActiveTab : ""}
              onClick={() => setActive("placement")}
            >
              Placements {!loading && `(${placements.length})`}
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,0.5)" }}>
              <p style={{ fontSize: "16px" }}>🔍 Fetching jobs from multiple portals...</p>
            </div>
          ) : (
            <>
              {active === "intern" && (
                <div className={styles.OfferList}>
                  {internships.length === 0
                    ? <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: "40px" }}>No internships found</p>
                    : internships.map(job => <JobCard key={job.id} job={job} />)
                  }
                </div>
              )}

              {active === "placement" && (
                <div className={styles.OfferList}>
                  {placements.length === 0
                    ? <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: "40px" }}>No placements found</p>
                    : placements.map(job => <JobCard key={job.id} job={job} />)
                  }
                </div>
              )}
            </>
          )}

        </div>

        {/* RIGHT BOX 30% */}
        <div className={styles.Box2}>
          <h1>JOB Skills List</h1>
          <ul>
            <li>Tech Skills</li>
            <li>DSA In Any Language</li>
            <li>Competition Certificates (Optional)</li>
            <li>Internship</li>
            <li>Hackathon (Optional)</li>
            <li>Communication Skills</li>
            <li>Fluent English Speaking</li>
            <li>Job Platform Profiles</li>
            <li>Referrals</li>
            <li>Resume</li>
          </ul>
        </div>

      </div>

      <Friday />

      {/* Scroll Top & Bottom Buttons */}
      <div style={{
        position: "fixed",
        left: "16px",
        bottom: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        zIndex: 1000,
      }}>
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(0,188,188,0.15)",
            border: "1px solid rgba(0,188,188,0.5)",
            color: "#00bcbc",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,188,188,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(0,188,188,0.3)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(0,188,188,0.15)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ↑
        </button>

        <button
          onClick={scrollToBottom}
          title="Scroll to Bottom"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(0,188,188,0.15)",
            border: "1px solid rgba(0,188,188,0.5)",
            color: "#00bcbc",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,188,188,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(0,188,188,0.3)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(0,188,188,0.15)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ↓
        </button>
      </div>

    </div>
  );
}

export default InterFaceIntern;