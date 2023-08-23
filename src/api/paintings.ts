import { useQuery } from 'react-query';
import axiosBase from '../configs/axios';

export interface Painting {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

export const useGetPaintings = (
  currentPage?: number,
  limit?: number,
  authorId?: string,
  locationId?: string,
  name?: string,
  createdFrom?: string,
  createdBefore?: string
) => {
  return useQuery<Painting[], Error>(
    [
      'paintings',
      currentPage,
      authorId,
      locationId,
      name,
      createdFrom,
      createdBefore
    ],
    () =>
      axiosBase
        .get(
          `/paintings?${currentPage ? `_page=${currentPage}` : ''}${
            limit ? `&_limit=${limit}` : ''
          }${authorId ? `&authorId=${authorId}` : ''}${
            locationId ? `&locationId=${locationId}` : ''
          }${name ? `&name_like=${name}` : ''}${
            createdFrom ? `&created_gte=${createdFrom}` : ''
          }${createdBefore ? `&created_lte=${createdBefore}` : ''}`
        )
        .then(response => response.data),
    {
      keepPreviousData: true
    }
  );
};

export const useGetPaintingsAll = (
  authorId?: string,
  locationId?: string,
  name?: string,
  createdFrom?: string,
  createdBefore?: string
) => {
  return useQuery<Painting[], Error>(
    ['paintingsAll', authorId, locationId, name, createdBefore, createdFrom],
    () =>
      axiosBase
        .get(
          `/paintings?${authorId ? `&authorId=${authorId}` : ''}${
            locationId ? `&locationId=${locationId}` : ''
          }${name ? `&name_like=${name}` : ''}${
            createdFrom ? `&created_gte=${createdFrom}` : ''
          }${createdBefore ? `&created_lte=${createdBefore}` : ''}`
        )
        .then(response => response.data),
    {
      keepPreviousData: true
    }
  );
};
