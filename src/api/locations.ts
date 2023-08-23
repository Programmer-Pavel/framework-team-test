import { useQuery } from 'react-query';
import axiosBase from '../configs/axios';
import { Option } from '../types/form';

export interface Location {
  id: number;
  location: string;
}

const useGetLocations = () => {
  return useQuery<Option[], Error>('locations', () =>
    axiosBase.get('/locations').then(response =>
      response.data.map((item: Location) => ({
        value: item.id,
        label: item.location
      }))
    )
  );
};

export default useGetLocations;
