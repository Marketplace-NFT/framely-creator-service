import {
  Controller,
  Get,
  Response,
  Route,
  SuccessResponse,
  Tags,
  Security,
  Request,
  Path,
  Post,
  Body,
  Put,
  Delete,
} from 'tsoa';
import CreatorService from '@services/creator';
import { AuthedRequest } from '@customtypes/auth';
import {
  CreateCollectibleBody,
  CollectibleResponse,
  CreateCollectibleResponse,
  DeleteCollectibleResponse,
  UpdateCollectibleResponse,
  UpdateCollectibleBody,
} from '../types/collectible';

@Route('/collectibles')
export class CreatorController extends Controller {
  private creatorService: CreatorService;

  constructor() {
    super();
    this.creatorService = new CreatorService();
  }

  @Get('/')
  @Tags('Creator')
  @Security('jwt')
  @Response<CollectibleResponse[]>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async getAllCollectibles(@Request() request: AuthedRequest): Promise<CollectibleResponse[]> {
    const { userId, accountId } = request.auth;
    return this.creatorService.getAllCollectibles(userId, accountId);
  }

  @Get('/{id}')
  @Tags('Creator')
  @Security('jwt')
  @Response<CollectibleResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async getCollectible(@Request() request: AuthedRequest, @Path() id: string): Promise<CollectibleResponse> {
    const { userId, accountId } = request.auth;
    return this.creatorService.getCollectible(userId, accountId, id);
  }

  @Post('/')
  @Tags('Creator')
  @Security('jwt')
  @Response<CreateCollectibleResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async createCollectible(
    @Request() request: AuthedRequest,
    @Body() body: CreateCollectibleBody,
  ): Promise<CreateCollectibleResponse> {
    const { userId, accountId } = request.auth;
    return this.creatorService.createCollectible(userId, accountId, body);
  }

  @Put('/')
  @Tags('Creator')
  @Security('jwt')
  @Response<UpdateCollectibleResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async updateCollectible(
    @Request() request: AuthedRequest,
    @Body() body: UpdateCollectibleBody,
  ): Promise<UpdateCollectibleResponse> {
    const { userId, accountId } = request.auth;
    return this.creatorService.updateCollectible(userId, accountId, body);
  }

  @Delete('/{id}')
  @Tags('Creator')
  @Security('jwt')
  @Response<DeleteCollectibleResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async deleteCollectible(
    @Request() request: AuthedRequest,
    @Path() id: string,
  ): Promise<DeleteCollectibleResponse> {
    const { userId, accountId } = request.auth;
    return this.creatorService.deleteCollectible(userId, accountId, id);
  }
}
