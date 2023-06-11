import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import SettingsSchema from "@/schemas/Settings";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    // We have to check if the request is for a new user or not.
    const AllSettings = await SettingsSchema.find(
      {},
      { key: true, value: true }
    );

    if (!AllSettings)
      return NextResponse.json({
        success: false,
        error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
        data: null,
      });
    else {
      const data: { [key: string]: string } = {};
      AllSettings.forEach((item) => {
        data[item.key] = item.value;
      });
      return NextResponse.json({
        success: true,
        error: "",
        data: data,
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
