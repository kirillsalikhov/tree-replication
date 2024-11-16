import { useQueryClient } from '@tanstack/react-query';
import {
  getCachedItemsQueryKey,
  useUpdate,
} from '@/api/gen/cached-items/cached-items';

export const useUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useUpdate({
    mutation: {
      onSuccess() {
        void queryClient.invalidateQueries({
          queryKey: getCachedItemsQueryKey(),
        });
      },
    },
  });
};
