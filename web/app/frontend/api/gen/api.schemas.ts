/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * API spec, mainly for client generation
 * OpenAPI spec version: 0.0.1
 */
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

export type ResetToPresetBody = {
  name: string;
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