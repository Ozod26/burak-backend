// togridan togri controller bn ishlaydigan model

import {
  MemberInput,
  Member,
  LoginInput,
  MemberUpdateInput,
} from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType, MemberStatus } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";

class MemberService {
  // property
  private readonly memberModel;

  constructor() {
    // memberModel ni schema dagi MemberModel iga tenglab olamz
    this.memberModel = MemberModel;
  }

  /** SPA **/

  /*
   *promise(void) : (void) hech nimani return qilmasligi uchun bu yozilgan nimadur return qilish kerak bolsa ushani interface ni yozib qoyamiz.
   *agar async function bolmasa demak promise ishlatmimiz
   *processSignup functionini parameteriga input ni pass qilamiz va uning type MemberInput  */

  public async getRestaurant(): Promise<Member> {
    const result = await this.memberModel
      .findOne({ memberType: MemberType.RESTAURANT })
      .lean()
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  // signup methodni definition qismini quryapmiz bu esa Rest API niki yani Reactbn dahldor(member controller uchun)
  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";

      // databasedan kelgan resultni JSON formatga ogiryapmz!
      return result.toJSON();
    } catch (err) {
      console.error("Error model: signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    // TODO: Consider member status later
    const member = await this.memberModel
      .findOne(
        {
          memberNick: input.memberNick,
          memberStatus: { $ne: MemberStatus.DELETE },
        },
        { memberNick: 1, memberPassword: 1, memberStatus: 1 }
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    else if (member.memberStatus === MemberStatus.BLOCK) {
      throw new Errors(HttpCode.FORBIDDEN, Message.BLOCKED_USER);
    }

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORISED, Message.WRONG_PASSWORD);
    }
    // .lean() bn databasedage datani tahrir qilish mumkun. Database dagi malumotni ozgartira olamz
    return await this.memberModel.findById(member._id).lean().exec();
  }

  public async getMemberDetail(member: Member): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const result = await this.memberModel
      .findOne({ _id: memberId, memberStatus: MemberStatus.ACTIVE })
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateMember(
    member: Member,
    input: MemberUpdateInput
  ): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const result = await this.memberModel
      .findOneAndUpdate({ _id: memberId }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }

  public async getTopUsers(): Promise<Member[]> {
    const result = await this.memberModel
      .find({
        memberStatus: MemberStatus.ACTIVE,
        memberPoints: { $gte: 1 },
      })
      .sort({ memberPoints: -1 })
      .limit(4)
      .exec();

    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async addUserPoint(member: Member, point: number): Promise<Member> {
    const memberId = shapeIntoMongooseObjectId(member._id);

    return await this.memberModel
      .findOneAndUpdate(
        {
          _id: memberId,
          memberType: MemberType.USER,
          memberStatus: MemberStatus.ACTIVE,
        },
        { $inc: { memberPoints: point } },
        { new: true }
      )
      .exec();
  }

  /** SSR **/
  /*
   *promise(void) : typescript bolganligi uchun bu method hech nmaani qaytarmaslik uchun yozilgan shart
   *agar async function bolmasa demak promise ishlatmimiz
   *processSignup methodini parameteriga input ni pass qilamiz va uning type MemberInput  */

  public async processSignup(input: MemberInput): Promise<Member> {
    /* databasega bogliq mantiq:
     * exist variable hosil qilib oldik
     * member schema Modelini .findOne() static methodi */

    const exist = await this.memberModel
      .findOne({ memberType: MemberType.RESTAURANT })
      .exec();
    console.log("exist:", exist);

    //1 ta dan ortiq restaurant ochilishiga qarshi mantiq
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    // passwordni hash() qilish yani bcryption => passwordni aslini korsatishiga qarshi mantiq!
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      /* Yangi Burak restaurant ni hosil qilamz static method orqali.
       * memberSchema modelmni .create methodini ishlatdik.
       * natijani result variable ga tenglab oldik */

      const result = await this.memberModel.create(input);

      // passwordni hide qildik "" bosh stringga tenglab
      result.memberPassword = "";

      // va result ga biriktirilgan natijani return qildik
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  /* processLogin method definition qismi va u asynchronous method. parametrga input ni olib uni type ni LoginInput interface bn belgilab oldik
   * Promise da Member typli malumotni qaytarishini belgilab oldik */
  public async processLogin(input: LoginInput): Promise<Member> {
    /* member degan variable ni hosil qilib member Schema modelidan memberModel
       ni chaqirib findOne() methodini chaqiramiz */
    const member = await this.memberModel
      .findOne(
        // Query condition: database dan qanday malumotni izlashni belgilab olyabmz
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    // database dagi passwordni solishtirish yani hato kiritsa hato yuboradi togri password kirgizsa login qiladi
    /* const isMatch = input.memberPassword === member.memberPassword; */

    // agar password notogri bolsa hato qaytarishligi
    if (!isMatch)
      throw new Errors(HttpCode.UNAUTHORISED, Message.WRONG_PASSWORD);

    // yana schema modelga murojat qilib kiritilgan malumotlar togri bolsa memberId bn topib bizga result ni qaytarb beradi
    return await this.memberModel.findById(member._id).exec();
  }

  // why getUsers () not getting any parameter?
  public async getUsers(): Promise<Member[]> {
    // member schema Model ni find() methodini chaqirib uni ichiga argument sifatida
    // qiymati User bolgan memberType ni topib berishini kirityapmz
    const result = await this.memberModel
      .find({ memberType: MemberType.USER })
      .exec();
    // resultda hech qanday natija qaytmasa error hosil qilyabmz (natijasizlik)
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }

  public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
    input._id = shapeIntoMongooseObjectId(input._id);
    const result = await this.memberModel
      .findByIdAndUpdate({ _id: input._id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}

export default MemberService;
