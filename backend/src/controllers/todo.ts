import { RequestHandler } from "express";
import TodoModel from "../models/todo";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getTodos : RequestHandler = async (req, res,next) => {
    try {
    const todo = await TodoModel.find().exec();
    res.status(200).json(todo);
    } catch(error) {
        next(error);
    }
};

export const getTodo : RequestHandler = async(req,res,next) => {
    const id = req.params.id;
    try {
        if(!mongoose.isValidObjectId(id)) {
            throw createHttpError(400,"ID is invalid");
        }
        const toDo = await TodoModel.findById(id).exec();
        if(!toDo){
            throw createHttpError(404,"TODO not found");
        }
        res.status(200).json(toDo);
    } catch (error) {
        next(error);
    }
}

interface createBody {
    title:string,
    description: string,
    completed: boolean,
}

export const createTodo : RequestHandler<unknown,unknown,createBody,unknown> = async(req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const completed = req.body.completed;
    try {
        if (!title){
            throw createHttpError(400,"Todo must have title")
        }
        const newTodo = await TodoModel.create({
            title : title,
            description : description,
            completed:completed,
        });
        res.status(201).json(newTodo);
    } catch (error) {
        next(error);
    }
}

interface UpdateTodoParams {
    id: string;
}

interface UpdateTodoBody {
    title?: string;
    description?: string;
    completed?: boolean;
}

export const updateTodo: RequestHandler<UpdateTodoParams, unknown, UpdateTodoBody, unknown> = async (req, res, next) => {
    const id = req.params.id;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newStatus = req.body.completed;
    try {
        if(!mongoose.isValidObjectId(id)) {
            throw createHttpError(400,"ID is invalid");
        }
        if (!newTitle){
            throw createHttpError(400,"Todo must have title")
        }
        const toDo = await TodoModel.findById(id).exec();
        if(!toDo){
            throw createHttpError(404,"TODO not found");
        }
        if (newTitle) {
            toDo.title = newTitle;
        }
        if (newDescription) {
            toDo.description = newDescription;
        }
        if (newStatus) {
            toDo.completed = newStatus;
        }

        const updatedTodo = await toDo.save();
        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
   
};



export const deleteTodo : RequestHandler = async(req,res,next) => {
    const id = req.params.id;
    try {
        if(!mongoose.isValidObjectId(id)) {
            throw createHttpError(400,"ID is invalid");
        }

        const toDo = await TodoModel.findByIdAndDelete(id).exec();
        if(!toDo){
            throw createHttpError(404,"To-do not found");
        }
        res.status(204).json({
            message:"Deleted successfully",
            todo : toDo
        });
    } catch (error) {
        next(error);
    }
}