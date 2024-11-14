/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * API spec, mainly for client generation
 * OpenAPI spec version: 0.0.1
 */
import { useMutation, useQuery } from '@tanstack/react-query';
import type {
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
export type UpdateBody = {
  value: string;
};

export type LoadBody = {
  item_id: string;
};

export type CreateBody = {
  item_id?: string;
  parent_id: string;
  value: string;
};

export type OperationBaseData = {
  id: string;
};

export interface OperationBase {
  created_at: string;
  data?: OperationBaseData;
  id: string;
  updated_at: string;
}

export type ItemBaseParentId = string | null;

export interface ItemBase {
  created_at?: string;
  id: string;
  is_deleted?: boolean;
  parent_id: ItemBaseParentId;
  updated_at?: string;
  value: string;
}

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

/**
 * @summary Get items list
 */
export type itemsResponse = {
  data: ItemBase[];
  status: number;
};

export const getItemsUrl = () => {
  return `/api/items`;
};

export const items = async (options?: RequestInit): Promise<itemsResponse> => {
  const res = await fetch(getItemsUrl(), {
    ...options,
    method: 'GET',
  });
  const data = await res.json();

  return { status: res.status, data };
};

export const getItemsQueryKey = () => {
  return [`/api/items`] as const;
};

export const getItemsQueryOptions = <
  TData = Awaited<ReturnType<typeof items>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof items>>, TError, TData>
  >;
  fetch?: RequestInit;
}) => {
  const { query: queryOptions, fetch: fetchOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getItemsQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof items>>> = ({
    signal,
  }) => items({ signal, ...fetchOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof items>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ItemsQueryResult = NonNullable<Awaited<ReturnType<typeof items>>>;
export type ItemsQueryError = unknown;

export function useItems<
  TData = Awaited<ReturnType<typeof items>>,
  TError = unknown,
>(options: {
  query: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof items>>, TError, TData>
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof items>>,
        TError,
        TData
      >,
      'initialData'
    >;
  fetch?: RequestInit;
}): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useItems<
  TData = Awaited<ReturnType<typeof items>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof items>>, TError, TData>
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof items>>,
        TError,
        TData
      >,
      'initialData'
    >;
  fetch?: RequestInit;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useItems<
  TData = Awaited<ReturnType<typeof items>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof items>>, TError, TData>
  >;
  fetch?: RequestInit;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };
/**
 * @summary Get items list
 */

export function useItems<
  TData = Awaited<ReturnType<typeof items>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof items>>, TError, TData>
  >;
  fetch?: RequestInit;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getItemsQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Get cached items list
 */
export type cachedItemsResponse = {
  data: ItemBase[];
  status: number;
};

export const getCachedItemsUrl = () => {
  return `/api/cached_items`;
};

export const cachedItems = async (
  options?: RequestInit,
): Promise<cachedItemsResponse> => {
  const res = await fetch(getCachedItemsUrl(), {
    ...options,
    method: 'GET',
  });
  const data = await res.json();

  return { status: res.status, data };
};

export const getCachedItemsQueryKey = () => {
  return [`/api/cached_items`] as const;
};

export const getCachedItemsQueryOptions = <
  TData = Awaited<ReturnType<typeof cachedItems>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof cachedItems>>, TError, TData>
  >;
  fetch?: RequestInit;
}) => {
  const { query: queryOptions, fetch: fetchOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getCachedItemsQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof cachedItems>>> = ({
    signal,
  }) => cachedItems({ signal, ...fetchOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof cachedItems>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type CachedItemsQueryResult = NonNullable<
  Awaited<ReturnType<typeof cachedItems>>
>;
export type CachedItemsQueryError = unknown;

export function useCachedItems<
  TData = Awaited<ReturnType<typeof cachedItems>>,
  TError = unknown,
>(options: {
  query: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof cachedItems>>, TError, TData>
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof cachedItems>>,
        TError,
        TData
      >,
      'initialData'
    >;
  fetch?: RequestInit;
}): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useCachedItems<
  TData = Awaited<ReturnType<typeof cachedItems>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof cachedItems>>, TError, TData>
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof cachedItems>>,
        TError,
        TData
      >,
      'initialData'
    >;
  fetch?: RequestInit;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useCachedItems<
  TData = Awaited<ReturnType<typeof cachedItems>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof cachedItems>>, TError, TData>
  >;
  fetch?: RequestInit;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };
/**
 * @summary Get cached items list
 */

export function useCachedItems<
  TData = Awaited<ReturnType<typeof cachedItems>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof cachedItems>>, TError, TData>
  >;
  fetch?: RequestInit;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getCachedItemsQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Create new CachedItem
 */
export type createResponse = {
  data: ItemBase;
  status: number;
};

export const getCreateUrl = () => {
  return `/api/cached_items`;
};

export const create = async (
  createBody: CreateBody,
  options?: RequestInit,
): Promise<createResponse> => {
  const res = await fetch(getCreateUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(createBody),
  });
  const data = await res.json();

  return { status: res.status, data };
};

export const getCreateMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof create>>,
    TError,
    { data: CreateBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof create>>,
  TError,
  { data: CreateBody },
  TContext
> => {
  const { mutation: mutationOptions, fetch: fetchOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof create>>,
    { data: CreateBody }
  > = (props) => {
    const { data } = props ?? {};

    return create(data, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type CreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof create>>
>;
export type CreateMutationBody = CreateBody;
export type CreateMutationError = unknown;

/**
 * @summary Create new CachedItem
 */
export const useCreate = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof create>>,
    TError,
    { data: CreateBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof create>>,
  TError,
  { data: CreateBody },
  TContext
> => {
  const mutationOptions = getCreateMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * @summary Load Item to CachedItem
 */
export type loadResponse = {
  data: ItemBase;
  status: number;
};

export const getLoadUrl = () => {
  return `/api/cached_items/load`;
};

export const load = async (
  loadBody: LoadBody,
  options?: RequestInit,
): Promise<loadResponse> => {
  const res = await fetch(getLoadUrl(), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(loadBody),
  });
  const data = await res.json();

  return { status: res.status, data };
};

export const getLoadMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof load>>,
    TError,
    { data: LoadBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof load>>,
  TError,
  { data: LoadBody },
  TContext
> => {
  const { mutation: mutationOptions, fetch: fetchOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof load>>,
    { data: LoadBody }
  > = (props) => {
    const { data } = props ?? {};

    return load(data, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type LoadMutationResult = NonNullable<Awaited<ReturnType<typeof load>>>;
export type LoadMutationBody = LoadBody;
export type LoadMutationError = unknown;

/**
 * @summary Load Item to CachedItem
 */
export const useLoad = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof load>>,
    TError,
    { data: LoadBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof load>>,
  TError,
  { data: LoadBody },
  TContext
> => {
  const mutationOptions = getLoadMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * @summary Update CachedItem
 */
export type updateResponse = {
  data: ItemBase;
  status: number;
};

export const getUpdateUrl = (id: string) => {
  return `/api/cached_items/${id}`;
};

export const update = async (
  id: string,
  updateBody: UpdateBody,
  options?: RequestInit,
): Promise<updateResponse> => {
  const res = await fetch(getUpdateUrl(id), {
    ...options,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(updateBody),
  });
  const data = await res.json();

  return { status: res.status, data };
};

export const getUpdateMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof update>>,
    TError,
    { id: string; data: UpdateBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof update>>,
  TError,
  { id: string; data: UpdateBody },
  TContext
> => {
  const { mutation: mutationOptions, fetch: fetchOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof update>>,
    { id: string; data: UpdateBody }
  > = (props) => {
    const { id, data } = props ?? {};

    return update(id, data, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type UpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof update>>
>;
export type UpdateMutationBody = UpdateBody;
export type UpdateMutationError = unknown;

/**
 * @summary Update CachedItem
 */
export const useUpdate = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof update>>,
    TError,
    { id: string; data: UpdateBody },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof update>>,
  TError,
  { id: string; data: UpdateBody },
  TContext
> => {
  const mutationOptions = getUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * @summary Mark CachedItem as deleted
 */
export type removeResponse = {
  data: ItemBase;
  status: number;
};

export const getRemoveUrl = (id: string) => {
  return `/api/cached_items/${id}`;
};

export const remove = async (
  id: string,
  options?: RequestInit,
): Promise<removeResponse> => {
  const res = await fetch(getRemoveUrl(id), {
    ...options,
    method: 'DELETE',
  });
  const data = await res.json();

  return { status: res.status, data };
};

export const getRemoveMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof remove>>,
    TError,
    { id: string },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationOptions<
  Awaited<ReturnType<typeof remove>>,
  TError,
  { id: string },
  TContext
> => {
  const { mutation: mutationOptions, fetch: fetchOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof remove>>,
    { id: string }
  > = (props) => {
    const { id } = props ?? {};

    return remove(id, fetchOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type RemoveMutationResult = NonNullable<
  Awaited<ReturnType<typeof remove>>
>;

export type RemoveMutationError = unknown;

/**
 * @summary Mark CachedItem as deleted
 */
export const useRemove = <TError = unknown, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof remove>>,
    TError,
    { id: string },
    TContext
  >;
  fetch?: RequestInit;
}): UseMutationResult<
  Awaited<ReturnType<typeof remove>>,
  TError,
  { id: string },
  TContext
> => {
  const mutationOptions = getRemoveMutationOptions(options);

  return useMutation(mutationOptions);
};