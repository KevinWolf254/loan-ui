import { Institution } from "../domains/institution.model";
import { MemberResidence } from "../domains/memberResidence.model";
import { PostalAddress } from "../domains/postalAddress.model";

export class InstitutionResponse extends Institution{
    residence: MemberResidence;
    postalAddress: PostalAddress;
}