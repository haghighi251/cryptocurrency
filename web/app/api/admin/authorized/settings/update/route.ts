import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Settings from "@/schemas/Settings";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requiredFields = [
      "usd",
      "profit",
      "cryptoCommisition",
      "addDealCommisition",
      "botCommisition",
      "commisitionLevel1",
      "commisitionLevel2",
      "commisitionLevel3",
      "commisitionLevel4",
      "commisitionLevel5",
      "minimumAsset",
      "minimumWithdrawal",
      "maximumWithdrawalLevel1",
      "maximumWithdrawalLevel2",
      "maximumWithdrawalLevel3",
      "maximumWithdrawalLevel4",
      "maximumWithdrawalLevel5",
    ];

    if (
      requiredFields.some(
        (field) => body[field] === null || body[field] === undefined
      )
    ) {
      return NextResponse.json({
        success: false,
        error: "اطلاعات برای ثبت صحیح نمی باشد.",
        data: "",
      });
    }

    await connectMongo();
    const settingsToUpdate: any = {
      usd: body.usd,
      profit: body.profit,
      cryptoCommisition: body.cryptoCommisition,
      addDealCommisition: body.addDealCommisition,
      botCommisition: body.botCommisition,
      commisitionLevel1: body.commisitionLevel1,
      commisitionLevel2: body.commisitionLevel2,
      commisitionLevel3: body.commisitionLevel3,
      commisitionLevel4: body.commisitionLevel4,
      commisitionLevel5: body.commisitionLevel5,
      minimumAsset: body.minimumAsset,
      minimumWithdrawal: body.minimumWithdrawal,
      maximumWithdrawalLevel1: body.maximumWithdrawalLevel1,
      maximumWithdrawalLevel2: body.maximumWithdrawalLevel2,
      maximumWithdrawalLevel3: body.maximumWithdrawalLevel3,
      maximumWithdrawalLevel4: body.maximumWithdrawalLevel4,
      maximumWithdrawalLevel5: body.maximumWithdrawalLevel5,
    };

    const operations = Object.keys(settingsToUpdate).map((key) => ({
      updateOne: {
        filter: { key },
        update: { value: settingsToUpdate[key] },
        upsert: true, // Create a new document if the filter does not match any existing documents
      },
    }));

    Settings.bulkWrite(operations)
      .then(() => {
        return NextResponse.json({
          success: true,
          error: "",
          data: null,
        });
      })
      .catch((error) => {
        console.log(error);
        return NextResponse.json({
          success: false,
          error: "خطایی در سرور رخ داد.",
          data: null,
        });
      });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      error: "خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.",
      data: null,
    });
  }
}
