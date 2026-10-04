import { createResourceController } from '../../lib/resource/controller';
import { guestService } from './service';

export const guestController = createResourceController(guestService);