import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "Member"
  })
  role!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "no_picture.png"
  })
  image_profile!: string;

}