import { useEffect, useState } from "react";
import Calendar from "./Calaender";
import styles from "./InterFaceIntern.module.css";
import useFeatureTrack from '../../utils/useFeatureTrack';
function InterFaceIntern() {
  useFeatureTrack('internship'); 
  const [internships, setInternships] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [active, setActive] = useState("intern");
  
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("https://remotive.com/api/remote-jobs");
      const data = await res.json();

      // filter internship jobs
      const internJobs = data.jobs.filter((job) =>
        job.title.toLowerCase().includes("intern")
      );

      // filter placement jobs (all other jobs)
      const placeJobs = data.jobs.filter(
        (job) => !job.title.toLowerCase().includes("intern")
      );

      setInternships(internJobs);
      setPlacements(placeJobs);

    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

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
              Internships
            </button>

            <button
              className={active === "placement" ? styles.ActiveTab : ""}
              onClick={() => setActive("placement")}
            >
              Placements
            </button>
          </div>

          {/* Internship Section */}
          {active === "intern" && (
            <div className={styles.OfferList}>
              {internships.length === 0 && <p>No internships found</p>}
              {internships.map((job) => (
                <div key={job.id} className={styles.OfferCard}>
                  <h3>{job.title}</h3>
                  <p>{job.company_name}</p>
                  <span className={styles.Location}>{job.candidate_required_location}</span>

<button
  className={styles.ApplyBtn}
  onClick={() => window.open(job.url, "_blank")}
>
  Apply
</button>
                </div>
              ))}
            </div>
          )}

          {/* Placement Section */}
          {active === "placement" && (
            <div className={styles.OfferList}>
              {placements.length === 0 && <p>No placements found</p>}
              {placements.map((job) => (
                <div key={job.id} className={styles.OfferCard}>
                  <h3>{job.title}</h3>
                  <p>{job.company_name}</p>
                  <span className={styles.Location}>{job.candidate_required_location}</span>
<button
  className={styles.ApplyBtn}
  onClick={() => window.open(job.url, "_blank")}
>
  Apply
</button>

                </div>
              ))}
            </div>
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
    </div>
  );
}

export default InterFaceIntern;