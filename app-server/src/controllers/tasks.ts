import { Request, Response, NextFunction } from "express";
import Task from "../models/task";
import sequelize from "../config/database";
const { Op } = require("sequelize");

/* GET all todo tasks. */
export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query: any = req.query;
    const options: any = {
      attributes: ["id", "title", "description", "status", "dueDate", "userId"],
      where: {
        userId: req.user?.id,
        ...(query.status ? { status: {[Op.in]: query.status.split(',')} } : {}),
        ...(query.fromDate && query.toDate
          ? {
              [Op.and]: sequelize.where(
                sequelize.literal('DATE(due_date)'),
                {
                  [Op.between]: [query.fromDate, query.toDate],
                },
              )
            }
          : {}),
      },
      raw: true,
    };
    const data = await Task.findAll(options);

    res.send(data);
  } catch (err) {
    next(err);
  }
}

/* Create new task. */
export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    body.userId = req.user?.id;

    await Task.create(body);

    res.send("respond with a resource");
  } catch (err) {
    next(err);
  }
}

/* Update task status. */
export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const { taskId } = req.params;
    body.userId = req.user?.id;

    await Task.update(body, { where: { id: taskId } });

    res.send({ status: "success" });
  } catch (err) {
    next(err);
  }
}

/* Delete task. */
export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskId } = req.params;

    await Task.destroy({
      where: {
        id: taskId,
        userId: req.user?.id,
      },
    });

    res.send({ status: "success" });
  } catch (err) {
    next(err);
  }
}
