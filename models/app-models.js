import { Sequelize } from "sequelize";
import dotenv from "dotenv"; // Import dotenv
dotenv.config(); 

export const jk_finance_db = new Sequelize(process.env.DATABASE,process.env.MYUSERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect:"mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
  });


export const jk_finance_User=jk_finance_db.define('register',{
   
   
    name:{
        type: Sequelize.DataTypes.STRING
    },
    email:{
        type: Sequelize.DataTypes.STRING
    },
    password:{
        type: Sequelize.DataTypes.STRING,
        
    },
    role:{
        type: Sequelize.DataTypes.INTEGER,
        
    },
    active:{
        type: Sequelize.DataTypes.INTEGER,
        
    }
   },{
    tableName: 'register',
    feezeTableName:true,
    timestamps: false
   });