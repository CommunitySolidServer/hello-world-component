import {
  BadRequestHttpError,
  Credentials,
  CredentialsExtractor,
  HttpRequest,
  NotImplementedHttpError,
  TargetExtractor,
  getLoggerFor,
  matchesAuthorizationScheme
} from "@solid/community-server";
import { serializeParameters, serializeString } from 'structured-headers';

// See https://github.com/CommunitySolidServer/CommunitySolidServer/blob/3fbdc69f3f3bb9c0733ec59c21f0f2f890d0afde/src/authentication/BearerWebIdExtractor.ts
// and similar extractors for inspipration

/**
 * Credentials extractor that extracts a WebID from a request signed using HTTP Signatures.
 */
export class HttpSigWebIdExtractor extends CredentialsExtractor {
  protected readonly logger = getLoggerFor(this);

  public constructor(private readonly originalUrlExtractor: TargetExtractor) {
    super();
  }

  public async canHandle(request: HttpRequest): Promise<void> {
    // const parameters: Parameters = new Map()


    console.log('='.repeat(20))
    console.log(request.headers)
    console.log('-'.repeat(20))
    try {
      // @ts-ignore
      console.log(
        // @ts-ignore
        serializeParameters(new Map(Object.entries(request.headers)))
      )
      // console.log(parseItem(request.rawHeaders[0]))
    } catch (e) {
      console.log('error trying to serialize', e)
    }
    console.log('='.repeat(20))


    const originalUrl = await this.originalUrlExtractor.handleSafe({ request });
    this.logger.info(`Attempting to handle HttpSigExtractor for URL [${originalUrl.path}]`)

    // Implementation should be similar to https://github.com/CommunitySolidServer/CommunitySolidServer/blob/eb0a8f3dba18143b86da0b8a39329a676b2a3c67/src/authentication/DPoPWebIdExtractor.ts#L30-L32
    // in particular it needs to see if the incoming request matches the HttpSig authorisation scheme
    throw new NotImplementedHttpError();
  }

  public async handle(request: HttpRequest): Promise<Credentials> {

    // Implementation should be similar to https://github.com/CommunitySolidServer/CommunitySolidServer/blob/eb0a8f3dba18143b86da0b8a39329a676b2a3c67/src/authentication/DPoPWebIdExtractor.ts#L35
    // in particular it should error if we cannot verify the request; and return the WebId (+ client + issuer if they can be determined) if we can verify the request.
    throw new NotImplementedHttpError();
  }
}
