export interface AccessTokenPayload {
    userId: string;
    email: string;
    provider: string;
}
export interface RefreshTokenPayload {
    userId: string;
}
export declare function signAccessToken(payload: AccessTokenPayload): string;
export declare function signRefreshToken(payload: RefreshTokenPayload): string;
export declare function verifyAccessToken(token: string): AccessTokenPayload;
export declare function verifyRefreshToken(token: string): RefreshTokenPayload;
