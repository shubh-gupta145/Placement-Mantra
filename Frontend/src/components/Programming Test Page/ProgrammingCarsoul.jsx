import styles from './ProgrammingCarsoul.module.css';
function ProgrammingCarsoul(){
    return(
<div className={styles.Container}>
<h1 className={styles.heading}>Programming Tests</h1>
<p>IF You Want To Test Your Programming Skill. You are Given A Test. You can Manage The Test Settings Here.
    <br/> There Are three Level of Test. But Before That, You Need To Select The Programming Language.
    <br/> To Take The Click The below Button.</p>
    <button className={styles.Button}><a href="#">Take Test</a></button>
</div>
    );
}
export default ProgrammingCarsoul;