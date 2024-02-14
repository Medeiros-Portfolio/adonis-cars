type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never

export type ResolvedPromiseType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>
