import { Model, DATE, STRING, INTEGER } from "sequelize";
import { telemedDB } from "../databases/telemed";

export class Indicator extends Model {
    id!: number;
    createdAt!: Date;
    updatedAt!: Date;
    userId!: number | null;
    key!: string;
    value!: string;
    expiredAt!: Date | null;

    toJSON() {
        const result: any = this.get();

        return result;
    }

    static findActualsByUser(userId: number): Promise<Indicator[]> {
        return Indicator.findActuals(`i.userId = ${Number(userId)}`);
    }

    static findActualsGlobal(): Promise<Indicator[]> {
        return Indicator.findActuals("i.userId IS NULL")
    }

    private static findActuals(condition: string): Promise<Indicator[]> {
        if (!Indicator.sequelize) {
            throw new Error(`Sequelize instance not found`);
        }

        const query = `
        select i.*
        from
            (
                SELECT max(i.id) as id, i.\`key\`
                from indicators i
                where ${condition}
                GROUP BY i.\`key\`
            ) u
            LEFT JOIN indicators i
            ON u.id = i.id
            WHERE expiredAt is null OR expiredAt > NOW();
        `;

        return Indicator.sequelize.query<Indicator>(query, { model: this, mapToModel: true });
    }
}

Indicator.init(
    {
        userId: INTEGER,
        key: STRING,
        value: STRING,
        expiredAt: DATE,
    },
    {
        sequelize: telemedDB,
        tableName: "indicators",
    },
);
