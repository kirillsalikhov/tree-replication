import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/providers/toast-provider';
import { getItemsQueryKey, useApplyCache } from '@/api/gen/items/items';

export const useApplyCacheMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useApplyCache({
    mutation: {
      onSuccess() {
        void queryClient.invalidateQueries({ queryKey: getItemsQueryKey() });

        showToast({
          severity: 'success',
          summary: 'Success',
          detail: 'Cache applied to DB',
        });
      },
    },
  });
};
