const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const { parse } = require("path");
const itemRouter = Router();
const prisma = new PrismaClient();

itemRouter.get("/items", async (req, res) => {
  const items = await prisma.fridgeItem.findMany();
  res.json(items);
});

itemRouter.post("/", async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const existingItem = await prisma.fridgeItem.findUnique({
      where: {
        name: name,
      },
    });

    let item = "";

    if (existingItem) {
      item = await prisma.fridgeItem.update({
        where: {
          name: name,
        },
        data: {
          quantity: existingItem.quantity + 1,
        },
      });
    } else {
      item = await prisma.fridgeItem.create({
        data: {
          name,
          quantity: quantity || 1,
        },
      });
    }

    res.json(item);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Une erreur s'est produite lors de l'ajout de l'item." });
  }
});

itemRouter.patch("/items/increase/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedItem = await prisma.fridgeItem.update({
      where: { id: parseInt(id) },
      data: {
        quantity: {
          increment: parseInt(quantity),
        },
      },
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de l'augmentation de la quantité.",
    });
  }
});

itemRouter.patch("/items/decrease/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const existingItem = await prisma.fridgeItem.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingItem || existingItem.quantity <= 0) {
      return res.status(400).json({
        error: "L'item n'existe pas ou la quantité est déjà à zéro.",
      });
    }

    const updatedItem = await prisma.fridgeItem.update({
      where: { id: parseInt(id) },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur s'est produite lors de la diminution de la quantité.",
    });
  }
});
module.exports = itemRouter;
