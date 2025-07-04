import type { AnyUseMutationOptions } from '@tanstack/react-query'

export type NestedObject<T> = {
  [K in string]: NestedObject<T> | T
}

type DefineMutionObjectLeaf<QO extends AnyUseMutationOptions = AnyUseMutationOptions> = QO | ((...p: any[]) => QO)

type ScopedMutations<T extends DefineMutionObjectLeaf = DefineMutionObjectLeaf> = NestedObject<T | ((...p: any[]) => T)>

export function defineMutations<const T extends ScopedMutations>(mutations: T) {
  return mutations
}

export function defineMutation<const T extends AnyUseMutationOptions>(mutation: T) {
  return mutation
}
