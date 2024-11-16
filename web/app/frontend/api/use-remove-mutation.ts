import { useQueryClient } from '@tanstack/react-query';
import {
  getCachedItemsQueryKey,
  useRemove,
} from '@/api/gen/cached-items/cached-items';

export const useRemoveMutation = () => {
  const queryClient = useQueryClient();
  return useRemove({
    mutation: {
      onSuccess() {
        void queryClient.invalidateQueries({
          queryKey: getCachedItemsQueryKey(),
        });
      },
    },
  });
};
