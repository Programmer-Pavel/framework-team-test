import { useMemo } from 'react';
import useGetAuthors from '../../../api/authors';
import useGetLocations from '../../../api/locations';
import { Painting } from '../../../api/paintings';
import styles from './Card.module.scss';

const Card = ({ data }: { data: Painting }) => {
  const { data: authors } = useGetAuthors();
  const { data: locations } = useGetLocations();

  const author = useMemo(
    () => authors?.find(item => Number(item.value) === data.authorId)?.label,
    [authors, data.authorId]
  );

  const location = useMemo(
    () =>
      locations?.find(item => Number(item.value) === data.locationId)?.label,
    [locations, data.locationId]
  );

  return (
    <div className={`${styles.wrapper} ${styles.card}`}>
      <div className={styles.content}>
        <h3 className={styles.title}>{data.name}</h3>
        <div className={styles.text}>
          <span className={styles.label}>Author:</span>
          <span>{author}</span>
        </div>
        <div className={styles.text}>
          <span className={styles.label}>Created:</span>
          <span>{data.created}</span>
        </div>
        <div className={styles.text}>
          <span className={styles.label}>Location:</span>
          <span>{location}</span>
        </div>
      </div>
      <div className={styles.image}>
        <img
          src={`https://test-front.framework.team/${data.imageUrl}`}
          alt=''
        />
      </div>
    </div>
  );
};

export default Card;
