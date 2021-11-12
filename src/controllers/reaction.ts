import { Controller, Response, Route, SuccessResponse, Tags, Security, Request, Patch, Body } from 'tsoa';
import { AuthedRequest } from '@customtypes/auth';
import { UpdateReactionRequest, UpdateReactionResponse } from '../types/reaction';
import ReactionService from '@services/reaction';

@Route('/reactions')
export class ReactionController extends Controller {
  private reactionService: ReactionService;

  constructor() {
    super();
    this.reactionService = new ReactionService();
  }

  @Patch('/')
  @Tags('Reaction')
  @Security('jwt')
  @Response<UpdateReactionResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async updateReaction(
    @Request() request: AuthedRequest,
    @Body() body: UpdateReactionRequest,
  ): Promise<UpdateReactionResponse> {
    const { userId } = request.auth;
    return this.reactionService.updateReaction(userId, body.productId);
  }
}
