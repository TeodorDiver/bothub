import React from "react";
import styles from './Button.module.scss'



export default function Button({ onClick }) {

    return (

        <div className={styles.button}>
            <button onClick={onClick}>press</button>
        </div>
    );
}



