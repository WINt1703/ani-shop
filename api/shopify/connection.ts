export interface Connection<TSource> {
    edges: Array<{ node: TSource }>
}