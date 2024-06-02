import { Prop } from '@nestjs/mongoose';

export class CreateCompanyDTO {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  address: string;
}
