import { ProductStatus } from "../libs/enums/product.enum";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import {
  ProductInput,
  Product,
  ProductUpdateInput,
  ProductInquiry,
} from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { T } from "../libs/types/common";
import { ObjectId } from "mongoose";
import ViewService from "./View.service";
import { ViewInput } from "../libs/types/view";
import { ViewGroup } from "../libs/enums/view.enum";
class ProductService {
  private readonly productModel;
  public viewService;

  constructor() {
    this.productModel = ProductModel;
    this.viewService = new ViewService();
  }

  /** SPA**/
  public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
    // match object created and its type is set to (T)
    // match bu faqat process da bolgan productlarni topib berishi
    const match: T = { productStatus: ProductStatus.PROCESS };

    // productCollection inquiry da hosil bolsa unday holda matchni ichida productCollection
    //inquiryni ichida kelayotkan productCollectionga teng bolsin
    if (inquiry.productCollection)
      match.productCollection = inquiry.productCollection;

    // regex orqali searchni develop qilish
    // inquiry ichida search bolsa productName dan kiritilgan textni izlash mantigi
    // inquiry dan kelayotgan searchni malumotni olib berishini takidlab flagni "i" qilib belgilaymiz
    if (inquiry.search) {
      match.productName = { $regex: new RegExp(inquiry.search, "i") };
    }

    // sort object productPrice bulsa eng arzondan boshlab tepaga harakatlanadi
    // aksxolda tepadan pastga qarab yuradi.
    const sort: T =
      // [] dynamic keyni hosil qilib beradi
      inquiry.order === "productPrice"
        ? { [inquiry.order]: 1 } // [] bularsiz berilgan mantiq string da bob qoladi
        : { [inquiry.order]: -1 };

    const result = await this.productModel
      .aggregate([
        { $match: match }, // arrayni ichidagi syntaxlar mongodb ni syntaxlari
        { $sort: sort },
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
        { $limit: inquiry.limit * 1 }, // limit bu inquiry ni ichidan kelayotgan limit
      ])
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async getProduct(
    memberId: ObjectId | null,
    id: string
  ): Promise<Product> {
    const productId = shapeIntoMongooseObjectId(id);

    let result = await this.productModel
      .findOne({
        _id: productId,
        productStatus: ProductStatus.PROCESS,
      })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    // if authenticated users => first time see => view log creation
    if (memberId) {
      // Check View Log Existance
      const input: ViewInput = {
        memberId: memberId,
        viewRefId: productId,
        viewGroup: ViewGroup.PRODUCT,
      };
      const existView = await this.viewService.checkViewExistence(input);

      console.log("exist:", !!existView);
      // Insert View
      if (!existView) {
        console.log("PLANNING TO INSERT NEW VIEW");
        await this.viewService.insertMemberView(input);

        // Increase counts
        result = await this.productModel
          .findByIdAndUpdate(
            productId,
            { $inc: { productViews: +1 } },
            { new: true }
          )
          .exec();
      }
    }

    return result;
  }

  /** SSR**/
  public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }
  // definition part of createNewProduct schema model
  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return await this.productModel.create(input);
    } catch (err) {
      console.log("Error, model:createNewProduct:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(
    id: string,
    input: ProductUpdateInput
  ): Promise<Product> {
    // string => objectId
    id = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      // searchquery
      // returnOriginal: false option for new:true
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
    console.log("result:", result);
    return result;
  }
}

export default ProductService;
