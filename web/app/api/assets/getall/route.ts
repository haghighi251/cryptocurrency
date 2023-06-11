import UsersSchema from "@/schemas/Users";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Assets from "@/schemas/Assets";

export async function GET(request: NextRequest) {
  try {
    // Getting fresh data from the remote api
    const requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    // fetch("https://api.coincap.io/v2/assets", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log("error"));
    const response = await fetch(
      "https://api.coincap.io/v2/assets",
      requestOptions
    );
    const apiResults = await response.text();
    console.log(apiResults);

    return NextResponse.json({
      success: true,
      error: "",
      data: apiResults,
    });

    await connectMongo();

    // We have to check if the request is for a new user or not.
    const assets = await Assets.find({});

    if (assets) {
      console.log(assets);
      console.log(assets[0].updatedAt);
      // We have to check if the last update was for less than one minute ago.
      // Convert the MongoDB time string to a JavaScript Date object
      var mongodbDateTime: any = new Date(assets[0].updatedAt);

      // Get the current time
      var currentTime: any = new Date();

      // Calculate the time difference in milliseconds
      var timeDifference = currentTime - mongodbDateTime;

      // Convert the time difference to minutes
      var timeDifferenceInMinutes = Math.floor(timeDifference / 1000 / 60);

      // Check if the time difference is more than 1 minute
      if (timeDifferenceInMinutes < 1) {
        return NextResponse.json({
          success: true,
          error: "",
          data: assets,
        });
      }
    }

    // Getting fresh data from the remote api
    /* const apiResults = await fetch("https://api.coincap.io/v2/assets");
    console.log(apiResults);

    return NextResponse.json({
      success: true,
      error: "",
      data: apiResults,
    });
    */
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
      data: null,
    });
  }
}
