import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";


interface DoctorsInterface {
    doctorsName: string;
    email: string;
    specializations: string;
    gender: string;
    phoneNumber: string;
    password: string;
    id: string;
}

class Doctors extends Model<DoctorsInterface> {
    getReports(arg0: { where: { id: string; }; }) {
      throw new Error('Method not implemented.');
    }
    public doctorsName!: string;
    public email!: string;
    public specializations!: string;
    public gender!: string;
    public phoneNumber!: string;
    public password!: string;
    public readonly id!: string;

    public verifyPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
      }
   
}

Doctors.init(
    {
        doctorsName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        specializations: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            primaryKey: true,
        },
    },
    {
        sequelize,
        modelName: "Doctors",
        hooks: {
            beforeCreate: async (doctor) => {
                const saltRounds = 10;
                doctor.password = await bcrypt.hash(doctor.password, saltRounds);
            },
        },
    }
);

export default Doctors;