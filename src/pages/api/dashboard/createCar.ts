
import prisma from "../../../lib/prisma/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;

  // const session = await getSession({ req });
  // const result = await prisma.car.create({
  //   data: {
  //     title: title,
  //     content: content,
  //     author: { connect: { email: session?.user?.email } },
  //   },
  // });
  res.json(null);
}