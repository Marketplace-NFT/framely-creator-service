import { Controller, Response, Route, SuccessResponse, Tags, Security, Request, Put, Body } from 'tsoa';
import { AuthedRequest } from '@customtypes/auth';
import { UpdateEmotionRequest, UpdateEmotionResponse } from '../types/Emotion';
import EmotionService from '@services/Emotion';

@Route('/emotions')
export class EmotionController extends Controller {
  private emotionService: EmotionService;

  constructor() {
    super();
    this.emotionService = new EmotionService();
  }

  @Put('/')
  @Tags('Emotion')
  @Security('jwt')
  @Response<UpdateEmotionResponse>('200', 'OK')
  @SuccessResponse('200', 'OK')
  public async updateEmotion(
    @Request() request: AuthedRequest,
    @Body() body: UpdateEmotionRequest,
  ): Promise<UpdateEmotionResponse> {
    const { userId, accountId } = request.auth;
    return this.emotionService.updateEmotion(userId, accountId, body.productId);
  }
}
