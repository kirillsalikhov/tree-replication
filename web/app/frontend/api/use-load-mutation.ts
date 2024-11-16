import { useQueryClient } from '@tanstack/react-query';
import {
  getCachedItemsQueryKey,
  useLoad,
} from '@/api/gen/cached-items/cached-items';

export const useLoadMutation = () => {
  const queryClient = useQueryClient();
  return useLoad({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: getCachedItemsQueryKey(),
        });
      },
    },
  });
};
