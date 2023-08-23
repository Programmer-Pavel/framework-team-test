import { useMemo, useRef, useState } from 'react';
import styles from './Select.module.scss';
import arrowDownIcon from '../../../assets/icons/arrow-down.svg';
import clearIcon from '../../../assets/icons/clear.svg';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { Option } from '../../../types/form';

interface Props {
  options: Option[];
  value: string;
  placeholder?: string;
  setValue: (value: string) => void;
}

const Select = ({ options, value, setValue, placeholder }: Props) => {
  const [isSelectBarOpen, setIsSelectBarOpen] = useState(false);

  const ref = useRef(null);

  useOutsideClick(ref, () => setIsSelectBarOpen(false));

  const label = useMemo(
    () => options.find(item => item.value === value)?.label,
    [options, value]
  );

  const onOption = (itemValue: string) => {
    setValue(itemValue);
    setIsSelectBarOpen(false);
  };

  const onClear = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setValue('');
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <div
        className={`${styles.title} ${
          isSelectBarOpen ? styles.title_isOpen : ''
        }`}
        onClick={() => setIsSelectBarOpen(!isSelectBarOpen)}
      >
        {label ? (
          <span className={styles.label}>{label}</span>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <div className={styles.imagesGroup}>
          {label && isSelectBarOpen && (
            <img
              className={styles.image}
              src={clearIcon}
              alt=''
              onClick={onClear}
            />
          )}
          <img
            className={`${styles.image} ${styles.arrowDown}`}
            src={arrowDownIcon}
            alt=''
          />
        </div>
      </div>
      {isSelectBarOpen && (
        <ul className={styles.selectBar}>
          {options.map(item => (
            <li key={item.value} onClick={() => onOption(item.value)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
