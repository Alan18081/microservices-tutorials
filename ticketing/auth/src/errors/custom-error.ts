export abstract class CustomError extends Error {
    abstract statusCode: number;
    public abstract serializeErrors(): Array<{ message: string; field?: string }>
}