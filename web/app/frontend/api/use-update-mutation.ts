import { useQueryClient } from '@tanstack/react-query';
import {
  getCachedItemsQueryKey,
  useUpdate,
} from '@/api/gen/cached-items/cached-items';
import { useToast } from '@/providers/toast-provider';

export const useUpdateMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useUpdate({
    mutation: {
      onSuccess(data) {
        if (data?.status === 200) {
          void queryClient.invalidateQueries({
            queryKey: getCachedItemsQueryKey(),
          });
        } else {
          // @ts-expect-error Orval has problems with fetch and errors (it doesn't check response code)
          const errorMessage: string = data?.data.message;
          showToast({
            severity: 'error',
            summary: 'Cache',
            detail: errorMessage,
          });
        }
      },
    },
  });
};
