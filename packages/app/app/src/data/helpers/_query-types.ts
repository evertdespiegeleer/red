import type { AnyUseQueryOptions, QueryFunction } from '@tanstack/react-query'

export type NestedObject<T> = {
  [K in string]: NestedObject<T> | T
}

type DefineQueriesObjectLeaf<QO extends AnyUseQueryOptions = AnyUseQueryOptions> = QO | ((...p: any[]) => QO)

type ScopedQueries<T extends DefineQueriesObjectLeaf = DefineQueriesObjectLeaf> = NestedObject<T | ((...p: any[]) => T)>

export function defineQueries<const T extends ScopedQueries = ScopedQueries>(queries: T) {
  return queries
}

type TypeFromNestedObjectWhichSatisfies<ObjectType, SatisfyType> = ObjectType extends SatisfyType
  ? ObjectType
  : ObjectType extends object
    ? {
        [K in keyof ObjectType]: TypeFromNestedObjectWhichSatisfies<ObjectType[K], SatisfyType>
      }[keyof ObjectType]
    : never

type QueryOptionsOfQueriesObjectLeaf<QOL extends DefineQueriesObjectLeaf = DefineQueriesObjectLeaf> =
  QOL extends AnyUseQueryOptions ? QOL : QOL extends (...p: any[]) => AnyUseQueryOptions ? ReturnType<QOL> : never

export type QueryKeysOfQueriesObject<SQ extends ScopedQueries = ScopedQueries> = QueryOptionsOfQueriesObjectLeaf<
  TypeFromNestedObjectWhichSatisfies<SQ, AnyUseQueryOptions>
>['queryKey']

export type QueryReturnType<T extends { queryFn: QueryFunction } | ((...p: any[]) => { queryFn: QueryFunction })> =
  T extends { queryFn: QueryFunction }
    ? NonNullable<Awaited<ReturnType<NonNullable<T['queryFn']>>>>
    : T extends (...p: any[]) => { queryFn: QueryFunction }
      ? NonNullable<Awaited<ReturnType<NonNullable<ReturnType<T>['queryFn']>>>>
      : never
