export declare const WalletType: import("drizzle-orm/pg-core").PgEnum<["talisman", "polkadotjs", "subwallet"]>;
export declare const WalletsTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "wallets";
    schema: undefined;
    columns: {
        wallet_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "wallet_id";
            tableName: "wallets";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        wallet_type: import("drizzle-orm/pg-core").PgColumn<{
            name: "wallet_type";
            tableName: "wallets";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "talisman" | "polkadotjs" | "subwallet";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["talisman", "polkadotjs", "subwallet"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        wallet_address: import("drizzle-orm/pg-core").PgColumn<{
            name: "wallet_address";
            tableName: "wallets";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: 128;
        }>;
        created_at: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "wallets";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        user_id: import("drizzle-orm/pg-core").PgColumn<{
            name: "user_id";
            tableName: "wallets";
            dataType: "string";
            columnType: "PgUUID";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
//# sourceMappingURL=wallets.d.ts.map