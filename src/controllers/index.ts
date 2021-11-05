import { Controller, Get, Route } from 'tsoa';

@Route('')
export class IndexController extends Controller {
  @Get('')
  public async index(): Promise<{ message: string }> {
    return { message: 'Server is running' };
  }
}
