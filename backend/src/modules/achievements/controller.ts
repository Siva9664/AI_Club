import { createResourceController } from '../../lib/resource/controller';
import { achievementService } from './service';

export const achievementController = createResourceController(achievementService);