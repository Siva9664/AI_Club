import { createResourceController } from '../../lib/resource/controller';
import { memberService } from './service';

export const memberController = createResourceController(memberService);