import UsersSchema from "@/schemas/Users";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const body = await request.json();

    // We have to check if the request is for a new user or not.
    const user = await UsersSchema.findOne({
      $or: [
        { mobile: body.mobile },
        { username: body.mobile },
        { email: body.email },
      ],
    });

    if (user) {
      // The request belongs to a user who had been registered before.
      // Now we just need to check if the activtion code is correct.
      if (user.activationCode !== body.code)
        return NextResponse.json({
          success: false,
          error: "کد فعال سازی صحیح نمی باشد.",
          data: null,
        });

      await UsersSchema.findByIdAndUpdate(user._id, {
        $set: { activationCode: null, status: true },
      });

      // Setting admin cookie. It'll be used for subsequent requests.
      const token = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT!
      );
      let response = NextResponse.next();
      response.cookies.set("access_token", token);

      return NextResponse.json({
        success: true,
        error: "",
        data: {
          user_id: user._id,
          isAdmin: user.isAdmin,
          isStarterUser: user.isStarterUser,
          isSubAdmin: user.isSubAdmin,
          isSiteSupporter: user.isSiteSupporter,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "کاربری با مشخصات شما پیدا نشد.",
        data: null,
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
      data: null,
    });
  }
}
