import styles from "./Header.module.css"
function Header(){
    return(
        <>
          <div className={styles.InfoContainer}>
<h2 className={styles.heading}> What is MockInterview Feature?</h2>
<p className={styles.para}>This feature allows you to take a Mock Test powered by our advanced audio analysis algorithm. Once you provide your audio input, the system performs a detailed analysis to identify specific problems and weaknesses in your performance. Based on these findings, our system not only highlights your errors but also provides tailored suggestions on how to solve them. Each result includes a comprehensive breakdown of your marks, specific errors, and actionable suggestions for improvement. This feature is specifically designed to address common challenges faced during mock tests and to significantly boost student confidence.</p>
  </div>
        </>
    );
}
export default Header;