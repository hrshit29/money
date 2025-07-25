"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// 2. Define the schema
const IncomeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        max: 9999999,
    },
    type: {
        type: String,
        default: 'income',
    },
    date: {
        type: Date,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });
// 3. Export the model
const Income = mongoose_1.default.model('Income', IncomeSchema);
exports.default = Income;
// import mongoose, { Document, Schema, Model } from 'mongoose';
// // 1. Define the interface for the document
// export interface IIncome extends Document {
//   title: string;
//   amount: number;
//   type?: string;
//   date: Date;
//   category: string;
//   description: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
// // 2. Define the schema
// const IncomeSchema: Schema<IIncome> = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//       maxLength: 50,
//     },
//     amount: {
//       type: Number,
//       required: true,
//       trim: true,
//       max: 9999999, // Replace maxLength with max for numeric validation
//     },
//     type: {
//       type: String,
//       default: 'income',
//     },
//     date: {
//       type: Date,
//       required: true,
//       trim: true,
//     },
//     category: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//       maxLength: 20,
//     },
//   },
//   { timestamps: true }
// );
// // 3. Export the model
// const Income: Model<IIncome> = mongoose.model<IIncome>('Income', IncomeSchema);
// export default Income;
