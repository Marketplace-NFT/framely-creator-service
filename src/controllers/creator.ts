import { Controller, Get, Response, Route, SuccessResponse, Tags } from 'tsoa';
import CreatorService from '@services/creator';

@Route('/creator')
export class CreatorController extends Controller {
  private creatorService: CreatorService;

  constructor() {
    super();
    this.creatorService = new CreatorService();
  }

  @Get('/')
  @Tags('Creator')
  @Response<string>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async getProfile(): Promise<string> {
    return 'Hello';
  }
}
