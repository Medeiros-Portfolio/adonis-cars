type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : never

export type ResolvedPromiseType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export type CreateVendorDTO = ResolvedPromiseType<typeof createVendorValidator.validate>
export type AddCarDTO = ResolvedPromiseType<typeof createCarValidator.validate>
