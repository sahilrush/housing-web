import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { postSchema } from "../types/userTypes";
import { connect } from "pm2";

const prisma = new PrismaClient();

export const brokerPost = async (req: Request, res: Response) => {
  try {
    const validateData = postSchema.parse(req.body);

    const newPost = await prisma.broker.create({
      data: {
        title: validateData.title,
        description: validateData.description,
        category: validateData.category,
        price: validateData.price,
        availability: validateData.availability,
        images: validateData.images,
        username: validateData.username,
        contactNumber: validateData.contactNumber,
        email: validateData.email,
        property: validateData.property
          ? { connect: { id: validateData.property.id } }
          : undefined,
      },
    });

    res.status(200).json({ message: "post created", newPost });
    return;
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

export const deletPost = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.id);

    if (isNaN(postId)) {
      res.status(400).json({ error: "invalid post id" });
    }

    const existingPost = await prisma.broker.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      res.status(404).json({ error: "Post not found" });
    }

    await prisma.broker.delete({
      where: { id: postId },
    });

    res.status(200).json({ message: "deleted Successfullh" });
    return;
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const validateData = postSchema.parse(req.body);

    const updatePost = await prisma.broker.update({
      where: { id: Number(req.params.id) },
      data: {
        title: validateData.title,
        description: validateData.description,
        category: validateData.category,
        price: validateData.price,
        availability: validateData.availability,
        images: validateData.images,
        username: validateData.username,
        contactNumber: validateData.contactNumber,
        email: validateData.email,
        property: validateData.property
          ? { connect: { id: validateData.property.id } }
          : undefined,
      },
    });
    res.status(200).json({ message: "Post updated", updatePost });
    return;
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
