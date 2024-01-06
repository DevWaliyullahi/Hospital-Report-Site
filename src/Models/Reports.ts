import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.config';
import { v4 as uuidv4 } from 'uuid';

interface ReportAttributes {
  patientName: string;
  email: string;
  age: number;
  gender: string;
  phoneNumber: string;
  address: string;
  hospitalName: string;
  weight: string;
  height: string;
  bloodGroup: string;
  genotypes: string;
  bloodPressure: string;
  hiv_status: string;
  hepatitis_status: string;
  id:  string;
}

class Report extends Model<ReportAttributes> {
  public patientName!: string;
  public email!: string;
  public age!: number;
  public gender!: string;
  public phoneNumber!: string;
  public address!: string;
  public hospitalName!: string;
  public weight!: string;
  public height!: string;
  public bloodGroup!: string;
  public genotypes!: string;
  public bloodPressure!: string;
  public hiv_status!: string;
  public hepatitis_status!: string;
  readonly id!:  string;
}

Report.init(
  {
    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER, 
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hospitalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genotypes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodPressure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hiv_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hepatitis_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
  },
  {
    sequelize,
    modelName: 'Reports',
    hooks: {
      beforeValidate: (report: ReportAttributes) => {
        if (!report.id) {
          report.id = uuidv4();
        }
      },
    },
  }
);


export default Report;
