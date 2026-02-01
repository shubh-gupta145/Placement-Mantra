import styles from './LogInSignUp.module.css';
import React from 'react';
function LogInSignUp() {

    return (
    <div className={styles.Container}>
        <h2 classnName={styles.heading}>Sign Up</h2>
        <div className={styles.InputContainer}>
<input type="text" placeholder="Username" className={styles.InputField}/>
        </div>
        <div className={styles.InputContainer}>
            <input type="email" placeholder="Email" className={styles.InputField}/>
            </div>
<div className={styles.InputContainer}>
    <input type="password" placeholder="Password" className={styles.InputField}/>
</div>
<div className={styles.BtnsContainer}>
    <div className={styles.BtnContainer}>
        <button className={styles.Button}>Sign Up</button>
        </div>
            <div className={styles.BtnContainer}>
        <button  className={styles.Button}>Log In</button>
        </div>
</div> 
        </div>  
    );   
}

export default LogInSignUp;