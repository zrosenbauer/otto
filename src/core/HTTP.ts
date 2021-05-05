import * as ottoBrowser from '@bluenova/otto-browser';
import { v4 as uuid } from 'uuid';

export interface Props {
  addAction (action: ottoBrowser.HTTPAction): void

  url: string;
  method?: string;
  body?: unknown;
}

/**
 * Class used to represent a HTTP call either done by navigation, XHR or other
 * available Web APIs.
 */
export class HTTP {
  public url: string;
  public method?: string;
  public body?: unknown;
  public readonly addAction: Props['addAction'];

  constructor (props: Props) {
    this.url = props.url;
    this.method = props?.method;
    this.body = props?.body;
    this.addAction = props.addAction;
  }

  public navigate (): HTTP {
    this.addAction({
      type: 'navigate',
      id: uuid(),
      url: this.url
    });
    return this;
  }

  // @todo Handle when the navigate method DOES NOT need to be called, aka just reviewing request sent by user action (i.e. form submission)

  // @todo hasStatus(200)
  // @todo hasRequestBody(body: JSONSchema)
  // @todo hasResponseBody(body: JSONSchema)
  // @todo hasHeader(header: string)
  // @todo matchesContract(openAPISpec: OpenAPISpec)
}
