import { Controller, Response, Route, SuccessResponse, Tags, Security, Patch, Body, Post, Request, Delete } from 'tsoa';

import CollectionService from '@services/collection';
import {
  CollectionRequest,
  CollectionResponse,
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from '../types/collection';
import { AuthedRequest } from '@customtypes/auth';

@Route('/collections')
export class CollectionController extends Controller {
  private collectionService: CollectionService;

  constructor() {
    super();
    this.collectionService = new CollectionService();
  }

  @Post('/')
  @Tags('Collection')
  @Security('jwt')
  @Response<CollectionResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async createCollection(
    @Request() request: AuthedRequest,
    @Body() body: CreateCollectionRequest,
  ): Promise<CollectionResponse> {
    const { userId } = request.auth;
    return this.collectionService.createCollection(body, userId);
  }

  @Patch('/')
  @Tags('Collection')
  @Security('jwt')
  @Response<CollectionResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async updateCollection(@Body() body: UpdateCollectionRequest): Promise<CollectionResponse> {
    return this.collectionService.updateCollection(body);
  }

  @Delete('/')
  @Tags('Collection')
  @Security('jwt')
  @Response<CollectionResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async deleteCollection(@Body() body: CollectionRequest): Promise<CollectionResponse> {
    return this.collectionService.deleteCollection(body.collectionId);
  }

  @Patch('/restore')
  @Tags('Collection')
  @Security('jwt')
  @Response<CollectionResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async restoreCollection(@Body() body: CollectionRequest): Promise<CollectionResponse> {
    return this.collectionService.restoreCollection(body.collectionId);
  }
}
