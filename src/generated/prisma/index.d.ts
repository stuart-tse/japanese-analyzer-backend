
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model CreditTransaction
 * 
 */
export type CreditTransaction = $Result.DefaultSelection<Prisma.$CreditTransactionPayload>
/**
 * Model FeatureAccess
 * 
 */
export type FeatureAccess = $Result.DefaultSelection<Prisma.$FeatureAccessPayload>
/**
 * Model WordPack
 * 
 */
export type WordPack = $Result.DefaultSelection<Prisma.$WordPackPayload>
/**
 * Model Word
 * 
 */
export type Word = $Result.DefaultSelection<Prisma.$WordPayload>
/**
 * Model UserPackProgress
 * 
 */
export type UserPackProgress = $Result.DefaultSelection<Prisma.$UserPackProgressPayload>
/**
 * Model Vocabulary
 * 
 */
export type Vocabulary = $Result.DefaultSelection<Prisma.$VocabularyPayload>
/**
 * Model LearningStats
 * 
 */
export type LearningStats = $Result.DefaultSelection<Prisma.$LearningStatsPayload>
/**
 * Model Analysis
 * 
 */
export type Analysis = $Result.DefaultSelection<Prisma.$AnalysisPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AuthProvider: {
  LOCAL: 'LOCAL',
  GOOGLE: 'GOOGLE',
  FACEBOOK: 'FACEBOOK'
};

export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider]


export const SubscriptionTier: {
  FREE: 'FREE',
  PRO: 'PRO',
  PREMIUM: 'PREMIUM'
};

export type SubscriptionTier = (typeof SubscriptionTier)[keyof typeof SubscriptionTier]


export const SubscriptionStatus: {
  ACTIVE: 'ACTIVE',
  PAST_DUE: 'PAST_DUE',
  CANCELED: 'CANCELED',
  INCOMPLETE: 'INCOMPLETE',
  TRIALING: 'TRIALING'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]


export const PaymentMethod: {
  CARD: 'CARD',
  ALIPAY: 'ALIPAY',
  WECHAT_PAY: 'WECHAT_PAY'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const PaymentStatus: {
  PENDING: 'PENDING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const PaymentType: {
  SUBSCRIPTION: 'SUBSCRIPTION',
  CREDIT_TOPUP: 'CREDIT_TOPUP',
  ONE_TIME: 'ONE_TIME'
};

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType]


export const CreditTransactionType: {
  PURCHASE: 'PURCHASE',
  MONTHLY_ALLOCATION: 'MONTHLY_ALLOCATION',
  DEDUCTION: 'DEDUCTION',
  REFUND: 'REFUND',
  BONUS: 'BONUS'
};

export type CreditTransactionType = (typeof CreditTransactionType)[keyof typeof CreditTransactionType]


export const FeatureType: {
  BASIC_VOCABULARY: 'BASIC_VOCABULARY',
  TRAVEL_PACKS: 'TRAVEL_PACKS',
  MOVIE_PACKS: 'MOVIE_PACKS',
  DRAMA_PACKS: 'DRAMA_PACKS',
  COMIC_PACKS: 'COMIC_PACKS',
  JLPT_PREP: 'JLPT_PREP',
  JLPT_MOCK_EXAMS: 'JLPT_MOCK_EXAMS',
  SRS_SYSTEM: 'SRS_SYSTEM',
  ADVANCED_ANALYSIS: 'ADVANCED_ANALYSIS'
};

export type FeatureType = (typeof FeatureType)[keyof typeof FeatureType]


export const PackCategory: {
  VOCABULARY: 'VOCABULARY',
  TRAVEL: 'TRAVEL',
  MOVIE: 'MOVIE',
  DRAMA: 'DRAMA',
  COMIC: 'COMIC',
  JLPT_N5: 'JLPT_N5',
  JLPT_N4: 'JLPT_N4',
  JLPT_N3: 'JLPT_N3',
  JLPT_N2: 'JLPT_N2',
  JLPT_N1: 'JLPT_N1'
};

export type PackCategory = (typeof PackCategory)[keyof typeof PackCategory]


export const VocabularyLevel: {
  LEARNING: 'LEARNING',
  REVIEWING: 'REVIEWING',
  MASTERED: 'MASTERED'
};

export type VocabularyLevel = (typeof VocabularyLevel)[keyof typeof VocabularyLevel]

}

export type AuthProvider = $Enums.AuthProvider

export const AuthProvider: typeof $Enums.AuthProvider

export type SubscriptionTier = $Enums.SubscriptionTier

export const SubscriptionTier: typeof $Enums.SubscriptionTier

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type PaymentType = $Enums.PaymentType

export const PaymentType: typeof $Enums.PaymentType

export type CreditTransactionType = $Enums.CreditTransactionType

export const CreditTransactionType: typeof $Enums.CreditTransactionType

export type FeatureType = $Enums.FeatureType

export const FeatureType: typeof $Enums.FeatureType

export type PackCategory = $Enums.PackCategory

export const PackCategory: typeof $Enums.PackCategory

export type VocabularyLevel = $Enums.VocabularyLevel

export const VocabularyLevel: typeof $Enums.VocabularyLevel

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creditTransaction`: Exposes CRUD operations for the **CreditTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditTransactions
    * const creditTransactions = await prisma.creditTransaction.findMany()
    * ```
    */
  get creditTransaction(): Prisma.CreditTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.featureAccess`: Exposes CRUD operations for the **FeatureAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeatureAccesses
    * const featureAccesses = await prisma.featureAccess.findMany()
    * ```
    */
  get featureAccess(): Prisma.FeatureAccessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wordPack`: Exposes CRUD operations for the **WordPack** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WordPacks
    * const wordPacks = await prisma.wordPack.findMany()
    * ```
    */
  get wordPack(): Prisma.WordPackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.word`: Exposes CRUD operations for the **Word** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Words
    * const words = await prisma.word.findMany()
    * ```
    */
  get word(): Prisma.WordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userPackProgress`: Exposes CRUD operations for the **UserPackProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserPackProgresses
    * const userPackProgresses = await prisma.userPackProgress.findMany()
    * ```
    */
  get userPackProgress(): Prisma.UserPackProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vocabulary`: Exposes CRUD operations for the **Vocabulary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vocabularies
    * const vocabularies = await prisma.vocabulary.findMany()
    * ```
    */
  get vocabulary(): Prisma.VocabularyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.learningStats`: Exposes CRUD operations for the **LearningStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningStats
    * const learningStats = await prisma.learningStats.findMany()
    * ```
    */
  get learningStats(): Prisma.LearningStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.analysis`: Exposes CRUD operations for the **Analysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Analyses
    * const analyses = await prisma.analysis.findMany()
    * ```
    */
  get analysis(): Prisma.AnalysisDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Subscription: 'Subscription',
    Payment: 'Payment',
    CreditTransaction: 'CreditTransaction',
    FeatureAccess: 'FeatureAccess',
    WordPack: 'WordPack',
    Word: 'Word',
    UserPackProgress: 'UserPackProgress',
    Vocabulary: 'Vocabulary',
    LearningStats: 'LearningStats',
    Analysis: 'Analysis'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "subscription" | "payment" | "creditTransaction" | "featureAccess" | "wordPack" | "word" | "userPackProgress" | "vocabulary" | "learningStats" | "analysis"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      CreditTransaction: {
        payload: Prisma.$CreditTransactionPayload<ExtArgs>
        fields: Prisma.CreditTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          findFirst: {
            args: Prisma.CreditTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          findMany: {
            args: Prisma.CreditTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          create: {
            args: Prisma.CreditTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          createMany: {
            args: Prisma.CreditTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          delete: {
            args: Prisma.CreditTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          update: {
            args: Prisma.CreditTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          deleteMany: {
            args: Prisma.CreditTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreditTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          upsert: {
            args: Prisma.CreditTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          aggregate: {
            args: Prisma.CreditTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditTransaction>
          }
          groupBy: {
            args: Prisma.CreditTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<CreditTransactionCountAggregateOutputType> | number
          }
        }
      }
      FeatureAccess: {
        payload: Prisma.$FeatureAccessPayload<ExtArgs>
        fields: Prisma.FeatureAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeatureAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeatureAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureAccessPayload>
          }
          findFirst: {
            args: Prisma.FeatureAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeatureAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureAccessPayload>
          }
          findMany: {
            args: Prisma.FeatureAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureAccessPayload>[]
          }
          create: {
            args: Prisma.FeatureAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureAccessPayload>
          }
          createMany: {
            args: Prisma.FeatureAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeatureAccessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureAccessPayload>[]
          }
          delete: {
            args: Prisma.FeatureAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureAccessPayload>
          }
          update: {
            args: Prisma.FeatureAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureAccessPayload>
          }
          deleteMany: {
            args: Prisma.FeatureAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeatureAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeatureAccessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureAccessPayload>[]
          }
          upsert: {
            args: Prisma.FeatureAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureAccessPayload>
          }
          aggregate: {
            args: Prisma.FeatureAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeatureAccess>
          }
          groupBy: {
            args: Prisma.FeatureAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeatureAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeatureAccessCountArgs<ExtArgs>
            result: $Utils.Optional<FeatureAccessCountAggregateOutputType> | number
          }
        }
      }
      WordPack: {
        payload: Prisma.$WordPackPayload<ExtArgs>
        fields: Prisma.WordPackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WordPackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WordPackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPackPayload>
          }
          findFirst: {
            args: Prisma.WordPackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WordPackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPackPayload>
          }
          findMany: {
            args: Prisma.WordPackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPackPayload>[]
          }
          create: {
            args: Prisma.WordPackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPackPayload>
          }
          createMany: {
            args: Prisma.WordPackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WordPackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPackPayload>[]
          }
          delete: {
            args: Prisma.WordPackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPackPayload>
          }
          update: {
            args: Prisma.WordPackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPackPayload>
          }
          deleteMany: {
            args: Prisma.WordPackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WordPackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WordPackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPackPayload>[]
          }
          upsert: {
            args: Prisma.WordPackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPackPayload>
          }
          aggregate: {
            args: Prisma.WordPackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWordPack>
          }
          groupBy: {
            args: Prisma.WordPackGroupByArgs<ExtArgs>
            result: $Utils.Optional<WordPackGroupByOutputType>[]
          }
          count: {
            args: Prisma.WordPackCountArgs<ExtArgs>
            result: $Utils.Optional<WordPackCountAggregateOutputType> | number
          }
        }
      }
      Word: {
        payload: Prisma.$WordPayload<ExtArgs>
        fields: Prisma.WordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          findFirst: {
            args: Prisma.WordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          findMany: {
            args: Prisma.WordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>[]
          }
          create: {
            args: Prisma.WordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          createMany: {
            args: Prisma.WordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>[]
          }
          delete: {
            args: Prisma.WordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          update: {
            args: Prisma.WordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          deleteMany: {
            args: Prisma.WordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>[]
          }
          upsert: {
            args: Prisma.WordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordPayload>
          }
          aggregate: {
            args: Prisma.WordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWord>
          }
          groupBy: {
            args: Prisma.WordGroupByArgs<ExtArgs>
            result: $Utils.Optional<WordGroupByOutputType>[]
          }
          count: {
            args: Prisma.WordCountArgs<ExtArgs>
            result: $Utils.Optional<WordCountAggregateOutputType> | number
          }
        }
      }
      UserPackProgress: {
        payload: Prisma.$UserPackProgressPayload<ExtArgs>
        fields: Prisma.UserPackProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserPackProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPackProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserPackProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPackProgressPayload>
          }
          findFirst: {
            args: Prisma.UserPackProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPackProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserPackProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPackProgressPayload>
          }
          findMany: {
            args: Prisma.UserPackProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPackProgressPayload>[]
          }
          create: {
            args: Prisma.UserPackProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPackProgressPayload>
          }
          createMany: {
            args: Prisma.UserPackProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserPackProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPackProgressPayload>[]
          }
          delete: {
            args: Prisma.UserPackProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPackProgressPayload>
          }
          update: {
            args: Prisma.UserPackProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPackProgressPayload>
          }
          deleteMany: {
            args: Prisma.UserPackProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserPackProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserPackProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPackProgressPayload>[]
          }
          upsert: {
            args: Prisma.UserPackProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPackProgressPayload>
          }
          aggregate: {
            args: Prisma.UserPackProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserPackProgress>
          }
          groupBy: {
            args: Prisma.UserPackProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserPackProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserPackProgressCountArgs<ExtArgs>
            result: $Utils.Optional<UserPackProgressCountAggregateOutputType> | number
          }
        }
      }
      Vocabulary: {
        payload: Prisma.$VocabularyPayload<ExtArgs>
        fields: Prisma.VocabularyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VocabularyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabularyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VocabularyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabularyPayload>
          }
          findFirst: {
            args: Prisma.VocabularyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabularyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VocabularyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabularyPayload>
          }
          findMany: {
            args: Prisma.VocabularyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabularyPayload>[]
          }
          create: {
            args: Prisma.VocabularyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabularyPayload>
          }
          createMany: {
            args: Prisma.VocabularyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VocabularyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabularyPayload>[]
          }
          delete: {
            args: Prisma.VocabularyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabularyPayload>
          }
          update: {
            args: Prisma.VocabularyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabularyPayload>
          }
          deleteMany: {
            args: Prisma.VocabularyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VocabularyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VocabularyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabularyPayload>[]
          }
          upsert: {
            args: Prisma.VocabularyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VocabularyPayload>
          }
          aggregate: {
            args: Prisma.VocabularyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVocabulary>
          }
          groupBy: {
            args: Prisma.VocabularyGroupByArgs<ExtArgs>
            result: $Utils.Optional<VocabularyGroupByOutputType>[]
          }
          count: {
            args: Prisma.VocabularyCountArgs<ExtArgs>
            result: $Utils.Optional<VocabularyCountAggregateOutputType> | number
          }
        }
      }
      LearningStats: {
        payload: Prisma.$LearningStatsPayload<ExtArgs>
        fields: Prisma.LearningStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          findFirst: {
            args: Prisma.LearningStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          findMany: {
            args: Prisma.LearningStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>[]
          }
          create: {
            args: Prisma.LearningStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          createMany: {
            args: Prisma.LearningStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>[]
          }
          delete: {
            args: Prisma.LearningStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          update: {
            args: Prisma.LearningStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          deleteMany: {
            args: Prisma.LearningStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>[]
          }
          upsert: {
            args: Prisma.LearningStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningStatsPayload>
          }
          aggregate: {
            args: Prisma.LearningStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningStats>
          }
          groupBy: {
            args: Prisma.LearningStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningStatsCountArgs<ExtArgs>
            result: $Utils.Optional<LearningStatsCountAggregateOutputType> | number
          }
        }
      }
      Analysis: {
        payload: Prisma.$AnalysisPayload<ExtArgs>
        fields: Prisma.AnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          findFirst: {
            args: Prisma.AnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          findMany: {
            args: Prisma.AnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>[]
          }
          create: {
            args: Prisma.AnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          createMany: {
            args: Prisma.AnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>[]
          }
          delete: {
            args: Prisma.AnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          update: {
            args: Prisma.AnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          deleteMany: {
            args: Prisma.AnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>[]
          }
          upsert: {
            args: Prisma.AnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalysisPayload>
          }
          aggregate: {
            args: Prisma.AnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalysis>
          }
          groupBy: {
            args: Prisma.AnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<AnalysisCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    subscription?: SubscriptionOmit
    payment?: PaymentOmit
    creditTransaction?: CreditTransactionOmit
    featureAccess?: FeatureAccessOmit
    wordPack?: WordPackOmit
    word?: WordOmit
    userPackProgress?: UserPackProgressOmit
    vocabulary?: VocabularyOmit
    learningStats?: LearningStatsOmit
    analysis?: AnalysisOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    subscriptions: number
    payments: number
    creditTransactions: number
    userPackProgress: number
    vocabulary: number
    learningStats: number
    analyses: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | UserCountOutputTypeCountSubscriptionsArgs
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs
    creditTransactions?: boolean | UserCountOutputTypeCountCreditTransactionsArgs
    userPackProgress?: boolean | UserCountOutputTypeCountUserPackProgressArgs
    vocabulary?: boolean | UserCountOutputTypeCountVocabularyArgs
    learningStats?: boolean | UserCountOutputTypeCountLearningStatsArgs
    analyses?: boolean | UserCountOutputTypeCountAnalysesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreditTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserPackProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPackProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVocabularyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VocabularyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLearningStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningStatsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAnalysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisWhereInput
  }


  /**
   * Count Type WordPackCountOutputType
   */

  export type WordPackCountOutputType = {
    words: number
    userProgress: number
  }

  export type WordPackCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    words?: boolean | WordPackCountOutputTypeCountWordsArgs
    userProgress?: boolean | WordPackCountOutputTypeCountUserProgressArgs
  }

  // Custom InputTypes
  /**
   * WordPackCountOutputType without action
   */
  export type WordPackCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPackCountOutputType
     */
    select?: WordPackCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WordPackCountOutputType without action
   */
  export type WordPackCountOutputTypeCountWordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WordWhereInput
  }

  /**
   * WordPackCountOutputType without action
   */
  export type WordPackCountOutputTypeCountUserProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPackProgressWhereInput
  }


  /**
   * Count Type WordCountOutputType
   */

  export type WordCountOutputType = {
    vocabulary: number
  }

  export type WordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vocabulary?: boolean | WordCountOutputTypeCountVocabularyArgs
  }

  // Custom InputTypes
  /**
   * WordCountOutputType without action
   */
  export type WordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordCountOutputType
     */
    select?: WordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WordCountOutputType without action
   */
  export type WordCountOutputTypeCountVocabularyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VocabularyWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    credits: number | null
  }

  export type UserSumAggregateOutputType = {
    credits: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    provider: $Enums.AuthProvider | null
    providerId: string | null
    subscriptionTier: $Enums.SubscriptionTier | null
    credits: number | null
    stripeCustomerId: string | null
    subscriptionExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLoginAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    provider: $Enums.AuthProvider | null
    providerId: string | null
    subscriptionTier: $Enums.SubscriptionTier | null
    credits: number | null
    stripeCustomerId: string | null
    subscriptionExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLoginAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    password: number
    provider: number
    providerId: number
    subscriptionTier: number
    credits: number
    stripeCustomerId: number
    subscriptionExpiry: number
    createdAt: number
    updatedAt: number
    lastLoginAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    credits?: true
  }

  export type UserSumAggregateInputType = {
    credits?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    provider?: true
    providerId?: true
    subscriptionTier?: true
    credits?: true
    stripeCustomerId?: true
    subscriptionExpiry?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    provider?: true
    providerId?: true
    subscriptionTier?: true
    credits?: true
    stripeCustomerId?: true
    subscriptionExpiry?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    provider?: true
    providerId?: true
    subscriptionTier?: true
    credits?: true
    stripeCustomerId?: true
    subscriptionExpiry?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    username: string | null
    password: string | null
    provider: $Enums.AuthProvider
    providerId: string | null
    subscriptionTier: $Enums.SubscriptionTier
    credits: number
    stripeCustomerId: string | null
    subscriptionExpiry: Date | null
    createdAt: Date
    updatedAt: Date
    lastLoginAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    provider?: boolean
    providerId?: boolean
    subscriptionTier?: boolean
    credits?: boolean
    stripeCustomerId?: boolean
    subscriptionExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
    subscriptions?: boolean | User$subscriptionsArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    creditTransactions?: boolean | User$creditTransactionsArgs<ExtArgs>
    userPackProgress?: boolean | User$userPackProgressArgs<ExtArgs>
    vocabulary?: boolean | User$vocabularyArgs<ExtArgs>
    learningStats?: boolean | User$learningStatsArgs<ExtArgs>
    analyses?: boolean | User$analysesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    provider?: boolean
    providerId?: boolean
    subscriptionTier?: boolean
    credits?: boolean
    stripeCustomerId?: boolean
    subscriptionExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    provider?: boolean
    providerId?: boolean
    subscriptionTier?: boolean
    credits?: boolean
    stripeCustomerId?: boolean
    subscriptionExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    provider?: boolean
    providerId?: boolean
    subscriptionTier?: boolean
    credits?: boolean
    stripeCustomerId?: boolean
    subscriptionExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "password" | "provider" | "providerId" | "subscriptionTier" | "credits" | "stripeCustomerId" | "subscriptionExpiry" | "createdAt" | "updatedAt" | "lastLoginAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscriptions?: boolean | User$subscriptionsArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    creditTransactions?: boolean | User$creditTransactionsArgs<ExtArgs>
    userPackProgress?: boolean | User$userPackProgressArgs<ExtArgs>
    vocabulary?: boolean | User$vocabularyArgs<ExtArgs>
    learningStats?: boolean | User$learningStatsArgs<ExtArgs>
    analyses?: boolean | User$analysesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      subscriptions: Prisma.$SubscriptionPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      creditTransactions: Prisma.$CreditTransactionPayload<ExtArgs>[]
      userPackProgress: Prisma.$UserPackProgressPayload<ExtArgs>[]
      vocabulary: Prisma.$VocabularyPayload<ExtArgs>[]
      learningStats: Prisma.$LearningStatsPayload<ExtArgs>[]
      analyses: Prisma.$AnalysisPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      username: string | null
      password: string | null
      provider: $Enums.AuthProvider
      providerId: string | null
      subscriptionTier: $Enums.SubscriptionTier
      credits: number
      stripeCustomerId: string | null
      subscriptionExpiry: Date | null
      createdAt: Date
      updatedAt: Date
      lastLoginAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscriptions<T extends User$subscriptionsArgs<ExtArgs> = {}>(args?: Subset<T, User$subscriptionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends User$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    creditTransactions<T extends User$creditTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$creditTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userPackProgress<T extends User$userPackProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$userPackProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    vocabulary<T extends User$vocabularyArgs<ExtArgs> = {}>(args?: Subset<T, User$vocabularyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    learningStats<T extends User$learningStatsArgs<ExtArgs> = {}>(args?: Subset<T, User$learningStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    analyses<T extends User$analysesArgs<ExtArgs> = {}>(args?: Subset<T, User$analysesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly provider: FieldRef<"User", 'AuthProvider'>
    readonly providerId: FieldRef<"User", 'String'>
    readonly subscriptionTier: FieldRef<"User", 'SubscriptionTier'>
    readonly credits: FieldRef<"User", 'Int'>
    readonly stripeCustomerId: FieldRef<"User", 'String'>
    readonly subscriptionExpiry: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.subscriptions
   */
  export type User$subscriptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    cursor?: SubscriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * User.payments
   */
  export type User$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User.creditTransactions
   */
  export type User$creditTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    where?: CreditTransactionWhereInput
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    cursor?: CreditTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * User.userPackProgress
   */
  export type User$userPackProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
    where?: UserPackProgressWhereInput
    orderBy?: UserPackProgressOrderByWithRelationInput | UserPackProgressOrderByWithRelationInput[]
    cursor?: UserPackProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserPackProgressScalarFieldEnum | UserPackProgressScalarFieldEnum[]
  }

  /**
   * User.vocabulary
   */
  export type User$vocabularyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
    where?: VocabularyWhereInput
    orderBy?: VocabularyOrderByWithRelationInput | VocabularyOrderByWithRelationInput[]
    cursor?: VocabularyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VocabularyScalarFieldEnum | VocabularyScalarFieldEnum[]
  }

  /**
   * User.learningStats
   */
  export type User$learningStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsInclude<ExtArgs> | null
    where?: LearningStatsWhereInput
    orderBy?: LearningStatsOrderByWithRelationInput | LearningStatsOrderByWithRelationInput[]
    cursor?: LearningStatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LearningStatsScalarFieldEnum | LearningStatsScalarFieldEnum[]
  }

  /**
   * User.analyses
   */
  export type User$analysesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    where?: AnalysisWhereInput
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    cursor?: AnalysisWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionAvgAggregateOutputType = {
    monthlyCredits: number | null
  }

  export type SubscriptionSumAggregateOutputType = {
    monthlyCredits: number | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    tier: $Enums.SubscriptionTier | null
    status: $Enums.SubscriptionStatus | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    stripeProductId: string | null
    billingPeriod: string | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelAtPeriodEnd: boolean | null
    canceledAt: Date | null
    monthlyCredits: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    tier: $Enums.SubscriptionTier | null
    status: $Enums.SubscriptionStatus | null
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    stripeProductId: string | null
    billingPeriod: string | null
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelAtPeriodEnd: boolean | null
    canceledAt: Date | null
    monthlyCredits: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    userId: number
    tier: number
    status: number
    stripeSubscriptionId: number
    stripePriceId: number
    stripeProductId: number
    billingPeriod: number
    currentPeriodStart: number
    currentPeriodEnd: number
    cancelAtPeriodEnd: number
    canceledAt: number
    monthlyCredits: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionAvgAggregateInputType = {
    monthlyCredits?: true
  }

  export type SubscriptionSumAggregateInputType = {
    monthlyCredits?: true
  }

  export type SubscriptionMinAggregateInputType = {
    id?: true
    userId?: true
    tier?: true
    status?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    stripeProductId?: true
    billingPeriod?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    canceledAt?: true
    monthlyCredits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    userId?: true
    tier?: true
    status?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    stripeProductId?: true
    billingPeriod?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    canceledAt?: true
    monthlyCredits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    userId?: true
    tier?: true
    status?: true
    stripeSubscriptionId?: true
    stripePriceId?: true
    stripeProductId?: true
    billingPeriod?: true
    currentPeriodStart?: true
    currentPeriodEnd?: true
    cancelAtPeriodEnd?: true
    canceledAt?: true
    monthlyCredits?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _avg?: SubscriptionAvgAggregateInputType
    _sum?: SubscriptionSumAggregateInputType
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    userId: string
    tier: $Enums.SubscriptionTier
    status: $Enums.SubscriptionStatus
    stripeSubscriptionId: string | null
    stripePriceId: string | null
    stripeProductId: string | null
    billingPeriod: string
    currentPeriodStart: Date | null
    currentPeriodEnd: Date | null
    cancelAtPeriodEnd: boolean
    canceledAt: Date | null
    monthlyCredits: number
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tier?: boolean
    status?: boolean
    stripeSubscriptionId?: boolean
    stripePriceId?: boolean
    stripeProductId?: boolean
    billingPeriod?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    canceledAt?: boolean
    monthlyCredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tier?: boolean
    status?: boolean
    stripeSubscriptionId?: boolean
    stripePriceId?: boolean
    stripeProductId?: boolean
    billingPeriod?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    canceledAt?: boolean
    monthlyCredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    tier?: boolean
    status?: boolean
    stripeSubscriptionId?: boolean
    stripePriceId?: boolean
    stripeProductId?: boolean
    billingPeriod?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    canceledAt?: boolean
    monthlyCredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    userId?: boolean
    tier?: boolean
    status?: boolean
    stripeSubscriptionId?: boolean
    stripePriceId?: boolean
    stripeProductId?: boolean
    billingPeriod?: boolean
    currentPeriodStart?: boolean
    currentPeriodEnd?: boolean
    cancelAtPeriodEnd?: boolean
    canceledAt?: boolean
    monthlyCredits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "tier" | "status" | "stripeSubscriptionId" | "stripePriceId" | "stripeProductId" | "billingPeriod" | "currentPeriodStart" | "currentPeriodEnd" | "cancelAtPeriodEnd" | "canceledAt" | "monthlyCredits" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      tier: $Enums.SubscriptionTier
      status: $Enums.SubscriptionStatus
      stripeSubscriptionId: string | null
      stripePriceId: string | null
      stripeProductId: string | null
      billingPeriod: string
      currentPeriodStart: Date | null
      currentPeriodEnd: Date | null
      cancelAtPeriodEnd: boolean
      canceledAt: Date | null
      monthlyCredits: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly userId: FieldRef<"Subscription", 'String'>
    readonly tier: FieldRef<"Subscription", 'SubscriptionTier'>
    readonly status: FieldRef<"Subscription", 'SubscriptionStatus'>
    readonly stripeSubscriptionId: FieldRef<"Subscription", 'String'>
    readonly stripePriceId: FieldRef<"Subscription", 'String'>
    readonly stripeProductId: FieldRef<"Subscription", 'String'>
    readonly billingPeriod: FieldRef<"Subscription", 'String'>
    readonly currentPeriodStart: FieldRef<"Subscription", 'DateTime'>
    readonly currentPeriodEnd: FieldRef<"Subscription", 'DateTime'>
    readonly cancelAtPeriodEnd: FieldRef<"Subscription", 'Boolean'>
    readonly canceledAt: FieldRef<"Subscription", 'DateTime'>
    readonly monthlyCredits: FieldRef<"Subscription", 'Int'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: Decimal | null
    creditAmount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: Decimal | null
    creditAmount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: Decimal | null
    currency: string | null
    paymentMethod: $Enums.PaymentMethod | null
    status: $Enums.PaymentStatus | null
    type: $Enums.PaymentType | null
    stripePaymentIntentId: string | null
    stripeInvoiceId: string | null
    externalPaymentId: string | null
    subscriptionId: string | null
    creditAmount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    paidAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: Decimal | null
    currency: string | null
    paymentMethod: $Enums.PaymentMethod | null
    status: $Enums.PaymentStatus | null
    type: $Enums.PaymentType | null
    stripePaymentIntentId: string | null
    stripeInvoiceId: string | null
    externalPaymentId: string | null
    subscriptionId: string | null
    creditAmount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    paidAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    currency: number
    paymentMethod: number
    status: number
    type: number
    stripePaymentIntentId: number
    stripeInvoiceId: number
    externalPaymentId: number
    subscriptionId: number
    creditAmount: number
    createdAt: number
    updatedAt: number
    paidAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
    creditAmount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
    creditAmount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    currency?: true
    paymentMethod?: true
    status?: true
    type?: true
    stripePaymentIntentId?: true
    stripeInvoiceId?: true
    externalPaymentId?: true
    subscriptionId?: true
    creditAmount?: true
    createdAt?: true
    updatedAt?: true
    paidAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    currency?: true
    paymentMethod?: true
    status?: true
    type?: true
    stripePaymentIntentId?: true
    stripeInvoiceId?: true
    externalPaymentId?: true
    subscriptionId?: true
    creditAmount?: true
    createdAt?: true
    updatedAt?: true
    paidAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    currency?: true
    paymentMethod?: true
    status?: true
    type?: true
    stripePaymentIntentId?: true
    stripeInvoiceId?: true
    externalPaymentId?: true
    subscriptionId?: true
    creditAmount?: true
    createdAt?: true
    updatedAt?: true
    paidAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    userId: string
    amount: Decimal
    currency: string
    paymentMethod: $Enums.PaymentMethod
    status: $Enums.PaymentStatus
    type: $Enums.PaymentType
    stripePaymentIntentId: string | null
    stripeInvoiceId: string | null
    externalPaymentId: string | null
    subscriptionId: string | null
    creditAmount: number | null
    createdAt: Date
    updatedAt: Date
    paidAt: Date | null
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    status?: boolean
    type?: boolean
    stripePaymentIntentId?: boolean
    stripeInvoiceId?: boolean
    externalPaymentId?: boolean
    subscriptionId?: boolean
    creditAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paidAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    status?: boolean
    type?: boolean
    stripePaymentIntentId?: boolean
    stripeInvoiceId?: boolean
    externalPaymentId?: boolean
    subscriptionId?: boolean
    creditAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paidAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    status?: boolean
    type?: boolean
    stripePaymentIntentId?: boolean
    stripeInvoiceId?: boolean
    externalPaymentId?: boolean
    subscriptionId?: boolean
    creditAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paidAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    status?: boolean
    type?: boolean
    stripePaymentIntentId?: boolean
    stripeInvoiceId?: boolean
    externalPaymentId?: boolean
    subscriptionId?: boolean
    creditAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paidAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "amount" | "currency" | "paymentMethod" | "status" | "type" | "stripePaymentIntentId" | "stripeInvoiceId" | "externalPaymentId" | "subscriptionId" | "creditAmount" | "createdAt" | "updatedAt" | "paidAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amount: Prisma.Decimal
      currency: string
      paymentMethod: $Enums.PaymentMethod
      status: $Enums.PaymentStatus
      type: $Enums.PaymentType
      stripePaymentIntentId: string | null
      stripeInvoiceId: string | null
      externalPaymentId: string | null
      subscriptionId: string | null
      creditAmount: number | null
      createdAt: Date
      updatedAt: Date
      paidAt: Date | null
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly userId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Decimal'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly paymentMethod: FieldRef<"Payment", 'PaymentMethod'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly type: FieldRef<"Payment", 'PaymentType'>
    readonly stripePaymentIntentId: FieldRef<"Payment", 'String'>
    readonly stripeInvoiceId: FieldRef<"Payment", 'String'>
    readonly externalPaymentId: FieldRef<"Payment", 'String'>
    readonly subscriptionId: FieldRef<"Payment", 'String'>
    readonly creditAmount: FieldRef<"Payment", 'Int'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model CreditTransaction
   */

  export type AggregateCreditTransaction = {
    _count: CreditTransactionCountAggregateOutputType | null
    _avg: CreditTransactionAvgAggregateOutputType | null
    _sum: CreditTransactionSumAggregateOutputType | null
    _min: CreditTransactionMinAggregateOutputType | null
    _max: CreditTransactionMaxAggregateOutputType | null
  }

  export type CreditTransactionAvgAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type CreditTransactionSumAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type CreditTransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    balanceAfter: number | null
    type: $Enums.CreditTransactionType | null
    description: string | null
    paymentId: string | null
    featureType: string | null
    relatedEntityId: string | null
    createdAt: Date | null
  }

  export type CreditTransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    balanceAfter: number | null
    type: $Enums.CreditTransactionType | null
    description: string | null
    paymentId: string | null
    featureType: string | null
    relatedEntityId: string | null
    createdAt: Date | null
  }

  export type CreditTransactionCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    balanceAfter: number
    type: number
    description: number
    paymentId: number
    featureType: number
    relatedEntityId: number
    createdAt: number
    _all: number
  }


  export type CreditTransactionAvgAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type CreditTransactionSumAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type CreditTransactionMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    balanceAfter?: true
    type?: true
    description?: true
    paymentId?: true
    featureType?: true
    relatedEntityId?: true
    createdAt?: true
  }

  export type CreditTransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    balanceAfter?: true
    type?: true
    description?: true
    paymentId?: true
    featureType?: true
    relatedEntityId?: true
    createdAt?: true
  }

  export type CreditTransactionCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    balanceAfter?: true
    type?: true
    description?: true
    paymentId?: true
    featureType?: true
    relatedEntityId?: true
    createdAt?: true
    _all?: true
  }

  export type CreditTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditTransaction to aggregate.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditTransactions
    **/
    _count?: true | CreditTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditTransactionMaxAggregateInputType
  }

  export type GetCreditTransactionAggregateType<T extends CreditTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditTransaction[P]>
      : GetScalarType<T[P], AggregateCreditTransaction[P]>
  }




  export type CreditTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditTransactionWhereInput
    orderBy?: CreditTransactionOrderByWithAggregationInput | CreditTransactionOrderByWithAggregationInput[]
    by: CreditTransactionScalarFieldEnum[] | CreditTransactionScalarFieldEnum
    having?: CreditTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditTransactionCountAggregateInputType | true
    _avg?: CreditTransactionAvgAggregateInputType
    _sum?: CreditTransactionSumAggregateInputType
    _min?: CreditTransactionMinAggregateInputType
    _max?: CreditTransactionMaxAggregateInputType
  }

  export type CreditTransactionGroupByOutputType = {
    id: string
    userId: string
    amount: number
    balanceAfter: number
    type: $Enums.CreditTransactionType
    description: string | null
    paymentId: string | null
    featureType: string | null
    relatedEntityId: string | null
    createdAt: Date
    _count: CreditTransactionCountAggregateOutputType | null
    _avg: CreditTransactionAvgAggregateOutputType | null
    _sum: CreditTransactionSumAggregateOutputType | null
    _min: CreditTransactionMinAggregateOutputType | null
    _max: CreditTransactionMaxAggregateOutputType | null
  }

  type GetCreditTransactionGroupByPayload<T extends CreditTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], CreditTransactionGroupByOutputType[P]>
        }
      >
    >


  export type CreditTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    balanceAfter?: boolean
    type?: boolean
    description?: boolean
    paymentId?: boolean
    featureType?: boolean
    relatedEntityId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    balanceAfter?: boolean
    type?: boolean
    description?: boolean
    paymentId?: boolean
    featureType?: boolean
    relatedEntityId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    balanceAfter?: boolean
    type?: boolean
    description?: boolean
    paymentId?: boolean
    featureType?: boolean
    relatedEntityId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    balanceAfter?: boolean
    type?: boolean
    description?: boolean
    paymentId?: boolean
    featureType?: boolean
    relatedEntityId?: boolean
    createdAt?: boolean
  }

  export type CreditTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "amount" | "balanceAfter" | "type" | "description" | "paymentId" | "featureType" | "relatedEntityId" | "createdAt", ExtArgs["result"]["creditTransaction"]>
  export type CreditTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CreditTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CreditTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CreditTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditTransaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amount: number
      balanceAfter: number
      type: $Enums.CreditTransactionType
      description: string | null
      paymentId: string | null
      featureType: string | null
      relatedEntityId: string | null
      createdAt: Date
    }, ExtArgs["result"]["creditTransaction"]>
    composites: {}
  }

  type CreditTransactionGetPayload<S extends boolean | null | undefined | CreditTransactionDefaultArgs> = $Result.GetResult<Prisma.$CreditTransactionPayload, S>

  type CreditTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreditTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreditTransactionCountAggregateInputType | true
    }

  export interface CreditTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditTransaction'], meta: { name: 'CreditTransaction' } }
    /**
     * Find zero or one CreditTransaction that matches the filter.
     * @param {CreditTransactionFindUniqueArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditTransactionFindUniqueArgs>(args: SelectSubset<T, CreditTransactionFindUniqueArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreditTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreditTransactionFindUniqueOrThrowArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindFirstArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditTransactionFindFirstArgs>(args?: SelectSubset<T, CreditTransactionFindFirstArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindFirstOrThrowArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreditTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditTransactions
     * const creditTransactions = await prisma.creditTransaction.findMany()
     * 
     * // Get first 10 CreditTransactions
     * const creditTransactions = await prisma.creditTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditTransactionFindManyArgs>(args?: SelectSubset<T, CreditTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreditTransaction.
     * @param {CreditTransactionCreateArgs} args - Arguments to create a CreditTransaction.
     * @example
     * // Create one CreditTransaction
     * const CreditTransaction = await prisma.creditTransaction.create({
     *   data: {
     *     // ... data to create a CreditTransaction
     *   }
     * })
     * 
     */
    create<T extends CreditTransactionCreateArgs>(args: SelectSubset<T, CreditTransactionCreateArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreditTransactions.
     * @param {CreditTransactionCreateManyArgs} args - Arguments to create many CreditTransactions.
     * @example
     * // Create many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditTransactionCreateManyArgs>(args?: SelectSubset<T, CreditTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditTransactions and returns the data saved in the database.
     * @param {CreditTransactionCreateManyAndReturnArgs} args - Arguments to create many CreditTransactions.
     * @example
     * // Create many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditTransactions and only return the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreditTransaction.
     * @param {CreditTransactionDeleteArgs} args - Arguments to delete one CreditTransaction.
     * @example
     * // Delete one CreditTransaction
     * const CreditTransaction = await prisma.creditTransaction.delete({
     *   where: {
     *     // ... filter to delete one CreditTransaction
     *   }
     * })
     * 
     */
    delete<T extends CreditTransactionDeleteArgs>(args: SelectSubset<T, CreditTransactionDeleteArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreditTransaction.
     * @param {CreditTransactionUpdateArgs} args - Arguments to update one CreditTransaction.
     * @example
     * // Update one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditTransactionUpdateArgs>(args: SelectSubset<T, CreditTransactionUpdateArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreditTransactions.
     * @param {CreditTransactionDeleteManyArgs} args - Arguments to filter CreditTransactions to delete.
     * @example
     * // Delete a few CreditTransactions
     * const { count } = await prisma.creditTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditTransactionDeleteManyArgs>(args?: SelectSubset<T, CreditTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditTransactionUpdateManyArgs>(args: SelectSubset<T, CreditTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditTransactions and returns the data updated in the database.
     * @param {CreditTransactionUpdateManyAndReturnArgs} args - Arguments to update many CreditTransactions.
     * @example
     * // Update many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreditTransactions and only return the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreditTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, CreditTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreditTransaction.
     * @param {CreditTransactionUpsertArgs} args - Arguments to update or create a CreditTransaction.
     * @example
     * // Update or create a CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.upsert({
     *   create: {
     *     // ... data to create a CreditTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditTransaction we want to update
     *   }
     * })
     */
    upsert<T extends CreditTransactionUpsertArgs>(args: SelectSubset<T, CreditTransactionUpsertArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreditTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionCountArgs} args - Arguments to filter CreditTransactions to count.
     * @example
     * // Count the number of CreditTransactions
     * const count = await prisma.creditTransaction.count({
     *   where: {
     *     // ... the filter for the CreditTransactions we want to count
     *   }
     * })
    **/
    count<T extends CreditTransactionCountArgs>(
      args?: Subset<T, CreditTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreditTransactionAggregateArgs>(args: Subset<T, CreditTransactionAggregateArgs>): Prisma.PrismaPromise<GetCreditTransactionAggregateType<T>>

    /**
     * Group by CreditTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreditTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditTransactionGroupByArgs['orderBy'] }
        : { orderBy?: CreditTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreditTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditTransaction model
   */
  readonly fields: CreditTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreditTransaction model
   */
  interface CreditTransactionFieldRefs {
    readonly id: FieldRef<"CreditTransaction", 'String'>
    readonly userId: FieldRef<"CreditTransaction", 'String'>
    readonly amount: FieldRef<"CreditTransaction", 'Int'>
    readonly balanceAfter: FieldRef<"CreditTransaction", 'Int'>
    readonly type: FieldRef<"CreditTransaction", 'CreditTransactionType'>
    readonly description: FieldRef<"CreditTransaction", 'String'>
    readonly paymentId: FieldRef<"CreditTransaction", 'String'>
    readonly featureType: FieldRef<"CreditTransaction", 'String'>
    readonly relatedEntityId: FieldRef<"CreditTransaction", 'String'>
    readonly createdAt: FieldRef<"CreditTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreditTransaction findUnique
   */
  export type CreditTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction findUniqueOrThrow
   */
  export type CreditTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction findFirst
   */
  export type CreditTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditTransactions.
     */
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction findFirstOrThrow
   */
  export type CreditTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditTransactions.
     */
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction findMany
   */
  export type CreditTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransactions to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction create
   */
  export type CreditTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditTransaction.
     */
    data: XOR<CreditTransactionCreateInput, CreditTransactionUncheckedCreateInput>
  }

  /**
   * CreditTransaction createMany
   */
  export type CreditTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditTransactions.
     */
    data: CreditTransactionCreateManyInput | CreditTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditTransaction createManyAndReturn
   */
  export type CreditTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many CreditTransactions.
     */
    data: CreditTransactionCreateManyInput | CreditTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditTransaction update
   */
  export type CreditTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditTransaction.
     */
    data: XOR<CreditTransactionUpdateInput, CreditTransactionUncheckedUpdateInput>
    /**
     * Choose, which CreditTransaction to update.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction updateMany
   */
  export type CreditTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditTransactions.
     */
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyInput>
    /**
     * Filter which CreditTransactions to update
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to update.
     */
    limit?: number
  }

  /**
   * CreditTransaction updateManyAndReturn
   */
  export type CreditTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * The data used to update CreditTransactions.
     */
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyInput>
    /**
     * Filter which CreditTransactions to update
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditTransaction upsert
   */
  export type CreditTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditTransaction to update in case it exists.
     */
    where: CreditTransactionWhereUniqueInput
    /**
     * In case the CreditTransaction found by the `where` argument doesn't exist, create a new CreditTransaction with this data.
     */
    create: XOR<CreditTransactionCreateInput, CreditTransactionUncheckedCreateInput>
    /**
     * In case the CreditTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditTransactionUpdateInput, CreditTransactionUncheckedUpdateInput>
  }

  /**
   * CreditTransaction delete
   */
  export type CreditTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter which CreditTransaction to delete.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction deleteMany
   */
  export type CreditTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditTransactions to delete
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to delete.
     */
    limit?: number
  }

  /**
   * CreditTransaction without action
   */
  export type CreditTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
  }


  /**
   * Model FeatureAccess
   */

  export type AggregateFeatureAccess = {
    _count: FeatureAccessCountAggregateOutputType | null
    _avg: FeatureAccessAvgAggregateOutputType | null
    _sum: FeatureAccessSumAggregateOutputType | null
    _min: FeatureAccessMinAggregateOutputType | null
    _max: FeatureAccessMaxAggregateOutputType | null
  }

  export type FeatureAccessAvgAggregateOutputType = {
    creditCost: number | null
    freeLimitDaily: number | null
    proLimitDaily: number | null
    premiumLimitDaily: number | null
  }

  export type FeatureAccessSumAggregateOutputType = {
    creditCost: number | null
    freeLimitDaily: number | null
    proLimitDaily: number | null
    premiumLimitDaily: number | null
  }

  export type FeatureAccessMinAggregateOutputType = {
    id: string | null
    featureType: $Enums.FeatureType | null
    minTier: $Enums.SubscriptionTier | null
    creditCost: number | null
    freeLimitDaily: number | null
    proLimitDaily: number | null
    premiumLimitDaily: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeatureAccessMaxAggregateOutputType = {
    id: string | null
    featureType: $Enums.FeatureType | null
    minTier: $Enums.SubscriptionTier | null
    creditCost: number | null
    freeLimitDaily: number | null
    proLimitDaily: number | null
    premiumLimitDaily: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeatureAccessCountAggregateOutputType = {
    id: number
    featureType: number
    minTier: number
    creditCost: number
    freeLimitDaily: number
    proLimitDaily: number
    premiumLimitDaily: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FeatureAccessAvgAggregateInputType = {
    creditCost?: true
    freeLimitDaily?: true
    proLimitDaily?: true
    premiumLimitDaily?: true
  }

  export type FeatureAccessSumAggregateInputType = {
    creditCost?: true
    freeLimitDaily?: true
    proLimitDaily?: true
    premiumLimitDaily?: true
  }

  export type FeatureAccessMinAggregateInputType = {
    id?: true
    featureType?: true
    minTier?: true
    creditCost?: true
    freeLimitDaily?: true
    proLimitDaily?: true
    premiumLimitDaily?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeatureAccessMaxAggregateInputType = {
    id?: true
    featureType?: true
    minTier?: true
    creditCost?: true
    freeLimitDaily?: true
    proLimitDaily?: true
    premiumLimitDaily?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeatureAccessCountAggregateInputType = {
    id?: true
    featureType?: true
    minTier?: true
    creditCost?: true
    freeLimitDaily?: true
    proLimitDaily?: true
    premiumLimitDaily?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FeatureAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeatureAccess to aggregate.
     */
    where?: FeatureAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureAccesses to fetch.
     */
    orderBy?: FeatureAccessOrderByWithRelationInput | FeatureAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeatureAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeatureAccesses
    **/
    _count?: true | FeatureAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeatureAccessAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeatureAccessSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeatureAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeatureAccessMaxAggregateInputType
  }

  export type GetFeatureAccessAggregateType<T extends FeatureAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateFeatureAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeatureAccess[P]>
      : GetScalarType<T[P], AggregateFeatureAccess[P]>
  }




  export type FeatureAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeatureAccessWhereInput
    orderBy?: FeatureAccessOrderByWithAggregationInput | FeatureAccessOrderByWithAggregationInput[]
    by: FeatureAccessScalarFieldEnum[] | FeatureAccessScalarFieldEnum
    having?: FeatureAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeatureAccessCountAggregateInputType | true
    _avg?: FeatureAccessAvgAggregateInputType
    _sum?: FeatureAccessSumAggregateInputType
    _min?: FeatureAccessMinAggregateInputType
    _max?: FeatureAccessMaxAggregateInputType
  }

  export type FeatureAccessGroupByOutputType = {
    id: string
    featureType: $Enums.FeatureType
    minTier: $Enums.SubscriptionTier
    creditCost: number | null
    freeLimitDaily: number | null
    proLimitDaily: number | null
    premiumLimitDaily: number | null
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: FeatureAccessCountAggregateOutputType | null
    _avg: FeatureAccessAvgAggregateOutputType | null
    _sum: FeatureAccessSumAggregateOutputType | null
    _min: FeatureAccessMinAggregateOutputType | null
    _max: FeatureAccessMaxAggregateOutputType | null
  }

  type GetFeatureAccessGroupByPayload<T extends FeatureAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeatureAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeatureAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeatureAccessGroupByOutputType[P]>
            : GetScalarType<T[P], FeatureAccessGroupByOutputType[P]>
        }
      >
    >


  export type FeatureAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    featureType?: boolean
    minTier?: boolean
    creditCost?: boolean
    freeLimitDaily?: boolean
    proLimitDaily?: boolean
    premiumLimitDaily?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["featureAccess"]>

  export type FeatureAccessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    featureType?: boolean
    minTier?: boolean
    creditCost?: boolean
    freeLimitDaily?: boolean
    proLimitDaily?: boolean
    premiumLimitDaily?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["featureAccess"]>

  export type FeatureAccessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    featureType?: boolean
    minTier?: boolean
    creditCost?: boolean
    freeLimitDaily?: boolean
    proLimitDaily?: boolean
    premiumLimitDaily?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["featureAccess"]>

  export type FeatureAccessSelectScalar = {
    id?: boolean
    featureType?: boolean
    minTier?: boolean
    creditCost?: boolean
    freeLimitDaily?: boolean
    proLimitDaily?: boolean
    premiumLimitDaily?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FeatureAccessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "featureType" | "minTier" | "creditCost" | "freeLimitDaily" | "proLimitDaily" | "premiumLimitDaily" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["featureAccess"]>

  export type $FeatureAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeatureAccess"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      featureType: $Enums.FeatureType
      minTier: $Enums.SubscriptionTier
      creditCost: number | null
      freeLimitDaily: number | null
      proLimitDaily: number | null
      premiumLimitDaily: number | null
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["featureAccess"]>
    composites: {}
  }

  type FeatureAccessGetPayload<S extends boolean | null | undefined | FeatureAccessDefaultArgs> = $Result.GetResult<Prisma.$FeatureAccessPayload, S>

  type FeatureAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeatureAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeatureAccessCountAggregateInputType | true
    }

  export interface FeatureAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeatureAccess'], meta: { name: 'FeatureAccess' } }
    /**
     * Find zero or one FeatureAccess that matches the filter.
     * @param {FeatureAccessFindUniqueArgs} args - Arguments to find a FeatureAccess
     * @example
     * // Get one FeatureAccess
     * const featureAccess = await prisma.featureAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeatureAccessFindUniqueArgs>(args: SelectSubset<T, FeatureAccessFindUniqueArgs<ExtArgs>>): Prisma__FeatureAccessClient<$Result.GetResult<Prisma.$FeatureAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FeatureAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeatureAccessFindUniqueOrThrowArgs} args - Arguments to find a FeatureAccess
     * @example
     * // Get one FeatureAccess
     * const featureAccess = await prisma.featureAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeatureAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, FeatureAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeatureAccessClient<$Result.GetResult<Prisma.$FeatureAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeatureAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureAccessFindFirstArgs} args - Arguments to find a FeatureAccess
     * @example
     * // Get one FeatureAccess
     * const featureAccess = await prisma.featureAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeatureAccessFindFirstArgs>(args?: SelectSubset<T, FeatureAccessFindFirstArgs<ExtArgs>>): Prisma__FeatureAccessClient<$Result.GetResult<Prisma.$FeatureAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeatureAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureAccessFindFirstOrThrowArgs} args - Arguments to find a FeatureAccess
     * @example
     * // Get one FeatureAccess
     * const featureAccess = await prisma.featureAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeatureAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, FeatureAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeatureAccessClient<$Result.GetResult<Prisma.$FeatureAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FeatureAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeatureAccesses
     * const featureAccesses = await prisma.featureAccess.findMany()
     * 
     * // Get first 10 FeatureAccesses
     * const featureAccesses = await prisma.featureAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const featureAccessWithIdOnly = await prisma.featureAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeatureAccessFindManyArgs>(args?: SelectSubset<T, FeatureAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FeatureAccess.
     * @param {FeatureAccessCreateArgs} args - Arguments to create a FeatureAccess.
     * @example
     * // Create one FeatureAccess
     * const FeatureAccess = await prisma.featureAccess.create({
     *   data: {
     *     // ... data to create a FeatureAccess
     *   }
     * })
     * 
     */
    create<T extends FeatureAccessCreateArgs>(args: SelectSubset<T, FeatureAccessCreateArgs<ExtArgs>>): Prisma__FeatureAccessClient<$Result.GetResult<Prisma.$FeatureAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FeatureAccesses.
     * @param {FeatureAccessCreateManyArgs} args - Arguments to create many FeatureAccesses.
     * @example
     * // Create many FeatureAccesses
     * const featureAccess = await prisma.featureAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeatureAccessCreateManyArgs>(args?: SelectSubset<T, FeatureAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeatureAccesses and returns the data saved in the database.
     * @param {FeatureAccessCreateManyAndReturnArgs} args - Arguments to create many FeatureAccesses.
     * @example
     * // Create many FeatureAccesses
     * const featureAccess = await prisma.featureAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeatureAccesses and only return the `id`
     * const featureAccessWithIdOnly = await prisma.featureAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeatureAccessCreateManyAndReturnArgs>(args?: SelectSubset<T, FeatureAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureAccessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FeatureAccess.
     * @param {FeatureAccessDeleteArgs} args - Arguments to delete one FeatureAccess.
     * @example
     * // Delete one FeatureAccess
     * const FeatureAccess = await prisma.featureAccess.delete({
     *   where: {
     *     // ... filter to delete one FeatureAccess
     *   }
     * })
     * 
     */
    delete<T extends FeatureAccessDeleteArgs>(args: SelectSubset<T, FeatureAccessDeleteArgs<ExtArgs>>): Prisma__FeatureAccessClient<$Result.GetResult<Prisma.$FeatureAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FeatureAccess.
     * @param {FeatureAccessUpdateArgs} args - Arguments to update one FeatureAccess.
     * @example
     * // Update one FeatureAccess
     * const featureAccess = await prisma.featureAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeatureAccessUpdateArgs>(args: SelectSubset<T, FeatureAccessUpdateArgs<ExtArgs>>): Prisma__FeatureAccessClient<$Result.GetResult<Prisma.$FeatureAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FeatureAccesses.
     * @param {FeatureAccessDeleteManyArgs} args - Arguments to filter FeatureAccesses to delete.
     * @example
     * // Delete a few FeatureAccesses
     * const { count } = await prisma.featureAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeatureAccessDeleteManyArgs>(args?: SelectSubset<T, FeatureAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeatureAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeatureAccesses
     * const featureAccess = await prisma.featureAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeatureAccessUpdateManyArgs>(args: SelectSubset<T, FeatureAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeatureAccesses and returns the data updated in the database.
     * @param {FeatureAccessUpdateManyAndReturnArgs} args - Arguments to update many FeatureAccesses.
     * @example
     * // Update many FeatureAccesses
     * const featureAccess = await prisma.featureAccess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FeatureAccesses and only return the `id`
     * const featureAccessWithIdOnly = await prisma.featureAccess.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeatureAccessUpdateManyAndReturnArgs>(args: SelectSubset<T, FeatureAccessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureAccessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FeatureAccess.
     * @param {FeatureAccessUpsertArgs} args - Arguments to update or create a FeatureAccess.
     * @example
     * // Update or create a FeatureAccess
     * const featureAccess = await prisma.featureAccess.upsert({
     *   create: {
     *     // ... data to create a FeatureAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeatureAccess we want to update
     *   }
     * })
     */
    upsert<T extends FeatureAccessUpsertArgs>(args: SelectSubset<T, FeatureAccessUpsertArgs<ExtArgs>>): Prisma__FeatureAccessClient<$Result.GetResult<Prisma.$FeatureAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FeatureAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureAccessCountArgs} args - Arguments to filter FeatureAccesses to count.
     * @example
     * // Count the number of FeatureAccesses
     * const count = await prisma.featureAccess.count({
     *   where: {
     *     // ... the filter for the FeatureAccesses we want to count
     *   }
     * })
    **/
    count<T extends FeatureAccessCountArgs>(
      args?: Subset<T, FeatureAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeatureAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeatureAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeatureAccessAggregateArgs>(args: Subset<T, FeatureAccessAggregateArgs>): Prisma.PrismaPromise<GetFeatureAccessAggregateType<T>>

    /**
     * Group by FeatureAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureAccessGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeatureAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeatureAccessGroupByArgs['orderBy'] }
        : { orderBy?: FeatureAccessGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeatureAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeatureAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeatureAccess model
   */
  readonly fields: FeatureAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeatureAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeatureAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FeatureAccess model
   */
  interface FeatureAccessFieldRefs {
    readonly id: FieldRef<"FeatureAccess", 'String'>
    readonly featureType: FieldRef<"FeatureAccess", 'FeatureType'>
    readonly minTier: FieldRef<"FeatureAccess", 'SubscriptionTier'>
    readonly creditCost: FieldRef<"FeatureAccess", 'Int'>
    readonly freeLimitDaily: FieldRef<"FeatureAccess", 'Int'>
    readonly proLimitDaily: FieldRef<"FeatureAccess", 'Int'>
    readonly premiumLimitDaily: FieldRef<"FeatureAccess", 'Int'>
    readonly description: FieldRef<"FeatureAccess", 'String'>
    readonly createdAt: FieldRef<"FeatureAccess", 'DateTime'>
    readonly updatedAt: FieldRef<"FeatureAccess", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FeatureAccess findUnique
   */
  export type FeatureAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
    /**
     * Filter, which FeatureAccess to fetch.
     */
    where: FeatureAccessWhereUniqueInput
  }

  /**
   * FeatureAccess findUniqueOrThrow
   */
  export type FeatureAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
    /**
     * Filter, which FeatureAccess to fetch.
     */
    where: FeatureAccessWhereUniqueInput
  }

  /**
   * FeatureAccess findFirst
   */
  export type FeatureAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
    /**
     * Filter, which FeatureAccess to fetch.
     */
    where?: FeatureAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureAccesses to fetch.
     */
    orderBy?: FeatureAccessOrderByWithRelationInput | FeatureAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeatureAccesses.
     */
    cursor?: FeatureAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeatureAccesses.
     */
    distinct?: FeatureAccessScalarFieldEnum | FeatureAccessScalarFieldEnum[]
  }

  /**
   * FeatureAccess findFirstOrThrow
   */
  export type FeatureAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
    /**
     * Filter, which FeatureAccess to fetch.
     */
    where?: FeatureAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureAccesses to fetch.
     */
    orderBy?: FeatureAccessOrderByWithRelationInput | FeatureAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeatureAccesses.
     */
    cursor?: FeatureAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeatureAccesses.
     */
    distinct?: FeatureAccessScalarFieldEnum | FeatureAccessScalarFieldEnum[]
  }

  /**
   * FeatureAccess findMany
   */
  export type FeatureAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
    /**
     * Filter, which FeatureAccesses to fetch.
     */
    where?: FeatureAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureAccesses to fetch.
     */
    orderBy?: FeatureAccessOrderByWithRelationInput | FeatureAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeatureAccesses.
     */
    cursor?: FeatureAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureAccesses.
     */
    skip?: number
    distinct?: FeatureAccessScalarFieldEnum | FeatureAccessScalarFieldEnum[]
  }

  /**
   * FeatureAccess create
   */
  export type FeatureAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
    /**
     * The data needed to create a FeatureAccess.
     */
    data: XOR<FeatureAccessCreateInput, FeatureAccessUncheckedCreateInput>
  }

  /**
   * FeatureAccess createMany
   */
  export type FeatureAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeatureAccesses.
     */
    data: FeatureAccessCreateManyInput | FeatureAccessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeatureAccess createManyAndReturn
   */
  export type FeatureAccessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
    /**
     * The data used to create many FeatureAccesses.
     */
    data: FeatureAccessCreateManyInput | FeatureAccessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeatureAccess update
   */
  export type FeatureAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
    /**
     * The data needed to update a FeatureAccess.
     */
    data: XOR<FeatureAccessUpdateInput, FeatureAccessUncheckedUpdateInput>
    /**
     * Choose, which FeatureAccess to update.
     */
    where: FeatureAccessWhereUniqueInput
  }

  /**
   * FeatureAccess updateMany
   */
  export type FeatureAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeatureAccesses.
     */
    data: XOR<FeatureAccessUpdateManyMutationInput, FeatureAccessUncheckedUpdateManyInput>
    /**
     * Filter which FeatureAccesses to update
     */
    where?: FeatureAccessWhereInput
    /**
     * Limit how many FeatureAccesses to update.
     */
    limit?: number
  }

  /**
   * FeatureAccess updateManyAndReturn
   */
  export type FeatureAccessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
    /**
     * The data used to update FeatureAccesses.
     */
    data: XOR<FeatureAccessUpdateManyMutationInput, FeatureAccessUncheckedUpdateManyInput>
    /**
     * Filter which FeatureAccesses to update
     */
    where?: FeatureAccessWhereInput
    /**
     * Limit how many FeatureAccesses to update.
     */
    limit?: number
  }

  /**
   * FeatureAccess upsert
   */
  export type FeatureAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
    /**
     * The filter to search for the FeatureAccess to update in case it exists.
     */
    where: FeatureAccessWhereUniqueInput
    /**
     * In case the FeatureAccess found by the `where` argument doesn't exist, create a new FeatureAccess with this data.
     */
    create: XOR<FeatureAccessCreateInput, FeatureAccessUncheckedCreateInput>
    /**
     * In case the FeatureAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeatureAccessUpdateInput, FeatureAccessUncheckedUpdateInput>
  }

  /**
   * FeatureAccess delete
   */
  export type FeatureAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
    /**
     * Filter which FeatureAccess to delete.
     */
    where: FeatureAccessWhereUniqueInput
  }

  /**
   * FeatureAccess deleteMany
   */
  export type FeatureAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeatureAccesses to delete
     */
    where?: FeatureAccessWhereInput
    /**
     * Limit how many FeatureAccesses to delete.
     */
    limit?: number
  }

  /**
   * FeatureAccess without action
   */
  export type FeatureAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureAccess
     */
    select?: FeatureAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeatureAccess
     */
    omit?: FeatureAccessOmit<ExtArgs> | null
  }


  /**
   * Model WordPack
   */

  export type AggregateWordPack = {
    _count: WordPackCountAggregateOutputType | null
    _avg: WordPackAvgAggregateOutputType | null
    _sum: WordPackSumAggregateOutputType | null
    _min: WordPackMinAggregateOutputType | null
    _max: WordPackMaxAggregateOutputType | null
  }

  export type WordPackAvgAggregateOutputType = {
    creditCost: number | null
    wordCount: number | null
  }

  export type WordPackSumAggregateOutputType = {
    creditCost: number | null
    wordCount: number | null
  }

  export type WordPackMinAggregateOutputType = {
    id: string | null
    packId: string | null
    title: string | null
    description: string | null
    category: $Enums.PackCategory | null
    requiredTier: $Enums.SubscriptionTier | null
    creditCost: number | null
    wordCount: number | null
    difficulty: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WordPackMaxAggregateOutputType = {
    id: string | null
    packId: string | null
    title: string | null
    description: string | null
    category: $Enums.PackCategory | null
    requiredTier: $Enums.SubscriptionTier | null
    creditCost: number | null
    wordCount: number | null
    difficulty: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WordPackCountAggregateOutputType = {
    id: number
    packId: number
    title: number
    description: number
    category: number
    requiredTier: number
    creditCost: number
    wordCount: number
    difficulty: number
    tags: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WordPackAvgAggregateInputType = {
    creditCost?: true
    wordCount?: true
  }

  export type WordPackSumAggregateInputType = {
    creditCost?: true
    wordCount?: true
  }

  export type WordPackMinAggregateInputType = {
    id?: true
    packId?: true
    title?: true
    description?: true
    category?: true
    requiredTier?: true
    creditCost?: true
    wordCount?: true
    difficulty?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WordPackMaxAggregateInputType = {
    id?: true
    packId?: true
    title?: true
    description?: true
    category?: true
    requiredTier?: true
    creditCost?: true
    wordCount?: true
    difficulty?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WordPackCountAggregateInputType = {
    id?: true
    packId?: true
    title?: true
    description?: true
    category?: true
    requiredTier?: true
    creditCost?: true
    wordCount?: true
    difficulty?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WordPackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WordPack to aggregate.
     */
    where?: WordPackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordPacks to fetch.
     */
    orderBy?: WordPackOrderByWithRelationInput | WordPackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WordPackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordPacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordPacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WordPacks
    **/
    _count?: true | WordPackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WordPackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WordPackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WordPackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WordPackMaxAggregateInputType
  }

  export type GetWordPackAggregateType<T extends WordPackAggregateArgs> = {
        [P in keyof T & keyof AggregateWordPack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWordPack[P]>
      : GetScalarType<T[P], AggregateWordPack[P]>
  }




  export type WordPackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WordPackWhereInput
    orderBy?: WordPackOrderByWithAggregationInput | WordPackOrderByWithAggregationInput[]
    by: WordPackScalarFieldEnum[] | WordPackScalarFieldEnum
    having?: WordPackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WordPackCountAggregateInputType | true
    _avg?: WordPackAvgAggregateInputType
    _sum?: WordPackSumAggregateInputType
    _min?: WordPackMinAggregateInputType
    _max?: WordPackMaxAggregateInputType
  }

  export type WordPackGroupByOutputType = {
    id: string
    packId: string
    title: string
    description: string | null
    category: $Enums.PackCategory
    requiredTier: $Enums.SubscriptionTier
    creditCost: number | null
    wordCount: number
    difficulty: string | null
    tags: string[]
    createdAt: Date
    updatedAt: Date
    _count: WordPackCountAggregateOutputType | null
    _avg: WordPackAvgAggregateOutputType | null
    _sum: WordPackSumAggregateOutputType | null
    _min: WordPackMinAggregateOutputType | null
    _max: WordPackMaxAggregateOutputType | null
  }

  type GetWordPackGroupByPayload<T extends WordPackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WordPackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WordPackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WordPackGroupByOutputType[P]>
            : GetScalarType<T[P], WordPackGroupByOutputType[P]>
        }
      >
    >


  export type WordPackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    requiredTier?: boolean
    creditCost?: boolean
    wordCount?: boolean
    difficulty?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    words?: boolean | WordPack$wordsArgs<ExtArgs>
    userProgress?: boolean | WordPack$userProgressArgs<ExtArgs>
    _count?: boolean | WordPackCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wordPack"]>

  export type WordPackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    requiredTier?: boolean
    creditCost?: boolean
    wordCount?: boolean
    difficulty?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["wordPack"]>

  export type WordPackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    requiredTier?: boolean
    creditCost?: boolean
    wordCount?: boolean
    difficulty?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["wordPack"]>

  export type WordPackSelectScalar = {
    id?: boolean
    packId?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    requiredTier?: boolean
    creditCost?: boolean
    wordCount?: boolean
    difficulty?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WordPackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "packId" | "title" | "description" | "category" | "requiredTier" | "creditCost" | "wordCount" | "difficulty" | "tags" | "createdAt" | "updatedAt", ExtArgs["result"]["wordPack"]>
  export type WordPackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    words?: boolean | WordPack$wordsArgs<ExtArgs>
    userProgress?: boolean | WordPack$userProgressArgs<ExtArgs>
    _count?: boolean | WordPackCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WordPackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type WordPackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WordPackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WordPack"
    objects: {
      words: Prisma.$WordPayload<ExtArgs>[]
      userProgress: Prisma.$UserPackProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      packId: string
      title: string
      description: string | null
      category: $Enums.PackCategory
      requiredTier: $Enums.SubscriptionTier
      creditCost: number | null
      wordCount: number
      difficulty: string | null
      tags: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wordPack"]>
    composites: {}
  }

  type WordPackGetPayload<S extends boolean | null | undefined | WordPackDefaultArgs> = $Result.GetResult<Prisma.$WordPackPayload, S>

  type WordPackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WordPackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WordPackCountAggregateInputType | true
    }

  export interface WordPackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WordPack'], meta: { name: 'WordPack' } }
    /**
     * Find zero or one WordPack that matches the filter.
     * @param {WordPackFindUniqueArgs} args - Arguments to find a WordPack
     * @example
     * // Get one WordPack
     * const wordPack = await prisma.wordPack.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WordPackFindUniqueArgs>(args: SelectSubset<T, WordPackFindUniqueArgs<ExtArgs>>): Prisma__WordPackClient<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WordPack that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WordPackFindUniqueOrThrowArgs} args - Arguments to find a WordPack
     * @example
     * // Get one WordPack
     * const wordPack = await prisma.wordPack.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WordPackFindUniqueOrThrowArgs>(args: SelectSubset<T, WordPackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WordPackClient<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WordPack that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPackFindFirstArgs} args - Arguments to find a WordPack
     * @example
     * // Get one WordPack
     * const wordPack = await prisma.wordPack.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WordPackFindFirstArgs>(args?: SelectSubset<T, WordPackFindFirstArgs<ExtArgs>>): Prisma__WordPackClient<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WordPack that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPackFindFirstOrThrowArgs} args - Arguments to find a WordPack
     * @example
     * // Get one WordPack
     * const wordPack = await prisma.wordPack.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WordPackFindFirstOrThrowArgs>(args?: SelectSubset<T, WordPackFindFirstOrThrowArgs<ExtArgs>>): Prisma__WordPackClient<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WordPacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WordPacks
     * const wordPacks = await prisma.wordPack.findMany()
     * 
     * // Get first 10 WordPacks
     * const wordPacks = await prisma.wordPack.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wordPackWithIdOnly = await prisma.wordPack.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WordPackFindManyArgs>(args?: SelectSubset<T, WordPackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WordPack.
     * @param {WordPackCreateArgs} args - Arguments to create a WordPack.
     * @example
     * // Create one WordPack
     * const WordPack = await prisma.wordPack.create({
     *   data: {
     *     // ... data to create a WordPack
     *   }
     * })
     * 
     */
    create<T extends WordPackCreateArgs>(args: SelectSubset<T, WordPackCreateArgs<ExtArgs>>): Prisma__WordPackClient<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WordPacks.
     * @param {WordPackCreateManyArgs} args - Arguments to create many WordPacks.
     * @example
     * // Create many WordPacks
     * const wordPack = await prisma.wordPack.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WordPackCreateManyArgs>(args?: SelectSubset<T, WordPackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WordPacks and returns the data saved in the database.
     * @param {WordPackCreateManyAndReturnArgs} args - Arguments to create many WordPacks.
     * @example
     * // Create many WordPacks
     * const wordPack = await prisma.wordPack.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WordPacks and only return the `id`
     * const wordPackWithIdOnly = await prisma.wordPack.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WordPackCreateManyAndReturnArgs>(args?: SelectSubset<T, WordPackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WordPack.
     * @param {WordPackDeleteArgs} args - Arguments to delete one WordPack.
     * @example
     * // Delete one WordPack
     * const WordPack = await prisma.wordPack.delete({
     *   where: {
     *     // ... filter to delete one WordPack
     *   }
     * })
     * 
     */
    delete<T extends WordPackDeleteArgs>(args: SelectSubset<T, WordPackDeleteArgs<ExtArgs>>): Prisma__WordPackClient<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WordPack.
     * @param {WordPackUpdateArgs} args - Arguments to update one WordPack.
     * @example
     * // Update one WordPack
     * const wordPack = await prisma.wordPack.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WordPackUpdateArgs>(args: SelectSubset<T, WordPackUpdateArgs<ExtArgs>>): Prisma__WordPackClient<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WordPacks.
     * @param {WordPackDeleteManyArgs} args - Arguments to filter WordPacks to delete.
     * @example
     * // Delete a few WordPacks
     * const { count } = await prisma.wordPack.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WordPackDeleteManyArgs>(args?: SelectSubset<T, WordPackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WordPacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WordPacks
     * const wordPack = await prisma.wordPack.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WordPackUpdateManyArgs>(args: SelectSubset<T, WordPackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WordPacks and returns the data updated in the database.
     * @param {WordPackUpdateManyAndReturnArgs} args - Arguments to update many WordPacks.
     * @example
     * // Update many WordPacks
     * const wordPack = await prisma.wordPack.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WordPacks and only return the `id`
     * const wordPackWithIdOnly = await prisma.wordPack.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WordPackUpdateManyAndReturnArgs>(args: SelectSubset<T, WordPackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WordPack.
     * @param {WordPackUpsertArgs} args - Arguments to update or create a WordPack.
     * @example
     * // Update or create a WordPack
     * const wordPack = await prisma.wordPack.upsert({
     *   create: {
     *     // ... data to create a WordPack
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WordPack we want to update
     *   }
     * })
     */
    upsert<T extends WordPackUpsertArgs>(args: SelectSubset<T, WordPackUpsertArgs<ExtArgs>>): Prisma__WordPackClient<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WordPacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPackCountArgs} args - Arguments to filter WordPacks to count.
     * @example
     * // Count the number of WordPacks
     * const count = await prisma.wordPack.count({
     *   where: {
     *     // ... the filter for the WordPacks we want to count
     *   }
     * })
    **/
    count<T extends WordPackCountArgs>(
      args?: Subset<T, WordPackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WordPackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WordPack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WordPackAggregateArgs>(args: Subset<T, WordPackAggregateArgs>): Prisma.PrismaPromise<GetWordPackAggregateType<T>>

    /**
     * Group by WordPack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordPackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WordPackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WordPackGroupByArgs['orderBy'] }
        : { orderBy?: WordPackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WordPackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWordPackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WordPack model
   */
  readonly fields: WordPackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WordPack.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WordPackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    words<T extends WordPack$wordsArgs<ExtArgs> = {}>(args?: Subset<T, WordPack$wordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userProgress<T extends WordPack$userProgressArgs<ExtArgs> = {}>(args?: Subset<T, WordPack$userProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WordPack model
   */
  interface WordPackFieldRefs {
    readonly id: FieldRef<"WordPack", 'String'>
    readonly packId: FieldRef<"WordPack", 'String'>
    readonly title: FieldRef<"WordPack", 'String'>
    readonly description: FieldRef<"WordPack", 'String'>
    readonly category: FieldRef<"WordPack", 'PackCategory'>
    readonly requiredTier: FieldRef<"WordPack", 'SubscriptionTier'>
    readonly creditCost: FieldRef<"WordPack", 'Int'>
    readonly wordCount: FieldRef<"WordPack", 'Int'>
    readonly difficulty: FieldRef<"WordPack", 'String'>
    readonly tags: FieldRef<"WordPack", 'String[]'>
    readonly createdAt: FieldRef<"WordPack", 'DateTime'>
    readonly updatedAt: FieldRef<"WordPack", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WordPack findUnique
   */
  export type WordPackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPackInclude<ExtArgs> | null
    /**
     * Filter, which WordPack to fetch.
     */
    where: WordPackWhereUniqueInput
  }

  /**
   * WordPack findUniqueOrThrow
   */
  export type WordPackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPackInclude<ExtArgs> | null
    /**
     * Filter, which WordPack to fetch.
     */
    where: WordPackWhereUniqueInput
  }

  /**
   * WordPack findFirst
   */
  export type WordPackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPackInclude<ExtArgs> | null
    /**
     * Filter, which WordPack to fetch.
     */
    where?: WordPackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordPacks to fetch.
     */
    orderBy?: WordPackOrderByWithRelationInput | WordPackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WordPacks.
     */
    cursor?: WordPackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordPacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordPacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WordPacks.
     */
    distinct?: WordPackScalarFieldEnum | WordPackScalarFieldEnum[]
  }

  /**
   * WordPack findFirstOrThrow
   */
  export type WordPackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPackInclude<ExtArgs> | null
    /**
     * Filter, which WordPack to fetch.
     */
    where?: WordPackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordPacks to fetch.
     */
    orderBy?: WordPackOrderByWithRelationInput | WordPackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WordPacks.
     */
    cursor?: WordPackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordPacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordPacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WordPacks.
     */
    distinct?: WordPackScalarFieldEnum | WordPackScalarFieldEnum[]
  }

  /**
   * WordPack findMany
   */
  export type WordPackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPackInclude<ExtArgs> | null
    /**
     * Filter, which WordPacks to fetch.
     */
    where?: WordPackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordPacks to fetch.
     */
    orderBy?: WordPackOrderByWithRelationInput | WordPackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WordPacks.
     */
    cursor?: WordPackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordPacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordPacks.
     */
    skip?: number
    distinct?: WordPackScalarFieldEnum | WordPackScalarFieldEnum[]
  }

  /**
   * WordPack create
   */
  export type WordPackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPackInclude<ExtArgs> | null
    /**
     * The data needed to create a WordPack.
     */
    data: XOR<WordPackCreateInput, WordPackUncheckedCreateInput>
  }

  /**
   * WordPack createMany
   */
  export type WordPackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WordPacks.
     */
    data: WordPackCreateManyInput | WordPackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WordPack createManyAndReturn
   */
  export type WordPackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * The data used to create many WordPacks.
     */
    data: WordPackCreateManyInput | WordPackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WordPack update
   */
  export type WordPackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPackInclude<ExtArgs> | null
    /**
     * The data needed to update a WordPack.
     */
    data: XOR<WordPackUpdateInput, WordPackUncheckedUpdateInput>
    /**
     * Choose, which WordPack to update.
     */
    where: WordPackWhereUniqueInput
  }

  /**
   * WordPack updateMany
   */
  export type WordPackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WordPacks.
     */
    data: XOR<WordPackUpdateManyMutationInput, WordPackUncheckedUpdateManyInput>
    /**
     * Filter which WordPacks to update
     */
    where?: WordPackWhereInput
    /**
     * Limit how many WordPacks to update.
     */
    limit?: number
  }

  /**
   * WordPack updateManyAndReturn
   */
  export type WordPackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * The data used to update WordPacks.
     */
    data: XOR<WordPackUpdateManyMutationInput, WordPackUncheckedUpdateManyInput>
    /**
     * Filter which WordPacks to update
     */
    where?: WordPackWhereInput
    /**
     * Limit how many WordPacks to update.
     */
    limit?: number
  }

  /**
   * WordPack upsert
   */
  export type WordPackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPackInclude<ExtArgs> | null
    /**
     * The filter to search for the WordPack to update in case it exists.
     */
    where: WordPackWhereUniqueInput
    /**
     * In case the WordPack found by the `where` argument doesn't exist, create a new WordPack with this data.
     */
    create: XOR<WordPackCreateInput, WordPackUncheckedCreateInput>
    /**
     * In case the WordPack was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WordPackUpdateInput, WordPackUncheckedUpdateInput>
  }

  /**
   * WordPack delete
   */
  export type WordPackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPackInclude<ExtArgs> | null
    /**
     * Filter which WordPack to delete.
     */
    where: WordPackWhereUniqueInput
  }

  /**
   * WordPack deleteMany
   */
  export type WordPackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WordPacks to delete
     */
    where?: WordPackWhereInput
    /**
     * Limit how many WordPacks to delete.
     */
    limit?: number
  }

  /**
   * WordPack.words
   */
  export type WordPack$wordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    where?: WordWhereInput
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    cursor?: WordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WordScalarFieldEnum | WordScalarFieldEnum[]
  }

  /**
   * WordPack.userProgress
   */
  export type WordPack$userProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
    where?: UserPackProgressWhereInput
    orderBy?: UserPackProgressOrderByWithRelationInput | UserPackProgressOrderByWithRelationInput[]
    cursor?: UserPackProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserPackProgressScalarFieldEnum | UserPackProgressScalarFieldEnum[]
  }

  /**
   * WordPack without action
   */
  export type WordPackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordPack
     */
    select?: WordPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WordPack
     */
    omit?: WordPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordPackInclude<ExtArgs> | null
  }


  /**
   * Model Word
   */

  export type AggregateWord = {
    _count: WordCountAggregateOutputType | null
    _min: WordMinAggregateOutputType | null
    _max: WordMaxAggregateOutputType | null
  }

  export type WordMinAggregateOutputType = {
    id: string | null
    packId: string | null
    word: string | null
    reading: string | null
    romaji: string | null
    meaning: string | null
    partOfSpeech: string | null
    example: string | null
    exampleTranslation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WordMaxAggregateOutputType = {
    id: string | null
    packId: string | null
    word: string | null
    reading: string | null
    romaji: string | null
    meaning: string | null
    partOfSpeech: string | null
    example: string | null
    exampleTranslation: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WordCountAggregateOutputType = {
    id: number
    packId: number
    word: number
    reading: number
    romaji: number
    meaning: number
    partOfSpeech: number
    example: number
    exampleTranslation: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WordMinAggregateInputType = {
    id?: true
    packId?: true
    word?: true
    reading?: true
    romaji?: true
    meaning?: true
    partOfSpeech?: true
    example?: true
    exampleTranslation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WordMaxAggregateInputType = {
    id?: true
    packId?: true
    word?: true
    reading?: true
    romaji?: true
    meaning?: true
    partOfSpeech?: true
    example?: true
    exampleTranslation?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WordCountAggregateInputType = {
    id?: true
    packId?: true
    word?: true
    reading?: true
    romaji?: true
    meaning?: true
    partOfSpeech?: true
    example?: true
    exampleTranslation?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Word to aggregate.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Words
    **/
    _count?: true | WordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WordMaxAggregateInputType
  }

  export type GetWordAggregateType<T extends WordAggregateArgs> = {
        [P in keyof T & keyof AggregateWord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWord[P]>
      : GetScalarType<T[P], AggregateWord[P]>
  }




  export type WordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WordWhereInput
    orderBy?: WordOrderByWithAggregationInput | WordOrderByWithAggregationInput[]
    by: WordScalarFieldEnum[] | WordScalarFieldEnum
    having?: WordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WordCountAggregateInputType | true
    _min?: WordMinAggregateInputType
    _max?: WordMaxAggregateInputType
  }

  export type WordGroupByOutputType = {
    id: string
    packId: string
    word: string
    reading: string | null
    romaji: string | null
    meaning: string
    partOfSpeech: string | null
    example: string | null
    exampleTranslation: string | null
    createdAt: Date
    updatedAt: Date
    _count: WordCountAggregateOutputType | null
    _min: WordMinAggregateOutputType | null
    _max: WordMaxAggregateOutputType | null
  }

  type GetWordGroupByPayload<T extends WordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WordGroupByOutputType[P]>
            : GetScalarType<T[P], WordGroupByOutputType[P]>
        }
      >
    >


  export type WordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packId?: boolean
    word?: boolean
    reading?: boolean
    romaji?: boolean
    meaning?: boolean
    partOfSpeech?: boolean
    example?: boolean
    exampleTranslation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
    vocabulary?: boolean | Word$vocabularyArgs<ExtArgs>
    _count?: boolean | WordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["word"]>

  export type WordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packId?: boolean
    word?: boolean
    reading?: boolean
    romaji?: boolean
    meaning?: boolean
    partOfSpeech?: boolean
    example?: boolean
    exampleTranslation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["word"]>

  export type WordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    packId?: boolean
    word?: boolean
    reading?: boolean
    romaji?: boolean
    meaning?: boolean
    partOfSpeech?: boolean
    example?: boolean
    exampleTranslation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["word"]>

  export type WordSelectScalar = {
    id?: boolean
    packId?: boolean
    word?: boolean
    reading?: boolean
    romaji?: boolean
    meaning?: boolean
    partOfSpeech?: boolean
    example?: boolean
    exampleTranslation?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "packId" | "word" | "reading" | "romaji" | "meaning" | "partOfSpeech" | "example" | "exampleTranslation" | "createdAt" | "updatedAt", ExtArgs["result"]["word"]>
  export type WordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
    vocabulary?: boolean | Word$vocabularyArgs<ExtArgs>
    _count?: boolean | WordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
  }
  export type WordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
  }

  export type $WordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Word"
    objects: {
      pack: Prisma.$WordPackPayload<ExtArgs>
      vocabulary: Prisma.$VocabularyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      packId: string
      word: string
      reading: string | null
      romaji: string | null
      meaning: string
      partOfSpeech: string | null
      example: string | null
      exampleTranslation: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["word"]>
    composites: {}
  }

  type WordGetPayload<S extends boolean | null | undefined | WordDefaultArgs> = $Result.GetResult<Prisma.$WordPayload, S>

  type WordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WordCountAggregateInputType | true
    }

  export interface WordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Word'], meta: { name: 'Word' } }
    /**
     * Find zero or one Word that matches the filter.
     * @param {WordFindUniqueArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WordFindUniqueArgs>(args: SelectSubset<T, WordFindUniqueArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Word that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WordFindUniqueOrThrowArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WordFindUniqueOrThrowArgs>(args: SelectSubset<T, WordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Word that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindFirstArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WordFindFirstArgs>(args?: SelectSubset<T, WordFindFirstArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Word that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindFirstOrThrowArgs} args - Arguments to find a Word
     * @example
     * // Get one Word
     * const word = await prisma.word.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WordFindFirstOrThrowArgs>(args?: SelectSubset<T, WordFindFirstOrThrowArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Words that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Words
     * const words = await prisma.word.findMany()
     * 
     * // Get first 10 Words
     * const words = await prisma.word.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wordWithIdOnly = await prisma.word.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WordFindManyArgs>(args?: SelectSubset<T, WordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Word.
     * @param {WordCreateArgs} args - Arguments to create a Word.
     * @example
     * // Create one Word
     * const Word = await prisma.word.create({
     *   data: {
     *     // ... data to create a Word
     *   }
     * })
     * 
     */
    create<T extends WordCreateArgs>(args: SelectSubset<T, WordCreateArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Words.
     * @param {WordCreateManyArgs} args - Arguments to create many Words.
     * @example
     * // Create many Words
     * const word = await prisma.word.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WordCreateManyArgs>(args?: SelectSubset<T, WordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Words and returns the data saved in the database.
     * @param {WordCreateManyAndReturnArgs} args - Arguments to create many Words.
     * @example
     * // Create many Words
     * const word = await prisma.word.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Words and only return the `id`
     * const wordWithIdOnly = await prisma.word.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WordCreateManyAndReturnArgs>(args?: SelectSubset<T, WordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Word.
     * @param {WordDeleteArgs} args - Arguments to delete one Word.
     * @example
     * // Delete one Word
     * const Word = await prisma.word.delete({
     *   where: {
     *     // ... filter to delete one Word
     *   }
     * })
     * 
     */
    delete<T extends WordDeleteArgs>(args: SelectSubset<T, WordDeleteArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Word.
     * @param {WordUpdateArgs} args - Arguments to update one Word.
     * @example
     * // Update one Word
     * const word = await prisma.word.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WordUpdateArgs>(args: SelectSubset<T, WordUpdateArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Words.
     * @param {WordDeleteManyArgs} args - Arguments to filter Words to delete.
     * @example
     * // Delete a few Words
     * const { count } = await prisma.word.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WordDeleteManyArgs>(args?: SelectSubset<T, WordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Words.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Words
     * const word = await prisma.word.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WordUpdateManyArgs>(args: SelectSubset<T, WordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Words and returns the data updated in the database.
     * @param {WordUpdateManyAndReturnArgs} args - Arguments to update many Words.
     * @example
     * // Update many Words
     * const word = await prisma.word.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Words and only return the `id`
     * const wordWithIdOnly = await prisma.word.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WordUpdateManyAndReturnArgs>(args: SelectSubset<T, WordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Word.
     * @param {WordUpsertArgs} args - Arguments to update or create a Word.
     * @example
     * // Update or create a Word
     * const word = await prisma.word.upsert({
     *   create: {
     *     // ... data to create a Word
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Word we want to update
     *   }
     * })
     */
    upsert<T extends WordUpsertArgs>(args: SelectSubset<T, WordUpsertArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Words.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordCountArgs} args - Arguments to filter Words to count.
     * @example
     * // Count the number of Words
     * const count = await prisma.word.count({
     *   where: {
     *     // ... the filter for the Words we want to count
     *   }
     * })
    **/
    count<T extends WordCountArgs>(
      args?: Subset<T, WordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Word.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WordAggregateArgs>(args: Subset<T, WordAggregateArgs>): Prisma.PrismaPromise<GetWordAggregateType<T>>

    /**
     * Group by Word.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WordGroupByArgs['orderBy'] }
        : { orderBy?: WordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Word model
   */
  readonly fields: WordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Word.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pack<T extends WordPackDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WordPackDefaultArgs<ExtArgs>>): Prisma__WordPackClient<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vocabulary<T extends Word$vocabularyArgs<ExtArgs> = {}>(args?: Subset<T, Word$vocabularyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Word model
   */
  interface WordFieldRefs {
    readonly id: FieldRef<"Word", 'String'>
    readonly packId: FieldRef<"Word", 'String'>
    readonly word: FieldRef<"Word", 'String'>
    readonly reading: FieldRef<"Word", 'String'>
    readonly romaji: FieldRef<"Word", 'String'>
    readonly meaning: FieldRef<"Word", 'String'>
    readonly partOfSpeech: FieldRef<"Word", 'String'>
    readonly example: FieldRef<"Word", 'String'>
    readonly exampleTranslation: FieldRef<"Word", 'String'>
    readonly createdAt: FieldRef<"Word", 'DateTime'>
    readonly updatedAt: FieldRef<"Word", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Word findUnique
   */
  export type WordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word findUniqueOrThrow
   */
  export type WordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word findFirst
   */
  export type WordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Words.
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Words.
     */
    distinct?: WordScalarFieldEnum | WordScalarFieldEnum[]
  }

  /**
   * Word findFirstOrThrow
   */
  export type WordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Word to fetch.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Words.
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Words.
     */
    distinct?: WordScalarFieldEnum | WordScalarFieldEnum[]
  }

  /**
   * Word findMany
   */
  export type WordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter, which Words to fetch.
     */
    where?: WordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Words to fetch.
     */
    orderBy?: WordOrderByWithRelationInput | WordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Words.
     */
    cursor?: WordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Words from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Words.
     */
    skip?: number
    distinct?: WordScalarFieldEnum | WordScalarFieldEnum[]
  }

  /**
   * Word create
   */
  export type WordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * The data needed to create a Word.
     */
    data: XOR<WordCreateInput, WordUncheckedCreateInput>
  }

  /**
   * Word createMany
   */
  export type WordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Words.
     */
    data: WordCreateManyInput | WordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Word createManyAndReturn
   */
  export type WordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * The data used to create many Words.
     */
    data: WordCreateManyInput | WordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Word update
   */
  export type WordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * The data needed to update a Word.
     */
    data: XOR<WordUpdateInput, WordUncheckedUpdateInput>
    /**
     * Choose, which Word to update.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word updateMany
   */
  export type WordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Words.
     */
    data: XOR<WordUpdateManyMutationInput, WordUncheckedUpdateManyInput>
    /**
     * Filter which Words to update
     */
    where?: WordWhereInput
    /**
     * Limit how many Words to update.
     */
    limit?: number
  }

  /**
   * Word updateManyAndReturn
   */
  export type WordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * The data used to update Words.
     */
    data: XOR<WordUpdateManyMutationInput, WordUncheckedUpdateManyInput>
    /**
     * Filter which Words to update
     */
    where?: WordWhereInput
    /**
     * Limit how many Words to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Word upsert
   */
  export type WordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * The filter to search for the Word to update in case it exists.
     */
    where: WordWhereUniqueInput
    /**
     * In case the Word found by the `where` argument doesn't exist, create a new Word with this data.
     */
    create: XOR<WordCreateInput, WordUncheckedCreateInput>
    /**
     * In case the Word was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WordUpdateInput, WordUncheckedUpdateInput>
  }

  /**
   * Word delete
   */
  export type WordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
    /**
     * Filter which Word to delete.
     */
    where: WordWhereUniqueInput
  }

  /**
   * Word deleteMany
   */
  export type WordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Words to delete
     */
    where?: WordWhereInput
    /**
     * Limit how many Words to delete.
     */
    limit?: number
  }

  /**
   * Word.vocabulary
   */
  export type Word$vocabularyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
    where?: VocabularyWhereInput
    orderBy?: VocabularyOrderByWithRelationInput | VocabularyOrderByWithRelationInput[]
    cursor?: VocabularyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VocabularyScalarFieldEnum | VocabularyScalarFieldEnum[]
  }

  /**
   * Word without action
   */
  export type WordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Word
     */
    select?: WordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Word
     */
    omit?: WordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordInclude<ExtArgs> | null
  }


  /**
   * Model UserPackProgress
   */

  export type AggregateUserPackProgress = {
    _count: UserPackProgressCountAggregateOutputType | null
    _avg: UserPackProgressAvgAggregateOutputType | null
    _sum: UserPackProgressSumAggregateOutputType | null
    _min: UserPackProgressMinAggregateOutputType | null
    _max: UserPackProgressMaxAggregateOutputType | null
  }

  export type UserPackProgressAvgAggregateOutputType = {
    wordsLearned: number | null
    wordsReviewed: number | null
    accuracy: Decimal | null
  }

  export type UserPackProgressSumAggregateOutputType = {
    wordsLearned: number | null
    wordsReviewed: number | null
    accuracy: Decimal | null
  }

  export type UserPackProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    packId: string | null
    wordsLearned: number | null
    wordsReviewed: number | null
    accuracy: Decimal | null
    lastStudiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserPackProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    packId: string | null
    wordsLearned: number | null
    wordsReviewed: number | null
    accuracy: Decimal | null
    lastStudiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserPackProgressCountAggregateOutputType = {
    id: number
    userId: number
    packId: number
    wordsLearned: number
    wordsReviewed: number
    accuracy: number
    lastStudiedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserPackProgressAvgAggregateInputType = {
    wordsLearned?: true
    wordsReviewed?: true
    accuracy?: true
  }

  export type UserPackProgressSumAggregateInputType = {
    wordsLearned?: true
    wordsReviewed?: true
    accuracy?: true
  }

  export type UserPackProgressMinAggregateInputType = {
    id?: true
    userId?: true
    packId?: true
    wordsLearned?: true
    wordsReviewed?: true
    accuracy?: true
    lastStudiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserPackProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    packId?: true
    wordsLearned?: true
    wordsReviewed?: true
    accuracy?: true
    lastStudiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserPackProgressCountAggregateInputType = {
    id?: true
    userId?: true
    packId?: true
    wordsLearned?: true
    wordsReviewed?: true
    accuracy?: true
    lastStudiedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserPackProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPackProgress to aggregate.
     */
    where?: UserPackProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPackProgresses to fetch.
     */
    orderBy?: UserPackProgressOrderByWithRelationInput | UserPackProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserPackProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPackProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPackProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserPackProgresses
    **/
    _count?: true | UserPackProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserPackProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserPackProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserPackProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserPackProgressMaxAggregateInputType
  }

  export type GetUserPackProgressAggregateType<T extends UserPackProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateUserPackProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserPackProgress[P]>
      : GetScalarType<T[P], AggregateUserPackProgress[P]>
  }




  export type UserPackProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPackProgressWhereInput
    orderBy?: UserPackProgressOrderByWithAggregationInput | UserPackProgressOrderByWithAggregationInput[]
    by: UserPackProgressScalarFieldEnum[] | UserPackProgressScalarFieldEnum
    having?: UserPackProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserPackProgressCountAggregateInputType | true
    _avg?: UserPackProgressAvgAggregateInputType
    _sum?: UserPackProgressSumAggregateInputType
    _min?: UserPackProgressMinAggregateInputType
    _max?: UserPackProgressMaxAggregateInputType
  }

  export type UserPackProgressGroupByOutputType = {
    id: string
    userId: string
    packId: string
    wordsLearned: number
    wordsReviewed: number
    accuracy: Decimal
    lastStudiedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserPackProgressCountAggregateOutputType | null
    _avg: UserPackProgressAvgAggregateOutputType | null
    _sum: UserPackProgressSumAggregateOutputType | null
    _min: UserPackProgressMinAggregateOutputType | null
    _max: UserPackProgressMaxAggregateOutputType | null
  }

  type GetUserPackProgressGroupByPayload<T extends UserPackProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserPackProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserPackProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserPackProgressGroupByOutputType[P]>
            : GetScalarType<T[P], UserPackProgressGroupByOutputType[P]>
        }
      >
    >


  export type UserPackProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    packId?: boolean
    wordsLearned?: boolean
    wordsReviewed?: boolean
    accuracy?: boolean
    lastStudiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPackProgress"]>

  export type UserPackProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    packId?: boolean
    wordsLearned?: boolean
    wordsReviewed?: boolean
    accuracy?: boolean
    lastStudiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPackProgress"]>

  export type UserPackProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    packId?: boolean
    wordsLearned?: boolean
    wordsReviewed?: boolean
    accuracy?: boolean
    lastStudiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPackProgress"]>

  export type UserPackProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    packId?: boolean
    wordsLearned?: boolean
    wordsReviewed?: boolean
    accuracy?: boolean
    lastStudiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserPackProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "packId" | "wordsLearned" | "wordsReviewed" | "accuracy" | "lastStudiedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["userPackProgress"]>
  export type UserPackProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
  }
  export type UserPackProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
  }
  export type UserPackProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pack?: boolean | WordPackDefaultArgs<ExtArgs>
  }

  export type $UserPackProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserPackProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      pack: Prisma.$WordPackPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      packId: string
      wordsLearned: number
      wordsReviewed: number
      accuracy: Prisma.Decimal
      lastStudiedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userPackProgress"]>
    composites: {}
  }

  type UserPackProgressGetPayload<S extends boolean | null | undefined | UserPackProgressDefaultArgs> = $Result.GetResult<Prisma.$UserPackProgressPayload, S>

  type UserPackProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserPackProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserPackProgressCountAggregateInputType | true
    }

  export interface UserPackProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserPackProgress'], meta: { name: 'UserPackProgress' } }
    /**
     * Find zero or one UserPackProgress that matches the filter.
     * @param {UserPackProgressFindUniqueArgs} args - Arguments to find a UserPackProgress
     * @example
     * // Get one UserPackProgress
     * const userPackProgress = await prisma.userPackProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserPackProgressFindUniqueArgs>(args: SelectSubset<T, UserPackProgressFindUniqueArgs<ExtArgs>>): Prisma__UserPackProgressClient<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserPackProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserPackProgressFindUniqueOrThrowArgs} args - Arguments to find a UserPackProgress
     * @example
     * // Get one UserPackProgress
     * const userPackProgress = await prisma.userPackProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserPackProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, UserPackProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserPackProgressClient<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPackProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPackProgressFindFirstArgs} args - Arguments to find a UserPackProgress
     * @example
     * // Get one UserPackProgress
     * const userPackProgress = await prisma.userPackProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserPackProgressFindFirstArgs>(args?: SelectSubset<T, UserPackProgressFindFirstArgs<ExtArgs>>): Prisma__UserPackProgressClient<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserPackProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPackProgressFindFirstOrThrowArgs} args - Arguments to find a UserPackProgress
     * @example
     * // Get one UserPackProgress
     * const userPackProgress = await prisma.userPackProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserPackProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, UserPackProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserPackProgressClient<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserPackProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPackProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserPackProgresses
     * const userPackProgresses = await prisma.userPackProgress.findMany()
     * 
     * // Get first 10 UserPackProgresses
     * const userPackProgresses = await prisma.userPackProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userPackProgressWithIdOnly = await prisma.userPackProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserPackProgressFindManyArgs>(args?: SelectSubset<T, UserPackProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserPackProgress.
     * @param {UserPackProgressCreateArgs} args - Arguments to create a UserPackProgress.
     * @example
     * // Create one UserPackProgress
     * const UserPackProgress = await prisma.userPackProgress.create({
     *   data: {
     *     // ... data to create a UserPackProgress
     *   }
     * })
     * 
     */
    create<T extends UserPackProgressCreateArgs>(args: SelectSubset<T, UserPackProgressCreateArgs<ExtArgs>>): Prisma__UserPackProgressClient<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserPackProgresses.
     * @param {UserPackProgressCreateManyArgs} args - Arguments to create many UserPackProgresses.
     * @example
     * // Create many UserPackProgresses
     * const userPackProgress = await prisma.userPackProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserPackProgressCreateManyArgs>(args?: SelectSubset<T, UserPackProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserPackProgresses and returns the data saved in the database.
     * @param {UserPackProgressCreateManyAndReturnArgs} args - Arguments to create many UserPackProgresses.
     * @example
     * // Create many UserPackProgresses
     * const userPackProgress = await prisma.userPackProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserPackProgresses and only return the `id`
     * const userPackProgressWithIdOnly = await prisma.userPackProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserPackProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, UserPackProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserPackProgress.
     * @param {UserPackProgressDeleteArgs} args - Arguments to delete one UserPackProgress.
     * @example
     * // Delete one UserPackProgress
     * const UserPackProgress = await prisma.userPackProgress.delete({
     *   where: {
     *     // ... filter to delete one UserPackProgress
     *   }
     * })
     * 
     */
    delete<T extends UserPackProgressDeleteArgs>(args: SelectSubset<T, UserPackProgressDeleteArgs<ExtArgs>>): Prisma__UserPackProgressClient<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserPackProgress.
     * @param {UserPackProgressUpdateArgs} args - Arguments to update one UserPackProgress.
     * @example
     * // Update one UserPackProgress
     * const userPackProgress = await prisma.userPackProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserPackProgressUpdateArgs>(args: SelectSubset<T, UserPackProgressUpdateArgs<ExtArgs>>): Prisma__UserPackProgressClient<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserPackProgresses.
     * @param {UserPackProgressDeleteManyArgs} args - Arguments to filter UserPackProgresses to delete.
     * @example
     * // Delete a few UserPackProgresses
     * const { count } = await prisma.userPackProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserPackProgressDeleteManyArgs>(args?: SelectSubset<T, UserPackProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPackProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPackProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserPackProgresses
     * const userPackProgress = await prisma.userPackProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserPackProgressUpdateManyArgs>(args: SelectSubset<T, UserPackProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPackProgresses and returns the data updated in the database.
     * @param {UserPackProgressUpdateManyAndReturnArgs} args - Arguments to update many UserPackProgresses.
     * @example
     * // Update many UserPackProgresses
     * const userPackProgress = await prisma.userPackProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserPackProgresses and only return the `id`
     * const userPackProgressWithIdOnly = await prisma.userPackProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserPackProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, UserPackProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserPackProgress.
     * @param {UserPackProgressUpsertArgs} args - Arguments to update or create a UserPackProgress.
     * @example
     * // Update or create a UserPackProgress
     * const userPackProgress = await prisma.userPackProgress.upsert({
     *   create: {
     *     // ... data to create a UserPackProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserPackProgress we want to update
     *   }
     * })
     */
    upsert<T extends UserPackProgressUpsertArgs>(args: SelectSubset<T, UserPackProgressUpsertArgs<ExtArgs>>): Prisma__UserPackProgressClient<$Result.GetResult<Prisma.$UserPackProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserPackProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPackProgressCountArgs} args - Arguments to filter UserPackProgresses to count.
     * @example
     * // Count the number of UserPackProgresses
     * const count = await prisma.userPackProgress.count({
     *   where: {
     *     // ... the filter for the UserPackProgresses we want to count
     *   }
     * })
    **/
    count<T extends UserPackProgressCountArgs>(
      args?: Subset<T, UserPackProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserPackProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserPackProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPackProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserPackProgressAggregateArgs>(args: Subset<T, UserPackProgressAggregateArgs>): Prisma.PrismaPromise<GetUserPackProgressAggregateType<T>>

    /**
     * Group by UserPackProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPackProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserPackProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserPackProgressGroupByArgs['orderBy'] }
        : { orderBy?: UserPackProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserPackProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserPackProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserPackProgress model
   */
  readonly fields: UserPackProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserPackProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserPackProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pack<T extends WordPackDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WordPackDefaultArgs<ExtArgs>>): Prisma__WordPackClient<$Result.GetResult<Prisma.$WordPackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserPackProgress model
   */
  interface UserPackProgressFieldRefs {
    readonly id: FieldRef<"UserPackProgress", 'String'>
    readonly userId: FieldRef<"UserPackProgress", 'String'>
    readonly packId: FieldRef<"UserPackProgress", 'String'>
    readonly wordsLearned: FieldRef<"UserPackProgress", 'Int'>
    readonly wordsReviewed: FieldRef<"UserPackProgress", 'Int'>
    readonly accuracy: FieldRef<"UserPackProgress", 'Decimal'>
    readonly lastStudiedAt: FieldRef<"UserPackProgress", 'DateTime'>
    readonly createdAt: FieldRef<"UserPackProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"UserPackProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserPackProgress findUnique
   */
  export type UserPackProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserPackProgress to fetch.
     */
    where: UserPackProgressWhereUniqueInput
  }

  /**
   * UserPackProgress findUniqueOrThrow
   */
  export type UserPackProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserPackProgress to fetch.
     */
    where: UserPackProgressWhereUniqueInput
  }

  /**
   * UserPackProgress findFirst
   */
  export type UserPackProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserPackProgress to fetch.
     */
    where?: UserPackProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPackProgresses to fetch.
     */
    orderBy?: UserPackProgressOrderByWithRelationInput | UserPackProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPackProgresses.
     */
    cursor?: UserPackProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPackProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPackProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPackProgresses.
     */
    distinct?: UserPackProgressScalarFieldEnum | UserPackProgressScalarFieldEnum[]
  }

  /**
   * UserPackProgress findFirstOrThrow
   */
  export type UserPackProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserPackProgress to fetch.
     */
    where?: UserPackProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPackProgresses to fetch.
     */
    orderBy?: UserPackProgressOrderByWithRelationInput | UserPackProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPackProgresses.
     */
    cursor?: UserPackProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPackProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPackProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPackProgresses.
     */
    distinct?: UserPackProgressScalarFieldEnum | UserPackProgressScalarFieldEnum[]
  }

  /**
   * UserPackProgress findMany
   */
  export type UserPackProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserPackProgresses to fetch.
     */
    where?: UserPackProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPackProgresses to fetch.
     */
    orderBy?: UserPackProgressOrderByWithRelationInput | UserPackProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserPackProgresses.
     */
    cursor?: UserPackProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPackProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPackProgresses.
     */
    skip?: number
    distinct?: UserPackProgressScalarFieldEnum | UserPackProgressScalarFieldEnum[]
  }

  /**
   * UserPackProgress create
   */
  export type UserPackProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a UserPackProgress.
     */
    data: XOR<UserPackProgressCreateInput, UserPackProgressUncheckedCreateInput>
  }

  /**
   * UserPackProgress createMany
   */
  export type UserPackProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserPackProgresses.
     */
    data: UserPackProgressCreateManyInput | UserPackProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserPackProgress createManyAndReturn
   */
  export type UserPackProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * The data used to create many UserPackProgresses.
     */
    data: UserPackProgressCreateManyInput | UserPackProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserPackProgress update
   */
  export type UserPackProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a UserPackProgress.
     */
    data: XOR<UserPackProgressUpdateInput, UserPackProgressUncheckedUpdateInput>
    /**
     * Choose, which UserPackProgress to update.
     */
    where: UserPackProgressWhereUniqueInput
  }

  /**
   * UserPackProgress updateMany
   */
  export type UserPackProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserPackProgresses.
     */
    data: XOR<UserPackProgressUpdateManyMutationInput, UserPackProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserPackProgresses to update
     */
    where?: UserPackProgressWhereInput
    /**
     * Limit how many UserPackProgresses to update.
     */
    limit?: number
  }

  /**
   * UserPackProgress updateManyAndReturn
   */
  export type UserPackProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * The data used to update UserPackProgresses.
     */
    data: XOR<UserPackProgressUpdateManyMutationInput, UserPackProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserPackProgresses to update
     */
    where?: UserPackProgressWhereInput
    /**
     * Limit how many UserPackProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserPackProgress upsert
   */
  export type UserPackProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the UserPackProgress to update in case it exists.
     */
    where: UserPackProgressWhereUniqueInput
    /**
     * In case the UserPackProgress found by the `where` argument doesn't exist, create a new UserPackProgress with this data.
     */
    create: XOR<UserPackProgressCreateInput, UserPackProgressUncheckedCreateInput>
    /**
     * In case the UserPackProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserPackProgressUpdateInput, UserPackProgressUncheckedUpdateInput>
  }

  /**
   * UserPackProgress delete
   */
  export type UserPackProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
    /**
     * Filter which UserPackProgress to delete.
     */
    where: UserPackProgressWhereUniqueInput
  }

  /**
   * UserPackProgress deleteMany
   */
  export type UserPackProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPackProgresses to delete
     */
    where?: UserPackProgressWhereInput
    /**
     * Limit how many UserPackProgresses to delete.
     */
    limit?: number
  }

  /**
   * UserPackProgress without action
   */
  export type UserPackProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPackProgress
     */
    select?: UserPackProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserPackProgress
     */
    omit?: UserPackProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserPackProgressInclude<ExtArgs> | null
  }


  /**
   * Model Vocabulary
   */

  export type AggregateVocabulary = {
    _count: VocabularyCountAggregateOutputType | null
    _avg: VocabularyAvgAggregateOutputType | null
    _sum: VocabularySumAggregateOutputType | null
    _min: VocabularyMinAggregateOutputType | null
    _max: VocabularyMaxAggregateOutputType | null
  }

  export type VocabularyAvgAggregateOutputType = {
    repetitions: number | null
    easeFactor: Decimal | null
    interval: number | null
    correctCount: number | null
    incorrectCount: number | null
  }

  export type VocabularySumAggregateOutputType = {
    repetitions: number | null
    easeFactor: Decimal | null
    interval: number | null
    correctCount: number | null
    incorrectCount: number | null
  }

  export type VocabularyMinAggregateOutputType = {
    id: string | null
    userId: string | null
    wordId: string | null
    level: $Enums.VocabularyLevel | null
    repetitions: number | null
    easeFactor: Decimal | null
    interval: number | null
    nextReviewAt: Date | null
    correctCount: number | null
    incorrectCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastReviewedAt: Date | null
  }

  export type VocabularyMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    wordId: string | null
    level: $Enums.VocabularyLevel | null
    repetitions: number | null
    easeFactor: Decimal | null
    interval: number | null
    nextReviewAt: Date | null
    correctCount: number | null
    incorrectCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastReviewedAt: Date | null
  }

  export type VocabularyCountAggregateOutputType = {
    id: number
    userId: number
    wordId: number
    level: number
    repetitions: number
    easeFactor: number
    interval: number
    nextReviewAt: number
    correctCount: number
    incorrectCount: number
    createdAt: number
    updatedAt: number
    lastReviewedAt: number
    _all: number
  }


  export type VocabularyAvgAggregateInputType = {
    repetitions?: true
    easeFactor?: true
    interval?: true
    correctCount?: true
    incorrectCount?: true
  }

  export type VocabularySumAggregateInputType = {
    repetitions?: true
    easeFactor?: true
    interval?: true
    correctCount?: true
    incorrectCount?: true
  }

  export type VocabularyMinAggregateInputType = {
    id?: true
    userId?: true
    wordId?: true
    level?: true
    repetitions?: true
    easeFactor?: true
    interval?: true
    nextReviewAt?: true
    correctCount?: true
    incorrectCount?: true
    createdAt?: true
    updatedAt?: true
    lastReviewedAt?: true
  }

  export type VocabularyMaxAggregateInputType = {
    id?: true
    userId?: true
    wordId?: true
    level?: true
    repetitions?: true
    easeFactor?: true
    interval?: true
    nextReviewAt?: true
    correctCount?: true
    incorrectCount?: true
    createdAt?: true
    updatedAt?: true
    lastReviewedAt?: true
  }

  export type VocabularyCountAggregateInputType = {
    id?: true
    userId?: true
    wordId?: true
    level?: true
    repetitions?: true
    easeFactor?: true
    interval?: true
    nextReviewAt?: true
    correctCount?: true
    incorrectCount?: true
    createdAt?: true
    updatedAt?: true
    lastReviewedAt?: true
    _all?: true
  }

  export type VocabularyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vocabulary to aggregate.
     */
    where?: VocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vocabularies to fetch.
     */
    orderBy?: VocabularyOrderByWithRelationInput | VocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vocabularies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vocabularies
    **/
    _count?: true | VocabularyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VocabularyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VocabularySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VocabularyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VocabularyMaxAggregateInputType
  }

  export type GetVocabularyAggregateType<T extends VocabularyAggregateArgs> = {
        [P in keyof T & keyof AggregateVocabulary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVocabulary[P]>
      : GetScalarType<T[P], AggregateVocabulary[P]>
  }




  export type VocabularyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VocabularyWhereInput
    orderBy?: VocabularyOrderByWithAggregationInput | VocabularyOrderByWithAggregationInput[]
    by: VocabularyScalarFieldEnum[] | VocabularyScalarFieldEnum
    having?: VocabularyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VocabularyCountAggregateInputType | true
    _avg?: VocabularyAvgAggregateInputType
    _sum?: VocabularySumAggregateInputType
    _min?: VocabularyMinAggregateInputType
    _max?: VocabularyMaxAggregateInputType
  }

  export type VocabularyGroupByOutputType = {
    id: string
    userId: string
    wordId: string
    level: $Enums.VocabularyLevel
    repetitions: number
    easeFactor: Decimal
    interval: number
    nextReviewAt: Date | null
    correctCount: number
    incorrectCount: number
    createdAt: Date
    updatedAt: Date
    lastReviewedAt: Date | null
    _count: VocabularyCountAggregateOutputType | null
    _avg: VocabularyAvgAggregateOutputType | null
    _sum: VocabularySumAggregateOutputType | null
    _min: VocabularyMinAggregateOutputType | null
    _max: VocabularyMaxAggregateOutputType | null
  }

  type GetVocabularyGroupByPayload<T extends VocabularyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VocabularyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VocabularyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VocabularyGroupByOutputType[P]>
            : GetScalarType<T[P], VocabularyGroupByOutputType[P]>
        }
      >
    >


  export type VocabularySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    wordId?: boolean
    level?: boolean
    repetitions?: boolean
    easeFactor?: boolean
    interval?: boolean
    nextReviewAt?: boolean
    correctCount?: boolean
    incorrectCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastReviewedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vocabulary"]>

  export type VocabularySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    wordId?: boolean
    level?: boolean
    repetitions?: boolean
    easeFactor?: boolean
    interval?: boolean
    nextReviewAt?: boolean
    correctCount?: boolean
    incorrectCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastReviewedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vocabulary"]>

  export type VocabularySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    wordId?: boolean
    level?: boolean
    repetitions?: boolean
    easeFactor?: boolean
    interval?: boolean
    nextReviewAt?: boolean
    correctCount?: boolean
    incorrectCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastReviewedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vocabulary"]>

  export type VocabularySelectScalar = {
    id?: boolean
    userId?: boolean
    wordId?: boolean
    level?: boolean
    repetitions?: boolean
    easeFactor?: boolean
    interval?: boolean
    nextReviewAt?: boolean
    correctCount?: boolean
    incorrectCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastReviewedAt?: boolean
  }

  export type VocabularyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "wordId" | "level" | "repetitions" | "easeFactor" | "interval" | "nextReviewAt" | "correctCount" | "incorrectCount" | "createdAt" | "updatedAt" | "lastReviewedAt", ExtArgs["result"]["vocabulary"]>
  export type VocabularyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }
  export type VocabularyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }
  export type VocabularyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    word?: boolean | WordDefaultArgs<ExtArgs>
  }

  export type $VocabularyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vocabulary"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      word: Prisma.$WordPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      wordId: string
      level: $Enums.VocabularyLevel
      repetitions: number
      easeFactor: Prisma.Decimal
      interval: number
      nextReviewAt: Date | null
      correctCount: number
      incorrectCount: number
      createdAt: Date
      updatedAt: Date
      lastReviewedAt: Date | null
    }, ExtArgs["result"]["vocabulary"]>
    composites: {}
  }

  type VocabularyGetPayload<S extends boolean | null | undefined | VocabularyDefaultArgs> = $Result.GetResult<Prisma.$VocabularyPayload, S>

  type VocabularyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VocabularyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VocabularyCountAggregateInputType | true
    }

  export interface VocabularyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vocabulary'], meta: { name: 'Vocabulary' } }
    /**
     * Find zero or one Vocabulary that matches the filter.
     * @param {VocabularyFindUniqueArgs} args - Arguments to find a Vocabulary
     * @example
     * // Get one Vocabulary
     * const vocabulary = await prisma.vocabulary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VocabularyFindUniqueArgs>(args: SelectSubset<T, VocabularyFindUniqueArgs<ExtArgs>>): Prisma__VocabularyClient<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vocabulary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VocabularyFindUniqueOrThrowArgs} args - Arguments to find a Vocabulary
     * @example
     * // Get one Vocabulary
     * const vocabulary = await prisma.vocabulary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VocabularyFindUniqueOrThrowArgs>(args: SelectSubset<T, VocabularyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VocabularyClient<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vocabulary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabularyFindFirstArgs} args - Arguments to find a Vocabulary
     * @example
     * // Get one Vocabulary
     * const vocabulary = await prisma.vocabulary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VocabularyFindFirstArgs>(args?: SelectSubset<T, VocabularyFindFirstArgs<ExtArgs>>): Prisma__VocabularyClient<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vocabulary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabularyFindFirstOrThrowArgs} args - Arguments to find a Vocabulary
     * @example
     * // Get one Vocabulary
     * const vocabulary = await prisma.vocabulary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VocabularyFindFirstOrThrowArgs>(args?: SelectSubset<T, VocabularyFindFirstOrThrowArgs<ExtArgs>>): Prisma__VocabularyClient<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vocabularies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabularyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vocabularies
     * const vocabularies = await prisma.vocabulary.findMany()
     * 
     * // Get first 10 Vocabularies
     * const vocabularies = await prisma.vocabulary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vocabularyWithIdOnly = await prisma.vocabulary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VocabularyFindManyArgs>(args?: SelectSubset<T, VocabularyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vocabulary.
     * @param {VocabularyCreateArgs} args - Arguments to create a Vocabulary.
     * @example
     * // Create one Vocabulary
     * const Vocabulary = await prisma.vocabulary.create({
     *   data: {
     *     // ... data to create a Vocabulary
     *   }
     * })
     * 
     */
    create<T extends VocabularyCreateArgs>(args: SelectSubset<T, VocabularyCreateArgs<ExtArgs>>): Prisma__VocabularyClient<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vocabularies.
     * @param {VocabularyCreateManyArgs} args - Arguments to create many Vocabularies.
     * @example
     * // Create many Vocabularies
     * const vocabulary = await prisma.vocabulary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VocabularyCreateManyArgs>(args?: SelectSubset<T, VocabularyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vocabularies and returns the data saved in the database.
     * @param {VocabularyCreateManyAndReturnArgs} args - Arguments to create many Vocabularies.
     * @example
     * // Create many Vocabularies
     * const vocabulary = await prisma.vocabulary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vocabularies and only return the `id`
     * const vocabularyWithIdOnly = await prisma.vocabulary.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VocabularyCreateManyAndReturnArgs>(args?: SelectSubset<T, VocabularyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vocabulary.
     * @param {VocabularyDeleteArgs} args - Arguments to delete one Vocabulary.
     * @example
     * // Delete one Vocabulary
     * const Vocabulary = await prisma.vocabulary.delete({
     *   where: {
     *     // ... filter to delete one Vocabulary
     *   }
     * })
     * 
     */
    delete<T extends VocabularyDeleteArgs>(args: SelectSubset<T, VocabularyDeleteArgs<ExtArgs>>): Prisma__VocabularyClient<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vocabulary.
     * @param {VocabularyUpdateArgs} args - Arguments to update one Vocabulary.
     * @example
     * // Update one Vocabulary
     * const vocabulary = await prisma.vocabulary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VocabularyUpdateArgs>(args: SelectSubset<T, VocabularyUpdateArgs<ExtArgs>>): Prisma__VocabularyClient<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vocabularies.
     * @param {VocabularyDeleteManyArgs} args - Arguments to filter Vocabularies to delete.
     * @example
     * // Delete a few Vocabularies
     * const { count } = await prisma.vocabulary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VocabularyDeleteManyArgs>(args?: SelectSubset<T, VocabularyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vocabularies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabularyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vocabularies
     * const vocabulary = await prisma.vocabulary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VocabularyUpdateManyArgs>(args: SelectSubset<T, VocabularyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vocabularies and returns the data updated in the database.
     * @param {VocabularyUpdateManyAndReturnArgs} args - Arguments to update many Vocabularies.
     * @example
     * // Update many Vocabularies
     * const vocabulary = await prisma.vocabulary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vocabularies and only return the `id`
     * const vocabularyWithIdOnly = await prisma.vocabulary.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VocabularyUpdateManyAndReturnArgs>(args: SelectSubset<T, VocabularyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vocabulary.
     * @param {VocabularyUpsertArgs} args - Arguments to update or create a Vocabulary.
     * @example
     * // Update or create a Vocabulary
     * const vocabulary = await prisma.vocabulary.upsert({
     *   create: {
     *     // ... data to create a Vocabulary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vocabulary we want to update
     *   }
     * })
     */
    upsert<T extends VocabularyUpsertArgs>(args: SelectSubset<T, VocabularyUpsertArgs<ExtArgs>>): Prisma__VocabularyClient<$Result.GetResult<Prisma.$VocabularyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vocabularies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabularyCountArgs} args - Arguments to filter Vocabularies to count.
     * @example
     * // Count the number of Vocabularies
     * const count = await prisma.vocabulary.count({
     *   where: {
     *     // ... the filter for the Vocabularies we want to count
     *   }
     * })
    **/
    count<T extends VocabularyCountArgs>(
      args?: Subset<T, VocabularyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VocabularyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vocabulary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabularyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VocabularyAggregateArgs>(args: Subset<T, VocabularyAggregateArgs>): Prisma.PrismaPromise<GetVocabularyAggregateType<T>>

    /**
     * Group by Vocabulary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VocabularyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VocabularyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VocabularyGroupByArgs['orderBy'] }
        : { orderBy?: VocabularyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VocabularyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVocabularyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vocabulary model
   */
  readonly fields: VocabularyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vocabulary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VocabularyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    word<T extends WordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WordDefaultArgs<ExtArgs>>): Prisma__WordClient<$Result.GetResult<Prisma.$WordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vocabulary model
   */
  interface VocabularyFieldRefs {
    readonly id: FieldRef<"Vocabulary", 'String'>
    readonly userId: FieldRef<"Vocabulary", 'String'>
    readonly wordId: FieldRef<"Vocabulary", 'String'>
    readonly level: FieldRef<"Vocabulary", 'VocabularyLevel'>
    readonly repetitions: FieldRef<"Vocabulary", 'Int'>
    readonly easeFactor: FieldRef<"Vocabulary", 'Decimal'>
    readonly interval: FieldRef<"Vocabulary", 'Int'>
    readonly nextReviewAt: FieldRef<"Vocabulary", 'DateTime'>
    readonly correctCount: FieldRef<"Vocabulary", 'Int'>
    readonly incorrectCount: FieldRef<"Vocabulary", 'Int'>
    readonly createdAt: FieldRef<"Vocabulary", 'DateTime'>
    readonly updatedAt: FieldRef<"Vocabulary", 'DateTime'>
    readonly lastReviewedAt: FieldRef<"Vocabulary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vocabulary findUnique
   */
  export type VocabularyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
    /**
     * Filter, which Vocabulary to fetch.
     */
    where: VocabularyWhereUniqueInput
  }

  /**
   * Vocabulary findUniqueOrThrow
   */
  export type VocabularyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
    /**
     * Filter, which Vocabulary to fetch.
     */
    where: VocabularyWhereUniqueInput
  }

  /**
   * Vocabulary findFirst
   */
  export type VocabularyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
    /**
     * Filter, which Vocabulary to fetch.
     */
    where?: VocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vocabularies to fetch.
     */
    orderBy?: VocabularyOrderByWithRelationInput | VocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vocabularies.
     */
    cursor?: VocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vocabularies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vocabularies.
     */
    distinct?: VocabularyScalarFieldEnum | VocabularyScalarFieldEnum[]
  }

  /**
   * Vocabulary findFirstOrThrow
   */
  export type VocabularyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
    /**
     * Filter, which Vocabulary to fetch.
     */
    where?: VocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vocabularies to fetch.
     */
    orderBy?: VocabularyOrderByWithRelationInput | VocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vocabularies.
     */
    cursor?: VocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vocabularies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vocabularies.
     */
    distinct?: VocabularyScalarFieldEnum | VocabularyScalarFieldEnum[]
  }

  /**
   * Vocabulary findMany
   */
  export type VocabularyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
    /**
     * Filter, which Vocabularies to fetch.
     */
    where?: VocabularyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vocabularies to fetch.
     */
    orderBy?: VocabularyOrderByWithRelationInput | VocabularyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vocabularies.
     */
    cursor?: VocabularyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vocabularies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vocabularies.
     */
    skip?: number
    distinct?: VocabularyScalarFieldEnum | VocabularyScalarFieldEnum[]
  }

  /**
   * Vocabulary create
   */
  export type VocabularyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
    /**
     * The data needed to create a Vocabulary.
     */
    data: XOR<VocabularyCreateInput, VocabularyUncheckedCreateInput>
  }

  /**
   * Vocabulary createMany
   */
  export type VocabularyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vocabularies.
     */
    data: VocabularyCreateManyInput | VocabularyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vocabulary createManyAndReturn
   */
  export type VocabularyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * The data used to create many Vocabularies.
     */
    data: VocabularyCreateManyInput | VocabularyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vocabulary update
   */
  export type VocabularyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
    /**
     * The data needed to update a Vocabulary.
     */
    data: XOR<VocabularyUpdateInput, VocabularyUncheckedUpdateInput>
    /**
     * Choose, which Vocabulary to update.
     */
    where: VocabularyWhereUniqueInput
  }

  /**
   * Vocabulary updateMany
   */
  export type VocabularyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vocabularies.
     */
    data: XOR<VocabularyUpdateManyMutationInput, VocabularyUncheckedUpdateManyInput>
    /**
     * Filter which Vocabularies to update
     */
    where?: VocabularyWhereInput
    /**
     * Limit how many Vocabularies to update.
     */
    limit?: number
  }

  /**
   * Vocabulary updateManyAndReturn
   */
  export type VocabularyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * The data used to update Vocabularies.
     */
    data: XOR<VocabularyUpdateManyMutationInput, VocabularyUncheckedUpdateManyInput>
    /**
     * Filter which Vocabularies to update
     */
    where?: VocabularyWhereInput
    /**
     * Limit how many Vocabularies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vocabulary upsert
   */
  export type VocabularyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
    /**
     * The filter to search for the Vocabulary to update in case it exists.
     */
    where: VocabularyWhereUniqueInput
    /**
     * In case the Vocabulary found by the `where` argument doesn't exist, create a new Vocabulary with this data.
     */
    create: XOR<VocabularyCreateInput, VocabularyUncheckedCreateInput>
    /**
     * In case the Vocabulary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VocabularyUpdateInput, VocabularyUncheckedUpdateInput>
  }

  /**
   * Vocabulary delete
   */
  export type VocabularyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
    /**
     * Filter which Vocabulary to delete.
     */
    where: VocabularyWhereUniqueInput
  }

  /**
   * Vocabulary deleteMany
   */
  export type VocabularyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vocabularies to delete
     */
    where?: VocabularyWhereInput
    /**
     * Limit how many Vocabularies to delete.
     */
    limit?: number
  }

  /**
   * Vocabulary without action
   */
  export type VocabularyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vocabulary
     */
    select?: VocabularySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vocabulary
     */
    omit?: VocabularyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VocabularyInclude<ExtArgs> | null
  }


  /**
   * Model LearningStats
   */

  export type AggregateLearningStats = {
    _count: LearningStatsCountAggregateOutputType | null
    _avg: LearningStatsAvgAggregateOutputType | null
    _sum: LearningStatsSumAggregateOutputType | null
    _min: LearningStatsMinAggregateOutputType | null
    _max: LearningStatsMaxAggregateOutputType | null
  }

  export type LearningStatsAvgAggregateOutputType = {
    totalWordsLearned: number | null
    totalReviews: number | null
    currentStreak: number | null
    longestStreak: number | null
    totalStudyTime: number | null
  }

  export type LearningStatsSumAggregateOutputType = {
    totalWordsLearned: number | null
    totalReviews: number | null
    currentStreak: number | null
    longestStreak: number | null
    totalStudyTime: number | null
  }

  export type LearningStatsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    totalWordsLearned: number | null
    totalReviews: number | null
    currentStreak: number | null
    longestStreak: number | null
    totalStudyTime: number | null
    lastStudyDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningStatsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    totalWordsLearned: number | null
    totalReviews: number | null
    currentStreak: number | null
    longestStreak: number | null
    totalStudyTime: number | null
    lastStudyDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningStatsCountAggregateOutputType = {
    id: number
    userId: number
    totalWordsLearned: number
    totalReviews: number
    currentStreak: number
    longestStreak: number
    totalStudyTime: number
    lastStudyDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LearningStatsAvgAggregateInputType = {
    totalWordsLearned?: true
    totalReviews?: true
    currentStreak?: true
    longestStreak?: true
    totalStudyTime?: true
  }

  export type LearningStatsSumAggregateInputType = {
    totalWordsLearned?: true
    totalReviews?: true
    currentStreak?: true
    longestStreak?: true
    totalStudyTime?: true
  }

  export type LearningStatsMinAggregateInputType = {
    id?: true
    userId?: true
    totalWordsLearned?: true
    totalReviews?: true
    currentStreak?: true
    longestStreak?: true
    totalStudyTime?: true
    lastStudyDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    totalWordsLearned?: true
    totalReviews?: true
    currentStreak?: true
    longestStreak?: true
    totalStudyTime?: true
    lastStudyDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningStatsCountAggregateInputType = {
    id?: true
    userId?: true
    totalWordsLearned?: true
    totalReviews?: true
    currentStreak?: true
    longestStreak?: true
    totalStudyTime?: true
    lastStudyDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LearningStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningStats to aggregate.
     */
    where?: LearningStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningStats to fetch.
     */
    orderBy?: LearningStatsOrderByWithRelationInput | LearningStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningStats
    **/
    _count?: true | LearningStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LearningStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LearningStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningStatsMaxAggregateInputType
  }

  export type GetLearningStatsAggregateType<T extends LearningStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningStats[P]>
      : GetScalarType<T[P], AggregateLearningStats[P]>
  }




  export type LearningStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningStatsWhereInput
    orderBy?: LearningStatsOrderByWithAggregationInput | LearningStatsOrderByWithAggregationInput[]
    by: LearningStatsScalarFieldEnum[] | LearningStatsScalarFieldEnum
    having?: LearningStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningStatsCountAggregateInputType | true
    _avg?: LearningStatsAvgAggregateInputType
    _sum?: LearningStatsSumAggregateInputType
    _min?: LearningStatsMinAggregateInputType
    _max?: LearningStatsMaxAggregateInputType
  }

  export type LearningStatsGroupByOutputType = {
    id: string
    userId: string
    totalWordsLearned: number
    totalReviews: number
    currentStreak: number
    longestStreak: number
    totalStudyTime: number
    lastStudyDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: LearningStatsCountAggregateOutputType | null
    _avg: LearningStatsAvgAggregateOutputType | null
    _sum: LearningStatsSumAggregateOutputType | null
    _min: LearningStatsMinAggregateOutputType | null
    _max: LearningStatsMaxAggregateOutputType | null
  }

  type GetLearningStatsGroupByPayload<T extends LearningStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningStatsGroupByOutputType[P]>
            : GetScalarType<T[P], LearningStatsGroupByOutputType[P]>
        }
      >
    >


  export type LearningStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    totalWordsLearned?: boolean
    totalReviews?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    totalStudyTime?: boolean
    lastStudyDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningStats"]>

  export type LearningStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    totalWordsLearned?: boolean
    totalReviews?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    totalStudyTime?: boolean
    lastStudyDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningStats"]>

  export type LearningStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    totalWordsLearned?: boolean
    totalReviews?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    totalStudyTime?: boolean
    lastStudyDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningStats"]>

  export type LearningStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    totalWordsLearned?: boolean
    totalReviews?: boolean
    currentStreak?: boolean
    longestStreak?: boolean
    totalStudyTime?: boolean
    lastStudyDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LearningStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "totalWordsLearned" | "totalReviews" | "currentStreak" | "longestStreak" | "totalStudyTime" | "lastStudyDate" | "createdAt" | "updatedAt", ExtArgs["result"]["learningStats"]>
  export type LearningStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LearningStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LearningStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LearningStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      totalWordsLearned: number
      totalReviews: number
      currentStreak: number
      longestStreak: number
      totalStudyTime: number
      lastStudyDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["learningStats"]>
    composites: {}
  }

  type LearningStatsGetPayload<S extends boolean | null | undefined | LearningStatsDefaultArgs> = $Result.GetResult<Prisma.$LearningStatsPayload, S>

  type LearningStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningStatsCountAggregateInputType | true
    }

  export interface LearningStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningStats'], meta: { name: 'LearningStats' } }
    /**
     * Find zero or one LearningStats that matches the filter.
     * @param {LearningStatsFindUniqueArgs} args - Arguments to find a LearningStats
     * @example
     * // Get one LearningStats
     * const learningStats = await prisma.learningStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningStatsFindUniqueArgs>(args: SelectSubset<T, LearningStatsFindUniqueArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningStatsFindUniqueOrThrowArgs} args - Arguments to find a LearningStats
     * @example
     * // Get one LearningStats
     * const learningStats = await prisma.learningStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsFindFirstArgs} args - Arguments to find a LearningStats
     * @example
     * // Get one LearningStats
     * const learningStats = await prisma.learningStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningStatsFindFirstArgs>(args?: SelectSubset<T, LearningStatsFindFirstArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsFindFirstOrThrowArgs} args - Arguments to find a LearningStats
     * @example
     * // Get one LearningStats
     * const learningStats = await prisma.learningStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningStats
     * const learningStats = await prisma.learningStats.findMany()
     * 
     * // Get first 10 LearningStats
     * const learningStats = await prisma.learningStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningStatsWithIdOnly = await prisma.learningStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningStatsFindManyArgs>(args?: SelectSubset<T, LearningStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningStats.
     * @param {LearningStatsCreateArgs} args - Arguments to create a LearningStats.
     * @example
     * // Create one LearningStats
     * const LearningStats = await prisma.learningStats.create({
     *   data: {
     *     // ... data to create a LearningStats
     *   }
     * })
     * 
     */
    create<T extends LearningStatsCreateArgs>(args: SelectSubset<T, LearningStatsCreateArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningStats.
     * @param {LearningStatsCreateManyArgs} args - Arguments to create many LearningStats.
     * @example
     * // Create many LearningStats
     * const learningStats = await prisma.learningStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningStatsCreateManyArgs>(args?: SelectSubset<T, LearningStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningStats and returns the data saved in the database.
     * @param {LearningStatsCreateManyAndReturnArgs} args - Arguments to create many LearningStats.
     * @example
     * // Create many LearningStats
     * const learningStats = await prisma.learningStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningStats and only return the `id`
     * const learningStatsWithIdOnly = await prisma.learningStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningStats.
     * @param {LearningStatsDeleteArgs} args - Arguments to delete one LearningStats.
     * @example
     * // Delete one LearningStats
     * const LearningStats = await prisma.learningStats.delete({
     *   where: {
     *     // ... filter to delete one LearningStats
     *   }
     * })
     * 
     */
    delete<T extends LearningStatsDeleteArgs>(args: SelectSubset<T, LearningStatsDeleteArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningStats.
     * @param {LearningStatsUpdateArgs} args - Arguments to update one LearningStats.
     * @example
     * // Update one LearningStats
     * const learningStats = await prisma.learningStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningStatsUpdateArgs>(args: SelectSubset<T, LearningStatsUpdateArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningStats.
     * @param {LearningStatsDeleteManyArgs} args - Arguments to filter LearningStats to delete.
     * @example
     * // Delete a few LearningStats
     * const { count } = await prisma.learningStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningStatsDeleteManyArgs>(args?: SelectSubset<T, LearningStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningStats
     * const learningStats = await prisma.learningStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningStatsUpdateManyArgs>(args: SelectSubset<T, LearningStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningStats and returns the data updated in the database.
     * @param {LearningStatsUpdateManyAndReturnArgs} args - Arguments to update many LearningStats.
     * @example
     * // Update many LearningStats
     * const learningStats = await prisma.learningStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningStats and only return the `id`
     * const learningStatsWithIdOnly = await prisma.learningStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningStats.
     * @param {LearningStatsUpsertArgs} args - Arguments to update or create a LearningStats.
     * @example
     * // Update or create a LearningStats
     * const learningStats = await prisma.learningStats.upsert({
     *   create: {
     *     // ... data to create a LearningStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningStats we want to update
     *   }
     * })
     */
    upsert<T extends LearningStatsUpsertArgs>(args: SelectSubset<T, LearningStatsUpsertArgs<ExtArgs>>): Prisma__LearningStatsClient<$Result.GetResult<Prisma.$LearningStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsCountArgs} args - Arguments to filter LearningStats to count.
     * @example
     * // Count the number of LearningStats
     * const count = await prisma.learningStats.count({
     *   where: {
     *     // ... the filter for the LearningStats we want to count
     *   }
     * })
    **/
    count<T extends LearningStatsCountArgs>(
      args?: Subset<T, LearningStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningStatsAggregateArgs>(args: Subset<T, LearningStatsAggregateArgs>): Prisma.PrismaPromise<GetLearningStatsAggregateType<T>>

    /**
     * Group by LearningStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningStatsGroupByArgs['orderBy'] }
        : { orderBy?: LearningStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningStats model
   */
  readonly fields: LearningStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningStats model
   */
  interface LearningStatsFieldRefs {
    readonly id: FieldRef<"LearningStats", 'String'>
    readonly userId: FieldRef<"LearningStats", 'String'>
    readonly totalWordsLearned: FieldRef<"LearningStats", 'Int'>
    readonly totalReviews: FieldRef<"LearningStats", 'Int'>
    readonly currentStreak: FieldRef<"LearningStats", 'Int'>
    readonly longestStreak: FieldRef<"LearningStats", 'Int'>
    readonly totalStudyTime: FieldRef<"LearningStats", 'Int'>
    readonly lastStudyDate: FieldRef<"LearningStats", 'DateTime'>
    readonly createdAt: FieldRef<"LearningStats", 'DateTime'>
    readonly updatedAt: FieldRef<"LearningStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LearningStats findUnique
   */
  export type LearningStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsInclude<ExtArgs> | null
    /**
     * Filter, which LearningStats to fetch.
     */
    where: LearningStatsWhereUniqueInput
  }

  /**
   * LearningStats findUniqueOrThrow
   */
  export type LearningStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsInclude<ExtArgs> | null
    /**
     * Filter, which LearningStats to fetch.
     */
    where: LearningStatsWhereUniqueInput
  }

  /**
   * LearningStats findFirst
   */
  export type LearningStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsInclude<ExtArgs> | null
    /**
     * Filter, which LearningStats to fetch.
     */
    where?: LearningStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningStats to fetch.
     */
    orderBy?: LearningStatsOrderByWithRelationInput | LearningStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningStats.
     */
    cursor?: LearningStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningStats.
     */
    distinct?: LearningStatsScalarFieldEnum | LearningStatsScalarFieldEnum[]
  }

  /**
   * LearningStats findFirstOrThrow
   */
  export type LearningStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsInclude<ExtArgs> | null
    /**
     * Filter, which LearningStats to fetch.
     */
    where?: LearningStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningStats to fetch.
     */
    orderBy?: LearningStatsOrderByWithRelationInput | LearningStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningStats.
     */
    cursor?: LearningStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningStats.
     */
    distinct?: LearningStatsScalarFieldEnum | LearningStatsScalarFieldEnum[]
  }

  /**
   * LearningStats findMany
   */
  export type LearningStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsInclude<ExtArgs> | null
    /**
     * Filter, which LearningStats to fetch.
     */
    where?: LearningStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningStats to fetch.
     */
    orderBy?: LearningStatsOrderByWithRelationInput | LearningStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningStats.
     */
    cursor?: LearningStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningStats.
     */
    skip?: number
    distinct?: LearningStatsScalarFieldEnum | LearningStatsScalarFieldEnum[]
  }

  /**
   * LearningStats create
   */
  export type LearningStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a LearningStats.
     */
    data: XOR<LearningStatsCreateInput, LearningStatsUncheckedCreateInput>
  }

  /**
   * LearningStats createMany
   */
  export type LearningStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningStats.
     */
    data: LearningStatsCreateManyInput | LearningStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningStats createManyAndReturn
   */
  export type LearningStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * The data used to create many LearningStats.
     */
    data: LearningStatsCreateManyInput | LearningStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningStats update
   */
  export type LearningStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a LearningStats.
     */
    data: XOR<LearningStatsUpdateInput, LearningStatsUncheckedUpdateInput>
    /**
     * Choose, which LearningStats to update.
     */
    where: LearningStatsWhereUniqueInput
  }

  /**
   * LearningStats updateMany
   */
  export type LearningStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningStats.
     */
    data: XOR<LearningStatsUpdateManyMutationInput, LearningStatsUncheckedUpdateManyInput>
    /**
     * Filter which LearningStats to update
     */
    where?: LearningStatsWhereInput
    /**
     * Limit how many LearningStats to update.
     */
    limit?: number
  }

  /**
   * LearningStats updateManyAndReturn
   */
  export type LearningStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * The data used to update LearningStats.
     */
    data: XOR<LearningStatsUpdateManyMutationInput, LearningStatsUncheckedUpdateManyInput>
    /**
     * Filter which LearningStats to update
     */
    where?: LearningStatsWhereInput
    /**
     * Limit how many LearningStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningStats upsert
   */
  export type LearningStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the LearningStats to update in case it exists.
     */
    where: LearningStatsWhereUniqueInput
    /**
     * In case the LearningStats found by the `where` argument doesn't exist, create a new LearningStats with this data.
     */
    create: XOR<LearningStatsCreateInput, LearningStatsUncheckedCreateInput>
    /**
     * In case the LearningStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningStatsUpdateInput, LearningStatsUncheckedUpdateInput>
  }

  /**
   * LearningStats delete
   */
  export type LearningStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsInclude<ExtArgs> | null
    /**
     * Filter which LearningStats to delete.
     */
    where: LearningStatsWhereUniqueInput
  }

  /**
   * LearningStats deleteMany
   */
  export type LearningStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningStats to delete
     */
    where?: LearningStatsWhereInput
    /**
     * Limit how many LearningStats to delete.
     */
    limit?: number
  }

  /**
   * LearningStats without action
   */
  export type LearningStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningStats
     */
    select?: LearningStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningStats
     */
    omit?: LearningStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningStatsInclude<ExtArgs> | null
  }


  /**
   * Model Analysis
   */

  export type AggregateAnalysis = {
    _count: AnalysisCountAggregateOutputType | null
    _min: AnalysisMinAggregateOutputType | null
    _max: AnalysisMaxAggregateOutputType | null
  }

  export type AnalysisMinAggregateOutputType = {
    id: string | null
    userId: string | null
    inputText: string | null
    language: string | null
    createdAt: Date | null
  }

  export type AnalysisMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    inputText: string | null
    language: string | null
    createdAt: Date | null
  }

  export type AnalysisCountAggregateOutputType = {
    id: number
    userId: number
    inputText: number
    result: number
    language: number
    createdAt: number
    _all: number
  }


  export type AnalysisMinAggregateInputType = {
    id?: true
    userId?: true
    inputText?: true
    language?: true
    createdAt?: true
  }

  export type AnalysisMaxAggregateInputType = {
    id?: true
    userId?: true
    inputText?: true
    language?: true
    createdAt?: true
  }

  export type AnalysisCountAggregateInputType = {
    id?: true
    userId?: true
    inputText?: true
    result?: true
    language?: true
    createdAt?: true
    _all?: true
  }

  export type AnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Analysis to aggregate.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Analyses
    **/
    _count?: true | AnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalysisMaxAggregateInputType
  }

  export type GetAnalysisAggregateType<T extends AnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalysis[P]>
      : GetScalarType<T[P], AggregateAnalysis[P]>
  }




  export type AnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalysisWhereInput
    orderBy?: AnalysisOrderByWithAggregationInput | AnalysisOrderByWithAggregationInput[]
    by: AnalysisScalarFieldEnum[] | AnalysisScalarFieldEnum
    having?: AnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalysisCountAggregateInputType | true
    _min?: AnalysisMinAggregateInputType
    _max?: AnalysisMaxAggregateInputType
  }

  export type AnalysisGroupByOutputType = {
    id: string
    userId: string
    inputText: string
    result: JsonValue
    language: string
    createdAt: Date
    _count: AnalysisCountAggregateOutputType | null
    _min: AnalysisMinAggregateOutputType | null
    _max: AnalysisMaxAggregateOutputType | null
  }

  type GetAnalysisGroupByPayload<T extends AnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], AnalysisGroupByOutputType[P]>
        }
      >
    >


  export type AnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    inputText?: boolean
    result?: boolean
    language?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysis"]>

  export type AnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    inputText?: boolean
    result?: boolean
    language?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysis"]>

  export type AnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    inputText?: boolean
    result?: boolean
    language?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analysis"]>

  export type AnalysisSelectScalar = {
    id?: boolean
    userId?: boolean
    inputText?: boolean
    result?: boolean
    language?: boolean
    createdAt?: boolean
  }

  export type AnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "inputText" | "result" | "language" | "createdAt", ExtArgs["result"]["analysis"]>
  export type AnalysisInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnalysisIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AnalysisIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Analysis"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      inputText: string
      result: Prisma.JsonValue
      language: string
      createdAt: Date
    }, ExtArgs["result"]["analysis"]>
    composites: {}
  }

  type AnalysisGetPayload<S extends boolean | null | undefined | AnalysisDefaultArgs> = $Result.GetResult<Prisma.$AnalysisPayload, S>

  type AnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalysisCountAggregateInputType | true
    }

  export interface AnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Analysis'], meta: { name: 'Analysis' } }
    /**
     * Find zero or one Analysis that matches the filter.
     * @param {AnalysisFindUniqueArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalysisFindUniqueArgs>(args: SelectSubset<T, AnalysisFindUniqueArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Analysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalysisFindUniqueOrThrowArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Analysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisFindFirstArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalysisFindFirstArgs>(args?: SelectSubset<T, AnalysisFindFirstArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Analysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisFindFirstOrThrowArgs} args - Arguments to find a Analysis
     * @example
     * // Get one Analysis
     * const analysis = await prisma.analysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Analyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Analyses
     * const analyses = await prisma.analysis.findMany()
     * 
     * // Get first 10 Analyses
     * const analyses = await prisma.analysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analysisWithIdOnly = await prisma.analysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalysisFindManyArgs>(args?: SelectSubset<T, AnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Analysis.
     * @param {AnalysisCreateArgs} args - Arguments to create a Analysis.
     * @example
     * // Create one Analysis
     * const Analysis = await prisma.analysis.create({
     *   data: {
     *     // ... data to create a Analysis
     *   }
     * })
     * 
     */
    create<T extends AnalysisCreateArgs>(args: SelectSubset<T, AnalysisCreateArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Analyses.
     * @param {AnalysisCreateManyArgs} args - Arguments to create many Analyses.
     * @example
     * // Create many Analyses
     * const analysis = await prisma.analysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalysisCreateManyArgs>(args?: SelectSubset<T, AnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Analyses and returns the data saved in the database.
     * @param {AnalysisCreateManyAndReturnArgs} args - Arguments to create many Analyses.
     * @example
     * // Create many Analyses
     * const analysis = await prisma.analysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Analyses and only return the `id`
     * const analysisWithIdOnly = await prisma.analysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Analysis.
     * @param {AnalysisDeleteArgs} args - Arguments to delete one Analysis.
     * @example
     * // Delete one Analysis
     * const Analysis = await prisma.analysis.delete({
     *   where: {
     *     // ... filter to delete one Analysis
     *   }
     * })
     * 
     */
    delete<T extends AnalysisDeleteArgs>(args: SelectSubset<T, AnalysisDeleteArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Analysis.
     * @param {AnalysisUpdateArgs} args - Arguments to update one Analysis.
     * @example
     * // Update one Analysis
     * const analysis = await prisma.analysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalysisUpdateArgs>(args: SelectSubset<T, AnalysisUpdateArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Analyses.
     * @param {AnalysisDeleteManyArgs} args - Arguments to filter Analyses to delete.
     * @example
     * // Delete a few Analyses
     * const { count } = await prisma.analysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalysisDeleteManyArgs>(args?: SelectSubset<T, AnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Analyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Analyses
     * const analysis = await prisma.analysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalysisUpdateManyArgs>(args: SelectSubset<T, AnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Analyses and returns the data updated in the database.
     * @param {AnalysisUpdateManyAndReturnArgs} args - Arguments to update many Analyses.
     * @example
     * // Update many Analyses
     * const analysis = await prisma.analysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Analyses and only return the `id`
     * const analysisWithIdOnly = await prisma.analysis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Analysis.
     * @param {AnalysisUpsertArgs} args - Arguments to update or create a Analysis.
     * @example
     * // Update or create a Analysis
     * const analysis = await prisma.analysis.upsert({
     *   create: {
     *     // ... data to create a Analysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Analysis we want to update
     *   }
     * })
     */
    upsert<T extends AnalysisUpsertArgs>(args: SelectSubset<T, AnalysisUpsertArgs<ExtArgs>>): Prisma__AnalysisClient<$Result.GetResult<Prisma.$AnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Analyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisCountArgs} args - Arguments to filter Analyses to count.
     * @example
     * // Count the number of Analyses
     * const count = await prisma.analysis.count({
     *   where: {
     *     // ... the filter for the Analyses we want to count
     *   }
     * })
    **/
    count<T extends AnalysisCountArgs>(
      args?: Subset<T, AnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Analysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalysisAggregateArgs>(args: Subset<T, AnalysisAggregateArgs>): Prisma.PrismaPromise<GetAnalysisAggregateType<T>>

    /**
     * Group by Analysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalysisGroupByArgs['orderBy'] }
        : { orderBy?: AnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Analysis model
   */
  readonly fields: AnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Analysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Analysis model
   */
  interface AnalysisFieldRefs {
    readonly id: FieldRef<"Analysis", 'String'>
    readonly userId: FieldRef<"Analysis", 'String'>
    readonly inputText: FieldRef<"Analysis", 'String'>
    readonly result: FieldRef<"Analysis", 'Json'>
    readonly language: FieldRef<"Analysis", 'String'>
    readonly createdAt: FieldRef<"Analysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Analysis findUnique
   */
  export type AnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis findUniqueOrThrow
   */
  export type AnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis findFirst
   */
  export type AnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Analyses.
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Analyses.
     */
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * Analysis findFirstOrThrow
   */
  export type AnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analysis to fetch.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Analyses.
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Analyses.
     */
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * Analysis findMany
   */
  export type AnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter, which Analyses to fetch.
     */
    where?: AnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Analyses to fetch.
     */
    orderBy?: AnalysisOrderByWithRelationInput | AnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Analyses.
     */
    cursor?: AnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Analyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Analyses.
     */
    skip?: number
    distinct?: AnalysisScalarFieldEnum | AnalysisScalarFieldEnum[]
  }

  /**
   * Analysis create
   */
  export type AnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * The data needed to create a Analysis.
     */
    data: XOR<AnalysisCreateInput, AnalysisUncheckedCreateInput>
  }

  /**
   * Analysis createMany
   */
  export type AnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Analyses.
     */
    data: AnalysisCreateManyInput | AnalysisCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Analysis createManyAndReturn
   */
  export type AnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many Analyses.
     */
    data: AnalysisCreateManyInput | AnalysisCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Analysis update
   */
  export type AnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * The data needed to update a Analysis.
     */
    data: XOR<AnalysisUpdateInput, AnalysisUncheckedUpdateInput>
    /**
     * Choose, which Analysis to update.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis updateMany
   */
  export type AnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Analyses.
     */
    data: XOR<AnalysisUpdateManyMutationInput, AnalysisUncheckedUpdateManyInput>
    /**
     * Filter which Analyses to update
     */
    where?: AnalysisWhereInput
    /**
     * Limit how many Analyses to update.
     */
    limit?: number
  }

  /**
   * Analysis updateManyAndReturn
   */
  export type AnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * The data used to update Analyses.
     */
    data: XOR<AnalysisUpdateManyMutationInput, AnalysisUncheckedUpdateManyInput>
    /**
     * Filter which Analyses to update
     */
    where?: AnalysisWhereInput
    /**
     * Limit how many Analyses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Analysis upsert
   */
  export type AnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * The filter to search for the Analysis to update in case it exists.
     */
    where: AnalysisWhereUniqueInput
    /**
     * In case the Analysis found by the `where` argument doesn't exist, create a new Analysis with this data.
     */
    create: XOR<AnalysisCreateInput, AnalysisUncheckedCreateInput>
    /**
     * In case the Analysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalysisUpdateInput, AnalysisUncheckedUpdateInput>
  }

  /**
   * Analysis delete
   */
  export type AnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
    /**
     * Filter which Analysis to delete.
     */
    where: AnalysisWhereUniqueInput
  }

  /**
   * Analysis deleteMany
   */
  export type AnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Analyses to delete
     */
    where?: AnalysisWhereInput
    /**
     * Limit how many Analyses to delete.
     */
    limit?: number
  }

  /**
   * Analysis without action
   */
  export type AnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Analysis
     */
    select?: AnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Analysis
     */
    omit?: AnalysisOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalysisInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    provider: 'provider',
    providerId: 'providerId',
    subscriptionTier: 'subscriptionTier',
    credits: 'credits',
    stripeCustomerId: 'stripeCustomerId',
    subscriptionExpiry: 'subscriptionExpiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastLoginAt: 'lastLoginAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    tier: 'tier',
    status: 'status',
    stripeSubscriptionId: 'stripeSubscriptionId',
    stripePriceId: 'stripePriceId',
    stripeProductId: 'stripeProductId',
    billingPeriod: 'billingPeriod',
    currentPeriodStart: 'currentPeriodStart',
    currentPeriodEnd: 'currentPeriodEnd',
    cancelAtPeriodEnd: 'cancelAtPeriodEnd',
    canceledAt: 'canceledAt',
    monthlyCredits: 'monthlyCredits',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    currency: 'currency',
    paymentMethod: 'paymentMethod',
    status: 'status',
    type: 'type',
    stripePaymentIntentId: 'stripePaymentIntentId',
    stripeInvoiceId: 'stripeInvoiceId',
    externalPaymentId: 'externalPaymentId',
    subscriptionId: 'subscriptionId',
    creditAmount: 'creditAmount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    paidAt: 'paidAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const CreditTransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    balanceAfter: 'balanceAfter',
    type: 'type',
    description: 'description',
    paymentId: 'paymentId',
    featureType: 'featureType',
    relatedEntityId: 'relatedEntityId',
    createdAt: 'createdAt'
  };

  export type CreditTransactionScalarFieldEnum = (typeof CreditTransactionScalarFieldEnum)[keyof typeof CreditTransactionScalarFieldEnum]


  export const FeatureAccessScalarFieldEnum: {
    id: 'id',
    featureType: 'featureType',
    minTier: 'minTier',
    creditCost: 'creditCost',
    freeLimitDaily: 'freeLimitDaily',
    proLimitDaily: 'proLimitDaily',
    premiumLimitDaily: 'premiumLimitDaily',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FeatureAccessScalarFieldEnum = (typeof FeatureAccessScalarFieldEnum)[keyof typeof FeatureAccessScalarFieldEnum]


  export const WordPackScalarFieldEnum: {
    id: 'id',
    packId: 'packId',
    title: 'title',
    description: 'description',
    category: 'category',
    requiredTier: 'requiredTier',
    creditCost: 'creditCost',
    wordCount: 'wordCount',
    difficulty: 'difficulty',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WordPackScalarFieldEnum = (typeof WordPackScalarFieldEnum)[keyof typeof WordPackScalarFieldEnum]


  export const WordScalarFieldEnum: {
    id: 'id',
    packId: 'packId',
    word: 'word',
    reading: 'reading',
    romaji: 'romaji',
    meaning: 'meaning',
    partOfSpeech: 'partOfSpeech',
    example: 'example',
    exampleTranslation: 'exampleTranslation',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WordScalarFieldEnum = (typeof WordScalarFieldEnum)[keyof typeof WordScalarFieldEnum]


  export const UserPackProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    packId: 'packId',
    wordsLearned: 'wordsLearned',
    wordsReviewed: 'wordsReviewed',
    accuracy: 'accuracy',
    lastStudiedAt: 'lastStudiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserPackProgressScalarFieldEnum = (typeof UserPackProgressScalarFieldEnum)[keyof typeof UserPackProgressScalarFieldEnum]


  export const VocabularyScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    wordId: 'wordId',
    level: 'level',
    repetitions: 'repetitions',
    easeFactor: 'easeFactor',
    interval: 'interval',
    nextReviewAt: 'nextReviewAt',
    correctCount: 'correctCount',
    incorrectCount: 'incorrectCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastReviewedAt: 'lastReviewedAt'
  };

  export type VocabularyScalarFieldEnum = (typeof VocabularyScalarFieldEnum)[keyof typeof VocabularyScalarFieldEnum]


  export const LearningStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    totalWordsLearned: 'totalWordsLearned',
    totalReviews: 'totalReviews',
    currentStreak: 'currentStreak',
    longestStreak: 'longestStreak',
    totalStudyTime: 'totalStudyTime',
    lastStudyDate: 'lastStudyDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LearningStatsScalarFieldEnum = (typeof LearningStatsScalarFieldEnum)[keyof typeof LearningStatsScalarFieldEnum]


  export const AnalysisScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    inputText: 'inputText',
    result: 'result',
    language: 'language',
    createdAt: 'createdAt'
  };

  export type AnalysisScalarFieldEnum = (typeof AnalysisScalarFieldEnum)[keyof typeof AnalysisScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'AuthProvider'
   */
  export type EnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider'>
    


  /**
   * Reference to a field of type 'AuthProvider[]'
   */
  export type ListEnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider[]'>
    


  /**
   * Reference to a field of type 'SubscriptionTier'
   */
  export type EnumSubscriptionTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionTier'>
    


  /**
   * Reference to a field of type 'SubscriptionTier[]'
   */
  export type ListEnumSubscriptionTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionTier[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentType'
   */
  export type EnumPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentType'>
    


  /**
   * Reference to a field of type 'PaymentType[]'
   */
  export type ListEnumPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentType[]'>
    


  /**
   * Reference to a field of type 'CreditTransactionType'
   */
  export type EnumCreditTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreditTransactionType'>
    


  /**
   * Reference to a field of type 'CreditTransactionType[]'
   */
  export type ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CreditTransactionType[]'>
    


  /**
   * Reference to a field of type 'FeatureType'
   */
  export type EnumFeatureTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeatureType'>
    


  /**
   * Reference to a field of type 'FeatureType[]'
   */
  export type ListEnumFeatureTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FeatureType[]'>
    


  /**
   * Reference to a field of type 'PackCategory'
   */
  export type EnumPackCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PackCategory'>
    


  /**
   * Reference to a field of type 'PackCategory[]'
   */
  export type ListEnumPackCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PackCategory[]'>
    


  /**
   * Reference to a field of type 'VocabularyLevel'
   */
  export type EnumVocabularyLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VocabularyLevel'>
    


  /**
   * Reference to a field of type 'VocabularyLevel[]'
   */
  export type ListEnumVocabularyLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VocabularyLevel[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    provider?: EnumAuthProviderFilter<"User"> | $Enums.AuthProvider
    providerId?: StringNullableFilter<"User"> | string | null
    subscriptionTier?: EnumSubscriptionTierFilter<"User"> | $Enums.SubscriptionTier
    credits?: IntFilter<"User"> | number
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    subscriptionExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptions?: SubscriptionListRelationFilter
    payments?: PaymentListRelationFilter
    creditTransactions?: CreditTransactionListRelationFilter
    userPackProgress?: UserPackProgressListRelationFilter
    vocabulary?: VocabularyListRelationFilter
    learningStats?: LearningStatsListRelationFilter
    analyses?: AnalysisListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    provider?: SortOrder
    providerId?: SortOrderInput | SortOrder
    subscriptionTier?: SortOrder
    credits?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    subscriptionExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    subscriptions?: SubscriptionOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    creditTransactions?: CreditTransactionOrderByRelationAggregateInput
    userPackProgress?: UserPackProgressOrderByRelationAggregateInput
    vocabulary?: VocabularyOrderByRelationAggregateInput
    learningStats?: LearningStatsOrderByRelationAggregateInput
    analyses?: AnalysisOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    stripeCustomerId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    provider?: EnumAuthProviderFilter<"User"> | $Enums.AuthProvider
    providerId?: StringNullableFilter<"User"> | string | null
    subscriptionTier?: EnumSubscriptionTierFilter<"User"> | $Enums.SubscriptionTier
    credits?: IntFilter<"User"> | number
    subscriptionExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptions?: SubscriptionListRelationFilter
    payments?: PaymentListRelationFilter
    creditTransactions?: CreditTransactionListRelationFilter
    userPackProgress?: UserPackProgressListRelationFilter
    vocabulary?: VocabularyListRelationFilter
    learningStats?: LearningStatsListRelationFilter
    analyses?: AnalysisListRelationFilter
  }, "id" | "email" | "username" | "stripeCustomerId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    provider?: SortOrder
    providerId?: SortOrderInput | SortOrder
    subscriptionTier?: SortOrder
    credits?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    subscriptionExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    provider?: EnumAuthProviderWithAggregatesFilter<"User"> | $Enums.AuthProvider
    providerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionTier?: EnumSubscriptionTierWithAggregatesFilter<"User"> | $Enums.SubscriptionTier
    credits?: IntWithAggregatesFilter<"User"> | number
    stripeCustomerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    userId?: StringFilter<"Subscription"> | string
    tier?: EnumSubscriptionTierFilter<"Subscription"> | $Enums.SubscriptionTier
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    stripeSubscriptionId?: StringNullableFilter<"Subscription"> | string | null
    stripePriceId?: StringNullableFilter<"Subscription"> | string | null
    stripeProductId?: StringNullableFilter<"Subscription"> | string | null
    billingPeriod?: StringFilter<"Subscription"> | string
    currentPeriodStart?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    cancelAtPeriodEnd?: BoolFilter<"Subscription"> | boolean
    canceledAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    monthlyCredits?: IntFilter<"Subscription"> | number
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    stripeProductId?: SortOrderInput | SortOrder
    billingPeriod?: SortOrder
    currentPeriodStart?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    cancelAtPeriodEnd?: SortOrder
    canceledAt?: SortOrderInput | SortOrder
    monthlyCredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    stripeSubscriptionId?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    userId?: StringFilter<"Subscription"> | string
    tier?: EnumSubscriptionTierFilter<"Subscription"> | $Enums.SubscriptionTier
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    stripePriceId?: StringNullableFilter<"Subscription"> | string | null
    stripeProductId?: StringNullableFilter<"Subscription"> | string | null
    billingPeriod?: StringFilter<"Subscription"> | string
    currentPeriodStart?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    cancelAtPeriodEnd?: BoolFilter<"Subscription"> | boolean
    canceledAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    monthlyCredits?: IntFilter<"Subscription"> | number
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "stripeSubscriptionId">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    stripeProductId?: SortOrderInput | SortOrder
    billingPeriod?: SortOrder
    currentPeriodStart?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    cancelAtPeriodEnd?: SortOrder
    canceledAt?: SortOrderInput | SortOrder
    monthlyCredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _avg?: SubscriptionAvgOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
    _sum?: SubscriptionSumOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    userId?: StringWithAggregatesFilter<"Subscription"> | string
    tier?: EnumSubscriptionTierWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionTier
    status?: EnumSubscriptionStatusWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionStatus
    stripeSubscriptionId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    stripePriceId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    stripeProductId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    billingPeriod?: StringWithAggregatesFilter<"Subscription"> | string
    currentPeriodStart?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    cancelAtPeriodEnd?: BoolWithAggregatesFilter<"Subscription"> | boolean
    canceledAt?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    monthlyCredits?: IntWithAggregatesFilter<"Subscription"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Payment"> | string
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    type?: EnumPaymentTypeFilter<"Payment"> | $Enums.PaymentType
    stripePaymentIntentId?: StringNullableFilter<"Payment"> | string | null
    stripeInvoiceId?: StringNullableFilter<"Payment"> | string | null
    externalPaymentId?: StringNullableFilter<"Payment"> | string | null
    subscriptionId?: StringNullableFilter<"Payment"> | string | null
    creditAmount?: IntNullableFilter<"Payment"> | number | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    type?: SortOrder
    stripePaymentIntentId?: SortOrderInput | SortOrder
    stripeInvoiceId?: SortOrderInput | SortOrder
    externalPaymentId?: SortOrderInput | SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    creditAmount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    stripePaymentIntentId?: string
    stripeInvoiceId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    userId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Payment"> | string
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    type?: EnumPaymentTypeFilter<"Payment"> | $Enums.PaymentType
    externalPaymentId?: StringNullableFilter<"Payment"> | string | null
    subscriptionId?: StringNullableFilter<"Payment"> | string | null
    creditAmount?: IntNullableFilter<"Payment"> | number | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "stripePaymentIntentId" | "stripeInvoiceId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    type?: SortOrder
    stripePaymentIntentId?: SortOrderInput | SortOrder
    stripeInvoiceId?: SortOrderInput | SortOrder
    externalPaymentId?: SortOrderInput | SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    creditAmount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    userId?: StringWithAggregatesFilter<"Payment"> | string
    amount?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringWithAggregatesFilter<"Payment"> | string
    paymentMethod?: EnumPaymentMethodWithAggregatesFilter<"Payment"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    type?: EnumPaymentTypeWithAggregatesFilter<"Payment"> | $Enums.PaymentType
    stripePaymentIntentId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    stripeInvoiceId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    externalPaymentId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    subscriptionId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    creditAmount?: IntNullableWithAggregatesFilter<"Payment"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
  }

  export type CreditTransactionWhereInput = {
    AND?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    OR?: CreditTransactionWhereInput[]
    NOT?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    id?: StringFilter<"CreditTransaction"> | string
    userId?: StringFilter<"CreditTransaction"> | string
    amount?: IntFilter<"CreditTransaction"> | number
    balanceAfter?: IntFilter<"CreditTransaction"> | number
    type?: EnumCreditTransactionTypeFilter<"CreditTransaction"> | $Enums.CreditTransactionType
    description?: StringNullableFilter<"CreditTransaction"> | string | null
    paymentId?: StringNullableFilter<"CreditTransaction"> | string | null
    featureType?: StringNullableFilter<"CreditTransaction"> | string | null
    relatedEntityId?: StringNullableFilter<"CreditTransaction"> | string | null
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CreditTransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    featureType?: SortOrderInput | SortOrder
    relatedEntityId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CreditTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    OR?: CreditTransactionWhereInput[]
    NOT?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    userId?: StringFilter<"CreditTransaction"> | string
    amount?: IntFilter<"CreditTransaction"> | number
    balanceAfter?: IntFilter<"CreditTransaction"> | number
    type?: EnumCreditTransactionTypeFilter<"CreditTransaction"> | $Enums.CreditTransactionType
    description?: StringNullableFilter<"CreditTransaction"> | string | null
    paymentId?: StringNullableFilter<"CreditTransaction"> | string | null
    featureType?: StringNullableFilter<"CreditTransaction"> | string | null
    relatedEntityId?: StringNullableFilter<"CreditTransaction"> | string | null
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CreditTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    featureType?: SortOrderInput | SortOrder
    relatedEntityId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CreditTransactionCountOrderByAggregateInput
    _avg?: CreditTransactionAvgOrderByAggregateInput
    _max?: CreditTransactionMaxOrderByAggregateInput
    _min?: CreditTransactionMinOrderByAggregateInput
    _sum?: CreditTransactionSumOrderByAggregateInput
  }

  export type CreditTransactionScalarWhereWithAggregatesInput = {
    AND?: CreditTransactionScalarWhereWithAggregatesInput | CreditTransactionScalarWhereWithAggregatesInput[]
    OR?: CreditTransactionScalarWhereWithAggregatesInput[]
    NOT?: CreditTransactionScalarWhereWithAggregatesInput | CreditTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditTransaction"> | string
    userId?: StringWithAggregatesFilter<"CreditTransaction"> | string
    amount?: IntWithAggregatesFilter<"CreditTransaction"> | number
    balanceAfter?: IntWithAggregatesFilter<"CreditTransaction"> | number
    type?: EnumCreditTransactionTypeWithAggregatesFilter<"CreditTransaction"> | $Enums.CreditTransactionType
    description?: StringNullableWithAggregatesFilter<"CreditTransaction"> | string | null
    paymentId?: StringNullableWithAggregatesFilter<"CreditTransaction"> | string | null
    featureType?: StringNullableWithAggregatesFilter<"CreditTransaction"> | string | null
    relatedEntityId?: StringNullableWithAggregatesFilter<"CreditTransaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CreditTransaction"> | Date | string
  }

  export type FeatureAccessWhereInput = {
    AND?: FeatureAccessWhereInput | FeatureAccessWhereInput[]
    OR?: FeatureAccessWhereInput[]
    NOT?: FeatureAccessWhereInput | FeatureAccessWhereInput[]
    id?: StringFilter<"FeatureAccess"> | string
    featureType?: EnumFeatureTypeFilter<"FeatureAccess"> | $Enums.FeatureType
    minTier?: EnumSubscriptionTierFilter<"FeatureAccess"> | $Enums.SubscriptionTier
    creditCost?: IntNullableFilter<"FeatureAccess"> | number | null
    freeLimitDaily?: IntNullableFilter<"FeatureAccess"> | number | null
    proLimitDaily?: IntNullableFilter<"FeatureAccess"> | number | null
    premiumLimitDaily?: IntNullableFilter<"FeatureAccess"> | number | null
    description?: StringNullableFilter<"FeatureAccess"> | string | null
    createdAt?: DateTimeFilter<"FeatureAccess"> | Date | string
    updatedAt?: DateTimeFilter<"FeatureAccess"> | Date | string
  }

  export type FeatureAccessOrderByWithRelationInput = {
    id?: SortOrder
    featureType?: SortOrder
    minTier?: SortOrder
    creditCost?: SortOrderInput | SortOrder
    freeLimitDaily?: SortOrderInput | SortOrder
    proLimitDaily?: SortOrderInput | SortOrder
    premiumLimitDaily?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    featureType?: $Enums.FeatureType
    AND?: FeatureAccessWhereInput | FeatureAccessWhereInput[]
    OR?: FeatureAccessWhereInput[]
    NOT?: FeatureAccessWhereInput | FeatureAccessWhereInput[]
    minTier?: EnumSubscriptionTierFilter<"FeatureAccess"> | $Enums.SubscriptionTier
    creditCost?: IntNullableFilter<"FeatureAccess"> | number | null
    freeLimitDaily?: IntNullableFilter<"FeatureAccess"> | number | null
    proLimitDaily?: IntNullableFilter<"FeatureAccess"> | number | null
    premiumLimitDaily?: IntNullableFilter<"FeatureAccess"> | number | null
    description?: StringNullableFilter<"FeatureAccess"> | string | null
    createdAt?: DateTimeFilter<"FeatureAccess"> | Date | string
    updatedAt?: DateTimeFilter<"FeatureAccess"> | Date | string
  }, "id" | "featureType">

  export type FeatureAccessOrderByWithAggregationInput = {
    id?: SortOrder
    featureType?: SortOrder
    minTier?: SortOrder
    creditCost?: SortOrderInput | SortOrder
    freeLimitDaily?: SortOrderInput | SortOrder
    proLimitDaily?: SortOrderInput | SortOrder
    premiumLimitDaily?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FeatureAccessCountOrderByAggregateInput
    _avg?: FeatureAccessAvgOrderByAggregateInput
    _max?: FeatureAccessMaxOrderByAggregateInput
    _min?: FeatureAccessMinOrderByAggregateInput
    _sum?: FeatureAccessSumOrderByAggregateInput
  }

  export type FeatureAccessScalarWhereWithAggregatesInput = {
    AND?: FeatureAccessScalarWhereWithAggregatesInput | FeatureAccessScalarWhereWithAggregatesInput[]
    OR?: FeatureAccessScalarWhereWithAggregatesInput[]
    NOT?: FeatureAccessScalarWhereWithAggregatesInput | FeatureAccessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FeatureAccess"> | string
    featureType?: EnumFeatureTypeWithAggregatesFilter<"FeatureAccess"> | $Enums.FeatureType
    minTier?: EnumSubscriptionTierWithAggregatesFilter<"FeatureAccess"> | $Enums.SubscriptionTier
    creditCost?: IntNullableWithAggregatesFilter<"FeatureAccess"> | number | null
    freeLimitDaily?: IntNullableWithAggregatesFilter<"FeatureAccess"> | number | null
    proLimitDaily?: IntNullableWithAggregatesFilter<"FeatureAccess"> | number | null
    premiumLimitDaily?: IntNullableWithAggregatesFilter<"FeatureAccess"> | number | null
    description?: StringNullableWithAggregatesFilter<"FeatureAccess"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FeatureAccess"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FeatureAccess"> | Date | string
  }

  export type WordPackWhereInput = {
    AND?: WordPackWhereInput | WordPackWhereInput[]
    OR?: WordPackWhereInput[]
    NOT?: WordPackWhereInput | WordPackWhereInput[]
    id?: StringFilter<"WordPack"> | string
    packId?: StringFilter<"WordPack"> | string
    title?: StringFilter<"WordPack"> | string
    description?: StringNullableFilter<"WordPack"> | string | null
    category?: EnumPackCategoryFilter<"WordPack"> | $Enums.PackCategory
    requiredTier?: EnumSubscriptionTierFilter<"WordPack"> | $Enums.SubscriptionTier
    creditCost?: IntNullableFilter<"WordPack"> | number | null
    wordCount?: IntFilter<"WordPack"> | number
    difficulty?: StringNullableFilter<"WordPack"> | string | null
    tags?: StringNullableListFilter<"WordPack">
    createdAt?: DateTimeFilter<"WordPack"> | Date | string
    updatedAt?: DateTimeFilter<"WordPack"> | Date | string
    words?: WordListRelationFilter
    userProgress?: UserPackProgressListRelationFilter
  }

  export type WordPackOrderByWithRelationInput = {
    id?: SortOrder
    packId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    requiredTier?: SortOrder
    creditCost?: SortOrderInput | SortOrder
    wordCount?: SortOrder
    difficulty?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    words?: WordOrderByRelationAggregateInput
    userProgress?: UserPackProgressOrderByRelationAggregateInput
  }

  export type WordPackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    packId?: string
    AND?: WordPackWhereInput | WordPackWhereInput[]
    OR?: WordPackWhereInput[]
    NOT?: WordPackWhereInput | WordPackWhereInput[]
    title?: StringFilter<"WordPack"> | string
    description?: StringNullableFilter<"WordPack"> | string | null
    category?: EnumPackCategoryFilter<"WordPack"> | $Enums.PackCategory
    requiredTier?: EnumSubscriptionTierFilter<"WordPack"> | $Enums.SubscriptionTier
    creditCost?: IntNullableFilter<"WordPack"> | number | null
    wordCount?: IntFilter<"WordPack"> | number
    difficulty?: StringNullableFilter<"WordPack"> | string | null
    tags?: StringNullableListFilter<"WordPack">
    createdAt?: DateTimeFilter<"WordPack"> | Date | string
    updatedAt?: DateTimeFilter<"WordPack"> | Date | string
    words?: WordListRelationFilter
    userProgress?: UserPackProgressListRelationFilter
  }, "id" | "packId">

  export type WordPackOrderByWithAggregationInput = {
    id?: SortOrder
    packId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    requiredTier?: SortOrder
    creditCost?: SortOrderInput | SortOrder
    wordCount?: SortOrder
    difficulty?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WordPackCountOrderByAggregateInput
    _avg?: WordPackAvgOrderByAggregateInput
    _max?: WordPackMaxOrderByAggregateInput
    _min?: WordPackMinOrderByAggregateInput
    _sum?: WordPackSumOrderByAggregateInput
  }

  export type WordPackScalarWhereWithAggregatesInput = {
    AND?: WordPackScalarWhereWithAggregatesInput | WordPackScalarWhereWithAggregatesInput[]
    OR?: WordPackScalarWhereWithAggregatesInput[]
    NOT?: WordPackScalarWhereWithAggregatesInput | WordPackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WordPack"> | string
    packId?: StringWithAggregatesFilter<"WordPack"> | string
    title?: StringWithAggregatesFilter<"WordPack"> | string
    description?: StringNullableWithAggregatesFilter<"WordPack"> | string | null
    category?: EnumPackCategoryWithAggregatesFilter<"WordPack"> | $Enums.PackCategory
    requiredTier?: EnumSubscriptionTierWithAggregatesFilter<"WordPack"> | $Enums.SubscriptionTier
    creditCost?: IntNullableWithAggregatesFilter<"WordPack"> | number | null
    wordCount?: IntWithAggregatesFilter<"WordPack"> | number
    difficulty?: StringNullableWithAggregatesFilter<"WordPack"> | string | null
    tags?: StringNullableListFilter<"WordPack">
    createdAt?: DateTimeWithAggregatesFilter<"WordPack"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WordPack"> | Date | string
  }

  export type WordWhereInput = {
    AND?: WordWhereInput | WordWhereInput[]
    OR?: WordWhereInput[]
    NOT?: WordWhereInput | WordWhereInput[]
    id?: StringFilter<"Word"> | string
    packId?: StringFilter<"Word"> | string
    word?: StringFilter<"Word"> | string
    reading?: StringNullableFilter<"Word"> | string | null
    romaji?: StringNullableFilter<"Word"> | string | null
    meaning?: StringFilter<"Word"> | string
    partOfSpeech?: StringNullableFilter<"Word"> | string | null
    example?: StringNullableFilter<"Word"> | string | null
    exampleTranslation?: StringNullableFilter<"Word"> | string | null
    createdAt?: DateTimeFilter<"Word"> | Date | string
    updatedAt?: DateTimeFilter<"Word"> | Date | string
    pack?: XOR<WordPackScalarRelationFilter, WordPackWhereInput>
    vocabulary?: VocabularyListRelationFilter
  }

  export type WordOrderByWithRelationInput = {
    id?: SortOrder
    packId?: SortOrder
    word?: SortOrder
    reading?: SortOrderInput | SortOrder
    romaji?: SortOrderInput | SortOrder
    meaning?: SortOrder
    partOfSpeech?: SortOrderInput | SortOrder
    example?: SortOrderInput | SortOrder
    exampleTranslation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pack?: WordPackOrderByWithRelationInput
    vocabulary?: VocabularyOrderByRelationAggregateInput
  }

  export type WordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WordWhereInput | WordWhereInput[]
    OR?: WordWhereInput[]
    NOT?: WordWhereInput | WordWhereInput[]
    packId?: StringFilter<"Word"> | string
    word?: StringFilter<"Word"> | string
    reading?: StringNullableFilter<"Word"> | string | null
    romaji?: StringNullableFilter<"Word"> | string | null
    meaning?: StringFilter<"Word"> | string
    partOfSpeech?: StringNullableFilter<"Word"> | string | null
    example?: StringNullableFilter<"Word"> | string | null
    exampleTranslation?: StringNullableFilter<"Word"> | string | null
    createdAt?: DateTimeFilter<"Word"> | Date | string
    updatedAt?: DateTimeFilter<"Word"> | Date | string
    pack?: XOR<WordPackScalarRelationFilter, WordPackWhereInput>
    vocabulary?: VocabularyListRelationFilter
  }, "id">

  export type WordOrderByWithAggregationInput = {
    id?: SortOrder
    packId?: SortOrder
    word?: SortOrder
    reading?: SortOrderInput | SortOrder
    romaji?: SortOrderInput | SortOrder
    meaning?: SortOrder
    partOfSpeech?: SortOrderInput | SortOrder
    example?: SortOrderInput | SortOrder
    exampleTranslation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WordCountOrderByAggregateInput
    _max?: WordMaxOrderByAggregateInput
    _min?: WordMinOrderByAggregateInput
  }

  export type WordScalarWhereWithAggregatesInput = {
    AND?: WordScalarWhereWithAggregatesInput | WordScalarWhereWithAggregatesInput[]
    OR?: WordScalarWhereWithAggregatesInput[]
    NOT?: WordScalarWhereWithAggregatesInput | WordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Word"> | string
    packId?: StringWithAggregatesFilter<"Word"> | string
    word?: StringWithAggregatesFilter<"Word"> | string
    reading?: StringNullableWithAggregatesFilter<"Word"> | string | null
    romaji?: StringNullableWithAggregatesFilter<"Word"> | string | null
    meaning?: StringWithAggregatesFilter<"Word"> | string
    partOfSpeech?: StringNullableWithAggregatesFilter<"Word"> | string | null
    example?: StringNullableWithAggregatesFilter<"Word"> | string | null
    exampleTranslation?: StringNullableWithAggregatesFilter<"Word"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Word"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Word"> | Date | string
  }

  export type UserPackProgressWhereInput = {
    AND?: UserPackProgressWhereInput | UserPackProgressWhereInput[]
    OR?: UserPackProgressWhereInput[]
    NOT?: UserPackProgressWhereInput | UserPackProgressWhereInput[]
    id?: StringFilter<"UserPackProgress"> | string
    userId?: StringFilter<"UserPackProgress"> | string
    packId?: StringFilter<"UserPackProgress"> | string
    wordsLearned?: IntFilter<"UserPackProgress"> | number
    wordsReviewed?: IntFilter<"UserPackProgress"> | number
    accuracy?: DecimalFilter<"UserPackProgress"> | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: DateTimeNullableFilter<"UserPackProgress"> | Date | string | null
    createdAt?: DateTimeFilter<"UserPackProgress"> | Date | string
    updatedAt?: DateTimeFilter<"UserPackProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pack?: XOR<WordPackScalarRelationFilter, WordPackWhereInput>
  }

  export type UserPackProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    packId?: SortOrder
    wordsLearned?: SortOrder
    wordsReviewed?: SortOrder
    accuracy?: SortOrder
    lastStudiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    pack?: WordPackOrderByWithRelationInput
  }

  export type UserPackProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_packId?: UserPackProgressUserIdPackIdCompoundUniqueInput
    AND?: UserPackProgressWhereInput | UserPackProgressWhereInput[]
    OR?: UserPackProgressWhereInput[]
    NOT?: UserPackProgressWhereInput | UserPackProgressWhereInput[]
    userId?: StringFilter<"UserPackProgress"> | string
    packId?: StringFilter<"UserPackProgress"> | string
    wordsLearned?: IntFilter<"UserPackProgress"> | number
    wordsReviewed?: IntFilter<"UserPackProgress"> | number
    accuracy?: DecimalFilter<"UserPackProgress"> | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: DateTimeNullableFilter<"UserPackProgress"> | Date | string | null
    createdAt?: DateTimeFilter<"UserPackProgress"> | Date | string
    updatedAt?: DateTimeFilter<"UserPackProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pack?: XOR<WordPackScalarRelationFilter, WordPackWhereInput>
  }, "id" | "userId_packId">

  export type UserPackProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    packId?: SortOrder
    wordsLearned?: SortOrder
    wordsReviewed?: SortOrder
    accuracy?: SortOrder
    lastStudiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserPackProgressCountOrderByAggregateInput
    _avg?: UserPackProgressAvgOrderByAggregateInput
    _max?: UserPackProgressMaxOrderByAggregateInput
    _min?: UserPackProgressMinOrderByAggregateInput
    _sum?: UserPackProgressSumOrderByAggregateInput
  }

  export type UserPackProgressScalarWhereWithAggregatesInput = {
    AND?: UserPackProgressScalarWhereWithAggregatesInput | UserPackProgressScalarWhereWithAggregatesInput[]
    OR?: UserPackProgressScalarWhereWithAggregatesInput[]
    NOT?: UserPackProgressScalarWhereWithAggregatesInput | UserPackProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserPackProgress"> | string
    userId?: StringWithAggregatesFilter<"UserPackProgress"> | string
    packId?: StringWithAggregatesFilter<"UserPackProgress"> | string
    wordsLearned?: IntWithAggregatesFilter<"UserPackProgress"> | number
    wordsReviewed?: IntWithAggregatesFilter<"UserPackProgress"> | number
    accuracy?: DecimalWithAggregatesFilter<"UserPackProgress"> | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: DateTimeNullableWithAggregatesFilter<"UserPackProgress"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserPackProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserPackProgress"> | Date | string
  }

  export type VocabularyWhereInput = {
    AND?: VocabularyWhereInput | VocabularyWhereInput[]
    OR?: VocabularyWhereInput[]
    NOT?: VocabularyWhereInput | VocabularyWhereInput[]
    id?: StringFilter<"Vocabulary"> | string
    userId?: StringFilter<"Vocabulary"> | string
    wordId?: StringFilter<"Vocabulary"> | string
    level?: EnumVocabularyLevelFilter<"Vocabulary"> | $Enums.VocabularyLevel
    repetitions?: IntFilter<"Vocabulary"> | number
    easeFactor?: DecimalFilter<"Vocabulary"> | Decimal | DecimalJsLike | number | string
    interval?: IntFilter<"Vocabulary"> | number
    nextReviewAt?: DateTimeNullableFilter<"Vocabulary"> | Date | string | null
    correctCount?: IntFilter<"Vocabulary"> | number
    incorrectCount?: IntFilter<"Vocabulary"> | number
    createdAt?: DateTimeFilter<"Vocabulary"> | Date | string
    updatedAt?: DateTimeFilter<"Vocabulary"> | Date | string
    lastReviewedAt?: DateTimeNullableFilter<"Vocabulary"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    word?: XOR<WordScalarRelationFilter, WordWhereInput>
  }

  export type VocabularyOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    wordId?: SortOrder
    level?: SortOrder
    repetitions?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    nextReviewAt?: SortOrderInput | SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastReviewedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    word?: WordOrderByWithRelationInput
  }

  export type VocabularyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_wordId?: VocabularyUserIdWordIdCompoundUniqueInput
    AND?: VocabularyWhereInput | VocabularyWhereInput[]
    OR?: VocabularyWhereInput[]
    NOT?: VocabularyWhereInput | VocabularyWhereInput[]
    userId?: StringFilter<"Vocabulary"> | string
    wordId?: StringFilter<"Vocabulary"> | string
    level?: EnumVocabularyLevelFilter<"Vocabulary"> | $Enums.VocabularyLevel
    repetitions?: IntFilter<"Vocabulary"> | number
    easeFactor?: DecimalFilter<"Vocabulary"> | Decimal | DecimalJsLike | number | string
    interval?: IntFilter<"Vocabulary"> | number
    nextReviewAt?: DateTimeNullableFilter<"Vocabulary"> | Date | string | null
    correctCount?: IntFilter<"Vocabulary"> | number
    incorrectCount?: IntFilter<"Vocabulary"> | number
    createdAt?: DateTimeFilter<"Vocabulary"> | Date | string
    updatedAt?: DateTimeFilter<"Vocabulary"> | Date | string
    lastReviewedAt?: DateTimeNullableFilter<"Vocabulary"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    word?: XOR<WordScalarRelationFilter, WordWhereInput>
  }, "id" | "userId_wordId">

  export type VocabularyOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    wordId?: SortOrder
    level?: SortOrder
    repetitions?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    nextReviewAt?: SortOrderInput | SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastReviewedAt?: SortOrderInput | SortOrder
    _count?: VocabularyCountOrderByAggregateInput
    _avg?: VocabularyAvgOrderByAggregateInput
    _max?: VocabularyMaxOrderByAggregateInput
    _min?: VocabularyMinOrderByAggregateInput
    _sum?: VocabularySumOrderByAggregateInput
  }

  export type VocabularyScalarWhereWithAggregatesInput = {
    AND?: VocabularyScalarWhereWithAggregatesInput | VocabularyScalarWhereWithAggregatesInput[]
    OR?: VocabularyScalarWhereWithAggregatesInput[]
    NOT?: VocabularyScalarWhereWithAggregatesInput | VocabularyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vocabulary"> | string
    userId?: StringWithAggregatesFilter<"Vocabulary"> | string
    wordId?: StringWithAggregatesFilter<"Vocabulary"> | string
    level?: EnumVocabularyLevelWithAggregatesFilter<"Vocabulary"> | $Enums.VocabularyLevel
    repetitions?: IntWithAggregatesFilter<"Vocabulary"> | number
    easeFactor?: DecimalWithAggregatesFilter<"Vocabulary"> | Decimal | DecimalJsLike | number | string
    interval?: IntWithAggregatesFilter<"Vocabulary"> | number
    nextReviewAt?: DateTimeNullableWithAggregatesFilter<"Vocabulary"> | Date | string | null
    correctCount?: IntWithAggregatesFilter<"Vocabulary"> | number
    incorrectCount?: IntWithAggregatesFilter<"Vocabulary"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Vocabulary"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vocabulary"> | Date | string
    lastReviewedAt?: DateTimeNullableWithAggregatesFilter<"Vocabulary"> | Date | string | null
  }

  export type LearningStatsWhereInput = {
    AND?: LearningStatsWhereInput | LearningStatsWhereInput[]
    OR?: LearningStatsWhereInput[]
    NOT?: LearningStatsWhereInput | LearningStatsWhereInput[]
    id?: StringFilter<"LearningStats"> | string
    userId?: StringFilter<"LearningStats"> | string
    totalWordsLearned?: IntFilter<"LearningStats"> | number
    totalReviews?: IntFilter<"LearningStats"> | number
    currentStreak?: IntFilter<"LearningStats"> | number
    longestStreak?: IntFilter<"LearningStats"> | number
    totalStudyTime?: IntFilter<"LearningStats"> | number
    lastStudyDate?: DateTimeNullableFilter<"LearningStats"> | Date | string | null
    createdAt?: DateTimeFilter<"LearningStats"> | Date | string
    updatedAt?: DateTimeFilter<"LearningStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LearningStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalWordsLearned?: SortOrder
    totalReviews?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalStudyTime?: SortOrder
    lastStudyDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LearningStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: LearningStatsWhereInput | LearningStatsWhereInput[]
    OR?: LearningStatsWhereInput[]
    NOT?: LearningStatsWhereInput | LearningStatsWhereInput[]
    totalWordsLearned?: IntFilter<"LearningStats"> | number
    totalReviews?: IntFilter<"LearningStats"> | number
    currentStreak?: IntFilter<"LearningStats"> | number
    longestStreak?: IntFilter<"LearningStats"> | number
    totalStudyTime?: IntFilter<"LearningStats"> | number
    lastStudyDate?: DateTimeNullableFilter<"LearningStats"> | Date | string | null
    createdAt?: DateTimeFilter<"LearningStats"> | Date | string
    updatedAt?: DateTimeFilter<"LearningStats"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type LearningStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    totalWordsLearned?: SortOrder
    totalReviews?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalStudyTime?: SortOrder
    lastStudyDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LearningStatsCountOrderByAggregateInput
    _avg?: LearningStatsAvgOrderByAggregateInput
    _max?: LearningStatsMaxOrderByAggregateInput
    _min?: LearningStatsMinOrderByAggregateInput
    _sum?: LearningStatsSumOrderByAggregateInput
  }

  export type LearningStatsScalarWhereWithAggregatesInput = {
    AND?: LearningStatsScalarWhereWithAggregatesInput | LearningStatsScalarWhereWithAggregatesInput[]
    OR?: LearningStatsScalarWhereWithAggregatesInput[]
    NOT?: LearningStatsScalarWhereWithAggregatesInput | LearningStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LearningStats"> | string
    userId?: StringWithAggregatesFilter<"LearningStats"> | string
    totalWordsLearned?: IntWithAggregatesFilter<"LearningStats"> | number
    totalReviews?: IntWithAggregatesFilter<"LearningStats"> | number
    currentStreak?: IntWithAggregatesFilter<"LearningStats"> | number
    longestStreak?: IntWithAggregatesFilter<"LearningStats"> | number
    totalStudyTime?: IntWithAggregatesFilter<"LearningStats"> | number
    lastStudyDate?: DateTimeNullableWithAggregatesFilter<"LearningStats"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LearningStats"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LearningStats"> | Date | string
  }

  export type AnalysisWhereInput = {
    AND?: AnalysisWhereInput | AnalysisWhereInput[]
    OR?: AnalysisWhereInput[]
    NOT?: AnalysisWhereInput | AnalysisWhereInput[]
    id?: StringFilter<"Analysis"> | string
    userId?: StringFilter<"Analysis"> | string
    inputText?: StringFilter<"Analysis"> | string
    result?: JsonFilter<"Analysis">
    language?: StringFilter<"Analysis"> | string
    createdAt?: DateTimeFilter<"Analysis"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AnalysisOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    inputText?: SortOrder
    result?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnalysisWhereInput | AnalysisWhereInput[]
    OR?: AnalysisWhereInput[]
    NOT?: AnalysisWhereInput | AnalysisWhereInput[]
    userId?: StringFilter<"Analysis"> | string
    inputText?: StringFilter<"Analysis"> | string
    result?: JsonFilter<"Analysis">
    language?: StringFilter<"Analysis"> | string
    createdAt?: DateTimeFilter<"Analysis"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    inputText?: SortOrder
    result?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    _count?: AnalysisCountOrderByAggregateInput
    _max?: AnalysisMaxOrderByAggregateInput
    _min?: AnalysisMinOrderByAggregateInput
  }

  export type AnalysisScalarWhereWithAggregatesInput = {
    AND?: AnalysisScalarWhereWithAggregatesInput | AnalysisScalarWhereWithAggregatesInput[]
    OR?: AnalysisScalarWhereWithAggregatesInput[]
    NOT?: AnalysisScalarWhereWithAggregatesInput | AnalysisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Analysis"> | string
    userId?: StringWithAggregatesFilter<"Analysis"> | string
    inputText?: StringWithAggregatesFilter<"Analysis"> | string
    result?: JsonWithAggregatesFilter<"Analysis">
    language?: StringWithAggregatesFilter<"Analysis"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Analysis"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsCreateNestedManyWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressUncheckedCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyUncheckedCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsUncheckedCreateNestedManyWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUncheckedUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUncheckedUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUncheckedUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubscriptionCreateInput = {
    id?: string
    tier: $Enums.SubscriptionTier
    status?: $Enums.SubscriptionStatus
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeProductId?: string | null
    billingPeriod: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    monthlyCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubscriptionsInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    userId: string
    tier: $Enums.SubscriptionTier
    status?: $Enums.SubscriptionStatus
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeProductId?: string | null
    billingPeriod: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    monthlyCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubscriptionsNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    userId: string
    tier: $Enums.SubscriptionTier
    status?: $Enums.SubscriptionStatus
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeProductId?: string | null
    billingPeriod: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    monthlyCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    type: $Enums.PaymentType
    stripePaymentIntentId?: string | null
    stripeInvoiceId?: string | null
    externalPaymentId?: string | null
    subscriptionId?: string | null
    creditAmount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
    user: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    userId: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    type: $Enums.PaymentType
    stripePaymentIntentId?: string | null
    stripeInvoiceId?: string | null
    externalPaymentId?: string | null
    subscriptionId?: string | null
    creditAmount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeInvoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    externalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    creditAmount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeInvoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    externalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    creditAmount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentCreateManyInput = {
    id?: string
    userId: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    type: $Enums.PaymentType
    stripePaymentIntentId?: string | null
    stripeInvoiceId?: string | null
    externalPaymentId?: string | null
    subscriptionId?: string | null
    creditAmount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeInvoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    externalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    creditAmount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeInvoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    externalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    creditAmount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CreditTransactionCreateInput = {
    id?: string
    amount: number
    balanceAfter: number
    type: $Enums.CreditTransactionType
    description?: string | null
    paymentId?: string | null
    featureType?: string | null
    relatedEntityId?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCreditTransactionsInput
  }

  export type CreditTransactionUncheckedCreateInput = {
    id?: string
    userId: string
    amount: number
    balanceAfter: number
    type: $Enums.CreditTransactionType
    description?: string | null
    paymentId?: string | null
    featureType?: string | null
    relatedEntityId?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    featureType?: NullableStringFieldUpdateOperationsInput | string | null
    relatedEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCreditTransactionsNestedInput
  }

  export type CreditTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    featureType?: NullableStringFieldUpdateOperationsInput | string | null
    relatedEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionCreateManyInput = {
    id?: string
    userId: string
    amount: number
    balanceAfter: number
    type: $Enums.CreditTransactionType
    description?: string | null
    paymentId?: string | null
    featureType?: string | null
    relatedEntityId?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    featureType?: NullableStringFieldUpdateOperationsInput | string | null
    relatedEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    featureType?: NullableStringFieldUpdateOperationsInput | string | null
    relatedEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureAccessCreateInput = {
    id?: string
    featureType: $Enums.FeatureType
    minTier: $Enums.SubscriptionTier
    creditCost?: number | null
    freeLimitDaily?: number | null
    proLimitDaily?: number | null
    premiumLimitDaily?: number | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureAccessUncheckedCreateInput = {
    id?: string
    featureType: $Enums.FeatureType
    minTier: $Enums.SubscriptionTier
    creditCost?: number | null
    freeLimitDaily?: number | null
    proLimitDaily?: number | null
    premiumLimitDaily?: number | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureAccessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureType?: EnumFeatureTypeFieldUpdateOperationsInput | $Enums.FeatureType
    minTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    freeLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    proLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    premiumLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureAccessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureType?: EnumFeatureTypeFieldUpdateOperationsInput | $Enums.FeatureType
    minTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    freeLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    proLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    premiumLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureAccessCreateManyInput = {
    id?: string
    featureType: $Enums.FeatureType
    minTier: $Enums.SubscriptionTier
    creditCost?: number | null
    freeLimitDaily?: number | null
    proLimitDaily?: number | null
    premiumLimitDaily?: number | null
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureAccessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureType?: EnumFeatureTypeFieldUpdateOperationsInput | $Enums.FeatureType
    minTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    freeLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    proLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    premiumLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureAccessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    featureType?: EnumFeatureTypeFieldUpdateOperationsInput | $Enums.FeatureType
    minTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    freeLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    proLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    premiumLimitDaily?: NullableIntFieldUpdateOperationsInput | number | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordPackCreateInput = {
    id?: string
    packId: string
    title: string
    description?: string | null
    category: $Enums.PackCategory
    requiredTier?: $Enums.SubscriptionTier
    creditCost?: number | null
    wordCount?: number
    difficulty?: string | null
    tags?: WordPackCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    words?: WordCreateNestedManyWithoutPackInput
    userProgress?: UserPackProgressCreateNestedManyWithoutPackInput
  }

  export type WordPackUncheckedCreateInput = {
    id?: string
    packId: string
    title: string
    description?: string | null
    category: $Enums.PackCategory
    requiredTier?: $Enums.SubscriptionTier
    creditCost?: number | null
    wordCount?: number
    difficulty?: string | null
    tags?: WordPackCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    words?: WordUncheckedCreateNestedManyWithoutPackInput
    userProgress?: UserPackProgressUncheckedCreateNestedManyWithoutPackInput
  }

  export type WordPackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumPackCategoryFieldUpdateOperationsInput | $Enums.PackCategory
    requiredTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    wordCount?: IntFieldUpdateOperationsInput | number
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: WordPackUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    words?: WordUpdateManyWithoutPackNestedInput
    userProgress?: UserPackProgressUpdateManyWithoutPackNestedInput
  }

  export type WordPackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumPackCategoryFieldUpdateOperationsInput | $Enums.PackCategory
    requiredTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    wordCount?: IntFieldUpdateOperationsInput | number
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: WordPackUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    words?: WordUncheckedUpdateManyWithoutPackNestedInput
    userProgress?: UserPackProgressUncheckedUpdateManyWithoutPackNestedInput
  }

  export type WordPackCreateManyInput = {
    id?: string
    packId: string
    title: string
    description?: string | null
    category: $Enums.PackCategory
    requiredTier?: $Enums.SubscriptionTier
    creditCost?: number | null
    wordCount?: number
    difficulty?: string | null
    tags?: WordPackCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordPackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumPackCategoryFieldUpdateOperationsInput | $Enums.PackCategory
    requiredTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    wordCount?: IntFieldUpdateOperationsInput | number
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: WordPackUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordPackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumPackCategoryFieldUpdateOperationsInput | $Enums.PackCategory
    requiredTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    wordCount?: IntFieldUpdateOperationsInput | number
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: WordPackUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordCreateInput = {
    id?: string
    word: string
    reading?: string | null
    romaji?: string | null
    meaning: string
    partOfSpeech?: string | null
    example?: string | null
    exampleTranslation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pack: WordPackCreateNestedOneWithoutWordsInput
    vocabulary?: VocabularyCreateNestedManyWithoutWordInput
  }

  export type WordUncheckedCreateInput = {
    id?: string
    packId: string
    word: string
    reading?: string | null
    romaji?: string | null
    meaning: string
    partOfSpeech?: string | null
    example?: string | null
    exampleTranslation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vocabulary?: VocabularyUncheckedCreateNestedManyWithoutWordInput
  }

  export type WordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    reading?: NullableStringFieldUpdateOperationsInput | string | null
    romaji?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: StringFieldUpdateOperationsInput | string
    partOfSpeech?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pack?: WordPackUpdateOneRequiredWithoutWordsNestedInput
    vocabulary?: VocabularyUpdateManyWithoutWordNestedInput
  }

  export type WordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    reading?: NullableStringFieldUpdateOperationsInput | string | null
    romaji?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: StringFieldUpdateOperationsInput | string
    partOfSpeech?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vocabulary?: VocabularyUncheckedUpdateManyWithoutWordNestedInput
  }

  export type WordCreateManyInput = {
    id?: string
    packId: string
    word: string
    reading?: string | null
    romaji?: string | null
    meaning: string
    partOfSpeech?: string | null
    example?: string | null
    exampleTranslation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    reading?: NullableStringFieldUpdateOperationsInput | string | null
    romaji?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: StringFieldUpdateOperationsInput | string
    partOfSpeech?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    reading?: NullableStringFieldUpdateOperationsInput | string | null
    romaji?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: StringFieldUpdateOperationsInput | string
    partOfSpeech?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPackProgressCreateInput = {
    id?: string
    wordsLearned?: number
    wordsReviewed?: number
    accuracy?: Decimal | DecimalJsLike | number | string
    lastStudiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserPackProgressInput
    pack: WordPackCreateNestedOneWithoutUserProgressInput
  }

  export type UserPackProgressUncheckedCreateInput = {
    id?: string
    userId: string
    packId: string
    wordsLearned?: number
    wordsReviewed?: number
    accuracy?: Decimal | DecimalJsLike | number | string
    lastStudiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPackProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    wordsLearned?: IntFieldUpdateOperationsInput | number
    wordsReviewed?: IntFieldUpdateOperationsInput | number
    accuracy?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserPackProgressNestedInput
    pack?: WordPackUpdateOneRequiredWithoutUserProgressNestedInput
  }

  export type UserPackProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    wordsLearned?: IntFieldUpdateOperationsInput | number
    wordsReviewed?: IntFieldUpdateOperationsInput | number
    accuracy?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPackProgressCreateManyInput = {
    id?: string
    userId: string
    packId: string
    wordsLearned?: number
    wordsReviewed?: number
    accuracy?: Decimal | DecimalJsLike | number | string
    lastStudiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPackProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    wordsLearned?: IntFieldUpdateOperationsInput | number
    wordsReviewed?: IntFieldUpdateOperationsInput | number
    accuracy?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPackProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    wordsLearned?: IntFieldUpdateOperationsInput | number
    wordsReviewed?: IntFieldUpdateOperationsInput | number
    accuracy?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocabularyCreateInput = {
    id?: string
    level?: $Enums.VocabularyLevel
    repetitions?: number
    easeFactor?: Decimal | DecimalJsLike | number | string
    interval?: number
    nextReviewAt?: Date | string | null
    correctCount?: number
    incorrectCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReviewedAt?: Date | string | null
    user: UserCreateNestedOneWithoutVocabularyInput
    word: WordCreateNestedOneWithoutVocabularyInput
  }

  export type VocabularyUncheckedCreateInput = {
    id?: string
    userId: string
    wordId: string
    level?: $Enums.VocabularyLevel
    repetitions?: number
    easeFactor?: Decimal | DecimalJsLike | number | string
    interval?: number
    nextReviewAt?: Date | string | null
    correctCount?: number
    incorrectCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReviewedAt?: Date | string | null
  }

  export type VocabularyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: EnumVocabularyLevelFieldUpdateOperationsInput | $Enums.VocabularyLevel
    repetitions?: IntFieldUpdateOperationsInput | number
    easeFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: IntFieldUpdateOperationsInput | number
    nextReviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutVocabularyNestedInput
    word?: WordUpdateOneRequiredWithoutVocabularyNestedInput
  }

  export type VocabularyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    wordId?: StringFieldUpdateOperationsInput | string
    level?: EnumVocabularyLevelFieldUpdateOperationsInput | $Enums.VocabularyLevel
    repetitions?: IntFieldUpdateOperationsInput | number
    easeFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: IntFieldUpdateOperationsInput | number
    nextReviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VocabularyCreateManyInput = {
    id?: string
    userId: string
    wordId: string
    level?: $Enums.VocabularyLevel
    repetitions?: number
    easeFactor?: Decimal | DecimalJsLike | number | string
    interval?: number
    nextReviewAt?: Date | string | null
    correctCount?: number
    incorrectCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReviewedAt?: Date | string | null
  }

  export type VocabularyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: EnumVocabularyLevelFieldUpdateOperationsInput | $Enums.VocabularyLevel
    repetitions?: IntFieldUpdateOperationsInput | number
    easeFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: IntFieldUpdateOperationsInput | number
    nextReviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VocabularyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    wordId?: StringFieldUpdateOperationsInput | string
    level?: EnumVocabularyLevelFieldUpdateOperationsInput | $Enums.VocabularyLevel
    repetitions?: IntFieldUpdateOperationsInput | number
    easeFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: IntFieldUpdateOperationsInput | number
    nextReviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LearningStatsCreateInput = {
    id?: string
    totalWordsLearned?: number
    totalReviews?: number
    currentStreak?: number
    longestStreak?: number
    totalStudyTime?: number
    lastStudyDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutLearningStatsInput
  }

  export type LearningStatsUncheckedCreateInput = {
    id?: string
    userId: string
    totalWordsLearned?: number
    totalReviews?: number
    currentStreak?: number
    longestStreak?: number
    totalStudyTime?: number
    lastStudyDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalWordsLearned?: IntFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    lastStudyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLearningStatsNestedInput
  }

  export type LearningStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalWordsLearned?: IntFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    lastStudyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningStatsCreateManyInput = {
    id?: string
    userId: string
    totalWordsLearned?: number
    totalReviews?: number
    currentStreak?: number
    longestStreak?: number
    totalStudyTime?: number
    lastStudyDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalWordsLearned?: IntFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    lastStudyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    totalWordsLearned?: IntFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    lastStudyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisCreateInput = {
    id?: string
    inputText: string
    result: JsonNullValueInput | InputJsonValue
    language?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAnalysesInput
  }

  export type AnalysisUncheckedCreateInput = {
    id?: string
    userId: string
    inputText: string
    result: JsonNullValueInput | InputJsonValue
    language?: string
    createdAt?: Date | string
  }

  export type AnalysisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    result?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAnalysesNestedInput
  }

  export type AnalysisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    result?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisCreateManyInput = {
    id?: string
    userId: string
    inputText: string
    result: JsonNullValueInput | InputJsonValue
    language?: string
    createdAt?: Date | string
  }

  export type AnalysisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    result?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    result?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderFilter<$PrismaModel> | $Enums.AuthProvider
  }

  export type EnumSubscriptionTierFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionTier | EnumSubscriptionTierFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionTierFilter<$PrismaModel> | $Enums.SubscriptionTier
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SubscriptionListRelationFilter = {
    every?: SubscriptionWhereInput
    some?: SubscriptionWhereInput
    none?: SubscriptionWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type CreditTransactionListRelationFilter = {
    every?: CreditTransactionWhereInput
    some?: CreditTransactionWhereInput
    none?: CreditTransactionWhereInput
  }

  export type UserPackProgressListRelationFilter = {
    every?: UserPackProgressWhereInput
    some?: UserPackProgressWhereInput
    none?: UserPackProgressWhereInput
  }

  export type VocabularyListRelationFilter = {
    every?: VocabularyWhereInput
    some?: VocabularyWhereInput
    none?: VocabularyWhereInput
  }

  export type LearningStatsListRelationFilter = {
    every?: LearningStatsWhereInput
    some?: LearningStatsWhereInput
    none?: LearningStatsWhereInput
  }

  export type AnalysisListRelationFilter = {
    every?: AnalysisWhereInput
    some?: AnalysisWhereInput
    none?: AnalysisWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SubscriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreditTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserPackProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VocabularyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LearningStatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnalysisOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    subscriptionTier?: SortOrder
    credits?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    credits?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    subscriptionTier?: SortOrder
    credits?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    subscriptionTier?: SortOrder
    credits?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    credits?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderFilter<$PrismaModel>
  }

  export type EnumSubscriptionTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionTier | EnumSubscriptionTierFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionTierWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionTierFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionTierFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    stripeProductId?: SortOrder
    billingPeriod?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    canceledAt?: SortOrder
    monthlyCredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionAvgOrderByAggregateInput = {
    monthlyCredits?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    stripeProductId?: SortOrder
    billingPeriod?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    canceledAt?: SortOrder
    monthlyCredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    stripeSubscriptionId?: SortOrder
    stripePriceId?: SortOrder
    stripeProductId?: SortOrder
    billingPeriod?: SortOrder
    currentPeriodStart?: SortOrder
    currentPeriodEnd?: SortOrder
    cancelAtPeriodEnd?: SortOrder
    canceledAt?: SortOrder
    monthlyCredits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionSumOrderByAggregateInput = {
    monthlyCredits?: SortOrder
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type EnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    type?: SortOrder
    stripePaymentIntentId?: SortOrder
    stripeInvoiceId?: SortOrder
    externalPaymentId?: SortOrder
    subscriptionId?: SortOrder
    creditAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paidAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
    creditAmount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    type?: SortOrder
    stripePaymentIntentId?: SortOrder
    stripeInvoiceId?: SortOrder
    externalPaymentId?: SortOrder
    subscriptionId?: SortOrder
    creditAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paidAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    type?: SortOrder
    stripePaymentIntentId?: SortOrder
    stripeInvoiceId?: SortOrder
    externalPaymentId?: SortOrder
    subscriptionId?: SortOrder
    creditAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paidAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
    creditAmount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumCreditTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditTransactionType | EnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditTransactionTypeFilter<$PrismaModel> | $Enums.CreditTransactionType
  }

  export type CreditTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    type?: SortOrder
    description?: SortOrder
    paymentId?: SortOrder
    featureType?: SortOrder
    relatedEntityId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type CreditTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    type?: SortOrder
    description?: SortOrder
    paymentId?: SortOrder
    featureType?: SortOrder
    relatedEntityId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    type?: SortOrder
    description?: SortOrder
    paymentId?: SortOrder
    featureType?: SortOrder
    relatedEntityId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type EnumCreditTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditTransactionType | EnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.CreditTransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreditTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumCreditTransactionTypeFilter<$PrismaModel>
  }

  export type EnumFeatureTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureType | EnumFeatureTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureType[] | ListEnumFeatureTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureType[] | ListEnumFeatureTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureTypeFilter<$PrismaModel> | $Enums.FeatureType
  }

  export type FeatureAccessCountOrderByAggregateInput = {
    id?: SortOrder
    featureType?: SortOrder
    minTier?: SortOrder
    creditCost?: SortOrder
    freeLimitDaily?: SortOrder
    proLimitDaily?: SortOrder
    premiumLimitDaily?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureAccessAvgOrderByAggregateInput = {
    creditCost?: SortOrder
    freeLimitDaily?: SortOrder
    proLimitDaily?: SortOrder
    premiumLimitDaily?: SortOrder
  }

  export type FeatureAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    featureType?: SortOrder
    minTier?: SortOrder
    creditCost?: SortOrder
    freeLimitDaily?: SortOrder
    proLimitDaily?: SortOrder
    premiumLimitDaily?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureAccessMinOrderByAggregateInput = {
    id?: SortOrder
    featureType?: SortOrder
    minTier?: SortOrder
    creditCost?: SortOrder
    freeLimitDaily?: SortOrder
    proLimitDaily?: SortOrder
    premiumLimitDaily?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureAccessSumOrderByAggregateInput = {
    creditCost?: SortOrder
    freeLimitDaily?: SortOrder
    proLimitDaily?: SortOrder
    premiumLimitDaily?: SortOrder
  }

  export type EnumFeatureTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureType | EnumFeatureTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureType[] | ListEnumFeatureTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureType[] | ListEnumFeatureTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureTypeWithAggregatesFilter<$PrismaModel> | $Enums.FeatureType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeatureTypeFilter<$PrismaModel>
    _max?: NestedEnumFeatureTypeFilter<$PrismaModel>
  }

  export type EnumPackCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PackCategory | EnumPackCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PackCategory[] | ListEnumPackCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackCategory[] | ListEnumPackCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPackCategoryFilter<$PrismaModel> | $Enums.PackCategory
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type WordListRelationFilter = {
    every?: WordWhereInput
    some?: WordWhereInput
    none?: WordWhereInput
  }

  export type WordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WordPackCountOrderByAggregateInput = {
    id?: SortOrder
    packId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    requiredTier?: SortOrder
    creditCost?: SortOrder
    wordCount?: SortOrder
    difficulty?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordPackAvgOrderByAggregateInput = {
    creditCost?: SortOrder
    wordCount?: SortOrder
  }

  export type WordPackMaxOrderByAggregateInput = {
    id?: SortOrder
    packId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    requiredTier?: SortOrder
    creditCost?: SortOrder
    wordCount?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordPackMinOrderByAggregateInput = {
    id?: SortOrder
    packId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    requiredTier?: SortOrder
    creditCost?: SortOrder
    wordCount?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordPackSumOrderByAggregateInput = {
    creditCost?: SortOrder
    wordCount?: SortOrder
  }

  export type EnumPackCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PackCategory | EnumPackCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PackCategory[] | ListEnumPackCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackCategory[] | ListEnumPackCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPackCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PackCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPackCategoryFilter<$PrismaModel>
    _max?: NestedEnumPackCategoryFilter<$PrismaModel>
  }

  export type WordPackScalarRelationFilter = {
    is?: WordPackWhereInput
    isNot?: WordPackWhereInput
  }

  export type WordCountOrderByAggregateInput = {
    id?: SortOrder
    packId?: SortOrder
    word?: SortOrder
    reading?: SortOrder
    romaji?: SortOrder
    meaning?: SortOrder
    partOfSpeech?: SortOrder
    example?: SortOrder
    exampleTranslation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordMaxOrderByAggregateInput = {
    id?: SortOrder
    packId?: SortOrder
    word?: SortOrder
    reading?: SortOrder
    romaji?: SortOrder
    meaning?: SortOrder
    partOfSpeech?: SortOrder
    example?: SortOrder
    exampleTranslation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WordMinOrderByAggregateInput = {
    id?: SortOrder
    packId?: SortOrder
    word?: SortOrder
    reading?: SortOrder
    romaji?: SortOrder
    meaning?: SortOrder
    partOfSpeech?: SortOrder
    example?: SortOrder
    exampleTranslation?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserPackProgressUserIdPackIdCompoundUniqueInput = {
    userId: string
    packId: string
  }

  export type UserPackProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    packId?: SortOrder
    wordsLearned?: SortOrder
    wordsReviewed?: SortOrder
    accuracy?: SortOrder
    lastStudiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserPackProgressAvgOrderByAggregateInput = {
    wordsLearned?: SortOrder
    wordsReviewed?: SortOrder
    accuracy?: SortOrder
  }

  export type UserPackProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    packId?: SortOrder
    wordsLearned?: SortOrder
    wordsReviewed?: SortOrder
    accuracy?: SortOrder
    lastStudiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserPackProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    packId?: SortOrder
    wordsLearned?: SortOrder
    wordsReviewed?: SortOrder
    accuracy?: SortOrder
    lastStudiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserPackProgressSumOrderByAggregateInput = {
    wordsLearned?: SortOrder
    wordsReviewed?: SortOrder
    accuracy?: SortOrder
  }

  export type EnumVocabularyLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.VocabularyLevel | EnumVocabularyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.VocabularyLevel[] | ListEnumVocabularyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.VocabularyLevel[] | ListEnumVocabularyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumVocabularyLevelFilter<$PrismaModel> | $Enums.VocabularyLevel
  }

  export type WordScalarRelationFilter = {
    is?: WordWhereInput
    isNot?: WordWhereInput
  }

  export type VocabularyUserIdWordIdCompoundUniqueInput = {
    userId: string
    wordId: string
  }

  export type VocabularyCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    wordId?: SortOrder
    level?: SortOrder
    repetitions?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    nextReviewAt?: SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastReviewedAt?: SortOrder
  }

  export type VocabularyAvgOrderByAggregateInput = {
    repetitions?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
  }

  export type VocabularyMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    wordId?: SortOrder
    level?: SortOrder
    repetitions?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    nextReviewAt?: SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastReviewedAt?: SortOrder
  }

  export type VocabularyMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    wordId?: SortOrder
    level?: SortOrder
    repetitions?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    nextReviewAt?: SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastReviewedAt?: SortOrder
  }

  export type VocabularySumOrderByAggregateInput = {
    repetitions?: SortOrder
    easeFactor?: SortOrder
    interval?: SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
  }

  export type EnumVocabularyLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VocabularyLevel | EnumVocabularyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.VocabularyLevel[] | ListEnumVocabularyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.VocabularyLevel[] | ListEnumVocabularyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumVocabularyLevelWithAggregatesFilter<$PrismaModel> | $Enums.VocabularyLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVocabularyLevelFilter<$PrismaModel>
    _max?: NestedEnumVocabularyLevelFilter<$PrismaModel>
  }

  export type LearningStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalWordsLearned?: SortOrder
    totalReviews?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalStudyTime?: SortOrder
    lastStudyDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningStatsAvgOrderByAggregateInput = {
    totalWordsLearned?: SortOrder
    totalReviews?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalStudyTime?: SortOrder
  }

  export type LearningStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalWordsLearned?: SortOrder
    totalReviews?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalStudyTime?: SortOrder
    lastStudyDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    totalWordsLearned?: SortOrder
    totalReviews?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalStudyTime?: SortOrder
    lastStudyDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningStatsSumOrderByAggregateInput = {
    totalWordsLearned?: SortOrder
    totalReviews?: SortOrder
    currentStreak?: SortOrder
    longestStreak?: SortOrder
    totalStudyTime?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    inputText?: SortOrder
    result?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    inputText?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    inputText?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type SubscriptionCreateNestedManyWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput> | SubscriptionCreateWithoutUserInput[] | SubscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput | SubscriptionCreateOrConnectWithoutUserInput[]
    createMany?: SubscriptionCreateManyUserInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type CreditTransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput> | CreditTransactionCreateWithoutUserInput[] | CreditTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutUserInput | CreditTransactionCreateOrConnectWithoutUserInput[]
    createMany?: CreditTransactionCreateManyUserInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type UserPackProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<UserPackProgressCreateWithoutUserInput, UserPackProgressUncheckedCreateWithoutUserInput> | UserPackProgressCreateWithoutUserInput[] | UserPackProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPackProgressCreateOrConnectWithoutUserInput | UserPackProgressCreateOrConnectWithoutUserInput[]
    createMany?: UserPackProgressCreateManyUserInputEnvelope
    connect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
  }

  export type VocabularyCreateNestedManyWithoutUserInput = {
    create?: XOR<VocabularyCreateWithoutUserInput, VocabularyUncheckedCreateWithoutUserInput> | VocabularyCreateWithoutUserInput[] | VocabularyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VocabularyCreateOrConnectWithoutUserInput | VocabularyCreateOrConnectWithoutUserInput[]
    createMany?: VocabularyCreateManyUserInputEnvelope
    connect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
  }

  export type LearningStatsCreateNestedManyWithoutUserInput = {
    create?: XOR<LearningStatsCreateWithoutUserInput, LearningStatsUncheckedCreateWithoutUserInput> | LearningStatsCreateWithoutUserInput[] | LearningStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningStatsCreateOrConnectWithoutUserInput | LearningStatsCreateOrConnectWithoutUserInput[]
    createMany?: LearningStatsCreateManyUserInputEnvelope
    connect?: LearningStatsWhereUniqueInput | LearningStatsWhereUniqueInput[]
  }

  export type AnalysisCreateNestedManyWithoutUserInput = {
    create?: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput> | AnalysisCreateWithoutUserInput[] | AnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutUserInput | AnalysisCreateOrConnectWithoutUserInput[]
    createMany?: AnalysisCreateManyUserInputEnvelope
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput> | SubscriptionCreateWithoutUserInput[] | SubscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput | SubscriptionCreateOrConnectWithoutUserInput[]
    createMany?: SubscriptionCreateManyUserInputEnvelope
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type CreditTransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput> | CreditTransactionCreateWithoutUserInput[] | CreditTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutUserInput | CreditTransactionCreateOrConnectWithoutUserInput[]
    createMany?: CreditTransactionCreateManyUserInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type UserPackProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserPackProgressCreateWithoutUserInput, UserPackProgressUncheckedCreateWithoutUserInput> | UserPackProgressCreateWithoutUserInput[] | UserPackProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPackProgressCreateOrConnectWithoutUserInput | UserPackProgressCreateOrConnectWithoutUserInput[]
    createMany?: UserPackProgressCreateManyUserInputEnvelope
    connect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
  }

  export type VocabularyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VocabularyCreateWithoutUserInput, VocabularyUncheckedCreateWithoutUserInput> | VocabularyCreateWithoutUserInput[] | VocabularyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VocabularyCreateOrConnectWithoutUserInput | VocabularyCreateOrConnectWithoutUserInput[]
    createMany?: VocabularyCreateManyUserInputEnvelope
    connect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
  }

  export type LearningStatsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LearningStatsCreateWithoutUserInput, LearningStatsUncheckedCreateWithoutUserInput> | LearningStatsCreateWithoutUserInput[] | LearningStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningStatsCreateOrConnectWithoutUserInput | LearningStatsCreateOrConnectWithoutUserInput[]
    createMany?: LearningStatsCreateManyUserInputEnvelope
    connect?: LearningStatsWhereUniqueInput | LearningStatsWhereUniqueInput[]
  }

  export type AnalysisUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput> | AnalysisCreateWithoutUserInput[] | AnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutUserInput | AnalysisCreateOrConnectWithoutUserInput[]
    createMany?: AnalysisCreateManyUserInputEnvelope
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAuthProviderFieldUpdateOperationsInput = {
    set?: $Enums.AuthProvider
  }

  export type EnumSubscriptionTierFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionTier
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SubscriptionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput> | SubscriptionCreateWithoutUserInput[] | SubscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput | SubscriptionCreateOrConnectWithoutUserInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutUserInput | SubscriptionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubscriptionCreateManyUserInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutUserInput | SubscriptionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutUserInput | SubscriptionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type CreditTransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput> | CreditTransactionCreateWithoutUserInput[] | CreditTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutUserInput | CreditTransactionCreateOrConnectWithoutUserInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutUserInput | CreditTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CreditTransactionCreateManyUserInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutUserInput | CreditTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutUserInput | CreditTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type UserPackProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserPackProgressCreateWithoutUserInput, UserPackProgressUncheckedCreateWithoutUserInput> | UserPackProgressCreateWithoutUserInput[] | UserPackProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPackProgressCreateOrConnectWithoutUserInput | UserPackProgressCreateOrConnectWithoutUserInput[]
    upsert?: UserPackProgressUpsertWithWhereUniqueWithoutUserInput | UserPackProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserPackProgressCreateManyUserInputEnvelope
    set?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    disconnect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    delete?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    connect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    update?: UserPackProgressUpdateWithWhereUniqueWithoutUserInput | UserPackProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserPackProgressUpdateManyWithWhereWithoutUserInput | UserPackProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserPackProgressScalarWhereInput | UserPackProgressScalarWhereInput[]
  }

  export type VocabularyUpdateManyWithoutUserNestedInput = {
    create?: XOR<VocabularyCreateWithoutUserInput, VocabularyUncheckedCreateWithoutUserInput> | VocabularyCreateWithoutUserInput[] | VocabularyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VocabularyCreateOrConnectWithoutUserInput | VocabularyCreateOrConnectWithoutUserInput[]
    upsert?: VocabularyUpsertWithWhereUniqueWithoutUserInput | VocabularyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VocabularyCreateManyUserInputEnvelope
    set?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    disconnect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    delete?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    connect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    update?: VocabularyUpdateWithWhereUniqueWithoutUserInput | VocabularyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VocabularyUpdateManyWithWhereWithoutUserInput | VocabularyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VocabularyScalarWhereInput | VocabularyScalarWhereInput[]
  }

  export type LearningStatsUpdateManyWithoutUserNestedInput = {
    create?: XOR<LearningStatsCreateWithoutUserInput, LearningStatsUncheckedCreateWithoutUserInput> | LearningStatsCreateWithoutUserInput[] | LearningStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningStatsCreateOrConnectWithoutUserInput | LearningStatsCreateOrConnectWithoutUserInput[]
    upsert?: LearningStatsUpsertWithWhereUniqueWithoutUserInput | LearningStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LearningStatsCreateManyUserInputEnvelope
    set?: LearningStatsWhereUniqueInput | LearningStatsWhereUniqueInput[]
    disconnect?: LearningStatsWhereUniqueInput | LearningStatsWhereUniqueInput[]
    delete?: LearningStatsWhereUniqueInput | LearningStatsWhereUniqueInput[]
    connect?: LearningStatsWhereUniqueInput | LearningStatsWhereUniqueInput[]
    update?: LearningStatsUpdateWithWhereUniqueWithoutUserInput | LearningStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LearningStatsUpdateManyWithWhereWithoutUserInput | LearningStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LearningStatsScalarWhereInput | LearningStatsScalarWhereInput[]
  }

  export type AnalysisUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput> | AnalysisCreateWithoutUserInput[] | AnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutUserInput | AnalysisCreateOrConnectWithoutUserInput[]
    upsert?: AnalysisUpsertWithWhereUniqueWithoutUserInput | AnalysisUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnalysisCreateManyUserInputEnvelope
    set?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    disconnect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    delete?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    update?: AnalysisUpdateWithWhereUniqueWithoutUserInput | AnalysisUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnalysisUpdateManyWithWhereWithoutUserInput | AnalysisUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput> | SubscriptionCreateWithoutUserInput[] | SubscriptionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput | SubscriptionCreateOrConnectWithoutUserInput[]
    upsert?: SubscriptionUpsertWithWhereUniqueWithoutUserInput | SubscriptionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SubscriptionCreateManyUserInputEnvelope
    set?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    disconnect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    delete?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    connect?: SubscriptionWhereUniqueInput | SubscriptionWhereUniqueInput[]
    update?: SubscriptionUpdateWithWhereUniqueWithoutUserInput | SubscriptionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SubscriptionUpdateManyWithWhereWithoutUserInput | SubscriptionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type CreditTransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput> | CreditTransactionCreateWithoutUserInput[] | CreditTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutUserInput | CreditTransactionCreateOrConnectWithoutUserInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutUserInput | CreditTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CreditTransactionCreateManyUserInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutUserInput | CreditTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutUserInput | CreditTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type UserPackProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserPackProgressCreateWithoutUserInput, UserPackProgressUncheckedCreateWithoutUserInput> | UserPackProgressCreateWithoutUserInput[] | UserPackProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPackProgressCreateOrConnectWithoutUserInput | UserPackProgressCreateOrConnectWithoutUserInput[]
    upsert?: UserPackProgressUpsertWithWhereUniqueWithoutUserInput | UserPackProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserPackProgressCreateManyUserInputEnvelope
    set?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    disconnect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    delete?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    connect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    update?: UserPackProgressUpdateWithWhereUniqueWithoutUserInput | UserPackProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserPackProgressUpdateManyWithWhereWithoutUserInput | UserPackProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserPackProgressScalarWhereInput | UserPackProgressScalarWhereInput[]
  }

  export type VocabularyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VocabularyCreateWithoutUserInput, VocabularyUncheckedCreateWithoutUserInput> | VocabularyCreateWithoutUserInput[] | VocabularyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VocabularyCreateOrConnectWithoutUserInput | VocabularyCreateOrConnectWithoutUserInput[]
    upsert?: VocabularyUpsertWithWhereUniqueWithoutUserInput | VocabularyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VocabularyCreateManyUserInputEnvelope
    set?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    disconnect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    delete?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    connect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    update?: VocabularyUpdateWithWhereUniqueWithoutUserInput | VocabularyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VocabularyUpdateManyWithWhereWithoutUserInput | VocabularyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VocabularyScalarWhereInput | VocabularyScalarWhereInput[]
  }

  export type LearningStatsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LearningStatsCreateWithoutUserInput, LearningStatsUncheckedCreateWithoutUserInput> | LearningStatsCreateWithoutUserInput[] | LearningStatsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningStatsCreateOrConnectWithoutUserInput | LearningStatsCreateOrConnectWithoutUserInput[]
    upsert?: LearningStatsUpsertWithWhereUniqueWithoutUserInput | LearningStatsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LearningStatsCreateManyUserInputEnvelope
    set?: LearningStatsWhereUniqueInput | LearningStatsWhereUniqueInput[]
    disconnect?: LearningStatsWhereUniqueInput | LearningStatsWhereUniqueInput[]
    delete?: LearningStatsWhereUniqueInput | LearningStatsWhereUniqueInput[]
    connect?: LearningStatsWhereUniqueInput | LearningStatsWhereUniqueInput[]
    update?: LearningStatsUpdateWithWhereUniqueWithoutUserInput | LearningStatsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LearningStatsUpdateManyWithWhereWithoutUserInput | LearningStatsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LearningStatsScalarWhereInput | LearningStatsScalarWhereInput[]
  }

  export type AnalysisUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput> | AnalysisCreateWithoutUserInput[] | AnalysisUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AnalysisCreateOrConnectWithoutUserInput | AnalysisCreateOrConnectWithoutUserInput[]
    upsert?: AnalysisUpsertWithWhereUniqueWithoutUserInput | AnalysisUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AnalysisCreateManyUserInputEnvelope
    set?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    disconnect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    delete?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    connect?: AnalysisWhereUniqueInput | AnalysisWhereUniqueInput[]
    update?: AnalysisUpdateWithWhereUniqueWithoutUserInput | AnalysisUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AnalysisUpdateManyWithWhereWithoutUserInput | AnalysisUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSubscriptionsInput = {
    create?: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutSubscriptionsNestedInput = {
    create?: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionsInput
    upsert?: UserUpsertWithoutSubscriptionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubscriptionsInput, UserUpdateWithoutSubscriptionsInput>, UserUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type EnumPaymentTypeFieldUpdateOperationsInput = {
    set?: $Enums.PaymentType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentsInput, UserUpdateWithoutPaymentsInput>, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserCreateNestedOneWithoutCreditTransactionsInput = {
    create?: XOR<UserCreateWithoutCreditTransactionsInput, UserUncheckedCreateWithoutCreditTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumCreditTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.CreditTransactionType
  }

  export type UserUpdateOneRequiredWithoutCreditTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutCreditTransactionsInput, UserUncheckedCreateWithoutCreditTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditTransactionsInput
    upsert?: UserUpsertWithoutCreditTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreditTransactionsInput, UserUpdateWithoutCreditTransactionsInput>, UserUncheckedUpdateWithoutCreditTransactionsInput>
  }

  export type EnumFeatureTypeFieldUpdateOperationsInput = {
    set?: $Enums.FeatureType
  }

  export type WordPackCreatetagsInput = {
    set: string[]
  }

  export type WordCreateNestedManyWithoutPackInput = {
    create?: XOR<WordCreateWithoutPackInput, WordUncheckedCreateWithoutPackInput> | WordCreateWithoutPackInput[] | WordUncheckedCreateWithoutPackInput[]
    connectOrCreate?: WordCreateOrConnectWithoutPackInput | WordCreateOrConnectWithoutPackInput[]
    createMany?: WordCreateManyPackInputEnvelope
    connect?: WordWhereUniqueInput | WordWhereUniqueInput[]
  }

  export type UserPackProgressCreateNestedManyWithoutPackInput = {
    create?: XOR<UserPackProgressCreateWithoutPackInput, UserPackProgressUncheckedCreateWithoutPackInput> | UserPackProgressCreateWithoutPackInput[] | UserPackProgressUncheckedCreateWithoutPackInput[]
    connectOrCreate?: UserPackProgressCreateOrConnectWithoutPackInput | UserPackProgressCreateOrConnectWithoutPackInput[]
    createMany?: UserPackProgressCreateManyPackInputEnvelope
    connect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
  }

  export type WordUncheckedCreateNestedManyWithoutPackInput = {
    create?: XOR<WordCreateWithoutPackInput, WordUncheckedCreateWithoutPackInput> | WordCreateWithoutPackInput[] | WordUncheckedCreateWithoutPackInput[]
    connectOrCreate?: WordCreateOrConnectWithoutPackInput | WordCreateOrConnectWithoutPackInput[]
    createMany?: WordCreateManyPackInputEnvelope
    connect?: WordWhereUniqueInput | WordWhereUniqueInput[]
  }

  export type UserPackProgressUncheckedCreateNestedManyWithoutPackInput = {
    create?: XOR<UserPackProgressCreateWithoutPackInput, UserPackProgressUncheckedCreateWithoutPackInput> | UserPackProgressCreateWithoutPackInput[] | UserPackProgressUncheckedCreateWithoutPackInput[]
    connectOrCreate?: UserPackProgressCreateOrConnectWithoutPackInput | UserPackProgressCreateOrConnectWithoutPackInput[]
    createMany?: UserPackProgressCreateManyPackInputEnvelope
    connect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
  }

  export type EnumPackCategoryFieldUpdateOperationsInput = {
    set?: $Enums.PackCategory
  }

  export type WordPackUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type WordUpdateManyWithoutPackNestedInput = {
    create?: XOR<WordCreateWithoutPackInput, WordUncheckedCreateWithoutPackInput> | WordCreateWithoutPackInput[] | WordUncheckedCreateWithoutPackInput[]
    connectOrCreate?: WordCreateOrConnectWithoutPackInput | WordCreateOrConnectWithoutPackInput[]
    upsert?: WordUpsertWithWhereUniqueWithoutPackInput | WordUpsertWithWhereUniqueWithoutPackInput[]
    createMany?: WordCreateManyPackInputEnvelope
    set?: WordWhereUniqueInput | WordWhereUniqueInput[]
    disconnect?: WordWhereUniqueInput | WordWhereUniqueInput[]
    delete?: WordWhereUniqueInput | WordWhereUniqueInput[]
    connect?: WordWhereUniqueInput | WordWhereUniqueInput[]
    update?: WordUpdateWithWhereUniqueWithoutPackInput | WordUpdateWithWhereUniqueWithoutPackInput[]
    updateMany?: WordUpdateManyWithWhereWithoutPackInput | WordUpdateManyWithWhereWithoutPackInput[]
    deleteMany?: WordScalarWhereInput | WordScalarWhereInput[]
  }

  export type UserPackProgressUpdateManyWithoutPackNestedInput = {
    create?: XOR<UserPackProgressCreateWithoutPackInput, UserPackProgressUncheckedCreateWithoutPackInput> | UserPackProgressCreateWithoutPackInput[] | UserPackProgressUncheckedCreateWithoutPackInput[]
    connectOrCreate?: UserPackProgressCreateOrConnectWithoutPackInput | UserPackProgressCreateOrConnectWithoutPackInput[]
    upsert?: UserPackProgressUpsertWithWhereUniqueWithoutPackInput | UserPackProgressUpsertWithWhereUniqueWithoutPackInput[]
    createMany?: UserPackProgressCreateManyPackInputEnvelope
    set?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    disconnect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    delete?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    connect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    update?: UserPackProgressUpdateWithWhereUniqueWithoutPackInput | UserPackProgressUpdateWithWhereUniqueWithoutPackInput[]
    updateMany?: UserPackProgressUpdateManyWithWhereWithoutPackInput | UserPackProgressUpdateManyWithWhereWithoutPackInput[]
    deleteMany?: UserPackProgressScalarWhereInput | UserPackProgressScalarWhereInput[]
  }

  export type WordUncheckedUpdateManyWithoutPackNestedInput = {
    create?: XOR<WordCreateWithoutPackInput, WordUncheckedCreateWithoutPackInput> | WordCreateWithoutPackInput[] | WordUncheckedCreateWithoutPackInput[]
    connectOrCreate?: WordCreateOrConnectWithoutPackInput | WordCreateOrConnectWithoutPackInput[]
    upsert?: WordUpsertWithWhereUniqueWithoutPackInput | WordUpsertWithWhereUniqueWithoutPackInput[]
    createMany?: WordCreateManyPackInputEnvelope
    set?: WordWhereUniqueInput | WordWhereUniqueInput[]
    disconnect?: WordWhereUniqueInput | WordWhereUniqueInput[]
    delete?: WordWhereUniqueInput | WordWhereUniqueInput[]
    connect?: WordWhereUniqueInput | WordWhereUniqueInput[]
    update?: WordUpdateWithWhereUniqueWithoutPackInput | WordUpdateWithWhereUniqueWithoutPackInput[]
    updateMany?: WordUpdateManyWithWhereWithoutPackInput | WordUpdateManyWithWhereWithoutPackInput[]
    deleteMany?: WordScalarWhereInput | WordScalarWhereInput[]
  }

  export type UserPackProgressUncheckedUpdateManyWithoutPackNestedInput = {
    create?: XOR<UserPackProgressCreateWithoutPackInput, UserPackProgressUncheckedCreateWithoutPackInput> | UserPackProgressCreateWithoutPackInput[] | UserPackProgressUncheckedCreateWithoutPackInput[]
    connectOrCreate?: UserPackProgressCreateOrConnectWithoutPackInput | UserPackProgressCreateOrConnectWithoutPackInput[]
    upsert?: UserPackProgressUpsertWithWhereUniqueWithoutPackInput | UserPackProgressUpsertWithWhereUniqueWithoutPackInput[]
    createMany?: UserPackProgressCreateManyPackInputEnvelope
    set?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    disconnect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    delete?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    connect?: UserPackProgressWhereUniqueInput | UserPackProgressWhereUniqueInput[]
    update?: UserPackProgressUpdateWithWhereUniqueWithoutPackInput | UserPackProgressUpdateWithWhereUniqueWithoutPackInput[]
    updateMany?: UserPackProgressUpdateManyWithWhereWithoutPackInput | UserPackProgressUpdateManyWithWhereWithoutPackInput[]
    deleteMany?: UserPackProgressScalarWhereInput | UserPackProgressScalarWhereInput[]
  }

  export type WordPackCreateNestedOneWithoutWordsInput = {
    create?: XOR<WordPackCreateWithoutWordsInput, WordPackUncheckedCreateWithoutWordsInput>
    connectOrCreate?: WordPackCreateOrConnectWithoutWordsInput
    connect?: WordPackWhereUniqueInput
  }

  export type VocabularyCreateNestedManyWithoutWordInput = {
    create?: XOR<VocabularyCreateWithoutWordInput, VocabularyUncheckedCreateWithoutWordInput> | VocabularyCreateWithoutWordInput[] | VocabularyUncheckedCreateWithoutWordInput[]
    connectOrCreate?: VocabularyCreateOrConnectWithoutWordInput | VocabularyCreateOrConnectWithoutWordInput[]
    createMany?: VocabularyCreateManyWordInputEnvelope
    connect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
  }

  export type VocabularyUncheckedCreateNestedManyWithoutWordInput = {
    create?: XOR<VocabularyCreateWithoutWordInput, VocabularyUncheckedCreateWithoutWordInput> | VocabularyCreateWithoutWordInput[] | VocabularyUncheckedCreateWithoutWordInput[]
    connectOrCreate?: VocabularyCreateOrConnectWithoutWordInput | VocabularyCreateOrConnectWithoutWordInput[]
    createMany?: VocabularyCreateManyWordInputEnvelope
    connect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
  }

  export type WordPackUpdateOneRequiredWithoutWordsNestedInput = {
    create?: XOR<WordPackCreateWithoutWordsInput, WordPackUncheckedCreateWithoutWordsInput>
    connectOrCreate?: WordPackCreateOrConnectWithoutWordsInput
    upsert?: WordPackUpsertWithoutWordsInput
    connect?: WordPackWhereUniqueInput
    update?: XOR<XOR<WordPackUpdateToOneWithWhereWithoutWordsInput, WordPackUpdateWithoutWordsInput>, WordPackUncheckedUpdateWithoutWordsInput>
  }

  export type VocabularyUpdateManyWithoutWordNestedInput = {
    create?: XOR<VocabularyCreateWithoutWordInput, VocabularyUncheckedCreateWithoutWordInput> | VocabularyCreateWithoutWordInput[] | VocabularyUncheckedCreateWithoutWordInput[]
    connectOrCreate?: VocabularyCreateOrConnectWithoutWordInput | VocabularyCreateOrConnectWithoutWordInput[]
    upsert?: VocabularyUpsertWithWhereUniqueWithoutWordInput | VocabularyUpsertWithWhereUniqueWithoutWordInput[]
    createMany?: VocabularyCreateManyWordInputEnvelope
    set?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    disconnect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    delete?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    connect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    update?: VocabularyUpdateWithWhereUniqueWithoutWordInput | VocabularyUpdateWithWhereUniqueWithoutWordInput[]
    updateMany?: VocabularyUpdateManyWithWhereWithoutWordInput | VocabularyUpdateManyWithWhereWithoutWordInput[]
    deleteMany?: VocabularyScalarWhereInput | VocabularyScalarWhereInput[]
  }

  export type VocabularyUncheckedUpdateManyWithoutWordNestedInput = {
    create?: XOR<VocabularyCreateWithoutWordInput, VocabularyUncheckedCreateWithoutWordInput> | VocabularyCreateWithoutWordInput[] | VocabularyUncheckedCreateWithoutWordInput[]
    connectOrCreate?: VocabularyCreateOrConnectWithoutWordInput | VocabularyCreateOrConnectWithoutWordInput[]
    upsert?: VocabularyUpsertWithWhereUniqueWithoutWordInput | VocabularyUpsertWithWhereUniqueWithoutWordInput[]
    createMany?: VocabularyCreateManyWordInputEnvelope
    set?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    disconnect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    delete?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    connect?: VocabularyWhereUniqueInput | VocabularyWhereUniqueInput[]
    update?: VocabularyUpdateWithWhereUniqueWithoutWordInput | VocabularyUpdateWithWhereUniqueWithoutWordInput[]
    updateMany?: VocabularyUpdateManyWithWhereWithoutWordInput | VocabularyUpdateManyWithWhereWithoutWordInput[]
    deleteMany?: VocabularyScalarWhereInput | VocabularyScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserPackProgressInput = {
    create?: XOR<UserCreateWithoutUserPackProgressInput, UserUncheckedCreateWithoutUserPackProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserPackProgressInput
    connect?: UserWhereUniqueInput
  }

  export type WordPackCreateNestedOneWithoutUserProgressInput = {
    create?: XOR<WordPackCreateWithoutUserProgressInput, WordPackUncheckedCreateWithoutUserProgressInput>
    connectOrCreate?: WordPackCreateOrConnectWithoutUserProgressInput
    connect?: WordPackWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserPackProgressNestedInput = {
    create?: XOR<UserCreateWithoutUserPackProgressInput, UserUncheckedCreateWithoutUserPackProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserPackProgressInput
    upsert?: UserUpsertWithoutUserPackProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserPackProgressInput, UserUpdateWithoutUserPackProgressInput>, UserUncheckedUpdateWithoutUserPackProgressInput>
  }

  export type WordPackUpdateOneRequiredWithoutUserProgressNestedInput = {
    create?: XOR<WordPackCreateWithoutUserProgressInput, WordPackUncheckedCreateWithoutUserProgressInput>
    connectOrCreate?: WordPackCreateOrConnectWithoutUserProgressInput
    upsert?: WordPackUpsertWithoutUserProgressInput
    connect?: WordPackWhereUniqueInput
    update?: XOR<XOR<WordPackUpdateToOneWithWhereWithoutUserProgressInput, WordPackUpdateWithoutUserProgressInput>, WordPackUncheckedUpdateWithoutUserProgressInput>
  }

  export type UserCreateNestedOneWithoutVocabularyInput = {
    create?: XOR<UserCreateWithoutVocabularyInput, UserUncheckedCreateWithoutVocabularyInput>
    connectOrCreate?: UserCreateOrConnectWithoutVocabularyInput
    connect?: UserWhereUniqueInput
  }

  export type WordCreateNestedOneWithoutVocabularyInput = {
    create?: XOR<WordCreateWithoutVocabularyInput, WordUncheckedCreateWithoutVocabularyInput>
    connectOrCreate?: WordCreateOrConnectWithoutVocabularyInput
    connect?: WordWhereUniqueInput
  }

  export type EnumVocabularyLevelFieldUpdateOperationsInput = {
    set?: $Enums.VocabularyLevel
  }

  export type UserUpdateOneRequiredWithoutVocabularyNestedInput = {
    create?: XOR<UserCreateWithoutVocabularyInput, UserUncheckedCreateWithoutVocabularyInput>
    connectOrCreate?: UserCreateOrConnectWithoutVocabularyInput
    upsert?: UserUpsertWithoutVocabularyInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVocabularyInput, UserUpdateWithoutVocabularyInput>, UserUncheckedUpdateWithoutVocabularyInput>
  }

  export type WordUpdateOneRequiredWithoutVocabularyNestedInput = {
    create?: XOR<WordCreateWithoutVocabularyInput, WordUncheckedCreateWithoutVocabularyInput>
    connectOrCreate?: WordCreateOrConnectWithoutVocabularyInput
    upsert?: WordUpsertWithoutVocabularyInput
    connect?: WordWhereUniqueInput
    update?: XOR<XOR<WordUpdateToOneWithWhereWithoutVocabularyInput, WordUpdateWithoutVocabularyInput>, WordUncheckedUpdateWithoutVocabularyInput>
  }

  export type UserCreateNestedOneWithoutLearningStatsInput = {
    create?: XOR<UserCreateWithoutLearningStatsInput, UserUncheckedCreateWithoutLearningStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLearningStatsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLearningStatsNestedInput = {
    create?: XOR<UserCreateWithoutLearningStatsInput, UserUncheckedCreateWithoutLearningStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLearningStatsInput
    upsert?: UserUpsertWithoutLearningStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLearningStatsInput, UserUpdateWithoutLearningStatsInput>, UserUncheckedUpdateWithoutLearningStatsInput>
  }

  export type UserCreateNestedOneWithoutAnalysesInput = {
    create?: XOR<UserCreateWithoutAnalysesInput, UserUncheckedCreateWithoutAnalysesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnalysesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAnalysesNestedInput = {
    create?: XOR<UserCreateWithoutAnalysesInput, UserUncheckedCreateWithoutAnalysesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAnalysesInput
    upsert?: UserUpsertWithoutAnalysesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAnalysesInput, UserUpdateWithoutAnalysesInput>, UserUncheckedUpdateWithoutAnalysesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderFilter<$PrismaModel> | $Enums.AuthProvider
  }

  export type NestedEnumSubscriptionTierFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionTier | EnumSubscriptionTierFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionTierFilter<$PrismaModel> | $Enums.SubscriptionTier
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionTier | EnumSubscriptionTierFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionTierWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionTierFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionTierFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCreditTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditTransactionType | EnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditTransactionTypeFilter<$PrismaModel> | $Enums.CreditTransactionType
  }

  export type NestedEnumCreditTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CreditTransactionType | EnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CreditTransactionType[] | ListEnumCreditTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCreditTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.CreditTransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCreditTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumCreditTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumFeatureTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureType | EnumFeatureTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureType[] | ListEnumFeatureTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureType[] | ListEnumFeatureTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureTypeFilter<$PrismaModel> | $Enums.FeatureType
  }

  export type NestedEnumFeatureTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FeatureType | EnumFeatureTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FeatureType[] | ListEnumFeatureTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FeatureType[] | ListEnumFeatureTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFeatureTypeWithAggregatesFilter<$PrismaModel> | $Enums.FeatureType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFeatureTypeFilter<$PrismaModel>
    _max?: NestedEnumFeatureTypeFilter<$PrismaModel>
  }

  export type NestedEnumPackCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PackCategory | EnumPackCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PackCategory[] | ListEnumPackCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackCategory[] | ListEnumPackCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPackCategoryFilter<$PrismaModel> | $Enums.PackCategory
  }

  export type NestedEnumPackCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PackCategory | EnumPackCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PackCategory[] | ListEnumPackCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PackCategory[] | ListEnumPackCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPackCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PackCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPackCategoryFilter<$PrismaModel>
    _max?: NestedEnumPackCategoryFilter<$PrismaModel>
  }

  export type NestedEnumVocabularyLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.VocabularyLevel | EnumVocabularyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.VocabularyLevel[] | ListEnumVocabularyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.VocabularyLevel[] | ListEnumVocabularyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumVocabularyLevelFilter<$PrismaModel> | $Enums.VocabularyLevel
  }

  export type NestedEnumVocabularyLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VocabularyLevel | EnumVocabularyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.VocabularyLevel[] | ListEnumVocabularyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.VocabularyLevel[] | ListEnumVocabularyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumVocabularyLevelWithAggregatesFilter<$PrismaModel> | $Enums.VocabularyLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVocabularyLevelFilter<$PrismaModel>
    _max?: NestedEnumVocabularyLevelFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SubscriptionCreateWithoutUserInput = {
    id?: string
    tier: $Enums.SubscriptionTier
    status?: $Enums.SubscriptionStatus
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeProductId?: string | null
    billingPeriod: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    monthlyCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUncheckedCreateWithoutUserInput = {
    id?: string
    tier: $Enums.SubscriptionTier
    status?: $Enums.SubscriptionStatus
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeProductId?: string | null
    billingPeriod: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    monthlyCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutUserInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
  }

  export type SubscriptionCreateManyUserInputEnvelope = {
    data: SubscriptionCreateManyUserInput | SubscriptionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    type: $Enums.PaymentType
    stripePaymentIntentId?: string | null
    stripeInvoiceId?: string | null
    externalPaymentId?: string | null
    subscriptionId?: string | null
    creditAmount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    type: $Enums.PaymentType
    stripePaymentIntentId?: string | null
    stripeInvoiceId?: string | null
    externalPaymentId?: string | null
    subscriptionId?: string | null
    creditAmount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: PaymentCreateManyUserInput | PaymentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CreditTransactionCreateWithoutUserInput = {
    id?: string
    amount: number
    balanceAfter: number
    type: $Enums.CreditTransactionType
    description?: string | null
    paymentId?: string | null
    featureType?: string | null
    relatedEntityId?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    balanceAfter: number
    type: $Enums.CreditTransactionType
    description?: string | null
    paymentId?: string | null
    featureType?: string | null
    relatedEntityId?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionCreateOrConnectWithoutUserInput = {
    where: CreditTransactionWhereUniqueInput
    create: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput>
  }

  export type CreditTransactionCreateManyUserInputEnvelope = {
    data: CreditTransactionCreateManyUserInput | CreditTransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserPackProgressCreateWithoutUserInput = {
    id?: string
    wordsLearned?: number
    wordsReviewed?: number
    accuracy?: Decimal | DecimalJsLike | number | string
    lastStudiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pack: WordPackCreateNestedOneWithoutUserProgressInput
  }

  export type UserPackProgressUncheckedCreateWithoutUserInput = {
    id?: string
    packId: string
    wordsLearned?: number
    wordsReviewed?: number
    accuracy?: Decimal | DecimalJsLike | number | string
    lastStudiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPackProgressCreateOrConnectWithoutUserInput = {
    where: UserPackProgressWhereUniqueInput
    create: XOR<UserPackProgressCreateWithoutUserInput, UserPackProgressUncheckedCreateWithoutUserInput>
  }

  export type UserPackProgressCreateManyUserInputEnvelope = {
    data: UserPackProgressCreateManyUserInput | UserPackProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VocabularyCreateWithoutUserInput = {
    id?: string
    level?: $Enums.VocabularyLevel
    repetitions?: number
    easeFactor?: Decimal | DecimalJsLike | number | string
    interval?: number
    nextReviewAt?: Date | string | null
    correctCount?: number
    incorrectCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReviewedAt?: Date | string | null
    word: WordCreateNestedOneWithoutVocabularyInput
  }

  export type VocabularyUncheckedCreateWithoutUserInput = {
    id?: string
    wordId: string
    level?: $Enums.VocabularyLevel
    repetitions?: number
    easeFactor?: Decimal | DecimalJsLike | number | string
    interval?: number
    nextReviewAt?: Date | string | null
    correctCount?: number
    incorrectCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReviewedAt?: Date | string | null
  }

  export type VocabularyCreateOrConnectWithoutUserInput = {
    where: VocabularyWhereUniqueInput
    create: XOR<VocabularyCreateWithoutUserInput, VocabularyUncheckedCreateWithoutUserInput>
  }

  export type VocabularyCreateManyUserInputEnvelope = {
    data: VocabularyCreateManyUserInput | VocabularyCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LearningStatsCreateWithoutUserInput = {
    id?: string
    totalWordsLearned?: number
    totalReviews?: number
    currentStreak?: number
    longestStreak?: number
    totalStudyTime?: number
    lastStudyDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningStatsUncheckedCreateWithoutUserInput = {
    id?: string
    totalWordsLearned?: number
    totalReviews?: number
    currentStreak?: number
    longestStreak?: number
    totalStudyTime?: number
    lastStudyDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningStatsCreateOrConnectWithoutUserInput = {
    where: LearningStatsWhereUniqueInput
    create: XOR<LearningStatsCreateWithoutUserInput, LearningStatsUncheckedCreateWithoutUserInput>
  }

  export type LearningStatsCreateManyUserInputEnvelope = {
    data: LearningStatsCreateManyUserInput | LearningStatsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AnalysisCreateWithoutUserInput = {
    id?: string
    inputText: string
    result: JsonNullValueInput | InputJsonValue
    language?: string
    createdAt?: Date | string
  }

  export type AnalysisUncheckedCreateWithoutUserInput = {
    id?: string
    inputText: string
    result: JsonNullValueInput | InputJsonValue
    language?: string
    createdAt?: Date | string
  }

  export type AnalysisCreateOrConnectWithoutUserInput = {
    where: AnalysisWhereUniqueInput
    create: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput>
  }

  export type AnalysisCreateManyUserInputEnvelope = {
    data: AnalysisCreateManyUserInput | AnalysisCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionUpsertWithWhereUniqueWithoutUserInput = {
    where: SubscriptionWhereUniqueInput
    update: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
  }

  export type SubscriptionUpdateWithWhereUniqueWithoutUserInput = {
    where: SubscriptionWhereUniqueInput
    data: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type SubscriptionUpdateManyWithWhereWithoutUserInput = {
    where: SubscriptionScalarWhereInput
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyWithoutUserInput>
  }

  export type SubscriptionScalarWhereInput = {
    AND?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    OR?: SubscriptionScalarWhereInput[]
    NOT?: SubscriptionScalarWhereInput | SubscriptionScalarWhereInput[]
    id?: StringFilter<"Subscription"> | string
    userId?: StringFilter<"Subscription"> | string
    tier?: EnumSubscriptionTierFilter<"Subscription"> | $Enums.SubscriptionTier
    status?: EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus
    stripeSubscriptionId?: StringNullableFilter<"Subscription"> | string | null
    stripePriceId?: StringNullableFilter<"Subscription"> | string | null
    stripeProductId?: StringNullableFilter<"Subscription"> | string | null
    billingPeriod?: StringFilter<"Subscription"> | string
    currentPeriodStart?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    cancelAtPeriodEnd?: BoolFilter<"Subscription"> | boolean
    canceledAt?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    monthlyCredits?: IntFilter<"Subscription"> | number
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    currency?: StringFilter<"Payment"> | string
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    type?: EnumPaymentTypeFilter<"Payment"> | $Enums.PaymentType
    stripePaymentIntentId?: StringNullableFilter<"Payment"> | string | null
    stripeInvoiceId?: StringNullableFilter<"Payment"> | string | null
    externalPaymentId?: StringNullableFilter<"Payment"> | string | null
    subscriptionId?: StringNullableFilter<"Payment"> | string | null
    creditAmount?: IntNullableFilter<"Payment"> | number | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
  }

  export type CreditTransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: CreditTransactionWhereUniqueInput
    update: XOR<CreditTransactionUpdateWithoutUserInput, CreditTransactionUncheckedUpdateWithoutUserInput>
    create: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput>
  }

  export type CreditTransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: CreditTransactionWhereUniqueInput
    data: XOR<CreditTransactionUpdateWithoutUserInput, CreditTransactionUncheckedUpdateWithoutUserInput>
  }

  export type CreditTransactionUpdateManyWithWhereWithoutUserInput = {
    where: CreditTransactionScalarWhereInput
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type CreditTransactionScalarWhereInput = {
    AND?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
    OR?: CreditTransactionScalarWhereInput[]
    NOT?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
    id?: StringFilter<"CreditTransaction"> | string
    userId?: StringFilter<"CreditTransaction"> | string
    amount?: IntFilter<"CreditTransaction"> | number
    balanceAfter?: IntFilter<"CreditTransaction"> | number
    type?: EnumCreditTransactionTypeFilter<"CreditTransaction"> | $Enums.CreditTransactionType
    description?: StringNullableFilter<"CreditTransaction"> | string | null
    paymentId?: StringNullableFilter<"CreditTransaction"> | string | null
    featureType?: StringNullableFilter<"CreditTransaction"> | string | null
    relatedEntityId?: StringNullableFilter<"CreditTransaction"> | string | null
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
  }

  export type UserPackProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: UserPackProgressWhereUniqueInput
    update: XOR<UserPackProgressUpdateWithoutUserInput, UserPackProgressUncheckedUpdateWithoutUserInput>
    create: XOR<UserPackProgressCreateWithoutUserInput, UserPackProgressUncheckedCreateWithoutUserInput>
  }

  export type UserPackProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: UserPackProgressWhereUniqueInput
    data: XOR<UserPackProgressUpdateWithoutUserInput, UserPackProgressUncheckedUpdateWithoutUserInput>
  }

  export type UserPackProgressUpdateManyWithWhereWithoutUserInput = {
    where: UserPackProgressScalarWhereInput
    data: XOR<UserPackProgressUpdateManyMutationInput, UserPackProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type UserPackProgressScalarWhereInput = {
    AND?: UserPackProgressScalarWhereInput | UserPackProgressScalarWhereInput[]
    OR?: UserPackProgressScalarWhereInput[]
    NOT?: UserPackProgressScalarWhereInput | UserPackProgressScalarWhereInput[]
    id?: StringFilter<"UserPackProgress"> | string
    userId?: StringFilter<"UserPackProgress"> | string
    packId?: StringFilter<"UserPackProgress"> | string
    wordsLearned?: IntFilter<"UserPackProgress"> | number
    wordsReviewed?: IntFilter<"UserPackProgress"> | number
    accuracy?: DecimalFilter<"UserPackProgress"> | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: DateTimeNullableFilter<"UserPackProgress"> | Date | string | null
    createdAt?: DateTimeFilter<"UserPackProgress"> | Date | string
    updatedAt?: DateTimeFilter<"UserPackProgress"> | Date | string
  }

  export type VocabularyUpsertWithWhereUniqueWithoutUserInput = {
    where: VocabularyWhereUniqueInput
    update: XOR<VocabularyUpdateWithoutUserInput, VocabularyUncheckedUpdateWithoutUserInput>
    create: XOR<VocabularyCreateWithoutUserInput, VocabularyUncheckedCreateWithoutUserInput>
  }

  export type VocabularyUpdateWithWhereUniqueWithoutUserInput = {
    where: VocabularyWhereUniqueInput
    data: XOR<VocabularyUpdateWithoutUserInput, VocabularyUncheckedUpdateWithoutUserInput>
  }

  export type VocabularyUpdateManyWithWhereWithoutUserInput = {
    where: VocabularyScalarWhereInput
    data: XOR<VocabularyUpdateManyMutationInput, VocabularyUncheckedUpdateManyWithoutUserInput>
  }

  export type VocabularyScalarWhereInput = {
    AND?: VocabularyScalarWhereInput | VocabularyScalarWhereInput[]
    OR?: VocabularyScalarWhereInput[]
    NOT?: VocabularyScalarWhereInput | VocabularyScalarWhereInput[]
    id?: StringFilter<"Vocabulary"> | string
    userId?: StringFilter<"Vocabulary"> | string
    wordId?: StringFilter<"Vocabulary"> | string
    level?: EnumVocabularyLevelFilter<"Vocabulary"> | $Enums.VocabularyLevel
    repetitions?: IntFilter<"Vocabulary"> | number
    easeFactor?: DecimalFilter<"Vocabulary"> | Decimal | DecimalJsLike | number | string
    interval?: IntFilter<"Vocabulary"> | number
    nextReviewAt?: DateTimeNullableFilter<"Vocabulary"> | Date | string | null
    correctCount?: IntFilter<"Vocabulary"> | number
    incorrectCount?: IntFilter<"Vocabulary"> | number
    createdAt?: DateTimeFilter<"Vocabulary"> | Date | string
    updatedAt?: DateTimeFilter<"Vocabulary"> | Date | string
    lastReviewedAt?: DateTimeNullableFilter<"Vocabulary"> | Date | string | null
  }

  export type LearningStatsUpsertWithWhereUniqueWithoutUserInput = {
    where: LearningStatsWhereUniqueInput
    update: XOR<LearningStatsUpdateWithoutUserInput, LearningStatsUncheckedUpdateWithoutUserInput>
    create: XOR<LearningStatsCreateWithoutUserInput, LearningStatsUncheckedCreateWithoutUserInput>
  }

  export type LearningStatsUpdateWithWhereUniqueWithoutUserInput = {
    where: LearningStatsWhereUniqueInput
    data: XOR<LearningStatsUpdateWithoutUserInput, LearningStatsUncheckedUpdateWithoutUserInput>
  }

  export type LearningStatsUpdateManyWithWhereWithoutUserInput = {
    where: LearningStatsScalarWhereInput
    data: XOR<LearningStatsUpdateManyMutationInput, LearningStatsUncheckedUpdateManyWithoutUserInput>
  }

  export type LearningStatsScalarWhereInput = {
    AND?: LearningStatsScalarWhereInput | LearningStatsScalarWhereInput[]
    OR?: LearningStatsScalarWhereInput[]
    NOT?: LearningStatsScalarWhereInput | LearningStatsScalarWhereInput[]
    id?: StringFilter<"LearningStats"> | string
    userId?: StringFilter<"LearningStats"> | string
    totalWordsLearned?: IntFilter<"LearningStats"> | number
    totalReviews?: IntFilter<"LearningStats"> | number
    currentStreak?: IntFilter<"LearningStats"> | number
    longestStreak?: IntFilter<"LearningStats"> | number
    totalStudyTime?: IntFilter<"LearningStats"> | number
    lastStudyDate?: DateTimeNullableFilter<"LearningStats"> | Date | string | null
    createdAt?: DateTimeFilter<"LearningStats"> | Date | string
    updatedAt?: DateTimeFilter<"LearningStats"> | Date | string
  }

  export type AnalysisUpsertWithWhereUniqueWithoutUserInput = {
    where: AnalysisWhereUniqueInput
    update: XOR<AnalysisUpdateWithoutUserInput, AnalysisUncheckedUpdateWithoutUserInput>
    create: XOR<AnalysisCreateWithoutUserInput, AnalysisUncheckedCreateWithoutUserInput>
  }

  export type AnalysisUpdateWithWhereUniqueWithoutUserInput = {
    where: AnalysisWhereUniqueInput
    data: XOR<AnalysisUpdateWithoutUserInput, AnalysisUncheckedUpdateWithoutUserInput>
  }

  export type AnalysisUpdateManyWithWhereWithoutUserInput = {
    where: AnalysisScalarWhereInput
    data: XOR<AnalysisUpdateManyMutationInput, AnalysisUncheckedUpdateManyWithoutUserInput>
  }

  export type AnalysisScalarWhereInput = {
    AND?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
    OR?: AnalysisScalarWhereInput[]
    NOT?: AnalysisScalarWhereInput | AnalysisScalarWhereInput[]
    id?: StringFilter<"Analysis"> | string
    userId?: StringFilter<"Analysis"> | string
    inputText?: StringFilter<"Analysis"> | string
    result?: JsonFilter<"Analysis">
    language?: StringFilter<"Analysis"> | string
    createdAt?: DateTimeFilter<"Analysis"> | Date | string
  }

  export type UserCreateWithoutSubscriptionsInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    payments?: PaymentCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsCreateNestedManyWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubscriptionsInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressUncheckedCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyUncheckedCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsUncheckedCreateNestedManyWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubscriptionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
  }

  export type UserUpsertWithoutSubscriptionsInput = {
    update: XOR<UserUpdateWithoutSubscriptionsInput, UserUncheckedUpdateWithoutSubscriptionsInput>
    create: XOR<UserCreateWithoutSubscriptionsInput, UserUncheckedCreateWithoutSubscriptionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubscriptionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubscriptionsInput, UserUncheckedUpdateWithoutSubscriptionsInput>
  }

  export type UserUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    payments?: PaymentUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubscriptionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUncheckedUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUncheckedUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUncheckedUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPaymentsInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsCreateNestedManyWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressUncheckedCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyUncheckedCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsUncheckedCreateNestedManyWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUncheckedUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUncheckedUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUncheckedUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCreditTransactionsInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsCreateNestedManyWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreditTransactionsInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressUncheckedCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyUncheckedCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsUncheckedCreateNestedManyWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreditTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreditTransactionsInput, UserUncheckedCreateWithoutCreditTransactionsInput>
  }

  export type UserUpsertWithoutCreditTransactionsInput = {
    update: XOR<UserUpdateWithoutCreditTransactionsInput, UserUncheckedUpdateWithoutCreditTransactionsInput>
    create: XOR<UserCreateWithoutCreditTransactionsInput, UserUncheckedCreateWithoutCreditTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreditTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreditTransactionsInput, UserUncheckedUpdateWithoutCreditTransactionsInput>
  }

  export type UserUpdateWithoutCreditTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreditTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUncheckedUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUncheckedUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUncheckedUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WordCreateWithoutPackInput = {
    id?: string
    word: string
    reading?: string | null
    romaji?: string | null
    meaning: string
    partOfSpeech?: string | null
    example?: string | null
    exampleTranslation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vocabulary?: VocabularyCreateNestedManyWithoutWordInput
  }

  export type WordUncheckedCreateWithoutPackInput = {
    id?: string
    word: string
    reading?: string | null
    romaji?: string | null
    meaning: string
    partOfSpeech?: string | null
    example?: string | null
    exampleTranslation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    vocabulary?: VocabularyUncheckedCreateNestedManyWithoutWordInput
  }

  export type WordCreateOrConnectWithoutPackInput = {
    where: WordWhereUniqueInput
    create: XOR<WordCreateWithoutPackInput, WordUncheckedCreateWithoutPackInput>
  }

  export type WordCreateManyPackInputEnvelope = {
    data: WordCreateManyPackInput | WordCreateManyPackInput[]
    skipDuplicates?: boolean
  }

  export type UserPackProgressCreateWithoutPackInput = {
    id?: string
    wordsLearned?: number
    wordsReviewed?: number
    accuracy?: Decimal | DecimalJsLike | number | string
    lastStudiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutUserPackProgressInput
  }

  export type UserPackProgressUncheckedCreateWithoutPackInput = {
    id?: string
    userId: string
    wordsLearned?: number
    wordsReviewed?: number
    accuracy?: Decimal | DecimalJsLike | number | string
    lastStudiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPackProgressCreateOrConnectWithoutPackInput = {
    where: UserPackProgressWhereUniqueInput
    create: XOR<UserPackProgressCreateWithoutPackInput, UserPackProgressUncheckedCreateWithoutPackInput>
  }

  export type UserPackProgressCreateManyPackInputEnvelope = {
    data: UserPackProgressCreateManyPackInput | UserPackProgressCreateManyPackInput[]
    skipDuplicates?: boolean
  }

  export type WordUpsertWithWhereUniqueWithoutPackInput = {
    where: WordWhereUniqueInput
    update: XOR<WordUpdateWithoutPackInput, WordUncheckedUpdateWithoutPackInput>
    create: XOR<WordCreateWithoutPackInput, WordUncheckedCreateWithoutPackInput>
  }

  export type WordUpdateWithWhereUniqueWithoutPackInput = {
    where: WordWhereUniqueInput
    data: XOR<WordUpdateWithoutPackInput, WordUncheckedUpdateWithoutPackInput>
  }

  export type WordUpdateManyWithWhereWithoutPackInput = {
    where: WordScalarWhereInput
    data: XOR<WordUpdateManyMutationInput, WordUncheckedUpdateManyWithoutPackInput>
  }

  export type WordScalarWhereInput = {
    AND?: WordScalarWhereInput | WordScalarWhereInput[]
    OR?: WordScalarWhereInput[]
    NOT?: WordScalarWhereInput | WordScalarWhereInput[]
    id?: StringFilter<"Word"> | string
    packId?: StringFilter<"Word"> | string
    word?: StringFilter<"Word"> | string
    reading?: StringNullableFilter<"Word"> | string | null
    romaji?: StringNullableFilter<"Word"> | string | null
    meaning?: StringFilter<"Word"> | string
    partOfSpeech?: StringNullableFilter<"Word"> | string | null
    example?: StringNullableFilter<"Word"> | string | null
    exampleTranslation?: StringNullableFilter<"Word"> | string | null
    createdAt?: DateTimeFilter<"Word"> | Date | string
    updatedAt?: DateTimeFilter<"Word"> | Date | string
  }

  export type UserPackProgressUpsertWithWhereUniqueWithoutPackInput = {
    where: UserPackProgressWhereUniqueInput
    update: XOR<UserPackProgressUpdateWithoutPackInput, UserPackProgressUncheckedUpdateWithoutPackInput>
    create: XOR<UserPackProgressCreateWithoutPackInput, UserPackProgressUncheckedCreateWithoutPackInput>
  }

  export type UserPackProgressUpdateWithWhereUniqueWithoutPackInput = {
    where: UserPackProgressWhereUniqueInput
    data: XOR<UserPackProgressUpdateWithoutPackInput, UserPackProgressUncheckedUpdateWithoutPackInput>
  }

  export type UserPackProgressUpdateManyWithWhereWithoutPackInput = {
    where: UserPackProgressScalarWhereInput
    data: XOR<UserPackProgressUpdateManyMutationInput, UserPackProgressUncheckedUpdateManyWithoutPackInput>
  }

  export type WordPackCreateWithoutWordsInput = {
    id?: string
    packId: string
    title: string
    description?: string | null
    category: $Enums.PackCategory
    requiredTier?: $Enums.SubscriptionTier
    creditCost?: number | null
    wordCount?: number
    difficulty?: string | null
    tags?: WordPackCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    userProgress?: UserPackProgressCreateNestedManyWithoutPackInput
  }

  export type WordPackUncheckedCreateWithoutWordsInput = {
    id?: string
    packId: string
    title: string
    description?: string | null
    category: $Enums.PackCategory
    requiredTier?: $Enums.SubscriptionTier
    creditCost?: number | null
    wordCount?: number
    difficulty?: string | null
    tags?: WordPackCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    userProgress?: UserPackProgressUncheckedCreateNestedManyWithoutPackInput
  }

  export type WordPackCreateOrConnectWithoutWordsInput = {
    where: WordPackWhereUniqueInput
    create: XOR<WordPackCreateWithoutWordsInput, WordPackUncheckedCreateWithoutWordsInput>
  }

  export type VocabularyCreateWithoutWordInput = {
    id?: string
    level?: $Enums.VocabularyLevel
    repetitions?: number
    easeFactor?: Decimal | DecimalJsLike | number | string
    interval?: number
    nextReviewAt?: Date | string | null
    correctCount?: number
    incorrectCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReviewedAt?: Date | string | null
    user: UserCreateNestedOneWithoutVocabularyInput
  }

  export type VocabularyUncheckedCreateWithoutWordInput = {
    id?: string
    userId: string
    level?: $Enums.VocabularyLevel
    repetitions?: number
    easeFactor?: Decimal | DecimalJsLike | number | string
    interval?: number
    nextReviewAt?: Date | string | null
    correctCount?: number
    incorrectCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReviewedAt?: Date | string | null
  }

  export type VocabularyCreateOrConnectWithoutWordInput = {
    where: VocabularyWhereUniqueInput
    create: XOR<VocabularyCreateWithoutWordInput, VocabularyUncheckedCreateWithoutWordInput>
  }

  export type VocabularyCreateManyWordInputEnvelope = {
    data: VocabularyCreateManyWordInput | VocabularyCreateManyWordInput[]
    skipDuplicates?: boolean
  }

  export type WordPackUpsertWithoutWordsInput = {
    update: XOR<WordPackUpdateWithoutWordsInput, WordPackUncheckedUpdateWithoutWordsInput>
    create: XOR<WordPackCreateWithoutWordsInput, WordPackUncheckedCreateWithoutWordsInput>
    where?: WordPackWhereInput
  }

  export type WordPackUpdateToOneWithWhereWithoutWordsInput = {
    where?: WordPackWhereInput
    data: XOR<WordPackUpdateWithoutWordsInput, WordPackUncheckedUpdateWithoutWordsInput>
  }

  export type WordPackUpdateWithoutWordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumPackCategoryFieldUpdateOperationsInput | $Enums.PackCategory
    requiredTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    wordCount?: IntFieldUpdateOperationsInput | number
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: WordPackUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProgress?: UserPackProgressUpdateManyWithoutPackNestedInput
  }

  export type WordPackUncheckedUpdateWithoutWordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumPackCategoryFieldUpdateOperationsInput | $Enums.PackCategory
    requiredTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    wordCount?: IntFieldUpdateOperationsInput | number
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: WordPackUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userProgress?: UserPackProgressUncheckedUpdateManyWithoutPackNestedInput
  }

  export type VocabularyUpsertWithWhereUniqueWithoutWordInput = {
    where: VocabularyWhereUniqueInput
    update: XOR<VocabularyUpdateWithoutWordInput, VocabularyUncheckedUpdateWithoutWordInput>
    create: XOR<VocabularyCreateWithoutWordInput, VocabularyUncheckedCreateWithoutWordInput>
  }

  export type VocabularyUpdateWithWhereUniqueWithoutWordInput = {
    where: VocabularyWhereUniqueInput
    data: XOR<VocabularyUpdateWithoutWordInput, VocabularyUncheckedUpdateWithoutWordInput>
  }

  export type VocabularyUpdateManyWithWhereWithoutWordInput = {
    where: VocabularyScalarWhereInput
    data: XOR<VocabularyUpdateManyMutationInput, VocabularyUncheckedUpdateManyWithoutWordInput>
  }

  export type UserCreateWithoutUserPackProgressInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsCreateNestedManyWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserPackProgressInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyUncheckedCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsUncheckedCreateNestedManyWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserPackProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserPackProgressInput, UserUncheckedCreateWithoutUserPackProgressInput>
  }

  export type WordPackCreateWithoutUserProgressInput = {
    id?: string
    packId: string
    title: string
    description?: string | null
    category: $Enums.PackCategory
    requiredTier?: $Enums.SubscriptionTier
    creditCost?: number | null
    wordCount?: number
    difficulty?: string | null
    tags?: WordPackCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    words?: WordCreateNestedManyWithoutPackInput
  }

  export type WordPackUncheckedCreateWithoutUserProgressInput = {
    id?: string
    packId: string
    title: string
    description?: string | null
    category: $Enums.PackCategory
    requiredTier?: $Enums.SubscriptionTier
    creditCost?: number | null
    wordCount?: number
    difficulty?: string | null
    tags?: WordPackCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    words?: WordUncheckedCreateNestedManyWithoutPackInput
  }

  export type WordPackCreateOrConnectWithoutUserProgressInput = {
    where: WordPackWhereUniqueInput
    create: XOR<WordPackCreateWithoutUserProgressInput, WordPackUncheckedCreateWithoutUserProgressInput>
  }

  export type UserUpsertWithoutUserPackProgressInput = {
    update: XOR<UserUpdateWithoutUserPackProgressInput, UserUncheckedUpdateWithoutUserPackProgressInput>
    create: XOR<UserCreateWithoutUserPackProgressInput, UserUncheckedCreateWithoutUserPackProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserPackProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserPackProgressInput, UserUncheckedUpdateWithoutUserPackProgressInput>
  }

  export type UserUpdateWithoutUserPackProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserPackProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUncheckedUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUncheckedUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WordPackUpsertWithoutUserProgressInput = {
    update: XOR<WordPackUpdateWithoutUserProgressInput, WordPackUncheckedUpdateWithoutUserProgressInput>
    create: XOR<WordPackCreateWithoutUserProgressInput, WordPackUncheckedCreateWithoutUserProgressInput>
    where?: WordPackWhereInput
  }

  export type WordPackUpdateToOneWithWhereWithoutUserProgressInput = {
    where?: WordPackWhereInput
    data: XOR<WordPackUpdateWithoutUserProgressInput, WordPackUncheckedUpdateWithoutUserProgressInput>
  }

  export type WordPackUpdateWithoutUserProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumPackCategoryFieldUpdateOperationsInput | $Enums.PackCategory
    requiredTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    wordCount?: IntFieldUpdateOperationsInput | number
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: WordPackUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    words?: WordUpdateManyWithoutPackNestedInput
  }

  export type WordPackUncheckedUpdateWithoutUserProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: EnumPackCategoryFieldUpdateOperationsInput | $Enums.PackCategory
    requiredTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    creditCost?: NullableIntFieldUpdateOperationsInput | number | null
    wordCount?: IntFieldUpdateOperationsInput | number
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: WordPackUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    words?: WordUncheckedUpdateManyWithoutPackNestedInput
  }

  export type UserCreateWithoutVocabularyInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsCreateNestedManyWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVocabularyInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressUncheckedCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsUncheckedCreateNestedManyWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVocabularyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVocabularyInput, UserUncheckedCreateWithoutVocabularyInput>
  }

  export type WordCreateWithoutVocabularyInput = {
    id?: string
    word: string
    reading?: string | null
    romaji?: string | null
    meaning: string
    partOfSpeech?: string | null
    example?: string | null
    exampleTranslation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pack: WordPackCreateNestedOneWithoutWordsInput
  }

  export type WordUncheckedCreateWithoutVocabularyInput = {
    id?: string
    packId: string
    word: string
    reading?: string | null
    romaji?: string | null
    meaning: string
    partOfSpeech?: string | null
    example?: string | null
    exampleTranslation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordCreateOrConnectWithoutVocabularyInput = {
    where: WordWhereUniqueInput
    create: XOR<WordCreateWithoutVocabularyInput, WordUncheckedCreateWithoutVocabularyInput>
  }

  export type UserUpsertWithoutVocabularyInput = {
    update: XOR<UserUpdateWithoutVocabularyInput, UserUncheckedUpdateWithoutVocabularyInput>
    create: XOR<UserCreateWithoutVocabularyInput, UserUncheckedCreateWithoutVocabularyInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVocabularyInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVocabularyInput, UserUncheckedUpdateWithoutVocabularyInput>
  }

  export type UserUpdateWithoutVocabularyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVocabularyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUncheckedUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUncheckedUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WordUpsertWithoutVocabularyInput = {
    update: XOR<WordUpdateWithoutVocabularyInput, WordUncheckedUpdateWithoutVocabularyInput>
    create: XOR<WordCreateWithoutVocabularyInput, WordUncheckedCreateWithoutVocabularyInput>
    where?: WordWhereInput
  }

  export type WordUpdateToOneWithWhereWithoutVocabularyInput = {
    where?: WordWhereInput
    data: XOR<WordUpdateWithoutVocabularyInput, WordUncheckedUpdateWithoutVocabularyInput>
  }

  export type WordUpdateWithoutVocabularyInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    reading?: NullableStringFieldUpdateOperationsInput | string | null
    romaji?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: StringFieldUpdateOperationsInput | string
    partOfSpeech?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pack?: WordPackUpdateOneRequiredWithoutWordsNestedInput
  }

  export type WordUncheckedUpdateWithoutVocabularyInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    reading?: NullableStringFieldUpdateOperationsInput | string | null
    romaji?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: StringFieldUpdateOperationsInput | string
    partOfSpeech?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutLearningStatsInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyCreateNestedManyWithoutUserInput
    analyses?: AnalysisCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLearningStatsInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressUncheckedCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyUncheckedCreateNestedManyWithoutUserInput
    analyses?: AnalysisUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLearningStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLearningStatsInput, UserUncheckedCreateWithoutLearningStatsInput>
  }

  export type UserUpsertWithoutLearningStatsInput = {
    update: XOR<UserUpdateWithoutLearningStatsInput, UserUncheckedUpdateWithoutLearningStatsInput>
    create: XOR<UserCreateWithoutLearningStatsInput, UserUncheckedCreateWithoutLearningStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLearningStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLearningStatsInput, UserUncheckedUpdateWithoutLearningStatsInput>
  }

  export type UserUpdateWithoutLearningStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLearningStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUncheckedUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUncheckedUpdateManyWithoutUserNestedInput
    analyses?: AnalysisUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAnalysesInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAnalysesInput = {
    id?: string
    email: string
    username?: string | null
    password?: string | null
    provider?: $Enums.AuthProvider
    providerId?: string | null
    subscriptionTier?: $Enums.SubscriptionTier
    credits?: number
    stripeCustomerId?: string | null
    subscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    subscriptions?: SubscriptionUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutUserInput
    userPackProgress?: UserPackProgressUncheckedCreateNestedManyWithoutUserInput
    vocabulary?: VocabularyUncheckedCreateNestedManyWithoutUserInput
    learningStats?: LearningStatsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAnalysesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAnalysesInput, UserUncheckedCreateWithoutAnalysesInput>
  }

  export type UserUpsertWithoutAnalysesInput = {
    update: XOR<UserUpdateWithoutAnalysesInput, UserUncheckedUpdateWithoutAnalysesInput>
    create: XOR<UserCreateWithoutAnalysesInput, UserUncheckedCreateWithoutAnalysesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAnalysesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAnalysesInput, UserUncheckedUpdateWithoutAnalysesInput>
  }

  export type UserUpdateWithoutAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAnalysesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    credits?: IntFieldUpdateOperationsInput | number
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptions?: SubscriptionUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutUserNestedInput
    userPackProgress?: UserPackProgressUncheckedUpdateManyWithoutUserNestedInput
    vocabulary?: VocabularyUncheckedUpdateManyWithoutUserNestedInput
    learningStats?: LearningStatsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubscriptionCreateManyUserInput = {
    id?: string
    tier: $Enums.SubscriptionTier
    status?: $Enums.SubscriptionStatus
    stripeSubscriptionId?: string | null
    stripePriceId?: string | null
    stripeProductId?: string | null
    billingPeriod: string
    currentPeriodStart?: Date | string | null
    currentPeriodEnd?: Date | string | null
    cancelAtPeriodEnd?: boolean
    canceledAt?: Date | string | null
    monthlyCredits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    currency?: string
    paymentMethod: $Enums.PaymentMethod
    status?: $Enums.PaymentStatus
    type: $Enums.PaymentType
    stripePaymentIntentId?: string | null
    stripeInvoiceId?: string | null
    externalPaymentId?: string | null
    subscriptionId?: string | null
    creditAmount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paidAt?: Date | string | null
  }

  export type CreditTransactionCreateManyUserInput = {
    id?: string
    amount: number
    balanceAfter: number
    type: $Enums.CreditTransactionType
    description?: string | null
    paymentId?: string | null
    featureType?: string | null
    relatedEntityId?: string | null
    createdAt?: Date | string
  }

  export type UserPackProgressCreateManyUserInput = {
    id?: string
    packId: string
    wordsLearned?: number
    wordsReviewed?: number
    accuracy?: Decimal | DecimalJsLike | number | string
    lastStudiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VocabularyCreateManyUserInput = {
    id?: string
    wordId: string
    level?: $Enums.VocabularyLevel
    repetitions?: number
    easeFactor?: Decimal | DecimalJsLike | number | string
    interval?: number
    nextReviewAt?: Date | string | null
    correctCount?: number
    incorrectCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReviewedAt?: Date | string | null
  }

  export type LearningStatsCreateManyUserInput = {
    id?: string
    totalWordsLearned?: number
    totalReviews?: number
    currentStreak?: number
    longestStreak?: number
    totalStudyTime?: number
    lastStudyDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnalysisCreateManyUserInput = {
    id?: string
    inputText: string
    result: JsonNullValueInput | InputJsonValue
    language?: string
    createdAt?: Date | string
  }

  export type SubscriptionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    status?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeProductId?: NullableStringFieldUpdateOperationsInput | string | null
    billingPeriod?: StringFieldUpdateOperationsInput | string
    currentPeriodStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cancelAtPeriodEnd?: BoolFieldUpdateOperationsInput | boolean
    canceledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    monthlyCredits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeInvoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    externalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    creditAmount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeInvoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    externalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    creditAmount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    type?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeInvoiceId?: NullableStringFieldUpdateOperationsInput | string | null
    externalPaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    creditAmount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CreditTransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    featureType?: NullableStringFieldUpdateOperationsInput | string | null
    relatedEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    featureType?: NullableStringFieldUpdateOperationsInput | string | null
    relatedEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    type?: EnumCreditTransactionTypeFieldUpdateOperationsInput | $Enums.CreditTransactionType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    featureType?: NullableStringFieldUpdateOperationsInput | string | null
    relatedEntityId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPackProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    wordsLearned?: IntFieldUpdateOperationsInput | number
    wordsReviewed?: IntFieldUpdateOperationsInput | number
    accuracy?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pack?: WordPackUpdateOneRequiredWithoutUserProgressNestedInput
  }

  export type UserPackProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    wordsLearned?: IntFieldUpdateOperationsInput | number
    wordsReviewed?: IntFieldUpdateOperationsInput | number
    accuracy?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPackProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    packId?: StringFieldUpdateOperationsInput | string
    wordsLearned?: IntFieldUpdateOperationsInput | number
    wordsReviewed?: IntFieldUpdateOperationsInput | number
    accuracy?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocabularyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: EnumVocabularyLevelFieldUpdateOperationsInput | $Enums.VocabularyLevel
    repetitions?: IntFieldUpdateOperationsInput | number
    easeFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: IntFieldUpdateOperationsInput | number
    nextReviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    word?: WordUpdateOneRequiredWithoutVocabularyNestedInput
  }

  export type VocabularyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    wordId?: StringFieldUpdateOperationsInput | string
    level?: EnumVocabularyLevelFieldUpdateOperationsInput | $Enums.VocabularyLevel
    repetitions?: IntFieldUpdateOperationsInput | number
    easeFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: IntFieldUpdateOperationsInput | number
    nextReviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VocabularyUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    wordId?: StringFieldUpdateOperationsInput | string
    level?: EnumVocabularyLevelFieldUpdateOperationsInput | $Enums.VocabularyLevel
    repetitions?: IntFieldUpdateOperationsInput | number
    easeFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: IntFieldUpdateOperationsInput | number
    nextReviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type LearningStatsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalWordsLearned?: IntFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    lastStudyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningStatsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalWordsLearned?: IntFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    lastStudyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningStatsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalWordsLearned?: IntFieldUpdateOperationsInput | number
    totalReviews?: IntFieldUpdateOperationsInput | number
    currentStreak?: IntFieldUpdateOperationsInput | number
    longestStreak?: IntFieldUpdateOperationsInput | number
    totalStudyTime?: IntFieldUpdateOperationsInput | number
    lastStudyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    result?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    result?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalysisUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    result?: JsonNullValueInput | InputJsonValue
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordCreateManyPackInput = {
    id?: string
    word: string
    reading?: string | null
    romaji?: string | null
    meaning: string
    partOfSpeech?: string | null
    example?: string | null
    exampleTranslation?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserPackProgressCreateManyPackInput = {
    id?: string
    userId: string
    wordsLearned?: number
    wordsReviewed?: number
    accuracy?: Decimal | DecimalJsLike | number | string
    lastStudiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WordUpdateWithoutPackInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    reading?: NullableStringFieldUpdateOperationsInput | string | null
    romaji?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: StringFieldUpdateOperationsInput | string
    partOfSpeech?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vocabulary?: VocabularyUpdateManyWithoutWordNestedInput
  }

  export type WordUncheckedUpdateWithoutPackInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    reading?: NullableStringFieldUpdateOperationsInput | string | null
    romaji?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: StringFieldUpdateOperationsInput | string
    partOfSpeech?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vocabulary?: VocabularyUncheckedUpdateManyWithoutWordNestedInput
  }

  export type WordUncheckedUpdateManyWithoutPackInput = {
    id?: StringFieldUpdateOperationsInput | string
    word?: StringFieldUpdateOperationsInput | string
    reading?: NullableStringFieldUpdateOperationsInput | string | null
    romaji?: NullableStringFieldUpdateOperationsInput | string | null
    meaning?: StringFieldUpdateOperationsInput | string
    partOfSpeech?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    exampleTranslation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPackProgressUpdateWithoutPackInput = {
    id?: StringFieldUpdateOperationsInput | string
    wordsLearned?: IntFieldUpdateOperationsInput | number
    wordsReviewed?: IntFieldUpdateOperationsInput | number
    accuracy?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUserPackProgressNestedInput
  }

  export type UserPackProgressUncheckedUpdateWithoutPackInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    wordsLearned?: IntFieldUpdateOperationsInput | number
    wordsReviewed?: IntFieldUpdateOperationsInput | number
    accuracy?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserPackProgressUncheckedUpdateManyWithoutPackInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    wordsLearned?: IntFieldUpdateOperationsInput | number
    wordsReviewed?: IntFieldUpdateOperationsInput | number
    accuracy?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lastStudiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VocabularyCreateManyWordInput = {
    id?: string
    userId: string
    level?: $Enums.VocabularyLevel
    repetitions?: number
    easeFactor?: Decimal | DecimalJsLike | number | string
    interval?: number
    nextReviewAt?: Date | string | null
    correctCount?: number
    incorrectCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReviewedAt?: Date | string | null
  }

  export type VocabularyUpdateWithoutWordInput = {
    id?: StringFieldUpdateOperationsInput | string
    level?: EnumVocabularyLevelFieldUpdateOperationsInput | $Enums.VocabularyLevel
    repetitions?: IntFieldUpdateOperationsInput | number
    easeFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: IntFieldUpdateOperationsInput | number
    nextReviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutVocabularyNestedInput
  }

  export type VocabularyUncheckedUpdateWithoutWordInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    level?: EnumVocabularyLevelFieldUpdateOperationsInput | $Enums.VocabularyLevel
    repetitions?: IntFieldUpdateOperationsInput | number
    easeFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: IntFieldUpdateOperationsInput | number
    nextReviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VocabularyUncheckedUpdateManyWithoutWordInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    level?: EnumVocabularyLevelFieldUpdateOperationsInput | $Enums.VocabularyLevel
    repetitions?: IntFieldUpdateOperationsInput | number
    easeFactor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    interval?: IntFieldUpdateOperationsInput | number
    nextReviewAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}