import { CustomerOutputDTO } from "../../user/DTO/output-customer-DTO";
import { UserOutputDTO } from "../../user/DTO/output-user-DTO";

export class RegisterOutputDTO {
    user: UserOutputDTO;
    customer: CustomerOutputDTO
}