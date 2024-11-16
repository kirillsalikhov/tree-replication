import { useQueryClient } from '@tanstack/react-query';
import {
  getCachedItemsQueryKey,
  useCreate,
} from '@/api/gen/cached-items/cached-items';

let counter = 1;
const newValue = () => `New node ${counter++}`;

export const useCreateMutation = () => {
  const queryClient = useQueryClient();

  const createMutation = useCreate({
    mutation: {
      onSuccess() {
        void queryClient.invalidateQueries({
          queryKey: getCachedItemsQueryKey(),
        });
      },
    },
  });

  return {
    createMutation,
    createDefault: (parent_id: string) => {
      createMutation.mutate({
        data: { parent_id: parent_id, value: newValue() },
      });
    },
  };
};
