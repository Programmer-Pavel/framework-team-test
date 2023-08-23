import { InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} {...props} />
    </div>
  );
};

export default Input;
