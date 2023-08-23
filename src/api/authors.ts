import { useQuery } from 'react-query';
import axiosBase from '../configs/axios';
import { Option } from '../types/form';

export interface Author {
  id: number;
  name: string;
}

const useGetAuthors = () => {
  return useQuery<Option[], Error>('authors', () =>
    axiosBase.get('/authors').then(response =>
      response.data.map((item: Author) => ({
        value: item.id,
        label: item.name
      }))
    )
  );
};

export default useGetAuthors;
