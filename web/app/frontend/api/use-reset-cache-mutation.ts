import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/providers/toast-provider';
import {
  getCachedItemsQueryKey,
  useResetCache,
} from '@/api/gen/cached-items/cached-items';

export const useResetCacheMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useResetCache({
    mutation: {
      onSuccess() {
        void queryClient.invalidateQueries({
          queryKey: getCachedItemsQueryKey(),
        });
        showToast({
          severity: 'secondary',
          summary: 'Cache',
          detail: 'Cache was reset',
        });
      },
    },
  });
};
