import { Request, Response, NextFunction } from "express";
import NonProfit from "../models/nonProfit";
import { sendBulkEmails } from "../services/emailService";
import { mailContent } from "../utils/typeDefinition";
import EmailJob from "../models/emailJob";
const { Op } = require("sequelize");

/* Create new non profit. */
export async function createNonProfit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await NonProfit.create(req.body);

    res.send("success");
  } catch (err) {
    next(err);
  }
}

/* Send email to non profits. */
export async function sendBulkEmailsToNonProfits(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {npIds} = req.query;
    let bulkEmailJobData: mailContent[];

    let data = await NonProfit.findAll({
      attributes: ["name", "email", "address"],
      where: {
        id: {
          [Op.in]: (npIds as string).split(',').map(el => parseInt(el))
        }
      },
      raw: true
    });

    if (data.length === 0) {
      res.status(400).send('Please select valid non profits');
      return
    }

    bulkEmailJobData = data.map(el  => ({
      to: el.email,
      subject: el.name,
      text: `Sending money to nonprofit ${el.name} at address ${el.address}`,
      html: ""
    }));

    sendBulkEmails(bulkEmailJobData);

    res.status(200).send('Email queued successfully');
  } catch (err) {
    next(err);
  }
}

export async function fetchEmailsSentToNonProfits(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {limit=10, offset=0, status="completed", to}: any = req.query;
    const options: any = {
      where: {
        ...(status ? { status: {[Op.in]: status.split(',')} } : {}),
        ...(to ? { toEmail: {[Op.in]: to.split(',')} } : {}),
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      raw: true,
      order: [['id', 'desc']]
    };
    const data = await EmailJob.findAll(options);

    res.send(data);
  } catch (err) {
    next(err);
  }
}

export async function fetchNonProfits(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {limit=100, offset=0}: any = req.query;
    const options: any = {
      limit,
      offset,
      raw: true,
    };
    const data = await NonProfit.findAll(options);

    res.send(data);
  } catch (err) {
    next(err);
  }
}