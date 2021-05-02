import * as ottoBrowser from '@bluenova/otto-browser';
import { v4 as uuid } from 'uuid';

export interface Props {
  addAction (action: ottoBrowser.HTTPAction): void

  url: string;
}

/**
 * Class used to represent a HTTP call either done by navigation, XHR or other
 * available Web APIs.
 */
export class HTTP {
  public url: string;
  private addAction: Props['addAction'];

  constructor (props: Props) {
    this.url = props.url;
    this.addAction = props.addAction;

    this.addAction({
      type: 'navigate',
      id: uuid(),
      url: this.url
    });
  }
}
