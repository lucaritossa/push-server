import { Request, Response } from "express";
import { firebaseCloudMessaging } from "../index";

export const pushController = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    firebaseCloudMessaging
      .send(req.body)
      .then((response) => {
        console.log(response);
        console.log("Notification sent successfully");
      })
      .catch((error) => {
        console.error(error);
        console.error("Failed to send notification to FCM");
      });
    
    return res.status(200).send("See console log for details");
  } catch (error) {
    return res.status(500).send({
      error: `pushController error: ${error}`,
    });
  }
};
