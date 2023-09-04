import { useState } from 'react';
import styles from './Main.module.scss';
import Card from '../../components/ui-kit/card/Card';
import Pagination from '../../components/ui-kit/pagination/Pagination';
import MainLayout from '../../layouts/MainLayout';
import { useGetPaintings, useGetPaintingsAll } from '../../api/paintings';
import useGetAuthors from '../../api/authors';
import useGetLocations from '../../api/locations';
import Input from '../../components/ui-kit/input/Input';
import Select from '../../components/ui-kit/select/Select';
import SelectFromBefore from '../../components/ui-kit/selectFromBefore/SelectFromBefore';
import useDebounce from '../../hooks/useDebounce';

const LIMIT = 12;

const Main = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [created, setCreated] = useState<{
    from: string;
    before: string;
  }>({ from: '', before: '' });

  const debouncedName = useDebounce<string>(name, 500);
  const debouncedCreatedFrom = useDebounce<string>(created.from, 500);
  const debouncedCreatedBefore = useDebounce<string>(created.before, 500);

  const { data: authors } = useGetAuthors();
  const { data: locations } = useGetLocations();

  const { data: paintings } = useGetPaintings(
    currentPage,
    LIMIT,
    author,
    location,
    debouncedName,
    debouncedCreatedFrom,
    debouncedCreatedBefore
  );

  const { data: paintingsAll } = useGetPaintingsAll(
    author,
    location,
    debouncedName,
    debouncedCreatedFrom,
    debouncedCreatedBefore
  );

  return (
    <MainLayout>
      <main className={styles.wrapper}>
        <div className={styles.filters}>
          <Input
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Select
            placeholder='Author'
            options={authors || []}
            value={author}
            setValue={setAuthor}
          />
          <Select
            placeholder='Location'
            options={locations || []}
            value={location}
            setValue={setLocation}
          />
          <SelectFromBefore
            placeholder='Created'
            value={created}
            setValue={setCreated}
          />
        </div>

        {paintings?.length ? (
          <div className={styles.cardGroup}>
            {paintings?.map(item => <Card key={item.id} data={item} />)}
          </div>
        ) : (
          <div className={styles.emptyListText}>Список пустой!</div>
        )}

        {paintingsAll?.length ? (
          <Pagination
            total={paintingsAll?.length}
            itemsPerPage={LIMIT}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : null}
      </main>
    </MainLayout>
  );
};

export default Main;
