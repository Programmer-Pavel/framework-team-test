import { ChangeEvent, useRef, useState } from 'react';
import styles from './SelectFromBefore.module.scss';
import arrowDownIcon from '../../../assets/icons/arrow-down.svg';
import useOutsideClick from '../../../hooks/useOutsideClick';

interface Props {
  value: {
    from: string;
    before: string;
  };
  placeholder?: string;
  setValue: (value: { from: string; before: string }) => void;
}

const SelectFromBefore = ({ value, setValue, placeholder }: Props) => {
  const [isSelectBarOpen, setIsSelectBarOpen] = useState(false);

  const ref = useRef(null);

  useOutsideClick(ref, () => setIsSelectBarOpen(false));

  const onFromInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      from: e.target.value
    });
  };

  const onBeforeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      before: e.target.value
    });
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <div
        className={`${styles.title} ${
          isSelectBarOpen ? styles.title_isOpen : ''
        }`}
        onClick={() => setIsSelectBarOpen(!isSelectBarOpen)}
      >
        <span className={styles.placeholder}>{placeholder}</span>

        <div className={styles.image}>
          <img className={styles.arrowDown} src={arrowDownIcon} alt='' />
        </div>
      </div>

      {isSelectBarOpen && (
        <div className={styles.selectBar}>
          <input
            className={styles.input}
            type='text'
            placeholder='from'
            value={value.from}
            onChange={onFromInputChange}
          />
          <div className={styles.divider} />
          <input
            className={styles.input}
            type='text'
            placeholder='before'
            value={value.before}
            onChange={onBeforeInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default SelectFromBefore;
