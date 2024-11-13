import {post, requestBody} from '@loopback/rest';


export interface AnalyzeRequest {
  text: string;
  version: string;
}
export class PersonalityController {
  // POST method to analyze personality based on text and version
  //
  // constructor() {
  // }
  // @post('/analyze')
  // async analyzePersonality(
  //   @requestBody() request: AnalyzeRequest,
  // ): Promise<{}> {
  //   const {text, version} = request;
  //
  //   if (!text || !version) {
  //     throw new Error('Both text and version are required');
  //   }
  //
  //   try {
  //     // Call the personality analysis method
  //     const response = await this.personalityService.analyze(text, version);
  //
  //     // Return the analysis result
  //     return {
  //       msg: 'User Profile Created',
  //       user: response,
  //     };
  //   } catch (error) {
  //     throw new Error(`Error analyzing personality: ${error.message}`);
  //   }
  // }
}