import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/providers/toast-provider';
import { useResetToPreset } from '@/api/gen/items/items';

export const useResetToPresetMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useResetToPreset({
    mutation: {
      onSuccess(data, variables) {
        void queryClient.invalidateQueries();
        showToast({
          severity: 'secondary',
          summary: 'DB',
          detail: `DB set to preset: ${variables.data.name}`,
        });
      },
    },
  });
};
