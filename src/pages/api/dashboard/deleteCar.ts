import prisma from "../../../lib/prisma/prisma";

// DELETE /api/post/:id
export default async function deleteCar(req, res) {
  const carId = req.query.id;
  if (req.method === "DELETE") {
    const post = await prisma.car.delete({
      where: { id: Number(carId) },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
